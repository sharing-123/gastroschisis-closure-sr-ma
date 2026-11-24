# Landing page

Static site (no build step): `index.html`, `style.css`, `main.js`, `data.json` (study-level and pooled estimates from `analysis/`), `anatomy.bin` (point cloud of the abdominal wall from Ecorche, CC BY-SA 4.0). Three.js and Lenis load from jsDelivr.

```powershell
python -m http.server 8793 -d site
```

`tools/export_data.py` regenerates `data.json` and `anatomy.bin` (needs `ecorche.glb` from https://github.com/Charleeh/ecorche and the GLB loader used in `scripts/`).
