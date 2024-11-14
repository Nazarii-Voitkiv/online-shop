"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFilesTask = formatFilesTask;
const child_process_1 = require("nx/src/utils/child-process");
function formatFilesTask(tree) {
    if (!tree
        .listChanges()
        .some((change) => change.type === 'CREATE' || change.type === 'UPDATE')) {
        return;
    }
    try {
        (0, child_process_1.runNxSync)(`format`, { cwd: tree.root, stdio: [0, 1, 2] });
    }
    catch { }
}
