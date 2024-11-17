import { OpenIdConfiguration } from '../../openid-configuration';
import { RuleValidationResult } from '../rule';
export declare const ensureSilentRenewUrlWhenNoRefreshTokenUsed: (passedConfig: OpenIdConfiguration) => RuleValidationResult;
