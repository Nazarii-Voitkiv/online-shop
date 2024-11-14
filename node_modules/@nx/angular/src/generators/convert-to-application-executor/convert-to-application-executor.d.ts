import { type Tree } from '@nx/devkit';
import type { GeneratorOptions } from './schema';
export declare function convertToApplicationExecutor(tree: Tree, options: GeneratorOptions): Promise<() => void>;
export default convertToApplicationExecutor;
