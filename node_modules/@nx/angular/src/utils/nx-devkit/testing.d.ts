import type { Tree } from '@nx/devkit';
export interface AppConfig {
    appName: string;
    appModule: string;
}
export interface LibConfig {
    name: string;
    module: string;
    barrel: string;
}
export declare function getAppConfig(): AppConfig;
export declare function getLibConfig(): LibConfig;
export declare function createApp(tree: Tree, appName: string, routing?: boolean): void;
export declare function createLib(tree: Tree, libName: string): void;
