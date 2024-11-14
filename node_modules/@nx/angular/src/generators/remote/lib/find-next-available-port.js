"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNextAvailablePort = findNextAvailablePort;
const devkit_1 = require("@nx/devkit");
const get_mf_projects_1 = require("../../../utils/get-mf-projects");
function findNextAvailablePort(tree) {
    const mfProjects = (0, get_mf_projects_1.getMFProjects)(tree);
    const ports = new Set([4200]);
    for (const mfProject of mfProjects) {
        const { targets } = (0, devkit_1.readProjectConfiguration)(tree, mfProject);
        const port = targets?.serve?.options?.port ?? 4200;
        ports.add(port);
    }
    const nextAvailablePort = Math.max(...ports) + 1;
    return nextAvailablePort;
}
