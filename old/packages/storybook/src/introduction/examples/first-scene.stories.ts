import { NgtCoreModule } from '@angular-three/core';
import { NgtBoxGeometryModule } from '@angular-three/core/geometries';
import { NgtGridHelperModule } from '@angular-three/core/helpers';
import {
  NgtAmbientLightModule,
  NgtSpotLightModule,
} from '@angular-three/core/lights';
import {
  NgtMeshBasicMaterialModule,
  NgtMeshStandardMaterialModule,
} from '@angular-three/core/materials';
import { NgtMeshModule } from '@angular-three/core/meshes';
import { NgtSobaOrbitControlsModule } from '@angular-three/soba/controls';
import { Meta, moduleMetadata } from '@storybook/angular';
import { Mesh } from 'three';

export default {
  title: 'Introduction/Examples/First Scene',
  decorators: [
    moduleMetadata({
      imports: [
        NgtCoreModule,
        NgtMeshModule,
        NgtMeshBasicMaterialModule,
        NgtBoxGeometryModule,
        NgtMeshStandardMaterialModule,
        NgtAmbientLightModule,
        NgtSpotLightModule,
        NgtSobaOrbitControlsModule,
        NgtGridHelperModule,
      ],
    }),
  ],
  parameters: { viewMode: 'story' },
} as Meta;

export const Cube = () => ({
  template: `
    <ngt-canvas>
      <ngt-mesh>
        <ngt-box-geometry></ngt-box-geometry>
        <ngt-mesh-basic-material></ngt-mesh-basic-material>
      </ngt-mesh>
    </ngt-canvas>
  `,
});

export const SpinningCube = () => ({
  props: {
    onAnimate: (mesh: Mesh) => {
      mesh.rotation.x = mesh.rotation.y += 0.01;
    },
  },
  template: `
    <ngt-canvas>
      <ngt-mesh #mesh='ngtMesh' (animateReady)='onAnimate(mesh.mesh)'>
        <ngt-box-geometry></ngt-box-geometry>
        <ngt-mesh-basic-material></ngt-mesh-basic-material>
      </ngt-mesh>
    </ngt-canvas>
  `,
});

export const SpinningCubeStates = () => ({
  props: {
    hover: false,
    active: false,
    onAnimate: (mesh: Mesh) => {
      mesh.rotation.x = mesh.rotation.y += 0.01;
    },
  },
  template: `
    <ngt-canvas>
      <ngt-mesh
        #mesh='ngtMesh'
        (animateReady)='onAnimate(mesh.mesh)'
        (click)='active = !active'
        (pointerover)='hover = true'
        (pointerout)='hover = false'
        [scale]='active ? [1.5, 1.5, 1.5] : [1, 1, 1]'
      >
        <ngt-box-geometry></ngt-box-geometry>
        <ngt-mesh-basic-material
          [parameters]="{ color: hover ? 'turquoise' : 'tomato' }"
        ></ngt-mesh-basic-material>
      </ngt-mesh>
    </ngt-canvas>
  `,
});

export const TwoSpinningCubes = () => ({
  props: {
    hover: false,
    active: false,
    hover2: false,
    active2: false,
    onAnimate: (mesh: Mesh) => {
      mesh.rotation.x = mesh.rotation.y += 0.01;
    },
  },
  template: `
    <ngt-canvas>
      <ngt-mesh
        #mesh='ngtMesh'
        (animateReady)='onAnimate(mesh.mesh)'
        (click)='active = !active'
        (pointerover)='hover = true'
        (pointerout)='hover = false'
        [scale]='active ? [1.5, 1.5, 1.5] : [1, 1, 1]'
        [position]='[2, 0, 0]'
      >
        <ngt-box-geometry></ngt-box-geometry>
        <ngt-mesh-basic-material
          [parameters]="{ color: hover ? 'turquoise' : 'tomato' }"
        ></ngt-mesh-basic-material>
      </ngt-mesh>

      <ngt-mesh
        #mesh2='ngtMesh'
        (animateReady)='onAnimate(mesh2.mesh)'
        (click)='active2 = !active2'
        (pointerover)='hover2 = true'
        (pointerout)='hover2 = false'
        [scale]='active2 ? [1.5, 1.5, 1.5] : [1, 1, 1]'
        [position]='[-2, 0, 0]'
      >
        <ngt-box-geometry></ngt-box-geometry>
        <ngt-mesh-basic-material
          [parameters]="{ color: hover2 ? 'turquoise' : 'tomato' }"
        ></ngt-mesh-basic-material>
      </ngt-mesh>
    </ngt-canvas>
  `,
});

export const StandardMaterialCubes = () => ({
  props: {
    hover: false,
    active: false,
    hover2: false,
    active2: false,
    onAnimate: (mesh: Mesh) => {
      mesh.rotation.x = mesh.rotation.y += 0.01;
    },
  },
  template: `
    <ngt-canvas>
      <ngt-mesh
        #mesh='ngtMesh'
        (animateReady)='onAnimate(mesh.mesh)'
        (click)='active = !active'
        (pointerover)='hover = true'
        (pointerout)='hover = false'
        [scale]='active ? [1.5, 1.5, 1.5] : [1, 1, 1]'
        [position]='[2, 0, 0]'
      >
        <ngt-box-geometry></ngt-box-geometry>
        <ngt-mesh-standard-material
          [parameters]="{ color: hover ? 'turquoise' : 'tomato' }"
        ></ngt-mesh-standard-material>
      </ngt-mesh>

      <ngt-mesh
        #mesh2='ngtMesh'
        (animateReady)='onAnimate(mesh2.mesh)'
        (click)='active2 = !active2'
        (pointerover)='hover2 = true'
        (pointerout)='hover2 = false'
        [scale]='active2 ? [1.5, 1.5, 1.5] : [1, 1, 1]'
        [position]='[-2, 0, 0]'
      >
        <ngt-box-geometry></ngt-box-geometry>
        <ngt-mesh-standard-material
          [parameters]="{ color: hover2 ? 'turquoise' : 'tomato' }"
        ></ngt-mesh-standard-material>
      </ngt-mesh>
    </ngt-canvas>
  `,
});

