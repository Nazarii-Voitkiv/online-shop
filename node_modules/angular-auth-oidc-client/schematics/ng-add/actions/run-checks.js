"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runChecks = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const angular_utils_1 = require("../../utils/angular-utils");
function runChecks() {
    return (host, context) => {
        const projectName = (0, angular_utils_1.getDefaultProjectName)(host);
        context.logger.info(`🔎 Running checks...`);
        if (!projectName) {
            const angularJsonContent = (0, angular_utils_1.getAngularJsonContent)(host);
            throw new schematics_1.SchematicsException(`Checks failed. Could not get project.
        No default project given in the workspace - ${JSON.stringify(angularJsonContent, null, 2)}`);
        }
        context.logger.info(`✅️ Project found, working with '${projectName}'`);
        return host;
    };
}
exports.runChecks = runChecks;
//# sourceMappingURL=run-checks.js.map