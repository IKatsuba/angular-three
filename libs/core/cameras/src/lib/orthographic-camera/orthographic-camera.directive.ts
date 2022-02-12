// GENERATED
import {
    createParentObjectProvider,
    NgtCommonCamera,
    NGT_OBJECT_CONTROLLER_PROVIDER,
    NgtObjectControllerModule,
} from '@angular-three/core';
import { NgModule, Directive, Input } from '@angular/core';
import * as THREE from 'three';

@Directive({
    selector: 'ngt-orthographic-camera',
    exportAs: 'ngtOrthographicCamera',
    providers: [
        {
            provide: NgtCommonCamera,
            useExisting: NgtOrthographicCamera,
        },
        NGT_OBJECT_CONTROLLER_PROVIDER,
        createParentObjectProvider(
            NgtOrthographicCamera,
            (parent) => parent.camera
        ),
    ],
})
export class NgtOrthographicCamera extends NgtCommonCamera<THREE.OrthographicCamera> {
    static ngAcceptInputType_args:
        | ConstructorParameters<typeof THREE.OrthographicCamera>
        | undefined;

    @Input() set args(
        v: ConstructorParameters<typeof THREE.OrthographicCamera>
    ) {
        this.cameraArgs = v;
    }

    cameraType = THREE.OrthographicCamera;
}

@NgModule({
    declarations: [NgtOrthographicCamera],
    exports: [NgtOrthographicCamera, NgtObjectControllerModule],
})
export class NgtOrthographicCameraModule {}
