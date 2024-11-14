"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOptions = validateOptions;
function validateOptions(tree, options) {
    if (!options.module && !options.parent) {
        throw new Error('Please provide a value for "--parent"!');
    }
    if (options.module && !tree.exists(options.module)) {
        throw new Error(`Module does not exist: ${options.module}.`);
    }
    if (options.parent && !tree.exists(options.parent)) {
        throw new Error(`Parent does not exist: ${options.parent}.`);
    }
}
