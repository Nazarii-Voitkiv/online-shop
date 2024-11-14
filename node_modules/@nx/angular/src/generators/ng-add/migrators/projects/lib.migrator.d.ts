import { Tree } from '@nx/devkit';
import type { GeneratorOptions } from '../../schema';
import type { Logger, MigrationProjectConfiguration, ValidationResult } from '../../utilities';
import { ProjectMigrator } from './project.migrator';
export declare class LibMigrator extends ProjectMigrator {
    constructor(tree: Tree, options: GeneratorOptions, project: MigrationProjectConfiguration, logger?: Logger);
    migrate(): Promise<void>;
    validate(): ValidationResult;
    private moveProjectFiles;
    private updateProjectConfiguration;
}
