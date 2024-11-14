import { type GeneratorCallback, type Tree } from '@nx/devkit';
import { Schema } from './schema';
export declare function angularInitGenerator(tree: Tree, options: Schema): Promise<GeneratorCallback>;
export default angularInitGenerator;
