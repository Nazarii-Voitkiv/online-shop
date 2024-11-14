"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addImportsToModule = addImportsToModule;
const ast_utils_1 = require("../../../utils/nx-devkit/ast-utils");
const ensure_typescript_1 = require("@nx/js/src/utils/typescript/ensure-typescript");
const js_1 = require("@nx/js");
let tsModule;
function addRootStoreImport(tree, isParentStandalone, sourceFile, parentPath, provideRootStore, storeForRoot) {
    if (isParentStandalone) {
        if (tree.read(parentPath, 'utf-8').includes('ApplicationConfig')) {
            (0, ast_utils_1.addProviderToAppConfig)(tree, parentPath, provideRootStore);
        }
        else {
            (0, ast_utils_1.addProviderToBootstrapApplication)(tree, parentPath, provideRootStore);
        }
    }
    else {
        sourceFile = (0, ast_utils_1.addImportToModule)(tree, sourceFile, parentPath, storeForRoot);
    }
    return sourceFile;
}
function addRootEffectsImport(tree, isParentStandalone, sourceFile, parentPath, provideRootEffects, effectsForEmptyRoot) {
    if (isParentStandalone) {
        if (tree.read(parentPath, 'utf-8').includes('ApplicationConfig')) {
            (0, ast_utils_1.addProviderToAppConfig)(tree, parentPath, provideRootEffects);
        }
        else {
            (0, ast_utils_1.addProviderToBootstrapApplication)(tree, parentPath, provideRootEffects);
        }
    }
    else {
        sourceFile = (0, ast_utils_1.addImportToModule)(tree, sourceFile, parentPath, effectsForEmptyRoot);
    }
    return sourceFile;
}
function addRouterStoreImport(tree, sourceFile, addImport, parentPath, storeRouterModule) {
    sourceFile = addImport(sourceFile, 'StoreRouterConnectingModule', '@ngrx/router-store');
    return (0, ast_utils_1.addImportToModule)(tree, sourceFile, parentPath, storeRouterModule);
}
function addStoreDevTools(tree, sourceFile, parentPath, isParentStandalone, addImport) {
    sourceFile = addImport(sourceFile, 'isDevMode', '@angular/core');
    if (isParentStandalone) {
        sourceFile = addImport(sourceFile, 'provideStoreDevtools', '@ngrx/store-devtools');
        const provideStoreDevTools = 'provideStoreDevtools({ logOnly: !isDevMode() })';
        if (tree.read(parentPath, 'utf-8').includes('ApplicationConfig')) {
            (0, ast_utils_1.addProviderToAppConfig)(tree, parentPath, provideStoreDevTools);
        }
        else {
            (0, ast_utils_1.addProviderToBootstrapApplication)(tree, parentPath, provideStoreDevTools);
        }
    }
    else {
        sourceFile = addImport(sourceFile, 'StoreDevtoolsModule', '@ngrx/store-devtools');
        const storeDevToolsModule = 'StoreDevtoolsModule.instrument({ logOnly: !isDevMode() })';
        sourceFile = (0, ast_utils_1.addImportToModule)(tree, sourceFile, parentPath, storeDevToolsModule);
    }
    return sourceFile;
}
function addImportsToModule(tree, options) {
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    const parentPath = options.parent;
    const sourceText = tree.read(parentPath, 'utf-8');
    let sourceFile = tsModule.createSourceFile(parentPath, sourceText, tsModule.ScriptTarget.Latest, true);
    const isParentStandalone = !sourceText.includes('@NgModule');
    const addImport = (source, symbolName, fileName, isDefault = false) => {
        return (0, js_1.insertImport)(tree, source, parentPath, symbolName, fileName, isDefault);
    };
    const storeMetaReducers = `metaReducers: []`;
    const storeForRoot = `StoreModule.forRoot({}, {
      ${storeMetaReducers},
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true
      }
    })`;
    const effectsForEmptyRoot = `EffectsModule.forRoot([])`;
    const storeRouterModule = 'StoreRouterConnectingModule.forRoot()';
    const provideRootStore = `provideStore()`;
    const provideRootEffects = `provideEffects()`;
    if (isParentStandalone) {
        sourceFile = addImport(sourceFile, 'provideStore', '@ngrx/store');
        sourceFile = addImport(sourceFile, 'provideEffects', '@ngrx/effects');
    }
    else {
        sourceFile = addImport(sourceFile, 'StoreModule', '@ngrx/store');
        sourceFile = addImport(sourceFile, 'EffectsModule', '@ngrx/effects');
    }
    sourceFile = addRootEffectsImport(tree, isParentStandalone, sourceFile, parentPath, provideRootEffects, effectsForEmptyRoot);
    if (options.addDevTools) {
        sourceFile = addStoreDevTools(tree, sourceFile, parentPath, isParentStandalone, addImport);
    }
    sourceFile = addRootStoreImport(tree, isParentStandalone, sourceFile, parentPath, provideRootStore, storeForRoot);
    // this is just a heuristic
    const hasRouter = sourceText.indexOf('RouterModule') > -1;
    if (hasRouter && !isParentStandalone) {
        sourceFile = addRouterStoreImport(tree, sourceFile, addImport, parentPath, storeRouterModule);
    }
}
