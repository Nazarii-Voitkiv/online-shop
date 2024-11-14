import type { Tree } from '@nx/devkit';
import type { Schema } from './schema';
export declare function setupSsr(tree: Tree, schema: Schema): Promise<() => void>;
export default setupSsr;
