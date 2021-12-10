import * as THREE from 'three';
import { NgtCamera } from '../camera';
import { NgtInstance } from '../instance';
import { NgtRaycaster } from '../raycaster';
import { NgtSize } from '../size';
import { NgtCurrentViewport, NgtViewport } from '../viewport';
import { NgtPerformance } from './performance-state';

/**
 *   dpr: NgtDpr;
 *   raycaster: Partial<NgtRaycaster>;
 *   shadows: boolean | Partial<THREE.WebGLShadowMap>;
 *   cameraOptions: NgtCameraOptions;
 *   sceneOptions: NgtSceneOptions;
 *   glOptions: NgtGLOptions;
 */

export interface NgtState {
  ready: boolean;
  vr: boolean;
  linear: boolean;
  flat: boolean;
  orthographic: boolean;
  mouse: THREE.Vector2;
  clock: THREE.Clock;
  frameloop: 'always' | 'demand' | 'never';
  performance: NgtPerformance;
  size: NgtSize;
  viewport: NgtViewport & {
    getCurrentViewport: (
      camera?: NgtCamera,
      target?: THREE.Vector3,
      size?: NgtSize
    ) => NgtCurrentViewport;
  };
  controls: THREE.EventDispatcher | null;
  renderer: THREE.WebGLRenderer;
  camera: NgtCamera;
  scene: THREE.Scene;
  raycaster: NgtRaycaster;
  objects: Record<string, NgtInstance>;
}

export interface NgtCreatedState {
  mouse: THREE.Vector2;
  clock: THREE.Clock;
  renderer: THREE.WebGLRenderer;
  size: NgtSize;
  viewport: NgtViewport;
  camera: NgtCamera;
  scene: THREE.Scene;
  raycaster: NgtRaycaster;
}
