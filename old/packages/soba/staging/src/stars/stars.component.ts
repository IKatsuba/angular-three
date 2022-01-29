import {
  EnhancedRxState,
  NgtRender,
  NgtSobaExtender,
} from '@angular-three/core';
import { NgtBufferAttributeModule } from '@angular-three/core/attributes';
import { NgtBufferGeometryModule } from '@angular-three/core/geometries';
import { NgtPointsModule } from '@angular-three/core/points';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { selectSlice } from '@rx-angular/state';
import * as THREE from 'three';
import {
  NgtSobaStarFieldMaterialModule,
  StarFieldMaterial,
} from './star-material.directive';

const genStar = (r: number) => {
  return new THREE.Vector3().setFromSpherical(
    new THREE.Spherical(
      r,
      Math.acos(1 - Math.random() * 2),
      Math.random() * 2 * Math.PI
    )
  );
};

export interface NgtSobaStarsState {
  radius: number;
  depth: number;
  count: number;
  factor: number;
  saturation: number;
  fade: boolean;
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  material: StarFieldMaterial;
}

@Component({
  selector: 'ngt-soba-stars',
  template: `
    <ngt-points (ready)="object = $event" (animateReady)="onAnimate($event)">
      <ngt-buffer-geometry>
        <ngt-buffer-attribute
          attach="position"
          [args]="[state.get('positions'), 3]"
        ></ngt-buffer-attribute>
        <ngt-buffer-attribute
          attach="color"
          [args]="[state.get('colors'), 3]"
        ></ngt-buffer-attribute>
        <ngt-buffer-attribute
          attach="size"
          [args]="[state.get('sizes'), 1]"
        ></ngt-buffer-attribute>
      </ngt-buffer-geometry>
      <ngt-soba-star-field-material
        (ready)="state.set({ material: $event })"
        [parameters]="{
          vertexColors: true,
          transparent: true,
          blending: this.blending,
          uniforms: { fade: { value: state.get('fade') } }
        }"
      ></ngt-soba-star-field-material>
    </ngt-points>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NgtSobaExtender,
      useExisting: NgtSobaStars,
    },
    EnhancedRxState,
  ],
})
export class NgtSobaStars extends NgtSobaExtender<THREE.Points> {
  readonly blending = THREE.AdditiveBlending;

  @Input() set radius(radius: number) {
    this.state.set({ radius });
  }

  @Input() set depth(depth: number) {
    this.state.set({ depth });
  }

  @Input() set count(count: number) {
    this.state.set({ count });
  }

  @Input() set factor(factor: number) {
    this.state.set({ factor });
  }

  @Input() set saturation(saturation: number) {
    this.state.set({ saturation });
  }

  @Input() set fade(fade: boolean) {
    this.state.set({ fade });
  }

  constructor(public state: EnhancedRxState<NgtSobaStarsState>) {
    super();
    this.state.set({
      radius: 100,
      depth: 50,
      count: 5000,
      saturation: 0,
      factor: 4,
      fade: false,
    });

    state.hold(
      state.select(
        selectSlice(['radius', 'depth', 'count', 'factor', 'saturation'])
      ),
      ({ factor, radius, saturation, count, depth }) => {
        const positions: number[] = [];
        const colors: number[] = [];
        const sizes = Array.from(
          { length: count },
          () => (0.5 + 0.5 * Math.random()) * factor
        );
        const color = new THREE.Color();
        let r = radius + depth;
        const increment = depth / count;
        for (let i = 0; i < count; i++) {
          r -= increment * Math.random();
          positions.push(...genStar(r).toArray());
          color.setHSL(i / count, saturation, 0.9);
          colors.push(color.r, color.g, color.b);
        }
        state.set({
          positions: new Float32Array(positions),
          colors: new Float32Array(colors),
          sizes: new Float32Array(sizes),
        });
      }
    );
  }

  onAnimate(state: NgtRender) {
    const material = this.state.get('material');
    if (material) {
      material.uniforms.time.value = state.clock.getElapsedTime();
      this.animateReady.emit({ entity: this.object, state });
    }
  }
}

@NgModule({
  declarations: [NgtSobaStars],
  exports: [NgtSobaStars],
  imports: [
    NgtPointsModule,
    NgtBufferGeometryModule,
    NgtBufferAttributeModule,
    NgtSobaStarFieldMaterialModule,
  ],
})
export class NgtSobaStarsModule {}
