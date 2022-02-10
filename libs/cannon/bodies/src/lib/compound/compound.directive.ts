// GENERATED
import { CompoundBodyProps, GetByIndex } from '@angular-three/cannon';
import { Directive, Inject, NgModule } from '@angular/core';
import {
    NGT_CANNON_BODY_CONTROLLER_PROVIDER,
    NGT_CANNON_BODY_TYPE,
    NGT_CANNON_BODY_WATCHED_CONTROLLER,
    NgtCannonBodyController,
    NgtCannonBodyControllerModule,
} from '../body.controller';

@Directive({
    selector: '[ngtPhysicCompound]',
    exportAs: 'ngtPhysicCompound',
    providers: [
        NGT_CANNON_BODY_CONTROLLER_PROVIDER,
        { provide: NGT_CANNON_BODY_TYPE, useValue: 'Compound' },
    ],
})
export class NgtPhysicCompound {
    static ngAcceptInputType_getPhysicProps:
        | GetByIndex<CompoundBodyProps>
        | undefined;

    constructor(
        @Inject(NGT_CANNON_BODY_WATCHED_CONTROLLER)
        private cannonBodyController: NgtCannonBodyController
    ) {}

    get api() {
        return this.cannonBodyController.api;
    }
}

@NgModule({
    declarations: [NgtPhysicCompound],
    exports: [NgtPhysicCompound, NgtCannonBodyControllerModule],
})
export class NgtPhysicCompoundModule {}
