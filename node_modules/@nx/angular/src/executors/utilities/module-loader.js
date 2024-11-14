"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadModule = loadModule;
exports.loadEsmModule = loadEsmModule;
const path_1 = require("path");
const node_url_1 = require("node:url");
async function loadModule(path) {
    switch ((0, path_1.extname)(path)) {
        case '.mjs': {
            const result = await loadEsmModule((0, node_url_1.pathToFileURL)(path));
            return result.default ?? result;
        }
        case '.cjs': {
            const result = require(path);
            return result.default ?? result;
        }
        default:
            // it can be CommonJS or ESM, try both
            try {
                const result = require(path);
                return result.default ?? result;
            }
            catch (e) {
                if (e.code === 'ERR_REQUIRE_ESM') {
                    const result = await loadEsmModule((0, node_url_1.pathToFileURL)(path));
                    return result.default ?? result;
                }
                throw e;
            }
    }
}
/**
 * Lazily compiled dynamic import loader function.
 */
let load;
/**
 * This uses a dynamic import to load a module which may be ESM.
 * CommonJS code can load ESM code via a dynamic import. Unfortunately, TypeScript
 * will currently, unconditionally downlevel dynamic import into a require call.
 * require calls cannot load ESM code and will result in a runtime error. To workaround
 * this, a Function constructor is used to prevent TypeScript from changing the dynamic import.
 * Once TypeScript provides support for keeping the dynamic import this workaround can
 * be dropped.
 *
 * @param modulePath The path of the module to load.
 * @returns A Promise that resolves to the dynamically imported module.
 */
function loadEsmModule(modulePath) {
    load ??= new Function('modulePath', `return import(modulePath);`);
    return load(modulePath);
}
