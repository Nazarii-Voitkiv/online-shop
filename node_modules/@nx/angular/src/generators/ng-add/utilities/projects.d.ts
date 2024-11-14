import { Tree } from '@nx/devkit';
import type { WorkspaceProjects } from './types';
export declare function getAllProjects(tree: Tree): WorkspaceProjects;
export declare function convertToNxProject(tree: Tree, projectName: string): void;
