"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webWorkerGenerator = webWorkerGenerator;
const devkit_1 = require("@nx/devkit");
const lib_1 = require("./lib");
const js_1 = require("@nx/js");
async function webWorkerGenerator(tree, rawOptions) {
    const options = (0, lib_1.normalizeOptions)(tree, rawOptions);
    const workerNames = (0, devkit_1.names)(options.name);
    const projectConfig = (0, devkit_1.readProjectConfiguration)(tree, options.project);
    const substitutions = {
        rootOffset: (0, devkit_1.offsetFromRoot)(projectConfig.root),
        rootTsConfig: (0, js_1.getRelativePathToRootTsConfig)(tree, projectConfig.root),
        name: workerNames.fileName,
        tpl: '',
    };
    (0, devkit_1.generateFiles)(tree, (0, devkit_1.joinPathFragments)(__dirname, './files/worker'), options.path, substitutions);
    (0, devkit_1.generateFiles)(tree, (0, devkit_1.joinPathFragments)(__dirname, './files/config'), projectConfig.root, substitutions);
    if (options.snippet) {
        (0, lib_1.addSnippet)(tree, workerNames.fileName, options.path);
    }
    projectConfig.targets['build'].options.webWorkerTsConfig ??=
        (0, devkit_1.joinPathFragments)(projectConfig.root, 'tsconfig.worker.json');
    if (projectConfig.targets['test']) {
        projectConfig.targets['test'].options.webWorkerTsConfig ??=
            (0, devkit_1.joinPathFragments)(projectConfig.root, 'tsconfig.worker.json');
    }
    (0, devkit_1.updateProjectConfiguration)(tree, options.project, projectConfig);
    if (!options.skipFormat) {
        await (0, devkit_1.formatFiles)(tree);
    }
}
exports.default = webWorkerGenerator;
