import { REST, type HeroState } from './torso';

export type V3 = [number, number, number];
export interface Light { key: number; rim: number; beam: number; bloom: number; floor: number; pool: number; dial: number }
export interface Chapter {
  id: string; cam: V3; target: V3; fov: number;
  /** Where the subject sits horizontally, as a fraction of viewport width (negative = left). */
  shift: number;
  hero: Partial<HeroState>; light: Partial<Light>;
  drive?: (sub: number) => Partial<HeroState>;
  hud: string;
}

export const BASE_LIGHT: Light = { key: 1, rim: 1, beam: 1, bloom: 0.55, floor: 1, pool: 1, dial: 1 };
export const sm = (a: number, b: number, x: number) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** The surface builds from the top down behind a front that sweeps y = 1 to -1. */
const solidBehind = (front: number) => Math.max(0, Math.min(1, ((1.0 - front) / 2.0 - 0.02) * 1.15));

export const CHAPTERS: Chapter[] = [
  { id: 'hero', hud: 'hud.s0', cam: [0, 0.25, 6.2], target: [0, -0.25, 0], fov: 26, shift: 0.14, hero: { yaw: -0.5, pitch: 0.03, rings: 1, cloud: 0.5, after: 0.22, scanY: -1.2, settle: 1 }, light: { floor: 1 } },
  {
    id: 'defect', hud: 'hud.s1', cam: [0.6, 0.1, 5.6], target: [0, -0.05, 0], fov: 26, shift: 0.2,
    hero: { yaw: -0.45, pitch: 0.04, solid: 0, cloud: 1, after: 0.95, laser: 1, rings: 0.6 }, light: { bloom: 0.9, rim: 0.8, beam: 1.2 },
    drive: sub => ({ scanY: lerp(0.98, -0.98, sub), solid: solidBehind(lerp(0.98, -0.98, sub)), yaw: -0.45 + sub * 0.95, silo: sm(0.72, 0.98, sub), laser: 1 - sm(0.94, 1, sub) }),
  },
  {
    id: 'layers', hud: 'hud.s2', cam: [2.4, 0.35, 6.2], target: [0.05, -0.05, 0.2], fov: 27, shift: 0.15,
    hero: { yaw: -0.62, pitch: 0.08, silo: 1, rings: 0 }, light: { bloom: 0.65, rim: 1.2, beam: 1.2 },
    drive: sub => ({ explode: sm(0.1, 0.55, sub), yaw: -0.62 + sm(0.45, 1, sub) * 0.5, pitch: 0.08 - sm(0.5, 1, sub) * 0.06 }),
  },
  { id: 'evidence', hud: 'hud.s3', cam: [-0.1, 0.1, 6.0], target: [0, -0.2, 0.3], fov: 26, shift: -0.2, hero: { yaw: 0.25, pitch: 0.02, silo: 1, sort: 1, rings: 0.6, cloud: 0.2, after: 0.2, scanY: -1.2 }, light: { bloom: 0.7, beam: 1.1 } },
];

export interface Layout { top: number; height: number }
export interface WorldState { cam: V3; target: V3; fov: number; shift: number; hero: HeroState; light: Light; active: number; u: number; sub: number }

const lerp3 = (a: V3, b: V3, t: number): V3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const plateau = (f: number) => { const x = Math.max(0, Math.min(1, (f - 0.18) / 0.64)); return x * x * x * (x * (x * 6 - 15) + 10); };
const heroAt = (ch: Chapter, sub: number): HeroState => ({ ...REST, ...ch.hero, ...(ch.drive ? ch.drive(sub) : {}) });

/** Pure, reversible function of scroll: the same scrollY always gives the same world. */
export function evaluate(layout: Layout[], scrollY: number, vh: number, portrait: boolean): WorldState {
  const n = CHAPTERS.length;
  const mid = (i: number) => layout[i].top + layout[i].height / 2;
  const probe = scrollY + vh / 2;
  let a = 0;
  for (let i = 0; i < n - 1; i++) if (probe >= mid(i)) a = i;
  const b = Math.min(n - 1, a + 1);
  const span = Math.max(1, mid(b) - mid(a));
  const f = a === b ? 0 : Math.max(0, Math.min(1, (probe - mid(a)) / span));
  const t = a === b ? 0 : plateau(f);
  const subOf = (i: number) => { const L = layout[i]; return Math.max(0, Math.min(1, (scrollY - L.top) / Math.max(1, L.height - vh))); };
  const ca = CHAPTERS[a], cb = CHAPTERS[b];
  const ha = heroAt(ca, subOf(a)), hb = heroAt(cb, subOf(b));
  const hero = { ...REST } as HeroState;
  for (const k of Object.keys(REST) as Array<keyof HeroState>) hero[k] = lerp(ha[k], hb[k], t);
  const light = { ...BASE_LIGHT };
  for (const k of Object.keys(BASE_LIGHT) as Array<keyof Light>) light[k] = lerp(ca.light[k] ?? BASE_LIGHT[k], cb.light[k] ?? BASE_LIGHT[k], t);
  const pull = portrait ? 1.5 : 1;
  const camA = ca.cam.map((v, i) => (i === 2 ? v * pull : v)) as V3, camB = cb.cam.map((v, i) => (i === 2 ? v * pull : v)) as V3;
  const cam = lerp3(camA, camB, t);
  cam[1] += Math.sin(t * Math.PI) * 0.18; cam[0] += Math.sin(t * Math.PI) * 0.22 * (a % 2 ? -1 : 1);
  const target = lerp3(ca.target, cb.target, t);
  if (portrait) target[1] -= 0.2;
  const active = t > 0.5 ? b : a;
  return { cam, target, fov: lerp(ca.fov, cb.fov, t) * (portrait ? 1.12 : 1), shift: portrait ? 0 : lerp(ca.shift, cb.shift, t), hero, light, active, u: a + t, sub: subOf(active) };
}
