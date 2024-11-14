import { type Tree } from '@nx/devkit';
type AddPathToExposesOptions = {
    projectPath: string;
    moduleName: string;
    modulePath: string;
};
export declare function addPathToExposes(tree: Tree, { projectPath, moduleName, modulePath }: AddPathToExposesOptions): void;
export {};
