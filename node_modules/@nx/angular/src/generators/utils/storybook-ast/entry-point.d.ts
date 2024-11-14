import type { Tree } from '@nx/devkit';
export type EntryPoint = {
    name: string;
    path: string;
    excludeDirs?: string[];
};
export declare function getProjectEntryPoints(tree: Tree, projectName: string): EntryPoint[];
