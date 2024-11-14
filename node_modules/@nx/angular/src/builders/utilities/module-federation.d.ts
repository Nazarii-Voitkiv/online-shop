import { ProjectConfiguration } from '@nx/devkit';
export type DevRemoteDefinition = string | {
    remoteName: string;
    configuration: string;
};
export declare function getDynamicRemotes(project: ProjectConfiguration, context: import('@angular-devkit/architect').BuilderContext, workspaceProjects: Record<string, ProjectConfiguration>, remotesToSkip: Set<string>, pathToManifestFile: string | undefined): string[];
export declare function getStaticRemotes(project: ProjectConfiguration, context: import('@angular-devkit/architect').BuilderContext, workspaceProjects: Record<string, ProjectConfiguration>, remotesToSkip: Set<string>): string[];
export declare function validateDevRemotes(options: {
    devRemotes: DevRemoteDefinition[];
}, workspaceProjects: Record<string, ProjectConfiguration>): void;
export declare function getDynamicMfManifestFile(project: ProjectConfiguration, workspaceRoot: string): string | undefined;