export const LightStandardMaterialCubes = () => ({
  props: {
    hover: false,
    active: false,
    hover2: false,
    active2: false,
    onAnimate: (mesh: Mesh) => {
      mesh.rotation.x = mesh.rotation.y += 0.01;
    },
  },
  template: `
    <ngt-canvas>
      <ngt-ambient-light></ngt-ambient-light>

      <ngt-mesh
        #mesh='ngtMesh'
        (animateReady)='onAnimate(mesh.mesh)'
        (click)='active = !active'
        (pointerover)='hover = true'
        (pointerout)='hover = false'
        [scale]='active ? [1.5, 1.5, 1.5] : [1, 1, 1]'
        [position]='[2, 0, 0]'
      >
        <ngt-box-geometry></ngt-box-geometry>
        <ngt-mesh-standard-material
          [parameters]="{ color: hover ? 'turquoise' : 'tomato' }"
        ></ngt-mesh-standard-material>
      </ngt-mesh>

      <ngt-mesh
        #mesh2='ngtMesh'
        (animateReady)='onAnimate(mesh2.mesh)'
        (click)='active2 = !active2'
        (pointerover)='hover2 = true'
        (pointerout)='hover2 = false'
        [scale]='active2 ? [1.5, 1.5, 1.5] : [1, 1, 1]'
        [position]='[-2, 0, 0]'
      >
        <ngt-box-geometry></ngt-box-geometry>
        <ngt-mesh-standard-material
          [parameters]="{ color: hover2 ? 'turquoise' : 'tomato' }"
        ></ngt-mesh-standard-material>
      </ngt-mesh>
    </ngt-canvas>
  `,
});

export const RealStandardMaterialCubes = () => ({
  props: {
    hover: false,
    active: false,
    hover2: false,
    active2: false,
    onAnimate: (mesh: Mesh) => {
      mesh.rotation.x = mesh.rotation.y += 0.01;
    },
  },
  template: `
    <ngt-canvas>
      <ngt-ambient-light></ngt-ambient-light>
      <ngt-spot-light [position]='[2, 2, 2]'></ngt-spot-light>

      <ngt-mesh
        #mesh='ngtMesh'
        (animateReady)='onAnimate(mesh.mesh)'
        (click)='active = !active'
        (pointerover)='hover = true'
        (pointerout)='hover = false'
        [scale]='active ? [1.5, 1.5, 1.5] : [1, 1, 1]'
        [position]='[2, 0, 0]'
      >
        <ngt-box-geometry></ngt-box-geometry>
        <ngt-mesh-standard-material
          [parameters]="{ color: hover ? 'turquoise' : 'tomato' }"
        ></ngt-mesh-standard-material>
      </ngt-mesh>

      <ngt-mesh
        #mesh2='ngtMesh'
        (animateReady)='onAnimate(mesh2.mesh)'
        (click)='active2 = !active2'
        (pointerover)='hover2 = true'
        (pointerout)='hover2 = false'
        [scale]='active2 ? [1.5, 1.5, 1.5] : [1, 1, 1]'
        [position]='[-2, 0, 0]'
      >
        <ngt-box-geometry></ngt-box-geometry>
        <ngt-mesh-standard-material
          [parameters]="{ color: hover2 ? 'turquoise' : 'tomato' }"
        ></ngt-mesh-standard-material>
      </ngt-mesh>
    </ngt-canvas>
  `,
});

export const ControlsCamera = () => ({
  props: {
    hover: false,
    active: false,
    hover2: false,
    active2: false,
    onAnimate: (mesh: Mesh) => {
      mesh.rotation.x = mesh.rotation.y += 0.01;
    },
  },
  template: `
    <ngt-canvas>
      <ngt-ambient-light></ngt-ambient-light>
      <ngt-spot-light [position]='[2, 2, 2]'></ngt-spot-light>

      <ngt-mesh
        #mesh='ngtMesh'
        (animateReady)='onAnimate(mesh.mesh)'
        (click)='active = !active'
        (pointerover)='hover = true'
        (pointerout)='hover = false'
        [scale]='active ? [1.5, 1.5, 1.5] : [1, 1, 1]'
        [position]='[2, 0, 0]'
      >
        <ngt-box-geometry></ngt-box-geometry>
        <ngt-mesh-standard-material
          [parameters]="{ color: hover ? 'turquoise' : 'tomato' }"
        ></ngt-mesh-standard-material>
      </ngt-mesh>

      <ngt-mesh
        #mesh2='ngtMesh'
        (animateReady)='onAnimate(mesh2.mesh)'
        (click)='active2 = !active2'
        (pointerover)='hover2 = true'
        (pointerout)='hover2 = false'
        [scale]='active2 ? [1.5, 1.5, 1.5] : [1, 1, 1]'
        [position]='[-2, 0, 0]'
      >
        <ngt-box-geometry></ngt-box-geometry>
        <ngt-mesh-standard-material
          [parameters]="{ color: hover2 ? 'turquoise' : 'tomato' }"
        ></ngt-mesh-standard-material>
      </ngt-mesh>

      <ngt-grid-helper></ngt-grid-helper>

      <ngt-soba-orbit-controls></ngt-soba-orbit-controls>
    </ngt-canvas>
  `,
});
