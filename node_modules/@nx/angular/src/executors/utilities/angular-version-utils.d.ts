export type VersionInfo = {
    major: number;
    version: string;
};
export declare function getInstalledAngularVersionInfo(): VersionInfo | null;
export declare function getInstalledPackageVersionInfo(pkgName: string): VersionInfo | null;
