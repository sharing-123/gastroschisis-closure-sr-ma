import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import Lenis from 'https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.mjs';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const touch = matchMedia('(pointer: coarse)').matches;
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = t => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;

/* ---------------- i18n ---------------- */
const T = {
  en: {
    nav_q: 'Question', nav_e: 'Evidence', nav_f: 'Findings', nav_c: 'Certainty', nav_b: 'Bottom line', nav_r: 'Reproduce',
    h1a: 'Closing gastroschisis,', h1b: 'what the evidence says',
    lede: 'A systematic review and meta-analysis of silo-based delayed closure, sutureless closure and fascial closure in neonates. 42 studies, 35 pooled, about 5,800 infants.',
    cta1: 'Read the findings', cta2: 'Data and code', f_rep: 'Reporting', f_cert: 'Certainty',
    q_h: 'Three ways to close one defect', q1h: 'Fascial closure', q1p: 'The surgeon reduces the bowel and sutures the fascia at the first operation.',
    q2h: 'Delayed closure after a silo', q2p: 'The bowel returns in stages inside a silo, and the defect is closed days later.',
    q3h: 'Sutureless closure', q3p: 'The defect closes around the umbilical cord or a dressing, with no fascial sutures.',
    q_note: 'Infants with swollen or damaged bowel are more likely to receive a silo, and they stay longer for that reason. A raw comparison mixes the technique with the bowel. The review therefore reports prediction intervals and grades the certainty of every estimate.',
    e_h: 'From 9,158 records to 35 pooled studies', e1: 'records from five databases and one register', e2: 'screened after 3,146 duplicates', e3: 'full texts assessed', e4: 'studies included', e5: 'with arm-level data, pooled',
    e_note: 'Seven further reports gave only adjusted associations, medians without spread or a before-and-after comparison, and are synthesised narratively. Ten journals were hand-searched. Search date 22 November 2026.',
    r_h: 'Findings, against fascial closure', r_dc: 'Delayed silo closure (DC)', r_sl: 'Sutureless closure (SL)', o_los: 'Length of stay', o_vd: 'Ventilator days', o_pn: 'Parenteral nutrition', o_ff: 'Time to full feeds',
    r_cap: 'Mean difference in days with 95% CI per study (square size by sample size, hollow for randomized trials). The diamond is the random-effects pooled estimate (REML, Hartung-Knapp) and the thin line behind it the 95% prediction interval. Negative values favour the experimental strategy.',
    c_h: 'How much to trust it', c_p: 'Risk of bias was serious in 31 of 32 non-randomized studies, mostly from confounding by indication. Certainty is therefore low or very low for every outcome.',
    t_o: 'Outcome', t_s: 'Studies', t_e: 'Effect (95% CI)', t_c: 'Certainty',
    c_note: 'Mean differences are in days; risk ratios for binary outcomes. GRADE started at high certainty within the ROBINS-I framework. Downgrading rules are in the manuscript.',
    b_h: 'At the bedside', b1h: 'Silo-based delayed closure', b1p: 'A silo goes with a longer stay, more ventilator days and more parenteral nutrition than fascial closure. Confounding by indication limits a causal reading, so reserve the silo for infants who cannot tolerate primary reduction and do not choose it to improve outcomes.',
    b2h: 'Sutureless closure', b2p: 'In simple gastroschisis, sutureless closure shortens ventilation by about 1.5 days and leaves the stay unchanged. Hernia risk is unresolved (RR 3.11, 95% CI 0.34 to 28.18, two studies).',
    b3h: 'What would settle it', b3p: 'Trials, or adjusted patient-level analyses, stratified by bowel condition. The three randomized trials so far are small and one stopped early.',
    m_h: 'Open data, open code', m_p: 'Pairwise random-effects meta-analysis with network and multilevel models as checks. Every estimate on this page comes from the files in the repository.', m_s: 'Supplementary tables', m_cite: 'Cite.',
    foot: 'Department of Pediatric Surgery, Faculty of Medicine, Universitas Padjadjaran. Research summary, not clinical advice for an individual patient.',
    days: 'days', studies: 'studies', infants: 'infants', pi: 'prediction interval', ci: '95% CI', to: 'to',
    shorter: 'Shorter with', longer: 'Longer with', md: 'Mean difference (days)', pooled: 'Pooled (random effects)',
    oname: { LOS: 'length of stay', VD: 'ventilator days', PN: 'parenteral nutrition', FF: 'time to full feeds' }
  },
  id: {
    nav_q: 'Pertanyaan', nav_e: 'Bukti', nav_f: 'Temuan', nav_c: 'Kepastian', nav_b: 'Kesimpulan', nav_r: 'Replikasi',
    h1a: 'Menutup gastroskisis,', h1b: 'apa kata buktinya',
    lede: 'Tinjauan sistematis dan meta-analisis penutupan tertunda dengan silo, penutupan tanpa jahitan fasia, dan penutupan fasia pada neonatus. 42 studi, 35 digabung, sekitar 5.800 bayi.',
    cta1: 'Baca temuannya', cta2: 'Data dan kode', f_rep: 'Pelaporan', f_cert: 'Kepastian bukti',
    q_h: 'Tiga cara menutup satu defek', q1h: 'Penutupan fasia', q1p: 'Ahli bedah memasukkan usus dan menjahit fasia pada operasi pertama.',
    q2h: 'Penutupan tertunda dengan silo', q2p: 'Usus dimasukkan bertahap di dalam silo, lalu defek ditutup beberapa hari kemudian.',
    q3h: 'Penutupan tanpa jahitan', q3p: 'Defek menutup sendiri di sekitar tali pusat atau balutan, tanpa jahitan fasia.',
    q_note: 'Bayi dengan usus bengkak atau rusak lebih sering mendapat silo, dan mereka dirawat lebih lama karena itu. Perbandingan mentah mencampur teknik dengan kondisi usus. Karena itu tinjauan ini melaporkan prediction interval dan menilai kepastian setiap estimasi.',
    e_h: 'Dari 9.158 rekaman menjadi 35 studi yang digabung', e1: 'rekaman dari lima basis data dan satu registri', e2: 'disaring setelah 3.146 duplikat', e3: 'teks lengkap dinilai', e4: 'studi disertakan', e5: 'punya data per lengan, digabung',
    e_note: 'Tujuh laporan lain hanya memberi asosiasi yang disesuaikan, median tanpa sebaran, atau perbandingan sebelum dan sesudah, sehingga disintesis secara naratif. Sepuluh jurnal ditelusuri manual. Tanggal pencarian 22 November 2026.',
    r_h: 'Temuan, dibandingkan penutupan fasia', r_dc: 'Silo tertunda (DC)', r_sl: 'Tanpa jahitan (SL)', o_los: 'Lama rawat', o_vd: 'Hari ventilator', o_pn: 'Nutrisi parenteral', o_ff: 'Waktu mencapai nutrisi enteral penuh',
    r_cap: 'Selisih rerata dalam hari dengan IK 95% tiap studi (ukuran kotak menurut sampel, kotak kosong untuk uji acak). Berlian adalah estimasi gabungan random-effects (REML, Hartung-Knapp) dan garis tipis di belakangnya adalah prediction interval 95%. Nilai negatif berpihak pada strategi uji.',
    c_h: 'Seberapa layak dipercaya', c_p: 'Risiko bias serius pada 31 dari 32 studi non-acak, terutama karena confounding by indication. Karena itu kepastian bukti rendah atau sangat rendah untuk semua luaran.',
    t_o: 'Luaran', t_s: 'Studi', t_e: 'Efek (IK 95%)', t_c: 'Kepastian',
    c_note: 'Selisih rerata dalam hari; risk ratio untuk luaran biner. GRADE dimulai dari kepastian tinggi dalam kerangka ROBINS-I. Aturan penurunan ada di naskah.',
    b_h: 'Di samping tempat tidur', b1h: 'Penutupan tertunda dengan silo', b1p: 'Silo berkaitan dengan rawat lebih lama, lebih banyak hari ventilator dan nutrisi parenteral dibanding penutupan fasia. Confounding by indication membatasi tafsir sebab-akibat, jadi pakai silo untuk bayi yang tidak tahan reduksi primer dan jangan memilihnya demi memperbaiki luaran.',
    b2h: 'Penutupan tanpa jahitan', b2p: 'Pada gastroskisis sederhana, penutupan tanpa jahitan memperpendek ventilasi sekitar 1,5 hari dan tidak mengubah lama rawat. Risiko hernia belum jelas (RR 3,11, IK 95% 0,34 sampai 28,18, dua studi).',
    b3h: 'Apa yang akan menjawabnya', b3p: 'Uji acak, atau analisis data pasien yang disesuaikan, yang distratifikasi menurut kondisi usus. Tiga uji acak sejauh ini kecil dan satu berhenti dini.',
    m_h: 'Data terbuka, kode terbuka', m_p: 'Meta-analisis random-effects berpasangan dengan model jejaring dan multilevel sebagai pemeriksa. Setiap estimasi di halaman ini berasal dari berkas di repositori.', m_s: 'Tabel suplemen', m_cite: 'Sitasi.',
    foot: 'Departemen Bedah Anak, Fakultas Kedokteran Universitas Padjadjaran. Ringkasan riset, bukan saran klinis untuk pasien individual.',
    days: 'hari', studies: 'studi', infants: 'bayi', pi: 'prediction interval', ci: 'IK 95%', to: 'sampai',
    shorter: 'Lebih singkat dengan', longer: 'Lebih lama dengan', md: 'Selisih rerata (hari)', pooled: 'Gabungan (random effects)',
    oname: { LOS: 'lama rawat', VD: 'hari ventilator', PN: 'nutrisi parenteral', FF: 'waktu mencapai nutrisi enteral penuh' }
  }
};
let lang = 'en';
try { const s = localStorage.getItem('lang'); lang = s || (navigator.languages || [navigator.language]).some(l => /^id/i.test(l)) ? 'id' : 'en'; if (s) lang = s; } catch (e) {}
const t = k => T[lang][k];
const num = (v, d = 1) => (v < 0 ? '−' : '') + Math.abs(v).toFixed(d).replace('.', lang === 'id' ? ',' : '.');
const sgn = (v, d = 1) => (v > 0 ? '+' : '') + num(v, d);

