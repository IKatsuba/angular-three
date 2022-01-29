// GENERATED
import { NGT_OBJECT_3D_PROVIDER, NgtMaterial } from '@angular-three/core';
import { NgModule, Directive } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-mesh-depth-material',
  exportAs: 'ngtMeshDepthMaterial',
  providers: [
    {
      provide: NgtMaterial,
      useExisting: NgtMeshDepthMaterial,
    },
    NGT_OBJECT_3D_PROVIDER,
  ],
})
export class NgtMeshDepthMaterial extends NgtMaterial<
  THREE.MeshDepthMaterialParameters,
  THREE.MeshDepthMaterial
> {
  static ngAcceptInputType_parameters:
    | THREE.MeshDepthMaterialParameters
    | undefined;

  materialType = THREE.MeshDepthMaterial;
}

@NgModule({
  declarations: [NgtMeshDepthMaterial],
  exports: [NgtMeshDepthMaterial],
})
export class NgtMeshDepthMaterialModule {}
