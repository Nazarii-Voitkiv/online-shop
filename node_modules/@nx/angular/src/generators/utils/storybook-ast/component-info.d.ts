import { Tree } from '@nx/devkit';
import type { EntryPoint } from './entry-point';
export interface ComponentInfo {
    componentFileName: string;
    moduleFolderPath: string;
    name: string;
    path: string;
    entryPointName: string;
}
export declare function getComponentsInfo(tree: Tree, entryPoint: EntryPoint, moduleFilePaths: string[], projectName: string): ComponentInfo[];
export declare function getStandaloneComponentsInfo(tree: Tree, entryPoint: EntryPoint): ComponentInfo[];
