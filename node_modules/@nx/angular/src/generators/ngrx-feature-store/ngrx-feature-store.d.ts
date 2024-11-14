import type { Tree } from '@nx/devkit';
import { GeneratorCallback } from '@nx/devkit';
import type { Schema } from './schema';
export declare function ngrxFeatureStoreGenerator(tree: Tree, schema: Schema): Promise<GeneratorCallback>;
export default ngrxFeatureStoreGenerator;
