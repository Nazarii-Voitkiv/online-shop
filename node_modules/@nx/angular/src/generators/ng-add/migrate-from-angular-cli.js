"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateFromAngularCli = migrateFromAngularCli;
const devkit_1 = require("@nx/devkit");
const migrators_1 = require("./migrators");
const utilities_1 = require("./utilities");
async function migrateFromAngularCli(tree, options) {
    (0, utilities_1.validateWorkspace)(tree);
    const projects = (0, utilities_1.getAllProjects)(tree);
    const angularJson = (0, devkit_1.readJson)(tree, 'angular.json');
    (0, utilities_1.ensureAngularDevKitPeerDependenciesAreInstalled)(tree);
    const migrators = [
        ...projects.apps.map((app) => new migrators_1.AppMigrator(tree, options, app)),
        ...projects.libs.map((lib) => new migrators_1.LibMigrator(tree, options, lib)),
    ];
    const workspaceRootFileTypesInfo = (0, utilities_1.getWorkspaceRootFileTypesInfo)(tree, migrators);
    /**
     * Keep a copy of the root eslint config to restore it later. We need to
     * do this because the root config can also be the config for the app at
     * the root of the Angular CLI workspace and it will be moved as part of
     * the app migration.
     */
    let eslintConfig = workspaceRootFileTypesInfo.eslint && tree.exists('.eslintrc.json')
        ? (0, devkit_1.readJson)(tree, '.eslintrc.json')
        : undefined;
    // create and update root files and configurations
    (0, devkit_1.updateJson)(tree, 'angular.json', (json) => ({
        ...json,
        version: 2,
        $schema: undefined,
    }));
    (0, utilities_1.createNxJson)(tree, options, angularJson.defaultProject);
    (0, utilities_1.updateWorkspaceConfigDefaults)(tree);
    (0, utilities_1.updateRootTsConfig)(tree);
    (0, utilities_1.updatePackageJson)(tree);
    await (0, utilities_1.createWorkspaceFiles)(tree);
    // migrate all projects
    for (const migrator of migrators) {
        await migrator.migrate();
    }
    /**
     * This needs to be done last because the Angular CLI workspace can have
     * these files in the root for the root application, so we wait until
     * those root config files are moved when the projects are migrated.
     */
    if (workspaceRootFileTypesInfo.karma) {
        (0, utilities_1.createRootKarmaConfig)(tree);
    }
    if (workspaceRootFileTypesInfo.eslint) {
        await (0, utilities_1.updateRootEsLintConfig)(tree, eslintConfig, options.unitTestRunner);
        (0, utilities_1.cleanupEsLintPackages)(tree);
    }
    (0, utilities_1.deleteGitKeepFilesIfNotNeeded)(tree);
    (0, utilities_1.deleteAngularJson)(tree);
    if (!options.skipInstall) {
        return () => {
            (0, devkit_1.installPackagesTask)(tree);
            (0, utilities_1.formatFilesTask)(tree);
        };
    }
}
