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
import { SepiaEffect } from 'postprocessing';

@Component({
    selector: 'ngt-sepia',
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
        { provide: NGT_EFFECT_TYPE, useValue: SepiaEffect },
    ],
})
export class NgtSepia {
    static ngAcceptInputType_options:
        | ConstructorParameters<AnyConstructor<SepiaEffect>>[0]
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
    declarations: [NgtSepia],
    exports: [NgtSepia, NgtEffectControllerModule],
    imports: [NgtPrimitiveModule, CommonModule],
})
export class NgtSepiaModule {}
