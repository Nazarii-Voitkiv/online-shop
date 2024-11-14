"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileChangeRecorder = void 0;
const tslib_1 = require("tslib");
const magic_string_1 = tslib_1.__importDefault(require("magic-string"));
class FileChangeRecorder {
    get content() {
        return this.mutableContent.toString();
    }
    get originalContent() {
        return this.mutableContent.original;
    }
    constructor(tree, filePath) {
        this.tree = tree;
        this.filePath = filePath;
        this.setContentToFileContent();
    }
    applyChanges() {
        this.tree.write(this.filePath, this.mutableContent.toString());
    }
    hasChanged() {
        return this.mutableContent.hasChanged();
    }
    insertLeft(index, content) {
        this.mutableContent.appendLeft(index, content);
    }
    insertRight(index, content) {
        this.mutableContent.appendRight(index, content);
    }
    remove(index, end) {
        this.mutableContent.remove(index, end);
    }
    replace(node, content) {
        this.mutableContent.overwrite(node.getStart(), node.getEnd(), content);
    }
    setContentToFileContent() {
        this.mutableContent = new magic_string_1.default(this.tree.read(this.filePath, 'utf-8'));
    }
}
exports.FileChangeRecorder = FileChangeRecorder;
