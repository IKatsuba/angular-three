import type { Tree } from '@nrwl/devkit';
import attributesGenerator from './attributes/attributes';
import audiosGenerator from './audios/audios';
import camerasGenerator from './cameras/cameras';
import controllersGenerator from './controllers/controllers';
import curvesGenerator from './curves/curves';
import geometriesGenerator from './geometries/geometries';
import helpersGenerator from './helpers/helpers';
import lightsGenerator from './lights/lights';
import linesGenerator from './lines/lines';
import materialsGenerator from './materials/materials';
import simpleEffectControllerGenerator from './postprocessing/simple-effect-controller';
import simpleEffectsGenerator from './postprocessing/simple-effects';
import spritesGenerator from './sprites/sprites';
import texturesGenerator from './textures/textures';

export default async function (tree: Tree) {
  await Promise.all([
    geometriesGenerator(tree),
    materialsGenerator(tree),
    attributesGenerator(tree),
    curvesGenerator(tree),
    texturesGenerator(tree),
  ]);

  const [
    audioSelectors,
    cameraSelectors,
    helperSelectors,
    lightSelectors,
    lineSelectors,
    spriteSelectors,
    simpleEffectSelectors,
  ] = await Promise.all([
    audiosGenerator(tree),
    camerasGenerator(tree),
    helpersGenerator(tree),
    lightsGenerator(tree),
    linesGenerator(tree),
    spritesGenerator(tree),
    simpleEffectsGenerator(tree),
  ]);

  // const [
  //   audioSelectors,
  //   lightSelectors,
  //   helperSelectors,
  //   lineSelectors,
  //   spriteSelectors,
  //   cameraSelectors,
  //   physicBodySelectors,
  //   physicConstraintSelectors,
  //   sobaShapeSelectors,
  //   simpleEffectSelectors,
  // ] = await Promise.all([
  //   audiosGenerator(tree),
  //   lightsGenerator(tree),
  //   helpersGenerator(tree),
  //   linesGenerator(tree),
  //   spritesGenerator(tree),
  //   camerasGenerator(tree),
  //   physicBodiesGenerator(tree),
  //   physicConstraintsGenerator(tree),
  //   sobaShapesGenerator(tree),
  //   simpleEffectsGenerator(tree),
  // ]);
  //
  await Promise.all([
    controllersGenerator(
      tree,
      [
        ...lightSelectors,
        ...helperSelectors,
        ...spriteSelectors,
        ...cameraSelectors,
      ],
      audioSelectors,
      lineSelectors,
      [] // sobaShapeSelectors
    ),
    // physicBodyControllerGenerator(
    //   tree,
    //   physicBodySelectors.map(({ name }) => name)
    // ),
    // physicConstraintControllerGenerator(
    //   tree,
    //   physicConstraintSelectors.map(({ name }) => name)
    // ),
    simpleEffectControllerGenerator(tree, simpleEffectSelectors),
  ]);
}
