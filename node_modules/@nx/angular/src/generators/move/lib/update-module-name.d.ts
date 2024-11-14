import { Tree } from '@nx/devkit';
import type { MoveImplOptions } from './types';
/**
 * Updates the Angular module name (including the spec file and index.ts)
 *
 * Again, if the user has deviated from the expected folder
 * structure, they are very much on their own.
 *
 * @param schema The options provided to the schematic
 */
export declare function updateModuleName(tree: Tree, { oldProjectName, newProjectName }: MoveImplOptions): void;
