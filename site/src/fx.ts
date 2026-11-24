import gsap from 'gsap';
import { CHAPTERS } from './world/chapters';
import { t, onLang } from './i18n';

/**
 * Interface motion layered over the world: chapter rail, ghost numerals with parallax, a sweep line on every chapter change,
 * a scrambling stage readout, a reticle cursor that snaps to targets, magnetic buttons and velocity skew on the copy blocks.
 */
export function initFx(sections: HTMLElement[], goTo: (i: number) => void): (u: number, active: number, velocity: number) => void {
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;
  const n = CHAPTERS.length;

  // chapter rail
  const rail = document.createElement('nav');
  rail.className = 'rail-nav'; rail.setAttribute('aria-label', 'Chapters');
  rail.innerHTML = `<i class="rail-line"><i class="rail-fill"></i></i>` + CHAPTERS.map((c, i) => `<button type="button" class="rail-tick" data-i="${i}"><span class="rail-lbl">${t(c.hud)}</span></button>`).join('');
  document.body.appendChild(rail);
  const ticks = [...rail.querySelectorAll<HTMLElement>('.rail-tick')];
  const fill = rail.querySelector<HTMLElement>('.rail-fill')!;
  ticks.forEach((b, i) => b.addEventListener('click', () => goTo(i)));
  onLang(() => ticks.forEach((b, i) => { b.querySelector('.rail-lbl')!.textContent = t(CHAPTERS[i].hud); }));

  // ghost numerals
  const ghosts = sections.map((s, i) => {
    const g = document.createElement('div');
    g.className = 'ghost-num' + (i % 2 ? ' left' : ''); g.setAttribute('aria-hidden', 'true');
    g.textContent = String(i).padStart(2, '0');
    s.appendChild(g);
    return g;
  });

  // sweep line on chapter change
  const sweep = document.createElement('div');
  sweep.className = 'sweep'; sweep.setAttribute('aria-hidden', 'true');
  document.body.appendChild(sweep);
  let lastActive = -1;
  const scramble = (el: HTMLElement, text: string) => {
    if (calm) { el.textContent = text; return; }
    const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789#/%';
    const o = { p: 0 };
    gsap.to(o, { p: 1, duration: 0.55, ease: 'none', onUpdate: () => {
      const k = Math.floor(o.p * text.length);
      el.textContent = text.slice(0, k) + [...text.slice(k)].map(c => (c === ' ' ? ' ' : chars[(Math.random() * chars.length) | 0])).join('');
    }, onComplete: () => { el.textContent = text; } });
  };

  // reticle
  let reticle: HTMLElement | null = null;
  if (!coarse && !calm) {
    reticle = document.createElement('div');
    reticle.className = 'reticle'; reticle.setAttribute('aria-hidden', 'true');
    reticle.innerHTML = '<i></i><b></b>';
    document.body.appendChild(reticle);
    const qx = gsap.quickTo(reticle, 'x', { duration: 0.35, ease: 'power3' }), qy = gsap.quickTo(reticle, 'y', { duration: 0.35, ease: 'power3' });
    window.addEventListener('pointermove', e => { qx(e.clientX); qy(e.clientY); reticle!.classList.add('on'); }, { passive: true });
    document.addEventListener('pointerover', e => { reticle!.classList.toggle('hot', !!(e.target as HTMLElement).closest('a, button, .tool')); });
    document.addEventListener('pointerleave', () => reticle!.classList.remove('on'));
    // magnetic buttons
    document.querySelectorAll<HTMLElement>('.cta, .nav-cta').forEach(b => {
      const mx = gsap.quickTo(b, 'x', { duration: 0.4, ease: 'power3' }), my = gsap.quickTo(b, 'y', { duration: 0.4, ease: 'power3' });
      b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); mx((e.clientX - r.left - r.width / 2) * 0.22); my((e.clientY - r.top - r.height / 2) * 0.3); });
      b.addEventListener('pointerleave', () => { mx(0); my(0); });
    });
  }

  const copies = sections.map(s => s.querySelector<HTMLElement>('.copy, .hero-copy, .studio-copy'));
  return (u, active, velocity) => {
    fill.style.height = `${(u / (n - 1)) * 100}%`;
    ticks.forEach((b, i) => b.classList.toggle('on', i === active));
    if (active !== lastActive) {
      if (lastActive >= 0 && !calm) {
        const dir = active > lastActive ? 1 : -1;
        gsap.fromTo(sweep, { yPercent: dir > 0 ? -100 : 100, opacity: 1 }, { yPercent: dir > 0 ? 100 : -100, duration: 0.95, ease: 'power2.inOut', onComplete: () => { gsap.set(sweep, { opacity: 0 }); } });
        const st = document.getElementById('hud-stage');
        if (st) scramble(st, t(CHAPTERS[active].hud));
      }
      lastActive = active;
    }
    if (calm) return;
    const vh = innerHeight;
    sections.forEach((s, i) => {
      const r = s.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      gsap.set(ghosts[i], { y: -r.top * 0.18 });
      const c = copies[i];
      if (c) gsap.set(c, { skewY: Math.max(-2.5, Math.min(2.5, velocity * 0.0016)) });
    });
  };
}
