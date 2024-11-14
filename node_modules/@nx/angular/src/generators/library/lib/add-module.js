"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addModule = addModule;
const add_children_1 = require("./add-children");
const add_load_children_1 = require("./add-load-children");
function addModule(host, options) {
    if (options.routing && options.lazy && options.parent) {
        (0, add_load_children_1.addLoadChildren)(host, options);
    }
    if (options.routing && !options.lazy && options.parent) {
        (0, add_children_1.addChildren)(host, options);
    }
}
