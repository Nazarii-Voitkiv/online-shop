import type { ProjectConfiguration, Tree } from '@nx/devkit';
import type { Logger, ProjectMigrationInfo } from '../../utilities';
import { BuilderMigrator } from './builder.migrator';
export declare class AngularEslintLintMigrator extends BuilderMigrator {
    private oldEsLintConfigPath;
    private newEsLintConfigPath;
    constructor(tree: Tree, project: ProjectMigrationInfo, projectConfig: ProjectConfiguration, logger: Logger);
    migrate(): void;
    private updateTargetConfiguration;
    private updateEsLintConfig;
    private convertEsLintConfigExtendToNewPath;
}
