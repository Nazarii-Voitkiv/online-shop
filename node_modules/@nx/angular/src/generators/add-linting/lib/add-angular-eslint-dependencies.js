"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAngularEsLintDependencies = addAngularEsLintDependencies;
const devkit_1 = require("@nx/devkit");
const flat_config_1 = require("@nx/eslint/src/utils/flat-config");
const versions_1 = require("@nx/eslint/src/utils/versions");
const version_utils_1 = require("../../utils/version-utils");
const buildable_project_1 = require("./buildable-project");
function addAngularEsLintDependencies(tree, projectName) {
    const compatVersions = (0, version_utils_1.versions)(tree);
    const angularEslintVersionToInstall = compatVersions.angularEslintVersion;
    const usesEslintFlatConfig = (0, flat_config_1.useFlatConfig)(tree);
    const devDependencies = usesEslintFlatConfig
        ? {
            'angular-eslint': angularEslintVersionToInstall,
        }
        : {
            '@angular-eslint/eslint-plugin': angularEslintVersionToInstall,
            '@angular-eslint/eslint-plugin-template': angularEslintVersionToInstall,
            '@angular-eslint/template-parser': angularEslintVersionToInstall,
        };
    if ('typescriptEslintVersion' in compatVersions) {
        devDependencies['@typescript-eslint/utils'] = usesEslintFlatConfig
            ? versions_1.eslint9__typescriptESLintVersion
            : compatVersions.typescriptEslintVersion;
    }
    if ((0, buildable_project_1.isBuildableLibraryProject)(tree, projectName)) {
        const jsoncEslintParserVersionToInstall = (0, version_utils_1.versions)(tree).jsoncEslintParserVersion;
        devDependencies['jsonc-eslint-parser'] = jsoncEslintParserVersionToInstall;
    }
    return (0, devkit_1.addDependenciesToPackageJson)(tree, {}, devDependencies);
}
