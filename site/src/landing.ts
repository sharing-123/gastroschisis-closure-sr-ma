import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import type { Vector3 } from 'three';
import type { World } from './world';
import { CHAPTERS, type Layout } from './world/chapters';
import { lang, onBeforeLang, onLang, t } from './i18n';
import { initFx } from './fx';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface Tag { el: HTMLElement; anchor: Vector3; dx: number; dy: number; chapter: number; flip: boolean }
declare global { interface Window { __go?: (id: string, t?: number) => void; __fs?: { world: World; lenis?: Lenis } } }
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export async function startLanding(): Promise<void> {
  const canvas = document.getElementById('world') as HTMLCanvasElement;
  const params = new URLSearchParams(location.search);
  const { createWorld } = await import('./world');
  const world = createWorld(canvas, params.has('capture'));
  const sections = [...document.querySelectorAll<HTMLElement>('.chapter')];
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const coarse = matchMedia('(pointer: coarse)').matches;

  let layout: Layout[] = [];
  const measure = () => { layout = sections.map(s => ({ top: s.getBoundingClientRect().top + window.scrollY, height: s.offsetHeight })); world.setLayout(layout); };
  const resize = () => { world.resize(window.innerWidth, window.innerHeight); measure(); ScrollTrigger.refresh(); };

  const lenis = reduce() ? undefined : new Lenis({ lerp: 0.11, smoothWheel: true });
  lenis?.on('scroll', ScrollTrigger.update);
  const scrollNow = () => (lenis ? lenis.scroll : window.scrollY);

  // labels projected from 3D anchors
  const tagHost = document.getElementById('tags')!;
  const tags: Tag[] = [];
  const hero = world.hero;
  const addTag = (chapter: number, anchor: Vector3, key: string, dx: number, dy: number, mark = false) => {
    const el = document.createElement('div'); el.className = 'tag' + (mark ? ' mark' : ''); tagHost.appendChild(el);
    tags.push({ el, anchor, dx, dy, chapter, flip: false });
    const fill = () => { el.innerHTML = `<i></i><span>${t(key)}</span>`; }; fill(); onLang(fill);
  };
  addTag(1, hero.anchors.silo, 'tag.silo', -150, -50, true);
  addTag(2, hero.anchors.wall, 'tag.l0', 78, -6); addTag(2, hero.anchors.deep, 'tag.l1', 78, 0); addTag(2, hero.anchors.bone, 'tag.l2', 78, 6);
  tags.slice(-3).forEach(tg => tg.el.classList.add('leader'));

  // text reveal: headings rise from a mask, body fades; re-created when the language changes
  const shown = new WeakSet<Element>();
  let splits: SplitText[] = [], triggers: ScrollTrigger[] = [];
  const setupReveal = () => {
    const calm = reduce();
    sections.forEach((sec, i) => {
      const head = sec.querySelector<HTMLElement>('h1, h2');
      const rest = [...sec.querySelectorAll<HTMLElement>('.copy p, .steps, .funnel, .legend, .hero-sub, .hero-note, .cue')];
      let lines: Element[] = [];
      if (head) { const sp = SplitText.create(head, { type: 'lines', mask: 'lines', linesClass: 'ln' }); splits.push(sp); lines = sp.lines; }
      const revealed = head ? shown.has(head) : true;
      if (calm || revealed) { gsap.set(lines, { yPercent: 0 }); gsap.set(rest, { clearProps: 'all' }); return; }
      gsap.set(lines, { yPercent: 115 }); gsap.set(rest, { opacity: 0, y: 14 });
      if (i === 0) return;
      triggers.push(ScrollTrigger.create({
        trigger: sec, start: 'top 58%', once: true,
        onEnter: () => {
          if (head) shown.add(head); rest.forEach(r => shown.add(r));
          gsap.to(lines, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09 });
          gsap.to(rest, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08, delay: 0.25 });
        },
      }));
    });
  };
  const teardownReveal = () => { splits.forEach(s => s.revert()); splits = []; triggers.forEach(tr => tr.kill()); triggers = []; };
  onBeforeLang(teardownReveal);
  onLang(() => { setupReveal(); measure(); ScrollTrigger.refresh(); });
  await document.fonts.ready;
  setupReveal();

  // layer step list follows progress through the layers chapter
  const steps = [...document.querySelectorAll<HTMLElement>('.steps li')];
  const layerIdx = CHAPTERS.findIndex(c => c.id === 'layers');
  const updateSteps = (scroll: number) => {
    const L = layout[layerIdx]; if (!L) return;
    const sub = Math.max(0, Math.min(1, (scroll - L.top) / Math.max(1, L.height - window.innerHeight)));
    const idx = sub < 0.3 ? 0 : sub < 0.58 ? 1 : 2;
    steps.forEach((s, k) => s.classList.toggle('on', k === idx));
  };

  // funnel count-up
  const funnel = document.getElementById('funnel');
  if (funnel) ScrollTrigger.create({
    trigger: funnel, start: 'top 80%', once: true,
    onEnter: () => {
      funnel.classList.add('in');
      if (reduce()) return;
      funnel.querySelectorAll<HTMLElement>('b').forEach(b => { const to = Number(b.dataset.count), o = { v: 0 }; gsap.to(o, { v: to, duration: 1.5, ease: 'power3.out', onUpdate: () => { b.textContent = Math.round(o.v).toLocaleString(lang() === 'id' ? 'id-ID' : 'en-US'); } }); });
    },
  });

  // curtain: the 3D world dims as the paper sheets rise
  gsap.to(canvas, { opacity: 0.1, ease: 'none', scrollTrigger: { trigger: '#findings', start: 'top bottom', end: 'top 15%', scrub: true } });
  ScrollTrigger.create({ trigger: '#findings', start: 'top 60px', end: 'max', onToggle: self => { document.body.dataset.tone = self.isActive ? 'bone' : 'night'; } });

  const goTo = (i: number) => {
    const L = layout[i]; if (!L) return;
    const y = CHAPTERS[i].drive ? L.top + 4 : L.top + L.height / 2 - window.innerHeight / 2;
    if (lenis) lenis.scrollTo(y, { duration: 1.6 }); else window.scrollTo({ top: y });
  };
  const fx = initFx(sections, goTo);

  let last = 0, lastScroll = 0, velocity = 0;
  const tick = (time: number) => {
    const raw = time - last; last = time;
    const dt = Math.min(0.05, Math.max(0.001, raw));
    world.stage.sampleOk = raw < 0.2 && !document.hidden;
    lenis?.raf(time * 1000);
    const s = scrollNow();
    velocity = velocity * 0.85 + ((s - lastScroll) / dt) * 0.15; lastScroll = s;
    if (!coarse) { pointer.x += (pointer.tx - pointer.x) * 0.06; pointer.y += (pointer.ty - pointer.y) * 0.06; }
    world.update(s, velocity, dt, time, pointer);
    updateSteps(s);
    fx(world.state.u, world.state.active, velocity);
    const hp = document.getElementById('hud-pct'), hb = document.getElementById('hud-bar'), hpt = document.getElementById('hud-pts');
    if (hp && hb && hpt) {
      const pc = Math.round(world.hud.pct * 100);
      hp.textContent = `${pc}%`; hb.style.width = `${pc}%`;
      hpt.textContent = Math.round(world.hud.points).toLocaleString(lang() === 'id' ? 'id-ID' : 'en-US');
    }
    const st = world.state, out = { x: 0, y: 0, visible: true };
    for (const tg of tags) {
      const near = Math.abs(st.u - tg.chapter) < 0.42;
      tg.el.classList.toggle('on', near);
      if (!near) continue;
      world.project(tg.anchor, out);
      const wpx = window.innerWidth;
      const flip = out.x + tg.dx > wpx - 210 ? true : out.x + tg.dx < 12 ? false : tg.flip;
      tg.flip = flip;
      const x = Math.max(12, Math.min(wpx - tg.el.offsetWidth - 12, out.x + (flip ? -tg.dx : tg.dx)));
      tg.el.style.transform = `translate3d(${x}px, ${out.y + tg.dy}px, 0)`;
    }
  };
  gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);

  const onMove = (e: PointerEvent) => { pointer.tx = (e.clientX / window.innerWidth) * 2 - 1; pointer.ty = (e.clientY / window.innerHeight) * 2 - 1; };
  if (!coarse) window.addEventListener('pointermove', onMove, { passive: true });
  let rz = 0;
  window.addEventListener('resize', () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(resize); });
  resize();

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector<HTMLElement>(a.getAttribute('href')!);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { duration: 1.6 }); else target.scrollIntoView();
    });
  });

  // intro: the surface condenses out of scattered points
  const veil = document.getElementById('veil');
  const hero0 = sections[0];
  const heroLines = hero0.querySelectorAll('.ln');
  const heroRest = hero0.querySelectorAll<HTMLElement>('.hero-sub, .hero-note, .cue');
  requestAnimationFrame(() => requestAnimationFrame(() => {
    veil?.classList.add('gone');
    if (reduce()) { world.intro.v = 1; return; }
    gsap.to(world.intro, { v: 1, duration: 3.8, ease: 'power2.inOut' });
    gsap.to(heroLines, { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.1, delay: 1.5 });
    gsap.to(heroRest, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.12, delay: 2.4 });
    const h1 = hero0.querySelector('h1'); if (h1) shown.add(h1);
  }));

  window.__go = (id: string, tt = 0.5) => {
    const i = CHAPTERS.findIndex(c => c.id === id); if (i < 0) return;
    const L = layout[i];
    const y = CHAPTERS[i].drive ? L.top + (L.height - window.innerHeight) * tt : L.top + L.height / 2 - window.innerHeight / 2;
    if (lenis) lenis.scrollTo(y, { immediate: true }); else window.scrollTo(0, y);
  };
  window.__fs = { world, lenis };
}
