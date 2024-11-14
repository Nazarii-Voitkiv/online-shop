"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scamToStandalone = scamToStandalone;
const devkit_1 = require("@nx/devkit");
const lib_1 = require("./lib");
async function scamToStandalone(tree, { component, project: projectName, skipFormat }) {
    const projects = (0, devkit_1.getProjects)(tree);
    let project = (0, lib_1.getTargetProject)(projectName, projects);
    const normalizedComponentPath = (0, devkit_1.joinPathFragments)(project.root, component);
    if (!tree.exists(normalizedComponentPath)) {
        throw new Error(`The path provided to the component (${normalizedComponentPath}) does not exist. Please ensure the correct path has been provided.`);
    }
    const { componentFileContents, componentAST, componentName } = (0, lib_1.getComponentDataFromAST)(tree, normalizedComponentPath);
    const isInlineScam = (0, lib_1.verifyIsInlineScam)(componentAST);
    if (!isInlineScam) {
        throw new Error('This generator currently only supports inline SCAMs. We could not find an accompanying NgModule within the component file, please ensure the SCAM provided is an inline scam.');
    }
    const { moduleNodes, exportsArray, importsArray, declarationsArray, providersArray, moduleName, } = (0, lib_1.getModuleMetadataFromAST)(componentAST, componentFileContents);
    (0, lib_1.verifyModuleIsScam)(exportsArray, componentName, declarationsArray);
    (0, lib_1.convertScamToStandalone)(componentAST, componentFileContents, importsArray, providersArray, moduleNodes, tree, normalizedComponentPath, componentName);
    (0, lib_1.replaceModuleUsagesWithComponent)(tree, moduleName, componentName);
    if (!skipFormat) {
        await (0, devkit_1.formatFiles)(tree);
    }
}
exports.default = scamToStandalone;
