import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  DOCUMENT
} from "./chunk-EWFCY476.js";
import {
  InjectionToken,
  Optional,
  inject
} from "./chunk-D3EDJPAT.js";
import {
  require_cjs
} from "./chunk-ZL3KHTLZ.js";
import {
  __async,
  __require,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-LV3DCXXS.js";

// node_modules/@ng-web-apis/common/fesm2022/ng-web-apis-common.mjs
var import_rxjs = __toESM(require_cjs(), 1);
var WA_WINDOW = new InjectionToken("[WA_WINDOW]", {
  factory: () => {
    const {
      defaultView
    } = inject(DOCUMENT);
    if (!defaultView) {
      throw new Error("Window is not available");
    }
    return defaultView;
  }
});
var WINDOW = WA_WINDOW;
var WA_ANIMATION_FRAME = new InjectionToken("[WA_ANIMATION_FRAME]", {
  factory: () => {
    const {
      requestAnimationFrame,
      cancelAnimationFrame
    } = inject(WINDOW);
    const animationFrame$ = new import_rxjs.Observable((subscriber) => {
      let id = NaN;
      const callback = (timestamp) => {
        subscriber.next(timestamp);
        id = requestAnimationFrame(callback);
      };
      id = requestAnimationFrame(callback);
      return () => {
        cancelAnimationFrame(id);
      };
    });
    return animationFrame$.pipe((0, import_rxjs.share)());
  }
});
var WA_CACHES = new InjectionToken("[WA_CACHES]", {
  factory: () => inject(WINDOW).caches
});
var CACHES = WA_CACHES;
var WA_CRYPTO = new InjectionToken("[WA_CRYPTO]", {
  factory: () => inject(WINDOW).crypto
});
var CRYPTO = WA_CRYPTO;
var WA_CSS = new InjectionToken("[WA_CSS]", {
  factory: () => inject(WINDOW).CSS ?? {
    escape: (v) => v,
    // eslint-disable-next-line no-restricted-syntax
    supports: () => false
  }
});
var WA_HISTORY = new InjectionToken("[WA_HISTORY]", {
  factory: () => inject(WINDOW).history
});
var HISTORY = WA_HISTORY;
var WA_LOCAL_STORAGE = new InjectionToken("[WA_LOCAL_STORAGE]", {
  factory: () => inject(WINDOW).localStorage
});
var WA_LOCATION = new InjectionToken("[WA_LOCATION]", {
  factory: () => inject(WINDOW).location
});
var WA_NAVIGATOR = new InjectionToken("[WA_NAVIGATOR]", {
  factory: () => inject(WINDOW).navigator
});
var NAVIGATOR = WA_NAVIGATOR;
var WA_MEDIA_DEVICES = new InjectionToken("[WA_MEDIA_DEVICES]", {
  factory: () => inject(NAVIGATOR).mediaDevices
});
var MEDIA_DEVICES = WA_MEDIA_DEVICES;
var WA_NETWORK_INFORMATION = new InjectionToken("[WA_NETWORK_INFORMATION]", {
  // @ts-ignore
  factory: () => inject(WA_NAVIGATOR).connection || null
});
var WA_PAGE_VISIBILITY = new InjectionToken("[WA_PAGE_VISIBILITY]", {
  factory: () => {
    const documentRef = inject(DOCUMENT);
    return (0, import_rxjs.fromEvent)(documentRef, "visibilitychange").pipe((0, import_rxjs.startWith)(0), (0, import_rxjs.map)(() => documentRef.visibilityState !== "hidden"), (0, import_rxjs.distinctUntilChanged)(), (0, import_rxjs.shareReplay)({
      refCount: false,
      bufferSize: 1
    }));
  }
});
var WA_PERFORMANCE = new InjectionToken("[WA_PERFORMANCE]", {
  factory: () => inject(WINDOW).performance
});
var WA_SCREEN = new InjectionToken("[WA_SCREEN]", {
  factory: () => inject(WINDOW).screen
});
var WA_SESSION_STORAGE = new InjectionToken("[WA_SESSION_STORAGE]", {
  factory: () => inject(WINDOW).sessionStorage
});
var WA_SPEECH_RECOGNITION = new InjectionToken("[WA_SPEECH_RECOGNITION]: [SPEECH_RECOGNITION]", {
  factory: () => {
    const windowRef = inject(WINDOW);
    return windowRef.speechRecognition || windowRef.webkitSpeechRecognition || null;
  }
});
var WA_SPEECH_SYNTHESIS = new InjectionToken("[WA_SPEECH_SYNTHESIS]", {
  factory: () => inject(WINDOW).speechSynthesis
});
var SPEECH_SYNTHESIS = WA_SPEECH_SYNTHESIS;
var WA_USER_AGENT = new InjectionToken("[WA_USER_AGENT]", {
  factory: () => inject(NAVIGATOR).userAgent
});

// node_modules/@ng-web-apis/universal/fesm2022/ng-web-apis-universal.mjs
var import_rxjs2 = __toESM(require_cjs(), 1);
var UNIVERSAL_ANIMATION_FRAME = {
  provide: WA_ANIMATION_FRAME,
  useValue: import_rxjs2.NEVER
};
function identity(v) {
  return v;
}
function emptyFunction() {
}
function emptyArray() {
  return [];
}
function emptyObject() {
  return {};
}
function alwaysFalse() {
  return false;
}
function alwaysNull() {
  return null;
}
function alwaysZero() {
  return 0;
}
function alwaysRejected() {
  return __async(this, null, function* () {
    return Promise.reject().catch(emptyFunction);
  });
}
var CACHES_MOCK = {
  delete: () => __async(void 0, null, function* () {
    return Promise.resolve(false);
  }),
  has: () => __async(void 0, null, function* () {
    return Promise.resolve(false);
  }),
  keys: () => __async(void 0, null, function* () {
    return Promise.resolve([]);
  }),
  match: alwaysRejected,
  open: alwaysRejected
};
var UNIVERSAL_CACHES = {
  provide: CACHES,
  useValue: CACHES_MOCK
};
var CRYPTO_MOCK = {
  subtle: new Proxy({}, {
    get: () => () => alwaysRejected
  }),
  getRandomValues: identity
};
var UNIVERSAL_CRYPTO = {
  provide: CRYPTO,
  useValue: CRYPTO_MOCK
};
var HISTORY_MOCK = {
  length: 0,
  scrollRestoration: "auto",
  state: {},
  back: emptyFunction,
  forward: emptyFunction,
  go: emptyFunction,
  pushState: emptyFunction,
  replaceState: emptyFunction
};
var UNIVERSAL_HISTORY = {
  provide: HISTORY,
  useValue: HISTORY_MOCK
};
var StorageMock = class {
  storage = /* @__PURE__ */ new Map();
  get length() {
    return this.storage.size;
  }
  getItem(key) {
    return this.storage.has(key) ? this.storage.get(key) : null;
  }
  setItem(key, value) {
    this.storage.set(key, value);
  }
  clear() {
    this.storage.clear();
  }
  key(index) {
    return index < this.storage.size ? [...this.storage.keys()]?.[index] ?? null : null;
  }
  removeItem(key) {
    this.storage.delete(key);
  }
};
var UNIVERSAL_LOCAL_STORAGE = {
  provide: WA_LOCAL_STORAGE,
  useClass: StorageMock
};
var DOMStringListMock = class extends Array {
  contains() {
    return false;
  }
  item() {
    return null;
  }
};
var LocationMock = class {
  ancestorOrigins = new DOMStringListMock();
  hash = "";
  host = "";
  hostname = "";
  href = "";
  origin = "";
  pathname = "";
  port = "";
  protocol = "";
  search = "";
  assign = emptyFunction;
  reload = emptyFunction;
  replace = emptyFunction;
};
var WA_SSR_LOCATION = new InjectionToken("[WA_SSR_LOCATION]");
var SSR_LOCATION = WA_SSR_LOCATION;
var UNIVERSAL_LOCATION = {
  provide: WA_LOCATION,
  deps: [[new Optional(), SSR_LOCATION]],
  useFactory: (location) => location || new LocationMock()
};
var WA_SSR_USER_AGENT = new InjectionToken("[WA_SSR_USER_AGENT]");
var SSR_USER_AGENT = WA_SSR_USER_AGENT;
var EVENT_TARGET = {
  addEventListener: emptyFunction,
  dispatchEvent: alwaysFalse,
  removeEventListener: emptyFunction
};
function getArray() {
  return new class extends Array {
    item = () => null;
    namedItem = () => null;
    refresh() {
    }
  }();
}
var NAVIGATOR_MOCK = {
  appCodeName: "",
  appName: "",
  appVersion: "",
  platform: "",
  product: "",
  productSub: "",
  userAgent: "",
  vendor: "",
  vendorSub: "",
  onLine: false,
  confirmSiteSpecificTrackingException: alwaysFalse,
  confirmWebWideTrackingException: alwaysFalse,
  share: alwaysRejected,
  registerProtocolHandler: emptyFunction,
  unregisterProtocolHandler: emptyFunction,
  removeSiteSpecificTrackingException: emptyFunction,
  removeWebWideTrackingException: emptyFunction,
  storeSiteSpecificTrackingException: emptyFunction,
  storeWebWideTrackingException: emptyFunction,
  credentials: {
    create: alwaysRejected,
    get: alwaysRejected,
    preventSilentAccess: alwaysRejected,
    store: alwaysRejected
  },
  msSaveBlob: alwaysFalse,
  msSaveOrOpenBlob: alwaysFalse,
  sendBeacon: alwaysFalse,
  hardwareConcurrency: 0,
  getDisplayMedia: alwaysRejected,
  language: "",
  languages: [],
  storage: {
    estimate: alwaysRejected,
    persist: alwaysRejected,
    persisted: alwaysRejected
  },
  activeVRDisplays: [],
  authentication: {
    getAssertion: alwaysRejected,
    makeCredential: alwaysRejected
  },
  clipboard: __spreadProps(__spreadValues({}, EVENT_TARGET), {
    readText: alwaysRejected,
    writeText: alwaysRejected
  }),
  cookieEnabled: false,
  doNotTrack: null,
  gamepadInputEmulation: "keyboard",
  geolocation: {
    clearWatch: emptyFunction,
    getCurrentPosition: emptyFunction,
    watchPosition: alwaysZero
  },
  maxTouchPoints: 0,
  mediaDevices: __spreadProps(__spreadValues({}, EVENT_TARGET), {
    ondevicechange: null,
    enumerateDevices: alwaysRejected,
    getSupportedConstraints: emptyObject,
    getUserMedia: alwaysRejected
  }),
  mimeTypes: getArray(),
  msManipulationViewsEnabled: false,
  msMaxTouchPoints: 0,
  msPointerEnabled: false,
  permissions: {
    query: alwaysRejected
  },
  plugins: getArray(),
  pointerEnabled: false,
  serviceWorker: __spreadProps(__spreadValues({}, EVENT_TARGET), {
    controller: null,
    oncontrollerchange: null,
    onmessage: null,
    onmessageerror: null,
    ready: alwaysRejected(),
    getRegistration: alwaysRejected,
    getRegistrations: alwaysRejected,
    register: alwaysRejected,
    startMessages: emptyFunction
  }),
  webdriver: false,
  getGamepads: emptyArray,
  getUserMedia: emptyFunction,
  getVRDisplays: alwaysRejected,
  javaEnabled: alwaysFalse,
  msLaunchUri: emptyFunction,
  requestMediaKeySystemAccess: alwaysRejected,
  vibrate: alwaysFalse
};
var UNIVERSAL_NAVIGATOR = {
  provide: WA_NAVIGATOR,
  deps: [[new Optional(), SSR_USER_AGENT]],
  useFactory: (userAgent) => __spreadProps(__spreadValues({}, NAVIGATOR_MOCK), {
    userAgent: userAgent ?? ""
  })
};
var UNIVERSAL_MEDIA_DEVICES = {
  provide: MEDIA_DEVICES,
  useValue: NAVIGATOR_MOCK.mediaDevices
};
function performanceFactory() {
  return safeRequire("node:perf_hooks")?.performance || safeRequire("perf_hooks")?.performance || globalThis.performance;
}
var UNIVERSAL_PERFORMANCE = {
  provide: WA_PERFORMANCE,
  deps: [],
  useFactory: performanceFactory
};
function safeRequire(modulePath) {
  try {
    return __require(modulePath);
  } catch {
    return void 0;
  }
}
var UNIVERSAL_SESSION_STORAGE = {
  provide: WA_SESSION_STORAGE,
  useClass: StorageMock
};
var SPEECH_SYNTHESIS_MOCK = {
  paused: false,
  pending: false,
  speaking: false,
  onvoiceschanged: emptyFunction,
  addEventListener: emptyFunction,
  removeEventListener: emptyFunction,
  dispatchEvent: alwaysFalse,
  cancel: emptyFunction,
  pause: emptyFunction,
  resume: emptyFunction,
  speak: emptyFunction,
  getVoices: emptyArray
};
var UNIVERSAL_SPEECH_SYNTHESIS = {
  provide: SPEECH_SYNTHESIS,
  useValue: SPEECH_SYNTHESIS_MOCK
};
var UNIVERSAL_USER_AGENT = {
  provide: WA_USER_AGENT,
  deps: [[new Optional(), SSR_USER_AGENT]],
  useFactory: (userAgent) => userAgent ?? ""
};
var BlobMock = class {
  size = 0;
  type = "";
  arrayBuffer = () => __async(this, null, function* () {
    return alwaysRejected();
  });
  stream = () => new ReadableStream();
  text = () => __async(this, null, function* () {
    return alwaysRejected();
  });
  slice = () => this;
};
var COMPUTED_STYLES = {
  getPropertyPriority: () => "",
  getPropertyValue: () => "",
  item: () => "",
  removeProperty: () => "",
  setProperty: emptyFunction
};
var COMPUTED_STYLES_HANDLER = {
  get: (obj, key) => key in obj ? obj[key] : null
};
var COMPUTED_STYLES_PROXY = new Proxy(COMPUTED_STYLES, COMPUTED_STYLES_HANDLER);
var CSS_RULES = new class extends Array {
  item = () => null;
}();
var BAR_PROP = {
  visible: false
};
var DB_REQUEST = __spreadProps(__spreadValues({}, EVENT_TARGET), {
  onblocked: null,
  onerror: null,
  onsuccess: null,
  onupgradeneeded: null,
  error: null,
  readyState: "pending",
  result: null,
  source: null,
  transaction: null
});
var SELF = ["frames", "parent", "self", "top", "window"];
var WINDOW_HANDLER = {
  get: (windowRef, key) => {
    if (SELF.includes(key)) {
      return windowRef;
    }
    return key.startsWith("on") ? null : windowRef[key];
  }
};
var UNIVERSAL_WINDOW = {
  provide: WA_WINDOW,
  deps: [DOCUMENT, [new Optional(), SSR_LOCATION], [new Optional(), SSR_USER_AGENT]],
  useFactory: (document, location, userAgent) => {
    const windowMock = __spreadProps(__spreadValues({}, EVENT_TARGET), {
      document,
      localStorage: new StorageMock(),
      location: location ?? new LocationMock(),
      navigator: __spreadProps(__spreadValues({}, NAVIGATOR_MOCK), {
        userAgent: userAgent ?? ""
      }),
      performance: performanceFactory(),
      sessionStorage: new StorageMock(),
      speechSynthesis: SPEECH_SYNTHESIS_MOCK,
      caches: CACHES_MOCK,
      crypto: CRYPTO_MOCK,
      URL,
      URLSearchParams,
      setTimeout,
      setInterval,
      clearTimeout,
      clearInterval,
      console,
      Blob: BlobMock,
      alert: emptyFunction,
      clientInformation: __spreadProps(__spreadValues({}, NAVIGATOR_MOCK), {
        userAgent: userAgent ?? ""
      }),
      // TODO: Candidate for token
      matchMedia: () => __spreadProps(__spreadValues({}, EVENT_TARGET), {
        matches: false,
        media: "",
        onchange: null,
        addListener: emptyFunction,
        removeListener: emptyFunction
      }),
      // TODO: Candidate for token
      indexedDB: {
        cmp: alwaysZero,
        open: () => DB_REQUEST,
        deleteDatabase: () => DB_REQUEST
      },
      customElements: {
        define: emptyFunction,
        get: emptyFunction,
        upgrade: emptyFunction,
        whenDefined: alwaysRejected
      },
      styleMedia: {
        type: "",
        matchMedium: alwaysFalse
      },
      history: {
        length: 0,
        scrollRestoration: "auto",
        state: {},
        back: emptyFunction,
        forward: emptyFunction,
        go: emptyFunction,
        pushState: emptyFunction,
        replaceState: emptyFunction
      },
      closed: false,
      defaultStatus: "",
      devicePixelRatio: 1,
      doNotTrack: "",
      frameElement: null,
      innerHeight: 0,
      innerWidth: 0,
      isSecureContext: false,
      length: 0,
      name: "",
      offscreenBuffering: false,
      opener: {},
      origin: "",
      orientation: "",
      outerHeight: 0,
      outerWidth: 0,
      pageXOffset: 0,
      pageYOffset: 0,
      screenLeft: 0,
      screenTop: 0,
      screenX: 0,
      screenY: 0,
      scrollX: 0,
      scrollY: 0,
      status: "",
      blur: emptyFunction,
      cancelAnimationFrame: emptyFunction,
      captureEvents: emptyFunction,
      close: emptyFunction,
      confirm: alwaysFalse,
      departFocus: emptyFunction,
      focus: emptyFunction,
      moveBy: emptyFunction,
      moveTo: emptyFunction,
      open: alwaysNull,
      postMessage: emptyFunction,
      print: emptyFunction,
      prompt: alwaysNull,
      releaseEvents: emptyFunction,
      requestAnimationFrame: alwaysZero,
      resizeBy: emptyFunction,
      resizeTo: emptyFunction,
      scroll: emptyFunction,
      scrollBy: emptyFunction,
      scrollTo: emptyFunction,
      stop: emptyFunction,
      atob: identity,
      btoa: identity,
      fetch: alwaysRejected,
      createImageBitmap: alwaysRejected,
      queueMicrotask: emptyFunction,
      locationbar: BAR_PROP,
      menubar: BAR_PROP,
      personalbar: BAR_PROP,
      scrollbars: BAR_PROP,
      statusbar: BAR_PROP,
      toolbar: BAR_PROP,
      getComputedStyle: () => COMPUTED_STYLES_PROXY,
      getMatchedCSSRules: () => CSS_RULES,
      getSelection: () => null
    });
    return new Proxy(windowMock, WINDOW_HANDLER);
  }
};
var UNIVERSAL_PROVIDERS = [UNIVERSAL_ANIMATION_FRAME, UNIVERSAL_CACHES, UNIVERSAL_CRYPTO, UNIVERSAL_HISTORY, UNIVERSAL_LOCAL_STORAGE, UNIVERSAL_SESSION_STORAGE, UNIVERSAL_LOCATION, UNIVERSAL_MEDIA_DEVICES, UNIVERSAL_NAVIGATOR, UNIVERSAL_PERFORMANCE, UNIVERSAL_SPEECH_SYNTHESIS, UNIVERSAL_USER_AGENT, UNIVERSAL_WINDOW];
function provideLocation(req) {
  const protocol = "encrypted" in req.socket ? "https" : "http";
  const url = new URL(`${protocol}://${req.headers.host}${req.url}`);
  url.assign = emptyFunction;
  url.reload = emptyFunction;
  url.replace = emptyFunction;
  url.ancestorOrigins = new DOMStringListMock();
  return {
    provide: SSR_LOCATION,
    useValue: url
  };
}
function provideUserAgent(req) {
  return {
    provide: SSR_USER_AGENT,
    useValue: req.headers["user-agent"]
  };
}
export {
  CACHES_MOCK,
  CRYPTO_MOCK,
  EVENT_TARGET,
  HISTORY_MOCK,
  NAVIGATOR_MOCK,
  SPEECH_SYNTHESIS_MOCK,
  SSR_LOCATION,
  SSR_USER_AGENT,
  UNIVERSAL_ANIMATION_FRAME,
  UNIVERSAL_CACHES,
  UNIVERSAL_CRYPTO,
  UNIVERSAL_HISTORY,
  UNIVERSAL_LOCAL_STORAGE,
  UNIVERSAL_LOCATION,
  UNIVERSAL_MEDIA_DEVICES,
  UNIVERSAL_NAVIGATOR,
  UNIVERSAL_PERFORMANCE,
  UNIVERSAL_PROVIDERS,
  UNIVERSAL_SESSION_STORAGE,
  UNIVERSAL_SPEECH_SYNTHESIS,
  UNIVERSAL_USER_AGENT,
  UNIVERSAL_WINDOW,
  WA_SSR_LOCATION,
  WA_SSR_USER_AGENT,
  alwaysFalse,
  alwaysNull,
  alwaysRejected,
  alwaysZero,
  emptyArray,
  emptyFunction,
  emptyObject,
  identity,
  performanceFactory,
  provideLocation,
  provideUserAgent
};
//# sourceMappingURL=@ng-web-apis_universal.js.map
