"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchBuilderContext = patchBuilderContext;
const executorToBuilderMap = new Map([
    [
        '@nx/angular:browser-esbuild',
        '@angular-devkit/build-angular:browser-esbuild',
    ],
    ['@nx/angular:application', '@angular-devkit/build-angular:application'],
]);
function patchBuilderContext(context, isUsingEsbuildBuilder, buildTarget) {
    const originalGetBuilderNameForTarget = context.getBuilderNameForTarget;
    context.getBuilderNameForTarget = async (target) => {
        const builderName = await originalGetBuilderNameForTarget(target);
        if (executorToBuilderMap.has(builderName)) {
            return executorToBuilderMap.get(builderName);
        }
        return builderName;
    };
    if (isUsingEsbuildBuilder) {
        const originalGetTargetOptions = context.getTargetOptions;
        context.getTargetOptions = async (target) => {
            const options = await originalGetTargetOptions(target);
            if (target.project === buildTarget.project &&
                target.target === buildTarget.target &&
                target.configuration === buildTarget.configuration) {
                cleanBuildTargetOptions(options);
            }
            return options;
        };
    }
}
function cleanBuildTargetOptions(options) {
    delete options.buildLibsFromSource;
    delete options.customWebpackConfig;
    delete options.indexHtmlTransformer;
    delete options.indexFileTransformer;
    delete options.plugins;
    return options;
}
