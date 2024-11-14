import { Tree } from '@nx/devkit';
export type ngModuleDecoratorProperty = 'imports' | 'providers' | 'declarations' | 'exports';
export declare function insertNgModuleProperty(tree: Tree, modulePath: string, name: string, property: ngModuleDecoratorProperty): void;
export declare function insertNgModuleImport(tree: Tree, modulePath: string, importName: string): void;
