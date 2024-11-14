"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrator = void 0;
const devkit_1 = require("@nx/devkit");
const path_1 = require("path");
class Migrator {
    constructor(tree, projectConfig, logger) {
        this.tree = tree;
        this.projectConfig = projectConfig;
        this.logger = logger;
        this.originalProjectConfig = Object.freeze(JSON.parse(JSON.stringify(this.projectConfig)));
    }
    convertAsset(asset) {
        if (typeof asset === 'string') {
            return this.convertRootPath(asset);
        }
        else {
            return { ...asset, input: this.convertRootPath(asset.input) };
        }
    }
    convertRootPath(originalPath) {
        return originalPath?.startsWith(this.project.oldRoot)
            ? (0, devkit_1.joinPathFragments)(this.project.newRoot, originalPath.replace(this.project.oldRoot, ''))
            : originalPath;
    }
    convertSourceRootPath(originalPath) {
        return originalPath?.startsWith(this.project.oldSourceRoot)
            ? (0, devkit_1.joinPathFragments)(this.project.newSourceRoot, originalPath.replace(this.project.oldSourceRoot, ''))
            : originalPath;
    }
    moveFile(from, to, required = true) {
        if (!this.tree.exists(from)) {
            if (required) {
                this.logger.warn(`The path "${from}" does not exist. Skipping.`);
            }
        }
        else if (this.tree.exists(to)) {
            if (required) {
                this.logger.warn(`The path "${to}" already exists. Skipping.`);
            }
        }
        else {
            const contents = this.tree.read(from);
            this.tree.write(to, contents);
            this.tree.delete(from);
        }
    }
    moveFilePathsFromTargetToProjectRoot(target, options) {
        options.forEach((option) => {
            this.getTargetValuesForOption(target, option).forEach((path) => {
                this.moveProjectRootFile(path);
            });
        });
    }
    moveProjectRootFile(filePath, isRequired = true) {
        if (!filePath) {
            return;
        }
        const filename = !!filePath ? (0, path_1.basename)(filePath) : '';
        const from = filePath;
        const to = (0, devkit_1.joinPathFragments)(this.project.newRoot, filename);
        this.moveFile(from, to, isRequired);
    }
    // TODO(leo): This should be moved to BuilderMigrator once everything is split into builder migrators.
    updateCacheableOperations(targetNames) {
        if (!targetNames.length) {
            return;
        }
        const nxJson = (0, devkit_1.readNxJson)(this.tree);
        nxJson.targetDefaults ??= {};
        for (const target of targetNames) {
            nxJson.targetDefaults[target] ??= {};
            nxJson.targetDefaults[target].cache ??= true;
        }
        (0, devkit_1.updateNxJson)(this.tree, nxJson);
    }
    // TODO(leo): This should be moved to BuilderMigrator once everything is split into builder migrators.
    updateTsConfigFile(tsConfigPath, rootTsConfigFile, projectOffsetFromRoot) {
        (0, devkit_1.updateJson)(this.tree, tsConfigPath, (json) => {
            json.extends = `${projectOffsetFromRoot}${rootTsConfigFile}`;
            json.compilerOptions = json.compilerOptions ?? {};
            json.compilerOptions.outDir = `${projectOffsetFromRoot}dist/out-tsc`;
            return json;
        });
    }
    getTargetValuesForOption(target, optionPath) {
        const values = new Set();
        const value = this.getValueForOption(target.options, optionPath);
        if (value) {
            values.add(value);
        }
        for (const configuration of Object.values(target.configurations ?? {})) {
            const value = this.getValueForOption(configuration, optionPath);
            if (value) {
                values.add(value);
            }
        }
        return Array.from(values);
    }
    getValueForOption(options, optionPath) {
        if (!options) {
            return null;
        }
        const segments = optionPath.split('.');
        let value = options;
        for (const segment of segments) {
            if (value && value[segment]) {
                value = value[segment];
            }
            else {
                return null;
            }
        }
        return value;
    }
}
exports.Migrator = Migrator;
