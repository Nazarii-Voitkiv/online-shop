import { type GeneratorCallback, type Tree } from '@nx/devkit';
import type { AddLintingGeneratorSchema } from './schema';
export declare function addLintingGenerator(tree: Tree, options: AddLintingGeneratorSchema): Promise<GeneratorCallback>;
export default addLintingGenerator;
