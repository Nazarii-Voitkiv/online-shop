import type { Tree } from '@nx/devkit';
import type { Node } from 'typescript';
export declare class FileChangeRecorder {
    private readonly tree;
    private readonly filePath;
    private mutableContent;
    get content(): string;
    get originalContent(): string;
    constructor(tree: Tree, filePath: string);
    applyChanges(): void;
    hasChanged(): boolean;
    insertLeft(index: number, content: string): void;
    insertRight(index: number, content: string): void;
    remove(index: number, end: number): void;
    replace(node: Node, content: string): void;
    setContentToFileContent(): void;
}
