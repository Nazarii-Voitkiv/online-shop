"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = normalizeOptions;
function normalizeOptions(options) {
    return {
        ...options,
        buildTarget: options.buildTarget || 'build',
    };
}
