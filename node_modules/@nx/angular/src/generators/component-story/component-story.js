"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentStoryGenerator = componentStoryGenerator;
const devkit_1 = require("@nx/devkit");
const storybook_inputs_1 = require("../utils/storybook-ast/storybook-inputs");
async function componentStoryGenerator(tree, options) {
    const { componentFileName, componentName, componentPath, projectPath } = options;
    const templatesDir = (0, devkit_1.joinPathFragments)(__dirname, 'files');
    const destinationDir = (0, devkit_1.joinPathFragments)(projectPath, componentPath);
    const storyFile = (0, devkit_1.joinPathFragments)(destinationDir, `${componentFileName}.stories.ts`);
    if (tree.exists(storyFile)) {
        return;
    }
    const props = (0, storybook_inputs_1.getComponentProps)(tree, (0, devkit_1.joinPathFragments)(destinationDir, `${componentFileName}.ts`));
    (0, devkit_1.generateFiles)(tree, templatesDir, destinationDir, {
        componentFileName: componentFileName,
        componentName: componentName,
        componentNameSimple: componentFileName.replace('.component', ''),
        interactionTests: options.interactionTests,
        props: props.filter((p) => typeof p.defaultValue !== 'undefined'),
        tmpl: '',
    });
    if (!options.skipFormat) {
        await (0, devkit_1.formatFiles)(tree);
    }
}
exports.default = componentStoryGenerator;
