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
    selector: 'ngt-hemisphere-light',
    exportAs: 'ngtHemisphereLight',
    providers: [
        {
            provide: NgtLight,
            useExisting: NgtHemisphereLight,
        },
        NGT_OBJECT_CONTROLLER_PROVIDER,
        createParentObjectProvider(
            NgtHemisphereLight,
            (parent) => parent.light
        ),
    ],
})
export class NgtHemisphereLight extends NgtLight<THREE.HemisphereLight> {
    static ngAcceptInputType_args:
        | ConstructorParameters<typeof THREE.HemisphereLight>
        | undefined;

    @Input() set args(v: ConstructorParameters<typeof THREE.HemisphereLight>) {
        this.lightArgs = v;
    }

    lightType = THREE.HemisphereLight;
}

@NgModule({
    declarations: [NgtHemisphereLight],
    exports: [NgtHemisphereLight, NgtObjectControllerModule],
})
export class NgtHemisphereLightModule {}
