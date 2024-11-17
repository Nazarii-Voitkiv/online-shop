"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installPackageJsonDependencies = void 0;
const tasks_1 = require("@angular-devkit/schematics/tasks");
function installPackageJsonDependencies() {
    return (host, context) => {
        context.logger.info(`🔍 Installing packages...`);
        context.addTask(new tasks_1.NodePackageInstallTask());
        context.logger.info(`✅️ Installed`);
        return host;
    };
}
exports.installPackageJsonDependencies = installPackageJsonDependencies;
//# sourceMappingURL=install-dependencies.js.map