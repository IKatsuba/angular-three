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
    selector: 'ngt-stereo-camera',
    exportAs: 'ngtStereoCamera',
    providers: [
        {
            provide: NgtCommonCamera,
            useExisting: NgtStereoCamera,
        },
        NGT_OBJECT_CONTROLLER_PROVIDER,
        createParentObjectProvider(NgtStereoCamera, (parent) => parent.camera),
    ],
})
export class NgtStereoCamera extends NgtCommonCamera<THREE.StereoCamera> {
    static ngAcceptInputType_args:
        | ConstructorParameters<typeof THREE.StereoCamera>
        | undefined;

    @Input() set args(v: ConstructorParameters<typeof THREE.StereoCamera>) {
        this.cameraArgs = v;
    }

    cameraType = THREE.StereoCamera;
}

@NgModule({
    declarations: [NgtStereoCamera],
    exports: [NgtStereoCamera, NgtObjectControllerModule],
})
export class NgtStereoCameraModule {}
