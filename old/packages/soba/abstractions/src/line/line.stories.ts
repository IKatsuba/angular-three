import { setupCanvas, setupCanvasModules } from '@angular-three/storybook';
import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import * as THREE from 'three';
// @ts-ignore
import { hilbert3D } from 'three-stdlib';
import { NgtSobaCubicBezierLineModule } from '../cubic-bezier-line/cubic-bezier-line.component';
import { NgtSobaQuadraticBezierLineModule } from '../quadratic-bezier-line/quadratic-bezier-line.component';
import { NgtSobaLineModule } from './line.component';

export default {
  title: 'Soba/Abstractions/Line',
  decorators: [
    componentWrapperDecorator(
      setupCanvas({ controls: false, black: true, cameraPosition: [0, 0, 17] })
    ),
    moduleMetadata({
      imports: [
        ...setupCanvasModules,
        NgtSobaLineModule,
        NgtSobaQuadraticBezierLineModule,
        NgtSobaCubicBezierLineModule,
      ],
    }),
  ],
  argTypes: {
    color: {
      control: {
        type: 'color',
      },
    },
    dashed: {
      control: {
        type: 'boolean',
      },
    },
    lineWidth: {
      control: {
        type: 'number',
      },
    },
  },
} as Meta;

const points = hilbert3D(new THREE.Vector3(0), 5).map((p: any) => [
  p.x,
  p.y,
  p.z,
]) as [number, number, number][];

export const Default: Story = (args) => ({
  props: { ...args, points },
  template: `
    <ngt-soba-line [points]='points' [lineWidth]='lineWidth' [dashed]='dashed' [color]='color'></ngt-soba-line>
    <ngt-soba-orbit-controls (ready)='$event.zoomSpeed = 0.5'></ngt-soba-orbit-controls>
  `,
});

Default.args = {
  color: 'red',
  dashed: false,
  lineWidth: 3,
};

export const QuadraticBezierLine: Story = (args) => ({
  props: args,
  template: `
    <ngt-soba-quadratic-bezier-line
      [start]='start'
      [end]='end'
      [segments]='segments'
      [lineWidth]='lineWidth'
      [dashed]='dashed'
      [color]='color'
    ></ngt-soba-quadratic-bezier-line>
    <ngt-soba-orbit-controls (ready)='$event.zoomSpeed = 0.5'></ngt-soba-orbit-controls>
  `,
});

QuadraticBezierLine.args = {
  start: [0, 0, 0],
  end: [4, 7, 5],
  segments: 10,
  color: 'red',
  dashed: true,
  lineWidth: 2,
};

export const CubicBezierLine: Story = (args) => ({
  props: args,
  template: `
    <ngt-soba-cubic-bezier-line
      [start]='start'
      [end]='end'
      [midA]='midA'
      [midB]='midB'
      [segments]='segments'
      [color]='color'
      [lineWidth]='lineWidth'
      [dashed]='dashed'
    ></ngt-soba-cubic-bezier-line>
    <ngt-soba-orbit-controls (ready)='$event.zoomSpeed = 0.5'></ngt-soba-orbit-controls>
  `,
});

CubicBezierLine.args = {
  start: [0, 0, 0],
  end: [10, 0, 10],
  midA: [5, 4, 0],
  midB: [0, 0, 5],
  segments: 10,
  color: 'red',
  lineWidth: 2,
  dashed: true,
};

const colors = new Array(points.length)
  .fill(0)
  .map(() => [Math.random(), Math.random(), Math.random()]) as [
  number,
  number,
  number
][];

export const VertexColors: Story = (args) => ({
  props: { ...args, points },
  template: `
    <ngt-soba-line
      [points]='points'
      [vertexColors]='vertexColors'
      [lineWidth]='lineWidth'
      [dashed]='dashed'
      [color]='color'
    ></ngt-soba-line>
    <ngt-soba-orbit-controls (ready)='$event.zoomSpeed = 0.5'></ngt-soba-orbit-controls>
  `,
});

VertexColors.args = {
  color: 'white',
  vertexColors: colors,
  lineWidth: 3,
  dashed: false,
};
