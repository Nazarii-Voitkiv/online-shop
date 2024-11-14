import { Tree } from '@nx/devkit';
export type AddRemoteOptions = {
    host: string;
    appName: string;
    standalone: boolean;
    port: number;
};
export declare function checkIsCommaNeeded(mfRemoteText: string): boolean;
export declare function addRemoteToHost(tree: Tree, options: AddRemoteOptions): void;
