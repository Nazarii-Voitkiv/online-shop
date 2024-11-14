"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPlugins = loadPlugins;
exports.loadMiddleware = loadMiddleware;
exports.loadIndexHtmlTransformer = loadIndexHtmlTransformer;
const internal_1 = require("@nx/js/src/internal");
const module_loader_1 = require("./module-loader");
async function loadPlugins(plugins, tsConfig) {
    if (!plugins?.length) {
        return [];
    }
    const cleanupTranspiler = (0, internal_1.registerTsProject)(tsConfig);
    try {
        return await Promise.all(plugins.map((plugin) => loadPlugin(plugin)));
    }
    finally {
        cleanupTranspiler();
    }
}
async function loadPlugin(pluginSpec) {
    const pluginPath = typeof pluginSpec === 'string' ? pluginSpec : pluginSpec.path;
    let plugin = await (0, module_loader_1.loadModule)(pluginPath);
    if (typeof plugin === 'function') {
        plugin =
            typeof pluginSpec === 'object' ? plugin(pluginSpec.options) : plugin();
    }
    return plugin;
}
async function loadMiddleware(middlewareFns, tsConfig) {
    if (!middlewareFns?.length) {
        return [];
    }
    const cleanupTranspiler = (0, internal_1.registerTsProject)(tsConfig);
    try {
        return await Promise.all(middlewareFns.map((fnPath) => (0, module_loader_1.loadModule)(fnPath)));
    }
    finally {
        cleanupTranspiler();
    }
}
async function loadIndexHtmlTransformer(indexHtmlTransformerPath, tsConfig) {
    const cleanupTranspiler = (0, internal_1.registerTsProject)(tsConfig);
    try {
        return await (0, module_loader_1.loadModule)(indexHtmlTransformerPath);
    }
    finally {
        cleanupTranspiler();
    }
}
