"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSelector = buildSelector;
exports.validateHtmlSelector = validateHtmlSelector;
const devkit_1 = require("@nx/devkit");
function buildSelector(name, prefix, projectPrefix, casing) {
    let selector = name;
    prefix ??= projectPrefix;
    if (prefix) {
        selector = `${prefix}-${selector}`;
    }
    return (0, devkit_1.names)(selector)[casing];
}
// https://github.com/angular/angular-cli/blob/main/packages/schematics/angular/utility/validation.ts#L11-L14
const htmlSelectorRegex = /^[a-zA-Z][.0-9a-zA-Z]*((:?-[0-9]+)*|(:?-[a-zA-Z][.0-9a-zA-Z]*(:?-[0-9]+)*)*)$/;
function validateHtmlSelector(selector) {
    if (selector && !htmlSelectorRegex.test(selector)) {
        throw new Error(`The selector "${selector}" is invalid.`);
    }
}
