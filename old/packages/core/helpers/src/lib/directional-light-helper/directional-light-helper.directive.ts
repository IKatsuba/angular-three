// GENERATED
import {
  NGT_OBJECT_3D_PROVIDER,
  NgtObjectHelper,
  Tail,
} from '@angular-three/core';
import { Directive, Input, NgModule } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: '[ngtDirectionalLightHelper]',
  exportAs: 'ngtDirectionalLightHelper',
  providers: [
    {
      provide: NgtObjectHelper,
      useExisting: NgtDirectionalLightHelper,
    },
    NGT_OBJECT_3D_PROVIDER,
  ],
})
export class NgtDirectionalLightHelper extends NgtObjectHelper<THREE.DirectionalLightHelper> {
  static ngAcceptInputType_ngtDirectionalLightHelper:
    | Tail<ConstructorParameters<typeof THREE.DirectionalLightHelper>>
    | ''
    | undefined;

  @Input() set ngtDirectionalLightHelper(
    v: Tail<ConstructorParameters<typeof THREE.DirectionalLightHelper>> | ''
  ) {
    if (v) {
      this.objectHelperArgs = v;
    }
  }

  objectHelperType = THREE.DirectionalLightHelper;
}

@NgModule({
  declarations: [NgtDirectionalLightHelper],
  exports: [NgtDirectionalLightHelper],
})
export class NgtDirectionalLightHelperModule {}
