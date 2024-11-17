import { Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { OpenIdConfiguration } from '../openid-configuration';
export declare class OpenIdConfigLoader {
    loader?: Provider;
}
export declare abstract class StsConfigLoader {
    abstract loadConfigs(): Observable<OpenIdConfiguration[]>;
}
export declare class StsConfigStaticLoader implements StsConfigLoader {
    private readonly passedConfigs;
    constructor(passedConfigs: OpenIdConfiguration | OpenIdConfiguration[]);
    loadConfigs(): Observable<OpenIdConfiguration[]>;
}
export declare class StsConfigHttpLoader implements StsConfigLoader {
    private readonly configs$;
    constructor(configs$: Observable<OpenIdConfiguration> | Observable<OpenIdConfiguration>[] | Observable<OpenIdConfiguration[]>);
    loadConfigs(): Observable<OpenIdConfiguration[]>;
}
