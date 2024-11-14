"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngrxRootStoreGenerator = ngrxRootStoreGenerator;
const tslib_1 = require("tslib");
const devkit_1 = require("@nx/devkit");
const lib_1 = require("./lib");
const ngrx_feature_store_1 = tslib_1.__importDefault(require("../ngrx-feature-store/ngrx-feature-store"));
async function ngrxRootStoreGenerator(tree, schema) {
    (0, lib_1.validateOptions)(tree, schema);
    const options = (0, lib_1.normalizeOptions)(tree, schema);
    if (!options.skipImport) {
        (0, lib_1.addImportsToModule)(tree, options);
    }
    if (!options.minimal) {
        await (0, ngrx_feature_store_1.default)(tree, {
            name: options.name,
            parent: options.parent,
            directory: options.directory,
            minimal: false,
            facade: options.facade,
            barrels: false,
            skipImport: false,
            skipPackageJson: true,
            skipFormat: true,
        });
    }
    let packageInstallationTask = () => { };
    if (!options.skipPackageJson) {
        packageInstallationTask = (0, lib_1.addNgRxToPackageJson)(tree, options);
    }
    if (!options.skipFormat) {
        await (0, devkit_1.formatFiles)(tree);
    }
    return packageInstallationTask;
}
exports.default = ngrxRootStoreGenerator;
