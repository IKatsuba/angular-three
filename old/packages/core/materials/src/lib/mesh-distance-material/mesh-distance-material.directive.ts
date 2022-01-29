// GENERATED
import { NGT_OBJECT_3D_PROVIDER, NgtMaterial } from '@angular-three/core';
import { NgModule, Directive } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-mesh-distance-material',
  exportAs: 'ngtMeshDistanceMaterial',
  providers: [
    {
      provide: NgtMaterial,
      useExisting: NgtMeshDistanceMaterial,
    },
    NGT_OBJECT_3D_PROVIDER,
  ],
})
export class NgtMeshDistanceMaterial extends NgtMaterial<
  THREE.MeshDistanceMaterialParameters,
  THREE.MeshDistanceMaterial
> {
  static ngAcceptInputType_parameters:
    | THREE.MeshDistanceMaterialParameters
    | undefined;

  materialType = THREE.MeshDistanceMaterial;
}

@NgModule({
  declarations: [NgtMeshDistanceMaterial],
  exports: [NgtMeshDistanceMaterial],
})
export class NgtMeshDistanceMaterialModule {}
