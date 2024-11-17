import {
  Router
} from "./chunk-7VDYRVFC.js";
import "./chunk-3FC4Q4IP.js";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  provideHttpClient,
  withInterceptorsFromDi
} from "./chunk-ZCSU7L3E.js";
import {
  CommonModule,
  DOCUMENT,
  isPlatformBrowser
} from "./chunk-6FZTRR6V.js";
import {
  APP_INITIALIZER,
  DestroyRef,
  Injectable,
  InjectionToken,
  NgModule,
  NgZone,
  PLATFORM_ID,
  RendererFactory2,
  RuntimeError,
  assertInInjectionContext,
  assertNotInReactiveContext,
  computed,
  inject,
  isDevMode,
  makeEnvironmentProviders,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-AWFOP73G.js";
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  TimeoutError,
  catchError,
  concatMap,
  distinctUntilChanged,
  finalize,
  forkJoin,
  from,
  map,
  mergeMap,
  of,
  retry,
  retryWhen,
  switchMap,
  take,
  tap,
  throwError,
  timeout,
  timer
} from "./chunk-ZSY7TSMJ.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-BJWEDLTQ.js";

// node_modules/rfc4648/lib/rfc4648.js
function parse(string, encoding, opts) {
  var _opts$out;
  if (opts === void 0) {
    opts = {};
  }
  if (!encoding.codes) {
    encoding.codes = {};
    for (var i = 0; i < encoding.chars.length; ++i) {
      encoding.codes[encoding.chars[i]] = i;
    }
  }
  if (!opts.loose && string.length * encoding.bits & 7) {
    throw new SyntaxError("Invalid padding");
  }
  var end = string.length;
  while (string[end - 1] === "=") {
    --end;
    if (!opts.loose && !((string.length - end) * encoding.bits & 7)) {
      throw new SyntaxError("Invalid padding");
    }
  }
  var out = new ((_opts$out = opts.out) != null ? _opts$out : Uint8Array)(end * encoding.bits / 8 | 0);
  var bits = 0;
  var buffer = 0;
  var written = 0;
  for (var _i = 0; _i < end; ++_i) {
    var value = encoding.codes[string[_i]];
    if (value === void 0) {
      throw new SyntaxError("Invalid character " + string[_i]);
    }
    buffer = buffer << encoding.bits | value;
    bits += encoding.bits;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= encoding.bits || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
}
function stringify(data, encoding, opts) {
  if (opts === void 0) {
    opts = {};
  }
  var _opts = opts, _opts$pad = _opts.pad, pad = _opts$pad === void 0 ? true : _opts$pad;
  var mask = (1 << encoding.bits) - 1;
  var out = "";
  var bits = 0;
  var buffer = 0;
  for (var i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | 255 & data[i];
    bits += 8;
    while (bits > encoding.bits) {
      bits -= encoding.bits;
      out += encoding.chars[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += encoding.chars[mask & buffer << encoding.bits - bits];
  }
  if (pad) {
    while (out.length * encoding.bits & 7) {
      out += "=";
    }
  }
  return out;
}
var base64UrlEncoding = {
  chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bits: 6
};
var base64url = {
  parse: function parse$1(string, opts) {
    return parse(string, base64UrlEncoding, opts);
  },
  stringify: function stringify$1(data, opts) {
    return stringify(data, base64UrlEncoding, opts);
  }
};

// node_modules/@angular/core/fesm2022/rxjs-interop.mjs
function toSignal(source, options) {
  ngDevMode && assertNotInReactiveContext(toSignal, "Invoking `toSignal` causes new subscriptions every time. Consider moving `toSignal` outside of the reactive context and read the signal value where needed.");
  const requiresCleanup = !options?.manualCleanup;
  requiresCleanup && !options?.injector && assertInInjectionContext(toSignal);
  const cleanupRef = requiresCleanup ? options?.injector?.get(DestroyRef) ?? inject(DestroyRef) : null;
  const equal = makeToSignalEqual(options?.equal);
  let state;
  if (options?.requireSync) {
    state = signal({
      kind: 0
      /* StateKind.NoValue */
    }, {
      equal
    });
  } else {
    state = signal({
      kind: 1,
      value: options?.initialValue
    }, {
      equal
    });
  }
  const sub = source.subscribe({
    next: (value) => state.set({
      kind: 1,
      value
    }),
    error: (error) => {
      if (options?.rejectErrors) {
        throw error;
      }
      state.set({
        kind: 2,
        error
      });
    }
    // Completion of the Observable is meaningless to the signal. Signals don't have a concept of
    // "complete".
  });
  if (options?.requireSync && state().kind === 0) {
    throw new RuntimeError(601, (typeof ngDevMode === "undefined" || ngDevMode) && "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.");
  }
  cleanupRef?.onDestroy(sub.unsubscribe.bind(sub));
  return computed(() => {
    const current = state();
    switch (current.kind) {
      case 1:
        return current.value;
      case 2:
        throw current.error;
      case 0:
        throw new RuntimeError(601, (typeof ngDevMode === "undefined" || ngDevMode) && "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.");
    }
  }, {
    equal: options?.equal
  });
}
function makeToSignalEqual(userEquality = Object.is) {
  return (a, b) => a.kind === 1 && b.kind === 1 && userEquality(a.value, b.value);
}

// node_modules/angular-auth-oidc-client/fesm2022/angular-auth-oidc-client.mjs
var OpenIdConfigLoader = class {
};
var StsConfigLoader = class {
};
var StsConfigStaticLoader = class {
  constructor(passedConfigs) {
    this.passedConfigs = passedConfigs;
  }
  loadConfigs() {
    if (Array.isArray(this.passedConfigs)) {
      return of(this.passedConfigs);
    }
    return of([this.passedConfigs]);
  }
};
var StsConfigHttpLoader = class {
  constructor(configs$) {
    this.configs$ = configs$;
  }
  loadConfigs() {
    if (Array.isArray(this.configs$)) {
      return forkJoin(this.configs$);
    }
    const singleConfigOrArray = this.configs$;
    return singleConfigOrArray.pipe(map((value) => {
      if (Array.isArray(value)) {
        return value;
      }
      return [value];
    }));
  }
};
function createStaticLoader(passedConfig) {
  if (!passedConfig?.config) {
    throw new Error("No config provided!");
  }
  return new StsConfigStaticLoader(passedConfig.config);
}
var PASSED_CONFIG = new InjectionToken("PASSED_CONFIG");
var AbstractLoggerService = class _AbstractLoggerService {
  static {
    this.ɵfac = function AbstractLoggerService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AbstractLoggerService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _AbstractLoggerService,
      factory: _AbstractLoggerService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AbstractLoggerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ConsoleLoggerService = class _ConsoleLoggerService {
  logError(message, ...args) {
    console.error(message, ...args);
  }
  logWarning(message, ...args) {
    console.warn(message, ...args);
  }
  logDebug(message, ...args) {
    console.debug(message, ...args);
  }
  static {
    this.ɵfac = function ConsoleLoggerService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ConsoleLoggerService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ConsoleLoggerService,
      factory: _ConsoleLoggerService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConsoleLoggerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var LogLevel;
(function(LogLevel2) {
  LogLevel2[LogLevel2["None"] = 0] = "None";
  LogLevel2[LogLevel2["Debug"] = 1] = "Debug";
  LogLevel2[LogLevel2["Warn"] = 2] = "Warn";
  LogLevel2[LogLevel2["Error"] = 3] = "Error";
})(LogLevel || (LogLevel = {}));
var LoggerService = class _LoggerService {
  constructor() {
    this.abstractLoggerService = inject(AbstractLoggerService);
  }
  logError(configuration, message, ...args) {
    if (this.loggingIsTurnedOff(configuration)) {
      return;
    }
    const {
      configId
    } = configuration;
    const messageToLog = this.isObject(message) ? JSON.stringify(message) : message;
    if (!!args && !!args.length) {
      this.abstractLoggerService.logError(`[ERROR] ${configId} - ${messageToLog}`, ...args);
    } else {
      this.abstractLoggerService.logError(`[ERROR] ${configId} - ${messageToLog}`);
    }
  }
  logWarning(configuration, message, ...args) {
    if (!this.logLevelIsSet(configuration)) {
      return;
    }
    if (this.loggingIsTurnedOff(configuration)) {
      return;
    }
    if (!this.currentLogLevelIsEqualOrSmallerThan(configuration, LogLevel.Warn)) {
      return;
    }
    const {
      configId
    } = configuration;
    const messageToLog = this.isObject(message) ? JSON.stringify(message) : message;
    if (!!args && !!args.length) {
      this.abstractLoggerService.logWarning(`[WARN] ${configId} - ${messageToLog}`, ...args);
    } else {
      this.abstractLoggerService.logWarning(`[WARN] ${configId} - ${messageToLog}`);
    }
  }
  logDebug(configuration, message, ...args) {
    if (!configuration) {
      return;
    }
    if (!this.logLevelIsSet(configuration)) {
      return;
    }
    if (this.loggingIsTurnedOff(configuration)) {
      return;
    }
    if (!this.currentLogLevelIsEqualOrSmallerThan(configuration, LogLevel.Debug)) {
      return;
    }
    const {
      configId
    } = configuration;
    const messageToLog = this.isObject(message) ? JSON.stringify(message) : message;
    if (!!args && !!args.length) {
      this.abstractLoggerService.logDebug(`[DEBUG] ${configId} - ${messageToLog}`, ...args);
    } else {
      this.abstractLoggerService.logDebug(`[DEBUG] ${configId} - ${messageToLog}`);
    }
  }
  currentLogLevelIsEqualOrSmallerThan(configuration, logLevelToCompare) {
    const {
      logLevel
    } = configuration || {};
    if (!logLevel) {
      return false;
    }
    return logLevel <= logLevelToCompare;
  }
  logLevelIsSet(configuration) {
    const {
      logLevel
    } = configuration || {};
    if (logLevel === null) {
      return false;
    }
    return logLevel !== void 0;
  }
  loggingIsTurnedOff(configuration) {
    const {
      logLevel
    } = configuration || {};
    return logLevel === LogLevel.None;
  }
  isObject(possibleObject) {
    return Object.prototype.toString.call(possibleObject) === "[object Object]";
  }
  static {
    this.ɵfac = function LoggerService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LoggerService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _LoggerService,
      factory: _LoggerService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoggerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var EventTypes;
(function(EventTypes2) {
  EventTypes2[EventTypes2["ConfigLoaded"] = 0] = "ConfigLoaded";
  EventTypes2[EventTypes2["CheckingAuth"] = 1] = "CheckingAuth";
  EventTypes2[EventTypes2["CheckingAuthFinished"] = 2] = "CheckingAuthFinished";
  EventTypes2[EventTypes2["CheckingAuthFinishedWithError"] = 3] = "CheckingAuthFinishedWithError";
  EventTypes2[EventTypes2["ConfigLoadingFailed"] = 4] = "ConfigLoadingFailed";
  EventTypes2[EventTypes2["CheckSessionReceived"] = 5] = "CheckSessionReceived";
  EventTypes2[EventTypes2["UserDataChanged"] = 6] = "UserDataChanged";
  EventTypes2[EventTypes2["NewAuthenticationResult"] = 7] = "NewAuthenticationResult";
  EventTypes2[EventTypes2["TokenExpired"] = 8] = "TokenExpired";
  EventTypes2[EventTypes2["IdTokenExpired"] = 9] = "IdTokenExpired";
  EventTypes2[EventTypes2["SilentRenewStarted"] = 10] = "SilentRenewStarted";
  EventTypes2[EventTypes2["SilentRenewFailed"] = 11] = "SilentRenewFailed";
})(EventTypes || (EventTypes = {}));
var PublicEventsService = class _PublicEventsService {
  constructor() {
    this.notify = new ReplaySubject(1);
  }
  /**
   * Fires a new event.
   *
   * @param type The event type.
   * @param value The event value.
   */
  fireEvent(type, value) {
    this.notify.next({
      type,
      value
    });
  }
  /**
   * Wires up the event notification observable.
   */
  registerForEvents() {
    return this.notify.asObservable();
  }
  static {
    this.ɵfac = function PublicEventsService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PublicEventsService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _PublicEventsService,
      factory: _PublicEventsService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PublicEventsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var AbstractSecurityStorage = class _AbstractSecurityStorage {
  static {
    this.ɵfac = function AbstractSecurityStorage_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AbstractSecurityStorage)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _AbstractSecurityStorage,
      factory: _AbstractSecurityStorage.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AbstractSecurityStorage, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var BrowserStorageService = class _BrowserStorageService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.abstractSecurityStorage = inject(AbstractSecurityStorage);
  }
  read(key, configuration) {
    const {
      configId
    } = configuration;
    if (!configId) {
      this.loggerService.logDebug(configuration, `Wanted to read '${key}' but configId was '${configId}'`);
      return null;
    }
    if (!this.hasStorage()) {
      this.loggerService.logDebug(configuration, `Wanted to read '${key}' but Storage was undefined`);
      return null;
    }
    const storedConfig = this.abstractSecurityStorage.read(configId);
    if (!storedConfig) {
      return null;
    }
    return JSON.parse(storedConfig);
  }
  write(value, configuration) {
    const {
      configId
    } = configuration;
    if (!configId) {
      this.loggerService.logDebug(configuration, `Wanted to write but configId was '${configId}'`);
      return false;
    }
    if (!this.hasStorage()) {
      this.loggerService.logDebug(configuration, `Wanted to write but Storage was falsy`);
      return false;
    }
    value = value || null;
    this.abstractSecurityStorage.write(configId, JSON.stringify(value));
    return true;
  }
  remove(key, configuration) {
    if (!this.hasStorage()) {
      this.loggerService.logDebug(configuration, `Wanted to remove '${key}' but Storage was falsy`);
      return false;
    }
    this.abstractSecurityStorage.remove(key);
    return true;
  }
  // TODO THIS STORAGE WANTS AN ID BUT CLEARS EVERYTHING
  clear(configuration) {
    if (!this.hasStorage()) {
      this.loggerService.logDebug(configuration, `Wanted to clear storage but Storage was falsy`);
      return false;
    }
    this.abstractSecurityStorage.clear();
    return true;
  }
  hasStorage() {
    return typeof Storage !== "undefined";
  }
  static {
    this.ɵfac = function BrowserStorageService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BrowserStorageService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _BrowserStorageService,
      factory: _BrowserStorageService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrowserStorageService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var StoragePersistenceService = class _StoragePersistenceService {
  constructor() {
    this.browserStorageService = inject(BrowserStorageService);
  }
  read(key, config) {
    const storedConfig = this.browserStorageService.read(key, config) || {};
    return storedConfig[key];
  }
  write(key, value, config) {
    const storedConfig = this.browserStorageService.read(key, config) || {};
    storedConfig[key] = value;
    return this.browserStorageService.write(storedConfig, config);
  }
  remove(key, config) {
    const storedConfig = this.browserStorageService.read(key, config) || {};
    delete storedConfig[key];
    this.browserStorageService.write(storedConfig, config);
  }
  clear(config) {
    this.browserStorageService.clear(config);
  }
  resetStorageFlowData(config) {
    this.remove("session_state", config);
    this.remove("storageSilentRenewRunning", config);
    this.remove("storageCodeFlowInProgress", config);
    this.remove("codeVerifier", config);
    this.remove("userData", config);
    this.remove("storageCustomParamsAuthRequest", config);
    this.remove("access_token_expires_at", config);
    this.remove("storageCustomParamsRefresh", config);
    this.remove("storageCustomParamsEndSession", config);
    this.remove("reusable_refresh_token", config);
  }
  resetAuthStateInStorage(config) {
    this.remove("authzData", config);
    this.remove("reusable_refresh_token", config);
    this.remove("authnResult", config);
  }
  getAccessToken(config) {
    return this.read("authzData", config);
  }
  getIdToken(config) {
    return this.read("authnResult", config)?.id_token;
  }
  getRefreshToken(config) {
    const refreshToken = this.read("authnResult", config)?.refresh_token;
    if (!refreshToken && config.allowUnsafeReuseRefreshToken) {
      return this.read("reusable_refresh_token", config);
    }
    return refreshToken;
  }
  getAuthenticationResult(config) {
    return this.read("authnResult", config);
  }
  static {
    this.ɵfac = function StoragePersistenceService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _StoragePersistenceService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _StoragePersistenceService,
      factory: _StoragePersistenceService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StoragePersistenceService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var JwkExtractor = class _JwkExtractor {
  extractJwk(keys, spec, throwOnEmpty = true) {
    if (0 === keys.length) {
      throw JwkExtractorInvalidArgumentError;
    }
    const foundKeys = keys.filter((k) => spec?.kid ? k["kid"] === spec.kid : true).filter((k) => spec?.use ? k["use"] === spec.use : true).filter((k) => spec?.kty ? k["kty"] === spec.kty : true);
    if (foundKeys.length === 0 && throwOnEmpty) {
      throw JwkExtractorNoMatchingKeysError;
    }
    if (foundKeys.length > 1 && (null === spec || void 0 === spec)) {
      throw JwkExtractorSeveralMatchingKeysError;
    }
    return foundKeys;
  }
  static {
    this.ɵfac = function JwkExtractor_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _JwkExtractor)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _JwkExtractor,
      factory: _JwkExtractor.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JwkExtractor, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function buildErrorName(name) {
  return JwkExtractor.name + ": " + name;
}
var JwkExtractorInvalidArgumentError = {
  name: buildErrorName("InvalidArgumentError"),
  message: "Array of keys was empty. Unable to extract"
};
var JwkExtractorNoMatchingKeysError = {
  name: buildErrorName("NoMatchingKeysError"),
  message: "No key found matching the spec"
};
var JwkExtractorSeveralMatchingKeysError = {
  name: buildErrorName("SeveralMatchingKeysError"),
  message: "More than one key found. Please use spec to filter"
};
var PARTS_OF_TOKEN = 3;
var TokenHelperService = class _TokenHelperService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.document = inject(DOCUMENT);
  }
  getTokenExpirationDate(dataIdToken) {
    if (!Object.prototype.hasOwnProperty.call(dataIdToken, "exp")) {
      return new Date((/* @__PURE__ */ new Date()).toUTCString());
    }
    const date = /* @__PURE__ */ new Date(0);
    date.setUTCSeconds(dataIdToken.exp);
    return date;
  }
  getSigningInputFromToken(token, encoded, configuration) {
    if (!this.tokenIsValid(token, configuration)) {
      return "";
    }
    const header = this.getHeaderFromToken(token, encoded, configuration);
    const payload = this.getPayloadFromToken(token, encoded, configuration);
    return [header, payload].join(".");
  }
  getHeaderFromToken(token, encoded, configuration) {
    if (!this.tokenIsValid(token, configuration)) {
      return {};
    }
    return this.getPartOfToken(token, 0, encoded);
  }
  getPayloadFromToken(token, encoded, configuration) {
    if (!configuration) {
      return {};
    }
    if (!this.tokenIsValid(token, configuration)) {
      return {};
    }
    return this.getPartOfToken(token, 1, encoded);
  }
  getSignatureFromToken(token, encoded, configuration) {
    if (!this.tokenIsValid(token, configuration)) {
      return {};
    }
    return this.getPartOfToken(token, 2, encoded);
  }
  getPartOfToken(token, index, encoded) {
    const partOfToken = this.extractPartOfToken(token, index);
    if (encoded) {
      return partOfToken;
    }
    const result = this.urlBase64Decode(partOfToken);
    return JSON.parse(result);
  }
  urlBase64Decode(str) {
    let output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += "==";
        break;
      case 3:
        output += "=";
        break;
      default:
        throw Error("Illegal base64url string!");
    }
    const decoded = typeof this.document.defaultView !== "undefined" ? this.document.defaultView?.atob(output) : Buffer.from(output, "base64").toString("binary");
    if (!decoded) {
      return "";
    }
    try {
      return decodeURIComponent(decoded.split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
    } catch (err) {
      return decoded;
    }
  }
  tokenIsValid(token, configuration) {
    if (!token) {
      this.loggerService.logError(configuration, `token '${token}' is not valid --> token falsy`);
      return false;
    }
    if (!token.includes(".")) {
      this.loggerService.logError(configuration, `token '${token}' is not valid --> no dots included`);
      return false;
    }
    const parts = token.split(".");
    if (parts.length !== PARTS_OF_TOKEN) {
      this.loggerService.logError(configuration, `token '${token}' is not valid --> token has to have exactly ${PARTS_OF_TOKEN - 1} dots`);
      return false;
    }
    return true;
  }
  extractPartOfToken(token, index) {
    return token.split(".")[index];
  }
  static {
    this.ɵfac = function TokenHelperService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TokenHelperService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _TokenHelperService,
      factory: _TokenHelperService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TokenHelperService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var CryptoService = class _CryptoService {
  constructor() {
    this.document = inject(DOCUMENT);
  }
  getCrypto() {
    return this.document.defaultView?.crypto || this.document.defaultView?.msCrypto;
  }
  static {
    this.ɵfac = function CryptoService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CryptoService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _CryptoService,
      factory: _CryptoService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CryptoService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var JwkWindowCryptoService = class _JwkWindowCryptoService {
  constructor() {
    this.cryptoService = inject(CryptoService);
  }
  importVerificationKey(key, algorithm) {
    return this.cryptoService.getCrypto().subtle.importKey("jwk", key, algorithm, false, ["verify"]);
  }
  verifyKey(verifyAlgorithm, cryptoKey, signature, signingInput) {
    return this.cryptoService.getCrypto().subtle.verify(verifyAlgorithm, cryptoKey, signature, new TextEncoder().encode(signingInput));
  }
  static {
    this.ɵfac = function JwkWindowCryptoService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _JwkWindowCryptoService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _JwkWindowCryptoService,
      factory: _JwkWindowCryptoService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JwkWindowCryptoService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var JwtWindowCryptoService = class _JwtWindowCryptoService {
  constructor() {
    this.cryptoService = inject(CryptoService);
  }
  generateCodeChallenge(codeVerifier) {
    return this.calcHash(codeVerifier).pipe(map((challengeRaw) => this.base64UrlEncode(challengeRaw)));
  }
  generateAtHash(accessToken, algorithm) {
    return this.calcHash(accessToken, algorithm).pipe(map((tokenHash) => {
      const substr = tokenHash.substr(0, tokenHash.length / 2);
      const tokenHashBase64 = btoa(substr);
      return tokenHashBase64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }));
  }
  calcHash(valueToHash, algorithm = "SHA-256") {
    const msgBuffer = new TextEncoder().encode(valueToHash);
    return from(this.cryptoService.getCrypto().subtle.digest(algorithm, msgBuffer)).pipe(map((hashBuffer) => {
      const buffer = hashBuffer;
      const hashArray = Array.from(new Uint8Array(buffer));
      return this.toHashString(hashArray);
    }));
  }
  toHashString(byteArray) {
    let result = "";
    for (const e of byteArray) {
      result += String.fromCharCode(e);
    }
    return result;
  }
  base64UrlEncode(str) {
    const base64 = btoa(str);
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  }
  static {
    this.ɵfac = function JwtWindowCryptoService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _JwtWindowCryptoService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _JwtWindowCryptoService,
      factory: _JwtWindowCryptoService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JwtWindowCryptoService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function getVerifyAlg(alg) {
  switch (alg.charAt(0)) {
    case "R":
      return {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256"
      };
    case "E":
      if (alg.includes("256")) {
        return {
          name: "ECDSA",
          hash: "SHA-256"
        };
      } else if (alg.includes("384")) {
        return {
          name: "ECDSA",
          hash: "SHA-384"
        };
      } else {
        return null;
      }
    default:
      return null;
  }
}
function alg2kty(alg) {
  switch (alg.charAt(0)) {
    case "R":
      return "RSA";
    case "E":
      return "EC";
    default:
      throw new Error("Cannot infer kty from alg: " + alg);
  }
}
function getImportAlg(alg) {
  switch (alg.charAt(0)) {
    case "R":
      if (alg.includes("256")) {
        return {
          name: "RSASSA-PKCS1-v1_5",
          hash: "SHA-256"
        };
      } else if (alg.includes("384")) {
        return {
          name: "RSASSA-PKCS1-v1_5",
          hash: "SHA-384"
        };
      } else if (alg.includes("512")) {
        return {
          name: "RSASSA-PKCS1-v1_5",
          hash: "SHA-512"
        };
      } else {
        return null;
      }
    case "E":
      if (alg.includes("256")) {
        return {
          name: "ECDSA",
          namedCurve: "P-256"
        };
      } else if (alg.includes("384")) {
        return {
          name: "ECDSA",
          namedCurve: "P-384"
        };
      } else {
        return null;
      }
    default:
      return null;
  }
}
var TokenValidationService = class _TokenValidationService {
  constructor() {
    this.keyAlgorithms = ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "ES256", "ES384", "PS256", "PS384", "PS512"];
    this.tokenHelperService = inject(TokenHelperService);
    this.loggerService = inject(LoggerService);
    this.jwkExtractor = inject(JwkExtractor);
    this.jwkWindowCryptoService = inject(JwkWindowCryptoService);
    this.jwtWindowCryptoService = inject(JwtWindowCryptoService);
  }
  static {
    this.refreshTokenNoncePlaceholder = "--RefreshToken--";
  }
  // id_token C7: The current time MUST be before the time represented by the exp Claim
  // (possibly allowing for some small leeway to account for clock skew).
  hasIdTokenExpired(token, configuration, offsetSeconds) {
    const decoded = this.tokenHelperService.getPayloadFromToken(token, false, configuration);
    return !this.validateIdTokenExpNotExpired(decoded, configuration, offsetSeconds);
  }
  // id_token C7: The current time MUST be before the time represented by the exp Claim
  // (possibly allowing for some small leeway to account for clock skew).
  validateIdTokenExpNotExpired(decodedIdToken, configuration, offsetSeconds) {
    const tokenExpirationDate = this.tokenHelperService.getTokenExpirationDate(decodedIdToken);
    offsetSeconds = offsetSeconds || 0;
    if (!tokenExpirationDate) {
      return false;
    }
    const tokenExpirationValue = tokenExpirationDate.valueOf();
    const nowWithOffset = this.calculateNowWithOffset(offsetSeconds);
    const tokenNotExpired = tokenExpirationValue > nowWithOffset;
    this.loggerService.logDebug(configuration, `Has idToken expired: ${!tokenNotExpired} --> expires in ${this.millisToMinutesAndSeconds(tokenExpirationValue - nowWithOffset)} , ${new Date(tokenExpirationValue).toLocaleTimeString()} > ${new Date(nowWithOffset).toLocaleTimeString()}`);
    return tokenNotExpired;
  }
  validateAccessTokenNotExpired(accessTokenExpiresAt, configuration, offsetSeconds) {
    if (!accessTokenExpiresAt) {
      return true;
    }
    offsetSeconds = offsetSeconds || 0;
    const accessTokenExpirationValue = accessTokenExpiresAt.valueOf();
    const nowWithOffset = this.calculateNowWithOffset(offsetSeconds);
    const tokenNotExpired = accessTokenExpirationValue > nowWithOffset;
    this.loggerService.logDebug(configuration, `Has accessToken expired: ${!tokenNotExpired} --> expires in ${this.millisToMinutesAndSeconds(accessTokenExpirationValue - nowWithOffset)} , ${new Date(accessTokenExpirationValue).toLocaleTimeString()} > ${new Date(nowWithOffset).toLocaleTimeString()}`);
    return tokenNotExpired;
  }
  // iss
  // REQUIRED. Issuer Identifier for the Issuer of the response.The iss value is a case-sensitive URL using the
  // https scheme that contains scheme, host,
  // and optionally, port number and path components and no query or fragment components.
  //
  // sub
  // REQUIRED. Subject Identifier.Locally unique and never reassigned identifier within the Issuer for the End- User,
  // which is intended to be consumed by the Client, e.g., 24400320 or AItOawmwtWwcT0k51BayewNvutrJUqsvl6qs7A4.
  // It MUST NOT exceed 255 ASCII characters in length.The sub value is a case-sensitive string.
  //
  // aud
  // REQUIRED. Audience(s) that this ID Token is intended for. It MUST contain the OAuth 2.0 client_id of the Relying Party as an
  // audience value.
  // It MAY also contain identifiers for other audiences.In the general case, the aud value is an array of case-sensitive strings.
  // In the common special case when there is one audience, the aud value MAY be a single case-sensitive string.
  //
  // exp
  // REQUIRED. Expiration time on or after which the ID Token MUST NOT be accepted for processing.
  // The processing of this parameter requires that the current date/ time MUST be before the expiration date/ time listed in the value.
  // Implementers MAY provide for some small leeway, usually no more than a few minutes, to account for clock skew.
  // Its value is a JSON [RFC7159] number representing the number of seconds from 1970- 01 - 01T00: 00:00Z as measured in UTC until
  // the date/ time.
  // See RFC 3339 [RFC3339] for details regarding date/ times in general and UTC in particular.
  //
  // iat
  // REQUIRED. Time at which the JWT was issued. Its value is a JSON number representing the number of seconds from
  // 1970- 01 - 01T00: 00: 00Z as measured
  // in UTC until the date/ time.
  validateRequiredIdToken(dataIdToken, configuration) {
    let validated = true;
    if (!Object.prototype.hasOwnProperty.call(dataIdToken, "iss")) {
      validated = false;
      this.loggerService.logWarning(configuration, "iss is missing, this is required in the id_token");
    }
    if (!Object.prototype.hasOwnProperty.call(dataIdToken, "sub")) {
      validated = false;
      this.loggerService.logWarning(configuration, "sub is missing, this is required in the id_token");
    }
    if (!Object.prototype.hasOwnProperty.call(dataIdToken, "aud")) {
      validated = false;
      this.loggerService.logWarning(configuration, "aud is missing, this is required in the id_token");
    }
    if (!Object.prototype.hasOwnProperty.call(dataIdToken, "exp")) {
      validated = false;
      this.loggerService.logWarning(configuration, "exp is missing, this is required in the id_token");
    }
    if (!Object.prototype.hasOwnProperty.call(dataIdToken, "iat")) {
      validated = false;
      this.loggerService.logWarning(configuration, "iat is missing, this is required in the id_token");
    }
    return validated;
  }
  // id_token C8: The iat Claim can be used to reject tokens that were issued too far away from the current time,
  // limiting the amount of time that nonces need to be stored to prevent attacks.The acceptable range is Client specific.
  validateIdTokenIatMaxOffset(dataIdToken, maxOffsetAllowedInSeconds, disableIatOffsetValidation, configuration) {
    if (disableIatOffsetValidation) {
      return true;
    }
    if (!Object.prototype.hasOwnProperty.call(dataIdToken, "iat")) {
      return false;
    }
    const dateTimeIatIdToken = /* @__PURE__ */ new Date(0);
    dateTimeIatIdToken.setUTCSeconds(dataIdToken.iat);
    maxOffsetAllowedInSeconds = maxOffsetAllowedInSeconds || 0;
    const nowInUtc = new Date((/* @__PURE__ */ new Date()).toUTCString());
    const diff = nowInUtc.valueOf() - dateTimeIatIdToken.valueOf();
    const maxOffsetAllowedInMilliseconds = maxOffsetAllowedInSeconds * 1e3;
    this.loggerService.logDebug(configuration, `validate id token iat max offset ${diff} < ${maxOffsetAllowedInMilliseconds}`);
    if (diff > 0) {
      return diff < maxOffsetAllowedInMilliseconds;
    }
    return -diff < maxOffsetAllowedInMilliseconds;
  }
  // id_token C9: The value of the nonce Claim MUST be checked to verify that it is the same value as the one
  // that was sent in the Authentication Request.The Client SHOULD check the nonce value for replay attacks.
  // The precise method for detecting replay attacks is Client specific.
  // However the nonce claim SHOULD not be present for the refresh_token grant type
  // https://bitbucket.org/openid/connect/issues/1025/ambiguity-with-how-nonce-is-handled-on
  // The current spec is ambiguous and KeyCloak does send it.
  validateIdTokenNonce(dataIdToken, localNonce, ignoreNonceAfterRefresh, configuration) {
    const isFromRefreshToken = (dataIdToken.nonce === void 0 || ignoreNonceAfterRefresh) && localNonce === _TokenValidationService.refreshTokenNoncePlaceholder;
    if (!isFromRefreshToken && dataIdToken.nonce !== localNonce) {
      this.loggerService.logDebug(configuration, "Validate_id_token_nonce failed, dataIdToken.nonce: " + dataIdToken.nonce + " local_nonce:" + localNonce);
      return false;
    }
    return true;
  }
  // id_token C1: The Issuer Identifier for the OpenID Provider (which is typically obtained during Discovery)
  // MUST exactly match the value of the iss (issuer) Claim.
  validateIdTokenIss(dataIdToken, authWellKnownEndpointsIssuer, configuration) {
    if (dataIdToken.iss !== authWellKnownEndpointsIssuer) {
      this.loggerService.logDebug(configuration, "Validate_id_token_iss failed, dataIdToken.iss: " + dataIdToken.iss + " authWellKnownEndpoints issuer:" + authWellKnownEndpointsIssuer);
      return false;
    }
    return true;
  }
  // id_token C2: The Client MUST validate that the aud (audience) Claim contains its client_id value registered at the Issuer identified
  // by the iss (issuer) Claim as an audience.
  // The ID Token MUST be rejected if the ID Token does not list the Client as a valid audience, or if it contains additional audiences
  // not trusted by the Client.
  validateIdTokenAud(dataIdToken, aud, configuration) {
    if (Array.isArray(dataIdToken.aud)) {
      const result = dataIdToken.aud.includes(aud);
      if (!result) {
        this.loggerService.logDebug(configuration, "Validate_id_token_aud array failed, dataIdToken.aud: " + dataIdToken.aud + " client_id:" + aud);
        return false;
      }
      return true;
    } else if (dataIdToken.aud !== aud) {
      this.loggerService.logDebug(configuration, "Validate_id_token_aud failed, dataIdToken.aud: " + dataIdToken.aud + " client_id:" + aud);
      return false;
    }
    return true;
  }
  validateIdTokenAzpExistsIfMoreThanOneAud(dataIdToken) {
    if (!dataIdToken) {
      return false;
    }
    return !(Array.isArray(dataIdToken.aud) && dataIdToken.aud.length > 1 && !dataIdToken.azp);
  }
  // If an azp (authorized party) Claim is present, the Client SHOULD verify that its client_id is the Claim Value.
  validateIdTokenAzpValid(dataIdToken, clientId) {
    if (!dataIdToken?.azp) {
      return true;
    }
    return dataIdToken.azp === clientId;
  }
  validateStateFromHashCallback(state, localState, configuration) {
    if (state !== localState) {
      this.loggerService.logDebug(configuration, "ValidateStateFromHashCallback failed, state: " + state + " local_state:" + localState);
      return false;
    }
    return true;
  }
  // id_token C5: The Client MUST validate the signature of the ID Token according to JWS [JWS] using the algorithm specified in the alg
  // Header Parameter of the JOSE Header.The Client MUST use the keys provided by the Issuer.
  // id_token C6: The alg value SHOULD be RS256. Validation of tokens using other signing algorithms is described in the
  // OpenID Connect Core 1.0 [OpenID.Core] specification.
  validateSignatureIdToken(idToken, jwtkeys, configuration) {
    if (!idToken) {
      return of(true);
    }
    if (!jwtkeys || !jwtkeys.keys) {
      return of(false);
    }
    const headerData = this.tokenHelperService.getHeaderFromToken(idToken, false, configuration);
    if (Object.keys(headerData).length === 0 && headerData.constructor === Object) {
      this.loggerService.logWarning(configuration, "id token has no header data");
      return of(false);
    }
    const kid = headerData.kid;
    const alg = headerData.alg;
    const keys = jwtkeys.keys;
    let foundKeys;
    let key;
    if (!this.keyAlgorithms.includes(alg)) {
      this.loggerService.logWarning(configuration, "alg not supported", alg);
      return of(false);
    }
    const kty = alg2kty(alg);
    const use = "sig";
    try {
      foundKeys = kid ? this.jwkExtractor.extractJwk(keys, {
        kid,
        kty,
        use
      }, false) : this.jwkExtractor.extractJwk(keys, {
        kty,
        use
      }, false);
      if (foundKeys.length === 0) {
        foundKeys = kid ? this.jwkExtractor.extractJwk(keys, {
          kid,
          kty
        }) : this.jwkExtractor.extractJwk(keys, {
          kty
        });
      }
      key = foundKeys[0];
    } catch (e) {
      this.loggerService.logError(configuration, e);
      return of(false);
    }
    const algorithm = getImportAlg(alg);
    const signingInput = this.tokenHelperService.getSigningInputFromToken(idToken, true, configuration);
    const rawSignature = this.tokenHelperService.getSignatureFromToken(idToken, true, configuration);
    return from(this.jwkWindowCryptoService.importVerificationKey(key, algorithm)).pipe(mergeMap((cryptoKey) => {
      const signature = base64url.parse(rawSignature, {
        loose: true
      });
      const verifyAlgorithm = getVerifyAlg(alg);
      return from(this.jwkWindowCryptoService.verifyKey(verifyAlgorithm, cryptoKey, signature, signingInput));
    }), tap((isValid) => {
      if (!isValid) {
        this.loggerService.logWarning(configuration, "incorrect Signature, validation failed for id_token");
      }
    }));
  }
  // Accepts ID Token without 'kid' claim in JOSE header if only one JWK supplied in 'jwks_url'
  //// private validate_no_kid_in_header_only_one_allowed_in_jwtkeys(header_data: any, jwtkeys: any): boolean {
  ////    this.oidcSecurityCommon.logDebug('amount of jwtkeys.keys: ' + jwtkeys.keys.length);
  ////    if (!header_data.hasOwnProperty('kid')) {
  ////        // no kid defined in Jose header
  ////        if (jwtkeys.keys.length != 1) {
  ////            this.oidcSecurityCommon.logDebug('jwtkeys.keys.length != 1 and no kid in header');
  ////            return false;
  ////        }
  ////    }
  ////    return true;
  //// }
  // Access Token Validation
  // access_token C1: Hash the octets of the ASCII representation of the access_token with the hash algorithm specified in JWA[JWA]
  // for the alg Header Parameter of the ID Token's JOSE Header. For instance, if the alg is RS256, the hash algorithm used is SHA-256.
  // access_token C2: Take the left- most half of the hash and base64url- encode it.
  // access_token C3: The value of at_hash in the ID Token MUST match the value produced in the previous step if at_hash
  // is present in the ID Token.
  validateIdTokenAtHash(accessToken, atHash, idTokenAlg, configuration) {
    this.loggerService.logDebug(configuration, "at_hash from the server:" + atHash);
    let sha = "SHA-256";
    if (idTokenAlg.includes("384")) {
      sha = "SHA-384";
    } else if (idTokenAlg.includes("512")) {
      sha = "SHA-512";
    }
    return this.jwtWindowCryptoService.generateAtHash("" + accessToken, sha).pipe(mergeMap((hash) => {
      this.loggerService.logDebug(configuration, "at_hash client validation not decoded:" + hash);
      if (hash === atHash) {
        return of(true);
      } else {
        return this.jwtWindowCryptoService.generateAtHash("" + decodeURIComponent(accessToken), sha).pipe(map((newHash) => {
          this.loggerService.logDebug(configuration, "-gen access--" + hash);
          return newHash === atHash;
        }));
      }
    }));
  }
  millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 6e4);
    const seconds = (millis % 6e4 / 1e3).toFixed(0);
    return minutes + ":" + (+seconds < 10 ? "0" : "") + seconds;
  }
  calculateNowWithOffset(offsetSeconds) {
    return new Date((/* @__PURE__ */ new Date()).toUTCString()).valueOf() + offsetSeconds * 1e3;
  }
  static {
    this.ɵfac = function TokenValidationService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TokenValidationService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _TokenValidationService,
      factory: _TokenValidationService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TokenValidationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var DEFAULT_AUTHRESULT = {
  isAuthenticated: false,
  allConfigsAuthenticated: []
};
var AuthStateService = class _AuthStateService {
  constructor() {
    this.storagePersistenceService = inject(StoragePersistenceService);
    this.loggerService = inject(LoggerService);
    this.publicEventsService = inject(PublicEventsService);
    this.tokenValidationService = inject(TokenValidationService);
    this.authenticatedInternal$ = new BehaviorSubject(DEFAULT_AUTHRESULT);
  }
  get authenticated$() {
    return this.authenticatedInternal$.asObservable().pipe(distinctUntilChanged());
  }
  setAuthenticatedAndFireEvent(allConfigs) {
    const result = this.composeAuthenticatedResult(allConfigs);
    this.authenticatedInternal$.next(result);
  }
  setUnauthenticatedAndFireEvent(currentConfig, allConfigs) {
    this.storagePersistenceService.resetAuthStateInStorage(currentConfig);
    const result = this.composeUnAuthenticatedResult(allConfigs);
    this.authenticatedInternal$.next(result);
  }
  updateAndPublishAuthState(authenticationResult) {
    this.publicEventsService.fireEvent(EventTypes.NewAuthenticationResult, authenticationResult);
  }
  setAuthorizationData(accessToken, authResult, currentConfig, allConfigs) {
    this.loggerService.logDebug(currentConfig, `storing the accessToken '${accessToken}'`);
    this.storagePersistenceService.write("authzData", accessToken, currentConfig);
    this.persistAccessTokenExpirationTime(authResult, currentConfig);
    this.setAuthenticatedAndFireEvent(allConfigs);
  }
  getAccessToken(configuration) {
    if (!configuration) {
      return "";
    }
    if (!this.isAuthenticated(configuration)) {
      return "";
    }
    const token = this.storagePersistenceService.getAccessToken(configuration);
    return this.decodeURIComponentSafely(token);
  }
  getIdToken(configuration) {
    if (!configuration) {
      return "";
    }
    if (!this.isAuthenticated(configuration)) {
      return "";
    }
    const token = this.storagePersistenceService.getIdToken(configuration);
    return this.decodeURIComponentSafely(token);
  }
  getRefreshToken(configuration) {
    if (!configuration) {
      return "";
    }
    if (!this.isAuthenticated(configuration)) {
      return "";
    }
    const token = this.storagePersistenceService.getRefreshToken(configuration);
    return this.decodeURIComponentSafely(token);
  }
  getAuthenticationResult(configuration) {
    if (!configuration) {
      return null;
    }
    if (!this.isAuthenticated(configuration)) {
      return null;
    }
    return this.storagePersistenceService.getAuthenticationResult(configuration);
  }
  areAuthStorageTokensValid(configuration) {
    if (!configuration) {
      return false;
    }
    if (!this.isAuthenticated(configuration)) {
      return false;
    }
    if (this.hasIdTokenExpiredAndRenewCheckIsEnabled(configuration)) {
      this.loggerService.logDebug(configuration, "persisted idToken is expired");
      return false;
    }
    if (this.hasAccessTokenExpiredIfExpiryExists(configuration)) {
      this.loggerService.logDebug(configuration, "persisted accessToken is expired");
      return false;
    }
    this.loggerService.logDebug(configuration, "persisted idToken and accessToken are valid");
    return true;
  }
  hasIdTokenExpiredAndRenewCheckIsEnabled(configuration) {
    const {
      renewTimeBeforeTokenExpiresInSeconds,
      triggerRefreshWhenIdTokenExpired,
      disableIdTokenValidation
    } = configuration;
    if (!triggerRefreshWhenIdTokenExpired || disableIdTokenValidation) {
      return false;
    }
    const tokenToCheck = this.storagePersistenceService.getIdToken(configuration);
    const idTokenExpired = this.tokenValidationService.hasIdTokenExpired(tokenToCheck, configuration, renewTimeBeforeTokenExpiresInSeconds);
    if (idTokenExpired) {
      this.publicEventsService.fireEvent(EventTypes.IdTokenExpired, idTokenExpired);
    }
    return idTokenExpired;
  }
  hasAccessTokenExpiredIfExpiryExists(configuration) {
    const {
      renewTimeBeforeTokenExpiresInSeconds
    } = configuration;
    const accessTokenExpiresIn = this.storagePersistenceService.read("access_token_expires_at", configuration);
    const accessTokenHasNotExpired = this.tokenValidationService.validateAccessTokenNotExpired(accessTokenExpiresIn, configuration, renewTimeBeforeTokenExpiresInSeconds);
    const hasExpired = !accessTokenHasNotExpired;
    if (hasExpired) {
      this.publicEventsService.fireEvent(EventTypes.TokenExpired, hasExpired);
    }
    return hasExpired;
  }
  isAuthenticated(configuration) {
    if (!configuration) {
      throwError(() => new Error("Please provide a configuration before setting up the module"));
      return false;
    }
    const hasAccessToken = !!this.storagePersistenceService.getAccessToken(configuration);
    const hasIdToken = !!this.storagePersistenceService.getIdToken(configuration);
    return hasAccessToken && hasIdToken;
  }
  decodeURIComponentSafely(token) {
    if (token) {
      return decodeURIComponent(token);
    } else {
      return "";
    }
  }
  persistAccessTokenExpirationTime(authResult, configuration) {
    if (authResult?.expires_in) {
      const accessTokenExpiryTime = new Date((/* @__PURE__ */ new Date()).toUTCString()).valueOf() + authResult.expires_in * 1e3;
      this.storagePersistenceService.write("access_token_expires_at", accessTokenExpiryTime, configuration);
    }
  }
  composeAuthenticatedResult(allConfigs) {
    if (allConfigs.length === 1) {
      const {
        configId
      } = allConfigs[0];
      return {
        isAuthenticated: true,
        allConfigsAuthenticated: [{
          configId: configId ?? "",
          isAuthenticated: true
        }]
      };
    }
    return this.checkAllConfigsIfTheyAreAuthenticated(allConfigs);
  }
  composeUnAuthenticatedResult(allConfigs) {
    if (allConfigs.length === 1) {
      const {
        configId
      } = allConfigs[0];
      return {
        isAuthenticated: false,
        allConfigsAuthenticated: [{
          configId: configId ?? "",
          isAuthenticated: false
        }]
      };
    }
    return this.checkAllConfigsIfTheyAreAuthenticated(allConfigs);
  }
  checkAllConfigsIfTheyAreAuthenticated(allConfigs) {
    const allConfigsAuthenticated = allConfigs.map((config) => ({
      configId: config.configId ?? "",
      isAuthenticated: this.isAuthenticated(config)
    }));
    const isAuthenticated = allConfigsAuthenticated.every((x) => !!x.isAuthenticated);
    return {
      allConfigsAuthenticated,
      isAuthenticated
    };
  }
  static {
    this.ɵfac = function AuthStateService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthStateService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _AuthStateService,
      factory: _AuthStateService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthStateService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var STORAGE_KEY = "redirect";
var AutoLoginService = class _AutoLoginService {
  constructor() {
    this.storageService = inject(StoragePersistenceService);
    this.router = inject(Router);
  }
  checkSavedRedirectRouteAndNavigate(config) {
    if (!config) {
      return;
    }
    const savedRouteForRedirect = this.getStoredRedirectRoute(config);
    if (savedRouteForRedirect != null) {
      this.deleteStoredRedirectRoute(config);
      this.router.navigateByUrl(savedRouteForRedirect);
    }
  }
  /**
   * Saves the redirect URL to storage.
   *
   * @param config The OpenId configuration.
   * @param url The redirect URL to save.
   */
  saveRedirectRoute(config, url) {
    if (!config) {
      return;
    }
    this.storageService.write(STORAGE_KEY, url, config);
  }
  /**
   * Gets the stored redirect URL from storage.
   */
  getStoredRedirectRoute(config) {
    return this.storageService.read(STORAGE_KEY, config);
  }
  /**
   * Removes the redirect URL from storage.
   */
  deleteStoredRedirectRoute(config) {
    this.storageService.remove(STORAGE_KEY, config);
  }
  static {
    this.ɵfac = function AutoLoginService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AutoLoginService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _AutoLoginService,
      factory: _AutoLoginService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutoLoginService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var FlowHelper = class _FlowHelper {
  isCurrentFlowCodeFlow(configuration) {
    return this.currentFlowIs("code", configuration);
  }
  isCurrentFlowAnyImplicitFlow(configuration) {
    return this.isCurrentFlowImplicitFlowWithAccessToken(configuration) || this.isCurrentFlowImplicitFlowWithoutAccessToken(configuration);
  }
  isCurrentFlowCodeFlowWithRefreshTokens(configuration) {
    if (!configuration) {
      return false;
    }
    const {
      useRefreshToken
    } = configuration;
    return this.isCurrentFlowCodeFlow(configuration) && Boolean(useRefreshToken);
  }
  isCurrentFlowImplicitFlowWithAccessToken(configuration) {
    return this.currentFlowIs("id_token token", configuration);
  }
  currentFlowIs(flowTypes, configuration) {
    const {
      responseType
    } = configuration;
    if (Array.isArray(flowTypes)) {
      return flowTypes.some((x) => responseType === x);
    }
    return responseType === flowTypes;
  }
  isCurrentFlowImplicitFlowWithoutAccessToken(configuration) {
    return this.currentFlowIs("id_token", configuration);
  }
  static {
    this.ɵfac = function FlowHelper_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FlowHelper)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _FlowHelper,
      factory: _FlowHelper.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlowHelper, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var RandomService = class _RandomService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.cryptoService = inject(CryptoService);
  }
  createRandom(requiredLength, configuration) {
    if (requiredLength <= 0) {
      return "";
    }
    if (requiredLength > 0 && requiredLength < 7) {
      this.loggerService.logWarning(configuration, `RandomService called with ${requiredLength} but 7 chars is the minimum, returning 10 chars`);
      requiredLength = 10;
    }
    const length = requiredLength - 6;
    const arr = new Uint8Array(Math.floor(length / 2));
    const crypto = this.cryptoService.getCrypto();
    if (crypto) {
      crypto.getRandomValues(arr);
    }
    return Array.from(arr, this.toHex).join("") + this.randomString(7);
  }
  toHex(dec) {
    return ("0" + dec.toString(16)).substr(-2);
  }
  randomString(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = new Uint32Array(length);
    const crypto = this.cryptoService.getCrypto();
    if (crypto) {
      crypto.getRandomValues(values);
      for (let i = 0; i < length; i++) {
        result += characters[values[i] % characters.length];
      }
    }
    return result;
  }
  static {
    this.ɵfac = function RandomService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RandomService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _RandomService,
      factory: _RandomService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RandomService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var FlowsDataService = class _FlowsDataService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.storagePersistenceService = inject(StoragePersistenceService);
    this.randomService = inject(RandomService);
  }
  createNonce(configuration) {
    const nonce = this.randomService.createRandom(40, configuration);
    this.loggerService.logDebug(configuration, "Nonce created. nonce:" + nonce);
    this.setNonce(nonce, configuration);
    return nonce;
  }
  setNonce(nonce, configuration) {
    this.storagePersistenceService.write("authNonce", nonce, configuration);
  }
  getAuthStateControl(configuration) {
    if (!configuration) {
      return "";
    }
    return this.storagePersistenceService.read("authStateControl", configuration);
  }
  setAuthStateControl(authStateControl, configuration) {
    if (!configuration) {
      return false;
    }
    return this.storagePersistenceService.write("authStateControl", authStateControl, configuration);
  }
  getExistingOrCreateAuthStateControl(configuration) {
    let state = this.storagePersistenceService.read("authStateControl", configuration);
    if (!state) {
      state = this.randomService.createRandom(40, configuration);
      this.storagePersistenceService.write("authStateControl", state, configuration);
    }
    return state;
  }
  setSessionState(sessionState, configuration) {
    this.storagePersistenceService.write("session_state", sessionState, configuration);
  }
  resetStorageFlowData(configuration) {
    this.storagePersistenceService.resetStorageFlowData(configuration);
  }
  getCodeVerifier(configuration) {
    return this.storagePersistenceService.read("codeVerifier", configuration);
  }
  createCodeVerifier(configuration) {
    const codeVerifier = this.randomService.createRandom(67, configuration);
    this.storagePersistenceService.write("codeVerifier", codeVerifier, configuration);
    return codeVerifier;
  }
  isCodeFlowInProgress(configuration) {
    return !!this.storagePersistenceService.read("storageCodeFlowInProgress", configuration);
  }
  setCodeFlowInProgress(configuration) {
    this.storagePersistenceService.write("storageCodeFlowInProgress", true, configuration);
  }
  resetCodeFlowInProgress(configuration) {
    this.storagePersistenceService.write("storageCodeFlowInProgress", false, configuration);
  }
  isSilentRenewRunning(configuration) {
    const {
      configId,
      silentRenewTimeoutInSeconds
    } = configuration;
    const storageObject = this.getSilentRenewRunningStorageEntry(configuration);
    if (!storageObject) {
      return false;
    }
    if (storageObject.state === "not-running") {
      return false;
    }
    const timeOutInMilliseconds = (silentRenewTimeoutInSeconds ?? 0) * 1e3;
    const dateOfLaunchedProcessUtc = Date.parse(storageObject.dateOfLaunchedProcessUtc);
    const currentDateUtc = Date.parse((/* @__PURE__ */ new Date()).toISOString());
    const elapsedTimeInMilliseconds = Math.abs(currentDateUtc - dateOfLaunchedProcessUtc);
    const isProbablyStuck = elapsedTimeInMilliseconds > timeOutInMilliseconds;
    if (isProbablyStuck) {
      this.loggerService.logDebug(configuration, "silent renew process is probably stuck, state will be reset.", configId);
      this.resetSilentRenewRunning(configuration);
      return false;
    }
    return storageObject.state === "running";
  }
  setSilentRenewRunning(configuration) {
    const storageObject = {
      state: "running",
      dateOfLaunchedProcessUtc: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.storagePersistenceService.write("storageSilentRenewRunning", JSON.stringify(storageObject), configuration);
  }
  resetSilentRenewRunning(configuration) {
    if (!configuration) {
      return;
    }
    this.storagePersistenceService.write("storageSilentRenewRunning", "", configuration);
  }
  getSilentRenewRunningStorageEntry(configuration) {
    const storageEntry = this.storagePersistenceService.read("storageSilentRenewRunning", configuration);
    if (!storageEntry) {
      return {
        dateOfLaunchedProcessUtc: "",
        state: "not-running"
      };
    }
    return JSON.parse(storageEntry);
  }
  static {
    this.ɵfac = function FlowsDataService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FlowsDataService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _FlowsDataService,
      factory: _FlowsDataService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlowsDataService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var UriEncoder = class {
  encodeKey(key) {
    return encodeURIComponent(key);
  }
  encodeValue(value) {
    return encodeURIComponent(value);
  }
  decodeKey(key) {
    return decodeURIComponent(key);
  }
  decodeValue(value) {
    return decodeURIComponent(value);
  }
};
var CALLBACK_PARAMS_TO_CHECK = ["code", "state", "token", "id_token"];
var AUTH0_ENDPOINT = "auth0.com";
var UrlService = class _UrlService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.flowsDataService = inject(FlowsDataService);
    this.flowHelper = inject(FlowHelper);
    this.storagePersistenceService = inject(StoragePersistenceService);
    this.jwtWindowCryptoService = inject(JwtWindowCryptoService);
  }
  getUrlParameter(urlToCheck, name) {
    if (!urlToCheck) {
      return "";
    }
    if (!name) {
      return "";
    }
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&#]" + name + "=([^&#]*)");
    const results = regex.exec(urlToCheck);
    return results === null ? "" : decodeURIComponent(results[1]);
  }
  getUrlWithoutQueryParameters(url) {
    const u = new URL(url.toString());
    const keys = [];
    for (const key of u.searchParams.keys()) {
      keys.push(key);
    }
    keys.forEach((key) => {
      u.searchParams.delete(key);
    });
    return u;
  }
  queryParametersExist(expected, actual) {
    let r = true;
    expected.forEach((v, k) => {
      if (!actual.has(k)) {
        r = false;
      }
    });
    return r;
  }
  isCallbackFromSts(currentUrl, config) {
    if (config && config.checkRedirectUrlWhenCheckingIfIsCallback) {
      const currentUrlInstance = new URL(currentUrl);
      const redirectUrl = this.getRedirectUrl(config);
      if (!redirectUrl) {
        this.loggerService.logError(config, `UrlService.isCallbackFromSts: could not get redirectUrl from config, was: `, redirectUrl);
        return false;
      }
      const redirectUriUrlInstance = new URL(redirectUrl);
      const redirectUriWithoutQueryParams = this.getUrlWithoutQueryParameters(redirectUriUrlInstance).toString();
      const currentUrlWithoutQueryParams = this.getUrlWithoutQueryParameters(currentUrlInstance).toString();
      const redirectUriQueryParamsArePresentInCurrentUrl = this.queryParametersExist(redirectUriUrlInstance.searchParams, currentUrlInstance.searchParams);
      if (redirectUriWithoutQueryParams !== currentUrlWithoutQueryParams || !redirectUriQueryParamsArePresentInCurrentUrl) {
        return false;
      }
    }
    return CALLBACK_PARAMS_TO_CHECK.some((x) => !!this.getUrlParameter(currentUrl, x));
  }
  getRefreshSessionSilentRenewUrl(config, customParams) {
    if (this.flowHelper.isCurrentFlowCodeFlow(config)) {
      return this.createUrlCodeFlowWithSilentRenew(config, customParams);
    }
    return of(this.createUrlImplicitFlowWithSilentRenew(config, customParams));
  }
  getAuthorizeParUrl(requestUri, configuration) {
    const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
    if (!authWellKnownEndPoints) {
      this.loggerService.logError(configuration, "authWellKnownEndpoints is undefined");
      return null;
    }
    const authorizationEndpoint = authWellKnownEndPoints.authorizationEndpoint;
    if (!authorizationEndpoint) {
      this.loggerService.logError(configuration, `Can not create an authorize URL when authorizationEndpoint is '${authorizationEndpoint}'`);
      return null;
    }
    const {
      clientId
    } = configuration;
    if (!clientId) {
      this.loggerService.logError(configuration, `getAuthorizeParUrl could not add clientId because it was: `, clientId);
      return null;
    }
    const urlParts = authorizationEndpoint.split("?");
    const authorizationUrl = urlParts[0];
    const existingParams = urlParts[1];
    let params = this.createHttpParams(existingParams);
    params = params.set("request_uri", requestUri);
    params = params.append("client_id", clientId);
    return `${authorizationUrl}?${params}`;
  }
  getAuthorizeUrl(config, authOptions) {
    if (!config) {
      return of(null);
    }
    if (this.flowHelper.isCurrentFlowCodeFlow(config)) {
      return this.createUrlCodeFlowAuthorize(config, authOptions);
    }
    return of(this.createUrlImplicitFlowAuthorize(config, authOptions) || "");
  }
  getEndSessionEndpoint(configuration) {
    const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
    const endSessionEndpoint = authWellKnownEndPoints?.endSessionEndpoint;
    if (!endSessionEndpoint) {
      return {
        url: "",
        existingParams: ""
      };
    }
    const urlParts = endSessionEndpoint.split("?");
    const url = urlParts[0];
    const existingParams = urlParts[1] ?? "";
    return {
      url,
      existingParams
    };
  }
  getEndSessionUrl(configuration, customParams) {
    if (!configuration) {
      return null;
    }
    const idToken = this.storagePersistenceService.getIdToken(configuration);
    const {
      customParamsEndSessionRequest
    } = configuration;
    const mergedParams = __spreadValues(__spreadValues({}, customParamsEndSessionRequest), customParams);
    return this.createEndSessionUrl(idToken, configuration, mergedParams);
  }
  createRevocationEndpointBodyAccessToken(token, configuration) {
    const clientId = this.getClientId(configuration);
    if (!clientId) {
      return null;
    }
    let params = this.createHttpParams();
    params = params.set("client_id", clientId);
    params = params.set("token", token);
    params = params.set("token_type_hint", "access_token");
    return params.toString();
  }
  createRevocationEndpointBodyRefreshToken(token, configuration) {
    const clientId = this.getClientId(configuration);
    if (!clientId) {
      return null;
    }
    let params = this.createHttpParams();
    params = params.set("client_id", clientId);
    params = params.set("token", token);
    params = params.set("token_type_hint", "refresh_token");
    return params.toString();
  }
  getRevocationEndpointUrl(configuration) {
    const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
    const revocationEndpoint = authWellKnownEndPoints?.revocationEndpoint;
    if (!revocationEndpoint) {
      return null;
    }
    const urlParts = revocationEndpoint.split("?");
    return urlParts[0];
  }
  createBodyForCodeFlowCodeRequest(code, configuration, customTokenParams) {
    const clientId = this.getClientId(configuration);
    if (!clientId) {
      return null;
    }
    let params = this.createHttpParams();
    params = params.set("grant_type", "authorization_code");
    params = params.set("client_id", clientId);
    if (!configuration.disablePkce) {
      const codeVerifier = this.flowsDataService.getCodeVerifier(configuration);
      if (!codeVerifier) {
        this.loggerService.logError(configuration, `CodeVerifier is not set `, codeVerifier);
        return null;
      }
      params = params.set("code_verifier", codeVerifier);
    }
    params = params.set("code", code);
    if (customTokenParams) {
      params = this.appendCustomParams(__spreadValues({}, customTokenParams), params);
    }
    const silentRenewUrl = this.getSilentRenewUrl(configuration);
    if (this.flowsDataService.isSilentRenewRunning(configuration) && silentRenewUrl) {
      params = params.set("redirect_uri", silentRenewUrl);
      return params.toString();
    }
    const redirectUrl = this.getRedirectUrl(configuration);
    if (!redirectUrl) {
      return null;
    }
    params = params.set("redirect_uri", redirectUrl);
    return params.toString();
  }
  createBodyForCodeFlowRefreshTokensRequest(refreshToken, configuration, customParamsRefresh) {
    const clientId = this.getClientId(configuration);
    if (!clientId) {
      return null;
    }
    let params = this.createHttpParams();
    params = params.set("grant_type", "refresh_token");
    params = params.set("client_id", clientId);
    params = params.set("refresh_token", refreshToken);
    if (customParamsRefresh) {
      params = this.appendCustomParams(__spreadValues({}, customParamsRefresh), params);
    }
    return params.toString();
  }
  createBodyForParCodeFlowRequest(configuration, authOptions) {
    const redirectUrl = this.getRedirectUrl(configuration, authOptions);
    if (!redirectUrl) {
      return of(null);
    }
    const state = this.flowsDataService.getExistingOrCreateAuthStateControl(configuration);
    const nonce = this.flowsDataService.createNonce(configuration);
    this.loggerService.logDebug(configuration, "Authorize created. adding myautostate: " + state);
    const codeVerifier = this.flowsDataService.createCodeVerifier(configuration);
    return this.jwtWindowCryptoService.generateCodeChallenge(codeVerifier).pipe(map((codeChallenge) => {
      const {
        clientId,
        responseType,
        scope,
        hdParam,
        customParamsAuthRequest
      } = configuration;
      let params = this.createHttpParams("");
      params = params.set("client_id", clientId ?? "");
      params = params.append("redirect_uri", redirectUrl);
      params = params.append("response_type", responseType ?? "");
      params = params.append("scope", scope ?? "");
      params = params.append("nonce", nonce);
      params = params.append("state", state);
      params = params.append("code_challenge", codeChallenge);
      params = params.append("code_challenge_method", "S256");
      if (hdParam) {
        params = params.append("hd", hdParam);
      }
      if (customParamsAuthRequest) {
        params = this.appendCustomParams(__spreadValues({}, customParamsAuthRequest), params);
      }
      if (authOptions?.customParams) {
        params = this.appendCustomParams(__spreadValues({}, authOptions.customParams), params);
      }
      return params.toString();
    }));
  }
  getPostLogoutRedirectUrl(configuration) {
    const {
      postLogoutRedirectUri
    } = configuration;
    if (!postLogoutRedirectUri) {
      this.loggerService.logError(configuration, `could not get postLogoutRedirectUri, was: `, postLogoutRedirectUri);
      return null;
    }
    return postLogoutRedirectUri;
  }
  createEndSessionUrl(idTokenHint, configuration, customParamsEndSession) {
    if (this.isAuth0Endpoint(configuration)) {
      return this.composeAuth0Endpoint(configuration);
    }
    const {
      url,
      existingParams
    } = this.getEndSessionEndpoint(configuration);
    if (!url) {
      return null;
    }
    let params = this.createHttpParams(existingParams);
    if (!!idTokenHint) {
      params = params.set("id_token_hint", idTokenHint);
    }
    const postLogoutRedirectUri = this.getPostLogoutRedirectUrl(configuration);
    if (postLogoutRedirectUri) {
      params = params.append("post_logout_redirect_uri", postLogoutRedirectUri);
    }
    if (customParamsEndSession) {
      params = this.appendCustomParams(__spreadValues({}, customParamsEndSession), params);
    }
    return `${url}?${params}`;
  }
  createAuthorizeUrl(codeChallenge, redirectUrl, nonce, state, configuration, prompt, customRequestParams) {
    const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
    const authorizationEndpoint = authWellKnownEndPoints?.authorizationEndpoint;
    if (!authorizationEndpoint) {
      this.loggerService.logError(configuration, `Can not create an authorize URL when authorizationEndpoint is '${authorizationEndpoint}'`);
      return "";
    }
    const {
      clientId,
      responseType,
      scope,
      hdParam,
      customParamsAuthRequest
    } = configuration;
    if (!clientId) {
      this.loggerService.logError(configuration, `createAuthorizeUrl could not add clientId because it was: `, clientId);
      return "";
    }
    if (!responseType) {
      this.loggerService.logError(configuration, `createAuthorizeUrl could not add responseType because it was: `, responseType);
      return "";
    }
    if (!scope) {
      this.loggerService.logError(configuration, `createAuthorizeUrl could not add scope because it was: `, scope);
      return "";
    }
    const urlParts = authorizationEndpoint.split("?");
    const authorizationUrl = urlParts[0];
    const existingParams = urlParts[1];
    let params = this.createHttpParams(existingParams);
    params = params.set("client_id", clientId);
    params = params.append("redirect_uri", redirectUrl);
    params = params.append("response_type", responseType);
    params = params.append("scope", scope);
    params = params.append("nonce", nonce);
    params = params.append("state", state);
    if (this.flowHelper.isCurrentFlowCodeFlow(configuration)) {
      params = params.append("code_challenge", codeChallenge);
      params = params.append("code_challenge_method", "S256");
    }
    const mergedParams = __spreadValues(__spreadValues({}, customParamsAuthRequest), customRequestParams);
    if (Object.keys(mergedParams).length > 0) {
      params = this.appendCustomParams(__spreadValues({}, mergedParams), params);
    }
    if (prompt) {
      params = this.overWriteParam(params, "prompt", prompt);
    }
    if (hdParam) {
      params = params.append("hd", hdParam);
    }
    return `${authorizationUrl}?${params}`;
  }
  createUrlImplicitFlowWithSilentRenew(configuration, customParams) {
    const state = this.flowsDataService.getExistingOrCreateAuthStateControl(configuration);
    const nonce = this.flowsDataService.createNonce(configuration);
    const silentRenewUrl = this.getSilentRenewUrl(configuration);
    if (!silentRenewUrl) {
      return null;
    }
    this.loggerService.logDebug(configuration, "RefreshSession created. adding myautostate: ", state);
    const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
    if (authWellKnownEndPoints) {
      return this.createAuthorizeUrl("", silentRenewUrl, nonce, state, configuration, "none", customParams);
    }
    this.loggerService.logError(configuration, "authWellKnownEndpoints is undefined");
    return null;
  }
  createUrlCodeFlowWithSilentRenew(configuration, customParams) {
    const state = this.flowsDataService.getExistingOrCreateAuthStateControl(configuration);
    const nonce = this.flowsDataService.createNonce(configuration);
    this.loggerService.logDebug(configuration, "RefreshSession created. adding myautostate: " + state);
    const codeVerifier = this.flowsDataService.createCodeVerifier(configuration);
    return this.jwtWindowCryptoService.generateCodeChallenge(codeVerifier).pipe(map((codeChallenge) => {
      const silentRenewUrl = this.getSilentRenewUrl(configuration);
      if (!silentRenewUrl) {
        return "";
      }
      const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
      if (authWellKnownEndPoints) {
        return this.createAuthorizeUrl(codeChallenge, silentRenewUrl, nonce, state, configuration, "none", customParams);
      }
      this.loggerService.logWarning(configuration, "authWellKnownEndpoints is undefined");
      return "";
    }));
  }
  createUrlImplicitFlowAuthorize(configuration, authOptions) {
    const state = this.flowsDataService.getExistingOrCreateAuthStateControl(configuration);
    const nonce = this.flowsDataService.createNonce(configuration);
    this.loggerService.logDebug(configuration, "Authorize created. adding myautostate: " + state);
    const redirectUrl = this.getRedirectUrl(configuration, authOptions);
    if (!redirectUrl) {
      return null;
    }
    const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
    if (authWellKnownEndPoints) {
      const {
        customParams
      } = authOptions || {};
      return this.createAuthorizeUrl("", redirectUrl, nonce, state, configuration, "", customParams);
    }
    this.loggerService.logError(configuration, "authWellKnownEndpoints is undefined");
    return null;
  }
  createUrlCodeFlowAuthorize(config, authOptions) {
    const state = this.flowsDataService.getExistingOrCreateAuthStateControl(config);
    const nonce = this.flowsDataService.createNonce(config);
    this.loggerService.logDebug(config, "Authorize created. adding myautostate: " + state);
    const redirectUrl = this.getRedirectUrl(config, authOptions);
    if (!redirectUrl) {
      return of(null);
    }
    return this.getCodeChallenge(config).pipe(map((codeChallenge) => {
      const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", config);
      if (authWellKnownEndPoints) {
        const {
          customParams
        } = authOptions || {};
        return this.createAuthorizeUrl(codeChallenge, redirectUrl, nonce, state, config, "", customParams);
      }
      this.loggerService.logError(config, "authWellKnownEndpoints is undefined");
      return "";
    }));
  }
  getCodeChallenge(config) {
    if (config.disablePkce) {
      return of("");
    }
    const codeVerifier = this.flowsDataService.createCodeVerifier(config);
    return this.jwtWindowCryptoService.generateCodeChallenge(codeVerifier);
  }
  getRedirectUrl(configuration, authOptions) {
    let {
      redirectUrl
    } = configuration;
    if (authOptions?.redirectUrl) {
      redirectUrl = authOptions.redirectUrl;
    }
    if (!redirectUrl) {
      this.loggerService.logError(configuration, `could not get redirectUrl, was: `, redirectUrl);
      return null;
    }
    return redirectUrl;
  }
  getSilentRenewUrl(configuration) {
    const {
      silentRenewUrl
    } = configuration;
    if (!silentRenewUrl) {
      this.loggerService.logError(configuration, `could not get silentRenewUrl, was: `, silentRenewUrl);
      return null;
    }
    return silentRenewUrl;
  }
  getClientId(configuration) {
    const {
      clientId
    } = configuration;
    if (!clientId) {
      this.loggerService.logError(configuration, `could not get clientId, was: `, clientId);
      return null;
    }
    return clientId;
  }
  appendCustomParams(customParams, params) {
    for (const [key, value] of Object.entries(__spreadValues({}, customParams))) {
      params = params.append(key, value.toString());
    }
    return params;
  }
  overWriteParam(params, key, value) {
    return params.set(key, value);
  }
  createHttpParams(existingParams) {
    existingParams = existingParams ?? "";
    return new HttpParams({
      fromString: existingParams,
      encoder: new UriEncoder()
    });
  }
  isAuth0Endpoint(configuration) {
    const {
      authority,
      useCustomAuth0Domain
    } = configuration;
    if (!authority) {
      return false;
    }
    return authority.endsWith(AUTH0_ENDPOINT) || Boolean(useCustomAuth0Domain);
  }
  composeAuth0Endpoint(configuration) {
    const {
      authority,
      clientId
    } = configuration;
    const postLogoutRedirectUrl = this.getPostLogoutRedirectUrl(configuration);
    return `${authority}/v2/logout?client_id=${clientId}&returnTo=${postLogoutRedirectUrl}`;
  }
  static {
    this.ɵfac = function UrlService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UrlService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _UrlService,
      factory: _UrlService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UrlService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var HttpBaseService = class _HttpBaseService {
  constructor() {
    this.http = inject(HttpClient);
  }
  get(url, params) {
    return this.http.get(url, params);
  }
  post(url, body, params) {
    return this.http.post(url, body, params);
  }
  static {
    this.ɵfac = function HttpBaseService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HttpBaseService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _HttpBaseService,
      factory: _HttpBaseService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpBaseService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var NGSW_CUSTOM_PARAM = "ngsw-bypass";
var DataService = class _DataService {
  constructor() {
    this.httpClient = inject(HttpBaseService);
  }
  get(url, config, token) {
    const headers = this.prepareHeaders(token);
    const params = this.prepareParams(config);
    return this.httpClient.get(url, {
      headers,
      params
    });
  }
  post(url, body, config, headersParams) {
    const headers = headersParams || this.prepareHeaders();
    const params = this.prepareParams(config);
    return this.httpClient.post(url ?? "", body, {
      headers,
      params
    });
  }
  prepareHeaders(token) {
    let headers = new HttpHeaders();
    headers = headers.set("Accept", "application/json");
    if (!!token) {
      headers = headers.set("Authorization", "Bearer " + decodeURIComponent(token));
    }
    return headers;
  }
  prepareParams(config) {
    let params = new HttpParams();
    const {
      ngswBypass
    } = config;
    if (ngswBypass) {
      params = params.set(NGSW_CUSTOM_PARAM, "");
    }
    return params;
  }
  static {
    this.ɵfac = function DataService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DataService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _DataService,
      factory: _DataService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var isNetworkError = (error) => !!error && error instanceof HttpErrorResponse && (error.error instanceof ProgressEvent && error.error.type === "error" || error.status === 0 && !!error.error);
var CodeFlowCallbackHandlerService = class _CodeFlowCallbackHandlerService {
  constructor() {
    this.urlService = inject(UrlService);
    this.loggerService = inject(LoggerService);
    this.tokenValidationService = inject(TokenValidationService);
    this.flowsDataService = inject(FlowsDataService);
    this.storagePersistenceService = inject(StoragePersistenceService);
    this.dataService = inject(DataService);
  }
  // STEP 1 Code Flow
  codeFlowCallback(urlToCheck, config) {
    const code = this.urlService.getUrlParameter(urlToCheck, "code");
    const state = this.urlService.getUrlParameter(urlToCheck, "state");
    const sessionState = this.urlService.getUrlParameter(urlToCheck, "session_state");
    if (!state) {
      this.loggerService.logDebug(config, "no state in url");
      return throwError(() => new Error("no state in url"));
    }
    if (!code) {
      this.loggerService.logDebug(config, "no code in url");
      return throwError(() => new Error("no code in url"));
    }
    this.loggerService.logDebug(config, "running validation for callback", urlToCheck);
    const initialCallbackContext = {
      code,
      refreshToken: "",
      state,
      sessionState,
      authResult: null,
      isRenewProcess: false,
      jwtKeys: null,
      validationResult: null,
      existingIdToken: null
    };
    return of(initialCallbackContext);
  }
  // STEP 2 Code Flow //  Code Flow Silent Renew starts here
  codeFlowCodeRequest(callbackContext, config) {
    const authStateControl = this.flowsDataService.getAuthStateControl(config);
    const isStateCorrect = this.tokenValidationService.validateStateFromHashCallback(callbackContext.state, authStateControl, config);
    if (!isStateCorrect) {
      return throwError(() => new Error("codeFlowCodeRequest incorrect state"));
    }
    const authWellknownEndpoints = this.storagePersistenceService.read("authWellKnownEndPoints", config);
    const tokenEndpoint = authWellknownEndpoints?.tokenEndpoint;
    if (!tokenEndpoint) {
      return throwError(() => new Error("Token Endpoint not defined"));
    }
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/x-www-form-urlencoded");
    const bodyForCodeFlow = this.urlService.createBodyForCodeFlowCodeRequest(callbackContext.code, config, config?.customParamsCodeRequest);
    return this.dataService.post(tokenEndpoint, bodyForCodeFlow, config, headers).pipe(switchMap((response) => {
      if (response) {
        const authResult = __spreadProps(__spreadValues({}, response), {
          state: callbackContext.state,
          session_state: callbackContext.sessionState
        });
        callbackContext.authResult = authResult;
      }
      return of(callbackContext);
    }), retryWhen((error) => this.handleRefreshRetry(error, config)), catchError((error) => {
      const {
        authority
      } = config;
      const errorMessage = `OidcService code request ${authority}`;
      this.loggerService.logError(config, errorMessage, error);
      return throwError(() => new Error(errorMessage));
    }));
  }
  handleRefreshRetry(errors, config) {
    return errors.pipe(mergeMap((error) => {
      if (isNetworkError(error)) {
        const {
          authority,
          refreshTokenRetryInSeconds
        } = config;
        const errorMessage = `OidcService code request ${authority} - no internet connection`;
        this.loggerService.logWarning(config, errorMessage, error);
        return timer((refreshTokenRetryInSeconds ?? 0) * 1e3);
      }
      return throwError(() => error);
    }));
  }
  static {
    this.ɵfac = function CodeFlowCallbackHandlerService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CodeFlowCallbackHandlerService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _CodeFlowCallbackHandlerService,
      factory: _CodeFlowCallbackHandlerService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CodeFlowCallbackHandlerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ValidationResult;
(function(ValidationResult2) {
  ValidationResult2["NotSet"] = "NotSet";
  ValidationResult2["StatesDoNotMatch"] = "StatesDoNotMatch";
  ValidationResult2["SignatureFailed"] = "SignatureFailed";
  ValidationResult2["IncorrectNonce"] = "IncorrectNonce";
  ValidationResult2["RequiredPropertyMissing"] = "RequiredPropertyMissing";
  ValidationResult2["MaxOffsetExpired"] = "MaxOffsetExpired";
  ValidationResult2["IssDoesNotMatchIssuer"] = "IssDoesNotMatchIssuer";
  ValidationResult2["NoAuthWellKnownEndPoints"] = "NoAuthWellKnownEndPoints";
  ValidationResult2["IncorrectAud"] = "IncorrectAud";
  ValidationResult2["IncorrectIdTokenClaimsAfterRefresh"] = "IncorrectIdTokenClaimsAfterRefresh";
  ValidationResult2["IncorrectAzp"] = "IncorrectAzp";
  ValidationResult2["TokenExpired"] = "TokenExpired";
  ValidationResult2["IncorrectAtHash"] = "IncorrectAtHash";
  ValidationResult2["Ok"] = "Ok";
  ValidationResult2["LoginRequired"] = "LoginRequired";
  ValidationResult2["SecureTokenServerError"] = "SecureTokenServerError";
})(ValidationResult || (ValidationResult = {}));
var DEFAULT_USERRESULT = {
  userData: null,
  allUserData: []
};
var UserService = class _UserService {
  constructor() {
    this.userDataInternal$ = new BehaviorSubject(DEFAULT_USERRESULT);
    this.loggerService = inject(LoggerService);
    this.tokenHelperService = inject(TokenHelperService);
    this.flowHelper = inject(FlowHelper);
    this.oidcDataService = inject(DataService);
    this.storagePersistenceService = inject(StoragePersistenceService);
    this.eventService = inject(PublicEventsService);
  }
  get userData$() {
    return this.userDataInternal$.asObservable();
  }
  getAndPersistUserDataInStore(currentConfiguration, allConfigs, isRenewProcess = false, idToken, decodedIdToken) {
    idToken = idToken || this.storagePersistenceService.getIdToken(currentConfiguration);
    decodedIdToken = decodedIdToken || this.tokenHelperService.getPayloadFromToken(idToken, false, currentConfiguration);
    const existingUserDataFromStorage = this.getUserDataFromStore(currentConfiguration);
    const haveUserData = !!existingUserDataFromStorage;
    const isCurrentFlowImplicitFlowWithAccessToken = this.flowHelper.isCurrentFlowImplicitFlowWithAccessToken(currentConfiguration);
    const isCurrentFlowCodeFlow = this.flowHelper.isCurrentFlowCodeFlow(currentConfiguration);
    const accessToken = this.storagePersistenceService.getAccessToken(currentConfiguration);
    if (!(isCurrentFlowImplicitFlowWithAccessToken || isCurrentFlowCodeFlow)) {
      this.loggerService.logDebug(currentConfiguration, `authCallback idToken flow with accessToken ${accessToken}`);
      this.setUserDataToStore(decodedIdToken, currentConfiguration, allConfigs);
      return of(decodedIdToken);
    }
    const {
      renewUserInfoAfterTokenRenew
    } = currentConfiguration;
    if (!isRenewProcess || renewUserInfoAfterTokenRenew || !haveUserData) {
      return this.getUserDataOidcFlowAndSave(decodedIdToken.sub, currentConfiguration, allConfigs).pipe(switchMap((userData) => {
        this.loggerService.logDebug(currentConfiguration, "Received user data: ", userData);
        if (!!userData) {
          this.loggerService.logDebug(currentConfiguration, "accessToken: ", accessToken);
          return of(userData);
        } else {
          return throwError(() => new Error("Received no user data, request failed"));
        }
      }));
    }
    return of(existingUserDataFromStorage);
  }
  getUserDataFromStore(currentConfiguration) {
    if (!currentConfiguration) {
      return throwError(() => new Error("Please provide a configuration before setting up the module"));
    }
    return this.storagePersistenceService.read("userData", currentConfiguration) || null;
  }
  publishUserDataIfExists(currentConfiguration, allConfigs) {
    const userData = this.getUserDataFromStore(currentConfiguration);
    if (userData) {
      this.fireUserDataEvent(currentConfiguration, allConfigs, userData);
    }
  }
  setUserDataToStore(userData, currentConfiguration, allConfigs) {
    this.storagePersistenceService.write("userData", userData, currentConfiguration);
    this.fireUserDataEvent(currentConfiguration, allConfigs, userData);
  }
  resetUserDataInStore(currentConfiguration, allConfigs) {
    this.storagePersistenceService.remove("userData", currentConfiguration);
    this.fireUserDataEvent(currentConfiguration, allConfigs, null);
  }
  getUserDataOidcFlowAndSave(idTokenSub, currentConfiguration, allConfigs) {
    return this.getIdentityUserData(currentConfiguration).pipe(map((data) => {
      if (this.validateUserDataSubIdToken(currentConfiguration, idTokenSub, data?.sub)) {
        this.setUserDataToStore(data, currentConfiguration, allConfigs);
        return data;
      } else {
        this.loggerService.logWarning(currentConfiguration, `User data sub does not match sub in id_token, resetting`);
        this.resetUserDataInStore(currentConfiguration, allConfigs);
        return null;
      }
    }));
  }
  getIdentityUserData(currentConfiguration) {
    const token = this.storagePersistenceService.getAccessToken(currentConfiguration);
    const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", currentConfiguration);
    if (!authWellKnownEndPoints) {
      this.loggerService.logWarning(currentConfiguration, "init check session: authWellKnownEndpoints is undefined");
      return throwError(() => new Error("authWellKnownEndpoints is undefined"));
    }
    const userInfoEndpoint = authWellKnownEndPoints.userInfoEndpoint;
    if (!userInfoEndpoint) {
      this.loggerService.logError(currentConfiguration, "init check session: authWellKnownEndpoints.userinfo_endpoint is undefined; set auto_userinfo = false in config");
      return throwError(() => new Error("authWellKnownEndpoints.userinfo_endpoint is undefined"));
    }
    return this.oidcDataService.get(userInfoEndpoint, currentConfiguration, token).pipe(retry(2));
  }
  validateUserDataSubIdToken(currentConfiguration, idTokenSub, userDataSub) {
    if (!idTokenSub) {
      return false;
    }
    if (!userDataSub) {
      return false;
    }
    if (idTokenSub.toString() !== userDataSub.toString()) {
      this.loggerService.logDebug(currentConfiguration, "validateUserDataSubIdToken failed", idTokenSub, userDataSub);
      return false;
    }
    return true;
  }
  fireUserDataEvent(currentConfiguration, allConfigs, passedUserData) {
    const userData = this.composeSingleOrMultipleUserDataObject(currentConfiguration, allConfigs, passedUserData);
    this.userDataInternal$.next(userData);
    const {
      configId
    } = currentConfiguration;
    this.eventService.fireEvent(EventTypes.UserDataChanged, {
      configId,
      userData: passedUserData
    });
  }
  composeSingleOrMultipleUserDataObject(currentConfiguration, allConfigs, passedUserData) {
    const hasManyConfigs = allConfigs.length > 1;
    if (!hasManyConfigs) {
      const {
        configId
      } = currentConfiguration;
      return this.composeSingleUserDataResult(configId ?? "", passedUserData);
    }
    const allUserData = allConfigs.map((config) => {
      const currentConfigId = currentConfiguration.configId ?? "";
      const configId = config.configId ?? "";
      if (this.currentConfigIsToUpdate(currentConfigId, config)) {
        return {
          configId,
          userData: passedUserData
        };
      }
      const alreadySavedUserData = this.storagePersistenceService.read("userData", config) || null;
      return {
        configId,
        userData: alreadySavedUserData
      };
    });
    return {
      userData: null,
      allUserData
    };
  }
  composeSingleUserDataResult(configId, userData) {
    return {
      userData,
      allUserData: [{
        configId,
        userData
      }]
    };
  }
  currentConfigIsToUpdate(configId, config) {
    return config.configId === configId;
  }
  static {
    this.ɵfac = function UserService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UserService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _UserService,
      factory: _UserService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ResetAuthDataService = class _ResetAuthDataService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.userService = inject(UserService);
    this.flowsDataService = inject(FlowsDataService);
    this.authStateService = inject(AuthStateService);
  }
  resetAuthorizationData(currentConfiguration, allConfigs) {
    if (!currentConfiguration) {
      return;
    }
    this.userService.resetUserDataInStore(currentConfiguration, allConfigs);
    this.flowsDataService.resetStorageFlowData(currentConfiguration);
    this.authStateService.setUnauthenticatedAndFireEvent(currentConfiguration, allConfigs);
    this.loggerService.logDebug(currentConfiguration, "Local Login information cleaned up and event fired");
  }
  static {
    this.ɵfac = function ResetAuthDataService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ResetAuthDataService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ResetAuthDataService,
      factory: _ResetAuthDataService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ResetAuthDataService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var SigninKeyDataService = class _SigninKeyDataService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.storagePersistenceService = inject(StoragePersistenceService);
    this.dataService = inject(DataService);
  }
  getSigningKeys(currentConfiguration) {
    const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", currentConfiguration);
    const jwksUri = authWellKnownEndPoints?.jwksUri;
    if (!jwksUri) {
      const error = `getSigningKeys: authWellKnownEndpoints.jwksUri is: '${jwksUri}'`;
      this.loggerService.logWarning(currentConfiguration, error);
      return throwError(() => new Error(error));
    }
    this.loggerService.logDebug(currentConfiguration, "Getting signinkeys from ", jwksUri);
    return this.dataService.get(jwksUri, currentConfiguration).pipe(retry(2), catchError((e) => this.handleErrorGetSigningKeys(e, currentConfiguration)));
  }
  handleErrorGetSigningKeys(errorResponse, currentConfiguration) {
    let errMsg = "";
    if (errorResponse instanceof HttpResponse) {
      const body = errorResponse.body || {};
      const err = JSON.stringify(body);
      const {
        status,
        statusText
      } = errorResponse;
      errMsg = `${status || ""} - ${statusText || ""} ${err || ""}`;
    } else {
      const {
        message
      } = errorResponse;
      errMsg = !!message ? message : `${errorResponse}`;
    }
    this.loggerService.logError(currentConfiguration, errMsg);
    return throwError(() => new Error(errMsg));
  }
  static {
    this.ɵfac = function SigninKeyDataService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SigninKeyDataService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _SigninKeyDataService,
      factory: _SigninKeyDataService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SigninKeyDataService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var JWT_KEYS = "jwtKeys";
var HistoryJwtKeysCallbackHandlerService = class _HistoryJwtKeysCallbackHandlerService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.authStateService = inject(AuthStateService);
    this.flowsDataService = inject(FlowsDataService);
    this.signInKeyDataService = inject(SigninKeyDataService);
    this.storagePersistenceService = inject(StoragePersistenceService);
    this.resetAuthDataService = inject(ResetAuthDataService);
    this.document = inject(DOCUMENT);
  }
  // STEP 3 Code Flow, STEP 2 Implicit Flow, STEP 3 Refresh Token
  callbackHistoryAndResetJwtKeys(callbackContext, config, allConfigs) {
    let toWrite = __spreadValues({}, callbackContext.authResult);
    if (!this.responseHasIdToken(callbackContext)) {
      const existingIdToken = this.storagePersistenceService.getIdToken(config);
      toWrite = __spreadProps(__spreadValues({}, toWrite), {
        id_token: existingIdToken
      });
    }
    this.storagePersistenceService.write("authnResult", toWrite, config);
    if (config.allowUnsafeReuseRefreshToken && callbackContext.authResult?.refresh_token) {
      this.storagePersistenceService.write("reusable_refresh_token", callbackContext.authResult.refresh_token, config);
    }
    if (this.historyCleanUpTurnedOn(config) && !callbackContext.isRenewProcess) {
      this.resetBrowserHistory();
    } else {
      this.loggerService.logDebug(config, "history clean up inactive");
    }
    if (callbackContext.authResult?.error) {
      const errorMessage = `AuthCallback AuthResult came with error: ${callbackContext.authResult.error}`;
      this.loggerService.logDebug(config, errorMessage);
      this.resetAuthDataService.resetAuthorizationData(config, allConfigs);
      this.flowsDataService.setNonce("", config);
      this.handleResultErrorFromCallback(callbackContext.authResult, callbackContext.isRenewProcess);
      return throwError(() => new Error(errorMessage));
    }
    this.loggerService.logDebug(config, `AuthResult '${JSON.stringify(callbackContext.authResult, null, 2)}'.
      AuthCallback created, begin token validation`);
    return this.signInKeyDataService.getSigningKeys(config).pipe(tap((jwtKeys) => this.storeSigningKeys(jwtKeys, config)), catchError((err) => {
      const storedJwtKeys = this.readSigningKeys(config);
      if (!!storedJwtKeys) {
        this.loggerService.logWarning(config, `Failed to retrieve signing keys, fallback to stored keys`);
        return of(storedJwtKeys);
      }
      return throwError(() => new Error(err));
    }), switchMap((jwtKeys) => {
      if (jwtKeys) {
        callbackContext.jwtKeys = jwtKeys;
        return of(callbackContext);
      }
      const errorMessage = `Failed to retrieve signing key`;
      this.loggerService.logWarning(config, errorMessage);
      return throwError(() => new Error(errorMessage));
    }), catchError((err) => {
      const errorMessage = `Failed to retrieve signing key with error: ${err}`;
      this.loggerService.logWarning(config, errorMessage);
      return throwError(() => new Error(errorMessage));
    }));
  }
  responseHasIdToken(callbackContext) {
    return !!callbackContext?.authResult?.id_token;
  }
  handleResultErrorFromCallback(result, isRenewProcess) {
    let validationResult = ValidationResult.SecureTokenServerError;
    if (result && typeof result === "object" && "error" in result && result.error === "login_required") {
      validationResult = ValidationResult.LoginRequired;
    }
    this.authStateService.updateAndPublishAuthState({
      isAuthenticated: false,
      validationResult,
      isRenewProcess
    });
  }
  historyCleanUpTurnedOn(config) {
    const {
      historyCleanupOff
    } = config;
    return !historyCleanupOff;
  }
  resetBrowserHistory() {
    this.document.defaultView?.history.replaceState({}, this.document.title, this.document.defaultView.location.origin + this.document.defaultView.location.pathname);
  }
  storeSigningKeys(jwtKeys, config) {
    this.storagePersistenceService.write(JWT_KEYS, jwtKeys, config);
  }
  readSigningKeys(config) {
    return this.storagePersistenceService.read(JWT_KEYS, config);
  }
  static {
    this.ɵfac = function HistoryJwtKeysCallbackHandlerService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HistoryJwtKeysCallbackHandlerService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _HistoryJwtKeysCallbackHandlerService,
      factory: _HistoryJwtKeysCallbackHandlerService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HistoryJwtKeysCallbackHandlerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ImplicitFlowCallbackHandlerService = class _ImplicitFlowCallbackHandlerService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.resetAuthDataService = inject(ResetAuthDataService);
    this.flowsDataService = inject(FlowsDataService);
    this.document = inject(DOCUMENT);
  }
  // STEP 1 Code Flow
  // STEP 1 Implicit Flow
  implicitFlowCallback(config, allConfigs, hash) {
    const isRenewProcessData = this.flowsDataService.isSilentRenewRunning(config);
    this.loggerService.logDebug(config, "BEGIN callback, no auth data");
    if (!isRenewProcessData) {
      this.resetAuthDataService.resetAuthorizationData(config, allConfigs);
    }
    hash = hash || this.document.location.hash.substring(1);
    const authResult = hash.split("&").reduce((resultData, item) => {
      const parts = item.split("=");
      resultData[parts.shift()] = parts.join("=");
      return resultData;
    }, {});
    const callbackContext = {
      code: "",
      refreshToken: "",
      state: "",
      sessionState: null,
      authResult,
      isRenewProcess: isRenewProcessData,
      jwtKeys: null,
      validationResult: null,
      existingIdToken: null
    };
    return of(callbackContext);
  }
  static {
    this.ɵfac = function ImplicitFlowCallbackHandlerService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ImplicitFlowCallbackHandlerService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ImplicitFlowCallbackHandlerService,
      factory: _ImplicitFlowCallbackHandlerService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ImplicitFlowCallbackHandlerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var RefreshSessionCallbackHandlerService = class _RefreshSessionCallbackHandlerService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.authStateService = inject(AuthStateService);
    this.flowsDataService = inject(FlowsDataService);
  }
  // STEP 1 Refresh session
  refreshSessionWithRefreshTokens(config) {
    const stateData = this.flowsDataService.getExistingOrCreateAuthStateControl(config);
    this.loggerService.logDebug(config, "RefreshSession created. Adding myautostate: " + stateData);
    const refreshToken = this.authStateService.getRefreshToken(config);
    const idToken = this.authStateService.getIdToken(config);
    if (refreshToken) {
      const callbackContext = {
        code: "",
        refreshToken,
        state: stateData,
        sessionState: null,
        authResult: null,
        isRenewProcess: true,
        jwtKeys: null,
        validationResult: null,
        existingIdToken: idToken
      };
      this.loggerService.logDebug(config, "found refresh code, obtaining new credentials with refresh code");
      this.flowsDataService.setNonce(TokenValidationService.refreshTokenNoncePlaceholder, config);
      return of(callbackContext);
    } else {
      const errorMessage = "no refresh token found, please login";
      this.loggerService.logError(config, errorMessage);
      return throwError(() => new Error(errorMessage));
    }
  }
  static {
    this.ɵfac = function RefreshSessionCallbackHandlerService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RefreshSessionCallbackHandlerService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _RefreshSessionCallbackHandlerService,
      factory: _RefreshSessionCallbackHandlerService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RefreshSessionCallbackHandlerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var RefreshTokenCallbackHandlerService = class _RefreshTokenCallbackHandlerService {
  constructor() {
    this.urlService = inject(UrlService);
    this.loggerService = inject(LoggerService);
    this.dataService = inject(DataService);
    this.storagePersistenceService = inject(StoragePersistenceService);
  }
  // STEP 2 Refresh Token
  refreshTokensRequestTokens(callbackContext, config, customParamsRefresh) {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/x-www-form-urlencoded");
    const authWellknownEndpoints = this.storagePersistenceService.read("authWellKnownEndPoints", config);
    const tokenEndpoint = authWellknownEndpoints?.tokenEndpoint;
    if (!tokenEndpoint) {
      return throwError(() => new Error("Token Endpoint not defined"));
    }
    const data = this.urlService.createBodyForCodeFlowRefreshTokensRequest(callbackContext.refreshToken, config, customParamsRefresh);
    return this.dataService.post(tokenEndpoint, data, config, headers).pipe(switchMap((response) => {
      this.loggerService.logDebug(config, `token refresh response: ${response}`);
      if (response) {
        response.state = callbackContext.state;
      }
      callbackContext.authResult = response;
      return of(callbackContext);
    }), retryWhen((error) => this.handleRefreshRetry(error, config)), catchError((error) => {
      const {
        authority
      } = config;
      const errorMessage = `OidcService code request ${authority}`;
      this.loggerService.logError(config, errorMessage, error);
      return throwError(() => new Error(errorMessage));
    }));
  }
  handleRefreshRetry(errors, config) {
    return errors.pipe(mergeMap((error) => {
      if (isNetworkError(error)) {
        const {
          authority,
          refreshTokenRetryInSeconds
        } = config;
        const errorMessage = `OidcService code request ${authority} - no internet connection`;
        this.loggerService.logWarning(config, errorMessage, error);
        return timer((refreshTokenRetryInSeconds ?? 0) * 1e3);
      }
      return throwError(() => error);
    }));
  }
  static {
    this.ɵfac = function RefreshTokenCallbackHandlerService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RefreshTokenCallbackHandlerService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _RefreshTokenCallbackHandlerService,
      factory: _RefreshTokenCallbackHandlerService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RefreshTokenCallbackHandlerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var EqualityService = class _EqualityService {
  isStringEqualOrNonOrderedArrayEqual(value1, value2) {
    if (this.isNullOrUndefined(value1)) {
      return false;
    }
    if (this.isNullOrUndefined(value2)) {
      return false;
    }
    if (this.oneValueIsStringAndTheOtherIsArray(value1, value2)) {
      return false;
    }
    if (this.bothValuesAreStrings(value1, value2)) {
      return value1 === value2;
    }
    return this.arraysHaveEqualContent(value1, value2);
  }
  areEqual(value1, value2) {
    if (!value1 || !value2) {
      return false;
    }
    if (this.bothValuesAreArrays(value1, value2)) {
      return this.arraysStrictEqual(value1, value2);
    }
    if (this.bothValuesAreStrings(value1, value2)) {
      return value1 === value2;
    }
    if (this.bothValuesAreObjects(value1, value2)) {
      return JSON.stringify(value1).toLowerCase() === JSON.stringify(value2).toLowerCase();
    }
    if (this.oneValueIsStringAndTheOtherIsArray(value1, value2)) {
      if (Array.isArray(value1) && this.valueIsString(value2)) {
        return value1[0] === value2;
      }
      if (Array.isArray(value2) && this.valueIsString(value1)) {
        return value2[0] === value1;
      }
    }
    return value1 === value2;
  }
  oneValueIsStringAndTheOtherIsArray(value1, value2) {
    return Array.isArray(value1) && this.valueIsString(value2) || Array.isArray(value2) && this.valueIsString(value1);
  }
  bothValuesAreObjects(value1, value2) {
    return this.valueIsObject(value1) && this.valueIsObject(value2);
  }
  bothValuesAreStrings(value1, value2) {
    return this.valueIsString(value1) && this.valueIsString(value2);
  }
  bothValuesAreArrays(value1, value2) {
    return Array.isArray(value1) && Array.isArray(value2);
  }
  valueIsString(value) {
    return typeof value === "string" || value instanceof String;
  }
  valueIsObject(value) {
    return typeof value === "object";
  }
  arraysStrictEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = arr1.length; i--; ) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
  arraysHaveEqualContent(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    return arr1.some((v) => arr2.includes(v));
  }
  isNullOrUndefined(val) {
    return val === null || val === void 0;
  }
  static {
    this.ɵfac = function EqualityService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _EqualityService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _EqualityService,
      factory: _EqualityService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EqualityService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var StateValidationResult = class {
  constructor(accessToken = "", idToken = "", authResponseIsValid = false, decodedIdToken = {
    at_hash: ""
  }, state = ValidationResult.NotSet) {
    this.accessToken = accessToken;
    this.idToken = idToken;
    this.authResponseIsValid = authResponseIsValid;
    this.decodedIdToken = decodedIdToken;
    this.state = state;
  }
};
var StateValidationService = class _StateValidationService {
  constructor() {
    this.storagePersistenceService = inject(StoragePersistenceService);
    this.tokenValidationService = inject(TokenValidationService);
    this.tokenHelperService = inject(TokenHelperService);
    this.loggerService = inject(LoggerService);
    this.equalityService = inject(EqualityService);
    this.flowHelper = inject(FlowHelper);
  }
  getValidatedStateResult(callbackContext, configuration) {
    const hasError = Boolean(callbackContext.authResult?.error);
    const hasCallbackContext = Boolean(callbackContext);
    if (!hasCallbackContext || hasError) {
      return of(new StateValidationResult("", "", false, {}));
    }
    return this.validateState(callbackContext, configuration);
  }
  validateState(callbackContext, configuration) {
    const toReturn = new StateValidationResult();
    const authStateControl = this.storagePersistenceService.read("authStateControl", configuration);
    if (!this.tokenValidationService.validateStateFromHashCallback(callbackContext.authResult?.state, authStateControl, configuration)) {
      this.loggerService.logWarning(configuration, "authCallback incorrect state");
      toReturn.state = ValidationResult.StatesDoNotMatch;
      this.handleUnsuccessfulValidation(configuration);
      return of(toReturn);
    }
    const isCurrentFlowImplicitFlowWithAccessToken = this.flowHelper.isCurrentFlowImplicitFlowWithAccessToken(configuration);
    const isCurrentFlowCodeFlow = this.flowHelper.isCurrentFlowCodeFlow(configuration);
    if (isCurrentFlowImplicitFlowWithAccessToken || isCurrentFlowCodeFlow) {
      toReturn.accessToken = callbackContext.authResult?.access_token ?? "";
    }
    const disableIdTokenValidation = configuration.disableIdTokenValidation;
    if (disableIdTokenValidation) {
      toReturn.state = ValidationResult.Ok;
      toReturn.authResponseIsValid = true;
      return of(toReturn);
    }
    const isInRefreshTokenFlow = callbackContext.isRenewProcess && !!callbackContext.refreshToken;
    const hasIdToken = Boolean(callbackContext.authResult?.id_token);
    if (isInRefreshTokenFlow && !hasIdToken) {
      toReturn.state = ValidationResult.Ok;
      toReturn.authResponseIsValid = true;
      return of(toReturn);
    }
    if (hasIdToken) {
      const {
        clientId,
        issValidationOff,
        maxIdTokenIatOffsetAllowedInSeconds,
        disableIatOffsetValidation,
        ignoreNonceAfterRefresh,
        renewTimeBeforeTokenExpiresInSeconds
      } = configuration;
      toReturn.idToken = callbackContext.authResult?.id_token ?? "";
      toReturn.decodedIdToken = this.tokenHelperService.getPayloadFromToken(toReturn.idToken, false, configuration);
      return this.tokenValidationService.validateSignatureIdToken(toReturn.idToken, callbackContext.jwtKeys, configuration).pipe(mergeMap((isSignatureIdTokenValid) => {
        if (!isSignatureIdTokenValid) {
          this.loggerService.logDebug(configuration, "authCallback Signature validation failed id_token");
          toReturn.state = ValidationResult.SignatureFailed;
          this.handleUnsuccessfulValidation(configuration);
          return of(toReturn);
        }
        const authNonce = this.storagePersistenceService.read("authNonce", configuration);
        if (!this.tokenValidationService.validateIdTokenNonce(toReturn.decodedIdToken, authNonce, Boolean(ignoreNonceAfterRefresh), configuration)) {
          this.loggerService.logWarning(configuration, "authCallback incorrect nonce, did you call the checkAuth() method multiple times?");
          toReturn.state = ValidationResult.IncorrectNonce;
          this.handleUnsuccessfulValidation(configuration);
          return of(toReturn);
        }
        if (!this.tokenValidationService.validateRequiredIdToken(toReturn.decodedIdToken, configuration)) {
          this.loggerService.logDebug(configuration, "authCallback Validation, one of the REQUIRED properties missing from id_token");
          toReturn.state = ValidationResult.RequiredPropertyMissing;
          this.handleUnsuccessfulValidation(configuration);
          return of(toReturn);
        }
        if (!isInRefreshTokenFlow && !this.tokenValidationService.validateIdTokenIatMaxOffset(toReturn.decodedIdToken, maxIdTokenIatOffsetAllowedInSeconds ?? 120, Boolean(disableIatOffsetValidation), configuration)) {
          this.loggerService.logWarning(configuration, "authCallback Validation, iat rejected id_token was issued too far away from the current time");
          toReturn.state = ValidationResult.MaxOffsetExpired;
          this.handleUnsuccessfulValidation(configuration);
          return of(toReturn);
        }
        const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
        if (authWellKnownEndPoints) {
          if (issValidationOff) {
            this.loggerService.logDebug(configuration, "iss validation is turned off, this is not recommended!");
          } else if (!issValidationOff && !this.tokenValidationService.validateIdTokenIss(toReturn.decodedIdToken, authWellKnownEndPoints.issuer, configuration)) {
            this.loggerService.logWarning(configuration, "authCallback incorrect iss does not match authWellKnownEndpoints issuer");
            toReturn.state = ValidationResult.IssDoesNotMatchIssuer;
            this.handleUnsuccessfulValidation(configuration);
            return of(toReturn);
          }
        } else {
          this.loggerService.logWarning(configuration, "authWellKnownEndpoints is undefined");
          toReturn.state = ValidationResult.NoAuthWellKnownEndPoints;
          this.handleUnsuccessfulValidation(configuration);
          return of(toReturn);
        }
        if (!this.tokenValidationService.validateIdTokenAud(toReturn.decodedIdToken, clientId, configuration)) {
          this.loggerService.logWarning(configuration, "authCallback incorrect aud");
          toReturn.state = ValidationResult.IncorrectAud;
          this.handleUnsuccessfulValidation(configuration);
          return of(toReturn);
        }
        if (!this.tokenValidationService.validateIdTokenAzpExistsIfMoreThanOneAud(toReturn.decodedIdToken)) {
          this.loggerService.logWarning(configuration, "authCallback missing azp");
          toReturn.state = ValidationResult.IncorrectAzp;
          this.handleUnsuccessfulValidation(configuration);
          return of(toReturn);
        }
        if (!this.tokenValidationService.validateIdTokenAzpValid(toReturn.decodedIdToken, clientId)) {
          this.loggerService.logWarning(configuration, "authCallback incorrect azp");
          toReturn.state = ValidationResult.IncorrectAzp;
          this.handleUnsuccessfulValidation(configuration);
          return of(toReturn);
        }
        if (!this.isIdTokenAfterRefreshTokenRequestValid(callbackContext, toReturn.decodedIdToken, configuration)) {
          this.loggerService.logWarning(configuration, "authCallback pre, post id_token claims do not match in refresh");
          toReturn.state = ValidationResult.IncorrectIdTokenClaimsAfterRefresh;
          this.handleUnsuccessfulValidation(configuration);
          return of(toReturn);
        }
        if (!isInRefreshTokenFlow && !this.tokenValidationService.validateIdTokenExpNotExpired(toReturn.decodedIdToken, configuration, renewTimeBeforeTokenExpiresInSeconds)) {
          this.loggerService.logWarning(configuration, "authCallback id token expired");
          toReturn.state = ValidationResult.TokenExpired;
          this.handleUnsuccessfulValidation(configuration);
          return of(toReturn);
        }
        return this.validateDefault(isCurrentFlowImplicitFlowWithAccessToken, isCurrentFlowCodeFlow, toReturn, configuration, callbackContext);
      }));
    } else {
      this.loggerService.logDebug(configuration, "No id_token found, skipping id_token validation");
    }
    return this.validateDefault(isCurrentFlowImplicitFlowWithAccessToken, isCurrentFlowCodeFlow, toReturn, configuration, callbackContext);
  }
  validateDefault(isCurrentFlowImplicitFlowWithAccessToken, isCurrentFlowCodeFlow, toReturn, configuration, callbackContext) {
    if (!isCurrentFlowImplicitFlowWithAccessToken && !isCurrentFlowCodeFlow) {
      toReturn.authResponseIsValid = true;
      toReturn.state = ValidationResult.Ok;
      this.handleSuccessfulValidation(configuration);
      this.handleUnsuccessfulValidation(configuration);
      return of(toReturn);
    }
    if (callbackContext.authResult?.id_token) {
      const idTokenHeader = this.tokenHelperService.getHeaderFromToken(toReturn.idToken, false, configuration);
      if (isCurrentFlowCodeFlow && !toReturn.decodedIdToken.at_hash) {
        this.loggerService.logDebug(configuration, "Code Flow active, and no at_hash in the id_token, skipping check!");
      } else {
        return this.tokenValidationService.validateIdTokenAtHash(
          toReturn.accessToken,
          toReturn.decodedIdToken.at_hash,
          idTokenHeader.alg,
          // 'RS256'
          configuration
        ).pipe(map((valid) => {
          if (!valid || !toReturn.accessToken) {
            this.loggerService.logWarning(configuration, "authCallback incorrect at_hash");
            toReturn.state = ValidationResult.IncorrectAtHash;
            this.handleUnsuccessfulValidation(configuration);
            return toReturn;
          } else {
            toReturn.authResponseIsValid = true;
            toReturn.state = ValidationResult.Ok;
            this.handleSuccessfulValidation(configuration);
            return toReturn;
          }
        }));
      }
    }
    toReturn.authResponseIsValid = true;
    toReturn.state = ValidationResult.Ok;
    this.handleSuccessfulValidation(configuration);
    return of(toReturn);
  }
  isIdTokenAfterRefreshTokenRequestValid(callbackContext, newIdToken, configuration) {
    const {
      useRefreshToken,
      disableRefreshIdTokenAuthTimeValidation
    } = configuration;
    if (!useRefreshToken) {
      return true;
    }
    if (!callbackContext.existingIdToken) {
      return true;
    }
    const decodedIdToken = this.tokenHelperService.getPayloadFromToken(callbackContext.existingIdToken, false, configuration);
    if (decodedIdToken.iss !== newIdToken.iss) {
      this.loggerService.logDebug(configuration, `iss do not match: ${decodedIdToken.iss} ${newIdToken.iss}`);
      return false;
    }
    if (decodedIdToken.azp !== newIdToken.azp) {
      this.loggerService.logDebug(configuration, `azp do not match: ${decodedIdToken.azp} ${newIdToken.azp}`);
      return false;
    }
    if (decodedIdToken.sub !== newIdToken.sub) {
      this.loggerService.logDebug(configuration, `sub do not match: ${decodedIdToken.sub} ${newIdToken.sub}`);
      return false;
    }
    if (!this.equalityService.isStringEqualOrNonOrderedArrayEqual(decodedIdToken?.aud, newIdToken?.aud)) {
      this.loggerService.logDebug(configuration, `aud in new id_token is not valid: '${decodedIdToken?.aud}' '${newIdToken.aud}'`);
      return false;
    }
    if (disableRefreshIdTokenAuthTimeValidation) {
      return true;
    }
    if (decodedIdToken.auth_time !== newIdToken.auth_time) {
      this.loggerService.logDebug(configuration, `auth_time do not match: ${decodedIdToken.auth_time} ${newIdToken.auth_time}`);
      return false;
    }
    return true;
  }
  handleSuccessfulValidation(configuration) {
    const {
      autoCleanStateAfterAuthentication
    } = configuration;
    this.storagePersistenceService.write("authNonce", null, configuration);
    if (autoCleanStateAfterAuthentication) {
      this.storagePersistenceService.write("authStateControl", "", configuration);
    }
    this.loggerService.logDebug(configuration, "authCallback token(s) validated, continue");
  }
  handleUnsuccessfulValidation(configuration) {
    const {
      autoCleanStateAfterAuthentication
    } = configuration;
    this.storagePersistenceService.write("authNonce", null, configuration);
    if (autoCleanStateAfterAuthentication) {
      this.storagePersistenceService.write("authStateControl", "", configuration);
    }
    this.loggerService.logDebug(configuration, "authCallback token(s) invalid");
  }
  static {
    this.ɵfac = function StateValidationService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _StateValidationService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _StateValidationService,
      factory: _StateValidationService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StateValidationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var StateValidationCallbackHandlerService = class _StateValidationCallbackHandlerService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.stateValidationService = inject(StateValidationService);
    this.authStateService = inject(AuthStateService);
    this.resetAuthDataService = inject(ResetAuthDataService);
    this.document = inject(DOCUMENT);
  }
  // STEP 4 All flows
  callbackStateValidation(callbackContext, configuration, allConfigs) {
    return this.stateValidationService.getValidatedStateResult(callbackContext, configuration).pipe(map((validationResult) => {
      callbackContext.validationResult = validationResult;
      if (validationResult.authResponseIsValid) {
        this.authStateService.setAuthorizationData(validationResult.accessToken, callbackContext.authResult, configuration, allConfigs);
        return callbackContext;
      } else {
        const errorMessage = `authorizedCallback, token(s) validation failed, resetting. Hash: ${this.document.location.hash}`;
        this.loggerService.logWarning(configuration, errorMessage);
        this.resetAuthDataService.resetAuthorizationData(configuration, allConfigs);
        this.publishUnauthorizedState(callbackContext.validationResult, callbackContext.isRenewProcess);
        throw new Error(errorMessage);
      }
    }));
  }
  publishUnauthorizedState(stateValidationResult, isRenewProcess) {
    this.authStateService.updateAndPublishAuthState({
      isAuthenticated: false,
      validationResult: stateValidationResult.state,
      isRenewProcess
    });
  }
  static {
    this.ɵfac = function StateValidationCallbackHandlerService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _StateValidationCallbackHandlerService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _StateValidationCallbackHandlerService,
      factory: _StateValidationCallbackHandlerService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StateValidationCallbackHandlerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var UserCallbackHandlerService = class _UserCallbackHandlerService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.authStateService = inject(AuthStateService);
    this.flowsDataService = inject(FlowsDataService);
    this.userService = inject(UserService);
    this.resetAuthDataService = inject(ResetAuthDataService);
  }
  // STEP 5 userData
  callbackUser(callbackContext, configuration, allConfigs) {
    const {
      isRenewProcess,
      validationResult,
      authResult,
      refreshToken
    } = callbackContext;
    const {
      autoUserInfo,
      renewUserInfoAfterTokenRenew
    } = configuration;
    if (!autoUserInfo) {
      if (!isRenewProcess || renewUserInfoAfterTokenRenew) {
        if (validationResult?.decodedIdToken) {
          this.userService.setUserDataToStore(validationResult.decodedIdToken, configuration, allConfigs);
        }
      }
      if (!isRenewProcess && !refreshToken) {
        this.flowsDataService.setSessionState(authResult?.session_state, configuration);
      }
      this.publishAuthState(validationResult, isRenewProcess);
      return of(callbackContext);
    }
    return this.userService.getAndPersistUserDataInStore(configuration, allConfigs, isRenewProcess, validationResult?.idToken, validationResult?.decodedIdToken).pipe(switchMap((userData) => {
      if (!!userData) {
        if (!refreshToken) {
          this.flowsDataService.setSessionState(authResult?.session_state, configuration);
        }
        this.publishAuthState(validationResult, isRenewProcess);
        return of(callbackContext);
      } else {
        this.resetAuthDataService.resetAuthorizationData(configuration, allConfigs);
        this.publishUnauthenticatedState(validationResult, isRenewProcess);
        const errorMessage = `Called for userData but they were ${userData}`;
        this.loggerService.logWarning(configuration, errorMessage);
        return throwError(() => new Error(errorMessage));
      }
    }), catchError((err) => {
      const errorMessage = `Failed to retrieve user info with error:  ${err}`;
      this.loggerService.logWarning(configuration, errorMessage);
      return throwError(() => new Error(errorMessage));
    }));
  }
  publishAuthState(stateValidationResult, isRenewProcess) {
    if (!stateValidationResult) {
      return;
    }
    this.authStateService.updateAndPublishAuthState({
      isAuthenticated: true,
      validationResult: stateValidationResult.state,
      isRenewProcess
    });
  }
  publishUnauthenticatedState(stateValidationResult, isRenewProcess) {
    if (!stateValidationResult) {
      return;
    }
    this.authStateService.updateAndPublishAuthState({
      isAuthenticated: false,
      validationResult: stateValidationResult.state,
      isRenewProcess
    });
  }
  static {
    this.ɵfac = function UserCallbackHandlerService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UserCallbackHandlerService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _UserCallbackHandlerService,
      factory: _UserCallbackHandlerService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserCallbackHandlerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var FlowsService = class _FlowsService {
  constructor() {
    this.codeFlowCallbackHandlerService = inject(CodeFlowCallbackHandlerService);
    this.implicitFlowCallbackHandlerService = inject(ImplicitFlowCallbackHandlerService);
    this.historyJwtKeysCallbackHandlerService = inject(HistoryJwtKeysCallbackHandlerService);
    this.userHandlerService = inject(UserCallbackHandlerService);
    this.stateValidationCallbackHandlerService = inject(StateValidationCallbackHandlerService);
    this.refreshSessionCallbackHandlerService = inject(RefreshSessionCallbackHandlerService);
    this.refreshTokenCallbackHandlerService = inject(RefreshTokenCallbackHandlerService);
  }
  processCodeFlowCallback(urlToCheck, config, allConfigs) {
    return this.codeFlowCallbackHandlerService.codeFlowCallback(urlToCheck, config).pipe(concatMap((callbackContext) => this.codeFlowCallbackHandlerService.codeFlowCodeRequest(callbackContext, config)), concatMap((callbackContext) => this.historyJwtKeysCallbackHandlerService.callbackHistoryAndResetJwtKeys(callbackContext, config, allConfigs)), concatMap((callbackContext) => this.stateValidationCallbackHandlerService.callbackStateValidation(callbackContext, config, allConfigs)), concatMap((callbackContext) => this.userHandlerService.callbackUser(callbackContext, config, allConfigs)));
  }
  processSilentRenewCodeFlowCallback(firstContext, config, allConfigs) {
    return this.codeFlowCallbackHandlerService.codeFlowCodeRequest(firstContext, config).pipe(concatMap((callbackContext) => this.historyJwtKeysCallbackHandlerService.callbackHistoryAndResetJwtKeys(callbackContext, config, allConfigs)), concatMap((callbackContext) => this.stateValidationCallbackHandlerService.callbackStateValidation(callbackContext, config, allConfigs)), concatMap((callbackContext) => this.userHandlerService.callbackUser(callbackContext, config, allConfigs)));
  }
  processImplicitFlowCallback(config, allConfigs, hash) {
    return this.implicitFlowCallbackHandlerService.implicitFlowCallback(config, allConfigs, hash).pipe(concatMap((callbackContext) => this.historyJwtKeysCallbackHandlerService.callbackHistoryAndResetJwtKeys(callbackContext, config, allConfigs)), concatMap((callbackContext) => this.stateValidationCallbackHandlerService.callbackStateValidation(callbackContext, config, allConfigs)), concatMap((callbackContext) => this.userHandlerService.callbackUser(callbackContext, config, allConfigs)));
  }
  processRefreshToken(config, allConfigs, customParamsRefresh) {
    return this.refreshSessionCallbackHandlerService.refreshSessionWithRefreshTokens(config).pipe(concatMap((callbackContext) => this.refreshTokenCallbackHandlerService.refreshTokensRequestTokens(callbackContext, config, customParamsRefresh)), concatMap((callbackContext) => this.historyJwtKeysCallbackHandlerService.callbackHistoryAndResetJwtKeys(callbackContext, config, allConfigs)), concatMap((callbackContext) => this.stateValidationCallbackHandlerService.callbackStateValidation(callbackContext, config, allConfigs)), concatMap((callbackContext) => this.userHandlerService.callbackUser(callbackContext, config, allConfigs)));
  }
  static {
    this.ɵfac = function FlowsService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FlowsService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _FlowsService,
      factory: _FlowsService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlowsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var IntervalService = class _IntervalService {
  constructor() {
    this.zone = inject(NgZone);
    this.document = inject(DOCUMENT);
    this.runTokenValidationRunning = null;
  }
  isTokenValidationRunning() {
    return Boolean(this.runTokenValidationRunning);
  }
  stopPeriodicTokenCheck() {
    if (this.runTokenValidationRunning) {
      this.runTokenValidationRunning.unsubscribe();
      this.runTokenValidationRunning = null;
    }
  }
  startPeriodicTokenCheck(repeatAfterSeconds) {
    const millisecondsDelayBetweenTokenCheck = repeatAfterSeconds * 1e3;
    return new Observable((subscriber) => {
      let intervalId;
      this.zone.runOutsideAngular(() => {
        intervalId = this.document?.defaultView?.setInterval(() => this.zone.run(() => subscriber.next()), millisecondsDelayBetweenTokenCheck);
      });
      return () => {
        clearInterval(intervalId);
      };
    });
  }
  static {
    this.ɵfac = function IntervalService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _IntervalService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _IntervalService,
      factory: _IntervalService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IntervalService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var CodeFlowCallbackService = class _CodeFlowCallbackService {
  constructor() {
    this.flowsService = inject(FlowsService);
    this.router = inject(Router);
    this.flowsDataService = inject(FlowsDataService);
    this.intervalService = inject(IntervalService);
  }
  authenticatedCallbackWithCode(urlToCheck, config, allConfigs) {
    const isRenewProcess = this.flowsDataService.isSilentRenewRunning(config);
    const {
      triggerAuthorizationResultEvent
    } = config;
    const postLoginRoute = config.postLoginRoute || "/";
    const unauthorizedRoute = config.unauthorizedRoute || "/";
    return this.flowsService.processCodeFlowCallback(urlToCheck, config, allConfigs).pipe(tap((callbackContext) => {
      this.flowsDataService.resetCodeFlowInProgress(config);
      if (!triggerAuthorizationResultEvent && !callbackContext.isRenewProcess) {
        this.router.navigateByUrl(postLoginRoute);
      }
    }), catchError((error) => {
      this.flowsDataService.resetSilentRenewRunning(config);
      this.flowsDataService.resetCodeFlowInProgress(config);
      this.intervalService.stopPeriodicTokenCheck();
      if (!triggerAuthorizationResultEvent && !isRenewProcess) {
        this.router.navigateByUrl(unauthorizedRoute);
      }
      return throwError(() => new Error(error));
    }));
  }
  static {
    this.ɵfac = function CodeFlowCallbackService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CodeFlowCallbackService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _CodeFlowCallbackService,
      factory: _CodeFlowCallbackService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CodeFlowCallbackService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ImplicitFlowCallbackService = class _ImplicitFlowCallbackService {
  constructor() {
    this.flowsService = inject(FlowsService);
    this.router = inject(Router);
    this.flowsDataService = inject(FlowsDataService);
    this.intervalService = inject(IntervalService);
  }
  authenticatedImplicitFlowCallback(config, allConfigs, hash) {
    const isRenewProcess = this.flowsDataService.isSilentRenewRunning(config);
    const triggerAuthorizationResultEvent = Boolean(config.triggerAuthorizationResultEvent);
    const postLoginRoute = config.postLoginRoute ?? "";
    const unauthorizedRoute = config.unauthorizedRoute ?? "";
    return this.flowsService.processImplicitFlowCallback(config, allConfigs, hash).pipe(tap((callbackContext) => {
      if (!triggerAuthorizationResultEvent && !callbackContext.isRenewProcess) {
        this.router.navigateByUrl(postLoginRoute);
      }
    }), catchError((error) => {
      this.flowsDataService.resetSilentRenewRunning(config);
      this.intervalService.stopPeriodicTokenCheck();
      if (!triggerAuthorizationResultEvent && !isRenewProcess) {
        this.router.navigateByUrl(unauthorizedRoute);
      }
      return throwError(() => new Error(error));
    }));
  }
  static {
    this.ɵfac = function ImplicitFlowCallbackService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ImplicitFlowCallbackService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ImplicitFlowCallbackService,
      factory: _ImplicitFlowCallbackService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ImplicitFlowCallbackService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var CallbackService = class _CallbackService {
  constructor() {
    this.urlService = inject(UrlService);
    this.flowHelper = inject(FlowHelper);
    this.implicitFlowCallbackService = inject(ImplicitFlowCallbackService);
    this.codeFlowCallbackService = inject(CodeFlowCallbackService);
    this.stsCallbackInternal$ = new Subject();
  }
  get stsCallback$() {
    return this.stsCallbackInternal$.asObservable();
  }
  isCallback(currentUrl, config) {
    if (!currentUrl) {
      return false;
    }
    return this.urlService.isCallbackFromSts(currentUrl, config);
  }
  handleCallbackAndFireEvents(currentCallbackUrl, config, allConfigs) {
    let callback$ = new Observable();
    if (this.flowHelper.isCurrentFlowCodeFlow(config)) {
      callback$ = this.codeFlowCallbackService.authenticatedCallbackWithCode(currentCallbackUrl, config, allConfigs);
    } else if (this.flowHelper.isCurrentFlowAnyImplicitFlow(config)) {
      if (currentCallbackUrl?.includes("#")) {
        const hash = currentCallbackUrl.substring(currentCallbackUrl.indexOf("#") + 1);
        callback$ = this.implicitFlowCallbackService.authenticatedImplicitFlowCallback(config, allConfigs, hash);
      } else {
        callback$ = this.implicitFlowCallbackService.authenticatedImplicitFlowCallback(config, allConfigs);
      }
    }
    return callback$.pipe(tap(() => this.stsCallbackInternal$.next()));
  }
  static {
    this.ɵfac = function CallbackService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CallbackService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _CallbackService,
      factory: _CallbackService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CallbackService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var PlatformProvider = class _PlatformProvider {
  constructor() {
    this.platformId = inject(PLATFORM_ID);
  }
  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }
  static {
    this.ɵfac = function PlatformProvider_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PlatformProvider)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _PlatformProvider,
      factory: _PlatformProvider.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlatformProvider, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var WELL_KNOWN_SUFFIX = `/.well-known/openid-configuration`;
var AuthWellKnownDataService = class _AuthWellKnownDataService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.http = inject(DataService);
  }
  getWellKnownEndPointsForConfig(config) {
    const {
      authWellknownEndpointUrl,
      authWellknownEndpoints = {}
    } = config;
    if (!authWellknownEndpointUrl) {
      const errorMessage = "no authWellknownEndpoint given!";
      this.loggerService.logError(config, errorMessage);
      return throwError(() => new Error(errorMessage));
    }
    return this.getWellKnownDocument(authWellknownEndpointUrl, config).pipe(map((wellKnownEndpoints) => ({
      issuer: wellKnownEndpoints.issuer,
      jwksUri: wellKnownEndpoints.jwks_uri,
      authorizationEndpoint: wellKnownEndpoints.authorization_endpoint,
      tokenEndpoint: wellKnownEndpoints.token_endpoint,
      userInfoEndpoint: wellKnownEndpoints.userinfo_endpoint,
      endSessionEndpoint: wellKnownEndpoints.end_session_endpoint,
      checkSessionIframe: wellKnownEndpoints.check_session_iframe,
      revocationEndpoint: wellKnownEndpoints.revocation_endpoint,
      introspectionEndpoint: wellKnownEndpoints.introspection_endpoint,
      parEndpoint: wellKnownEndpoints.pushed_authorization_request_endpoint
    })), map((mappedWellKnownEndpoints) => __spreadValues(__spreadValues({}, mappedWellKnownEndpoints), authWellknownEndpoints)));
  }
  getWellKnownDocument(wellKnownEndpoint, config) {
    let url = wellKnownEndpoint;
    const wellKnownSuffix = config.authWellknownUrlSuffix || WELL_KNOWN_SUFFIX;
    if (!wellKnownEndpoint.includes(wellKnownSuffix)) {
      url = `${wellKnownEndpoint}${wellKnownSuffix}`;
    }
    return this.http.get(url, config).pipe(retry(2));
  }
  static {
    this.ɵfac = function AuthWellKnownDataService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthWellKnownDataService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _AuthWellKnownDataService,
      factory: _AuthWellKnownDataService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthWellKnownDataService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var AuthWellKnownService = class _AuthWellKnownService {
  constructor() {
    this.dataService = inject(AuthWellKnownDataService);
    this.publicEventsService = inject(PublicEventsService);
    this.storagePersistenceService = inject(StoragePersistenceService);
  }
  storeWellKnownEndpoints(config, mappedWellKnownEndpoints) {
    this.storagePersistenceService.write("authWellKnownEndPoints", mappedWellKnownEndpoints, config);
  }
  queryAndStoreAuthWellKnownEndPoints(config) {
    if (!config) {
      return throwError(() => new Error("Please provide a configuration before setting up the module"));
    }
    return this.dataService.getWellKnownEndPointsForConfig(config).pipe(tap((mappedWellKnownEndpoints) => this.storeWellKnownEndpoints(config, mappedWellKnownEndpoints)), catchError((error) => {
      this.publicEventsService.fireEvent(EventTypes.ConfigLoadingFailed, null);
      return throwError(() => new Error(error));
    }));
  }
  static {
    this.ɵfac = function AuthWellKnownService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthWellKnownService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _AuthWellKnownService,
      factory: _AuthWellKnownService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthWellKnownService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var DEFAULT_CONFIG = {
  authority: "https://please_set",
  authWellknownEndpointUrl: "",
  authWellknownEndpoints: void 0,
  redirectUrl: "https://please_set",
  checkRedirectUrlWhenCheckingIfIsCallback: true,
  clientId: "please_set",
  responseType: "code",
  scope: "openid email profile",
  hdParam: "",
  postLogoutRedirectUri: "https://please_set",
  startCheckSession: false,
  silentRenew: false,
  silentRenewUrl: "https://please_set",
  silentRenewTimeoutInSeconds: 20,
  renewTimeBeforeTokenExpiresInSeconds: 0,
  useRefreshToken: false,
  usePushedAuthorisationRequests: false,
  ignoreNonceAfterRefresh: false,
  postLoginRoute: "/",
  forbiddenRoute: "/forbidden",
  unauthorizedRoute: "/unauthorized",
  autoUserInfo: true,
  autoCleanStateAfterAuthentication: true,
  triggerAuthorizationResultEvent: false,
  logLevel: LogLevel.Warn,
  issValidationOff: false,
  historyCleanupOff: false,
  maxIdTokenIatOffsetAllowedInSeconds: 120,
  disableIatOffsetValidation: false,
  customParamsAuthRequest: {},
  customParamsRefreshTokenRequest: {},
  customParamsEndSessionRequest: {},
  customParamsCodeRequest: {},
  disableRefreshIdTokenAuthTimeValidation: false,
  triggerRefreshWhenIdTokenExpired: true,
  tokenRefreshInSeconds: 4,
  refreshTokenRetryInSeconds: 3,
  ngswBypass: false
};
var POSITIVE_VALIDATION_RESULT = {
  result: true,
  messages: [],
  level: "none"
};
var ensureAuthority = (passedConfig) => {
  if (!passedConfig.authority) {
    return {
      result: false,
      messages: ["The authority URL MUST be provided in the configuration! "],
      level: "error"
    };
  }
  return POSITIVE_VALIDATION_RESULT;
};
var ensureClientId = (passedConfig) => {
  if (!passedConfig.clientId) {
    return {
      result: false,
      messages: ["The clientId is required and missing from your config!"],
      level: "error"
    };
  }
  return POSITIVE_VALIDATION_RESULT;
};
var createIdentifierToCheck = (passedConfig) => {
  if (!passedConfig) {
    return "";
  }
  const {
    authority,
    clientId,
    scope
  } = passedConfig;
  return `${authority}${clientId}${scope}`;
};
var arrayHasDuplicates = (array) => new Set(array).size !== array.length;
var ensureNoDuplicatedConfigsRule = (passedConfigs) => {
  const allIdentifiers = passedConfigs.map((x) => createIdentifierToCheck(x));
  const someAreNotSet = allIdentifiers.some((x) => x === "");
  if (someAreNotSet) {
    return {
      result: false,
      messages: [`Please make sure you add an object with a 'config' property: ....({ config }) instead of ...(config)`],
      level: "error"
    };
  }
  const hasDuplicates = arrayHasDuplicates(allIdentifiers);
  if (hasDuplicates) {
    return {
      result: false,
      messages: ["You added multiple configs with the same authority, clientId and scope"],
      level: "warning"
    };
  }
  return POSITIVE_VALIDATION_RESULT;
};
var ensureRedirectRule = (passedConfig) => {
  if (!passedConfig.redirectUrl) {
    return {
      result: false,
      messages: ["The redirectUrl is required and missing from your config"],
      level: "error"
    };
  }
  return POSITIVE_VALIDATION_RESULT;
};
var ensureSilentRenewUrlWhenNoRefreshTokenUsed = (passedConfig) => {
  const usesSilentRenew = passedConfig.silentRenew;
  const usesRefreshToken = passedConfig.useRefreshToken;
  const hasSilentRenewUrl = passedConfig.silentRenewUrl;
  if (usesSilentRenew && !usesRefreshToken && !hasSilentRenewUrl) {
    return {
      result: false,
      messages: ["Please provide a silent renew URL if using renew and not refresh tokens"],
      level: "error"
    };
  }
  return POSITIVE_VALIDATION_RESULT;
};
var useOfflineScopeWithSilentRenew = (passedConfig) => {
  const hasRefreshToken = passedConfig.useRefreshToken;
  const hasSilentRenew = passedConfig.silentRenew;
  const scope = passedConfig.scope || "";
  const hasOfflineScope = scope.split(" ").includes("offline_access");
  if (hasRefreshToken && hasSilentRenew && !hasOfflineScope) {
    return {
      result: false,
      messages: ["When using silent renew and refresh tokens please set the `offline_access` scope"],
      level: "warning"
    };
  }
  return POSITIVE_VALIDATION_RESULT;
};
var allRules = [ensureAuthority, useOfflineScopeWithSilentRenew, ensureRedirectRule, ensureClientId, ensureSilentRenewUrlWhenNoRefreshTokenUsed];
var allMultipleConfigRules = [ensureNoDuplicatedConfigsRule];
var ConfigValidationService = class _ConfigValidationService {
  constructor() {
    this.loggerService = inject(LoggerService);
  }
  validateConfigs(passedConfigs) {
    return this.validateConfigsInternal(passedConfigs ?? [], allMultipleConfigRules);
  }
  validateConfig(passedConfig) {
    return this.validateConfigInternal(passedConfig, allRules);
  }
  validateConfigsInternal(passedConfigs, allRulesToUse) {
    if (passedConfigs.length === 0) {
      return false;
    }
    const allValidationResults = allRulesToUse.map((rule) => rule(passedConfigs));
    let overallErrorCount = 0;
    passedConfigs.forEach((passedConfig) => {
      const errorCount = this.processValidationResultsAndGetErrorCount(allValidationResults, passedConfig);
      overallErrorCount += errorCount;
    });
    return overallErrorCount === 0;
  }
  validateConfigInternal(passedConfig, allRulesToUse) {
    const allValidationResults = allRulesToUse.map((rule) => rule(passedConfig));
    const errorCount = this.processValidationResultsAndGetErrorCount(allValidationResults, passedConfig);
    return errorCount === 0;
  }
  processValidationResultsAndGetErrorCount(allValidationResults, config) {
    const allMessages = allValidationResults.filter((x) => x.messages.length > 0);
    const allErrorMessages = this.getAllMessagesOfType("error", allMessages);
    const allWarnings = this.getAllMessagesOfType("warning", allMessages);
    allErrorMessages.forEach((message) => this.loggerService.logError(config, message));
    allWarnings.forEach((message) => this.loggerService.logWarning(config, message));
    return allErrorMessages.length;
  }
  getAllMessagesOfType(type, results) {
    const allMessages = results.filter((x) => x.level === type).map((result) => result.messages);
    return allMessages.reduce((acc, val) => acc.concat(val), []);
  }
  static {
    this.ɵfac = function ConfigValidationService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ConfigValidationService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ConfigValidationService,
      factory: _ConfigValidationService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfigValidationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ConfigurationService = class _ConfigurationService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.publicEventsService = inject(PublicEventsService);
    this.storagePersistenceService = inject(StoragePersistenceService);
    this.platformProvider = inject(PlatformProvider);
    this.authWellKnownService = inject(AuthWellKnownService);
    this.loader = inject(StsConfigLoader);
    this.configValidationService = inject(ConfigValidationService);
    this.configsInternal = {};
  }
  hasManyConfigs() {
    return Object.keys(this.configsInternal).length > 1;
  }
  getAllConfigurations() {
    return Object.values(this.configsInternal);
  }
  getOpenIDConfiguration(configId) {
    if (this.configsAlreadySaved()) {
      return of(this.getConfig(configId));
    }
    return this.getOpenIDConfigurations(configId).pipe(map((result) => result.currentConfig));
  }
  getOpenIDConfigurations(configId) {
    return this.loadConfigs().pipe(concatMap((allConfigs) => this.prepareAndSaveConfigs(allConfigs)), map((allPreparedConfigs) => ({
      allConfigs: allPreparedConfigs,
      currentConfig: this.getConfig(configId)
    })));
  }
  hasAtLeastOneConfig() {
    return Object.keys(this.configsInternal).length > 0;
  }
  saveConfig(readyConfig) {
    const {
      configId
    } = readyConfig;
    this.configsInternal[configId] = readyConfig;
  }
  loadConfigs() {
    return this.loader.loadConfigs();
  }
  configsAlreadySaved() {
    return this.hasAtLeastOneConfig();
  }
  getConfig(configId) {
    if (Boolean(configId)) {
      const config = this.configsInternal[configId];
      if (!config && isDevMode()) {
        console.warn(`[angular-auth-oidc-client] No configuration found for config id '${configId}'.`);
      }
      return config || null;
    }
    const [, value] = Object.entries(this.configsInternal)[0] || [[null, null]];
    return value || null;
  }
  prepareAndSaveConfigs(passedConfigs) {
    if (!this.configValidationService.validateConfigs(passedConfigs)) {
      return of([]);
    }
    this.createUniqueIds(passedConfigs);
    const allHandleConfigs$ = passedConfigs.map((x) => this.handleConfig(x));
    const as = forkJoin(allHandleConfigs$).pipe(map((config) => config.filter((conf) => Boolean(conf))), map((c) => c));
    return as;
  }
  createUniqueIds(passedConfigs) {
    passedConfigs.forEach((config, index) => {
      if (!config.configId) {
        config.configId = `${index}-${config.clientId}`;
      }
    });
  }
  handleConfig(passedConfig) {
    if (!this.configValidationService.validateConfig(passedConfig)) {
      this.loggerService.logError(passedConfig, "Validation of config rejected with errors. Config is NOT set.");
      return of(null);
    }
    if (!passedConfig.authWellknownEndpointUrl) {
      passedConfig.authWellknownEndpointUrl = passedConfig.authority;
    }
    const usedConfig = this.prepareConfig(passedConfig);
    this.saveConfig(usedConfig);
    const configWithAuthWellKnown = this.enhanceConfigWithWellKnownEndpoint(usedConfig);
    this.publicEventsService.fireEvent(EventTypes.ConfigLoaded, configWithAuthWellKnown);
    return of(usedConfig);
  }
  enhanceConfigWithWellKnownEndpoint(configuration) {
    const alreadyExistingAuthWellKnownEndpoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
    if (!!alreadyExistingAuthWellKnownEndpoints) {
      configuration.authWellknownEndpoints = alreadyExistingAuthWellKnownEndpoints;
      return configuration;
    }
    const passedAuthWellKnownEndpoints = configuration.authWellknownEndpoints;
    if (!!passedAuthWellKnownEndpoints) {
      this.authWellKnownService.storeWellKnownEndpoints(configuration, passedAuthWellKnownEndpoints);
      configuration.authWellknownEndpoints = passedAuthWellKnownEndpoints;
      return configuration;
    }
    return configuration;
  }
  prepareConfig(configuration) {
    const openIdConfigurationInternal = __spreadValues(__spreadValues({}, DEFAULT_CONFIG), configuration);
    this.setSpecialCases(openIdConfigurationInternal);
    return openIdConfigurationInternal;
  }
  setSpecialCases(currentConfig) {
    if (!this.platformProvider.isBrowser()) {
      currentConfig.startCheckSession = false;
      currentConfig.silentRenew = false;
      currentConfig.useRefreshToken = false;
      currentConfig.usePushedAuthorisationRequests = false;
    }
  }
  static {
    this.ɵfac = function ConfigurationService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ConfigurationService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ConfigurationService,
      factory: _ConfigurationService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfigurationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var IFrameService = class _IFrameService {
  constructor() {
    this.document = inject(DOCUMENT);
    this.loggerService = inject(LoggerService);
  }
  getExistingIFrame(identifier) {
    const iFrameOnParent = this.getIFrameFromParentWindow(identifier);
    if (this.isIFrameElement(iFrameOnParent)) {
      return iFrameOnParent;
    }
    const iFrameOnSelf = this.getIFrameFromWindow(identifier);
    if (this.isIFrameElement(iFrameOnSelf)) {
      return iFrameOnSelf;
    }
    return null;
  }
  addIFrameToWindowBody(identifier, config) {
    const sessionIframe = this.document.createElement("iframe");
    sessionIframe.id = identifier;
    sessionIframe.title = identifier;
    this.loggerService.logDebug(config, sessionIframe);
    sessionIframe.style.display = "none";
    this.document.body.appendChild(sessionIframe);
    return sessionIframe;
  }
  getIFrameFromParentWindow(identifier) {
    try {
      const iFrameElement = this.document.defaultView?.parent.document.getElementById(identifier);
      if (this.isIFrameElement(iFrameElement)) {
        return iFrameElement;
      }
      return null;
    } catch (e) {
      return null;
    }
  }
  getIFrameFromWindow(identifier) {
    const iFrameElement = this.document.getElementById(identifier);
    if (this.isIFrameElement(iFrameElement)) {
      return iFrameElement;
    }
    return null;
  }
  isIFrameElement(element) {
    return !!element && element instanceof HTMLIFrameElement;
  }
  static {
    this.ɵfac = function IFrameService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _IFrameService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _IFrameService,
      factory: _IFrameService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IFrameService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var IFRAME_FOR_SILENT_RENEW_IDENTIFIER = "myiFrameForSilentRenew";
var SilentRenewService = class _SilentRenewService {
  constructor() {
    this.refreshSessionWithIFrameCompletedInternal$ = new Subject();
    this.loggerService = inject(LoggerService);
    this.iFrameService = inject(IFrameService);
    this.flowsService = inject(FlowsService);
    this.resetAuthDataService = inject(ResetAuthDataService);
    this.flowsDataService = inject(FlowsDataService);
    this.authStateService = inject(AuthStateService);
    this.flowHelper = inject(FlowHelper);
    this.implicitFlowCallbackService = inject(ImplicitFlowCallbackService);
    this.intervalService = inject(IntervalService);
  }
  get refreshSessionWithIFrameCompleted$() {
    return this.refreshSessionWithIFrameCompletedInternal$.asObservable();
  }
  getOrCreateIframe(config) {
    const existingIframe = this.getExistingIframe();
    if (!existingIframe) {
      return this.iFrameService.addIFrameToWindowBody(IFRAME_FOR_SILENT_RENEW_IDENTIFIER, config);
    }
    return existingIframe;
  }
  isSilentRenewConfigured(configuration) {
    const {
      useRefreshToken,
      silentRenew
    } = configuration;
    return !useRefreshToken && Boolean(silentRenew);
  }
  codeFlowCallbackSilentRenewIframe(urlParts, config, allConfigs) {
    const params = new HttpParams({
      fromString: urlParts[1]
    });
    const errorParam = params.get("error");
    if (errorParam) {
      this.authStateService.updateAndPublishAuthState({
        isAuthenticated: false,
        validationResult: ValidationResult.LoginRequired,
        isRenewProcess: true
      });
      this.resetAuthDataService.resetAuthorizationData(config, allConfigs);
      this.flowsDataService.setNonce("", config);
      this.intervalService.stopPeriodicTokenCheck();
      return throwError(() => new Error(errorParam));
    }
    const code = params.get("code") ?? "";
    const state = params.get("state") ?? "";
    const sessionState = params.get("session_state");
    const callbackContext = {
      code,
      refreshToken: "",
      state,
      sessionState,
      authResult: null,
      isRenewProcess: true,
      jwtKeys: null,
      validationResult: null,
      existingIdToken: null
    };
    return this.flowsService.processSilentRenewCodeFlowCallback(callbackContext, config, allConfigs).pipe(catchError((error) => {
      this.intervalService.stopPeriodicTokenCheck();
      this.resetAuthDataService.resetAuthorizationData(config, allConfigs);
      return throwError(() => new Error(error));
    }));
  }
  silentRenewEventHandler(e, config, allConfigs) {
    this.loggerService.logDebug(config, "silentRenewEventHandler");
    if (!e.detail) {
      return;
    }
    let callback$;
    const isCodeFlow = this.flowHelper.isCurrentFlowCodeFlow(config);
    if (isCodeFlow) {
      const urlParts = e.detail.toString().split("?");
      callback$ = this.codeFlowCallbackSilentRenewIframe(urlParts, config, allConfigs);
    } else {
      callback$ = this.implicitFlowCallbackService.authenticatedImplicitFlowCallback(config, allConfigs, e.detail);
    }
    callback$.subscribe({
      next: (callbackContext) => {
        this.refreshSessionWithIFrameCompletedInternal$.next(callbackContext);
        this.flowsDataService.resetSilentRenewRunning(config);
      },
      error: (err) => {
        this.loggerService.logError(config, "Error: " + err);
        this.refreshSessionWithIFrameCompletedInternal$.next(null);
        this.flowsDataService.resetSilentRenewRunning(config);
      }
    });
  }
  getExistingIframe() {
    return this.iFrameService.getExistingIFrame(IFRAME_FOR_SILENT_RENEW_IDENTIFIER);
  }
  static {
    this.ɵfac = function SilentRenewService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SilentRenewService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _SilentRenewService,
      factory: _SilentRenewService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SilentRenewService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var RefreshSessionIframeService = class _RefreshSessionIframeService {
  constructor() {
    this.renderer = inject(RendererFactory2).createRenderer(null, null);
    this.loggerService = inject(LoggerService);
    this.urlService = inject(UrlService);
    this.silentRenewService = inject(SilentRenewService);
    this.document = inject(DOCUMENT);
  }
  refreshSessionWithIframe(config, allConfigs, customParams) {
    this.loggerService.logDebug(config, "BEGIN refresh session Authorize Iframe renew");
    return this.urlService.getRefreshSessionSilentRenewUrl(config, customParams).pipe(switchMap((url) => {
      return this.sendAuthorizeRequestUsingSilentRenew(url, config, allConfigs);
    }));
  }
  sendAuthorizeRequestUsingSilentRenew(url, config, allConfigs) {
    const sessionIframe = this.silentRenewService.getOrCreateIframe(config);
    this.initSilentRenewRequest(config, allConfigs);
    this.loggerService.logDebug(config, `sendAuthorizeRequestUsingSilentRenew for URL: ${url}`);
    return new Observable((observer) => {
      const onLoadHandler = () => {
        sessionIframe.removeEventListener("load", onLoadHandler);
        this.loggerService.logDebug(config, "removed event listener from IFrame");
        observer.next(true);
        observer.complete();
      };
      sessionIframe.addEventListener("load", onLoadHandler);
      sessionIframe.contentWindow?.location.replace(url ?? "");
    });
  }
  initSilentRenewRequest(config, allConfigs) {
    const instanceId = Math.random();
    const initDestroyHandler = this.renderer.listen("window", "oidc-silent-renew-init", (e) => {
      if (e.detail !== instanceId) {
        initDestroyHandler();
        renewDestroyHandler();
      }
    });
    const renewDestroyHandler = this.renderer.listen("window", "oidc-silent-renew-message", (e) => this.silentRenewService.silentRenewEventHandler(e, config, allConfigs));
    this.document.defaultView?.dispatchEvent(new CustomEvent("oidc-silent-renew-init", {
      detail: instanceId
    }));
  }
  static {
    this.ɵfac = function RefreshSessionIframeService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RefreshSessionIframeService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _RefreshSessionIframeService,
      factory: _RefreshSessionIframeService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RefreshSessionIframeService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var RefreshSessionRefreshTokenService = class _RefreshSessionRefreshTokenService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.resetAuthDataService = inject(ResetAuthDataService);
    this.flowsService = inject(FlowsService);
    this.intervalService = inject(IntervalService);
  }
  refreshSessionWithRefreshTokens(config, allConfigs, customParamsRefresh) {
    this.loggerService.logDebug(config, "BEGIN refresh session Authorize");
    let refreshTokenFailed = false;
    return this.flowsService.processRefreshToken(config, allConfigs, customParamsRefresh).pipe(catchError((error) => {
      this.resetAuthDataService.resetAuthorizationData(config, allConfigs);
      refreshTokenFailed = true;
      return throwError(() => new Error(error));
    }), finalize(() => refreshTokenFailed && this.intervalService.stopPeriodicTokenCheck()));
  }
  static {
    this.ɵfac = function RefreshSessionRefreshTokenService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RefreshSessionRefreshTokenService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _RefreshSessionRefreshTokenService,
      factory: _RefreshSessionRefreshTokenService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RefreshSessionRefreshTokenService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var PeriodicallyTokenCheckService = class _PeriodicallyTokenCheckService {
  constructor() {
    this.resetAuthDataService = inject(ResetAuthDataService);
    this.flowHelper = inject(FlowHelper);
    this.flowsDataService = inject(FlowsDataService);
    this.loggerService = inject(LoggerService);
    this.userService = inject(UserService);
    this.authStateService = inject(AuthStateService);
    this.refreshSessionIframeService = inject(RefreshSessionIframeService);
    this.refreshSessionRefreshTokenService = inject(RefreshSessionRefreshTokenService);
    this.intervalService = inject(IntervalService);
    this.storagePersistenceService = inject(StoragePersistenceService);
    this.publicEventsService = inject(PublicEventsService);
    this.configurationService = inject(ConfigurationService);
  }
  startTokenValidationPeriodically(allConfigs, currentConfig) {
    const configsWithSilentRenewEnabled = this.getConfigsWithSilentRenewEnabled(allConfigs);
    if (configsWithSilentRenewEnabled.length <= 0) {
      return;
    }
    if (this.intervalService.isTokenValidationRunning()) {
      return;
    }
    const refreshTimeInSeconds = this.getSmallestRefreshTimeFromConfigs(configsWithSilentRenewEnabled);
    const periodicallyCheck$ = this.intervalService.startPeriodicTokenCheck(refreshTimeInSeconds).pipe(switchMap(() => {
      const objectWithConfigIdsAndRefreshEvent = {};
      configsWithSilentRenewEnabled.forEach((config) => {
        const identifier = config.configId;
        const refreshEvent = this.getRefreshEvent(config, allConfigs);
        objectWithConfigIdsAndRefreshEvent[identifier] = refreshEvent;
      });
      return forkJoin(objectWithConfigIdsAndRefreshEvent);
    }));
    this.intervalService.runTokenValidationRunning = periodicallyCheck$.pipe(catchError((error) => throwError(() => new Error(error)))).subscribe({
      next: (objectWithConfigIds) => {
        for (const [configId, _] of Object.entries(objectWithConfigIds)) {
          this.configurationService.getOpenIDConfiguration(configId).subscribe((config) => {
            this.loggerService.logDebug(config, "silent renew, periodic check finished!");
            if (this.flowHelper.isCurrentFlowCodeFlowWithRefreshTokens(config)) {
              this.flowsDataService.resetSilentRenewRunning(config);
            }
          });
        }
      },
      error: (error) => {
        this.loggerService.logError(currentConfig, "silent renew failed!", error);
      }
    });
  }
  getRefreshEvent(config, allConfigs) {
    const shouldStartRefreshEvent = this.shouldStartPeriodicallyCheckForConfig(config);
    if (!shouldStartRefreshEvent) {
      return of(null);
    }
    const refreshEvent$ = this.createRefreshEventForConfig(config, allConfigs);
    this.publicEventsService.fireEvent(EventTypes.SilentRenewStarted);
    return refreshEvent$.pipe(catchError((error) => {
      this.loggerService.logError(config, "silent renew failed!", error);
      this.publicEventsService.fireEvent(EventTypes.SilentRenewFailed, error);
      this.flowsDataService.resetSilentRenewRunning(config);
      return throwError(() => new Error(error));
    }));
  }
  getSmallestRefreshTimeFromConfigs(configsWithSilentRenewEnabled) {
    const result = configsWithSilentRenewEnabled.reduce((prev, curr) => (prev.tokenRefreshInSeconds ?? 0) < (curr.tokenRefreshInSeconds ?? 0) ? prev : curr);
    return result.tokenRefreshInSeconds ?? 0;
  }
  getConfigsWithSilentRenewEnabled(allConfigs) {
    return allConfigs.filter((x) => x.silentRenew);
  }
  createRefreshEventForConfig(configuration, allConfigs) {
    this.loggerService.logDebug(configuration, "starting silent renew...");
    return this.configurationService.getOpenIDConfiguration(configuration.configId).pipe(switchMap((config) => {
      if (!config?.silentRenew) {
        this.resetAuthDataService.resetAuthorizationData(config, allConfigs);
        return of(null);
      }
      this.flowsDataService.setSilentRenewRunning(config);
      if (this.flowHelper.isCurrentFlowCodeFlowWithRefreshTokens(config)) {
        const customParamsRefresh = this.storagePersistenceService.read("storageCustomParamsRefresh", config) || {};
        const {
          customParamsRefreshTokenRequest
        } = config;
        const mergedParams = __spreadValues(__spreadValues({}, customParamsRefreshTokenRequest), customParamsRefresh);
        return this.refreshSessionRefreshTokenService.refreshSessionWithRefreshTokens(config, allConfigs, mergedParams);
      }
      const customParams = this.storagePersistenceService.read("storageCustomParamsAuthRequest", config);
      return this.refreshSessionIframeService.refreshSessionWithIframe(config, allConfigs, customParams);
    }));
  }
  shouldStartPeriodicallyCheckForConfig(config) {
    const idToken = this.authStateService.getIdToken(config);
    const isSilentRenewRunning = this.flowsDataService.isSilentRenewRunning(config);
    const isCodeFlowInProgress = this.flowsDataService.isCodeFlowInProgress(config);
    const userDataFromStore = this.userService.getUserDataFromStore(config);
    this.loggerService.logDebug(config, `Checking: silentRenewRunning: ${isSilentRenewRunning}, isCodeFlowInProgress: ${isCodeFlowInProgress} - has idToken: ${!!idToken} - has userData: ${!!userDataFromStore}`);
    const shouldBeExecuted = !!userDataFromStore && !isSilentRenewRunning && !!idToken && !isCodeFlowInProgress;
    if (!shouldBeExecuted) {
      return false;
    }
    const idTokenExpired = this.authStateService.hasIdTokenExpiredAndRenewCheckIsEnabled(config);
    const accessTokenExpired = this.authStateService.hasAccessTokenExpiredIfExpiryExists(config);
    return idTokenExpired || accessTokenExpired;
  }
  static {
    this.ɵfac = function PeriodicallyTokenCheckService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PeriodicallyTokenCheckService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _PeriodicallyTokenCheckService,
      factory: _PeriodicallyTokenCheckService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PeriodicallyTokenCheckService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var MAX_RETRY_ATTEMPTS = 3;
var RefreshSessionService = class _RefreshSessionService {
  constructor() {
    this.flowHelper = inject(FlowHelper);
    this.flowsDataService = inject(FlowsDataService);
    this.loggerService = inject(LoggerService);
    this.silentRenewService = inject(SilentRenewService);
    this.authStateService = inject(AuthStateService);
    this.authWellKnownService = inject(AuthWellKnownService);
    this.refreshSessionIframeService = inject(RefreshSessionIframeService);
    this.storagePersistenceService = inject(StoragePersistenceService);
    this.refreshSessionRefreshTokenService = inject(RefreshSessionRefreshTokenService);
    this.userService = inject(UserService);
  }
  userForceRefreshSession(config, allConfigs, extraCustomParams) {
    if (!config) {
      return throwError(() => new Error("Please provide a configuration before setting up the module"));
    }
    this.persistCustomParams(extraCustomParams, config);
    return this.forceRefreshSession(config, allConfigs, extraCustomParams).pipe(tap(() => this.flowsDataService.resetSilentRenewRunning(config)));
  }
  forceRefreshSession(config, allConfigs, extraCustomParams) {
    const {
      customParamsRefreshTokenRequest,
      configId
    } = config;
    const mergedParams = __spreadValues(__spreadValues({}, customParamsRefreshTokenRequest), extraCustomParams);
    if (this.flowHelper.isCurrentFlowCodeFlowWithRefreshTokens(config)) {
      return this.startRefreshSession(config, allConfigs, mergedParams).pipe(map(() => {
        const isAuthenticated = this.authStateService.areAuthStorageTokensValid(config);
        if (isAuthenticated) {
          return {
            idToken: this.authStateService.getIdToken(config),
            accessToken: this.authStateService.getAccessToken(config),
            userData: this.userService.getUserDataFromStore(config),
            isAuthenticated,
            configId
          };
        }
        return {
          isAuthenticated: false,
          errorMessage: "",
          userData: null,
          idToken: "",
          accessToken: "",
          configId
        };
      }));
    }
    const {
      silentRenewTimeoutInSeconds
    } = config;
    const timeOutTime = (silentRenewTimeoutInSeconds ?? 0) * 1e3;
    return forkJoin([this.startRefreshSession(config, allConfigs, extraCustomParams), this.silentRenewService.refreshSessionWithIFrameCompleted$.pipe(take(1))]).pipe(timeout(timeOutTime), retryWhen((errors) => {
      return errors.pipe(mergeMap((error, index) => {
        const scalingDuration = 1e3;
        const currentAttempt = index + 1;
        if (!(error instanceof TimeoutError) || currentAttempt > MAX_RETRY_ATTEMPTS) {
          return throwError(() => new Error(error));
        }
        this.loggerService.logDebug(config, `forceRefreshSession timeout. Attempt #${currentAttempt}`);
        this.flowsDataService.resetSilentRenewRunning(config);
        return timer(currentAttempt * scalingDuration);
      }));
    }), map(([_, callbackContext]) => {
      const isAuthenticated = this.authStateService.areAuthStorageTokensValid(config);
      if (isAuthenticated) {
        return {
          idToken: callbackContext?.authResult?.id_token ?? "",
          accessToken: callbackContext?.authResult?.access_token ?? "",
          userData: this.userService.getUserDataFromStore(config),
          isAuthenticated,
          configId
        };
      }
      return {
        isAuthenticated: false,
        errorMessage: "",
        userData: null,
        idToken: "",
        accessToken: "",
        configId
      };
    }));
  }
  persistCustomParams(extraCustomParams, config) {
    const {
      useRefreshToken
    } = config;
    if (extraCustomParams) {
      if (useRefreshToken) {
        this.storagePersistenceService.write("storageCustomParamsRefresh", extraCustomParams, config);
      } else {
        this.storagePersistenceService.write("storageCustomParamsAuthRequest", extraCustomParams, config);
      }
    }
  }
  startRefreshSession(config, allConfigs, extraCustomParams) {
    const isSilentRenewRunning = this.flowsDataService.isSilentRenewRunning(config);
    this.loggerService.logDebug(config, `Checking: silentRenewRunning: ${isSilentRenewRunning}`);
    const shouldBeExecuted = !isSilentRenewRunning;
    if (!shouldBeExecuted) {
      return of(null);
    }
    return this.authWellKnownService.queryAndStoreAuthWellKnownEndPoints(config).pipe(switchMap(() => {
      this.flowsDataService.setSilentRenewRunning(config);
      if (this.flowHelper.isCurrentFlowCodeFlowWithRefreshTokens(config)) {
        return this.refreshSessionRefreshTokenService.refreshSessionWithRefreshTokens(config, allConfigs, extraCustomParams);
      }
      return this.refreshSessionIframeService.refreshSessionWithIframe(config, allConfigs, extraCustomParams);
    }));
  }
  static {
    this.ɵfac = function RefreshSessionService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RefreshSessionService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _RefreshSessionService,
      factory: _RefreshSessionService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RefreshSessionService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var IFRAME_FOR_CHECK_SESSION_IDENTIFIER = "myiFrameForCheckSession";
var CheckSessionService = class _CheckSessionService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.storagePersistenceService = inject(StoragePersistenceService);
    this.iFrameService = inject(IFrameService);
    this.eventService = inject(PublicEventsService);
    this.zone = inject(NgZone);
    this.document = inject(DOCUMENT);
    this.checkSessionReceived = false;
    this.scheduledHeartBeatRunning = null;
    this.lastIFrameRefresh = 0;
    this.outstandingMessages = 0;
    this.heartBeatInterval = 3e3;
    this.iframeRefreshInterval = 6e4;
    this.checkSessionChangedInternal$ = new BehaviorSubject(false);
  }
  get checkSessionChanged$() {
    return this.checkSessionChangedInternal$.asObservable();
  }
  ngOnDestroy() {
    this.stop();
    const windowAsDefaultView = this.document.defaultView;
    if (windowAsDefaultView && this.iframeMessageEventListener) {
      windowAsDefaultView.removeEventListener("message", this.iframeMessageEventListener, false);
    }
  }
  isCheckSessionConfigured(configuration) {
    const {
      startCheckSession
    } = configuration;
    return Boolean(startCheckSession);
  }
  start(configuration) {
    if (!!this.scheduledHeartBeatRunning) {
      return;
    }
    const {
      clientId
    } = configuration;
    this.pollServerSession(clientId, configuration);
  }
  stop() {
    if (!this.scheduledHeartBeatRunning) {
      return;
    }
    this.clearScheduledHeartBeat();
    this.checkSessionReceived = false;
  }
  serverStateChanged(configuration) {
    const {
      startCheckSession
    } = configuration;
    return Boolean(startCheckSession) && this.checkSessionReceived;
  }
  getExistingIframe() {
    return this.iFrameService.getExistingIFrame(IFRAME_FOR_CHECK_SESSION_IDENTIFIER);
  }
  init(configuration) {
    if (this.lastIFrameRefresh + this.iframeRefreshInterval > Date.now()) {
      return of(void 0);
    }
    const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
    if (!authWellKnownEndPoints) {
      this.loggerService.logWarning(configuration, "CheckSession - init check session: authWellKnownEndpoints is undefined. Returning.");
      return of();
    }
    const existingIframe = this.getOrCreateIframe(configuration);
    this.bindMessageEventToIframe(configuration);
    const checkSessionIframe = authWellKnownEndPoints.checkSessionIframe;
    const contentWindow = existingIframe.contentWindow;
    if (!checkSessionIframe) {
      this.loggerService.logWarning(configuration, "CheckSession - init check session: checkSessionIframe is not configured to run");
    }
    if (!contentWindow) {
      this.loggerService.logWarning(configuration, "CheckSession - init check session: IFrame contentWindow does not exist");
    } else {
      contentWindow.location.replace(checkSessionIframe);
    }
    return new Observable((observer) => {
      existingIframe.onload = () => {
        this.lastIFrameRefresh = Date.now();
        observer.next();
        observer.complete();
      };
    });
  }
  pollServerSession(clientId, configuration) {
    this.outstandingMessages = 0;
    const pollServerSessionRecur = () => {
      this.init(configuration).pipe(take(1)).subscribe(() => {
        const existingIframe = this.getExistingIframe();
        if (existingIframe && clientId) {
          this.loggerService.logDebug(configuration, `CheckSession - clientId : '${clientId}' - existingIframe: '${existingIframe}'`);
          const sessionState = this.storagePersistenceService.read("session_state", configuration);
          const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
          const contentWindow = existingIframe.contentWindow;
          if (sessionState && authWellKnownEndPoints?.checkSessionIframe && contentWindow) {
            const iframeOrigin = new URL(authWellKnownEndPoints.checkSessionIframe)?.origin;
            this.outstandingMessages++;
            contentWindow.postMessage(clientId + " " + sessionState, iframeOrigin);
          } else {
            this.loggerService.logDebug(configuration, `CheckSession - session_state is '${sessionState}' - AuthWellKnownEndPoints is '${JSON.stringify(authWellKnownEndPoints, null, 2)}'`);
            this.checkSessionChangedInternal$.next(true);
          }
        } else {
          this.loggerService.logWarning(configuration, `CheckSession - OidcSecurityCheckSession pollServerSession checkSession IFrame does not exist:
               clientId : '${clientId}' - existingIframe: '${existingIframe}'`);
        }
        if (this.outstandingMessages > 3) {
          this.loggerService.logError(configuration, `CheckSession - OidcSecurityCheckSession not receiving check session response messages.
                            Outstanding messages: '${this.outstandingMessages}'. Server unreachable?`);
        }
        this.zone.runOutsideAngular(() => {
          this.scheduledHeartBeatRunning = this.document?.defaultView?.setTimeout(() => this.zone.run(pollServerSessionRecur), this.heartBeatInterval) ?? null;
        });
      });
    };
    pollServerSessionRecur();
  }
  clearScheduledHeartBeat() {
    if (this.scheduledHeartBeatRunning !== null) {
      clearTimeout(this.scheduledHeartBeatRunning);
      this.scheduledHeartBeatRunning = null;
    }
  }
  messageHandler(configuration, e) {
    const existingIFrame = this.getExistingIframe();
    const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
    const startsWith = !!authWellKnownEndPoints?.checkSessionIframe?.startsWith(e.origin);
    this.outstandingMessages = 0;
    if (existingIFrame && startsWith && e.source === existingIFrame.contentWindow) {
      if (e.data === "error") {
        this.loggerService.logWarning(configuration, "CheckSession - error from check session messageHandler");
      } else if (e.data === "changed") {
        this.loggerService.logDebug(configuration, `CheckSession - ${e} from check session messageHandler`);
        this.checkSessionReceived = true;
        this.eventService.fireEvent(EventTypes.CheckSessionReceived, e.data);
        this.checkSessionChangedInternal$.next(true);
      } else {
        this.eventService.fireEvent(EventTypes.CheckSessionReceived, e.data);
        this.loggerService.logDebug(configuration, `CheckSession - ${e.data} from check session messageHandler`);
      }
    }
  }
  bindMessageEventToIframe(configuration) {
    this.iframeMessageEventListener = this.messageHandler.bind(this, configuration);
    const defaultView = this.document.defaultView;
    if (defaultView) {
      defaultView.addEventListener("message", this.iframeMessageEventListener, false);
    }
  }
  getOrCreateIframe(configuration) {
    return this.getExistingIframe() || this.iFrameService.addIFrameToWindowBody(IFRAME_FOR_CHECK_SESSION_IDENTIFIER, configuration);
  }
  static {
    this.ɵfac = function CheckSessionService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CheckSessionService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _CheckSessionService,
      factory: _CheckSessionService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckSessionService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var PopUpService = class _PopUpService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.storagePersistenceService = inject(StoragePersistenceService);
    this.document = inject(DOCUMENT);
    this.STORAGE_IDENTIFIER = "popupauth";
    this.popUp = null;
    this.handle = -1;
    this.resultInternal$ = new Subject();
  }
  get result$() {
    return this.resultInternal$.asObservable();
  }
  get windowInternal() {
    return this.document.defaultView;
  }
  isCurrentlyInPopup(config) {
    if (this.canAccessSessionStorage()) {
      const popup = this.storagePersistenceService.read(this.STORAGE_IDENTIFIER, config);
      const windowIdentifier = this.windowInternal;
      if (!windowIdentifier) {
        return false;
      }
      return Boolean(windowIdentifier.opener) && windowIdentifier.opener !== windowIdentifier && Boolean(popup);
    }
    return false;
  }
  openPopUp(url, popupOptions, config) {
    const optionsToPass = this.getOptions(popupOptions);
    this.storagePersistenceService.write(this.STORAGE_IDENTIFIER, "true", config);
    const windowIdentifier = this.windowInternal;
    if (!windowIdentifier) {
      return;
    }
    if (!url) {
      this.loggerService.logError(config, "Could not open popup, url is empty");
      return;
    }
    this.popUp = windowIdentifier.open(url, "_blank", optionsToPass);
    if (!this.popUp) {
      this.storagePersistenceService.remove(this.STORAGE_IDENTIFIER, config);
      this.loggerService.logError(config, "Could not open popup");
      return;
    }
    this.loggerService.logDebug(config, "Opened popup with url " + url);
    const listener = (event) => {
      if (!event?.data || typeof event.data !== "string") {
        if (config.disableCleaningPopupOnInvalidMessage) {
          return;
        }
        this.cleanUp(listener, config);
        return;
      }
      this.loggerService.logDebug(config, "Received message from popup with url " + event.data);
      this.resultInternal$.next({
        userClosed: false,
        receivedUrl: event.data
      });
      this.cleanUp(listener, config);
    };
    windowIdentifier.addEventListener("message", listener, false);
    this.handle = windowIdentifier.setInterval(() => {
      if (this.popUp?.closed) {
        this.resultInternal$.next({
          userClosed: true,
          receivedUrl: ""
        });
        this.cleanUp(listener, config);
      }
    }, 200);
  }
  sendMessageToMainWindow(url, config) {
    const windowIdentifier = this.windowInternal;
    if (!windowIdentifier) {
      return;
    }
    if (windowIdentifier.opener) {
      const href = windowIdentifier.location.href;
      this.sendMessage(url, href, config);
    }
  }
  cleanUp(listener, config) {
    const windowIdentifier = this.windowInternal;
    if (!windowIdentifier) {
      return;
    }
    windowIdentifier.removeEventListener("message", listener, false);
    windowIdentifier.clearInterval(this.handle);
    if (this.popUp) {
      this.storagePersistenceService.remove(this.STORAGE_IDENTIFIER, config);
      this.popUp.close();
      this.popUp = null;
    }
  }
  sendMessage(url, href, config) {
    const windowIdentifier = this.windowInternal;
    if (!windowIdentifier) {
      return;
    }
    if (!url) {
      this.loggerService.logDebug(config, `Can not send message to parent, no url: '${url}'`);
      return;
    }
    windowIdentifier.opener.postMessage(url, href);
  }
  getOptions(popupOptions) {
    const popupDefaultOptions = {
      width: 500,
      height: 500,
      left: 50,
      top: 50
    };
    const options = __spreadValues(__spreadValues({}, popupDefaultOptions), popupOptions || {});
    const windowIdentifier = this.windowInternal;
    if (!windowIdentifier) {
      return "";
    }
    const width = options.width || popupDefaultOptions.width;
    const height = options.height || popupDefaultOptions.height;
    const left = windowIdentifier.screenLeft + (windowIdentifier.outerWidth - width) / 2;
    const top = windowIdentifier.screenTop + (windowIdentifier.outerHeight - height) / 2;
    options.left = left;
    options.top = top;
    return Object.entries(options).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join(",");
  }
  canAccessSessionStorage() {
    return typeof navigator !== "undefined" && navigator.cookieEnabled && typeof Storage !== "undefined";
  }
  static {
    this.ɵfac = function PopUpService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PopUpService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _PopUpService,
      factory: _PopUpService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PopUpService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var CurrentUrlService = class _CurrentUrlService {
  constructor() {
    this.document = inject(DOCUMENT);
  }
  getStateParamFromCurrentUrl(url) {
    const currentUrl = url || this.getCurrentUrl();
    if (!currentUrl) {
      return null;
    }
    const parsedUrl = new URL(currentUrl);
    const urlParams = new URLSearchParams(parsedUrl.search);
    return urlParams.get("state");
  }
  getCurrentUrl() {
    return this.document?.defaultView?.location.toString() ?? null;
  }
  static {
    this.ɵfac = function CurrentUrlService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CurrentUrlService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _CurrentUrlService,
      factory: _CurrentUrlService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CurrentUrlService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var CheckAuthService = class _CheckAuthService {
  constructor() {
    this.checkSessionService = inject(CheckSessionService);
    this.currentUrlService = inject(CurrentUrlService);
    this.silentRenewService = inject(SilentRenewService);
    this.userService = inject(UserService);
    this.loggerService = inject(LoggerService);
    this.authStateService = inject(AuthStateService);
    this.callbackService = inject(CallbackService);
    this.refreshSessionService = inject(RefreshSessionService);
    this.periodicallyTokenCheckService = inject(PeriodicallyTokenCheckService);
    this.popupService = inject(PopUpService);
    this.autoLoginService = inject(AutoLoginService);
    this.storagePersistenceService = inject(StoragePersistenceService);
    this.publicEventsService = inject(PublicEventsService);
  }
  getConfig(configuration, url) {
    const stateParamFromUrl = this.currentUrlService.getStateParamFromCurrentUrl(url);
    return Boolean(stateParamFromUrl) ? this.getConfigurationWithUrlState([configuration], stateParamFromUrl) : configuration;
  }
  checkAuth(configuration, allConfigs, url) {
    if (!configuration) {
      return throwError(() => new Error("Please provide a configuration before setting up the module"));
    }
    this.publicEventsService.fireEvent(EventTypes.CheckingAuth);
    const stateParamFromUrl = this.currentUrlService.getStateParamFromCurrentUrl(url);
    const config = this.getConfig(configuration, url);
    if (!config) {
      return throwError(() => new Error(`could not find matching config for state ${stateParamFromUrl}`));
    }
    return this.checkAuthWithConfig(configuration, allConfigs, url);
  }
  checkAuthMultiple(allConfigs, url) {
    const stateParamFromUrl = this.currentUrlService.getStateParamFromCurrentUrl(url);
    if (stateParamFromUrl) {
      const config = this.getConfigurationWithUrlState(allConfigs, stateParamFromUrl);
      if (!config) {
        return throwError(() => new Error(`could not find matching config for state ${stateParamFromUrl}`));
      }
      return this.composeMultipleLoginResults(allConfigs, config, url);
    }
    const configs = allConfigs;
    const allChecks$ = configs.map((x) => this.checkAuthWithConfig(x, configs, url));
    return forkJoin(allChecks$);
  }
  checkAuthIncludingServer(configuration, allConfigs) {
    if (!configuration) {
      return throwError(() => new Error("Please provide a configuration before setting up the module"));
    }
    return this.checkAuthWithConfig(configuration, allConfigs).pipe(switchMap((loginResponse) => {
      const {
        isAuthenticated
      } = loginResponse;
      if (isAuthenticated) {
        return of(loginResponse);
      }
      return this.refreshSessionService.forceRefreshSession(configuration, allConfigs).pipe(tap((loginResponseAfterRefreshSession) => {
        if (loginResponseAfterRefreshSession?.isAuthenticated) {
          this.startCheckSessionAndValidation(configuration, allConfigs);
        }
      }));
    }));
  }
  checkAuthWithConfig(config, allConfigs, url) {
    if (!config) {
      const errorMessage = "Please provide at least one configuration before setting up the module";
      this.loggerService.logError(config, errorMessage);
      const result = {
        isAuthenticated: false,
        errorMessage,
        userData: null,
        idToken: "",
        accessToken: "",
        configId: ""
      };
      return of(result);
    }
    const currentUrl = url || this.currentUrlService.getCurrentUrl();
    if (!currentUrl) {
      const errorMessage = "No URL found!";
      this.loggerService.logError(config, errorMessage);
      const result = {
        isAuthenticated: false,
        errorMessage,
        userData: null,
        idToken: "",
        accessToken: "",
        configId: ""
      };
      return of(result);
    }
    const {
      configId,
      authority
    } = config;
    this.loggerService.logDebug(config, `Working with config '${configId}' using '${authority}'`);
    if (this.popupService.isCurrentlyInPopup(config)) {
      this.popupService.sendMessageToMainWindow(currentUrl, config);
      const result = {
        isAuthenticated: false,
        errorMessage: "",
        userData: null,
        idToken: "",
        accessToken: "",
        configId: ""
      };
      return of(result);
    }
    const isCallback = this.callbackService.isCallback(currentUrl, config);
    this.loggerService.logDebug(config, `currentUrl to check auth with: '${currentUrl}'`);
    const callback$ = isCallback ? this.callbackService.handleCallbackAndFireEvents(currentUrl, config, allConfigs) : of({});
    return callback$.pipe(map(() => {
      const isAuthenticated = this.authStateService.areAuthStorageTokensValid(config);
      this.loggerService.logDebug(config, `checkAuth completed. Firing events now. isAuthenticated: ${isAuthenticated}`);
      if (isAuthenticated) {
        this.startCheckSessionAndValidation(config, allConfigs);
        if (!isCallback) {
          this.authStateService.setAuthenticatedAndFireEvent(allConfigs);
          this.userService.publishUserDataIfExists(config, allConfigs);
        }
      }
      this.publicEventsService.fireEvent(EventTypes.CheckingAuthFinished);
      const result = {
        isAuthenticated,
        userData: this.userService.getUserDataFromStore(config),
        accessToken: this.authStateService.getAccessToken(config),
        idToken: this.authStateService.getIdToken(config),
        configId
      };
      return result;
    }), tap(({
      isAuthenticated
    }) => {
      if (isAuthenticated) {
        this.autoLoginService.checkSavedRedirectRouteAndNavigate(config);
      }
    }), catchError(({
      message
    }) => {
      this.loggerService.logError(config, message);
      this.publicEventsService.fireEvent(EventTypes.CheckingAuthFinishedWithError, message);
      const result = {
        isAuthenticated: false,
        errorMessage: message,
        userData: null,
        idToken: "",
        accessToken: "",
        configId
      };
      return of(result);
    }));
  }
  startCheckSessionAndValidation(config, allConfigs) {
    if (this.checkSessionService.isCheckSessionConfigured(config)) {
      this.checkSessionService.start(config);
    }
    this.periodicallyTokenCheckService.startTokenValidationPeriodically(allConfigs, config);
    if (this.silentRenewService.isSilentRenewConfigured(config)) {
      this.silentRenewService.getOrCreateIframe(config);
    }
  }
  getConfigurationWithUrlState(configurations, stateFromUrl) {
    if (!stateFromUrl) {
      return null;
    }
    for (const config of configurations) {
      const storedState = this.storagePersistenceService.read("authStateControl", config);
      if (storedState === stateFromUrl) {
        return config;
      }
    }
    return null;
  }
  composeMultipleLoginResults(configurations, activeConfig, url) {
    const allOtherConfigs = configurations.filter((x) => x.configId !== activeConfig.configId);
    const currentConfigResult = this.checkAuthWithConfig(activeConfig, configurations, url);
    const allOtherConfigResults = allOtherConfigs.map((config) => {
      const {
        redirectUrl
      } = config;
      return this.checkAuthWithConfig(config, configurations, redirectUrl);
    });
    return forkJoin([currentConfigResult, ...allOtherConfigResults]);
  }
  static {
    this.ɵfac = function CheckAuthService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CheckAuthService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _CheckAuthService,
      factory: _CheckAuthService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckAuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var RedirectService = class _RedirectService {
  constructor() {
    this.document = inject(DOCUMENT);
  }
  redirectTo(url) {
    this.document.location.href = url;
  }
  static {
    this.ɵfac = function RedirectService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RedirectService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _RedirectService,
      factory: _RedirectService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RedirectService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ResponseTypeValidationService = class _ResponseTypeValidationService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.flowHelper = inject(FlowHelper);
  }
  hasConfigValidResponseType(configuration) {
    if (this.flowHelper.isCurrentFlowAnyImplicitFlow(configuration)) {
      return true;
    }
    if (this.flowHelper.isCurrentFlowCodeFlow(configuration)) {
      return true;
    }
    this.loggerService.logWarning(configuration, "module configured incorrectly, invalid response_type. Check the responseType in the config");
    return false;
  }
  static {
    this.ɵfac = function ResponseTypeValidationService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ResponseTypeValidationService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ResponseTypeValidationService,
      factory: _ResponseTypeValidationService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ResponseTypeValidationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ParService = class _ParService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.urlService = inject(UrlService);
    this.dataService = inject(DataService);
    this.storagePersistenceService = inject(StoragePersistenceService);
  }
  postParRequest(configuration, authOptions) {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/x-www-form-urlencoded");
    const authWellKnownEndpoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
    if (!authWellKnownEndpoints) {
      return throwError(() => new Error("Could not read PAR endpoint because authWellKnownEndPoints are not given"));
    }
    const parEndpoint = authWellKnownEndpoints.parEndpoint;
    if (!parEndpoint) {
      return throwError(() => new Error("Could not read PAR endpoint from authWellKnownEndpoints"));
    }
    return this.urlService.createBodyForParCodeFlowRequest(configuration, authOptions).pipe(switchMap((data) => {
      return this.dataService.post(parEndpoint, data, configuration, headers).pipe(retry(2), map((response) => {
        this.loggerService.logDebug(configuration, "par response: ", response);
        return {
          expiresIn: response.expires_in,
          requestUri: response.request_uri
        };
      }), catchError((error) => {
        const errorMessage = `There was an error on ParService postParRequest`;
        this.loggerService.logError(configuration, errorMessage, error);
        return throwError(() => new Error(errorMessage));
      }));
    }));
  }
  static {
    this.ɵfac = function ParService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ParService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ParService,
      factory: _ParService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ParService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ParLoginService = class _ParLoginService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.responseTypeValidationService = inject(ResponseTypeValidationService);
    this.urlService = inject(UrlService);
    this.redirectService = inject(RedirectService);
    this.authWellKnownService = inject(AuthWellKnownService);
    this.popupService = inject(PopUpService);
    this.checkAuthService = inject(CheckAuthService);
    this.parService = inject(ParService);
  }
  loginPar(configuration, authOptions) {
    if (!this.responseTypeValidationService.hasConfigValidResponseType(configuration)) {
      this.loggerService.logError(configuration, "Invalid response type!");
      return;
    }
    this.loggerService.logDebug(configuration, "BEGIN Authorize OIDC Flow, no auth data");
    this.authWellKnownService.queryAndStoreAuthWellKnownEndPoints(configuration).pipe(switchMap(() => this.parService.postParRequest(configuration, authOptions))).subscribe((response) => {
      this.loggerService.logDebug(configuration, "par response: ", response);
      const url = this.urlService.getAuthorizeParUrl(response.requestUri, configuration);
      this.loggerService.logDebug(configuration, "par request url: ", url);
      if (!url) {
        this.loggerService.logError(configuration, `Could not create URL with param ${response.requestUri}: '${url}'`);
        return;
      }
      if (authOptions?.urlHandler) {
        authOptions.urlHandler(url);
      } else {
        this.redirectService.redirectTo(url);
      }
    });
  }
  loginWithPopUpPar(configuration, allConfigs, authOptions, popupOptions) {
    const {
      configId
    } = configuration;
    if (!this.responseTypeValidationService.hasConfigValidResponseType(configuration)) {
      const errorMessage = "Invalid response type!";
      this.loggerService.logError(configuration, errorMessage);
      return throwError(() => new Error(errorMessage));
    }
    this.loggerService.logDebug(configuration, "BEGIN Authorize OIDC Flow with popup, no auth data");
    return this.authWellKnownService.queryAndStoreAuthWellKnownEndPoints(configuration).pipe(switchMap(() => this.parService.postParRequest(configuration, authOptions)), switchMap((response) => {
      this.loggerService.logDebug(configuration, `par response: ${response}`);
      const url = this.urlService.getAuthorizeParUrl(response.requestUri, configuration);
      this.loggerService.logDebug(configuration, "par request url: ", url);
      if (!url) {
        const errorMessage = `Could not create URL with param ${response.requestUri}: 'url'`;
        this.loggerService.logError(configuration, errorMessage);
        return throwError(() => new Error(errorMessage));
      }
      this.popupService.openPopUp(url, popupOptions, configuration);
      return this.popupService.result$.pipe(take(1), switchMap((result) => {
        const {
          userClosed,
          receivedUrl
        } = result;
        if (userClosed) {
          return of({
            isAuthenticated: false,
            errorMessage: "User closed popup",
            userData: null,
            idToken: "",
            accessToken: "",
            configId
          });
        }
        return this.checkAuthService.checkAuth(configuration, allConfigs, receivedUrl);
      }));
    }));
  }
  static {
    this.ɵfac = function ParLoginService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ParLoginService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ParLoginService,
      factory: _ParLoginService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ParLoginService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var PopUpLoginService = class _PopUpLoginService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.responseTypeValidationService = inject(ResponseTypeValidationService);
    this.urlService = inject(UrlService);
    this.authWellKnownService = inject(AuthWellKnownService);
    this.popupService = inject(PopUpService);
    this.checkAuthService = inject(CheckAuthService);
  }
  loginWithPopUpStandard(configuration, allConfigs, authOptions, popupOptions) {
    const {
      configId
    } = configuration;
    if (!this.responseTypeValidationService.hasConfigValidResponseType(configuration)) {
      const errorMessage = "Invalid response type!";
      this.loggerService.logError(configuration, errorMessage);
      return throwError(() => new Error(errorMessage));
    }
    this.loggerService.logDebug(configuration, "BEGIN Authorize OIDC Flow with popup, no auth data");
    return this.authWellKnownService.queryAndStoreAuthWellKnownEndPoints(configuration).pipe(switchMap(() => this.urlService.getAuthorizeUrl(configuration, authOptions)), tap((authUrl) => this.popupService.openPopUp(authUrl, popupOptions, configuration)), switchMap(() => {
      return this.popupService.result$.pipe(take(1), switchMap((result) => {
        const {
          userClosed,
          receivedUrl
        } = result;
        if (userClosed) {
          const response = {
            isAuthenticated: false,
            errorMessage: "User closed popup",
            userData: null,
            idToken: "",
            accessToken: "",
            configId
          };
          return of(response);
        }
        return this.checkAuthService.checkAuth(configuration, allConfigs, receivedUrl);
      }));
    }));
  }
  static {
    this.ɵfac = function PopUpLoginService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PopUpLoginService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _PopUpLoginService,
      factory: _PopUpLoginService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PopUpLoginService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var StandardLoginService = class _StandardLoginService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.responseTypeValidationService = inject(ResponseTypeValidationService);
    this.urlService = inject(UrlService);
    this.redirectService = inject(RedirectService);
    this.authWellKnownService = inject(AuthWellKnownService);
    this.flowsDataService = inject(FlowsDataService);
  }
  loginStandard(configuration, authOptions) {
    if (!this.responseTypeValidationService.hasConfigValidResponseType(configuration)) {
      this.loggerService.logError(configuration, "Invalid response type!");
      return;
    }
    this.loggerService.logDebug(configuration, "BEGIN Authorize OIDC Flow, no auth data");
    this.flowsDataService.setCodeFlowInProgress(configuration);
    this.authWellKnownService.queryAndStoreAuthWellKnownEndPoints(configuration).subscribe(() => {
      const {
        urlHandler
      } = authOptions || {};
      this.flowsDataService.resetSilentRenewRunning(configuration);
      this.urlService.getAuthorizeUrl(configuration, authOptions).subscribe((url) => {
        if (!url) {
          this.loggerService.logError(configuration, "Could not create URL", url);
          return;
        }
        if (urlHandler) {
          urlHandler(url);
        } else {
          this.redirectService.redirectTo(url);
        }
      });
    });
  }
  static {
    this.ɵfac = function StandardLoginService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _StandardLoginService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _StandardLoginService,
      factory: _StandardLoginService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StandardLoginService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var LoginService = class _LoginService {
  constructor() {
    this.parLoginService = inject(ParLoginService);
    this.popUpLoginService = inject(PopUpLoginService);
    this.standardLoginService = inject(StandardLoginService);
    this.storagePersistenceService = inject(StoragePersistenceService);
    this.popupService = inject(PopUpService);
  }
  login(configuration, authOptions) {
    if (!configuration) {
      throw new Error("Please provide a configuration before setting up the module");
    }
    const {
      usePushedAuthorisationRequests
    } = configuration;
    if (authOptions?.customParams) {
      this.storagePersistenceService.write("storageCustomParamsAuthRequest", authOptions.customParams, configuration);
    }
    if (usePushedAuthorisationRequests) {
      return this.parLoginService.loginPar(configuration, authOptions);
    } else {
      return this.standardLoginService.loginStandard(configuration, authOptions);
    }
  }
  loginWithPopUp(configuration, allConfigs, authOptions, popupOptions) {
    if (!configuration) {
      throw new Error("Please provide a configuration before setting up the module");
    }
    const isAlreadyInPopUp = this.popupService.isCurrentlyInPopup(configuration);
    if (isAlreadyInPopUp) {
      return of({
        errorMessage: "There is already a popup open."
      });
    }
    const {
      usePushedAuthorisationRequests
    } = configuration;
    if (authOptions?.customParams) {
      this.storagePersistenceService.write("storageCustomParamsAuthRequest", authOptions.customParams, configuration);
    }
    if (usePushedAuthorisationRequests) {
      return this.parLoginService.loginWithPopUpPar(configuration, allConfigs, authOptions, popupOptions);
    }
    return this.popUpLoginService.loginWithPopUpStandard(configuration, allConfigs, authOptions, popupOptions);
  }
  static {
    this.ɵfac = function LoginService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LoginService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _LoginService,
      factory: _LoginService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function removeNullAndUndefinedValues(obj) {
  const copy = __spreadValues({}, obj);
  for (const key in obj) {
    if (obj[key] === void 0 || obj[key] === null) {
      delete copy[key];
    }
  }
  return copy;
}
var LogoffRevocationService = class _LogoffRevocationService {
  constructor() {
    this.loggerService = inject(LoggerService);
    this.dataService = inject(DataService);
    this.storagePersistenceService = inject(StoragePersistenceService);
    this.urlService = inject(UrlService);
    this.checkSessionService = inject(CheckSessionService);
    this.resetAuthDataService = inject(ResetAuthDataService);
    this.redirectService = inject(RedirectService);
  }
  // Logs out on the server and the local client.
  // If the server state has changed, check session, then only a local logout.
  logoff(config, allConfigs, logoutAuthOptions) {
    if (!config) {
      return throwError(() => new Error("Please provide a configuration before setting up the module"));
    }
    this.loggerService.logDebug(config, "logoff, remove auth", logoutAuthOptions);
    const {
      urlHandler,
      customParams
    } = logoutAuthOptions || {};
    const endSessionUrl = this.urlService.getEndSessionUrl(config, customParams);
    if (!endSessionUrl) {
      this.loggerService.logDebug(config, "No endsessionUrl present. Logoff was only locally. Returning.");
      return of(null);
    }
    if (this.checkSessionService.serverStateChanged(config)) {
      this.loggerService.logDebug(config, "Server State changed. Logoff was only locally. Returning.");
      return of(null);
    }
    if (urlHandler) {
      this.loggerService.logDebug(config, `Custom UrlHandler found. Using this to handle logoff with url '${endSessionUrl}'`);
      urlHandler(endSessionUrl);
      this.resetAuthDataService.resetAuthorizationData(config, allConfigs);
      return of(null);
    }
    return this.logoffInternal(logoutAuthOptions, endSessionUrl, config, allConfigs);
  }
  logoffLocal(config, allConfigs) {
    this.resetAuthDataService.resetAuthorizationData(config, allConfigs);
    this.checkSessionService.stop();
  }
  logoffLocalMultiple(allConfigs) {
    allConfigs.forEach((configuration) => this.logoffLocal(configuration, allConfigs));
  }
  // The refresh token and and the access token are revoked on the server. If the refresh token does not exist
  // only the access token is revoked. Then the logout run.
  logoffAndRevokeTokens(config, allConfigs, logoutAuthOptions) {
    if (!config) {
      return throwError(() => new Error("Please provide a configuration before setting up the module"));
    }
    const {
      revocationEndpoint
    } = this.storagePersistenceService.read("authWellKnownEndPoints", config) || {};
    if (!revocationEndpoint) {
      this.loggerService.logDebug(config, "revocation endpoint not supported");
      return this.logoff(config, allConfigs, logoutAuthOptions);
    }
    if (this.storagePersistenceService.getRefreshToken(config)) {
      return this.revokeRefreshToken(config).pipe(switchMap((_) => this.revokeAccessToken(config)), catchError((error) => {
        const errorMessage = `revoke token failed`;
        this.loggerService.logError(config, errorMessage, error);
        return throwError(() => new Error(errorMessage));
      }), concatMap(() => this.logoff(config, allConfigs, logoutAuthOptions)));
    } else {
      return this.revokeAccessToken(config).pipe(catchError((error) => {
        const errorMessage = `revoke accessToken failed`;
        this.loggerService.logError(config, errorMessage, error);
        return throwError(() => new Error(errorMessage));
      }), concatMap(() => this.logoff(config, allConfigs, logoutAuthOptions)));
    }
  }
  // https://tools.ietf.org/html/rfc7009
  // revokes an access token on the STS. If no token is provided, then the token from
  // the storage is revoked. You can pass any token to revoke. This makes it possible to
  // manage your own tokens. The is a public API.
  revokeAccessToken(configuration, accessToken) {
    if (!configuration) {
      return throwError(() => new Error("Please provide a configuration before setting up the module"));
    }
    const accessTok = accessToken || this.storagePersistenceService.getAccessToken(configuration);
    const body = this.urlService.createRevocationEndpointBodyAccessToken(accessTok, configuration);
    return this.sendRevokeRequest(configuration, body);
  }
  // https://tools.ietf.org/html/rfc7009
  // revokes an refresh token on the STS. This is only required in the code flow with refresh tokens.
  // If no token is provided, then the token from the storage is revoked. You can pass any token to revoke.
  // This makes it possible to manage your own tokens.
  revokeRefreshToken(configuration, refreshToken) {
    if (!configuration) {
      return throwError(() => new Error("Please provide a configuration before setting up the module"));
    }
    const refreshTok = refreshToken || this.storagePersistenceService.getRefreshToken(configuration);
    const body = this.urlService.createRevocationEndpointBodyRefreshToken(refreshTok, configuration);
    return this.sendRevokeRequest(configuration, body);
  }
  logoffInternal(logoutAuthOptions, endSessionUrl, config, allConfigs) {
    const {
      logoffMethod,
      customParams
    } = logoutAuthOptions || {};
    if (!logoffMethod || logoffMethod === "GET") {
      this.redirectService.redirectTo(endSessionUrl);
      this.resetAuthDataService.resetAuthorizationData(config, allConfigs);
      return of(null);
    }
    const {
      state,
      logout_hint,
      ui_locales
    } = customParams || {};
    const {
      clientId
    } = config;
    const idToken = this.storagePersistenceService.getIdToken(config);
    const postLogoutRedirectUrl = this.urlService.getPostLogoutRedirectUrl(config);
    const headers = this.getHeaders();
    const {
      url
    } = this.urlService.getEndSessionEndpoint(config);
    const body = {
      id_token_hint: idToken,
      client_id: clientId,
      post_logout_redirect_uri: postLogoutRedirectUrl,
      state,
      logout_hint,
      ui_locales
    };
    const bodyWithoutNullOrUndefined = removeNullAndUndefinedValues(body);
    this.resetAuthDataService.resetAuthorizationData(config, allConfigs);
    return this.dataService.post(url, bodyWithoutNullOrUndefined, config, headers);
  }
  sendRevokeRequest(configuration, body) {
    const url = this.urlService.getRevocationEndpointUrl(configuration);
    const headers = this.getHeaders();
    return this.dataService.post(url, body, configuration, headers).pipe(retry(2), switchMap((response) => {
      this.loggerService.logDebug(configuration, "revocation endpoint post response: ", response);
      return of(response);
    }), catchError((error) => {
      const errorMessage = `Revocation request failed`;
      this.loggerService.logError(configuration, errorMessage, error);
      return throwError(() => new Error(errorMessage));
    }));
  }
  getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/x-www-form-urlencoded");
    return headers;
  }
  static {
    this.ɵfac = function LogoffRevocationService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LogoffRevocationService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _LogoffRevocationService,
      factory: _LogoffRevocationService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LogoffRevocationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var OidcSecurityService = class _OidcSecurityService {
  constructor() {
    this.checkSessionService = inject(CheckSessionService);
    this.checkAuthService = inject(CheckAuthService);
    this.userService = inject(UserService);
    this.tokenHelperService = inject(TokenHelperService);
    this.configurationService = inject(ConfigurationService);
    this.authStateService = inject(AuthStateService);
    this.flowsDataService = inject(FlowsDataService);
    this.callbackService = inject(CallbackService);
    this.logoffRevocationService = inject(LogoffRevocationService);
    this.loginService = inject(LoginService);
    this.refreshSessionService = inject(RefreshSessionService);
    this.urlService = inject(UrlService);
    this.authWellKnownService = inject(AuthWellKnownService);
    this.userData = toSignal(this.userData$, {
      requireSync: true
    });
    this.authenticated = toSignal(this.isAuthenticated$, {
      requireSync: true
    });
  }
  /**
   * Provides information about the user after they have logged in.
   *
   * @returns Returns an object containing either the user data directly (single config) or
   * the user data per config in case you are running with multiple configs
   */
  get userData$() {
    return this.userService.userData$;
  }
  /**
   * Emits each time an authorization event occurs.
   *
   * @returns Returns an object containing if you are authenticated or not.
   * Single Config: true if config is authenticated, false if not.
   * Multiple Configs: true is all configs are authenticated, false if only one of them is not
   *
   * The `allConfigsAuthenticated` property contains the auth information _per config_.
   */
  get isAuthenticated$() {
    return this.authStateService.authenticated$;
  }
  /**
   * Emits each time the server sends a CheckSession event and the value changed. This property will always return
   * true.
   */
  get checkSessionChanged$() {
    return this.checkSessionService.checkSessionChanged$;
  }
  /**
   * Emits on a Security Token Service callback. The observable will never contain a value.
   */
  get stsCallback$() {
    return this.callbackService.stsCallback$;
  }
  preloadAuthWellKnownDocument(configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(concatMap((config) => this.authWellKnownService.queryAndStoreAuthWellKnownEndPoints(config)));
  }
  /**
   * Returns the currently active OpenID configurations.
   *
   * @returns an array of OpenIdConfigurations.
   */
  getConfigurations() {
    return this.configurationService.getAllConfigurations();
  }
  /**
   * Returns a single active OpenIdConfiguration.
   *
   * @param configId The configId to identify the config. If not passed, the first one is being returned
   */
  getConfiguration(configId) {
    return this.configurationService.getOpenIDConfiguration(configId);
  }
  /**
   * Returns the userData for a configuration
   *
   * @param configId The configId to identify the config. If not passed, the first one is being used
   */
  getUserData(configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => this.userService.getUserDataFromStore(config)));
  }
  /**
   * Starts the complete setup flow for one configuration. Calling will start the entire authentication flow, and the returned observable
   * will denote whether the user was successfully authenticated including the user data, the access token, the configId and
   * an error message in case an error happened
   *
   * @param url The URL to perform the authorization on the behalf of.
   * @param configId The configId to perform the authorization on the behalf of. If not passed, the first configs will be taken
   *
   * @returns An object `LoginResponse` containing all information about the login
   */
  checkAuth(url, configId) {
    return this.configurationService.getOpenIDConfigurations(configId).pipe(concatMap(({
      allConfigs,
      currentConfig
    }) => this.checkAuthService.checkAuth(currentConfig, allConfigs, url)));
  }
  /**
   * Starts the complete setup flow for multiple configurations.
   * Calling will start the entire authentication flow, and the returned observable
   * will denote whether the user was successfully authenticated including the user data, the access token, the configId and
   * an error message in case an error happened in an array for each config which was provided
   *
   * @param url The URL to perform the authorization on the behalf of.
   *
   * @returns An array of `LoginResponse` objects containing all information about the logins
   */
  checkAuthMultiple(url) {
    return this.configurationService.getOpenIDConfigurations().pipe(concatMap(({
      allConfigs
    }) => this.checkAuthService.checkAuthMultiple(allConfigs, url)));
  }
  /**
   * Provides information about the current authenticated state
   *
   * @param configId The configId to check the information for. If not passed, the first configs will be taken
   *
   * @returns A boolean whether the config is authenticated or not.
   */
  isAuthenticated(configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => this.authStateService.isAuthenticated(config)));
  }
  /**
   * Checks the server for an authenticated session using the iframe silent renew if not locally authenticated.
   */
  checkAuthIncludingServer(configId) {
    return this.configurationService.getOpenIDConfigurations(configId).pipe(concatMap(({
      allConfigs,
      currentConfig
    }) => this.checkAuthService.checkAuthIncludingServer(currentConfig, allConfigs)));
  }
  /**
   * Returns the access token for the login scenario.
   *
   * @param configId The configId to check the information for. If not passed, the first configs will be taken
   *
   * @returns A string with the access token.
   */
  getAccessToken(configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => this.authStateService.getAccessToken(config)));
  }
  /**
   * Returns the ID token for the sign-in.
   *
   * @param configId The configId to check the information for. If not passed, the first configs will be taken
   *
   * @returns A string with the id token.
   */
  getIdToken(configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => this.authStateService.getIdToken(config)));
  }
  /**
   * Returns the refresh token, if present, for the sign-in.
   *
   * @param configId The configId to check the information for. If not passed, the first configs will be taken
   *
   * @returns A string with the refresh token.
   */
  getRefreshToken(configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => this.authStateService.getRefreshToken(config)));
  }
  /**
   * Returns the authentication result, if present, for the sign-in.
   *
   * @param configId The configId to check the information for. If not passed, the first configs will be taken
   *
   * @returns A object with the authentication result
   */
  getAuthenticationResult(configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => this.authStateService.getAuthenticationResult(config)));
  }
  /**
   * Returns the payload from the ID token.
   *
   * @param encode Set to true if the payload is base64 encoded
   * @param configId The configId to check the information for. If not passed, the first configs will be taken
   *
   * @returns The payload from the id token.
   */
  getPayloadFromIdToken(encode = false, configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => {
      const token = this.authStateService.getIdToken(config);
      return this.tokenHelperService.getPayloadFromToken(token, encode, config);
    }));
  }
  /**
   * Returns the payload from the access token.
   *
   * @param encode Set to true if the payload is base64 encoded
   * @param configId The configId to check the information for. If not passed, the first configs will be taken
   *
   * @returns The payload from the access token.
   */
  getPayloadFromAccessToken(encode = false, configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => {
      const token = this.authStateService.getAccessToken(config);
      return this.tokenHelperService.getPayloadFromToken(token, encode, config);
    }));
  }
  /**
   * Sets a custom state for the authorize request.
   *
   * @param state The state to set.
   * @param configId The configId to check the information for. If not passed, the first configs will be taken
   */
  setState(state, configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => this.flowsDataService.setAuthStateControl(state, config)));
  }
  /**
   * Gets the state value used for the authorize request.
   *
   * @param configId The configId to check the information for. If not passed, the first configs will be taken
   *
   * @returns The state value used for the authorize request.
   */
  getState(configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => this.flowsDataService.getAuthStateControl(config)));
  }
  /**
   * Redirects the user to the Security Token Service to begin the authentication process.
   *
   * @param configId The configId to perform the action in behalf of. If not passed, the first configs will be taken
   * @param authOptions The custom options for the the authentication request.
   */
  authorize(configId, authOptions) {
    this.configurationService.getOpenIDConfiguration(configId).subscribe((config) => this.loginService.login(config, authOptions));
  }
  /**
   * Opens the Security Token Service in a new window to begin the authentication process.
   *
   * @param authOptions The custom options for the authentication request.
   * @param popupOptions The configuration for the popup window.
   * @param configId The configId to perform the action in behalf of. If not passed, the first configs will be taken
   *
   * @returns An `Observable<LoginResponse>` containing all information about the login
   */
  authorizeWithPopUp(authOptions, popupOptions, configId) {
    return this.configurationService.getOpenIDConfigurations(configId).pipe(concatMap(({
      allConfigs,
      currentConfig
    }) => this.loginService.loginWithPopUp(currentConfig, allConfigs, authOptions, popupOptions)));
  }
  /**
   * Manually refreshes the session.
   *
   * @param customParams Custom parameters to pass to the refresh request.
   * @param configId The configId to perform the action in behalf of. If not passed, the first configs will be taken
   *
   * @returns An `Observable<LoginResponse>` containing all information about the login
   */
  forceRefreshSession(customParams, configId) {
    return this.configurationService.getOpenIDConfigurations(configId).pipe(concatMap(({
      allConfigs,
      currentConfig
    }) => this.refreshSessionService.userForceRefreshSession(currentConfig, allConfigs, customParams)));
  }
  /**
   * Revokes the refresh token (if present) and the access token on the server and then performs the logoff operation.
   * The refresh token and and the access token are revoked on the server. If the refresh token does not exist
   * only the access token is revoked. Then the logout run.
   *
   * @param configId The configId to perform the action in behalf of. If not passed, the first configs will be taken
   * @param logoutAuthOptions The custom options for the request.
   *
   * @returns An observable when the action is finished
   */
  logoffAndRevokeTokens(configId, logoutAuthOptions) {
    return this.configurationService.getOpenIDConfigurations(configId).pipe(concatMap(({
      allConfigs,
      currentConfig
    }) => this.logoffRevocationService.logoffAndRevokeTokens(currentConfig, allConfigs, logoutAuthOptions)));
  }
  /**
   * Logs out on the server and the local client. If the server state has changed, confirmed via check session,
   * then only a local logout is performed.
   *
   * @param configId The configId to perform the action in behalf of. If not passed, the first configs will be taken
   * @param logoutAuthOptions with custom parameters and/or an custom url handler
   */
  logoff(configId, logoutAuthOptions) {
    return this.configurationService.getOpenIDConfigurations(configId).pipe(concatMap(({
      allConfigs,
      currentConfig
    }) => this.logoffRevocationService.logoff(currentConfig, allConfigs, logoutAuthOptions)));
  }
  /**
   * Logs the user out of the application without logging them out of the server.
   * Use this method if you have _one_ config enabled.
   *
   * @param configId The configId to perform the action in behalf of. If not passed, the first configs will be taken
   */
  logoffLocal(configId) {
    this.configurationService.getOpenIDConfigurations(configId).subscribe(({
      allConfigs,
      currentConfig
    }) => this.logoffRevocationService.logoffLocal(currentConfig, allConfigs));
  }
  /**
   * Logs the user out of the application for all configs without logging them out of the server.
   * Use this method if you have _multiple_ configs enabled.
   */
  logoffLocalMultiple() {
    this.configurationService.getOpenIDConfigurations().subscribe(({
      allConfigs
    }) => this.logoffRevocationService.logoffLocalMultiple(allConfigs));
  }
  /**
   * Revokes an access token on the Security Token Service. This is only required in the code flow with refresh tokens. If no token is
   * provided, then the token from the storage is revoked. You can pass any token to revoke.
   * https://tools.ietf.org/html/rfc7009
   *
   * @param accessToken The access token to revoke.
   * @param configId The configId to perform the action in behalf of. If not passed, the first configs will be taken
   *
   * @returns An observable when the action is finished
   */
  revokeAccessToken(accessToken, configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(concatMap((config) => this.logoffRevocationService.revokeAccessToken(config, accessToken)));
  }
  /**
   * Revokes a refresh token on the Security Token Service. This is only required in the code flow with refresh tokens. If no token is
   * provided, then the token from the storage is revoked. You can pass any token to revoke.
   * https://tools.ietf.org/html/rfc7009
   *
   * @param refreshToken The access token to revoke.
   * @param configId The configId to perform the action in behalf of. If not passed, the first configs will be taken
   *
   * @returns An observable when the action is finished
   */
  revokeRefreshToken(refreshToken, configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(concatMap((config) => this.logoffRevocationService.revokeRefreshToken(config, refreshToken)));
  }
  /**
   * Creates the end session URL which can be used to implement an alternate server logout.
   *
   * @param customParams
   * @param configId The configId to perform the action in behalf of. If not passed, the first configs will be taken
   *
   * @returns A string with the end session url or null
   */
  getEndSessionUrl(customParams, configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => this.urlService.getEndSessionUrl(config, customParams)));
  }
  /**
   * Creates the authorize URL based on your flow
   *
   * @param customParams
   * @param configId The configId to perform the action in behalf of. If not passed, the first configs will be taken
   *
   * @returns A string with the authorize URL or null
   */
  getAuthorizeUrl(customParams, configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(concatMap((config) => this.urlService.getAuthorizeUrl(config, customParams ? {
      customParams
    } : void 0)));
  }
  static {
    this.ɵfac = function OidcSecurityService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OidcSecurityService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _OidcSecurityService,
      factory: _OidcSecurityService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OidcSecurityService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var DefaultSessionStorageService = class _DefaultSessionStorageService {
  read(key) {
    return sessionStorage.getItem(key);
  }
  write(key, value) {
    sessionStorage.setItem(key, value);
  }
  remove(key) {
    sessionStorage.removeItem(key);
  }
  clear() {
    sessionStorage.clear();
  }
  static {
    this.ɵfac = function DefaultSessionStorageService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DefaultSessionStorageService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _DefaultSessionStorageService,
      factory: _DefaultSessionStorageService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultSessionStorageService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function provideAuth(passedConfig, ...features) {
  const providers = _provideAuth(passedConfig);
  for (const feature of features) {
    providers.push(...feature.ɵproviders);
  }
  return makeEnvironmentProviders(providers);
}
function _provideAuth(passedConfig) {
  return [
    // Make the PASSED_CONFIG available through injection
    {
      provide: PASSED_CONFIG,
      useValue: passedConfig
    },
    // Create the loader: Either the one getting passed or a static one
    passedConfig?.loader || {
      provide: StsConfigLoader,
      useFactory: createStaticLoader,
      deps: [PASSED_CONFIG]
    },
    {
      provide: AbstractSecurityStorage,
      useClass: DefaultSessionStorageService
    },
    {
      provide: AbstractLoggerService,
      useClass: ConsoleLoggerService
    }
  ];
}
function withAppInitializerAuthCheck() {
  return {
    ɵproviders: [{
      provide: APP_INITIALIZER,
      useFactory: (oidcSecurityService) => () => oidcSecurityService.checkAuthMultiple(),
      multi: true,
      deps: [OidcSecurityService]
    }]
  };
}
var AuthModule = class _AuthModule {
  static forRoot(passedConfig) {
    return {
      ngModule: _AuthModule,
      providers: [..._provideAuth(passedConfig)]
    };
  }
  static {
    this.ɵfac = function AuthModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _AuthModule,
      imports: [CommonModule]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [provideHttpClient(withInterceptorsFromDi())],
      imports: [CommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthModule, [{
    type: NgModule,
    args: [{
      declarations: [],
      exports: [],
      imports: [CommonModule],
      providers: [provideHttpClient(withInterceptorsFromDi())]
    }]
  }], null, null);
})();
var AutoLoginAllRoutesGuard = class _AutoLoginAllRoutesGuard {
  constructor() {
    this.autoLoginService = inject(AutoLoginService);
    this.checkAuthService = inject(CheckAuthService);
    this.loginService = inject(LoginService);
    this.configurationService = inject(ConfigurationService);
    this.router = inject(Router);
  }
  canLoad() {
    const url = this.router.getCurrentNavigation()?.extractedUrl.toString().substring(1) ?? "";
    return checkAuth$1(url, this.configurationService, this.checkAuthService, this.autoLoginService, this.loginService);
  }
  canActivate(route, state) {
    return checkAuth$1(state.url, this.configurationService, this.checkAuthService, this.autoLoginService, this.loginService);
  }
  canActivateChild(route, state) {
    return checkAuth$1(state.url, this.configurationService, this.checkAuthService, this.autoLoginService, this.loginService);
  }
  static {
    this.ɵfac = function AutoLoginAllRoutesGuard_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AutoLoginAllRoutesGuard)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _AutoLoginAllRoutesGuard,
      factory: _AutoLoginAllRoutesGuard.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutoLoginAllRoutesGuard, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function checkAuth$1(url, configurationService, checkAuthService, autoLoginService, loginService) {
  return configurationService.getOpenIDConfiguration().pipe(switchMap((config) => {
    const allConfigs = configurationService.getAllConfigurations();
    return checkAuthService.checkAuth(config, allConfigs).pipe(take(1), map(({
      isAuthenticated
    }) => {
      if (isAuthenticated) {
        autoLoginService.checkSavedRedirectRouteAndNavigate(config);
      }
      if (!isAuthenticated) {
        autoLoginService.saveRedirectRoute(config, url);
        loginService.login(config);
      }
      return isAuthenticated;
    }));
  }));
}
var AutoLoginPartialRoutesGuard = class _AutoLoginPartialRoutesGuard {
  constructor() {
    this.autoLoginService = inject(AutoLoginService);
    this.authStateService = inject(AuthStateService);
    this.loginService = inject(LoginService);
    this.configurationService = inject(ConfigurationService);
    this.router = inject(Router);
  }
  canLoad() {
    const url = this.router.getCurrentNavigation()?.extractedUrl.toString().substring(1) ?? "";
    return checkAuth(url, this.configurationService, this.authStateService, this.autoLoginService, this.loginService);
  }
  canActivate(route, state) {
    const authOptions = route?.data ? {
      customParams: route.data
    } : void 0;
    return checkAuth(state.url, this.configurationService, this.authStateService, this.autoLoginService, this.loginService, authOptions);
  }
  canActivateChild(route, state) {
    const authOptions = route?.data ? {
      customParams: route.data
    } : void 0;
    return checkAuth(state.url, this.configurationService, this.authStateService, this.autoLoginService, this.loginService, authOptions);
  }
  static {
    this.ɵfac = function AutoLoginPartialRoutesGuard_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AutoLoginPartialRoutesGuard)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _AutoLoginPartialRoutesGuard,
      factory: _AutoLoginPartialRoutesGuard.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutoLoginPartialRoutesGuard, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function autoLoginPartialRoutesGuard(route, state, configId) {
  const configurationService = inject(ConfigurationService);
  const authStateService = inject(AuthStateService);
  const loginService = inject(LoginService);
  const autoLoginService = inject(AutoLoginService);
  const router = inject(Router);
  const authOptions = route?.data ? {
    customParams: route.data
  } : void 0;
  const url = router.getCurrentNavigation()?.extractedUrl.toString().substring(1) ?? "";
  return checkAuth(url, configurationService, authStateService, autoLoginService, loginService, authOptions, configId);
}
function autoLoginPartialRoutesGuardWithConfig(configId) {
  return (route, state) => autoLoginPartialRoutesGuard(route, state, configId);
}
function checkAuth(url, configurationService, authStateService, autoLoginService, loginService, authOptions, configId) {
  return configurationService.getOpenIDConfiguration(configId).pipe(map((configuration) => {
    const isAuthenticated = authStateService.areAuthStorageTokensValid(configuration);
    if (isAuthenticated) {
      autoLoginService.checkSavedRedirectRouteAndNavigate(configuration);
    }
    if (!isAuthenticated) {
      autoLoginService.saveRedirectRoute(configuration, url);
      if (authOptions) {
        loginService.login(configuration, authOptions);
      } else {
        loginService.login(configuration);
      }
    }
    return isAuthenticated;
  }));
}
function flattenArray(array) {
  return array.reduce((flattened, elem) => flattened.concat(Array.isArray(elem) ? flattenArray(elem) : elem), []);
}
var ClosestMatchingRouteService = class _ClosestMatchingRouteService {
  getConfigIdForClosestMatchingRoute(route, configurations) {
    for (const config of configurations) {
      const {
        secureRoutes
      } = config;
      for (const configuredRoute of secureRoutes ?? []) {
        if (route.startsWith(configuredRoute)) {
          return {
            matchingRoute: configuredRoute,
            matchingConfig: config
          };
        }
      }
    }
    return {
      matchingRoute: null,
      matchingConfig: null
    };
  }
  static {
    this.ɵfac = function ClosestMatchingRouteService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ClosestMatchingRouteService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ClosestMatchingRouteService,
      factory: _ClosestMatchingRouteService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClosestMatchingRouteService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var AuthInterceptor = class _AuthInterceptor {
  constructor() {
    this.authStateService = inject(AuthStateService);
    this.configurationService = inject(ConfigurationService);
    this.loggerService = inject(LoggerService);
    this.closestMatchingRouteService = inject(ClosestMatchingRouteService);
  }
  intercept(req, next) {
    return interceptRequest(req, next.handle, {
      configurationService: this.configurationService,
      authStateService: this.authStateService,
      closestMatchingRouteService: this.closestMatchingRouteService,
      loggerService: this.loggerService
    });
  }
  static {
    this.ɵfac = function AuthInterceptor_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthInterceptor)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _AuthInterceptor,
      factory: _AuthInterceptor.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthInterceptor, [{
    type: Injectable
  }], null, null);
})();
function authInterceptor() {
  return (req, next) => {
    return interceptRequest(req, next, {
      configurationService: inject(ConfigurationService),
      authStateService: inject(AuthStateService),
      closestMatchingRouteService: inject(ClosestMatchingRouteService),
      loggerService: inject(LoggerService)
    });
  };
}
function interceptRequest(req, next, deps) {
  if (!deps.configurationService.hasAtLeastOneConfig()) {
    return next(req);
  }
  const allConfigurations = deps.configurationService.getAllConfigurations();
  const allRoutesConfigured = allConfigurations.map((x) => x.secureRoutes || []);
  const allRoutesConfiguredFlat = flattenArray(allRoutesConfigured);
  if (allRoutesConfiguredFlat.length === 0) {
    deps.loggerService.logDebug(allConfigurations[0], `No routes to check configured`);
    return next(req);
  }
  const {
    matchingConfig,
    matchingRoute
  } = deps.closestMatchingRouteService.getConfigIdForClosestMatchingRoute(req.url, allConfigurations);
  if (!matchingConfig) {
    deps.loggerService.logDebug(allConfigurations[0], `Did not find any configured route for route ${req.url}`);
    return next(req);
  }
  deps.loggerService.logDebug(matchingConfig, `'${req.url}' matches configured route '${matchingRoute}'`);
  const token = deps.authStateService.getAccessToken(matchingConfig);
  if (!token) {
    deps.loggerService.logDebug(matchingConfig, `Wanted to add token to ${req.url} but found no token: '${token}'`);
    return next(req);
  }
  deps.loggerService.logDebug(matchingConfig, `'${req.url}' matches configured route '${matchingRoute}', adding token`);
  req = req.clone({
    headers: req.headers.set("Authorization", "Bearer " + token)
  });
  return next(req);
}
var DefaultLocalStorageService = class _DefaultLocalStorageService {
  read(key) {
    return localStorage.getItem(key);
  }
  write(key, value) {
    localStorage.setItem(key, value);
  }
  remove(key) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
  static {
    this.ɵfac = function DefaultLocalStorageService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DefaultLocalStorageService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _DefaultLocalStorageService,
      factory: _DefaultLocalStorageService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultLocalStorageService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
export {
  AbstractLoggerService,
  AbstractSecurityStorage,
  AuthInterceptor,
  AuthModule,
  AutoLoginAllRoutesGuard,
  AutoLoginPartialRoutesGuard,
  ConfigurationService,
  DefaultLocalStorageService,
  DefaultSessionStorageService,
  EventTypes,
  LogLevel,
  OidcSecurityService,
  OpenIdConfigLoader,
  PopUpService,
  PublicEventsService,
  StateValidationResult,
  StsConfigHttpLoader,
  StsConfigLoader,
  StsConfigStaticLoader,
  ValidationResult,
  _provideAuth,
  authInterceptor,
  autoLoginPartialRoutesGuard,
  autoLoginPartialRoutesGuardWithConfig,
  provideAuth,
  withAppInitializerAuthCheck
};
/*! Bundled license information:

@angular/core/fesm2022/rxjs-interop.mjs:
  (**
   * @license Angular v18.2.11
   * (c) 2010-2024 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=angular-auth-oidc-client.js.map
