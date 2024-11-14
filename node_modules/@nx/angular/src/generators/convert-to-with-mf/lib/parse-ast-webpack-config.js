"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseASTOfWebpackConfig = parseASTOfWebpackConfig;
const ensure_typescript_1 = require("@nx/js/src/utils/typescript/ensure-typescript");
function parseASTOfWebpackConfig(tree, pathToWebpackConfig) {
    if (!tree.exists(pathToWebpackConfig)) {
        throw new Error(`Cannot migrate webpack config at \`${pathToWebpackConfig}\` as it does not exist. Please ensure this file exists and that the path to the file is correct.`);
    }
    (0, ensure_typescript_1.ensureTypescript)();
    const { tsquery } = require('@phenomnomnominal/tsquery');
    const source = tree.read(pathToWebpackConfig, 'utf-8');
    return tsquery.ast(source);
}
