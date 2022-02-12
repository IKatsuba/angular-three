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
    selector: 'ngt-hemisphere-light-probe',
    exportAs: 'ngtHemisphereLightProbe',
    providers: [
        {
            provide: NgtLight,
            useExisting: NgtHemisphereLightProbe,
        },
        NGT_OBJECT_CONTROLLER_PROVIDER,
        createParentObjectProvider(
            NgtHemisphereLightProbe,
            (parent) => parent.light
        ),
    ],
})
export class NgtHemisphereLightProbe extends NgtLight<THREE.HemisphereLightProbe> {
    static ngAcceptInputType_args:
        | ConstructorParameters<typeof THREE.HemisphereLightProbe>
        | undefined;

    @Input() set args(
        v: ConstructorParameters<typeof THREE.HemisphereLightProbe>
    ) {
        this.lightArgs = v;
    }

    lightType = THREE.HemisphereLightProbe;
}

@NgModule({
    declarations: [NgtHemisphereLightProbe],
    exports: [NgtHemisphereLightProbe, NgtObjectControllerModule],
})
export class NgtHemisphereLightProbeModule {}
