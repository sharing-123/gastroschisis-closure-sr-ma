import {
  HalfFloatType, NoToneMapping, PerspectiveCamera, Scene, Vector2, WebGLRenderer,
} from 'three';
import {
  BlendFunction, BloomEffect, ChromaticAberrationEffect, EffectComposer, EffectPass, NoiseEffect, RenderPass,
  SMAAEffect, ToneMappingEffect, ToneMappingMode, VignetteEffect,
} from 'postprocessing';
import { BG } from './studio';

export interface Stage {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: PerspectiveCamera;
  composer: EffectComposer;
  bloom: BloomEffect;
  aberration: ChromaticAberrationEffect;
  vignette: VignetteEffect;
  resize: (w: number, h: number) => void;
  render: (dt: number) => void;
  pixelRatio: () => number;
  coarse: boolean;
  size: Vector2;
  /** false while frames are being throttled by the browser (hidden tab), so they do not count against quality */
  sampleOk: boolean;
}

/** One renderer, one scene, one composer for the whole page. */
export function createStage(canvas: HTMLCanvasElement, capture = false): Stage {
  const coarse = matchMedia('(pointer: coarse)').matches;
  const renderer = new WebGLRenderer({
    canvas, antialias: false, stencil: false, depth: true, alpha: false,
    powerPreference: 'high-performance', preserveDrawingBuffer: capture,
  });
  renderer.setClearColor(BG, 1);
  renderer.toneMapping = NoToneMapping; // tone mapping happens in the composer so reflections stay linear
  renderer.toneMappingExposure = 1;
  let pr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
  renderer.setPixelRatio(pr);

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 80);

  const composer = new EffectComposer(renderer, {
    frameBufferType: HalfFloatType, multisampling: coarse ? 0 : 4,
  });
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new BloomEffect({ intensity: 0.55, luminanceThreshold: 0.9, luminanceSmoothing: 0.25, mipmapBlur: true, radius: 0.7 });
  const aberration = new ChromaticAberrationEffect({ offset: new Vector2(0, 0), radialModulation: true, modulationOffset: 0.35 });
  const vignette = new VignetteEffect({ offset: 0.28, darkness: 0.62 });
  const noise = new NoiseEffect({ blendFunction: BlendFunction.OVERLAY, premultiply: true });
  noise.blendMode.opacity.value = 0.22;
  const tone = new ToneMappingEffect({ mode: ToneMappingMode.AGX });
  composer.addPass(new EffectPass(camera, bloom, aberration));
  composer.addPass(new EffectPass(camera, tone, vignette, noise));
  if (!coarse) composer.addPass(new EffectPass(camera, new SMAAEffect()));

  const size = new Vector2(1, 1);
  const stage: Stage = {
    renderer, scene, camera, composer, bloom, aberration, vignette, coarse, size, sampleOk: true,
    pixelRatio: () => pr,
    resize(w, h) {
      size.set(w, h);
      renderer.setPixelRatio(pr);
      composer.setSize(w, h, false);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    },
    render(dt) {
      // adaptive resolution: only ever steps down
      if (stage.sampleOk) { acc += dt; frames++; }
      if (frames >= 45) {
        const avg = acc / frames;
        if (avg > 0.024 && pr > 0.75) { pr = Math.max(0.75, pr - 0.15); stage.resize(size.x, size.y); }
        acc = 0; frames = 0;
      }
      composer.render(dt);
    },
  };
  let acc = 0, frames = 0;
  return stage;
}
