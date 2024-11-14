import type { ProjectConfiguration, TargetConfiguration, Tree } from '@nx/devkit';
import type { Logger } from '../utilities/logger';
import type { ProjectMigrationInfo, ValidationResult } from '../utilities/types';
export declare abstract class Migrator {
    protected readonly tree: Tree;
    protected projectConfig: ProjectConfiguration;
    protected readonly logger: Logger;
    protected project: ProjectMigrationInfo;
    protected readonly originalProjectConfig: ProjectConfiguration;
    constructor(tree: Tree, projectConfig: ProjectConfiguration, logger: Logger);
    abstract migrate(): Promise<void> | void;
    abstract validate(): ValidationResult;
    protected convertAsset(asset: string | any): string | any;
    protected convertRootPath(originalPath: string): string;
    protected convertSourceRootPath(originalPath: string): string;
    protected moveFile(from: string, to: string, required?: boolean): void;
    protected moveFilePathsFromTargetToProjectRoot(target: TargetConfiguration, options: string[]): void;
    protected moveProjectRootFile(filePath: string, isRequired?: boolean): void;
    protected updateCacheableOperations(targetNames: string[]): void;
    protected updateTsConfigFile(tsConfigPath: string, rootTsConfigFile: string, projectOffsetFromRoot: string): void;
    private getTargetValuesForOption;
    private getValueForOption;
}
