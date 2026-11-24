import {
  AdditiveBlending, BackSide, BoxGeometry, BufferGeometry, Color, ConeGeometry, DirectionalLight, DoubleSide,
  Float32BufferAttribute, Group, Mesh, MeshBasicMaterial, PlaneGeometry, PMREMGenerator, Points, Scene,
  ShaderMaterial, SphereGeometry, SpotLight, Texture, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

export const FLOOR_Y = -1.05;
export const BG = new Color('#050506');

/** A dark studio with softboxes, baked once into a PMREM environment so glossy surfaces have something to reflect. */
export function buildEnvironment(renderer: WebGLRenderer): Texture {
  const env = new Scene();
  const room = new Mesh(new SphereGeometry(20, 32, 16), new MeshBasicMaterial({ color: new Color('#0a0b0e'), side: BackSide }));
  env.add(room);
  const box = (w: number, h: number, c: string, i: number, x: number, y: number, z: number, ry = 0) => {
    const m = new Mesh(new BoxGeometry(w, h, 0.1), new MeshBasicMaterial({ color: new Color(c).multiplyScalar(i), toneMapped: false }));
    m.position.set(x, y, z);
    m.lookAt(0, 0, 0);
    m.rotateY(ry);
    env.add(m);
  };
  box(8, 5, '#ffe6cf', 9, -8, 7, 8);      // warm key softbox, upper left front
  box(1.6, 9, '#bcd2ff', 7, 9, 2, 3);     // cool strip, right
  box(10, 1.2, '#ffffff', 4, 0, 9, -5);   // overhead back
  box(6, 3, '#38d6c0', 2.6, -9, -1, -6);  // violet kicker, behind left
  box(14, 0.6, '#ffd8b0', 1.2, 0, -5, 6); // bounce from below front
  const pm = new PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  env.traverse(o => { if (o instanceof Mesh) { o.geometry.dispose(); (o.material as MeshBasicMaterial).dispose(); } });
  return rt.texture;
}

export interface Lights { key: SpotLight; rim: DirectionalLight; group: Group }

export function buildLights(): Lights {
  const group = new Group();
  const key = new SpotLight('#ffe2c6', 90, 0, 0.6, 0.9, 1.4);
  key.position.set(-3.2, 4.2, 4.4);
  key.target.position.set(0, 0.1, 0);
  const rim = new DirectionalLight('#9fb8ff', 2.4);
  rim.position.set(3.5, 2.6, -4);
  group.add(key, key.target, rim);
  return { key, rim, group };
}

/** Reflective graphite floor: blurred, noise-perturbed mirror image fading with distance, plus a warm light pool. */
export function buildFloor(width: number, height: number): Reflector {
  const shader = {
    name: 'StudioFloor',
    uniforms: {
      color: { value: null as unknown },
      tDiffuse: { value: null as unknown },
      textureMatrix: { value: null as unknown },
      uTime: { value: 0 },
      uStrength: { value: 1 },
      uPool: { value: 1 },
      uRes: { value: new Vector2(width, height) },
      uBg: { value: BG.clone() },
      uSub: { value: new Vector2(0, 0) },
      uDial: { value: 1 },
    },
    vertexShader: /* glsl */`
      uniform mat4 textureMatrix;
      varying vec4 vUv;
      varying vec2 vPlane;
      void main(){
        vUv = textureMatrix * vec4(position, 1.0);
        vPlane = position.xy;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 color; uniform sampler2D tDiffuse; uniform float uTime; uniform float uStrength; uniform float uPool;
      uniform vec2 uRes; uniform vec3 uBg; uniform vec2 uSub; uniform float uDial;
      varying vec4 vUv; varying vec2 vPlane;
      float h21(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
        return mix(mix(h21(i),h21(i+vec2(1,0)),f.x), mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x), f.y); }
      void main(){
        vec2 q = vPlane;
        float d = length(q - uSub);
        // brushed micro-relief that streaks the mirror image
        float n = vn(q * 38.0) * 0.5 + vn(q * 9.0 + 3.0) * 0.5;
        vec2 warp = vec2(n - 0.5, vn(q * 22.0 + 7.0) - 0.5) * 0.010;
        vec4 uv = vUv; uv.xy += warp * uv.w;
        vec2 base = uv.xy / uv.w;
        // blur grows with distance from the object (contact stays sharp)
        float blur = 0.0016 + 0.0075 * smoothstep(0.0, 4.5, d);
        vec3 acc = vec3(0.0); float wsum = 0.0;
        for (int i = 0; i < 16; i++) {
          float a = float(i) * 2.399963 + h21(q * 91.0) * 6.28;
          float r = sqrt((float(i) + 0.5) / 16.0) * blur;
          vec2 o = vec2(cos(a), sin(a) * uRes.x / uRes.y) * r;
          float wgt = 1.0 - 0.6 * (r / blur);
          acc += texture2D(tDiffuse, base + o).rgb * wgt; wsum += wgt;
        }
        vec3 refl = acc / wsum;
        float fade = exp(-d * 0.42) * uStrength;
        float edge = smoothstep(21.0, 6.0, length(q));
        float pool = exp(-pow(length((q - uSub) * vec2(0.55, 0.8)), 2.0) * 0.55) * uPool;
        vec3 base_c = color * (0.35 + 0.65 * n);
        vec3 col = uBg + base_c * 0.05 + vec3(0.95, 0.66, 0.46) * pool * 0.085 * (0.55 + 0.45 * n) + refl * fade * 0.85;
        col *= 1.0 - 0.7 * exp(-pow(length(q * vec2(1.0, 1.55)), 2.0) * 7.0);
        // instrument dial engraved into the floor: rings, tick bands and a slow radar sweep around the subject
        {
          vec2 dq = q - uSub; float dr = length(dq); float da = atan(dq.y, dq.x);
          float rings = smoothstep(0.014, 0.0, abs(dr - 1.55)) + 0.6 * smoothstep(0.012, 0.0, abs(dr - 2.15)) + 0.5 * smoothstep(0.012, 0.0, abs(dr - 3.1)) + 0.35 * smoothstep(0.01, 0.0, abs(dr - 4.4));
          float t1 = step(0.78, fract(da * 150.0 / 6.2831853)) * step(1.62, dr) * step(dr, 1.86);
          float t2 = step(0.8, fract(da * 18.0 / 6.2831853)) * step(2.22, dr) * step(dr, 2.6);
          float t3 = step(0.7, fract(da * 72.0 / 6.2831853)) * step(3.16, dr) * step(dr, 3.3);
          float sweep = pow(max(0.0, 1.0 - mod(da - uTime * 0.45, 6.2831853) / 1.3), 3.0) * step(1.62, dr) * step(dr, 3.3);
          float fadeD = exp(-dr * 0.16) * (0.55 + 0.45 * n);
          col += vec3(0.37, 0.91, 0.78) * (rings * 0.3 + t1 * 0.3 + t2 * 0.22 + t3 * 0.18 + sweep * 0.16) * fadeD * uDial;
        }
        col = mix(uBg, col, edge);
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  };
  const refl = new Reflector(new PlaneGeometry(60, 60), {
    shader, textureWidth: Math.max(256, Math.floor(width * 0.7)), textureHeight: Math.max(256, Math.floor(height * 0.7)),
    clipBias: 0.003, color: new Color('#3a3c44'), multisample: 0,
  });
  refl.rotation.x = -Math.PI / 2;
  refl.position.y = FLOOR_Y;
  return refl;
}

/** Slow motes drifting through the key light; they catch bloom and make the air visible. */
export function buildDust(count = 700): Points {
  const pos = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 9;
    pos[i * 3 + 1] = FLOOR_Y + Math.random() * 6;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 9;
    seed[i] = Math.random();
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pos, 3));
  g.setAttribute('aSeed', new Float32BufferAttribute(seed, 1));
  const m = new ShaderMaterial({
    transparent: true, depthWrite: false, blending: AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uScale: { value: 1 }, uAlpha: { value: 1 } },
    vertexShader: /* glsl */`
      attribute float aSeed; uniform float uTime; uniform float uScale; varying float vA;
      void main(){
        vec3 p = position;
        p.y = mod(p.y - ${FLOOR_Y.toFixed(2)} + uTime * (0.015 + aSeed * 0.03), 6.0) + ${FLOOR_Y.toFixed(2)};
        p.x += sin(uTime * 0.12 + aSeed * 40.0) * 0.18;
        p.z += cos(uTime * 0.10 + aSeed * 23.0) * 0.18;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (0.9 + aSeed * 2.4) * uScale / -mv.z;
        // dust only lights up inside the key beam (upper left front of the subject)
        vec3 toKey = normalize(vec3(-3.2, 4.2, 4.4) - vec3(0.0));
        float beam = smoothstep(0.55, 0.95, dot(normalize(p - vec3(0.0, 0.2, 0.0)), -toKey) * -1.0 + 0.0);
        vA = (0.15 + 0.85 * aSeed) * (0.35 + beam * 0.65) * smoothstep(8.0, 2.0, -mv.z);
      }`,
    fragmentShader: /* glsl */`
      varying float vA; uniform float uAlpha;
      void main(){
        float d = length(gl_PointCoord - 0.5) * 2.0;
        float a = smoothstep(1.0, 0.0, d) * vA * uAlpha;
        gl_FragColor = vec4(vec3(1.0, 0.86, 0.7) * 1.6, a * 0.5);
      }`,
  });
  const pts = new Points(g, m);
  pts.frustumCulled = false;
  return pts;
}

/** Faint volumetric cone from the key light toward the subject. */
export function buildBeam(from: [number, number, number] = [-3.2, 4.2, 4.4], radius = 1.7, tint: [number, number, number] = [1.0, 0.84, 0.66]): Mesh {
  const geo = new ConeGeometry(radius, 7.2, 48, 1, true);
  geo.translate(0, -3.6, 0);
  const mat = new ShaderMaterial({
    transparent: true, depthWrite: false, blending: AdditiveBlending, side: DoubleSide,
    uniforms: { uAmount: { value: 0.22 }, uTime: { value: 0 }, uTint: { value: new Vector3(...tint) } },
    vertexShader: /* glsl */`
      varying vec3 vN; varying vec3 vV; varying float vH;
      void main(){
        vH = position.y / -7.2;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vN = normalize(normalMatrix * normal);
        vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */`
      uniform float uAmount; uniform float uTime; uniform vec3 uTint; varying vec3 vN; varying vec3 vV; varying float vH;
      void main(){
        float f = pow(abs(dot(normalize(vN), normalize(vV))), 2.4);
        float fall = smoothstep(0.0, 0.25, vH) * (1.0 - smoothstep(0.65, 1.0, vH));
        gl_FragColor = vec4(uTint, f * fall * uAmount * 0.42);
      }`,
  });
  const cone = new Mesh(geo, mat);
  cone.position.set(...from);
  cone.lookAt(0, 0.1, 0);
  cone.rotateX(-Math.PI / 2);
  return cone;
}

/** Soft violet-and-warm glow far behind the subject so the dark room has depth and the silhouette separates. */
export function buildBackdrop(): Mesh {
  const mat = new ShaderMaterial({
    transparent: true, depthWrite: false, blending: AdditiveBlending,
    uniforms: { uAmount: { value: 1 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `varying vec2 vUv; uniform float uAmount;
      void main(){
        vec2 p = (vUv - vec2(0.5, 0.55)) * vec2(1.0, 1.15);
        float d = length(p);
        float core = exp(-d * d * 14.0);
        float halo = exp(-d * d * 3.2);
        vec3 c = vec3(0.1, 0.6, 0.6) * halo * 0.004 + vec3(0.95, 0.62, 0.42) * core * 0.002;
        gl_FragColor = vec4(c * uAmount, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const m = new Mesh(new PlaneGeometry(26, 20), mat);
  m.position.set(0, 0.6, -7);
  m.renderOrder = -2;
  return m;
}

/** Tall slanted light shafts behind the subject: soft edges, fade along their length, slow breathing. */
export function buildGodrays(): Group {
  const g = new Group();
  const specs: Array<{ p: [number, number, number]; rz: number; w: number; a: number; tint: [number, number, number] }> = [
    { p: [2.4, 2.6, -1.6], rz: -0.42, w: 1.5, a: 1.0, tint: [0.7, 1.0, 0.93] },
    { p: [-2.8, 2.8, -2.4], rz: 0.36, w: 1.1, a: 0.7, tint: [0.55, 0.9, 1.0] },
    { p: [0.4, 3.2, -3.2], rz: -0.12, w: 1.9, a: 0.55, tint: [0.85, 1.0, 0.97] },
    { p: [4.2, 2.4, -3.4], rz: -0.55, w: 1.0, a: 0.5, tint: [0.6, 0.95, 0.9] },
  ];
  for (const s of specs) {
    const m = new Mesh(new PlaneGeometry(s.w, 11), new ShaderMaterial({
      transparent: true, depthWrite: false, blending: AdditiveBlending, side: DoubleSide,
      uniforms: { uAmount: { value: s.a }, uTime: { value: 0 }, uTint: { value: new Vector3(...s.tint) }, uPhase: { value: Math.random() * 6 } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: `varying vec2 vUv; uniform float uAmount; uniform float uTime; uniform vec3 uTint; uniform float uPhase;
        void main(){
          float across = smoothstep(0.0, 0.5, vUv.x) * smoothstep(1.0, 0.5, vUv.x);
          float along = smoothstep(0.0, 0.12, vUv.y) * pow(vUv.y, 1.2);
          float breathe = 0.78 + 0.22 * sin(uTime * 0.35 + uPhase + vUv.y * 3.0);
          float a = across * across * across * along * breathe * uAmount * 0.12;
          gl_FragColor = vec4(uTint * a, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    }));
    m.position.set(...s.p); m.rotation.z = s.rz; m.renderOrder = -1;
    g.add(m);
  }
  return g;
}

/** Fine sparks lifting off the dial ring and fading as they rise. */
export function buildSparks(count = 360): Points {
  const pos = new Float32Array(count * 3), seed = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2, r = 1.5 + Math.random() * 1.9;
    pos[i * 3] = Math.cos(a) * r; pos[i * 3 + 1] = Math.random(); pos[i * 3 + 2] = Math.sin(a) * r; seed[i] = Math.random();
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pos, 3));
  g.setAttribute('aSeed', new Float32BufferAttribute(seed, 1));
  const m = new ShaderMaterial({
    transparent: true, depthWrite: false, blending: AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uScale: { value: 600 }, uAmount: { value: 1 } },
    vertexShader: `attribute float aSeed; uniform float uTime; uniform float uScale; varying float vA;
      void main(){
        float life = fract(uTime * (0.07 + aSeed * 0.1) + aSeed * 7.0);
        vec3 p = position; p.y = ${FLOOR_Y.toFixed(2)} + life * (1.2 + aSeed * 2.4);
        p.x += sin(uTime * 0.6 + aSeed * 30.0) * 0.06; p.z += cos(uTime * 0.5 + aSeed * 17.0) * 0.06;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (0.8 + aSeed * 1.6) * uScale * 0.006 / -mv.z * 3.0;
        vA = sin(life * 3.14159) * (0.4 + aSeed * 0.6);
      }`,
    fragmentShader: `uniform float uAmount; varying float vA;
      void main(){ float d = length(gl_PointCoord - 0.5) * 2.0; float a = smoothstep(1.0, 0.0, d) * vA * uAmount; gl_FragColor = vec4(vec3(0.45, 1.0, 0.88) * 1.8, a * 0.8); }`,
  });
  const p = new Points(g, m); p.frustumCulled = false;
  return p;
}
