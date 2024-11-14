"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertNgModuleProperty = insertNgModuleProperty;
exports.insertNgModuleImport = insertNgModuleImport;
const devkit_1 = require("@nx/devkit");
const ensure_typescript_1 = require("@nx/js/src/utils/typescript/ensure-typescript");
let tsModule;
function insertNgModuleProperty(tree, modulePath, name, property) {
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    const contents = tree.read(modulePath).toString('utf-8');
    const sourceFile = tsModule.createSourceFile(modulePath, contents, tsModule.ScriptTarget.ESNext);
    const coreImport = findImport(sourceFile, '@angular/core');
    if (!coreImport) {
        throw new Error(`There are no imports from "@angular/core" in ${modulePath}.`);
    }
    const ngModuleNamedImport = getNamedImport(coreImport, 'NgModule');
    const ngModuleName = ngModuleNamedImport.name.escapedText;
    const ngModuleClassDeclaration = findDecoratedClass(sourceFile, ngModuleName);
    const { getDecorators } = getTsEsLintTypeUtils();
    const ngModuleDecorator = getDecorators(ngModuleClassDeclaration).find((decorator) => tsModule.isCallExpression(decorator.expression) &&
        tsModule.isIdentifier(decorator.expression.expression) &&
        decorator.expression.expression.escapedText === ngModuleName);
    const ngModuleCall = ngModuleDecorator.expression;
    if (ngModuleCall.arguments.length < 1) {
        const newContents = (0, devkit_1.applyChangesToString)(contents, [
            {
                type: devkit_1.ChangeType.Insert,
                index: ngModuleCall.getEnd() - 1,
                text: `{ ${property}: [${name}]}`,
            },
        ]);
        tree.write(modulePath, newContents);
    }
    else {
        if (!tsModule.isObjectLiteralExpression(ngModuleCall.arguments[0])) {
            throw new Error(`The NgModule options for ${ngModuleClassDeclaration.name.escapedText} in ${modulePath} is not an object literal`);
        }
        const ngModuleOptions = ngModuleCall
            .arguments[0];
        const typeProperty = findPropertyAssignment(ngModuleOptions, property);
        if (!typeProperty) {
            let text = `${property}: [${name}]`;
            if (ngModuleOptions.properties.hasTrailingComma) {
                text = `${text},`;
            }
            else if (ngModuleOptions.properties.length) {
                text = `, ${text}`;
            }
            const newContents = (0, devkit_1.applyChangesToString)(contents, [
                {
                    type: devkit_1.ChangeType.Insert,
                    index: ngModuleOptions.getEnd() - 1,
                    text,
                },
            ]);
            tree.write(modulePath, newContents);
        }
        else {
            if (!tsModule.isArrayLiteralExpression(typeProperty.initializer)) {
                throw new Error(`The NgModule ${property} for ${ngModuleClassDeclaration.name.escapedText} in ${modulePath} is not an array literal`);
            }
            let text;
            if (typeProperty.initializer.elements.hasTrailingComma) {
                text = `${name},`;
            }
            else if (typeProperty.initializer.elements.length) {
                text = `, ${name}`;
            }
            else {
                text = name;
            }
            const newContents = (0, devkit_1.applyChangesToString)(contents, [
                {
                    type: devkit_1.ChangeType.Insert,
                    index: typeProperty.initializer.getEnd() - 1,
                    text,
                },
            ]);
            tree.write(modulePath, newContents);
        }
    }
}
function insertNgModuleImport(tree, modulePath, importName) {
    insertNgModuleProperty(tree, modulePath, importName, 'imports');
}
function findImport(sourceFile, importPath) {
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    const importStatements = sourceFile.statements.filter(tsModule.isImportDeclaration);
    return importStatements.find((statement) => statement.moduleSpecifier
        .getText(sourceFile)
        .replace(/['"`]/g, '')
        .trim() === importPath);
}
function getNamedImport(coreImport, importName) {
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    if (!tsModule.isNamedImports(coreImport.importClause.namedBindings)) {
        throw new Error(`The import from ${coreImport.moduleSpecifier} does not have named imports.`);
    }
    return coreImport.importClause.namedBindings.elements.find((namedImport) => namedImport.propertyName
        ? tsModule.isIdentifier(namedImport.propertyName) &&
            namedImport.propertyName.escapedText === importName
        : tsModule.isIdentifier(namedImport.name) &&
            namedImport.name.escapedText === importName);
}
function findDecoratedClass(sourceFile, ngModuleName) {
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    const classDeclarations = sourceFile.statements.filter(tsModule.isClassDeclaration);
    const { getDecorators } = getTsEsLintTypeUtils();
    return classDeclarations.find((declaration) => {
        const decorators = getDecorators(declaration);
        if (decorators) {
            return decorators.some((decorator) => tsModule.isCallExpression(decorator.expression) &&
                tsModule.isIdentifier(decorator.expression.expression) &&
                decorator.expression.expression.escapedText === ngModuleName);
        }
        return undefined;
    });
}
function findPropertyAssignment(ngModuleOptions, propertyName) {
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    return ngModuleOptions.properties.find((property) => tsModule.isPropertyAssignment(property) &&
        tsModule.isIdentifier(property.name) &&
        property.name.escapedText === propertyName);
}
let tsUtils;
function getTsEsLintTypeUtils() {
    return tsUtils ?? require('@typescript-eslint/type-utils');
}
