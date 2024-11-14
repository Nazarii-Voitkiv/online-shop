"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scamPipeGenerator = scamPipeGenerator;
const devkit_1 = require("@nx/devkit");
const pipe_1 = require("../pipe/pipe");
const export_scam_1 = require("../utils/export-scam");
const lib_1 = require("./lib");
async function scamPipeGenerator(tree, rawOptions) {
    const options = await (0, lib_1.normalizeOptions)(tree, rawOptions);
    await (0, pipe_1.pipeGenerator)(tree, {
        ...options,
        skipImport: true,
        export: false,
        standalone: false,
        skipFormat: true,
    });
    (0, lib_1.convertPipeToScam)(tree, options);
    (0, export_scam_1.exportScam)(tree, options);
    if (!options.skipFormat) {
        await (0, devkit_1.formatFiles)(tree);
    }
}
exports.default = scamPipeGenerator;
