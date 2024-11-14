import type { SourceFile } from 'typescript';
export declare function getModuleMetadataFromAST(componentAST: SourceFile, componentFileContents: string): {
    moduleNodes: any;
    exportsArray: string[];
    importsArray: string[];
    declarationsArray: string[];
    providersArray: string[];
    moduleName: any;
};
