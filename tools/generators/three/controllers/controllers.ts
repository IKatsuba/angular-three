import {
    formatFiles,
    generateFiles,
    getWorkspaceLayout,
    logger,
    Tree,
} from '@nrwl/devkit';
import { join } from 'path';

export default async function controllersGenerator(
    tree: Tree,
    object3dSelectors: string[],
    audioSelectors: string[],
    lineSelectors: string[]
) {
    const meshSelectors = ['mesh', 'instanced-mesh', 'skinned-mesh'];

    const sobaSelectors = [
        'soba-billboard',
        'soba-detailed',
        'soba-line',
        'soba-quadratic-bezier-line',
        'soba-cubic-bezier-line',
        'soba-orthographic-camera',
        'soba-gizmo-helper',
        'soba-gizmo-viewport',
        'soba-gizmo-axis-head',
        'soba-transform-controls',
        'soba-center',
        'soba-bounds',
        'soba-float',
        'soba-stage',
        'soba-backdrop',
        'soba-spot-light',
    ];
    const sobaWithMaterialSelectors = ['soba-text'];
    const sobaAudioSelectors = ['soba-positional-audio'];

    const { libsDir } = getWorkspaceLayout(tree);
    const controllersDir = join(libsDir, 'core', 'src', 'lib', 'controllers');

    logger.log('Generating controllers...');

    const selectors = [
        ...meshSelectors,
        ...audioSelectors,
        ...lineSelectors,
        ...object3dSelectors,
    ];

    // Object3dInputs includes the Soba shapes but Object3d does not
    const inputsSelectors = [
        ...selectors,
        ...sobaSelectors,
        ...sobaWithMaterialSelectors,
    ];

    generateFiles(tree, join(__dirname, 'files'), controllersDir, {
        tmpl: '',
        audioSelectors: [...audioSelectors, ...sobaAudioSelectors],
        meshSelectors,
        lineSelectors,
        sobaShapeSelectors: [...sobaWithMaterialSelectors],
        selectors: Array.from(new Set(selectors)).map(mapIsLast),
        inputsSelectors: Array.from(new Set(inputsSelectors)).map(mapIsLast),
    });

    await formatFiles(tree);
}

function mapIsLast(selector: string, index: number, list: string[]) {
    return {
        selector,
        isLast: index === list.length - 1,
    };
}
