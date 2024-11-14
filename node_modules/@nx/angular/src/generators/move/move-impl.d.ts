import { type Tree } from '@nx/devkit';
import type { MoveImplOptions } from './lib/types';
/**
 * Angular-specific logic to move a project to another directory.
 * This is invoked by the `@nx/workspace:move` generator.
 */
export declare function move(tree: Tree, options: MoveImplOptions): Promise<void>;
