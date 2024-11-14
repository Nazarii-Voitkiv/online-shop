"use strict";
/**
 * Note to developers: STOP! These exports end up as the public API of @nx/angular/src/utils.
 *
 * Try hard to not add to this API to reduce the surface area we need to maintain.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProviderToRoute = exports.addRoute = exports.addViewProviderToComponent = exports.addProviderToModule = exports.addProviderToComponent = exports.addProviderToAppConfig = exports.addProviderToBootstrapApplication = exports.addImportToModule = exports.addImportToPipe = exports.addImportToDirective = exports.addImportToComponent = exports.isStandalone = void 0;
var ast_utils_1 = require("./nx-devkit/ast-utils");
Object.defineProperty(exports, "isStandalone", { enumerable: true, get: function () { return ast_utils_1.isStandalone; } });
Object.defineProperty(exports, "addImportToComponent", { enumerable: true, get: function () { return ast_utils_1.addImportToComponent; } });
Object.defineProperty(exports, "addImportToDirective", { enumerable: true, get: function () { return ast_utils_1.addImportToDirective; } });
Object.defineProperty(exports, "addImportToPipe", { enumerable: true, get: function () { return ast_utils_1.addImportToPipe; } });
Object.defineProperty(exports, "addImportToModule", { enumerable: true, get: function () { return ast_utils_1.addImportToModule; } });
Object.defineProperty(exports, "addProviderToBootstrapApplication", { enumerable: true, get: function () { return ast_utils_1.addProviderToBootstrapApplication; } });
Object.defineProperty(exports, "addProviderToAppConfig", { enumerable: true, get: function () { return ast_utils_1.addProviderToAppConfig; } });
Object.defineProperty(exports, "addProviderToComponent", { enumerable: true, get: function () { return ast_utils_1.addProviderToComponent; } });
Object.defineProperty(exports, "addProviderToModule", { enumerable: true, get: function () { return ast_utils_1.addProviderToModule; } });
Object.defineProperty(exports, "addViewProviderToComponent", { enumerable: true, get: function () { return ast_utils_1.addViewProviderToComponent; } });
var route_utils_1 = require("./nx-devkit/route-utils");
Object.defineProperty(exports, "addRoute", { enumerable: true, get: function () { return route_utils_1.addRoute; } });
Object.defineProperty(exports, "addProviderToRoute", { enumerable: true, get: function () { return route_utils_1.addProviderToRoute; } });
