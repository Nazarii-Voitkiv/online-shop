import { ExposeOptions } from './ContainerEntryModule';
import type { containerPlugin } from '@module-federation/sdk';
declare const Dependency: typeof import("webpack").Dependency;
declare class ContainerEntryDependency extends Dependency {
    name: string;
    exposes: [string, ExposeOptions][];
    shareScope: string;
    injectRuntimeEntry: string;
    /** Additional experimental options for container plugin customization */
    experiments: containerPlugin.ContainerPluginOptions['experiments'];
    /**
     * @param {string} name entry name
     * @param {[string, ExposeOptions][]} exposes list of exposed modules
     * @param {string} shareScope name of the share scope
     * @param {string[]} injectRuntimeEntry the path of injectRuntime file.
     * @param {containerPlugin.ContainerPluginOptions['experiments']} experiments additional experiments options
     */
    constructor(name: string, exposes: [string, ExposeOptions][], shareScope: string, injectRuntimeEntry: string, experiments: containerPlugin.ContainerPluginOptions['experiments']);
    /**
     * @returns {string | null} an identifier to merge equal requests
     */
    getResourceIdentifier(): string | null;
    get type(): string;
    get category(): string;
}
export default ContainerEntryDependency;