/* ---------------- data, forest, table ---------------- */
let DATA = null, cmp = 'DC_vs_FC', outc = 'LOS';
function renderForest() {
  if (!DATA) return;
  const rows = DATA.forest[`${outc}_${cmp}`] || [], p = DATA.pooled[`${outc}_${cmp}`];
  const short = cmp.startsWith('DC') ? 'DC' : 'SL';
  const ro = $('#readout');
  if (p) ro.innerHTML = `${short} vs FC, ${t('oname')[outc]}: <b>${sgn(p.est)} ${t('days')}</b> (${t('ci')} ${num(p.lo)} ${t('to')} ${num(p.hi)}), ${p.k} ${t('studies')}, ${p.n.toLocaleString(lang === 'id' ? 'id-ID' : 'en-US')} ${t('infants')}. I² ${Math.round(p.I2)}%${p.pi_lo != null ? `, ${t('pi')} ${num(p.pi_lo)} ${t('to')} ${num(p.pi_hi)}` : ''}.`;
  const bounds = [p.lo, p.hi, p.pi_lo, p.pi_hi, p.est].filter(v => v != null).map(Math.abs);
  let ext = Math.max(...bounds) * 1.15, step = [1, 2, 5, 10, 20].find(s => ext / s <= 7) || 20; ext = Math.ceil(ext / step) * step;
  const W = 900, L = 200, R = 175, rh = 24, top = 54, H = top + (rows.length + 2) * rh + 56, pw = W - L - R;
  const X = v => L + (clamp(v, -ext, ext) + ext) / (2 * ext) * pw;
  let s = `<text class="hd" x="${L - 12}" y="26" text-anchor="end">Study</text><text class="hd" x="${W - 8}" y="26" text-anchor="end">MD (${t('ci')})</text>`;
  for (let v = -ext; v <= ext; v += step) s += `<line class="grid" x1="${X(v)}" x2="${X(v)}" y1="${top - 8}" y2="${H - 50}"/><text x="${X(v)}" y="${H - 32}" text-anchor="middle">${num(v, 0)}</text>`;
  s += `<line class="zero" x1="${X(0)}" x2="${X(0)}" y1="${top - 8}" y2="${H - 50}"/>`;
  const wmax = Math.max(...rows.map(r => r.n));
  rows.forEach((r, i) => {
    const y = top + i * rh + rh / 2, sz = 4 + 6 * Math.sqrt(r.n / wmax);
    const clipL = r.lo < -ext, clipR = r.hi > ext;
    s += `<text class="st" x="${L - 12}" y="${y + 4}" text-anchor="end">${r.study}</text><line class="ci" x1="${X(r.lo)}" x2="${X(r.hi)}" y1="${y}" y2="${y}"/>`;
    if (clipL) s += `<path d="M${X(-ext)} ${y} l7 -4 v8z" fill="#4a5870"/>`; if (clipR) s += `<path d="M${X(ext)} ${y} l-7 -4 v8z" fill="#4a5870"/>`;
    s += `<rect class="sq${r.rct ? ' rct' : ''}" x="${X(r.md) - sz / 2}" y="${y - sz / 2}" width="${sz}" height="${sz}"/><text x="${W - 8}" y="${y + 4}" text-anchor="end">${sgn(r.md)} (${num(r.lo)} ${t('to')} ${num(r.hi)})</text>`;
  });
  const py = top + rows.length * rh + rh * 0.9;
  s += `<line class="grid" x1="${L - 190}" x2="${W - 8}" y1="${py - 18}" y2="${py - 18}" style="stroke:#14203344"/><text class="hd" x="${L - 12}" y="${py + 4}" text-anchor="end">${t('pooled')}</text>`;
  if (p.pi_lo != null) s += `<line class="pi" x1="${X(p.pi_lo)}" x2="${X(p.pi_hi)}" y1="${py}" y2="${py}"/>`;
  s += `<path class="dia" d="M${X(p.lo)} ${py} L${X(p.est)} ${py - 10} L${X(p.hi)} ${py} L${X(p.est)} ${py + 10}z"/><text class="hd" x="${W - 8}" y="${py + 4}" text-anchor="end">${sgn(p.est)} (${num(p.lo)} ${t('to')} ${num(p.hi)})</text>`;
  s += `<text x="${L}" y="${H - 8}">← ${t('shorter')} ${short}</text><text x="${L + pw}" y="${H - 8}" text-anchor="end">${t('longer')} ${short} →</text>`;
  const svg = $('#forest'); svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.innerHTML = s;
}
function renderGrade() {
  if (!DATA) return; let h = '', cur = '';
  for (const g of DATA.grade) {
    if (g.contrast !== cur) { cur = g.contrast; h += `<tr class="grp"><td colspan="6">${cur === 'DC vs FC' ? t('r_dc') : t('r_sl')} vs FC</td></tr>`; }
    const pct = { 'Very Low': 12, Low: 38, Moderate: 66, High: 100 }[g.certainty] || 12;
    h += `<tr><td>${g.outcome}</td><td>${g.studies}</td><td>${g.n.toLocaleString('en-US')}</td><td>${g.effect}</td><td>${g.i2}</td><td><span class="cert"><i style="--p:${pct}%"></i>${g.certainty}</span></td></tr>`;
  }
  $('#grade tbody').innerHTML = h;
}
function applyLang() {
  document.documentElement.lang = lang;
  $$('[data-i18n]').forEach(e => { const v = t(e.dataset.i18n); if (v) e.textContent = v; });
  $$('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
  renderForest(); renderGrade();
}
$$('.lang button').forEach(b => b.addEventListener('click', () => { lang = b.dataset.lang; try { localStorage.setItem('lang', lang); } catch (e) {} applyLang(); }));
function seg(id, cb) { const el = $(id); el.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('button', el).forEach(x => x.setAttribute('aria-selected', x === b)); cb(b.dataset.v); renderForest(); }); }
seg('#segC', v => cmp = v); seg('#segO', v => outc = v);
fetch('data.json').then(r => r.json()).then(d => { DATA = d; applyLang(); });
applyLang();

