export declare function mergeCustomWebpackConfig(baseWebpackConfig: any, pathToWebpackConfig: string, options: {
    tsConfig: string;
    [k: string]: any;
}, target: import('@angular-devkit/architect').Target): Promise<any>;
export declare function resolveCustomWebpackConfig(path: string, tsConfig: string): any;
export declare function resolveIndexHtmlTransformer(path: string, tsConfig: string, target: import('@angular-devkit/architect').Target): (indexHtml: any) => any;
