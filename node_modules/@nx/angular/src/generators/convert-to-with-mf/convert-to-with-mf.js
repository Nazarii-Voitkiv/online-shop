"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToWithMF = convertToWithMF;
const devkit_1 = require("@nx/devkit");
const get_mf_projects_1 = require("../../utils/get-mf-projects");
const lib_1 = require("./lib");
async function convertToWithMF(tree, schema) {
    const projects = new Set((0, get_mf_projects_1.getMFProjects)(tree, { legacy: true }));
    if (!projects.has(schema.project)) {
        throw new Error(`Could not find project "${schema.project}" with a Micro Frontend configuration in your workspace. Please check the name of the project you're wishing to convert exists.`);
    }
    const project = (0, devkit_1.readProjectConfiguration)(tree, schema.project);
    const pathToWebpackConfig = (0, lib_1.getWebpackConfigPath)(project, schema.project);
    const webpackAst = (0, lib_1.parseASTOfWebpackConfig)(tree, pathToWebpackConfig);
    if (!(0, lib_1.checkOutputNameMatchesProjectName)(webpackAst, schema.project)) {
        throw new Error(`Cannot automatically migrate "${schema.project}" to "withModuleFederation" micro frontend webpack config. 
      "uniqueName" in webpack config (${pathToWebpackConfig}) does not match project name.`);
    }
    if (!(0, lib_1.checkSharedNpmPackagesMatchExpected)(webpackAst)) {
        throw new Error(`Cannot automatically migrate "${schema.project}" to "withModuleFederation" micro frontend webpack config. 
        There are npm packages being shared with a custom configuration in webpack config (${pathToWebpackConfig}).`);
    }
    devkit_1.logger.warn(`This Micro Frontend configuration conversion will overwrite "${schema.project}"'s current webpack config. If you have anything custom that is not related to Micro Frontends, it will be lost. You should be able to see the changes in your version control system.`);
    const [updatedWebpackConfig, mfConfig] = (0, lib_1.writeNewWebpackConfig)(webpackAst, (0, lib_1.isHostRemoteConfig)(webpackAst), schema.project);
    tree.write(pathToWebpackConfig, updatedWebpackConfig);
    tree.write((0, devkit_1.joinPathFragments)(project.root, 'module-federation.config.js'), mfConfig);
    if (!schema.skipFormat) {
        await (0, devkit_1.formatFiles)(tree);
    }
}
exports.default = convertToWithMF;
