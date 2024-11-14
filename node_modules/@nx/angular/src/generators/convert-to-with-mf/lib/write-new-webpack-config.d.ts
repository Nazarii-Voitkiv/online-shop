import type { SourceFile } from 'typescript';
import { IsHostRemoteConfigResult } from './is-host-remote-config';
export declare function writeNewWebpackConfig(ast: SourceFile, mfType: IsHostRemoteConfigResult, projectName: string): string[];
