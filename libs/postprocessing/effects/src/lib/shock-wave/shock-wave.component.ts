// GENERATED
import { AnyConstructor } from '@angular-three/core';
import {
    NgtPrimitive,
    NgtPrimitiveModule,
} from '@angular-three/core/primitive';
import {
    NGT_EFFECT_CONTROLLER_PROVIDER,
    NGT_EFFECT_TYPE,
    NGT_EFFECT_WATCH_CONTROLLER,
    NgtEffectController,
    NgtEffectControllerModule,
} from '@angular-three/postprocessing';
import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    NgModule,
    ViewChild,
} from '@angular/core';
import { ShockWaveEffect } from 'postprocessing';

@Component({
    selector: 'ngt-shock-wave',
    template: `
        <ngt-primitive
            *ngIf="effect"
            [disabled]="true"
            [object]="$any(effect)"
            [dispose]="null"
        ></ngt-primitive>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        NGT_EFFECT_CONTROLLER_PROVIDER,
        { provide: NGT_EFFECT_TYPE, useValue: ShockWaveEffect },
    ],
})
export class NgtShockWave {
    static ngAcceptInputType_options:
        | ConstructorParameters<AnyConstructor<ShockWaveEffect>>[0]
        | undefined;

    @ViewChild(NgtPrimitive) primitive?: NgtPrimitive;

    constructor(
        @Inject(NGT_EFFECT_WATCH_CONTROLLER)
        private effectController: NgtEffectController
    ) {}

    get effect() {
        return this.effectController.effect;
    }
}

@NgModule({
    declarations: [NgtShockWave],
    exports: [NgtShockWave, NgtEffectControllerModule],
    imports: [NgtPrimitiveModule, CommonModule],
})
export class NgtShockWaveModule {}
