// GENERATED
import { NgtMaterial } from '@angular-three/core';
import { NgModule, Directive } from '@angular/core';
import * as THREE from 'three';

@Directive({
    selector: 'ngt-mesh-phong-material',
    exportAs: 'ngtMeshPhongMaterial',
    providers: [
        {
            provide: NgtMaterial,
            useExisting: NgtMeshPhongMaterial,
        },
    ],
})
export class NgtMeshPhongMaterial extends NgtMaterial<
    THREE.MeshPhongMaterialParameters,
    THREE.MeshPhongMaterial
> {
    static ngAcceptInputType_parameters:
        | THREE.MeshPhongMaterialParameters
        | undefined;

    materialType = THREE.MeshPhongMaterial;
}

@NgModule({
    declarations: [NgtMeshPhongMaterial],
    exports: [NgtMeshPhongMaterial],
})
export class NgtMeshPhongMaterialModule {}
