import { GeneratorCallback, Tree } from '@nx/devkit';
import type { StorybookConfigurationOptions } from './schema';
export declare function storybookConfigurationGenerator(tree: Tree, options: StorybookConfigurationOptions): Promise<GeneratorCallback>;
export default storybookConfigurationGenerator;
