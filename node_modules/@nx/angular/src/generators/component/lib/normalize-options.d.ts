import type { Tree } from '@nx/devkit';
import type { NormalizedSchema, Schema } from '../schema';
export declare function normalizeOptions(tree: Tree, options: Schema): Promise<NormalizedSchema>;
