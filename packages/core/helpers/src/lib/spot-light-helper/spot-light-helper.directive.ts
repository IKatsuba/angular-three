// GENERATED

import {
  NGT_OBJECT_3D_CONTROLLER_PROVIDER,
  NgtHelper,
  NgtObject3d,
} from '@angular-three/core';
import { Directive, Input } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-spot-light-helper',
  exportAs: 'ngtSpotLightHelper',
  providers: [
    {
      provide: NgtObject3d,
      useExisting: NgtSpotLightHelper,
    },
    NGT_OBJECT_3D_CONTROLLER_PROVIDER,
  ],
})
export class NgtSpotLightHelper extends NgtHelper<THREE.SpotLightHelper> {
  static ngAcceptInputType_args:
    | ConstructorParameters<typeof THREE.SpotLightHelper>
    | undefined;

  @Input() set args(v: ConstructorParameters<typeof THREE.SpotLightHelper>) {
    this.extraArgs = v;
  }

  helperType = THREE.SpotLightHelper;
}
