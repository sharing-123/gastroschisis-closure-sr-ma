"""Exports site/data.json (study-level and pooled estimates) and site/anatomy.bin (point cloud of the
abdominal wall from Ecorche, CC BY-SA 4.0). Needs ecorche.glb next to this file's parent loader (see README)."""
import json, re, sys, os, numpy as np, pandas as pd
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, '..', '..'))
ECORCHE = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, 'ecorche.glb')
LOADER = sys.argv[2] if len(sys.argv) > 2 else HERE
sys.path.insert(0, LOADER)

# ---------- data.json ----------
hi = pd.read_csv(os.path.join(REPO, 'analysis', 'harvest_input.csv'))
res = pd.read_csv(os.path.join(REPO, 'analysis', 'results_pairwise_and_sensitivity.csv'))
grade = pd.read_csv(os.path.join(REPO, 'analysis', 'GRADE_table.csv'))
out = {'forest': {}, 'pooled': {}, 'grade': []}
for (cc, o), g in hi.groupby(['contrast', 'outcome']):
    rows = []
    for r in g.itertuples():
        md = r.e_M - r.c_M
        se = np.sqrt(r.e_S ** 2 / r.e_n + r.c_S ** 2 / r.c_n)
        rows.append({'study': r.label, 'md': round(md, 2), 'lo': round(md - 1.96 * se, 2), 'hi': round(md + 1.96 * se, 2),
                     'n': int(r.e_n + r.c_n), 'rct': r.design == 'RCT'})
    out['forest'][f'{o}_{cc}'] = sorted(rows, key=lambda x: x['md'])
prim = res[res.analysis.str.startswith('Primary')]
for r in prim.itertuples():
    out['pooled'][f'{r.outcome}_{r.contrast}'] = {k: (None if pd.isna(getattr(r, k)) else round(float(getattr(r, k)), 3))
        for k in ['est', 'lo', 'hi', 'pi_lo', 'pi_hi', 'I2', 'k', 'n']}
for r in grade.itertuples():
    out['grade'].append({'contrast': r.Contrast, 'outcome': r.Outcome, 'studies': r.Studies, 'n': int(r.Participants),
                         'effect': r.Effect, 'i2': r.I2, 'certainty': r.Certainty_Text.title(), 'symbol': r.Certainty_Symbol})
json.dump(out, open(os.path.join(REPO, 'site', 'data.json'), 'w'), separators=(',', ':'))

# ---------- anatomy.bin ----------
from load import meshes
ms = meshes(ECORCHE)
rng = np.random.default_rng(3)
cls_id = {'bone': 0, 'rect': 1, 'abd': 2, 'mus': 3}
def cls(name):
    n = name.lower()
    if re.search(r'rectus abdominis|linea alba', n): return 'rect'
    if re.search(r'oblique|transvers', n) and 'head' not in n: return 'abd'
    if re.search(r'vertebra|disk|sacrum|hip bone|rib|sternum|cartilage|coccyx|costal', n): return 'bone'
    return 'mus'
P, N, C = [], [], []
cen = np.array([0, 1.12, 0.02])
for name, v, f in ms:
    if f is None: continue
    c = v.mean(0)
    if not (0.86 < c[1] < 1.40 and abs(c[0]) < 0.24): continue
    k = cls(name)
    if k == 'mus' and not re.search(r'psoas|iliacus|quadratus|serratus anterior|pectoralis major', name, re.I): continue
    t = v[f]; e1 = t[:, 1] - t[:, 0]; e2 = t[:, 2] - t[:, 0]; cr = np.cross(e1, e2); ar = np.linalg.norm(cr, axis=1) / 2
    if ar.sum() <= 0: continue
    cnt = int(min(5000, max(60, ar.sum() * 1.25e5)))
    idx = rng.choice(len(f), cnt, p=ar / ar.sum()); u = rng.random((cnt, 2)); m = u.sum(1) > 1; u[m] = 1 - u[m]
    P.append(t[idx, 0] + u[:, :1] * e1[idx] + u[:, 1:] * e2[idx])
    N.append(cr[idx] / np.maximum(np.linalg.norm(cr[idx], axis=1, keepdims=True), 1e-12))
    C.append(np.full(cnt, cls_id[k], np.uint8))
P = np.concatenate(P) - cen; N = np.concatenate(N); C = np.concatenate(C)
q = np.clip(np.round(P * 20000), -32767, 32767).astype('<i2')
nq = np.clip(np.round(N * 127), -127, 127).astype('i1')
with open(os.path.join(REPO, 'site', 'anatomy.bin'), 'wb') as fh:
    fh.write(np.uint32(len(P)).tobytes())
    fh.write(q.tobytes()); fh.write(nq.tobytes()); fh.write(C.tobytes())
print('points', len(P), 'bytes', os.path.getsize(os.path.join(REPO, 'site', 'anatomy.bin')))
