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
    selector: 'ngt-arrow-helper',
    exportAs: 'ngtArrowHelper',
    providers: [
        {
            provide: NgtHelper,
            useExisting: NgtArrowHelper,
        },
        NGT_OBJECT_CONTROLLER_PROVIDER,
        createParentObjectProvider(NgtArrowHelper, (parent) => parent.helper),
    ],
})
export class NgtArrowHelper extends NgtHelper<THREE.ArrowHelper> {
    static ngAcceptInputType_args:
        | ConstructorParameters<typeof THREE.ArrowHelper>
        | undefined;

    @Input() set args(v: ConstructorParameters<typeof THREE.ArrowHelper>) {
        this.helperArgs = v;
    }

    helperType = THREE.ArrowHelper;
}

@NgModule({
    declarations: [NgtArrowHelper],
    exports: [NgtArrowHelper, NgtObjectControllerModule],
})
export class NgtArrowHelperModule {}
