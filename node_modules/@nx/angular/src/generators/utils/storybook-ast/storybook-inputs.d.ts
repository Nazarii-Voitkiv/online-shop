import type { Tree } from '@nx/devkit';
import type { PropertyDeclaration } from 'typescript';
export type ArgType = 'text' | 'boolean' | 'number' | 'select';
export interface InputDescriptor {
    name: string;
    type: ArgType;
    defaultValue?: string;
}
export declare function getInputPropertyDeclarations(tree: Tree, path: string): PropertyDeclaration[];
export declare function getComponentProps(tree: Tree, componentPath: string, getArgsDefaultValueFn?: (property: PropertyDeclaration) => string | undefined, useDecoratorName?: boolean): InputDescriptor[];
export declare function getArgType(property: PropertyDeclaration): ArgType;
export declare function getArgsDefaultValue(property: PropertyDeclaration): string;
