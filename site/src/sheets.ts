import { lang, num as numL, onLang, t } from './i18n';

interface Row { study: string; md: number; lo: number; hi: number; n: number; rct: boolean }
interface Pooled { est: number; lo: number; hi: number; pi_lo: number | null; pi_hi: number | null; I2: number; k: number; n: number }
interface Grade { contrast: string; outcome: string; studies: string; n: number; effect: string; i2: string; certainty: string }
interface Data { forest: Record<string, Row[]>; pooled: Record<string, Pooled>; grade: Grade[] }

let DATA: Data | null = null;
let cmp = 'DC_vs_FC', outc = 'LOS';
const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));
const n1 = (v: number, d = 1) => (v < 0 ? '−' : '') + numL(Math.abs(v), d);
const sg = (v: number, d = 1) => (v > 0 ? '+' : '') + n1(v, d);

function renderForest(): void {
  if (!DATA) return;
  const rows = DATA.forest[`${outc}_${cmp}`] ?? [], p = DATA.pooled[`${outc}_${cmp}`];
  const ro = document.getElementById('readout'), svg = document.getElementById('forest');
  if (!ro || !svg || !p) return;
  const short = cmp.startsWith('DC') ? 'DC' : 'SL';
  ro.innerHTML = `${short} vs FC, ${t(`on.${outc}`)}: <b>${sg(p.est)} ${t('r.days')}</b> (${t('r.ci')} ${n1(p.lo)} ${t('r.to')} ${n1(p.hi)}), ${p.k} ${t('r.studies')}, ${p.n.toLocaleString(lang() === 'id' ? 'id-ID' : 'en-US')} ${t('r.infants')}. I² ${Math.round(p.I2)}%${p.pi_lo != null && p.pi_hi != null ? `, ${t('r.pi')} ${n1(p.pi_lo)} ${t('r.to')} ${n1(p.pi_hi)}` : ''}.`;
  const bounds = [p.lo, p.hi, p.pi_lo, p.pi_hi, p.est].filter((v): v is number => v != null).map(Math.abs);
  let ext = Math.max(...bounds) * 1.15; const step = [1, 2, 5, 10, 20].find(s => ext / s <= 7) ?? 20; ext = Math.ceil(ext / step) * step;
  const W = 900, L = 200, R = 175, rh = 24, top = 54, H = top + (rows.length + 2) * rh + 56, pw = W - L - R;
  const X = (v: number) => L + (clamp(v, -ext, ext) + ext) / (2 * ext) * pw;
  let s = `<text class="hd" x="${L - 12}" y="26" text-anchor="end">${t('r.study')}</text><text class="hd" x="${W - 8}" y="26" text-anchor="end">MD (${t('r.ci')})</text>`;
  for (let v = -ext; v <= ext; v += step) s += `<line class="grid" x1="${X(v)}" x2="${X(v)}" y1="${top - 8}" y2="${H - 50}"/><text x="${X(v)}" y="${H - 32}" text-anchor="middle">${n1(v, 0)}</text>`;
  s += `<line class="zero" x1="${X(0)}" x2="${X(0)}" y1="${top - 8}" y2="${H - 50}"/>`;
  const wmax = Math.max(...rows.map(r => r.n));
  rows.forEach((r, i) => {
    const y = top + i * rh + rh / 2, sz = 4 + 6 * Math.sqrt(r.n / wmax);
    s += `<text class="st" x="${L - 12}" y="${y + 4}" text-anchor="end">${r.study}</text><line class="ci" x1="${X(r.lo)}" x2="${X(r.hi)}" y1="${y}" y2="${y}"/>`;
    if (r.lo < -ext) s += `<path d="M${X(-ext)} ${y} l7 -4 v8z" fill="#4a5870"/>`;
    if (r.hi > ext) s += `<path d="M${X(ext)} ${y} l-7 -4 v8z" fill="#4a5870"/>`;
    s += `<rect class="sq${r.rct ? ' rct' : ''}" x="${X(r.md) - sz / 2}" y="${y - sz / 2}" width="${sz}" height="${sz}"/><text x="${W - 8}" y="${y + 4}" text-anchor="end">${sg(r.md)} (${n1(r.lo)} ${t('r.to')} ${n1(r.hi)})</text>`;
  });
  const py = top + rows.length * rh + rh * 0.9;
  s += `<line class="rule" x1="12" x2="${W - 8}" y1="${py - 18}" y2="${py - 18}"/><text class="hd" x="${L - 12}" y="${py + 4}" text-anchor="end">${t('r.pooled')}</text>`;
  if (p.pi_lo != null && p.pi_hi != null) s += `<line class="pi" x1="${X(p.pi_lo)}" x2="${X(p.pi_hi)}" y1="${py}" y2="${py}"/>`;
  s += `<path class="dia" d="M${X(p.lo)} ${py} L${X(p.est)} ${py - 10} L${X(p.hi)} ${py} L${X(p.est)} ${py + 10}z"/><text class="hd" x="${W - 8}" y="${py + 4}" text-anchor="end">${sg(p.est)} (${n1(p.lo)} ${t('r.to')} ${n1(p.hi)})</text>`;
  s += `<text x="${L}" y="${H - 8}">← ${t('r.shorter')} ${short}</text><text x="${L + pw}" y="${H - 8}" text-anchor="end">${t('r.longer')} ${short} →</text>`;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.innerHTML = s;
}

function renderGrade(): void {
  const body = document.querySelector('#grade tbody');
  if (!DATA || !body) return;
  let h = '', cur = '';
  for (const g of DATA.grade) {
    if (g.contrast !== cur) { cur = g.contrast; h += `<tr class="grp"><td colspan="6">${cur === 'DC vs FC' ? t('r.dc') : t('r.sl')} vs FC</td></tr>`; }
    const pct = ({ 'Very Low': 12, Low: 38, Moderate: 66, High: 100 } as Record<string, number>)[g.certainty] ?? 12;
    h += `<tr><td>${g.outcome}</td><td>${g.studies}</td><td>${g.n.toLocaleString('en-US')}</td><td>${g.effect}</td><td>${g.i2}</td><td><span class="cert"><i style="--p:${pct}%"></i>${g.certainty}</span></td></tr>`;
  }
  body.innerHTML = h;
}

export function initSheets(): void {
  const seg = (id: string, cb: (v: string) => void) => {
    const el = document.getElementById(id); if (!el) return;
    el.addEventListener('click', e => {
      const b = (e.target as HTMLElement).closest('button'); if (!b) return;
      el.querySelectorAll('button').forEach(x => x.setAttribute('aria-selected', String(x === b)));
      cb(b.dataset.v ?? ''); renderForest();
    });
  };
  seg('segC', v => { cmp = v; }); seg('segO', v => { outc = v; });
  onLang(() => { renderForest(); renderGrade(); });
  void fetch('./data.json').then(r => r.json()).then((d: Data) => { DATA = d; renderForest(); renderGrade(); });
}
