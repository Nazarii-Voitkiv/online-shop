"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTailwindRequiredPackages = addTailwindRequiredPackages;
const devkit_1 = require("@nx/devkit");
const version_utils_1 = require("../../utils/version-utils");
function addTailwindRequiredPackages(tree) {
    const pkgVersions = (0, version_utils_1.versions)(tree);
    return (0, devkit_1.addDependenciesToPackageJson)(tree, {}, {
        autoprefixer: pkgVersions.autoprefixerVersion,
        postcss: pkgVersions.postcssVersion,
        tailwindcss: pkgVersions.tailwindVersion,
    });
}
