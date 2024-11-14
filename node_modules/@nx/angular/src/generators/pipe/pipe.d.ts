import type { Tree } from '@nx/devkit';
import type { Schema } from './schema';
export declare function pipeGenerator(tree: Tree, rawOptions: Schema): Promise<void>;
export default pipeGenerator;
