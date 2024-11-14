"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngAddGenerator = ngAddGenerator;
const migrate_from_angular_cli_1 = require("./migrate-from-angular-cli");
async function ngAddGenerator(tree, options) {
    return await (0, migrate_from_angular_cli_1.migrateFromAngularCli)(tree, options);
}
exports.default = ngAddGenerator;
