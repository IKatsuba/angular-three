// GENERATED
import { NgtTexture } from '@angular-three/core';
import { NgModule, Directive, Input } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-data-texture3-d',
  exportAs: 'ngtDataTexture3D',
  providers: [
    {
      provide: NgtTexture,
      useExisting: NgtDataTexture3D,
    },
  ],
})
export class NgtDataTexture3D extends NgtTexture<THREE.DataTexture3D> {
  static ngAcceptInputType_args:
    | ConstructorParameters<typeof THREE.DataTexture3D>
    | undefined;

  @Input() set args(v: ConstructorParameters<typeof THREE.DataTexture3D>) {
    this.textureArgs = v;
  }

  textureType = THREE.DataTexture3D;
}

@NgModule({
  declarations: [NgtDataTexture3D],
  exports: [NgtDataTexture3D],
})
export class NgtDataTexture3DModule {}
