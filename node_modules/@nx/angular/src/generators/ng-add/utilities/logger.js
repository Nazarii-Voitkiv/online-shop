"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const devkit_1 = require("@nx/devkit");
class Logger {
    constructor(project) {
        this.project = project;
        this.message = (_, message) => `[${this.project}] ${message}`;
    }
    info(message) {
        devkit_1.logger.info(this.message `${message}`);
    }
    warn(message) {
        devkit_1.logger.warn(this.message `${message}`);
    }
    error(message) {
        devkit_1.logger.error(this.message `${message}`);
    }
}
exports.Logger = Logger;
