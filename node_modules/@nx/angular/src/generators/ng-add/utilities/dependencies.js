"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAngularDevKitPeerDependenciesAreInstalled = ensureAngularDevKitPeerDependenciesAreInstalled;
const devkit_1 = require("@nx/devkit");
const version_utils_1 = require("../../../utils/version-utils");
const version_utils_2 = require("../../utils/version-utils");
function ensureAngularDevKitPeerDependenciesAreInstalled(tree) {
    const packagesToInstall = [
        '@angular-devkit/core',
        '@angular-devkit/schematics',
        '@schematics/angular',
    ];
    const { devDependencies, dependencies } = (0, devkit_1.readJson)(tree, 'package.json');
    let angularCliVersion = devDependencies?.['@angular/cli'] ?? dependencies?.['@angular/cli'];
    if (!angularCliVersion) {
        const angularMajorVersion = (0, version_utils_2.getInstalledAngularMajorVersion)(tree);
        const angularDevkitVersion = (0, version_utils_1.getPkgVersionForAngularMajorVersion)('angularDevkitVersion', angularMajorVersion);
        angularCliVersion = angularDevkitVersion;
    }
    const filteredPackages = packagesToInstall
        .filter((pkg) => !devDependencies?.[pkg] && !dependencies?.[pkg])
        .reduce((allPkgs, pkg) => {
        allPkgs[pkg] = angularCliVersion;
        return allPkgs;
    }, {});
    (0, devkit_1.addDependenciesToPackageJson)(tree, {}, filteredPackages);
}
