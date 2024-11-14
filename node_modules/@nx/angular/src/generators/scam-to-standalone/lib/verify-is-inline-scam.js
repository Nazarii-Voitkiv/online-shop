"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyIsInlineScam = verifyIsInlineScam;
const selector_exists_in_ast_1 = require("./selector-exists-in-ast");
function verifyIsInlineScam(componentAST) {
    const NGMODULE_DECORATOR_SELECTOR = 'ClassDeclaration > Decorator > CallExpression:has(Identifier[name=NgModule])';
    const COMPONENT_DECORATOR_SELECTOR = 'ClassDeclaration > Decorator > CallExpression:has(Identifier[name=Component])';
    return ((0, selector_exists_in_ast_1.selectorExistsInAST)(COMPONENT_DECORATOR_SELECTOR, componentAST) &&
        (0, selector_exists_in_ast_1.selectorExistsInAST)(NGMODULE_DECORATOR_SELECTOR, componentAST));
}
