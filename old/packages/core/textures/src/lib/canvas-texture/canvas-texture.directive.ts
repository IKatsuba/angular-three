// GENERATED
import { NgtTexture } from '@angular-three/core';
import { NgModule, Directive, Input } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-canvas-texture',
  exportAs: 'ngtCanvasTexture',
  providers: [
    {
      provide: NgtTexture,
      useExisting: NgtCanvasTexture,
    },
  ],
})
export class NgtCanvasTexture extends NgtTexture<THREE.CanvasTexture> {
  static ngAcceptInputType_args:
    | ConstructorParameters<typeof THREE.CanvasTexture>
    | undefined;

  @Input() set args(v: ConstructorParameters<typeof THREE.CanvasTexture>) {
    this.textureArgs = v;
  }

  textureType = THREE.CanvasTexture;
}

@NgModule({
  declarations: [NgtCanvasTexture],
  exports: [NgtCanvasTexture],
})
export class NgtCanvasTextureModule {}
