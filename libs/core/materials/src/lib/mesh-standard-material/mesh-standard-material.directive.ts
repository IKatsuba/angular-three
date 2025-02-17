// GENERATED
import { NgtMaterial } from '@angular-three/core';
import { NgModule, Directive } from '@angular/core';
import * as THREE from 'three';

@Directive({
    selector: 'ngt-mesh-standard-material',
    exportAs: 'ngtMeshStandardMaterial',
    providers: [
        {
            provide: NgtMaterial,
            useExisting: NgtMeshStandardMaterial,
        },
    ],
})
export class NgtMeshStandardMaterial extends NgtMaterial<
    THREE.MeshStandardMaterialParameters,
    THREE.MeshStandardMaterial
> {
    static ngAcceptInputType_parameters:
        | THREE.MeshStandardMaterialParameters
        | undefined;

    materialType = THREE.MeshStandardMaterial;
}

@NgModule({
    declarations: [NgtMeshStandardMaterial],
    exports: [NgtMeshStandardMaterial],
})
export class NgtMeshStandardMaterialModule {}
