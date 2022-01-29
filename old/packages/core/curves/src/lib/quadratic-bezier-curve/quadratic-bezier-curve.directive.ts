// GENERATED
import { NgtCurve } from '@angular-three/core';
import { NgModule, Directive, Input } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-quadratic-bezier-curve',
  exportAs: 'ngtQuadraticBezierCurve',
  providers: [
    {
      provide: NgtCurve,
      useExisting: NgtQuadraticBezierCurve,
    },
  ],
})
export class NgtQuadraticBezierCurve extends NgtCurve<THREE.QuadraticBezierCurve> {
  static ngAcceptInputType_args:
    | ConstructorParameters<typeof THREE.QuadraticBezierCurve>
    | undefined;

  @Input() set args(
    v: ConstructorParameters<typeof THREE.QuadraticBezierCurve>
  ) {
    this.curveArgs = v;
  }

  curveType = THREE.QuadraticBezierCurve;
}

@NgModule({
  declarations: [NgtQuadraticBezierCurve],
  exports: [NgtQuadraticBezierCurve],
})
export class NgtQuadraticBezierCurveModule {}
