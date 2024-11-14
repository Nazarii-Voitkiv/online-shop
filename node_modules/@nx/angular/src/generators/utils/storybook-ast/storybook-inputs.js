"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputPropertyDeclarations = getInputPropertyDeclarations;
exports.getComponentProps = getComponentProps;
exports.getArgType = getArgType;
exports.getArgsDefaultValue = getArgsDefaultValue;
const js_1 = require("@nx/js");
const ast_utils_1 = require("../../../utils/nx-devkit/ast-utils");
const ensure_typescript_1 = require("@nx/js/src/utils/typescript/ensure-typescript");
let tsModule;
function getInputPropertyDeclarations(tree, path) {
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    const file = (0, ast_utils_1.getTsSourceFile)(tree, path);
    const decorators = (0, js_1.getSourceNodes)(file).filter((node) => node.kind === tsModule.SyntaxKind.Decorator);
    return decorators
        .filter((decorator) => (0, js_1.findNodes)(decorator, tsModule.SyntaxKind.Identifier).some((node) => node.getText() === 'Input'))
        .map((node) => node.parent);
}
function getComponentProps(tree, componentPath, getArgsDefaultValueFn = getArgsDefaultValue, useDecoratorName = true) {
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    const props = getInputPropertyDeclarations(tree, componentPath).map((node) => {
        const decoratorContent = (0, js_1.findNodes)((0, js_1.findNodes)(node, tsModule.SyntaxKind.Decorator).find((n) => n.getText().startsWith('@Input')), tsModule.SyntaxKind.StringLiteral);
        const name = useDecoratorName && decoratorContent.length
            ? !decoratorContent[0].getText().includes('.')
                ? decoratorContent[0].getText().slice(1, -1)
                : node.name.getText()
            : node.name.getText();
        const type = getArgType(node);
        const defaultValue = getArgsDefaultValueFn(node);
        return {
            name,
            type,
            defaultValue,
        };
    });
    return props;
}
function getArgType(property) {
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    if (property.type) {
        const typeName = property.type.getText();
        const typeNameToArgType = {
            string: 'text',
            number: 'number',
            boolean: 'boolean',
        };
        return typeNameToArgType[typeName] || 'text';
    }
    if (property.initializer) {
        const initializerKindToArgType = {
            [tsModule.SyntaxKind.StringLiteral]: 'text',
            [tsModule.SyntaxKind.NumericLiteral]: 'number',
            [tsModule.SyntaxKind.TrueKeyword]: 'boolean',
            [tsModule.SyntaxKind.FalseKeyword]: 'boolean',
        };
        return initializerKindToArgType[property.initializer.kind] || 'text';
    }
    return 'text';
}
function getArgsDefaultValue(property) {
    const typeNameToDefault = {
        string: "''",
        number: '0',
        boolean: 'false',
    };
    return property.initializer
        ? property.initializer.getText()
        : property.type
            ? typeNameToDefault[property.type.getText()]
            : "''";
}
