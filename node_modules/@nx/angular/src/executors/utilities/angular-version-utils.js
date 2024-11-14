"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstalledAngularVersionInfo = getInstalledAngularVersionInfo;
exports.getInstalledPackageVersionInfo = getInstalledPackageVersionInfo;
const package_json_1 = require("nx/src/utils/package-json");
const semver_1 = require("semver");
function getInstalledAngularVersionInfo() {
    return getInstalledPackageVersionInfo('@angular/core');
}
function getInstalledPackageVersionInfo(pkgName) {
    try {
        const { packageJson: { version }, } = (0, package_json_1.readModulePackageJson)(pkgName);
        return { major: (0, semver_1.major)(version), version };
    }
    catch {
        return null;
    }
}
