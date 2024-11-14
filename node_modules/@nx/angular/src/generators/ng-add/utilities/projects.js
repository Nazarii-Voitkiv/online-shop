"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProjects = getAllProjects;
exports.convertToNxProject = convertToNxProject;
const devkit_1 = require("@nx/devkit");
const angular_json_1 = require("nx/src/adapter/angular-json");
function getAllProjects(tree) {
    const projects = (0, devkit_1.getProjects)(tree);
    const result = {
        apps: [],
        libs: [],
    };
    for (const [name, project] of projects) {
        const migrationProject = {
            config: project,
            name,
        };
        if (project.projectType === 'library') {
            result.libs.push(migrationProject);
        }
        else {
            result.apps.push(migrationProject);
        }
    }
    return result;
}
function convertToNxProject(tree, projectName) {
    const angularJson = (0, devkit_1.readJson)(tree, 'angular.json');
    const project = (0, angular_json_1.toNewFormat)(angularJson).projects[projectName];
    project.name = projectName;
    (0, devkit_1.addProjectConfiguration)(tree, projectName, project);
    delete angularJson.projects[projectName];
    (0, devkit_1.writeJson)(tree, 'angular.json', { ...angularJson, version: 1 });
}
