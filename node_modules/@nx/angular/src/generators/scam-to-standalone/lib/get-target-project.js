"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTargetProject = getTargetProject;
function getTargetProject(projectName, projects) {
    let project;
    if (projectName && !projects.has(projectName)) {
        throw new Error(`Project (${projectName}) does not exist in the workspace! Please provide a valid project name.`);
    }
    else if (projectName && projects.has(projectName)) {
        project = projects.get(projectName);
    }
    return project;
}
