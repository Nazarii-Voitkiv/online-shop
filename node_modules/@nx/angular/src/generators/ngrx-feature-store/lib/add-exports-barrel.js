"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addExportsToBarrel = addExportsToBarrel;
const devkit_1 = require("@nx/devkit");
const ensure_typescript_1 = require("@nx/js/src/utils/typescript/ensure-typescript");
const js_1 = require("@nx/js");
let tsModule;
function addExportsToBarrel(tree, options) {
    const indexFilePath = (0, devkit_1.joinPathFragments)(options.parentDirectory, '..', 'index.ts');
    if (!tree.exists(indexFilePath)) {
        return;
    }
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    const indexSourceText = tree.read(indexFilePath, 'utf-8');
    let sourceFile = tsModule.createSourceFile(indexFilePath, indexSourceText, tsModule.ScriptTarget.Latest, true);
    // Public API for the feature interfaces, selectors, and facade
    const { className, fileName } = (0, devkit_1.names)(options.name);
    const fileNameWithSubdir = options.subdirectory
        ? (0, devkit_1.joinPathFragments)(options.subdirectory, fileName)
        : fileName;
    const statePath = `./lib/${options.directory}/${fileNameWithSubdir}`;
    sourceFile = (0, js_1.addGlobal)(tree, sourceFile, indexFilePath, options.barrels
        ? `import * as ${className}Actions from '${statePath}.actions';`
        : `export * from '${statePath}.actions';`);
    sourceFile = (0, js_1.addGlobal)(tree, sourceFile, indexFilePath, options.barrels
        ? `import * as ${className}Feature from '${statePath}.reducer';`
        : `export * from '${statePath}.reducer';`);
    sourceFile = (0, js_1.addGlobal)(tree, sourceFile, indexFilePath, options.barrels
        ? `import * as ${className}Selectors from '${statePath}.selectors';`
        : `export * from '${statePath}.selectors';`);
    if (options.barrels) {
        sourceFile = (0, js_1.addGlobal)(tree, sourceFile, indexFilePath, `export { ${className}Actions, ${className}Feature, ${className}Selectors };`);
    }
    sourceFile = (0, js_1.addGlobal)(tree, sourceFile, indexFilePath, `export * from '${statePath}.models';`);
    if (options.facade) {
        sourceFile = (0, js_1.addGlobal)(tree, sourceFile, indexFilePath, `export * from '${statePath}.facade';`);
    }
}
