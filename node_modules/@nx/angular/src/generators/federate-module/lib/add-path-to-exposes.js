"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPathToExposes = addPathToExposes;
const devkit_1 = require("@nx/devkit");
const ensure_typescript_1 = require("@nx/js/src/utils/typescript/ensure-typescript");
let tsModule;
function addPathToExposes(tree, { projectPath, moduleName, modulePath }) {
    const moduleFederationConfigPath = (0, devkit_1.joinPathFragments)(projectPath, tree.exists((0, devkit_1.joinPathFragments)(projectPath, 'module-federation.config.ts'))
        ? 'module-federation.config.ts'
        : 'module-federation.config.js');
    updateExposesProperty(tree, moduleFederationConfigPath, moduleName, modulePath);
}
function updateExposesProperty(tree, moduleFederationConfigPath, moduleName, modulePath) {
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    const fileContent = tree.read(moduleFederationConfigPath, 'utf-8');
    const source = tsModule.createSourceFile(moduleFederationConfigPath, fileContent, tsModule.ScriptTarget.ES2015, true);
    const exposesObject = findExposes(source);
    if (!exposesObject)
        return;
    const newEntry = createObjectEntry(moduleName, modulePath);
    const updatedSourceFile = updateExposesPropertyinAST(source, exposesObject, newEntry);
    writeToConfig(tree, moduleFederationConfigPath, source, updatedSourceFile);
}
function findExposes(sourceFile) {
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    let exposesObject = null;
    const visit = (node) => {
        if (tsModule.isPropertyAssignment(node) &&
            tsModule.isIdentifier(node.name) &&
            node.name.text === 'exposes' &&
            tsModule.isObjectLiteralExpression(node.initializer)) {
            exposesObject = node.initializer;
        }
        else {
            tsModule.forEachChild(node, visit);
        }
    };
    tsModule.forEachChild(sourceFile, visit);
    return exposesObject;
}
// Create a new property assignment
function createObjectEntry(moduleName, modulePath) {
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    return tsModule.factory.createPropertyAssignment(tsModule.factory.createStringLiteral(`./${moduleName}`, true), tsModule.factory.createStringLiteral(modulePath, true));
}
// Update the exposes property in the AST
function updateExposesPropertyinAST(source, exposesObject, newEntry) {
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    const updatedExposes = tsModule.factory.updateObjectLiteralExpression(exposesObject, [...exposesObject.properties, newEntry]);
    const transform = (context) => {
        const visit = (node) => {
            // Comparing nodes indirectly to ensure type compatibility. You must ensure that the nodes are identical.
            return tsModule.isObjectLiteralExpression(node) && node === exposesObject
                ? updatedExposes
                : tsModule.visitEachChild(node, visit, context);
        };
        return (node) => tsModule.visitNode(node, visit);
    };
    return tsModule.transform(source, [transform]).transformed[0];
}
// Write the updated AST to the file (module-federation.config.js)
function writeToConfig(tree, filename, source, updatedSourceFile) {
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    const printer = tsModule.createPrinter();
    const update = printer.printNode(tsModule.EmitHint.Unspecified, updatedSourceFile, source);
    tree.write(filename, update);
}
