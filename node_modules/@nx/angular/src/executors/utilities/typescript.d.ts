/**
 * Adapted from a private function at ng-packagr
 * https://github.com/ng-packagr/ng-packagr/blob/main/src/lib/ts/tsconfig.ts#L12:
 *
 * Changes made:
 * - Added an extra function that updates the configFilePath in the returned parsed options
 * to be the original tsconfig file.
 */
/**
 * Proxy function that ensures the configFilePath option points to the original file path.
 */
export declare function parseRemappedTsConfigAndMergeDefaults(workspaceRoot: string, originalFilePath: string, remappedFilePath: string): Promise<any>;
