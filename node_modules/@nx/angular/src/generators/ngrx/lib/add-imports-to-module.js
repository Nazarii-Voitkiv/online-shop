"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addImportsToModule = addImportsToModule;
const devkit_1 = require("@nx/devkit");
const js_1 = require("@nx/js");
const ensure_typescript_1 = require("@nx/js/src/utils/typescript/ensure-typescript");
const ast_utils_1 = require("../../../utils/nx-devkit/ast-utils");
const route_utils_1 = require("../../../utils/nx-devkit/route-utils");
let tsModule;
function addRootStoreImport(tree, isParentStandalone, route, sourceFile, parentPath, provideRootStore, storeForRoot) {
    if (isParentStandalone) {
        const parentContents = tree.read(parentPath, 'utf-8');
        if (parentContents.includes('ApplicationConfig')) {
            (0, ast_utils_1.addProviderToAppConfig)(tree, parentPath, provideRootStore);
        }
        else if (parentContents.includes('bootstrapApplication')) {
            (0, ast_utils_1.addProviderToBootstrapApplication)(tree, parentPath, provideRootStore);
        }
        else {
            (0, route_utils_1.addProviderToRoute)(tree, parentPath, route, provideRootStore);
        }
    }
    else {
        sourceFile = (0, ast_utils_1.addImportToModule)(tree, sourceFile, parentPath, storeForRoot);
    }
    return sourceFile;
}
function addRootEffectsImport(tree, isParentStandalone, route, sourceFile, parentPath, provideRootEffects, effectsForEmptyRoot) {
    if (isParentStandalone) {
        const parentContents = tree.read(parentPath, 'utf-8');
        if (parentContents.includes('ApplicationConfig')) {
            (0, ast_utils_1.addProviderToAppConfig)(tree, parentPath, provideRootEffects);
        }
        else if (parentContents.includes('bootstrapApplication')) {
            (0, ast_utils_1.addProviderToBootstrapApplication)(tree, parentPath, provideRootEffects);
        }
        else {
            (0, route_utils_1.addProviderToRoute)(tree, parentPath, route, provideRootEffects);
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
function addStoreForFeatureImport(tree, isParentStandalone, route, sourceFile, parentPath, provideStoreForFeature, storeForFeature) {
    if (isParentStandalone) {
        const parentContents = tree.read(parentPath, 'utf-8');
        if (parentContents.includes('ApplicationConfig')) {
            (0, ast_utils_1.addProviderToAppConfig)(tree, parentPath, provideStoreForFeature);
        }
        else if (parentContents.includes('bootstrapApplication')) {
            (0, ast_utils_1.addProviderToBootstrapApplication)(tree, parentPath, provideStoreForFeature);
        }
        else {
            (0, route_utils_1.addProviderToRoute)(tree, parentPath, route, provideStoreForFeature);
        }
    }
    else {
        sourceFile = (0, ast_utils_1.addImportToModule)(tree, sourceFile, parentPath, storeForFeature);
    }
    return sourceFile;
}
function addEffectsForFeatureImport(tree, isParentStandalone, route, sourceFile, parentPath, provideEffectsForFeature, effectsForFeature) {
    if (isParentStandalone) {
        const parentContents = tree.read(parentPath, 'utf-8');
        if (parentContents.includes('ApplicationConfig')) {
            (0, ast_utils_1.addProviderToAppConfig)(tree, parentPath, provideEffectsForFeature);
        }
        else if (parentContents.includes('bootstrapApplication')) {
            (0, ast_utils_1.addProviderToBootstrapApplication)(tree, parentPath, provideEffectsForFeature);
        }
        else {
            (0, route_utils_1.addProviderToRoute)(tree, parentPath, route, provideEffectsForFeature);
        }
    }
    else {
        sourceFile = (0, ast_utils_1.addImportToModule)(tree, sourceFile, parentPath, effectsForFeature);
    }
    return sourceFile;
}
function addImportsToModule(tree, options) {
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    const parentPath = options.module ?? options.parent;
    const sourceText = tree.read(parentPath, 'utf-8');
    let sourceFile = tsModule.createSourceFile(parentPath, sourceText, tsModule.ScriptTarget.Latest, true);
    const isParentStandalone = !sourceText.includes('@NgModule');
    const addImport = (source, symbolName, fileName, isDefault = false) => {
        return (0, js_1.insertImport)(tree, source, parentPath, symbolName, fileName, isDefault);
    };
    const dir = `./${(0, devkit_1.names)(options.directory).fileName}`;
    const pathPrefix = `${dir}/${(0, devkit_1.names)(options.name).fileName}`;
    const reducerPath = `${pathPrefix}.reducer`;
    const effectsPath = `${pathPrefix}.effects`;
    const facadePath = `${pathPrefix}.facade`;
    const constantName = `${(0, devkit_1.names)(options.name).constantName}`;
    const effectsName = `${(0, devkit_1.names)(options.name).className}Effects`;
    const facadeName = `${(0, devkit_1.names)(options.name).className}Facade`;
    const className = `${(0, devkit_1.names)(options.name).className}`;
    const propertyName = `${(0, devkit_1.names)(options.name).propertyName}`;
    const reducerImports = `* as from${className}`;
    const storeMetaReducers = `metaReducers: []`;
    const storeForRoot = `StoreModule.forRoot({}, {
      ${storeMetaReducers},
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true
      }
    })`;
    const effectsForRoot = `EffectsModule.forRoot([${effectsName}])`;
    const effectsForEmptyRoot = `EffectsModule.forRoot([])`;
    const storeForFeature = `StoreModule.forFeature(from${className}.${constantName}_FEATURE_KEY, from${className}.${propertyName}Reducer)`;
    const effectsForFeature = `EffectsModule.forFeature([${effectsName}])`;
    const storeRouterModule = 'StoreRouterConnectingModule.forRoot()';
    const provideRootStore = `provideStore()`;
    const provideRootEffects = `provideEffects()`;
    const provideEffectsForFeature = `provideEffects(${effectsName})`;
    const provideStoreForFeature = `provideState(from${className}.${constantName}_FEATURE_KEY, from${className}.${propertyName}Reducer)`;
    if (isParentStandalone) {
        sourceFile = addImport(sourceFile, 'provideStore', '@ngrx/store');
        sourceFile = addImport(sourceFile, 'provideState', '@ngrx/store');
        sourceFile = addImport(sourceFile, 'provideEffects', '@ngrx/effects');
    }
    else {
        sourceFile = addImport(sourceFile, 'StoreModule', '@ngrx/store');
        sourceFile = addImport(sourceFile, 'EffectsModule', '@ngrx/effects');
    }
    // this is just a heuristic
    const hasRouter = sourceText.indexOf('RouterModule') > -1;
    if (options.minimal && options.root) {
        sourceFile = addRootStoreImport(tree, isParentStandalone, options.route, sourceFile, parentPath, provideRootStore, storeForRoot);
        sourceFile = addRootEffectsImport(tree, isParentStandalone, options.route, sourceFile, parentPath, provideRootEffects, effectsForEmptyRoot);
        if (hasRouter && !isParentStandalone) {
            sourceFile = addRouterStoreImport(tree, sourceFile, addImport, parentPath, storeRouterModule);
        }
    }
    else {
        const addCommonImports = () => {
            sourceFile = addImport(sourceFile, reducerImports, reducerPath, true);
            sourceFile = addImport(sourceFile, effectsName, effectsPath);
            if (options.facade) {
                sourceFile = addImport(sourceFile, facadeName, facadePath);
                if (isParentStandalone) {
                    if (tree.read(parentPath, 'utf-8').includes('ApplicationConfig')) {
                        (0, ast_utils_1.addProviderToAppConfig)(tree, parentPath, facadeName);
                    }
                    else {
                        (0, route_utils_1.addProviderToRoute)(tree, parentPath, options.route, facadeName);
                    }
                }
                else {
                    sourceFile = (0, ast_utils_1.addProviderToModule)(tree, sourceFile, parentPath, facadeName);
                }
            }
            return sourceFile;
        };
        if (options.root) {
            sourceFile = addCommonImports();
            sourceFile = addRootStoreImport(tree, isParentStandalone, options.route, sourceFile, parentPath, provideRootStore, storeForRoot);
            sourceFile = addRootEffectsImport(tree, isParentStandalone, options.route, sourceFile, parentPath, provideRootEffects, effectsForRoot);
            if (hasRouter && !isParentStandalone) {
                sourceFile = addRouterStoreImport(tree, sourceFile, addImport, parentPath, storeRouterModule);
            }
            sourceFile = addStoreForFeatureImport(tree, isParentStandalone, options.route, sourceFile, parentPath, provideStoreForFeature, storeForFeature);
            if (isParentStandalone) {
                addEffectsForFeatureImport(tree, isParentStandalone, options.route, sourceFile, parentPath, provideEffectsForFeature, effectsForFeature);
            }
        }
        else {
            sourceFile = addCommonImports();
            sourceFile = addStoreForFeatureImport(tree, isParentStandalone, options.route, sourceFile, parentPath, provideStoreForFeature, storeForFeature);
            sourceFile = addEffectsForFeatureImport(tree, isParentStandalone, options.route, sourceFile, parentPath, provideEffectsForFeature, effectsForFeature);
        }
    }
}
