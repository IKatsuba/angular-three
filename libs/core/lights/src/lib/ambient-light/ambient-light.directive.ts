// GENERATED
import {
    createParentObjectProvider,
    NgtLight,
    NGT_OBJECT_CONTROLLER_PROVIDER,
    NgtObjectControllerModule,
} from '@angular-three/core';
import { NgModule, Directive, Input } from '@angular/core';
import * as THREE from 'three';

@Directive({
    selector: 'ngt-ambient-light',
    exportAs: 'ngtAmbientLight',
    providers: [
        {
            provide: NgtLight,
            useExisting: NgtAmbientLight,
        },
        NGT_OBJECT_CONTROLLER_PROVIDER,
        createParentObjectProvider(NgtAmbientLight, (parent) => parent.light),
    ],
})
export class NgtAmbientLight extends NgtLight<THREE.AmbientLight> {
    static ngAcceptInputType_args:
        | ConstructorParameters<typeof THREE.AmbientLight>
        | undefined;

    @Input() set args(v: ConstructorParameters<typeof THREE.AmbientLight>) {
        this.lightArgs = v;
    }

    lightType = THREE.AmbientLight;
}

@NgModule({
    declarations: [NgtAmbientLight],
    exports: [NgtAmbientLight, NgtObjectControllerModule],
})
export class NgtAmbientLightModule {}
