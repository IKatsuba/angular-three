// GENERATED
import {
    createParentObjectProvider,
    NgtHelper,
    NGT_OBJECT_CONTROLLER_PROVIDER,
    NgtObjectControllerModule,
} from '@angular-three/core';
import { NgModule, Directive, Input } from '@angular/core';
import * as THREE from 'three';

@Directive({
    selector: 'ngt-axes-helper',
    exportAs: 'ngtAxesHelper',
    providers: [
        {
            provide: NgtHelper,
            useExisting: NgtAxesHelper,
        },
        NGT_OBJECT_CONTROLLER_PROVIDER,
        createParentObjectProvider(NgtAxesHelper, (parent) => parent.helper),
    ],
})
export class NgtAxesHelper extends NgtHelper<THREE.AxesHelper> {
    static ngAcceptInputType_args:
        | ConstructorParameters<typeof THREE.AxesHelper>
        | undefined;

    @Input() set args(v: ConstructorParameters<typeof THREE.AxesHelper>) {
        this.helperArgs = v;
    }

    helperType = THREE.AxesHelper;
}

@NgModule({
    declarations: [NgtAxesHelper],
    exports: [NgtAxesHelper, NgtObjectControllerModule],
})
export class NgtAxesHelperModule {}
