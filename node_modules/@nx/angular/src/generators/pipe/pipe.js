"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipeGenerator = pipeGenerator;
const devkit_1 = require("@nx/devkit");
const utils_1 = require("../utils");
const lib_1 = require("./lib");
async function pipeGenerator(tree, rawOptions) {
    const options = await (0, lib_1.normalizeOptions)(tree, rawOptions);
    const pipeNames = (0, devkit_1.names)(options.name);
    (0, devkit_1.generateFiles)(tree, (0, devkit_1.joinPathFragments)(__dirname, 'files'), options.directory, {
        symbolName: options.symbolName,
        fileName: options.fileName,
        selector: pipeNames.propertyName,
        standalone: options.standalone,
        tpl: '',
    });
    if (options.skipTests) {
        const pathToSpecFile = (0, devkit_1.joinPathFragments)(options.directory, `${options.fileName}.spec.ts`);
        tree.delete(pathToSpecFile);
    }
    if (!options.skipImport && !options.standalone) {
        const modulePath = (0, utils_1.findModule)(tree, options.directory, options.module);
        (0, utils_1.addToNgModule)(tree, options.directory, modulePath, options.name, options.symbolName, options.fileName, 'declarations', true, options.export);
    }
    if (!options.skipFormat) {
        await (0, devkit_1.formatFiles)(tree);
    }
}
exports.default = pipeGenerator;
