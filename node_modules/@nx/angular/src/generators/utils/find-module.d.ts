import type { Tree } from '@nx/devkit';
import { ngModuleDecoratorProperty } from './insert-ngmodule-import';
export declare function findModule(tree: Tree, path: string, module?: string): string;
export declare function addToNgModule(tree: Tree, path: string, modulePath: string, name: string, className: string, fileName: string, ngModuleProperty: ngModuleDecoratorProperty, isFlat?: boolean, isExported?: boolean): void;