/* funnel count-up */
const fun = $('#funnel');
new IntersectionObserver((es, o) => es.forEach(e => {
  if (!e.isIntersecting) return; fun.classList.add('in'); o.disconnect();
  if (reduce) return;
  $$('.num', fun).forEach(n => { const to = +n.dataset.count, t0 = performance.now(); (function f(now) { const k = clamp((now - t0) / 1400); n.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))).toLocaleString(lang === 'id' ? 'id-ID' : 'en-US'); if (k < 1) requestAnimationFrame(f); })(t0); });
}), { threshold: .35 }).observe(fun);

/* ---------------- smooth scroll ---------------- */
let scrollY = 0;
const lenis = reduce ? null : new Lenis({ lerp: 0.09, smoothWheel: true });
if (lenis) lenis.on('scroll', e => scrollY = e.scroll);
addEventListener('scroll', () => { if (!lenis) scrollY = window.scrollY; }, { passive: true });
$$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const el = $(a.getAttribute('href')); if (!el) return; e.preventDefault(); lenis ? lenis.scrollTo(el, { offset: -10, duration: 1.6 }) : el.scrollIntoView(); }));

/* ---------------- WebGL world ---------------- */
const canvas = $('#world');
function startWorld(buf) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: !touch, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: location.search.includes('capture') }); } catch (e) { document.body.classList.add('no-gl'); return; }
  let dpr = Math.min(devicePixelRatio, 2); renderer.setPixelRatio(dpr); renderer.setClearColor(0x070f20, 1);
  const scene = new THREE.Scene(); scene.fog = new THREE.Fog(0x070f20, 3.2, 6.5);
  const cam = new THREE.PerspectiveCamera(32, 1, 0.05, 20);
  const dv = new DataView(buf), n = dv.getUint32(0, true);
  const pos = new Int16Array(buf, 4, n * 3), nor = new Int8Array(buf, 4 + n * 6, n * 3), cls = new Uint8Array(buf, 4 + n * 9, n);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Int16BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.Int8BufferAttribute(nor, 3, true)); g.setAttribute('aCls', new THREE.Uint8BufferAttribute(cls, 1));
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1);
  const U = { uScale: { value: 1 / 20000 }, uSize: { value: 0.0042 }, uPx: { value: 900 }, uDim: { value: 1 }, uTime: { value: 0 }, uScan: { value: 2 } };
  const mat = new THREE.ShaderMaterial({
    uniforms: U, transparent: true, depthWrite: true,
    vertexShader: `attribute float aCls; uniform float uScale,uSize,uPx,uDim,uTime,uScan; varying vec3 vC; varying float vA;
      void main(){ vec3 p=position*uScale; vec4 mv=modelViewMatrix*vec4(p,1.); vec3 nv=normalize(normalMatrix*normal);
        float l=.28+.72*abs(dot(nv,normalize(vec3(-.4,.5,.8))));
        vec3 c = aCls<.5? vec3(.93,.89,.78) : aCls<1.5? vec3(1.,.55,.24) : aCls<2.5? vec3(.8,.27,.24) : vec3(.59,.2,.24);
        float scan=smoothstep(0.,.05,uScan-p.y)*(1.-smoothstep(.0,.06,p.y-uScan+.06))*0.;
        float rv=smoothstep(uScan-.12,uScan,p.y); vA=uDim*(1.-rv);
        float gl=exp(-pow((p.y-uScan)*28.,2.)); vC=c*l*(.55+.45*smoothstep(-.4,.2,-mv.z+3.))+vec3(.2,.5,.6)*gl;
        gl_PointSize=uSize*uPx/(-mv.z)*(1.+gl*.6); gl_Position=projectionMatrix*mv; }`,
    fragmentShader: `varying vec3 vC; varying float vA; void main(){ float d=length(gl_PointCoord-.5); if(d>.5||vA<.02) discard; gl_FragColor=vec4(vC,vA*(1.-smoothstep(.35,.5,d))); }`
  });
  const body = new THREE.Points(g, mat); body.frustumCulled = false;
  const rig = new THREE.Group(); rig.add(body); scene.add(rig);
  /* silo */
  const sl = new THREE.Group(), um = new THREE.Vector3(0, -0.06, 0.135), ax = new THREE.Vector3(0, .35, .94).normalize();
  sl.position.copy(um); sl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), ax);
  const lv = [], rad = tt => .05 * (1 - .5 * tt) + .004;
  for (let k = 0; k < 9; k++) { const tt = k / 8; for (let a = 0; a < 40; a++) { const a0 = a / 40 * 6.2832, a1 = (a + 1) / 40 * 6.2832; lv.push(Math.cos(a0) * rad(tt), Math.sin(a0) * rad(tt), .36 * tt, Math.cos(a1) * rad(tt), Math.sin(a1) * rad(tt), .36 * tt); } }
  for (let a = 0; a < 12; a++) { const aa = a / 12 * 6.2832; for (let k = 0; k < 12; k++) { const t0 = k / 12, t1 = (k + 1) / 12; lv.push(Math.cos(aa) * rad(t0), Math.sin(aa) * rad(t0), .36 * t0, Math.cos(aa) * rad(t1), Math.sin(aa) * rad(t1), .36 * t1); } }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.Float32BufferAttribute(lv, 3));
  const smat = new THREE.LineBasicMaterial({ color: 0xffa23c, transparent: true, opacity: .95 }); sl.add(new THREE.LineSegments(sg, smat)); rig.add(sl);
  /* study markers: 42 points, orbit then sort into three lanes */
  const MN = 42, mg = new THREE.BufferGeometry(), mp = new Float32Array(MN * 3), mc = new Float32Array(MN * 3);
  const col = [[.54, .58, .65], [1, .62, .24], [.06, .78, .66]], grp = i => i < 19 ? 0 : i < 27 ? 1 : 2;
  for (let i = 0; i < MN; i++) mc.set(col[grp(i)], i * 3);
  mg.setAttribute('position', new THREE.BufferAttribute(mp, 3)); mg.setAttribute('color', new THREE.BufferAttribute(mc, 3));
  const sc2 = document.createElement('canvas'); sc2.width = sc2.height = 64; const cx2 = sc2.getContext('2d'); const gr2 = cx2.createRadialGradient(32, 32, 4, 32, 32, 30); gr2.addColorStop(0, '#fff'); gr2.addColorStop(.55, '#fff'); gr2.addColorStop(1, 'rgba(255,255,255,0)'); cx2.fillStyle = gr2; cx2.fillRect(0, 0, 64, 64);
  const mm = new THREE.PointsMaterial({ map: new THREE.CanvasTexture(sc2), alphaTest: .05, size: .016, vertexColors: true, transparent: true, opacity: 1, depthWrite: false, sizeAttenuation: true });
  const marks = new THREE.Points(mg, mm); marks.frustumCulled = false; rig.add(marks);
  /* floor grid */
  const fl = [], FR = [.5, .8, 1.15, 1.6, 2.2];
  FR.forEach(r => { for (let a = 0; a < 96; a++) { const a0 = a / 96 * 6.2832, a1 = (a + 1) / 96 * 6.2832; fl.push(Math.cos(a0) * r, 0, Math.sin(a0) * r, Math.cos(a1) * r, 0, Math.sin(a1) * r); } });
  for (let a = 0; a < 24; a++) { const aa = a / 24 * 6.2832; fl.push(Math.cos(aa) * .5, 0, Math.sin(aa) * .5, Math.cos(aa) * 2.2, 0, Math.sin(aa) * 2.2); }
  const fg = new THREE.BufferGeometry(); fg.setAttribute('position', new THREE.Float32BufferAttribute(fl, 3));
  const floor = new THREE.LineSegments(fg, new THREE.LineBasicMaterial({ color: 0x2a5f9a, transparent: true, opacity: .32 })); floor.position.y = -.47; scene.add(floor);
  /* dust */
  const DN = 500, dp = new Float32Array(DN * 3); for (let i = 0; i < DN; i++) { dp.set([(Math.random() - .5) * 5, (Math.random() - .5) * 3, (Math.random() - .5) * 5], i * 3); }
  const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
  const dust = new THREE.Points(dg, new THREE.PointsMaterial({ color: 0x7fb4e8, size: .009, transparent: true, opacity: .5, depthWrite: false })); scene.add(dust);

  /* chapter keys: camera, target, yaw, view shift, silo, sort, dim */
  const K = [
    { cam: [.15, .12, 1.75], tgt: [0, -.02, 0], yaw: .45, shift: .24, silo: .0, sort: 0, dim: 1, scan: 2 },
    { cam: [.2, .02, 1.55], tgt: [0, -.02, .1], yaw: 1.22, shift: .26, silo: 1, sort: 0, dim: 1, scan: 2 },
    { cam: [-.1, .25, 2.3], tgt: [0, 0, 0], yaw: -.35, shift: .3, silo: 1, sort: 1, dim: .95, scan: 2 },
    { cam: [0, .3, 2.8], tgt: [0, 0, 0], yaw: -.9, shift: 0, silo: 1, sort: 1, dim: 0, scan: -.5 }
  ];
  const secs = ['#hero', '#question', '#evidence', '#findings'].map(s => $(s));
  let tops = [], vh = 800;
  const sizeAll = () => { const w = innerWidth, h = innerHeight; vh = h; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); U.uPx.value = h * dpr / (2 * Math.tan(THREE.MathUtils.degToRad(16))); tops = secs.map(s => s.getBoundingClientRect().top + window.scrollY); };
  addEventListener('resize', sizeAll); sizeAll(); setTimeout(sizeAll, 600);
  const cur = { cam: new THREE.Vector3(), tgt: new THREE.Vector3(), yaw: 0, shift: 0, silo: 0, sort: 0, dim: 1, scan: 2 };
  function evaluate(y) {
    const yy = y + vh * .35; let i = 0; while (i < 3 && yy >= tops[i + 1]) i++;
    const u = clamp((yy - tops[i]) / Math.max(1, tops[i + 1] - tops[i])), f = ease(clamp((u - .2) / .6));
    const a = K[i], b = K[i + 1];
    cur.cam.set(lerp(a.cam[0], b.cam[0], f), lerp(a.cam[1], b.cam[1], f) + Math.sin(Math.PI * f) * .14, lerp(a.cam[2], b.cam[2], f));
    cur.tgt.set(lerp(a.tgt[0], b.tgt[0], f), lerp(a.tgt[1], b.tgt[1], f), lerp(a.tgt[2], b.tgt[2], f));
    ['yaw', 'shift', 'silo', 'sort', 'dim', 'scan'].forEach(k => cur[k] = lerp(a[k], b[k], f));
  }
  const mob = () => innerWidth < 900;
  let ema = 16, frames = 0, last = performance.now(), tm = 0;
  const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
  if (!touch && !reduce) addEventListener('pointermove', e => { mouse.x = e.clientX / innerWidth - .5; mouse.y = e.clientY / innerHeight - .5; });
  // intro scan: reveal sweeps upward over ~2.2 s then holds
  const t0 = performance.now(); const introDur = reduce ? 0 : 2400;
  function frame(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now; tm += dt; ema = ema * .95 + dt * 1000 * .05; frames++;
    if (frames > 150 && ema > 26 && dpr > 1) { dpr = dpr > 1.25 ? 1.25 : 1; renderer.setPixelRatio(dpr); sizeAll(); frames = 0; }
    evaluate(scrollY);
    const intro = introDur ? clamp((now - t0) / introDur) : 1, scan = lerp(.5, 2, ease(intro));
    mouse.sx += (mouse.x - mouse.sx) * .06; mouse.sy += (mouse.y - mouse.sy) * .06;
    const sway = reduce ? 0 : Math.sin(tm * .35) * .12;
    rig.rotation.y = cur.yaw + sway + mouse.sx * .25 + (reduce ? 0 : tm * .0);
    rig.rotation.x = mouse.sy * .06;
    const camMul = mob() ? 1.9 : 1;
    cam.position.set(cur.cam.x * camMul, cur.cam.y, cur.cam.z * camMul); cam.lookAt(cur.tgt);
    const sh = mob() ? 0 : cur.shift, w = innerWidth, h = innerHeight; cam.setViewOffset(w, h, -sh * w * .5, 0, w, h);
    U.uDim.value = cur.dim; U.uScan.value = Math.min(scan, cur.scan); U.uTime.value = tm;
    canvas.style.visibility = cur.dim < .01 ? 'hidden' : 'visible';
    sl.scale.set(1, 1, Math.max(.001, cur.silo)); smat.opacity = .95 * clamp(cur.silo * 1.4) * cur.dim;
    floor.material.opacity = .32 * cur.dim; dust.material.opacity = .5 * cur.dim; mm.opacity = cur.dim; dust.rotation.y = tm * .015;
    for (let i = 0; i < MN; i++) {
      const gr = grp(i), idx = gr === 0 ? i : gr === 1 ? i - 19 : i - 27, ang = tm * (.22 + gr * .05) + i * .75, rr = .42 + .06 * gr + .02 * Math.sin(i);
      const ox = Math.cos(ang) * rr, oy = Math.sin(i * 1.7 + tm * .6) * .24, oz = Math.sin(ang) * rr;
      const sx = .4 + gr * .14, sy = -.42 + idx * .03 * (gr === 0 ? 1 : 1.9), sz = .12;
      const s = ease(cur.sort);
      mp[i * 3] = lerp(ox, sx, s); mp[i * 3 + 1] = lerp(oy, sy, s); mp[i * 3 + 2] = lerp(oz, sz, s);
    }
    mg.attributes.position.needsUpdate = true;
    renderer.render(scene, cam); requestAnimationFrame(frame);
  }
  if (lenis) { const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf); }
  requestAnimationFrame(frame);
  window.__snap = (id, off = 0) => { const el = $(id); const y = el.getBoundingClientRect().top + window.scrollY + off; window.scrollTo(0, y); scrollY = y; lenis && lenis.scrollTo(y, { immediate: true }); };
}
fetch('anatomy.bin').then(r => r.arrayBuffer()).then(startWorld).catch(() => document.body.classList.add('no-gl'));
