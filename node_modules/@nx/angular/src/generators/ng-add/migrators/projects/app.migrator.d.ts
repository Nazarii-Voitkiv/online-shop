import type { Tree } from '@nx/devkit';
import type { GeneratorOptions } from '../../schema';
import type { Logger, MigrationProjectConfiguration, ValidationResult } from '../../utilities';
import { ProjectMigrator } from './project.migrator';
type SupportedTargets = 'build' | 'e2e' | 'i18n' | 'prerender' | 'serve' | 'server' | 'serveSsr';
export declare class AppMigrator extends ProjectMigrator<SupportedTargets> {
    private e2eMigrator;
    constructor(tree: Tree, options: GeneratorOptions, project: MigrationProjectConfiguration, logger?: Logger);
    migrate(): Promise<void>;
    validate(): ValidationResult;
    private moveProjectFiles;
    private setCacheableOperations;
    private updateProjectConfiguration;
    private updateProjectConfigurationTargets;
    private updateTsConfigs;
    private convertBuildOptions;
    private convertServerOptions;
    private updateBuildTargetConfiguration;
    private updatePrerenderTargetConfiguration;
    private updateServerTargetConfiguration;
    private updateServeSsrTargetConfiguration;
    private updateTsConfigFileUsedByBuildTarget;
    private updateTsConfigFileUsedByServerTarget;
}
export {};
