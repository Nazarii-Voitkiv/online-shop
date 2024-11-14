import { Tree } from '@nx/devkit';
/**
 * Add a new route to a routes definition
 * @param tree Virtual Tree
 * @param routesFile File containing the routes definition
 * @param route Route to add
 * @param lazy If Route should be lazy-loaded
 * @param routesConst Used when eager-loading a route: Class name of the Component
 * @param importPath Used when eager-loading a route: The import path to the Component
 */
export declare function addRoute(tree: Tree, routesFile: string, route: string, lazy?: boolean, routesConst?: string, importPath?: string): void;
/**
 * Add a provider to a standalone routes definition
 * @param tree Virtual Tree
 * @param routesFile The file containing the routes definition
 * @param routeToAddProviderTo The route to add the provider to
 * @param providerToAdd The provider to add to the route
 */
export declare function addProviderToRoute(tree: Tree, routesFile: string, routeToAddProviderTo: string, providerToAdd: string): void;
