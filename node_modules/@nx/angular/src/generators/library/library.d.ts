import { GeneratorCallback, Tree } from '@nx/devkit';
import { Schema } from './schema';
export declare function libraryGenerator(tree: Tree, schema: Schema): Promise<GeneratorCallback>;
export default libraryGenerator;
