import { GeneratorCallback, Tree } from '@nx/devkit';
import type { StorybookConfigurationOptions } from '../schema';
export declare function generateStorybookConfiguration(tree: Tree, options: StorybookConfigurationOptions): Promise<GeneratorCallback>;
