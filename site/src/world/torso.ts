import {
  AdditiveBlending, BufferAttribute, BufferGeometry, CanvasTexture, Color, DoubleSide, EdgesGeometry, Float32BufferAttribute, Group, Line, LineBasicMaterial,
  LineSegments, Mesh, MeshPhysicalMaterial, MeshBasicMaterial, PlaneGeometry, Points, PointsMaterial, ShaderMaterial, Vector3, type IUniform,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

/**
 * The abdominal wall, deep muscles and skeleton of an adult male, cut from Ecorche (CC BY-SA 4.0, built from BodyParts3D and
 * Z-Anatomy). The silo and the study markers are drawn by the authors. Torso metres are scaled by S into world units.
 */
const S = 3.2;
const CEN = new Vector3(0, 1.12, 0.02);
const UMB = new Vector3(0, 1.06, 0.155).sub(CEN).multiplyScalar(S);

export interface HeroState {
  yaw: number; pitch: number; lift: number;
  solid: number; cloud: number; after: number; scanY: number; laser: number; rings: number; explode: number; settle: number;
  silo: number; sort: number; dots: number;
}
export const REST: HeroState = {
  yaw: 0, pitch: 0, lift: 0, solid: 1, cloud: 0, after: 0.2, scanY: 1.2, laser: 0, rings: 0, explode: 0, settle: 1, silo: 0, sort: 0, dots: 1,
};

type Kind = 'bone' | 'rect' | 'abd' | 'deep';
const kindOf = (name: string): Kind | null => {
  const n = name.toLowerCase();
  if (/rectus abdominis|linea alba/.test(n)) return 'rect';
  if (/oblique|transvers/.test(n) && !/head/.test(n)) return 'abd';
  if (/vertebra|disk|sacrum|hip bone|rib|sternum|cartilage|coccyx|costal/.test(n)) return 'bone';
  if (/psoas|iliacus|quadratus|serratus anterior|pectoralis major/.test(n)) return 'deep';
  return null;
};

interface DissolveU { uDissolve: IUniform<number>; uEdge: IUniform<Color> }
function layerMaterial(color: string, o: { rough: number; coat: number; sheen: number; tint: string; streak: number; bump: number }): { material: MeshPhysicalMaterial; u: DissolveU } {
  const u: DissolveU = { uDissolve: { value: 0 }, uEdge: { value: new Color('#5fe8c8') } };
  const material = new MeshPhysicalMaterial({ color, roughness: o.rough, metalness: 0, clearcoat: o.coat, clearcoatRoughness: 0.32, sheen: o.sheen, sheenColor: new Color(o.tint), envMapIntensity: 1.15, side: DoubleSide });
  material.onBeforeCompile = shader => {
    shader.uniforms.uDissolve = u.uDissolve; shader.uniforms.uEdge = u.uEdge;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vObj;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvObj = position;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
        varying vec3 vObj; uniform float uDissolve; uniform vec3 uEdge;
        float anHash(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
        float anNoise(vec3 x){ vec3 i = floor(x), f = fract(x); f = f*f*(3.0-2.0*f);
          return mix(mix(mix(anHash(i), anHash(i+vec3(1,0,0)), f.x), mix(anHash(i+vec3(0,1,0)), anHash(i+vec3(1,1,0)), f.x), f.y),
                     mix(mix(anHash(i+vec3(0,0,1)), anHash(i+vec3(1,0,1)), f.x), mix(anHash(i+vec3(0,1,1)), anHash(i+vec3(1,1,1)), f.x), f.y), f.z); }`)
      .replace('#include <clipping_planes_fragment>', `#include <clipping_planes_fragment>
        float anField = (anNoise(vObj * 5.5) * 0.5 + anNoise(vObj * 11.0) * 0.1) * 0.25 + (0.5 + vObj.y * 0.55) * 0.8;
        float anCut = uDissolve * 1.45 - 0.2;
        if (uDissolve > 0.001 && anField < anCut) discard;
        float anEdge = (uDissolve > 0.001) ? 1.0 - smoothstep(0.0, 0.03, anField - anCut) : 0.0;`)
      .replace('#include <color_fragment>', `#include <color_fragment>
        diffuseColor.rgb *= 0.82 + 0.36 * anNoise(vObj * 24.0);`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
        {
          float h = anNoise(vObj * vec3(${o.streak.toFixed(1)}, ${(o.streak * 5).toFixed(1)}, ${o.streak.toFixed(1)})) * 0.6 + anNoise(vObj * 150.0) * 0.4;
          vec3 sp = -vViewPosition; vec3 sx = dFdx(sp), sy = dFdy(sp);
          vec3 r1 = cross(sy, normal), r2 = cross(normal, sx); float det = dot(sx, r1);
          vec3 g = sign(det) * (dFdx(h) * r1 + dFdy(h) * r2) * ${o.bump.toFixed(4)};
          normal = normalize(abs(det) * normal - g);
        }`)
      .replace('#include <opaque_fragment>', `outgoingLight += uEdge * anEdge * 2.4;\n#include <opaque_fragment>`);
  };
  material.customProgramCacheKey = () => `gs-layer-${color}`;
  return { material, u };
}

function roundSprite(): CanvasTexture {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const x = c.getContext('2d')!; const g = x.createRadialGradient(32, 32, 3, 32, 32, 30);
  g.addColorStop(0, '#fff'); g.addColorStop(0.5, '#fff'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}

export class Torso {
  readonly root = new Group();
  readonly spin = new Group();
  readonly wall = new Group();
  readonly deep = new Group();
  readonly bones = new Group();
  readonly anchors = { wall: new Vector3(), deep: new Vector3(), bone: new Vector3(), silo: new Vector3() };
  count = 0;
  private mats: Array<{ u: DissolveU }> = [];
  private cloud?: Points;
  private cloudMat?: ShaderMaterial;
  private laserBeam: Mesh; private laserGlow: Mesh;
  private silo = new Group(); private siloLines: LineBasicMaterial; private siloGlass: MeshPhysicalMaterial;
  private rings: Line[] = []; private dotsGeo: BufferGeometry; private dotsMat: PointsMaterial; private dots: Points;
  private dotPos: Float32Array;
  ready = false;

  constructor() {
    this.spin.add(this.bones, this.deep, this.wall);
    this.root.add(this.spin);
    // laser plane: thin bright line plus a soft band
    this.laserBeam = new Mesh(new PlaneGeometry(2.6, 0.012), new MeshBasicMaterial({ color: '#8affdf', transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false, side: DoubleSide }));
    this.laserGlow = new Mesh(new PlaneGeometry(2.6, 0.34), new MeshBasicMaterial({ color: '#2fd9b0', transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false, side: DoubleSide }));
    this.laserBeam.position.z = this.laserGlow.position.z = 0.2;
    this.root.add(this.laserBeam, this.laserGlow);
    // silo, parented to the wall so it travels with the wall layer
    const len = 0.36 * S, r0 = 0.05 * S, r1 = 0.025 * S;
    this.siloGlass = new MeshPhysicalMaterial({ color: '#ffb066', roughness: 0.08, metalness: 0, transmission: 0, transparent: true, opacity: 0.2, side: DoubleSide, depthWrite: false, clearcoat: 1, emissive: new Color('#ff7a1a'), emissiveIntensity: 0.25 });
    this.siloLines = new LineBasicMaterial({ color: '#ffa23c', transparent: true, opacity: 0, blending: AdditiveBlending });
    const body = new Mesh(taper(r0, r1, len), this.siloGlass);
    const edges = new LineSegments(new EdgesGeometry(taper(r0, r1, len), 20), this.siloLines);
    const rings: number[] = [];
    for (let k = 0; k <= 8; k++) { const t = k / 8, r = r0 + (r1 - r0) * t; for (let a = 0; a < 48; a++) { const a0 = (a / 48) * 6.2832, a1 = ((a + 1) / 48) * 6.2832; rings.push(Math.cos(a0) * r, Math.sin(a0) * r, t * len, Math.cos(a1) * r, Math.sin(a1) * r, t * len); } }
    const rg = new BufferGeometry(); rg.setAttribute('position', new Float32BufferAttribute(rings, 3));
    this.silo.add(body, edges, new LineSegments(rg, this.siloLines));
    this.silo.position.copy(UMB); this.silo.quaternion.setFromUnitVectors(new Vector3(0, 0, 1), new Vector3(0, 0.35, 0.94).normalize());
    this.wall.add(this.silo);
    // orbit rings and study markers
    for (const [r, tilt, op] of [[1.32, 0.25, 0.5], [1.62, -0.35, 0.3]] as const) {
      const pts: number[] = []; for (let a = 0; a <= 128; a++) { const t = (a / 128) * 6.2832; pts.push(Math.cos(t) * r, 0, Math.sin(t) * r); }
      const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(pts, 3));
      const ln = new Line(g, new LineBasicMaterial({ color: '#cfe9e2', transparent: true, opacity: 0, blending: AdditiveBlending }));
      ln.rotation.x = tilt; ln.userData.op = op; this.rings.push(ln); this.root.add(ln);
    }
    this.dotPos = new Float32Array(42 * 3);
    const col = new Float32Array(42 * 3); const cc = [[0.56, 0.6, 0.67], [1, 0.62, 0.24], [0.2, 0.9, 0.78]];
    for (let i = 0; i < 42; i++) col.set(cc[i < 19 ? 0 : i < 27 ? 1 : 2], i * 3);
    this.dotsGeo = new BufferGeometry(); this.dotsGeo.setAttribute('position', new BufferAttribute(this.dotPos, 3)); this.dotsGeo.setAttribute('color', new BufferAttribute(col, 3));
    this.dotsMat = new PointsMaterial({ map: roundSprite(), alphaTest: 0.05, size: 0.06, vertexColors: true, transparent: true, opacity: 0, depthWrite: false, sizeAttenuation: true });
    this.dots = new Points(this.dotsGeo, this.dotsMat); this.dots.frustumCulled = false; this.root.add(this.dots);
  }

  async load(url: string): Promise<void> {
    const loader = new GLTFLoader(); loader.setMeshoptDecoder(MeshoptDecoder);
    const gltf = await loader.loadAsync(url);
    gltf.scene.updateMatrixWorld(true);
    const boneM = layerMaterial('#d8cbb2', { rough: 0.5, coat: 0.12, sheen: 0.5, tint: '#fff2dc', streak: 60, bump: 0.0012 });
    const rectM = layerMaterial('#ff9a62', { rough: 0.4, coat: 0.6, sheen: 0.4, tint: '#ffb089', streak: 14, bump: 0.006 });
    const abdM = layerMaterial('#d2605a', { rough: 0.42, coat: 0.55, sheen: 0.4, tint: '#ff8f80', streak: 12, bump: 0.006 });
    const deepM = layerMaterial('#8f3a46', { rough: 0.45, coat: 0.45, sheen: 0.35, tint: '#c86478', streak: 10, bump: 0.005 });
    this.mats = [boneM, rectM, abdM, deepM];
    const mats = { bone: boneM.material, rect: rectM.material, abd: abdM.material, deep: deepM.material };
    const samples: number[] = []; let kept = 0;
    gltf.scene.traverse(o => {
      const m = o as Mesh; if (!m.isMesh) return;
      const name = (m.userData as { name?: string }).name ?? m.name; const kind = kindOf(name); if (!kind) return;
      const src = m.geometry; const p = src.attributes.position; const n = p.count;
      const f = new Float32Array(n * 3); const v = new Vector3();
      for (let i = 0; i < n; i++) { v.set(p.getX(i), p.getY(i), p.getZ(i)).applyMatrix4(m.matrixWorld); f[i * 3] = v.x; f[i * 3 + 1] = v.y; f[i * 3 + 2] = v.z; }
      const cx = f.reduce((a, _, i) => (i % 3 === 0 ? a + f[i] : a), 0) / n, cy = f.reduce((a, _, i) => (i % 3 === 1 ? a + f[i] : a), 0) / n;
      if (!(cy > 0.86 && cy < 1.4 && Math.abs(cx) < 0.24)) return;
      for (let i = 0; i < n; i++) { f[i * 3] = (f[i * 3] - CEN.x) * S; f[i * 3 + 1] = (f[i * 3 + 1] - CEN.y) * S; f[i * 3 + 2] = (f[i * 3 + 2] - CEN.z) * S; }
      const g = new BufferGeometry(); g.setAttribute('position', new BufferAttribute(f, 3));
      if (src.index) g.setIndex(src.index.clone());
      g.computeVertexNormals();
      const mesh = new Mesh(g, mats[kind]); mesh.name = name;
      (kind === 'bone' ? this.bones : kind === 'deep' ? this.deep : this.wall).add(mesh);
      for (let i = 0; i < n; i += kind === 'bone' ? 2 : 1) { samples.push(f[i * 3], f[i * 3 + 1], f[i * 3 + 2]); kept++; }
    });
    this.count = kept;
    // scan cloud of the same surface points
    const pos = new Float32Array(samples); const rnd = new Float32Array(kept);
    for (let i = 0; i < kept; i++) rnd[i] = Math.random();
    const cg = new BufferGeometry(); cg.setAttribute('position', new BufferAttribute(pos, 3)); cg.setAttribute('aRnd', new BufferAttribute(rnd, 1));
    this.cloudMat = new ShaderMaterial({
      transparent: true, depthWrite: false, blending: AdditiveBlending,
      uniforms: { uScan: { value: 1.2 }, uCloud: { value: 0 }, uAfter: { value: 0.2 }, uSettle: { value: 1 }, uScale: { value: 800 }, uTime: { value: 0 } },
      vertexShader: `attribute float aRnd; uniform float uScan,uCloud,uAfter,uSettle,uScale,uTime; varying float vA; varying float vG;
        void main(){ vec3 p = position;
          float d = (1.0 - uSettle);
          p += (vec3(sin(aRnd*91.0+uTime*.7), cos(aRnd*57.0+uTime*.5), sin(aRnd*33.0+uTime*.9)) * .9) * d * d;
          float scanned = step(uScan, p.y);
          float near = exp(-max(0.0, p.y - uScan) * 5.0);
          vA = uCloud * scanned * mix(uAfter, 1.0, near);
          vG = exp(-pow((p.y - uScan) * 22.0, 2.0));
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = max(1.0, (0.0105 + vG * 0.018) * uScale / -mv.z);
          gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `varying float vA; varying float vG; void main(){ float d = length(gl_PointCoord - .5); if (d > .5 || vA < .01) discard;
        gl_FragColor = vec4(mix(vec3(.37,.91,.78), vec3(1.,1.,1.), vG), vA * (1.0 - smoothstep(.2, .5, d))); }`,
    });
    this.cloud = new Points(cg, this.cloudMat); this.cloud.frustumCulled = false; this.spin.add(this.cloud);
    this.ready = true;
  }

  apply(s: HeroState, time: number, scale: number): void {
    this.spin.rotation.set(s.pitch, s.yaw, 0); this.spin.position.y = s.lift;
    // layers separate along z
    this.wall.position.z = 0.62 * s.explode; this.deep.position.z = 0.04 * s.explode; this.bones.position.z = -0.55 * s.explode;
    const open = 1 - s.solid;
    for (const m of this.mats) m.u.uDissolve.value = open;
    this.wall.visible = this.deep.visible = this.bones.visible = open < 0.999;
    // keep the inner layers readable while exploded: deep muscles and bones dim behind the wall only when closed
    this.anchors.wall.set(0.62, 0.34, 0.74 + 0.62 * s.explode);
    this.anchors.deep.set(-0.55, -0.1, 0.18 + 0.04 * s.explode);
    this.anchors.bone.set(0.35, -0.55, -0.35 - 0.55 * s.explode);
    this.anchors.silo.set(0, -0.1 + 0.2 * s.silo, 0.8 + 0.6 * s.silo + 0.62 * s.explode);
    // silo grows from the umbilicus
    const k = Math.max(0.001, s.silo);
    this.silo.scale.set(1, 1, k); this.silo.visible = s.silo > 0.002;
    this.siloLines.opacity = Math.min(1, s.silo * 1.4) * (0.75 + 0.25 * Math.sin(time * 2.4)); this.siloGlass.opacity = 0.22 * Math.min(1, s.silo * 1.4);
    // scan cloud and laser
    if (this.cloudMat) {
      const u = this.cloudMat.uniforms;
      u.uScan.value = s.scanY; u.uCloud.value = s.cloud; u.uAfter.value = s.after; u.uSettle.value = s.settle; u.uScale.value = scale; u.uTime.value = time;
    }
    this.laserBeam.position.y = this.laserGlow.position.y = s.scanY; this.laserBeam.rotation.y = this.laserGlow.rotation.y = 0;
    (this.laserBeam.material as MeshBasicMaterial).opacity = 0.95 * s.laser; (this.laserGlow.material as MeshBasicMaterial).opacity = 0.16 * s.laser;
    this.laserBeam.visible = this.laserGlow.visible = s.laser > 0.01;
    // rings and study markers: orbit, then sort into three lanes beside the torso
    this.rings.forEach((r, i) => { (r.material as LineBasicMaterial).opacity = (r.userData.op as number) * s.rings; r.rotation.y = time * (0.06 + i * 0.03) * (i ? -1 : 1); });
    const lanes = [-0.2, 0.0, 0.2];
    for (let i = 0; i < 42; i++) {
      const gr = i < 19 ? 0 : i < 27 ? 1 : 2, idx = gr === 0 ? i : gr === 1 ? i - 19 : i - 27;
      const ring = this.rings[i % 2], R = i % 2 ? 1.62 : 1.32, a = time * (0.22 + gr * 0.04) * (i % 2 ? -1 : 1) + i * 0.7;
      const ox = Math.cos(a) * R, oz = Math.sin(a) * R;
      const px = ox, pz = oz;
      const tx = Math.cos(ring.rotation.y) * px + Math.sin(ring.rotation.y) * pz, tz = -Math.sin(ring.rotation.y) * px + Math.cos(ring.rotation.y) * pz;
      const ty = Math.sin(ring.rotation.x) * tz, tz2 = Math.cos(ring.rotation.x) * tz;
      const e = s.sort * s.sort * (3 - 2 * s.sort);
      const sx = -0.95 + gr * 0.95 + lanes[gr] * 0, sy = -0.92 + idx * 0.062 * (gr === 0 ? 1 : 1.9), sz = 1.25;
      this.dotPos[i * 3] = tx + (sx - tx) * e; this.dotPos[i * 3 + 1] = ty + (sy - ty) * e; this.dotPos[i * 3 + 2] = tz2 + (sz - tz2) * e;
    }
    this.dotsGeo.attributes.position.needsUpdate = true; this.dotsMat.opacity = s.dots * Math.max(s.rings, s.sort); this.dotsMat.size = 0.055;
  }
}

function taper(r0: number, r1: number, len: number): BufferGeometry {
  const seg = 36, pos: number[] = [], idx: number[] = [];
  for (let k = 0; k <= 1; k++) for (let a = 0; a < seg; a++) { const t = (a / seg) * 6.2832, r = k ? r1 : r0; pos.push(Math.cos(t) * r, Math.sin(t) * r, k * len); }
  for (let a = 0; a < seg; a++) { const b = (a + 1) % seg; idx.push(a, b, seg + a, b, seg + b, seg + a); }
  const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals(); return g;
}
