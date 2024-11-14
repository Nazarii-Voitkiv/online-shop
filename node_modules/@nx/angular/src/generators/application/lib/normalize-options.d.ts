import { type Tree } from '@nx/devkit';
import type { Schema } from '../schema';
import type { NormalizedSchema } from './normalized-schema';
export declare function normalizeOptions(host: Tree, options: Partial<Schema>): Promise<NormalizedSchema>;
