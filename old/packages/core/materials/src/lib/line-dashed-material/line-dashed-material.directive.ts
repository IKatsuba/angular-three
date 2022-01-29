// GENERATED
import { NGT_OBJECT_3D_PROVIDER, NgtMaterial } from '@angular-three/core';
import { NgModule, Directive } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-line-dashed-material',
  exportAs: 'ngtLineDashedMaterial',
  providers: [
    {
      provide: NgtMaterial,
      useExisting: NgtLineDashedMaterial,
    },
    NGT_OBJECT_3D_PROVIDER,
  ],
})
export class NgtLineDashedMaterial extends NgtMaterial<
  THREE.LineDashedMaterialParameters,
  THREE.LineDashedMaterial
> {
  static ngAcceptInputType_parameters:
    | THREE.LineDashedMaterialParameters
    | undefined;

  materialType = THREE.LineDashedMaterial;
}

@NgModule({
  declarations: [NgtLineDashedMaterial],
  exports: [NgtLineDashedMaterial],
})
export class NgtLineDashedMaterialModule {}
