import { type Tree } from '@nx/devkit';
type AddPathToTsConfigOptions = {
    remoteName: string;
    moduleName: string;
    pathToFile: string;
};
export declare function addPathToTsConfig(tree: Tree, { remoteName, moduleName, pathToFile }: AddPathToTsConfigOptions): void;
export {};
