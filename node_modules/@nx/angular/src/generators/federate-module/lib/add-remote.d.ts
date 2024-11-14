import type { GeneratorCallback, Tree } from '@nx/devkit';
import { type Schema } from '../schema';
export declare function addRemote(tree: Tree, schema: Schema): Promise<{
    tasks: GeneratorCallback[];
    projectRoot: any;
    remoteName: any;
}>;
