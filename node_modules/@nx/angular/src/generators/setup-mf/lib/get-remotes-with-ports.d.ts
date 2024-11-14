import type { Tree } from '@nx/devkit';
import type { Schema } from '../schema';
export declare function getRemotesWithPorts(host: Tree, options: Schema): {
    remoteName: string;
    port: number;
}[];
