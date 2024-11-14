import type { Tree } from '@nx/devkit';
import type { GeneratorOptions } from '../../schema';
import type { MigrationProjectConfiguration, Target, ValidationResult, WorkspaceRootFileTypesInfo } from '../../utilities';
import { Logger } from '../../utilities';
import type { BuilderMigrator, BuilderMigratorClassType } from '../builders';
import { Migrator } from '../migrator';
export declare class ProjectMigrator<TargetType extends string = string> extends Migrator {
    protected readonly options: GeneratorOptions;
    protected readonly targets: Record<TargetType, Target>;
    get projectName(): string;
    protected builderMigrators: BuilderMigrator[];
    protected skipMigration: boolean | TargetType[];
    protected readonly targetNames: Partial<Record<TargetType, string>>;
    constructor(tree: Tree, options: GeneratorOptions, targets: Record<TargetType, Target>, project: MigrationProjectConfiguration, rootDir: string, logger?: Logger, supportedBuilderMigrators?: BuilderMigratorClassType[]);
    getWorkspaceRootFileTypesInfo(): WorkspaceRootFileTypesInfo;
    migrate(): void | Promise<void>;
    validate(): ValidationResult;
    protected convertPath(originalPath: string): string;
    protected moveDir(from: string, to: string): void;
    protected shouldSkipTargetTypeMigration(targetType: TargetType): boolean;
    protected visitFiles(dirPath: string, visitor: (path: string) => void): void;
    private updateGitAndPrettierIgnore;
    private collectTargetNames;
    private createBuilderMigrators;
    private skipProjectMigration;
    private skipTargetTypeMigration;
}
