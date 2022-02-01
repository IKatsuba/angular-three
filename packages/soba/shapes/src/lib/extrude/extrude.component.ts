// GENERATED
import {
  NGT_OBJECT_INPUTS_CONTROLLER_PROVIDER,
  NGT_OBJECT_INPUTS_WATCHED_CONTROLLER,
  NGT_WITH_MATERIAL_CONTROLLER_PROVIDER,
  NGT_WITH_MATERIAL_WATCHED_CONTROLLER,
  NgtExtender,
  NgtObjectInputsController,
  NgtObjectInputsControllerModule,
  NgtWithMaterialController,
  NgtWithMaterialControllerModule,
} from '@angular-three/core';
import { NgtExtrudeGeometryModule } from '@angular-three/core/geometries';
import { NgtMeshModule } from '@angular-three/core/meshes';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  NgModule,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'ngt-soba-extrude',
  template: `
    <ngt-mesh
      (ready)="object = $event"
      (animateReady)="
        animateReady.emit({ entity: $any($event.object), state: $event.state })
      "
      [objectInputsController]="objectInputsController"
      [withMaterialController]="withMaterialController"
    >
      <ngt-extrude-geometry
        *ngIf="args; else withoutArgs"
        [args]="args"
      ></ngt-extrude-geometry>
      <ng-template #withoutArgs>
        <ngt-extrude-geometry></ngt-extrude-geometry>
      </ng-template>
    </ngt-mesh>
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    NGT_OBJECT_INPUTS_CONTROLLER_PROVIDER,
    NGT_WITH_MATERIAL_CONTROLLER_PROVIDER,
    { provide: NgtExtender, useExisting: NgtSobaExtrude },
  ],
})
export class NgtSobaExtrude extends NgtExtender<THREE.Mesh> {
  @Input() args?: ConstructorParameters<typeof THREE.ExtrudeGeometry>;

  constructor(
    @Inject(NGT_OBJECT_INPUTS_WATCHED_CONTROLLER)
    public objectInputsController: NgtObjectInputsController,
    @Inject(NGT_WITH_MATERIAL_WATCHED_CONTROLLER)
    public withMaterialController: NgtWithMaterialController
  ) {
    super();
  }
}

@NgModule({
  declarations: [NgtSobaExtrude],
  exports: [
    NgtSobaExtrude,
    NgtObjectInputsControllerModule,
    NgtWithMaterialControllerModule,
  ],
  imports: [NgtMeshModule, NgtExtrudeGeometryModule, CommonModule],
})
export class NgtSobaExtrudeModule {}
