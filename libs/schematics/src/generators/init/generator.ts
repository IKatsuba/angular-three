import {
    addDependenciesToPackageJson,
    installPackagesTask,
    logger,
    Tree,
    updateJson,
} from '@nrwl/devkit';
import { ANGULAR_THREE_VERSION } from '../versions';
import { THREE_TYPES_VERSION, THREE_VERSION } from './versions';

export default async function (tree: Tree) {
    logger.info('Initializing Angular Three...');
    addDependenciesToPackageJson(
        tree,
        {
            '@angular-three/core': ANGULAR_THREE_VERSION,
            three: THREE_VERSION,
        },
        {
            '@types/three': THREE_TYPES_VERSION,
        }
    );

    logger.info('Turning on skipLibCheck for other THREE dependencies...');
    const tsConfigPath = tree.exists('tsconfig.base.json')
        ? 'tsconfig.base.json'
        : 'tsconfig.json';

    // Turn on skipLibCheck for three-stdlib etc...
    updateJson(tree, tsConfigPath, (json) => {
        if (
            !('skipLibCheck' in json.compilerOptions) ||
            json.compilerOptions?.skipLibCheck === false
        ) {
            json.compilerOptions.skipLibCheck = true;
        }
        return json;
    });

    return () => {
        installPackagesTask(tree);
        logger.info(`
If @angular-three/schematics is added to your dependencies array, you can safely
move it to devDependencies or remove it completely.
`);
    };
}
