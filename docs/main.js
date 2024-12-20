(self["webpackChunkERP"] = self["webpackChunkERP"] || []).push([["main"],{

/***/ 97900:
/*!********************************!*\
  !*** ./src/app-initializer.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppInitializer: () => (/* binding */ AppInitializer)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment-timezone */ 6923);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash-es */ 93362);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lodash-es */ 23950);
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/AppConsts */ 98341);
/* harmony import */ var _shared_session_app_session_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/session/app-session.service */ 59626);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ 45312);
/* harmony import */ var _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/service-proxies/service-proxies */ 81801);
/* harmony import */ var _shared_multi_tenancy_tenant_resolvers_subdomain_tenant_resolver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/multi-tenancy/tenant-resolvers/subdomain-tenant-resolver */ 55614);
/* harmony import */ var _shared_multi_tenancy_tenant_resolvers_query_string_tenant_resolver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/multi-tenancy/tenant-resolvers/query-string-tenant-resolver */ 77188);
/* harmony import */ var _shared_AppBaseURL_appBaseURL__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/AppBaseURL/appBaseURL */ 15473);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ 46443);













class AppInitializer {
  constructor(_injector, _platformLocation, _httpClient) {
    this._injector = _injector;
    this._platformLocation = _platformLocation;
    this._httpClient = _httpClient;
  }
  init() {
    return () => {
      abp.ui.setBusy();
      return new Promise((resolve, reject) => {
        _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.appBaseHref = this.getBaseHref();
        const appBaseUrl = this.getDocumentOrigin() + _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.appBaseHref;
        this.getApplicationConfig(appBaseUrl, () => {
          this.getUserConfiguration(() => {
            abp.event.trigger("abp.dynamicScriptsInitialized");
            // do not use constructor injection for AppSessionService
            const appSessionService = this._injector.get(_shared_session_app_session_service__WEBPACK_IMPORTED_MODULE_2__.AppSessionService);
            appSessionService.init().then(result => {
              abp.ui.clearBusy();
              if (this.shouldLoadLocale()) {
                const angularLocale = this.convertAbpLocaleToAngularLocale(abp.localization.currentLanguage.name);
                __webpack_require__(77055)(`./${angularLocale}.mjs`).then(module => {
                  (0,_angular_common__WEBPACK_IMPORTED_MODULE_8__.registerLocaleData)(module.default);
                  resolve(result);
                }, reject);
              } else {
                resolve(result);
              }
            }, err => {
              abp.ui.clearBusy();
              reject(err);
            });
          });
        });
      });
    };
  }
  getBaseHref() {
    const baseUrl = this._platformLocation.getBaseHrefFromDOM();
    if (baseUrl) {
      return baseUrl;
    }
    return "/";
  }
  getDocumentOrigin() {
    if (!document.location.origin) {
      const port = document.location.port ? ":" + document.location.port : "";
      return document.location.protocol + "//" + document.location.hostname + port;
    }
    return document.location.origin;
  }
  shouldLoadLocale() {
    return abp.localization.currentLanguage.name && abp.localization.currentLanguage.name !== "en-US";
  }
  convertAbpLocaleToAngularLocale(locale) {
    if (!_shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.localeMappings) {
      return locale;
    }
    const localeMapings = (0,lodash_es__WEBPACK_IMPORTED_MODULE_9__["default"])(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.localeMappings, {
      from: locale
    });
    if (localeMapings && localeMapings.length) {
      return localeMapings[0]["to"];
    }
    return locale;
  }
  getCurrentClockProvider(currentProviderName) {
    if (currentProviderName === "unspecifiedClockProvider") {
      return abp.timing.unspecifiedClockProvider;
    }
    if (currentProviderName === "utcClockProvider") {
      return abp.timing.utcClockProvider;
    }
    return abp.timing.localClockProvider;
  }
  getUserConfiguration(callback) {
    const cookieLangValue = abp.utils.getCookieValue("Abp.Localization.CultureName");
    const token = abp.auth.getToken();
    const requestHeaders = {
      "Abp.TenantId": `${abp.multiTenancy.getTenantIdCookie()}`,
      ".AspNetCore.Culture": `c=${cookieLangValue}|uic=${cookieLangValue}`
    };
    if (token) {
      requestHeaders["Authorization"] = `Bearer ${token}`;
    }
    this._httpClient.get(`${_shared_AppBaseURL_appBaseURL__WEBPACK_IMPORTED_MODULE_7__.newBaseUrl}AbpUserConfiguration/GetAll`, {
      headers: requestHeaders
    }).subscribe(response => {
      const result = response.result;
      (0,lodash_es__WEBPACK_IMPORTED_MODULE_10__["default"])(abp, result);
      abp.clock.provider = this.getCurrentClockProvider(result.clock.provider);
      moment_timezone__WEBPACK_IMPORTED_MODULE_0__.locale(abp.localization.currentLanguage.name);
      if (abp.clock.provider.supportsMultipleTimezone) {
        moment_timezone__WEBPACK_IMPORTED_MODULE_0__.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
      }
      callback();
    });
  }
  getApplicationConfig(appRootUrl, callback) {
    this._httpClient.get(`${appRootUrl}assets/${_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.appConfig}`, {
      headers: {
        "Abp.TenantId": `${abp.multiTenancy.getTenantIdCookie()}`
      }
    }).subscribe(response => {
      _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.appBaseUrl = response.appBaseUrl;
      _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.remoteServiceBaseUrl = response.remoteServiceBaseUrl;
      _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.localeMappings = response.localeMappings;
      // Find tenant from subdomain
      var tenancyName = this.resolveTenancyName(response.appBaseUrl);
      if (tenancyName == null) {
        callback();
      } else {
        this.ConfigureTenantIdCookie(tenancyName, callback);
      }
    });
  }
  ConfigureTenantIdCookie(tenancyName, callback) {
    let accountServiceProxy = this._injector.get(_shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_4__.AccountServiceProxy);
    let input = new _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_4__.IsTenantAvailableInput();
    input.tenancyName = tenancyName;
    accountServiceProxy.isTenantAvailable(input).subscribe(result => {
      if (result.state === _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_4__.TenantAvailabilityState._1) {
        // Available
        abp.multiTenancy.setTenantIdCookie(result.tenantId);
      }
      callback();
    });
  }
  resolveTenancyName(appBaseUrl) {
    var subdomainTenantResolver = new _shared_multi_tenancy_tenant_resolvers_subdomain_tenant_resolver__WEBPACK_IMPORTED_MODULE_5__.SubdomainTenantResolver();
    var tenancyName = subdomainTenantResolver.resolve(appBaseUrl);
    if (tenancyName) {
      return tenancyName;
    }
    var queryStirngTenantResolver = new _shared_multi_tenancy_tenant_resolvers_query_string_tenant_resolver__WEBPACK_IMPORTED_MODULE_6__.QueryStringTenantResolver();
    var tenancyName = queryStirngTenantResolver.resolve(appBaseUrl);
    if (tenancyName) {
      return tenancyName;
    }
    // add other tenancy resolvers here, ex: CookieTenantResolver, QueryStringTenantResolver etc...
    return null;
  }
  static #_ = this.ɵfac = function AppInitializer_Factory(t) {
    return new (t || AppInitializer)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_8__.PlatformLocation), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_12__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjectable"]({
    token: AppInitializer,
    factory: AppInitializer.ɵfac,
    providedIn: "root"
  });
}

/***/ }),

/***/ 45312:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
const environment = {
  production: false,
  hmr: false,
  appConfig: 'appconfig.json'
};

/***/ }),

/***/ 5385:
/*!********************!*\
  !*** ./src/hmr.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hmrBootstrap: () => (/* binding */ hmrBootstrap)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angularclass_hmr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angularclass/hmr */ 3219);


const hmrBootstrap = (module, bootstrap) => {
  let ngModule;
  module.hot.accept();
  bootstrap().then(mod => ngModule = mod);
  module.hot.dispose(() => {
    const appRef = ngModule.injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_0__.ApplicationRef);
    const elements = appRef.components.map(c => c.location.nativeElement);
    const makeVisible = (0,_angularclass_hmr__WEBPACK_IMPORTED_MODULE_1__.createNewHosts)(elements);
    ngModule.destroy();
    makeVisible();
  });
};

/***/ }),

/***/ 84429:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 80436);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./environments/environment */ 45312);
/* harmony import */ var _root_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./root.module */ 77004);
/* harmony import */ var _hmr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hmr */ 5385);
/* harmony import */ var moment_min_locales_min__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment/min/locales.min */ 95711);
/* harmony import */ var moment_min_locales_min__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment_min_locales_min__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment-timezone */ 6923);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_4__);







if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.enableProdMode)();
}
const bootstrap = () => {
  return _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.platformBrowser().bootstrapModule(_root_module__WEBPACK_IMPORTED_MODULE_1__.RootModule);
};
/* "Hot Module Replacement" is enabled as described on
 * https://medium.com/@beeman/tutorial-enable-hrm-in-angular-cli-apps-1b0d13b80130#.sa87zkloh
 */
if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.hmr) {
  if (false) {} else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap(); // Regular bootstrap
}

/***/ }),

/***/ 17797:
/*!************************************!*\
  !*** ./src/root-routing.module.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RootRoutingModule: () => (/* binding */ RootRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);



const routes = [{
  path: "",
  redirectTo: "/app/dashboard",
  pathMatch: "full"
}, {
  path: "account",
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_account_account_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! account/account.module */ 55547)).then(m => m.AccountModule),
  data: {
    preload: true
  }
}, {
  path: "app",
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_app_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! app/app.module */ 50635)).then(m => m.AppModule),
  data: {
    preload: true
  }
}];
class RootRoutingModule {
  static #_ = this.ɵfac = function RootRoutingModule_Factory(t) {
    return new (t || RootRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: RootRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](RootRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  });
})();

/***/ }),

/***/ 91321:
/*!*******************************!*\
  !*** ./src/root.component.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RootComponent: () => (/* binding */ RootComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 95072);


class RootComponent {
  static #_ = this.ɵfac = function RootComponent_Factory(t) {
    return new (t || RootComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: RootComponent,
    selectors: [["app-root"]],
    decls: 1,
    vars: 0,
    template: function RootComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
    encapsulation: 2
  });
}

/***/ }),

/***/ 77004:
/*!****************************!*\
  !*** ./src/root.module.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RootModule: () => (/* binding */ RootModule),
/* harmony export */   getCurrentLanguage: () => (/* binding */ getCurrentLanguage)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser */ 80436);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser/animations */ 43835);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-bootstrap/modal */ 2457);
/* harmony import */ var ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-bootstrap/dropdown */ 54195);
/* harmony import */ var ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-bootstrap/collapse */ 18751);
/* harmony import */ var ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-bootstrap/tabs */ 75119);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/paginator */ 43157);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! abp-ng2-module */ 26173);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/shared.module */ 31699);
/* harmony import */ var _shared_service_proxies_service_proxy_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/service-proxies/service-proxy.module */ 7707);
/* harmony import */ var _root_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./root-routing.module */ 17797);
/* harmony import */ var _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/service-proxies/service-proxies */ 81801);
/* harmony import */ var _root_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./root.component */ 91321);
/* harmony import */ var _app_initializer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-initializer */ 97900);
/* harmony import */ var _shared_AppBaseURL_appBaseURL__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/AppBaseURL/appBaseURL */ 15473);























function getCurrentLanguage() {
  if (abp.localization.currentLanguage.name) {
    return abp.localization.currentLanguage.name;
  }
  // todo: Waiting for https://github.com/angular/angular/issues/31465 to be fixed.
  return "en";
}
class RootModule {
  static #_ = this.ɵfac = function RootModule_Factory(t) {
    return new (t || RootModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({
    type: RootModule,
    bootstrap: [_root_component__WEBPACK_IMPORTED_MODULE_4__.RootComponent]
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({
    providers: [{
      provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HTTP_INTERCEPTORS,
      useClass: abp_ng2_module__WEBPACK_IMPORTED_MODULE_9__.AbpHttpInterceptor,
      multi: true
    }, {
      provide: _angular_core__WEBPACK_IMPORTED_MODULE_7__.APP_INITIALIZER,
      useFactory: appInitializer => appInitializer.init(),
      deps: [_app_initializer__WEBPACK_IMPORTED_MODULE_5__.AppInitializer],
      multi: true
    }, {
      provide: _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_3__.API_BASE_URL,
      useFactory: () => _shared_AppBaseURL_appBaseURL__WEBPACK_IMPORTED_MODULE_6__.newBaseUrl
    }, {
      provide: _angular_core__WEBPACK_IMPORTED_MODULE_7__.LOCALE_ID,
      useFactory: getCurrentLanguage
    }],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.BrowserAnimationsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClientModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule.forRoot(), ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_12__.ModalModule.forRoot(), ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_13__.BsDropdownModule.forRoot(), ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_14__.CollapseModule.forRoot(), ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_15__.TabsModule.forRoot(), _shared_service_proxies_service_proxy_module__WEBPACK_IMPORTED_MODULE_1__.ServiceProxyModule, _root_routing_module__WEBPACK_IMPORTED_MODULE_2__.RootRoutingModule, primeng_paginator__WEBPACK_IMPORTED_MODULE_16__.PaginatorModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](RootModule, {
    declarations: [_root_component__WEBPACK_IMPORTED_MODULE_4__.RootComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.BrowserAnimationsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClientModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_12__.ModalModule, ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_13__.BsDropdownModule, ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_14__.CollapseModule, ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_15__.TabsModule, _shared_service_proxies_service_proxy_module__WEBPACK_IMPORTED_MODULE_1__.ServiceProxyModule, _root_routing_module__WEBPACK_IMPORTED_MODULE_2__.RootRoutingModule, primeng_paginator__WEBPACK_IMPORTED_MODULE_16__.PaginatorModule]
  });
})();

/***/ }),

/***/ 15473:
/*!*********************************************!*\
  !*** ./src/shared/AppBaseURL/appBaseURL.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   newBaseUrl: () => (/* binding */ newBaseUrl)
/* harmony export */ });
let newBaseUrl = "Dev";
const baseUrlMap = {
  Dev: "http://142.4.222.78:449/",
  Live: "http://142.4.222.78:444/",
  Testing: "http://142.4.222.78:256/",
  VelocityOne: "http://142.4.222.78:446/"
};
newBaseUrl = baseUrlMap[newBaseUrl] || newBaseUrl;

/***/ }),

/***/ 98341:
/*!*********************************!*\
  !*** ./src/shared/AppConsts.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppConsts: () => (/* binding */ AppConsts)
/* harmony export */ });
class AppConsts {
  static #_ = this.tenancyNamePlaceHolderInUrl = '{TENANCY_NAME}';
  static #_2 = this.localeMappings = [];
  static #_3 = this.userManagement = {
    defaultAdminUserName: 'admin'
  };
  static #_4 = this.localization = {
    defaultLocalizationSourceName: 'ERP'
  };
  static #_5 = this.authorization = {
    encryptedAuthTokenName: 'enc_auth_token'
  };
}

/***/ }),

/***/ 18133:
/*!******************************************!*\
  !*** ./src/shared/app-component-base.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponentBase: () => (/* binding */ AppComponentBase)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/AppConsts */ 98341);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! abp-ng2-module */ 26173);
/* harmony import */ var _shared_session_app_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/session/app-session.service */ 59626);




class AppComponentBase {
  constructor(injector) {
    this.localizationSourceName = _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.localization.defaultLocalizationSourceName;
    this.localization = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.LocalizationService);
    this.permission = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.PermissionCheckerService);
    this.feature = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.FeatureCheckerService);
    this.notify = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.NotifyService);
    this.setting = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.SettingService);
    this.message = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.MessageService);
    this.multiTenancy = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.AbpMultiTenancyService);
    this.appSession = injector.get(_shared_session_app_session_service__WEBPACK_IMPORTED_MODULE_1__.AppSessionService);
    this.elementRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef);
  }
  l(key, ...args) {
    let localizedText = this.localization.localize(key, this.localizationSourceName);
    if (!localizedText) {
      localizedText = key;
    }
    if (!args || !args.length) {
      return localizedText;
    }
    args.unshift(localizedText);
    return abp.utils.formatString.apply(this, args);
  }
  isGranted(permissionName) {
    return this.permission.isGranted(permissionName);
  }
}

/***/ }),

/***/ 43728:
/*!*********************************************!*\
  !*** ./src/shared/auth/app-auth.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppAuthService: () => (/* binding */ AppAuthService)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 89475);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 61318);
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/AppConsts */ 98341);
/* harmony import */ var _shared_helpers_UrlHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/helpers/UrlHelper */ 10617);
/* harmony import */ var _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/service-proxies/service-proxies */ 81801);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 59452);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! abp-ng2-module */ 26173);









class AppAuthService {
  constructor(_tokenAuthService, _router, _utilsService, _tokenService, _logService) {
    this._tokenAuthService = _tokenAuthService;
    this._router = _router;
    this._utilsService = _utilsService;
    this._tokenService = _tokenService;
    this._logService = _logService;
    this.clear();
  }
  logout(reload) {
    abp.auth.clearToken();
    abp.utils.deleteCookie(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.authorization.encryptedAuthTokenName);
    if (reload !== false) {
      location.href = _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.appBaseUrl;
    }
    localStorage.removeItem("SelecedFinancialYearObject");
    localStorage.clear();
  }
  // logout(reload?: boolean): void {
  //   // Clear authentication tokens and cookies
  //   abp.auth.clearToken();
  //   abp.utils.deleteCookie(AppConsts.authorization.encryptedAuthTokenName);
  //   // Remove the selected financial year from local storage
  //   localStorage.removeItem("SelecedFinancialYearObject");
  //   // Dynamically determine whether to redirect to the live URL or stay on localhost
  //   const redirectUrl = UrlHelper.getCorrectUrl(); // Use the helper method to get the correct URL
  //   // Redirect if 'reload' is not explicitly set to false
  //   if (reload !== false) {
  //     location.href = redirectUrl; // Redirect to the correct URL
  //   }
  // }
  authenticate(finallyCallback) {
    finallyCallback = finallyCallback || (() => {});
    this._tokenAuthService.authenticate(this.authenticateModel).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.finalize)(() => {
      finallyCallback();
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
      this.logout();
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(null);
    })).subscribe(result => {
      this.processAuthenticateResult(result);
    });
  }
  processAuthenticateResult(authenticateResult) {
    this.authenticateResult = authenticateResult;
    if (authenticateResult.accessToken) {
      // Successfully logged in
      this.login(authenticateResult.accessToken, authenticateResult.encryptedAccessToken, authenticateResult.expireInSeconds, this.rememberMe);
    } else {
      // Unexpected result!
      this._logService.warn("Unexpected authenticateResult!");
      this._router.navigate(["account/login"]);
    }
  }
  login(accessToken, encryptedAccessToken, expireInSeconds, rememberMe) {
    const tokenExpireDate = rememberMe ? new Date(new Date().getTime() + 1000 * expireInSeconds) : undefined;
    this._tokenService.setToken(accessToken, tokenExpireDate);
    this._utilsService.setCookieValue(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.authorization.encryptedAuthTokenName, encryptedAccessToken, tokenExpireDate, abp.appPath);
    let initialUrl = _shared_helpers_UrlHelper__WEBPACK_IMPORTED_MODULE_1__.UrlHelper.initialUrl;
    // let initialUrl = UrlHelper.getCorrectUrl();
    debugger;
    if (initialUrl.indexOf("/login") > 0) {
      debugger;
      initialUrl = _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.appBaseUrl;
    }
    debugger;
    location.href = initialUrl;
  }
  clear() {
    this.authenticateModel = new _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_2__.AuthenticateModel();
    this.authenticateModel.rememberClient = false;
    this.authenticateResult = null;
    this.rememberMe = false;
  }
  static #_ = this.ɵfac = function AppAuthService_Factory(t) {
    return new (t || AppAuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_2__.TokenAuthServiceProxy), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_8__.UtilsService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_8__.TokenService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_8__.LogService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
    token: AppAuthService,
    factory: AppAuthService.ɵfac
  });
}

/***/ }),

/***/ 37191:
/*!*********************************************!*\
  !*** ./src/shared/auth/auth-route-guard.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRouteGuard: () => (/* binding */ AppRouteGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! abp-ng2-module */ 26173);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _session_app_session_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../session/app-session.service */ 59626);




class AppRouteGuard {
  constructor(_permissionChecker, _router, _sessionService) {
    this._permissionChecker = _permissionChecker;
    this._router = _router;
    this._sessionService = _sessionService;
  }
  canActivate(route, state) {
    if (!this._sessionService.user) {
      this._router.navigate(["/account/login"]);
      return false;
    }
    if (!route.data || !route.data["permission"]) {
      return true;
    }
    if (this._permissionChecker.isGranted(route.data["permission"])) {
      return true;
    }
    this._router.navigate([this.selectBestRoute()]);
    return false;
  }
  canActivateChild(route, state) {
    return this.canActivate(route, state);
  }
  selectBestRoute() {
    if (!this._sessionService.user) {
      return "/account/login";
    }
    if (this._permissionChecker.isGranted("Pages.Users")) {
      return "/app/admin/users";
    }
    return "/app/dashboard";
  }
  static #_ = this.ɵfac = function AppRouteGuard_Factory(t) {
    return new (t || AppRouteGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.PermissionCheckerService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_session_app_session_service__WEBPACK_IMPORTED_MODULE_0__.AppSessionService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: AppRouteGuard,
    factory: AppRouteGuard.ɵfac
  });
}

/***/ }),

/***/ 9341:
/*!********************************************************************************************!*\
  !*** ./src/shared/components/chart-of-account-picker/chart-of-account-picker.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChartOfAccountPickerComponent: () => (/* binding */ ChartOfAccountPickerComponent)
/* harmony export */ });
/* harmony import */ var _Users_muhammadhassankhan_Documents_devoclock_github_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap/modal */ 2457);
/* harmony import */ var _shared_servicesAndDtos_Services_suggestion_lookup_table_moda_l_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service */ 6707);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/api */ 17780);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/table */ 76676);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/inputtext */ 48361);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/button */ 49136);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/dialog */ 16280);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/paginator */ 43157);













const _c0 = ["SuggestionLookupTableModalComponent"];
const _c1 = () => ({
  width: "100%",
  "overflow-y": "auto"
});
const _c2 = () => ({
  "min-width": "54rem"
});
const _c3 = a0 => [5, 20, 30, a0];
function ChartOfAccountPickerComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 19)(1, "div", 20)(2, "label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 23)(6, "div", 24)(7, "input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("keydown.shift.p", function ChartOfAccountPickerComponent_div_0_Template_input_keydown_shift_p_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.openPicker());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function ChartOfAccountPickerComponent_div_0_Template_input_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r2.id, $event) || (ctx_r2.id = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 26)(9, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ChartOfAccountPickerComponent_div_0_Template_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.openPicker());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "i", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, " Pick ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 29)(13, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ChartOfAccountPickerComponent_div_0_Template_button_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.setToNull());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](14, "i", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 32)(16, "input", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function ChartOfAccountPickerComponent_div_0_Template_input_ngModelChange_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r2.name, $event) || (ctx_r2.name = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ChartOfAccountPickerComponent_div_0_Template_input_ngModelChange_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.SetName($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("htmlFor", ctx_r2.title + "ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r2.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("id", ctx_r2.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r2.disable);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r2.disable);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("id", ctx_r2.title + "title");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("name", ctx_r2.name)("disabled", ctx_r2.editable);
  }
}
function ChartOfAccountPickerComponent_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr")(1, "th", 34)(2, "div", 35)(3, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, " Id ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "p-sortIcon", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "th", 38)(7, "div", 35)(8, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, " Name ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "p-sortIcon", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "th", 40)(12, "div", 35)(13, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, " Account Id");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "p-sortIcon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "th", 42)(17, "div", 35)(18, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, " Account Type ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](20, "p-sortIcon", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "th", 44)(22, "div", 35)(23, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24, " Short Name ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](25, "p-sortIcon", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "th", 45)(27, "div", 35)(28, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](29, " Actions ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](30, "p-sortIcon", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
}
function ChartOfAccountPickerComponent_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr")(1, "td", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "td", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "td", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "td", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "td", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "td")(12, "button", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ChartOfAccountPickerComponent_ng_template_20_Template_button_click_12_listener() {
      const item_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.SelectChartOfAccount(item_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("title", item_r5.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r5.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("title", item_r5.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r5.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("title", item_r5.serialNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r5.serialNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("title", item_r5.accountTypeName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r5.accountTypeName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("title", item_r5.accountTypeShortName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r5.accountTypeShortName);
  }
}
// import { ChartOfAccountModalComponent } from './chart-of-account-modal.component';
class ChartOfAccountPickerComponent {
  constructor(suggestionService, _suggestionLookupTableModaLService) {
    this.suggestionService = suggestionService;
    this._suggestionLookupTableModaLService = _suggestionLookupTableModaLService;
    this.showId = true;
    this.forGrid = true;
    this.editable = true;
    this.getEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.chartOfAccountData = [];
    this.loading = false;
    this.data = [];
    this.totalCount = 0;
    this.currentPage = 1;
    this.skipCount = 0;
    this.maxCount = 5;
  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.openPicker();
  }
  openPicker() {
    debugger;
    this.target = this.title;
    this.name = "";
    this.serialNumber = "";
    // this.suggestionModalRef = this.suggestionService.show(ChartOfAccountModalComponent, { initialState });
    this.openModal = true;
    this.loadData();
  }
  SetName(value) {
    debugger;
    // this.onValuechange.emit(value)
  }
  setToNull() {
    this.id = null;
    this.name = null;
    this.serialNumber = null;
    this.accountTypeName = null;
    this.accountTypeShortName = null;
  }
  closePicker() {
    this.suggestionModalRef.hide();
  }
  OpenServiceRequisition() {
    debugger;
    this.openModal = true;
    this.getAll();
  }
  getAll(event) {
    if (!this.active) {
      return;
    }
    this.loadData();
  }
  loadData() {
    debugger;
    this.loading = true;
    this._suggestionLookupTableModaLService.getBudgetCOA(this.skipCount, this.maxCount, this.name, this.target, this.serialNumber).subscribe(result => {
      debugger;
      console.log('Modal closed with result:', result);
      this.chartOfAccountData = result.items;
      this.totalCount = result.totalCount;
      this.loading = false;
    });
  }
  SelectChartOfAccount(item) {
    this.getEmitter.emit(item);
    this.openModal = false;
  }
  Search() {
    debugger;
    this.loadData();
  }
  onPageChange(event) {
    var _this = this;
    return (0,_Users_muhammadhassankhan_Documents_devoclock_github_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.maxCount = event.rows;
      _this.skipCount = event.page + 1;
      debugger;
      _this.loadData();
    })();
  }
  static #_ = this.ɵfac = function ChartOfAccountPickerComponent_Factory(t) {
    return new (t || ChartOfAccountPickerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__.BsModalService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_shared_servicesAndDtos_Services_suggestion_lookup_table_moda_l_service__WEBPACK_IMPORTED_MODULE_1__.SuggestionLookupTableModaLService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: ChartOfAccountPickerComponent,
    selectors: [["app-chart-of-account-picker"]],
    viewQuery: function ChartOfAccountPickerComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.SuggestionLookupTableModalComponent = _t.first);
      }
    },
    inputs: {
      showId: "showId",
      forGrid: "forGrid",
      editable: "editable",
      title: "title",
      title2: "title2",
      id: "id",
      name: "name",
      serialNumber: "serialNumber",
      accountTypeName: "accountTypeName",
      accountTypeShortName: "accountTypeShortName",
      formControlName: "formControlName",
      disable: "disable"
    },
    outputs: {
      getEmitter: "getEmitter"
    },
    decls: 22,
    vars: 23,
    consts: [["requisitionTable", ""], ["class", "row", "style", "z-index: 1050;", 4, "ngIf"], ["header", "Select Chart of Account", 3, "visibleChange", "maximizable", "modal", "visible", "draggable"], ["id", "suggestionTable", 1, "table-responsive", "modal-body"], [1, "row", "mb-4"], ["id", "inputField", 1, "col-md-4", "flex", "flex-column"], ["for", "id"], ["id", "id", "type", "text", "pInputText", "", 2, "height", "41px", "width", "100%", 3, "ngModelChange", "ngModel"], ["id", "inputField", 1, "col-md-8", "d-flex", "align-items-end"], [1, "d-flex", "flex-column", "w-100"], ["for", "name"], ["id", "name", "type", "text", "pInputText", "", 2, "height", "41px", "width", "100%", 3, "ngModelChange", "ngModel"], [1, "", 2, "margin-left", "10px"], [1, "p-button-success", 2, "color", "#ffffff", 3, "click"], [1, "card", "mb-0"], ["styleClass", "p-datatable-gridlines", "dataKey", "id", "responsiveLayout", "scroll", "styleClass", "p-datatable-gridlines p-datatable-sm", "responsiveLayout", "scroll", "scrollHeight", "58vh", "loadingIcon", "pi pi-spin pi-spinner-dotted", 3, "paginator", "value", "rowHover", "paginatorDropdownAppendTo", "tableStyle", "scrollable", "loading"], ["pTemplate", "header"], ["pTemplate", "body"], [1, "mt-3", 3, "onPageChange", "totalRecords", "rowsPerPageOptions", "rows"], [1, "row", 2, "z-index", "1050"], [1, "col-md-2", "form-group"], [3, "htmlFor"], [1, "require-field"], [1, "col-md-4", "form-group"], [1, "input-group"], ["type", "text", "tabindex", "3", "readonly", "", "required", "", 1, "form-control", "form-control-sm", 2, "width", "10%", 3, "keydown.shift.p", "ngModelChange", "id", "ngModel"], [1, "input-group-append"], ["type", "button", "tabindex", "4", 1, "btn", "btn-primary", "blue", "btn-sm", 3, "click", "disabled"], [1, "fa", "fa-search"], [1, "input-group-prepend"], ["type", "button", "tabindex", "5", 1, "btn", "btn-danger", "btn-icon", "btn-sm", 3, "click", "disabled"], [1, "fa", "fa-times"], [1, "col-md-6"], ["type", "text", 1, "form-control", "form-control-sm", 3, "ngModelChange", "id", "ngModel", "name", "disabled"], ["title", "Id", "pSortableColumn", "id", 1, "text-nowrap"], [1, "d-flex", "justify-content-between"], [1, "th-data"], ["field", "id"], ["title", "Name", "pSortableColumn", "namvouchere", 1, "text-nowrap"], ["field", "voucher"], ["title", "Account Id", "pSortableColumn", "Employee", 1, "text-nowrap"], ["field", "Employee"], ["title", "Account Type", "pSortableColumn", "Status", 1, "text-nowrap"], ["field", "Status"], ["title", "Short Name", "pSortableColumn", "Status", 1, "text-nowrap"], ["title", " Actions", "pSortableColumn", "Actions", 1, "text-nowrap"], ["field", "Actions"], [1, "no-wrap-header", 3, "title"], ["pButton", "", "pRipple", "", "label", "Select", 1, "edit-btn", 2, "font-size", "12px", "font-weight", "500", "padding", "4px 8px !important", "height", "auto", "width", "auto", 3, "click"]],
    template: function ChartOfAccountPickerComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, ChartOfAccountPickerComponent_div_0_Template, 17, 10, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "p-dialog", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("visibleChange", function ChartOfAccountPickerComponent_Template_p_dialog_visibleChange_1_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.openModal, $event) || (ctx.openModal = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 3)(3, "div", 4)(4, "div", 5)(5, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Account Id");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function ChartOfAccountPickerComponent_Template_input_ngModelChange_7_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.serialNumber, $event) || (ctx.serialNumber = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 8)(9, "div", 9)(10, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Name:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function ChartOfAccountPickerComponent_Template_input_ngModelChange_12_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.name, $event) || (ctx.name = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 12)(14, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ChartOfAccountPickerComponent_Template_button_click_14_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.Search());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, " Search ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 14)(17, "p-table", 15, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](19, ChartOfAccountPickerComponent_ng_template_19_Template, 31, 0, "ng-template", 16)(20, ChartOfAccountPickerComponent_ng_template_20_Template, 13, 10, "ng-template", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "p-paginator", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("onPageChange", function ChartOfAccountPickerComponent_Template_p_paginator_onPageChange_21_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.onPageChange($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.forGrid);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("maximizable", true)("modal", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("visible", ctx.openModal);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("draggable", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.serialNumber);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](19, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("paginator", false)("value", ctx.chartOfAccountData)("rowHover", true)("paginatorDropdownAppendTo", "body")("tableStyle", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](20, _c2))("scrollable", true)("loading", ctx.loading);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("totalRecords", ctx.totalCount)("rowsPerPageOptions", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](21, _c3, ctx.totalCount))("rows", 5);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, primeng_api__WEBPACK_IMPORTED_MODULE_5__.PrimeTemplate, primeng_table__WEBPACK_IMPORTED_MODULE_6__.Table, primeng_table__WEBPACK_IMPORTED_MODULE_6__.SortableColumn, primeng_table__WEBPACK_IMPORTED_MODULE_6__.SortIcon, primeng_inputtext__WEBPACK_IMPORTED_MODULE_7__.InputText, primeng_button__WEBPACK_IMPORTED_MODULE_8__.ButtonDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, primeng_dialog__WEBPACK_IMPORTED_MODULE_10__.Dialog, primeng_paginator__WEBPACK_IMPORTED_MODULE_11__.Paginator],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 78589:
/*!********************************************************************************!*\
  !*** ./src/shared/components/dropdown-selector/dropdown-selector.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DropdownSelectorComponent: () => (/* binding */ DropdownSelectorComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _servicesAndDtos_Services_suggestion_lookup_table_moda_l_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../servicesAndDtos/Services/suggestion-lookup-table-moda-l.service */ 6707);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 34456);





function DropdownSelectorComponent_option_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "option", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", item_r1.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r1.name);
  }
}
function DropdownSelectorComponent_option_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "option", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "No items available");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
class DropdownSelectorComponent {
  constructor(suggestionService) {
    this.suggestionService = suggestionService;
    this.valueSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.dropdownList = [];
    this.selectedId = null;
  }
  ngOnInit() {
    this.getDropdownList(this.target);
    if (this.default.id != null) {
      debugger;
      this.selectedId = this.default.id;
    }
  }
  getDropdownList(target) {
    this.suggestionService.getAll(0, 500, this.title, target).subscribe(result => {
      this.dropdownList = Array.isArray(result?.items) ? result?.items : [];
    });
  }
  onSelect(event) {
    const selectedItem = this.dropdownList.find(item => item.id === event.target.value);
    this.valueSelected.emit(selectedItem);
  }
  static #_ = this.ɵfac = function DropdownSelectorComponent_Factory(t) {
    return new (t || DropdownSelectorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_servicesAndDtos_Services_suggestion_lookup_table_moda_l_service__WEBPACK_IMPORTED_MODULE_0__.SuggestionLookupTableModaLService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: DropdownSelectorComponent,
    selectors: [["app-dropdown-selector"]],
    inputs: {
      title: "title",
      target: "target",
      placeholder: "placeholder",
      default: "default"
    },
    outputs: {
      valueSelected: "valueSelected"
    },
    decls: 8,
    vars: 6,
    consts: [[1, "form-group"], [3, "for"], [1, "form-control", 2, "width", "200px", 3, "ngModelChange", "change", "id", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["disabled", "", 4, "ngIf"], [3, "value"], ["disabled", ""]],
    template: function DropdownSelectorComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function DropdownSelectorComponent_Template_select_ngModelChange_3_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.selectedId, $event) || (ctx.selectedId = $event);
          return $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function DropdownSelectorComponent_Template_select_change_3_listener($event) {
          return ctx.onSelect($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Select ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, DropdownSelectorComponent_option_6_Template, 2, 2, "option", 4)(7, DropdownSelectorComponent_option_7_Template, 2, 0, "option", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("for", ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("id", ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.selectedId);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.dropdownList);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.dropdownList.length === 0);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgModel],
    encapsulation: 2
  });
}

/***/ }),

/***/ 42991:
/*!*******************************************************************!*\
  !*** ./src/shared/components/modal/abp-modal-footer.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbpModalFooterComponent: () => (/* binding */ AbpModalFooterComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 18133);



class AbpModalFooterComponent extends _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase {
  constructor(injector) {
    super(injector);
    this.cancelLabel = this.l('Cancel');
    this.saveLabel = this.l('Save');
    this.onCancelClick = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  }
  static #_ = this.ɵfac = function AbpModalFooterComponent_Factory(t) {
    return new (t || AbpModalFooterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: AbpModalFooterComponent,
    selectors: [["abp-modal-footer"]],
    inputs: {
      cancelLabel: "cancelLabel",
      cancelDisabled: "cancelDisabled",
      saveLabel: "saveLabel",
      saveDisabled: "saveDisabled"
    },
    outputs: {
      onCancelClick: "onCancelClick"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
    decls: 5,
    vars: 4,
    consts: [[1, "modal-footer", "justify-content-between"], ["type", "button", 1, "btn", "btn-default", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"]],
    template: function AbpModalFooterComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AbpModalFooterComponent_Template_button_click_1_listener() {
          return ctx.onCancelClick.emit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.cancelDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.cancelLabel, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.saveDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.saveLabel, " ");
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
}

/***/ }),

/***/ 417:
/*!*******************************************************************!*\
  !*** ./src/shared/components/modal/abp-modal-header.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbpModalHeaderComponent: () => (/* binding */ AbpModalHeaderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 18133);



class AbpModalHeaderComponent extends _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase {
  constructor(injector) {
    super(injector);
    this.onCloseClick = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  }
  static #_ = this.ɵfac = function AbpModalHeaderComponent_Factory(t) {
    return new (t || AbpModalHeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: AbpModalHeaderComponent,
    selectors: [["abp-modal-header"]],
    inputs: {
      title: "title"
    },
    outputs: {
      onCloseClick: "onCloseClick"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
    decls: 6,
    vars: 1,
    consts: [[1, "modal-header"], [1, "modal-title"], ["type", "button", "aria-label", "Close", 1, "close", 3, "click"], ["aria-hidden", "true"]],
    template: function AbpModalHeaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "h4", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AbpModalHeaderComponent_Template_button_click_3_listener() {
          return ctx.onCloseClick.emit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.title);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
}

/***/ }),

/***/ 18612:
/*!*******************************************************************************!*\
  !*** ./src/shared/components/pagination/abp-pagination-controls.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbpPaginationControlsComponent: () => (/* binding */ AbpPaginationControlsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-pagination */ 82423);




function AbpPaginationControlsComponent_ul_3_li_1_a_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AbpPaginationControlsComponent_ul_3_li_1_a_1_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      const p_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](p_r3.previous());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function AbpPaginationControlsComponent_ul_3_li_1_a_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function AbpPaginationControlsComponent_ul_3_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AbpPaginationControlsComponent_ul_3_li_1_a_1_Template, 2, 0, "a", 7)(2, AbpPaginationControlsComponent_ul_3_li_1_a_2_Template, 2, 0, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    const p_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("disabled", p_r3.isFirstPage());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !p_r3.isFirstPage());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", p_r3.isFirstPage());
  }
}
function AbpPaginationControlsComponent_ul_3_li_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 6)(1, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AbpPaginationControlsComponent_ul_3_li_2_Template_a_click_1_listener() {
      const page_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      const p_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](p_r3.setCurrent(page_r5.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const page_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    const p_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("z-index", p_r3.getCurrent() === page_r5.value ? "0" : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("active", p_r3.getCurrent() === page_r5.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", page_r5.label, " ");
  }
}
function AbpPaginationControlsComponent_ul_3_li_3_a_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AbpPaginationControlsComponent_ul_3_li_3_a_1_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      const p_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](p_r3.next());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function AbpPaginationControlsComponent_ul_3_li_3_a_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function AbpPaginationControlsComponent_ul_3_li_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AbpPaginationControlsComponent_ul_3_li_3_a_1_Template, 2, 0, "a", 7)(2, AbpPaginationControlsComponent_ul_3_li_3_a_2_Template, 2, 0, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    const p_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("disabled", p_r3.isLastPage());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !p_r3.isLastPage());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", p_r3.isLastPage());
  }
}
function AbpPaginationControlsComponent_ul_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AbpPaginationControlsComponent_ul_3_li_1_Template, 3, 4, "li", 4)(2, AbpPaginationControlsComponent_ul_3_li_2_Template, 3, 5, "li", 5)(3, AbpPaginationControlsComponent_ul_3_li_3_Template, 3, 4, "li", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const p_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r6.directionLinks);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", p_r3.pages);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r6.directionLinks);
  }
}
class AbpPaginationControlsComponent {
  constructor() {
    this.maxSize = 7;
    this.previousLabel = 'Previous';
    this.nextLabel = 'Next';
    this.screenReaderPaginationLabel = 'Pagination';
    this.screenReaderPageLabel = 'page';
    this.screenReaderCurrentLabel = `You're on page`;
    this.pageChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this._directionLinks = true;
    this._autoHide = false;
  }
  get directionLinks() {
    return this._directionLinks;
  }
  set directionLinks(value) {
    this._directionLinks = !!value && value !== 'false';
  }
  get autoHide() {
    return this._autoHide;
  }
  set autoHide(value) {
    this._autoHide = !!value && value !== 'false';
  }
  static #_ = this.ɵfac = function AbpPaginationControlsComponent_Factory(t) {
    return new (t || AbpPaginationControlsComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: AbpPaginationControlsComponent,
    selectors: [["abp-pagination-controls"]],
    inputs: {
      id: "id",
      maxSize: "maxSize",
      previousLabel: "previousLabel",
      nextLabel: "nextLabel",
      screenReaderPaginationLabel: "screenReaderPaginationLabel",
      screenReaderPageLabel: "screenReaderPageLabel",
      screenReaderCurrentLabel: "screenReaderCurrentLabel",
      directionLinks: "directionLinks",
      autoHide: "autoHide"
    },
    outputs: {
      pageChange: "pageChange"
    },
    decls: 4,
    vars: 3,
    consts: [["p", "paginationApi"], [3, "pageChange", "id", "maxSize"], ["class", "pagination m-0", 4, "ngIf"], [1, "pagination", "m-0"], ["class", "page-item", 3, "disabled", 4, "ngIf"], ["class", "page-item", 3, "active", "z-index", 4, "ngFor", "ngForOf"], [1, "page-item"], ["class", "page-link", "href", "javascript:;", 3, "click", 4, "ngIf"], ["class", "page-link", "href", "javascript:;", 4, "ngIf"], ["href", "javascript:;", 1, "page-link", 3, "click"], [1, "fas", "fa-chevron-left"], ["href", "javascript:;", 1, "page-link"], [1, "fas", "fa-chevron-right"]],
    template: function AbpPaginationControlsComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "pagination-template", 1, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("pageChange", function AbpPaginationControlsComponent_Template_pagination_template_pageChange_0_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx.pageChange.emit($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "nav");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, AbpPaginationControlsComponent_ul_3_Template, 4, 3, "ul", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        const p_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", ctx.id)("maxSize", ctx.maxSize);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !(ctx.autoHide && p_r3.pages.length <= 1));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, ngx_pagination__WEBPACK_IMPORTED_MODULE_2__.PaginationControlsDirective],
    encapsulation: 2
  });
}

/***/ }),

/***/ 79023:
/*!**********************************************************!*\
  !*** ./src/shared/components/picker/picker.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PickerComponent: () => (/* binding */ PickerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _suggestion_lookup_table_modal_SuggestionLookupTableModalComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../suggestion-lookup-table-modal/SuggestionLookupTableModalComponent */ 76606);
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap/modal */ 2457);
/* harmony import */ var _shared_servicesAndDtos_Services_suggestion_lookup_table_moda_l_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service */ 6707);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);







const _c0 = ["SuggestionLookupTableModalComponent"];
function PickerComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 2)(1, "div", 3)(2, "label", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 6)(6, "div", 7)(7, "input", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("keydown.enter", function PickerComponent_div_0_Template_input_keydown_enter_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.openPicker());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function PickerComponent_div_0_Template_input_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r1.id, $event) || (ctx_r1.id = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 9)(9, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PickerComponent_div_0_Template_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.openPicker());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "i", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, " Pick ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 12)(13, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PickerComponent_div_0_Template_button_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.setToNull());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](14, "i", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 15)(16, "input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function PickerComponent_div_0_Template_input_ngModelChange_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r1.name, $event) || (ctx_r1.name = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function PickerComponent_div_0_Template_input_ngModelChange_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.SetName($event));
    })("keydown.enter", function PickerComponent_div_0_Template_input_keydown_enter_16_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.openPicker());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("htmlFor", ctx_r1.title + "ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r1.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("id", ctx_r1.title + "ID")("name", ctx_r1.title + "ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r1.editable);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r1.disable);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r1.disable);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("id", ctx_r1.title + "title");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("name", ctx_r1.title + "title")("disabled", ctx_r1.editable);
  }
}
function PickerComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 17)(1, "label", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 7)(6, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function PickerComponent_div_1_Template_input_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r1.name, $event) || (ctx_r1.name = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("keydown.enter", function PickerComponent_div_1_Template_input_keydown_enter_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.openPicker());
    })("ngModelChange", function PickerComponent_div_1_Template_input_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.SetName($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 9)(8, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PickerComponent_div_1_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.openPicker());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](9, "i", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, " Pick ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 12)(12, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PickerComponent_div_1_Template_button_click_12_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.setToNull());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "i", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("row col-md-", ctx_r1.inputWidth, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("htmlFor", ctx_r1.title + "ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r1.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("form-control form-control-sm col-md-", (tmp_4_0 = ctx_r1.inputWidth) !== null && tmp_4_0 !== undefined ? tmp_4_0 : 6, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("id", ctx_r1.title + "title");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("name", ctx_r1.title + "title")("disabled", ctx_r1.editable);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r1.disable);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r1.disable);
  }
}
class PickerComponent {
  constructor(suggestionService, _suggestionLookupTableModaLService) {
    this.suggestionService = suggestionService;
    this._suggestionLookupTableModaLService = _suggestionLookupTableModaLService;
    this.showId = true;
    this.editable = true;
    this.valueSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.onValuechange = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
  }
  openPicker() {
    debugger;
    if (this.title2) {
      var initialState = {
        class: "custom-modal",
        target: this.title2,
        url: this.url
      };
    } else {
      var initialState = {
        target: this.title
      };
    }
    debugger;
    this.suggestionModalRef = this.suggestionService.show(_suggestion_lookup_table_modal_SuggestionLookupTableModalComponent__WEBPACK_IMPORTED_MODULE_0__.SuggestionLookupTableModalComponent, {
      initialState: {
        target: this.title2 || this.title,
        pickName: this.title,
        filterWiseChartOfAccTarget: this.filterWiseChartOfAccTarget,
        chartOfAccountSubLedgerType: this.chartOfAccountSubLedgerType,
        locationId: this.locationId,
        isPetty: this.isPetty,
        bankAccountId: this.bankAccountId,
        filterOfCOALevelId: this.filterOfCOALevelId,
        filtername: this.name,
        idShow: this.showId,
        url: this.url
      }
    });
    this.suggestionModalRef.content.saveSuggestion.subscribe(result => {
      console.log("Modal closed with result:", result);
      debugger;
      this.name = result?.name;
      if (result.additional) {
        this.id = result.additional;
      } else {
        this.id = result?.id;
      }
      debugger;
      this.valueSelected.emit(result);
    });
  }
  SetName(value) {
    this.onValuechange.emit(value);
  }
  setToNull() {
    this.id = null;
    this.name = "";
    this.valueSelected.emit({
      id: null,
      name: "",
      additional: ""
    });
  }
  setToDto() {
    this.id = this.SuggestionLookupTableModalComponent.id;
    this.name = this.SuggestionLookupTableModalComponent.name;
  }
  closePicker() {
    this.suggestionModalRef.hide();
  }
  static #_ = this.ɵfac = function PickerComponent_Factory(t) {
    return new (t || PickerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__.BsModalService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_shared_servicesAndDtos_Services_suggestion_lookup_table_moda_l_service__WEBPACK_IMPORTED_MODULE_1__.SuggestionLookupTableModaLService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: PickerComponent,
    selectors: [["app-picker"]],
    viewQuery: function PickerComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.SuggestionLookupTableModalComponent = _t.first);
      }
    },
    inputs: {
      showId: "showId",
      editable: "editable",
      title: "title",
      title2: "title2",
      url: "url",
      inputWidth: "inputWidth",
      filterTarget: "filterTarget",
      id: "id",
      name: "name",
      filterWiseChartOfAccTarget: "filterWiseChartOfAccTarget",
      chartOfAccountSubLedgerType: "chartOfAccountSubLedgerType",
      locationId: "locationId",
      isPetty: "isPetty",
      bankAccountId: "bankAccountId",
      filterOfCOALevelId: "filterOfCOALevelId",
      formControlName: "formControlName",
      disable: "disable",
      enable: "enable"
    },
    outputs: {
      valueSelected: "valueSelected",
      onValuechange: "onValuechange"
    },
    decls: 2,
    vars: 2,
    consts: [["class", "row", "style", "z-index: 1050", 4, "ngIf"], ["style", "z-index: 1050", 3, "class", 4, "ngIf"], [1, "row", 2, "z-index", "1050"], [1, "col-md-3", "form-group"], [3, "htmlFor"], [1, "require-field"], [1, "col-md-4", "form-group"], [1, "input-group"], ["type", "text", "tabindex", "3", "required", "", 1, "form-control", "form-control-sm", 2, "width", "20%", 3, "keydown.enter", "ngModelChange", "id", "name", "ngModel", "disabled"], [1, "input-group-append"], ["type", "button", "tabindex", "4", 1, "btn", "btn-primary", "blue", "btn-sm", 3, "click", "disabled"], [1, "fa", "fa-search"], [1, "input-group-prepend"], ["type", "button", "tabindex", "5", 1, "btn", "btn-danger", "btn-icon", "btn-sm", 3, "click", "disabled"], [1, "fa", "fa-times"], [1, "col-md-5"], ["type", "text", 1, "form-control", "form-control-sm", 3, "ngModelChange", "keydown.enter", "id", "ngModel", "name", "disabled"], [2, "z-index", "1050"], ["type", "text", 3, "ngModelChange", "keydown.enter", "id", "ngModel", "name", "disabled"]],
    template: function PickerComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, PickerComponent_div_0_Template, 17, 12, "div", 0)(1, PickerComponent_div_1_Template, 14, 14, "div", 1);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.showId);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.showId);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel],
    encapsulation: 2
  });
}

/***/ }),

/***/ 76606:
/*!****************************************************************************************************!*\
  !*** ./src/shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SuggestionLookupTableModalComponent: () => (/* binding */ SuggestionLookupTableModalComponent)
/* harmony export */ });
/* harmony import */ var _Users_muhammadhassankhan_Documents_devoclock_github_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 89475);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 61318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 77919);
/* harmony import */ var _servicesAndDtos_Services_suggestion_lookup_table_moda_l_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../servicesAndDtos/Services/suggestion-lookup-table-moda-l.service */ 6707);
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap/modal */ 2457);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/api */ 17780);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/table */ 76676);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/inputtext */ 48361);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/button */ 49136);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/paginator */ 43157);













const _c0 = ["dataTable"];
const _c1 = ["paginator"];
const _c2 = a0 => [a0, 5, 20, 30];
function SuggestionLookupTableModalComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 17)(1, "label", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Id");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "input", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function SuggestionLookupTableModalComponent_div_10_Template_input_ngModelChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r1.serialNumber, $event) || (ctx_r1.serialNumber = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.serialNumber);
  }
}
function SuggestionLookupTableModalComponent_ng_template_19_th_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Id");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function SuggestionLookupTableModalComponent_ng_template_19_th_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Short Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function SuggestionLookupTableModalComponent_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, SuggestionLookupTableModalComponent_ng_template_19_th_1_Template, 2, 0, "th", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, SuggestionLookupTableModalComponent_ng_template_19_th_4_Template, 2, 0, "th", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.idShow);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r1.target == "ChequeBook" ? "Cheque No" : "Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.pickName === "Location");
  }
}
function SuggestionLookupTableModalComponent_ng_template_20_td_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r1.removeIdandBackSlash(item_r4.id));
  }
}
function SuggestionLookupTableModalComponent_ng_template_20_td_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r4.additional);
  }
}
function SuggestionLookupTableModalComponent_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, SuggestionLookupTableModalComponent_ng_template_20_td_1_Template, 2, 1, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, SuggestionLookupTableModalComponent_ng_template_20_td_4_Template, 2, 1, "td", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "td")(6, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SuggestionLookupTableModalComponent_ng_template_20_Template_button_click_6_listener() {
      const item_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.setAndSave(item_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.idShow);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r4.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.pickName === "Location");
  }
}
class SuggestionLookupTableModalComponent {
  constructor(injector, _suggestionLookupTableModaLService, modalService, bsModalRef, messageService) {
    this._suggestionLookupTableModaLService = _suggestionLookupTableModaLService;
    this.modalService = modalService;
    this.bsModalRef = bsModalRef;
    this.messageService = messageService;
    this.saveSuggestion = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.name = "";
    this.title2 = "";
    this.serialNumber = "";
    this.locationId = "";
    this.isPetty = "";
    this.filterWiseChartOfAccTarget = "";
    this.chartOfAccountSubLedgerType = "";
    this.filterOfCOALevelId = "";
    this.bankAccountId = "";
    this.idShow = true;
    this.data = null;
    this.temp_data = null;
    this.totalCount = 0;
    this.loading = false;
    this.currentPage = 1;
    this.skipCount = 0;
    this.maxCount = 5;
  }
  ngOnInit() {
    this.show(this.target, this.filterWiseId);
  }
  show(target, parmValue, parm2Value, title, url, filtername, parm3Value) {
    this.target = target;
    this.active = true;
    this.pickName = title || target;
    this.name = filtername;
    this.getAll();
  }
  getAll(event) {
    if (!this.active) {
      return;
    }
    this.loadData();
  }
  loadData() {
    debugger;
    this.loading = true;
    if (this.filterWiseChartOfAccTarget) {
      this._suggestionLookupTableModaLService.getAllCOA((this.currentPage - 1) * this.maxCount, this.maxCount, this.filtername, this.filterWiseChartOfAccTarget, this.serialNumber).subscribe(response => {
        console.log("Modal closed with result:", response);
        if (this.filterWiseChartOfAccTarget) {
          var tem_data = [];
          response.items.map(item => {
            var obj = {
              id: item.serialNumber,
              name: item.name
            };
            tem_data.push(obj);
          });
          this.data = tem_data;
          this.temp_data = response.items;
          this.totalCount = response.totalCount;
          this.loading = false;
        } else {
          this.data = response.items;
          this.totalCount = response.totalCount;
          this.loading = false;
        }
      });
    } else if (this.filterOfCOALevelId) {
      debugger;
      this._suggestionLookupTableModaLService.getAllCOAData((this.currentPage - 1) * 5, this.maxCount, this.filtername, this.url, this.serialNumber, this.filterOfCOALevelId, this.filterOfCOALevelId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.finalize)(() => this.loading = false), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(error.error.message);
      })).subscribe(response => {
        if (this.target === "COALvl2" || "COALvl3") {
          var tem_data = [];
          response.items.map(item => {
            var obj = {
              id: item.serialNumber,
              name: item.name
            };
            tem_data.push(obj);
          });
          this.data = tem_data;
          this.temp_data = response.items;
          this.totalCount = response.totalCount;
          this.loading = false;
        } else {}
        // this.data = response["items"];
        // this.totalCount = response["totalCount"];
      });
    } else if (this.chartOfAccountSubLedgerType) {
      debugger;
      this._suggestionLookupTableModaLService.getAllSubLedgers((this.currentPage - 1) * 5, this.maxCount, this.filtername, this.url, this.chartOfAccountSubLedgerType, this.coaIdForSubledger, this.locationId, this.serialNumber).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.finalize)(() => this.loading = false), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(error.error.message);
      })).subscribe(response => {
        if (this.target === "COALvl2" || "COALvl3" || 0) {
          var tem_data = [];
          response.items.map(item => {
            var obj = {
              id: item.serialNumber,
              name: item.name ? item.name : item.title
            };
            tem_data.push(obj);
          });
          this.data = tem_data;
          this.temp_data = response.items;
          this.totalCount = response.totalCount;
          this.loading = false;
        } else {}
        // this.data = response["items"];
        // this.totalCount = response["totalCount"];
      });
    } else if (this.bankAccountId) {
      this._suggestionLookupTableModaLService.getChecksByBankId((this.currentPage - 1) * 5, this.maxCount, this.filtername, this.url, this.bankAccountId, this.serialNumber).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.finalize)(() => this.loading = false), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(error.error.message);
      })).subscribe(response => {
        this.data = response;
        this.totalCount = response.length;
        this.loading = false;
      });
    } else if (this.target === "Vehicle" || this.target === "House") {
      this._suggestionLookupTableModaLService.getAllHouseOrVehicle((this.currentPage - 1) * 5, this.maxCount, this.filtername, this.target, this.locationId, this.serialNumber).subscribe(response => {
        console.log("Modal closed with result:", response);
        if (this.target === "Vehicle" || this.target === "House") {
          var tem_data = [];
          response.items.map(item => {
            var obj = {
              id: item.id,
              name: item.name
            };
            tem_data.push(obj);
          });
          debugger;
          this.data = tem_data;
          this.temp_data = response.items;
          this.totalCount = response.totalCount;
          this.loading = false;
        } else {
          this.data = response.items;
          this.totalCount = response.totalCount;
          this.loading = false;
        }
      });
    } else if (this.target === "ServiceItem" || this.target === "InventoryItem") {
      this._suggestionLookupTableModaLService.getAllItems((this.currentPage - 1) * 5, this.maxCount, this.filtername, this.target, this.locationId, this.isPetty, this.serialNumber).subscribe(response => {
        console.log("Modal closed with result:", response);
        if (this.target === "ServiceItem" || this.target === "InventoryItem") {
          var tem_data = [];
          response.items.map(item => {
            var obj = {
              id: item.serialNumber,
              name: item.name
            };
            tem_data.push(obj);
          });
          debugger;
          this.data = tem_data;
          this.temp_data = response.items;
          this.totalCount = response.totalCount;
          this.loading = false;
        } else {
          this.data = response.items;
          this.totalCount = response.totalCount;
          this.loading = false;
        }
      });
    } else if (this.target === "ActiveHouse" || this.target === "ActiveVehicle") {
      this._suggestionLookupTableModaLService.getAllActiveVehicleOrHouse((this.currentPage - 1) * 5, this.maxCount, this.filtername, this.target, this.locationId, this.serialNumber).subscribe(response => {
        console.log("Modal closed with result:", response);
        if (this.target === "ActiveHouse" || this.target === "ActiveVehicle") {
          var tem_data = [];
          response.items.map(item => {
            var obj = {
              id: item.contractReferenceId,
              name: item.contractReferenceName
            };
            tem_data.push(obj);
          });
          debugger;
          this.data = tem_data;
          this.temp_data = response.items;
          this.totalCount = response.totalCount;
          this.loading = false;
        } else {
          this.data = response.items;
          this.totalCount = response.totalCount;
          this.loading = false;
        }
      });
    }
    {
      debugger;
      this._suggestionLookupTableModaLService.getAll((this.currentPage - 1) * 5, this.maxCount, this.filtername, this.target, this.serialNumber).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.finalize)(() => this.loading = false), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(error.error.message);
      })).subscribe(response => {
        debugger;
        this.data = response["items"];
        this.totalCount = response["totalCount"];
      });
    }
  }
  setAndSave(obj) {
    this.id = obj.id;
    this.additionalID = obj.additional;
    this.name = obj.name;
    debugger;
    if (this.target === "Location") {
      obj.name = obj.additional;
      this.saveSuggestion.emit(obj);
      this.bsModalRef.hide();
    } else if (this.target === "COALvl2" || this.target === "COALvl3" || this.target === "Subledger" || this.target === "ServiceItem" || this.target === "InventoryItem" || this.filterWiseChartOfAccTarget) {
      debugger;
      var new_obj = this.temp_data.filter(item => item.serialNumber === obj.id);
      debugger;
      this.saveSuggestion.emit(new_obj[0]);
      this.bsModalRef.hide();
    } else {
      this.saveSuggestion.emit(obj);
      this.bsModalRef.hide();
    }
  }
  close() {
    this.active = false;
    this.saveSuggestion.emit(null);
    this.bsModalRef.hide();
  }
  Search() {
    this.loadData();
  }
  removeIdandBackSlash(word) {
    if (typeof word == "number") {
      return word;
    } else if (typeof word == "string") {
      if (word.includes("/")) {
        return word.split("/")[1];
      } else {
        return word;
      }
    }
  }
  onPageChange(event) {
    var _this = this;
    return (0,_Users_muhammadhassankhan_Documents_devoclock_github_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.maxCount = event.rows;
      _this.currentPage = event.page + 1;
      _this.loadData();
    })();
  }
  static #_ = this.ɵfac = function SuggestionLookupTableModalComponent_Factory(t) {
    return new (t || SuggestionLookupTableModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_servicesAndDtos_Services_suggestion_lookup_table_moda_l_service__WEBPACK_IMPORTED_MODULE_1__.SuggestionLookupTableModaLService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__.BsModalService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__.BsModalRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_7__.MessageService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: SuggestionLookupTableModalComponent,
    selectors: [["app-suggestion-lookup-table-modal"]],
    viewQuery: function SuggestionLookupTableModalComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c1, 7);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.dataTable = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
      }
    },
    outputs: {
      saveSuggestion: "saveSuggestion"
    },
    decls: 22,
    vars: 13,
    consts: [[1, "modal-body", 2, "z-index", "1000"], [1, "modal-header"], [1, "modal-title"], ["type", "button", "aria-label", "Close", 1, "close", 3, "click"], ["aria-hidden", "true"], ["id", "suggestionTable", 1, "table-responsive", "modal-body"], [1, "row", "col-md-12"], ["id", "inputField", "class", "col-md-3 flex flex-column", 4, "ngIf"], ["id", "inputField", 1, "col-md-7", "flex", "flex-column"], ["for", "name"], ["id", "name", "type", "text", "pInputText", "", 3, "ngModelChange", "keydown.enter", "ngModel"], [1, "col-md-2", "mt-auto"], [2, "font-size", "14px", "padding", "5px 10px", "background-color", "#007ad9", "border-color", "#007ad9", "color", "white", "box-shadow", "0 4px 6px rgba(0, 0, 0, 0.1)", 3, "click"], ["appendTo", "modal-body", "styleClass", "p-datatable-sm", 3, "onPageChange", "value", "paginator", "rows", "loading", "totalRecords"], ["pTemplate", "header"], ["pTemplate", "body"], [3, "onPageChange", "totalRecords", "rowsPerPageOptions", "rows"], ["id", "inputField", 1, "col-md-3", "flex", "flex-column"], ["for", "id"], ["id", "id", "type", "text", "pInputText", "", 3, "ngModelChange", "ngModel"], [4, "ngIf"], ["pButton", "", "pRipple", "", "label", "Select", 1, "p-button-rounded", "p-button-info", "mr-2", 3, "click"]],
    template: function SuggestionLookupTableModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h4", 2)(3, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SuggestionLookupTableModalComponent_Template_button_click_5_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 5)(9, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, SuggestionLookupTableModalComponent_div_10_Template, 4, 1, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 8)(12, "label", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function SuggestionLookupTableModalComponent_Template_input_ngModelChange_14_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.filtername, $event) || (ctx.filtername = $event);
          return $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("keydown.enter", function SuggestionLookupTableModalComponent_Template_input_keydown_enter_14_listener() {
          return ctx.Search();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 11)(16, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SuggestionLookupTableModalComponent_Template_button_click_16_listener() {
          return ctx.Search();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, " Search ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "p-table", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("onPageChange", function SuggestionLookupTableModalComponent_Template_p_table_onPageChange_18_listener($event) {
          return ctx.onPageChange($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](19, SuggestionLookupTableModalComponent_ng_template_19_Template, 7, 3, "ng-template", 14)(20, SuggestionLookupTableModalComponent_ng_template_20_Template, 7, 3, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "p-paginator", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("onPageChange", function SuggestionLookupTableModalComponent_Template_p_paginator_onPageChange_21_listener($event) {
          return ctx.onPageChange($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.pickName);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.idShow);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.filtername);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", ctx.data)("paginator", false)("rows", 5)("loading", ctx.loading)("totalRecords", ctx.totalCount);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("totalRecords", ctx.totalCount)("rowsPerPageOptions", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](11, _c2, ctx.totalCount))("rows", 5);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, primeng_api__WEBPACK_IMPORTED_MODULE_7__.PrimeTemplate, primeng_table__WEBPACK_IMPORTED_MODULE_9__.Table, primeng_inputtext__WEBPACK_IMPORTED_MODULE_10__.InputText, primeng_button__WEBPACK_IMPORTED_MODULE_11__.ButtonDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgModel, primeng_paginator__WEBPACK_IMPORTED_MODULE_13__.Paginator],
    styles: ["\n\n\n@media (min-width: 576px) {\n  .modal-dialog[_ngcontent-%COMP%] {\n    max-width: 650px;\n    margin: 1.75rem auto;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9zaGFyZWQvY29tcG9uZW50cy9zdWdnZXN0aW9uLWxvb2t1cC10YWJsZS1tb2RhbC9zdWdnZXN0aW9uLWxvb2t1cC10YWJsZS1tb2RhbC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEtBQUs7O0FBRUw7RUFDRTtJQUNFLGdCQUFnQjtJQUNoQixvQkFBb0I7RUFDdEI7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qICAqL1xuXG5AbWVkaWEgKG1pbi13aWR0aDogNTc2cHgpIHtcbiAgLm1vZGFsLWRpYWxvZyB7XG4gICAgbWF4LXdpZHRoOiA2NTBweDtcbiAgICBtYXJnaW46IDEuNzVyZW0gYXV0bztcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 48339:
/*!******************************************************************************!*\
  !*** ./src/shared/components/validation/abp-validation.summary.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbpValidationSummaryComponent: () => (/* binding */ AbpValidationSummaryComponent)
/* harmony export */ });
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 18133);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 60316);



function AbpValidationSummaryComponent_ng_container_0_ng_container_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const validationError_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("d-block", !!ctx_r1.control.errors[validationError_r1.name]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r1.getValidationErrorMessage(validationError_r1), " ");
  }
}
function AbpValidationSummaryComponent_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, AbpValidationSummaryComponent_ng_container_0_ng_container_1_span_1_Template, 2, 3, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const validationError_r1 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !!ctx_r1.control.errors[validationError_r1.name]);
  }
}
function AbpValidationSummaryComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, AbpValidationSummaryComponent_ng_container_0_ng_container_1_Template, 2, 1, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.validationErrors);
  }
}
class AbpValidationSummaryComponent extends _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase {
  constructor(injector, _renderer) {
    super(injector);
    this._renderer = _renderer;
    this.defaultValidationErrors = [{
      name: 'required',
      localizationKey: 'ThisFieldIsRequired'
    }, {
      name: 'minlength',
      localizationKey: 'PleaseEnterAtLeastNCharacter',
      propertyKey: 'requiredLength'
    }, {
      name: 'maxlength',
      localizationKey: 'PleaseEnterNoMoreThanNCharacter',
      propertyKey: 'requiredLength'
    }, {
      name: 'email',
      localizationKey: 'InvalidEmailAddress'
    }, {
      name: 'pattern',
      localizationKey: 'InvalidPattern',
      propertyKey: 'requiredPattern'
    }, {
      name: 'validateEqual',
      localizationKey: 'PairsDoNotMatch'
    }];
    this.validationErrors = this.defaultValidationErrors;
  }
  set customValidationErrors(val) {
    if (val && val.length > 0) {
      const defaults = this.defaultValidationErrors.filter(defaultValidationError => !val.find(customValidationError => customValidationError.name === defaultValidationError.name));
      this.validationErrors = [...defaults, ...val];
    }
  }
  ngOnInit() {
    if (this.controlEl) {
      this.control.valueChanges.subscribe(() => {
        if (this.control.valid && (this.control.dirty || this.control.touched)) {
          this._renderer.removeClass(this.controlEl, 'is-invalid');
        }
      });
    }
  }
  getValidationErrorMessage(error) {
    if (this.controlEl) {
      this._renderer.addClass(this.controlEl, 'is-invalid');
    }
    const propertyValue = this.control.errors[error.name][error.propertyKey];
    return !!propertyValue ? this.l(error.localizationKey, propertyValue) : this.l(error.localizationKey);
  }
  static #_ = this.ɵfac = function AbpValidationSummaryComponent_Factory(t) {
    return new (t || AbpValidationSummaryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Renderer2));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: AbpValidationSummaryComponent,
    selectors: [["abp-validation-summary"]],
    inputs: {
      control: "control",
      controlEl: "controlEl",
      customValidationErrors: "customValidationErrors"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
    decls: 1,
    vars: 1,
    consts: [[4, "ngIf"], [4, "ngFor", "ngForOf"], ["class", "error invalid-feedback", 3, "d-block", 4, "ngIf"], [1, "error", "invalid-feedback"]],
    template: function AbpValidationSummaryComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, AbpValidationSummaryComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.control.invalid && (ctx.control.dirty || ctx.control.touched));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf],
    encapsulation: 2
  });
}

/***/ }),

/***/ 92645:
/*!*****************************************************************!*\
  !*** ./src/shared/directives/allow-only-alphabets.directive.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AllowOnlyAlphabetsDirective: () => (/* binding */ AllowOnlyAlphabetsDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);

class AllowOnlyAlphabetsDirective {
  constructor(el) {
    this.el = el;
  }
  onInputChange(event) {
    const initialValue = this.el.nativeElement.value;
    // Replace all non-alphabet characters
    this.el.nativeElement.value = initialValue.replace(/[^a-zA-Z]/g, "");
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
  onKeyDown(event) {
    // Prevent numbers or special characters from being typed
    if (!/[a-zA-Z]/.test(event.key) && event.key !== "Backspace" && event.key !== "Tab") {
      event.preventDefault();
    }
  }
  static #_ = this.ɵfac = function AllowOnlyAlphabetsDirective_Factory(t) {
    return new (t || AllowOnlyAlphabetsDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: AllowOnlyAlphabetsDirective,
    selectors: [["", "appAllowOnlyAlphabets", ""]],
    hostBindings: function AllowOnlyAlphabetsDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function AllowOnlyAlphabetsDirective_input_HostBindingHandler($event) {
          return ctx.onInputChange($event);
        })("keydown", function AllowOnlyAlphabetsDirective_keydown_HostBindingHandler($event) {
          return ctx.onKeyDown($event);
        });
      }
    }
  });
}

/***/ }),

/***/ 56851:
/*!*************************************************!*\
  !*** ./src/shared/directives/busy.directive.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BusyDirective: () => (/* binding */ BusyDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);

class BusyDirective {
  constructor(_element) {
    this._element = _element;
  }
  set busy(isBusy) {
    this.refreshState(isBusy);
  }
  refreshState(isBusy) {
    if (isBusy === undefined) {
      return;
    }
    if (isBusy) {
      abp.ui.setBusy(this._element.nativeElement);
    } else {
      abp.ui.clearBusy(this._element.nativeElement);
    }
  }
  static #_ = this.ɵfac = function BusyDirective_Factory(t) {
    return new (t || BusyDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: BusyDirective,
    selectors: [["", "busy", ""]],
    inputs: {
      busy: "busy"
    }
  });
}

/***/ }),

/***/ 70433:
/*!************************************************************!*\
  !*** ./src/shared/directives/equal-validator.directive.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EqualValidator: () => (/* binding */ EqualValidator)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 34456);



class EqualValidator {
  constructor(validateEqual, reverse) {
    this.validateEqual = validateEqual;
    this.reverse = reverse;
  }
  get isReverse() {
    if (!this.reverse) {
      return false;
    }
    return this.reverse === 'true' ? true : false;
  }
  validate(control) {
    // self value
    const value = control.value;
    // second control
    const control2 = control.root.get(this.validateEqual);
    // value not equal
    if (control2 && value !== control2.value && !this.isReverse) {
      return {
        validateEqual: true
      };
    }
    // value equal and reverse
    if (control2 && value === control2.value && this.isReverse) {
      delete control2.errors['validateEqual'];
      if (!Object.keys(control2.errors).length) {
        control2.setErrors(null);
      }
    }
    // value not equal and reverse
    if (control2 && value !== control2.value && this.isReverse) {
      control2.setErrors({
        validateEqual: true
      });
    }
    return null;
  }
  static #_ = this.ɵfac = function EqualValidator_Factory(t) {
    return new (t || EqualValidator)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectAttribute"]('validateEqual'), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectAttribute"]('reverse'));
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: EqualValidator,
    selectors: [["", "validateEqual", "", "formControlName", ""], ["", "validateEqual", "", "formControl", ""], ["", "validateEqual", "", "ngModel", ""]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NG_VALIDATORS,
      useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => EqualValidator),
      multi: true
    }])]
  });
}

/***/ }),

/***/ 96418:
/*!*****************************************************************!*\
  !*** ./src/shared/directives/positive-number-only.directive.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PositiveNumberOnlyDirective: () => (/* binding */ PositiveNumberOnlyDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);

class PositiveNumberOnlyDirective {
  constructor(el) {
    this.el = el;
  }
  onInputChange(event) {
    const initialValue = this.el.nativeElement.value;
    // Replace all non-numeric characters, including negative signs
    this.el.nativeElement.value = initialValue.replace(/[^0-9]/g, "");
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
  onKeyDown(event) {
    // Prevent the '-' key from being typed
    if (event.key === "-") {
      event.preventDefault();
    }
  }
  static #_ = this.ɵfac = function PositiveNumberOnlyDirective_Factory(t) {
    return new (t || PositiveNumberOnlyDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: PositiveNumberOnlyDirective,
    selectors: [["", "positiveNumberOnly", ""]],
    hostBindings: function PositiveNumberOnlyDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function PositiveNumberOnlyDirective_input_HostBindingHandler($event) {
          return ctx.onInputChange($event);
        })("keydown", function PositiveNumberOnlyDirective_keydown_HostBindingHandler($event) {
          return ctx.onKeyDown($event);
        });
      }
    }
  });
}

/***/ }),

/***/ 64172:
/*!*************************************************************!*\
  !*** ./src/shared/helpers/FormattedStringValueExtracter.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormattedStringValueExtracter: () => (/* binding */ FormattedStringValueExtracter)
/* harmony export */ });
class ExtractionResult {
  constructor(isMatch) {
    this.IsMatch = isMatch;
    this.Matches = [];
  }
}
var FormatStringTokenType;
(function (FormatStringTokenType) {
  FormatStringTokenType[FormatStringTokenType["ConstantText"] = 0] = "ConstantText";
  FormatStringTokenType[FormatStringTokenType["DynamicValue"] = 1] = "DynamicValue";
})(FormatStringTokenType || (FormatStringTokenType = {}));
class FormatStringToken {
  constructor(text, type) {
    this.Text = text;
    this.Type = type;
  }
}
class FormatStringTokenizer {
  Tokenize(format, includeBracketsForDynamicValues = false) {
    const tokens = [];
    let currentText = '';
    let inDynamicValue = false;
    for (let i = 0; i < format.length; i++) {
      const c = format[i];
      switch (c) {
        case '{':
          if (inDynamicValue) {
            throw new Error('Incorrect syntax at char ' + i + '! format string can not contain nested dynamic value expression!');
          }
          inDynamicValue = true;
          if (currentText.length > 0) {
            tokens.push(new FormatStringToken(currentText, FormatStringTokenType.ConstantText));
            currentText = '';
          }
          break;
        case '}':
          if (!inDynamicValue) {
            throw new Error('Incorrect syntax at char ' + i + '! These is no opening brackets for the closing bracket }.');
          }
          inDynamicValue = false;
          if (currentText.length <= 0) {
            throw new Error('Incorrect syntax at char ' + i + '! Brackets does not containt any chars.');
          }
          let dynamicValue = currentText;
          if (includeBracketsForDynamicValues) {
            dynamicValue = '{' + dynamicValue + '}';
          }
          tokens.push(new FormatStringToken(dynamicValue, FormatStringTokenType.DynamicValue));
          currentText = '';
          break;
        default:
          currentText += c;
          break;
      }
    }
    if (inDynamicValue) {
      throw new Error('There is no closing } char for an opened { char.');
    }
    if (currentText.length > 0) {
      tokens.push(new FormatStringToken(currentText, FormatStringTokenType.ConstantText));
    }
    return tokens;
  }
}
class FormattedStringValueExtracter {
  Extract(str, format) {
    if (str === format) {
      return new ExtractionResult(true);
    }
    const formatTokens = new FormatStringTokenizer().Tokenize(format);
    if (!formatTokens) {
      return new ExtractionResult(str === '');
    }
    const result = new ExtractionResult(true);
    for (let i = 0; i < formatTokens.length; i++) {
      const currentToken = formatTokens[i];
      const previousToken = i > 0 ? formatTokens[i - 1] : null;
      if (currentToken.Type === FormatStringTokenType.ConstantText) {
        if (i === 0) {
          if (str.indexOf(currentToken.Text) !== 0) {
            result.IsMatch = false;
            return result;
          }
          str = str.substr(currentToken.Text.length, str.length - currentToken.Text.length);
        } else {
          const matchIndex = str.indexOf(currentToken.Text);
          if (matchIndex < 0) {
            result.IsMatch = false;
            return result;
          }
          result.Matches.push({
            name: previousToken?.Text,
            value: str.substr(0, matchIndex)
          });
          str = str.substring(0, matchIndex + currentToken.Text.length);
        }
      }
    }
    const lastToken = formatTokens[formatTokens.length - 1];
    if (lastToken.Type === FormatStringTokenType.DynamicValue) {
      result.Matches.push({
        name: lastToken.Text,
        value: str
      });
    }
    return result;
  }
  IsMatch(str, format) {
    const result = new FormattedStringValueExtracter().Extract(str, format);
    if (!result.IsMatch) {
      return [];
    }
    const values = [];
    for (let i = 0; i < result.Matches.length; i++) {
      values.push(result.Matches[i].value);
    }
    return values;
  }
}

/***/ }),

/***/ 90563:
/*!**********************************************************!*\
  !*** ./src/shared/helpers/SubdomainTenancyNameFinder.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubdomainTenancyNameFinder: () => (/* binding */ SubdomainTenancyNameFinder)
/* harmony export */ });
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/AppConsts */ 98341);
/* harmony import */ var _shared_helpers_FormattedStringValueExtracter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/helpers/FormattedStringValueExtracter */ 64172);


class SubdomainTenancyNameFinder {
  urlHasTenancyNamePlaceholder(url) {
    return url.indexOf(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.tenancyNamePlaceHolderInUrl) >= 0;
  }
  getCurrentTenancyNameOrNull(rootAddress) {
    if (rootAddress.indexOf(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.tenancyNamePlaceHolderInUrl) < 0) {
      // Web site does not support subdomain tenant name
      return null;
    }
    const currentRootAddress = document.location.href;
    const formattedStringValueExtracter = new _shared_helpers_FormattedStringValueExtracter__WEBPACK_IMPORTED_MODULE_1__.FormattedStringValueExtracter();
    const values = formattedStringValueExtracter.IsMatch(currentRootAddress, rootAddress);
    if (!values.length) {
      return null;
    }
    return values[0];
  }
}

/***/ }),

/***/ 10617:
/*!*****************************************!*\
  !*** ./src/shared/helpers/UrlHelper.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UrlHelper: () => (/* binding */ UrlHelper)
/* harmony export */ });
class UrlHelper {
  /**
   * The URL requested, before initial routing.
   */
  static #_ = this.initialUrl = location.href;
  static getQueryParameters() {
    return document.location.search.replace(/(^\?)/, "").split("&").map(function (n) {
      return n = n.split("="), this[n[0]] = n[1], this;
    }.bind({}))[0];
  }
  static validateAndPreventInput(event) {
    const key = event.key;
    const regex = /^[a-zA-Z\s]$/;
    if (!regex.test(key)) {
      event.preventDefault();
    }
  }
  static validateAndAllowOnlyPositiveNumbers(event) {
    const key = event.key;
    const regex = /^[0-9]$/;
    if (!regex.test(key)) {
      event.preventDefault();
    }
  }
}

/***/ }),

/***/ 4166:
/*!***************************************************!*\
  !*** ./src/shared/layout/layout-store.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LayoutStoreService: () => (/* binding */ LayoutStoreService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 75797);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 15424);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 91817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);



class LayoutStoreService {
  constructor() {
    this.initialLayoutConfig = {
      sidebarExpanded: false
    };
    this.configSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(this.initialLayoutConfig);
    this.config$ = this.configSource.asObservable();
  }
  get sidebarExpanded() {
    return this.config$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.pluck)('sidebarExpanded'), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.distinctUntilChanged)());
  }
  setSidebarExpanded(value) {
    this.configSource.next(Object.assign(this.configSource.value, {
      sidebarExpanded: value
    }));
  }
  static #_ = this.ɵfac = function LayoutStoreService_Factory(t) {
    return new (t || LayoutStoreService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: LayoutStoreService,
    factory: LayoutStoreService.ɵfac
  });
}

/***/ }),

/***/ 77188:
/*!***********************************************************************************!*\
  !*** ./src/shared/multi-tenancy/tenant-resolvers/query-string-tenant-resolver.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryStringTenantResolver: () => (/* binding */ QueryStringTenantResolver)
/* harmony export */ });
/* harmony import */ var _helpers_UrlHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/UrlHelper */ 10617);

class QueryStringTenantResolver {
  resolve(appBaseUrl) {
    let queryParams = _helpers_UrlHelper__WEBPACK_IMPORTED_MODULE_0__.UrlHelper.getQueryParameters();
    console.log('queryParams');
    console.log(queryParams);
    return queryParams['abp_tenancy_name'];
  }
}

/***/ }),

/***/ 55614:
/*!********************************************************************************!*\
  !*** ./src/shared/multi-tenancy/tenant-resolvers/subdomain-tenant-resolver.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubdomainTenantResolver: () => (/* binding */ SubdomainTenantResolver)
/* harmony export */ });
/* harmony import */ var _shared_helpers_SubdomainTenancyNameFinder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/helpers/SubdomainTenancyNameFinder */ 90563);

class SubdomainTenantResolver {
  resolve(appBaseUrl) {
    const subdomainTenancyNameFinder = new _shared_helpers_SubdomainTenancyNameFinder__WEBPACK_IMPORTED_MODULE_0__.SubdomainTenancyNameFinder();
    return subdomainTenancyNameFinder.getCurrentTenancyNameOrNull(appBaseUrl);
  }
}

/***/ }),

/***/ 95874:
/*!*******************************************!*\
  !*** ./src/shared/nav/app-url.service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppUrlService: () => (/* binding */ AppUrlService)
/* harmony export */ });
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/AppConsts */ 98341);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _session_app_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../session/app-session.service */ 59626);



class AppUrlService {
  static #_ = this.tenancyNamePlaceHolder = '{TENANCY_NAME}';
  constructor(_appSessionService) {
    this._appSessionService = _appSessionService;
  }
  get appRootUrl() {
    if (this._appSessionService.tenant) {
      return this.getAppRootUrlOfTenant(this._appSessionService.tenant.tenancyName);
    } else {
      return this.getAppRootUrlOfTenant(null);
    }
  }
  /**
   * Returning url ends with '/'.
   */
  getAppRootUrlOfTenant(tenancyName) {
    let baseUrl = this.ensureEndsWith(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.appBaseUrl, '/');
    if (baseUrl.indexOf(AppUrlService.tenancyNamePlaceHolder) < 0) {
      return baseUrl;
    }
    if (baseUrl.indexOf(AppUrlService.tenancyNamePlaceHolder + '.') >= 0) {
      baseUrl = baseUrl.replace(AppUrlService.tenancyNamePlaceHolder + '.', AppUrlService.tenancyNamePlaceHolder);
      if (tenancyName) {
        tenancyName = tenancyName + '.';
      }
    }
    if (!tenancyName) {
      return baseUrl.replace(AppUrlService.tenancyNamePlaceHolder, '');
    }
    return baseUrl.replace(AppUrlService.tenancyNamePlaceHolder, tenancyName);
  }
  ensureEndsWith(str, c) {
    if (str.charAt(str.length - 1) !== c) {
      str = str + c;
    }
    return str;
  }
  removeFromEnd(str, c) {
    if (str.charAt(str.length - 1) === c) {
      str = str.substr(0, str.length - 1);
    }
    return str;
  }
  static #_2 = this.ɵfac = function AppUrlService_Factory(t) {
    return new (t || AppUrlService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_session_app_session_service__WEBPACK_IMPORTED_MODULE_1__.AppSessionService));
  };
  static #_3 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: AppUrlService,
    factory: AppUrlService.ɵfac
  });
}

/***/ }),

/***/ 54747:
/*!*******************************************!*\
  !*** ./src/shared/pipes/localize.pipe.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocalizePipe: () => (/* binding */ LocalizePipe)
/* harmony export */ });
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 18133);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);


class LocalizePipe extends _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase {
  constructor(injector) {
    super(injector);
  }
  transform(key, ...args) {
    return this.l(key, ...args);
  }
  static #_ = this.ɵfac = function LocalizePipe_Factory(t) {
    return new (t || LocalizePipe)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector, 16));
  };
  static #_2 = this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({
    name: "localize",
    type: LocalizePipe,
    pure: true
  });
}

/***/ }),

/***/ 81801:
/*!*******************************************************!*\
  !*** ./src/shared/service-proxies/service-proxies.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API_BASE_URL: () => (/* binding */ API_BASE_URL),
/* harmony export */   AccountServiceProxy: () => (/* binding */ AccountServiceProxy),
/* harmony export */   ApiException: () => (/* binding */ ApiException),
/* harmony export */   ApplicationInfoDto: () => (/* binding */ ApplicationInfoDto),
/* harmony export */   AuthenticateModel: () => (/* binding */ AuthenticateModel),
/* harmony export */   AuthenticateResultModel: () => (/* binding */ AuthenticateResultModel),
/* harmony export */   ChangePasswordDto: () => (/* binding */ ChangePasswordDto),
/* harmony export */   ChangeUiThemeInput: () => (/* binding */ ChangeUiThemeInput),
/* harmony export */   ChangeUserLanguageDto: () => (/* binding */ ChangeUserLanguageDto),
/* harmony export */   ConfigurationServiceProxy: () => (/* binding */ ConfigurationServiceProxy),
/* harmony export */   CreateRoleDto: () => (/* binding */ CreateRoleDto),
/* harmony export */   CreateTenantDto: () => (/* binding */ CreateTenantDto),
/* harmony export */   CreateUserDto: () => (/* binding */ CreateUserDto),
/* harmony export */   FlatPermissionDto: () => (/* binding */ FlatPermissionDto),
/* harmony export */   GetCurrentLoginInformationsOutput: () => (/* binding */ GetCurrentLoginInformationsOutput),
/* harmony export */   GetRoleForEditOutput: () => (/* binding */ GetRoleForEditOutput),
/* harmony export */   Int64EntityDto: () => (/* binding */ Int64EntityDto),
/* harmony export */   IsTenantAvailableInput: () => (/* binding */ IsTenantAvailableInput),
/* harmony export */   IsTenantAvailableOutput: () => (/* binding */ IsTenantAvailableOutput),
/* harmony export */   PermissionDto: () => (/* binding */ PermissionDto),
/* harmony export */   PermissionDtoListResultDto: () => (/* binding */ PermissionDtoListResultDto),
/* harmony export */   RegisterInput: () => (/* binding */ RegisterInput),
/* harmony export */   RegisterOutput: () => (/* binding */ RegisterOutput),
/* harmony export */   ResetPasswordDto: () => (/* binding */ ResetPasswordDto),
/* harmony export */   RoleDto: () => (/* binding */ RoleDto),
/* harmony export */   RoleDtoListResultDto: () => (/* binding */ RoleDtoListResultDto),
/* harmony export */   RoleDtoPagedResultDto: () => (/* binding */ RoleDtoPagedResultDto),
/* harmony export */   RoleEditDto: () => (/* binding */ RoleEditDto),
/* harmony export */   RoleListDto: () => (/* binding */ RoleListDto),
/* harmony export */   RoleListDtoListResultDto: () => (/* binding */ RoleListDtoListResultDto),
/* harmony export */   RoleServiceProxy: () => (/* binding */ RoleServiceProxy),
/* harmony export */   SessionServiceProxy: () => (/* binding */ SessionServiceProxy),
/* harmony export */   TenantAvailabilityState: () => (/* binding */ TenantAvailabilityState),
/* harmony export */   TenantDto: () => (/* binding */ TenantDto),
/* harmony export */   TenantDtoPagedResultDto: () => (/* binding */ TenantDtoPagedResultDto),
/* harmony export */   TenantLoginInfoDto: () => (/* binding */ TenantLoginInfoDto),
/* harmony export */   TenantServiceProxy: () => (/* binding */ TenantServiceProxy),
/* harmony export */   TokenAuthServiceProxy: () => (/* binding */ TokenAuthServiceProxy),
/* harmony export */   UserDto: () => (/* binding */ UserDto),
/* harmony export */   UserDtoPagedResultDto: () => (/* binding */ UserDtoPagedResultDto),
/* harmony export */   UserLoginInfoDto: () => (/* binding */ UserLoginInfoDto),
/* harmony export */   UserServiceProxy: () => (/* binding */ UserServiceProxy)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 13255);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 61318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 77919);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 59452);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 43942);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 39545);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);







const API_BASE_URL = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken("API_BASE_URL");
class AccountServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }
  /**
   * @param body (optional)
   * @return Success
   */
  isTenantAvailable(body) {
    let url_ = this.baseUrl + "api/services/app/Account/IsTenantAvailable";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processIsTenantAvailable(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processIsTenantAvailable(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  getFinancialYears(id) {
    let url_ = `${this.baseUrl}api/TokenAuth/GetAllFinancialYears?TenantId=${id}`;
    let options_ = {
      observe: "response",
      responseType: "json",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        Accept: "application/json" // Use application/json since the response is likely JSON
      })
    };
    debugger;
    try {
      return this.http.get(url_, options_);
    } catch (error) {
      console.error(error);
    }
  }
  //   getFinancelYears(id: any) {
  //     let url_ =
  //       this.baseUrl +
  //       "api/services/app/FinancialYear/FetchFinancialYears?TenantId=" +
  //       id;
  //     // url_ = url_.replace(/[?&]$/, "");
  //     let options_: any = {
  //       observe: "response",
  //       responseType: "blob",
  //       headers: new HttpHeaders({
  //         Accept: "text/plain",
  //       }),
  //     };
  //     debugger;
  //     var data = this.http.request("get", url_);
  //     debugger;
  //     data.pipe().subscribe({
  //       next: (response: any) => {
  //         if (response.success) {
  //           debugger;
  //           if (response.result.items.length) {
  //             return response.result.items;
  //           }
  //         }
  //       },
  //     });
  //   }
  processIsTenantAvailable(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = IsTenantAvailableOutput.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  register(body) {
    let url_ = this.baseUrl + "api/services/app/Account/Register";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processRegister(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processRegister(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processRegister(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RegisterOutput.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = this.ɵfac = function AccountServiceProxy_Factory(t) {
    return new (t || AccountServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: AccountServiceProxy,
    factory: AccountServiceProxy.ɵfac
  });
}
class ConfigurationServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }
  /**
   * @param body (optional)
   * @return Success
   */
  changeUiTheme(body) {
    let url_ = this.baseUrl + "api/services/app/Configuration/ChangeUiTheme";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json-patch+json"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processChangeUiTheme(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processChangeUiTheme(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processChangeUiTheme(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = this.ɵfac = function ConfigurationServiceProxy_Factory(t) {
    return new (t || ConfigurationServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: ConfigurationServiceProxy,
    factory: ConfigurationServiceProxy.ɵfac
  });
}
class RoleServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }
  /**
   * @param body (optional)
   * @return Success
   */
  create(body) {
    let url_ = this.baseUrl + "api/services/app/Role/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RoleDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param permission (optional)
   * @return Success
   */
  getRoles(permission) {
    let url_ = this.baseUrl + "api/services/app/Role/GetRoles?";
    if (permission === null) throw new Error("The parameter 'permission' cannot be null.");else if (permission !== undefined) url_ += "Permission=" + encodeURIComponent("" + permission) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        Accept: "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetRoles(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetRoles(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetRoles(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RoleListDtoListResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  update(body) {
    let url_ = this.baseUrl + "api/services/app/Role/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RoleDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return Success
   */
  delete(id) {
    let url_ = this.baseUrl + "api/services/app/Role/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @return Success
   */
  getAllPermissions() {
    let url_ = this.baseUrl + "api/services/app/Role/GetAllPermissions";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        Accept: "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAllPermissions(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAllPermissions(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAllPermissions(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = PermissionDtoListResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return Success
   */
  getRoleForEdit(id) {
    let url_ = this.baseUrl + "api/services/app/Role/GetRoleForEdit?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        Accept: "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetRoleForEdit(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetRoleForEdit(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetRoleForEdit(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = GetRoleForEditOutput.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return Success
   */
  get(id) {
    let url_ = this.baseUrl + "api/services/app/Role/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        Accept: "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RoleDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return Success
   */
  getAll(keyword, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "api/services/app/Role/GetAll?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        Accept: "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RoleDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = this.ɵfac = function RoleServiceProxy_Factory(t) {
    return new (t || RoleServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: RoleServiceProxy,
    factory: RoleServiceProxy.ɵfac
  });
}
class SessionServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }
  /**
   * @return Success
   */
  getCurrentLoginInformations() {
    let url_ = this.baseUrl + "api/services/app/Session/GetCurrentLoginInformations";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        Accept: "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetCurrentLoginInformations(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetCurrentLoginInformations(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetCurrentLoginInformations(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = GetCurrentLoginInformationsOutput.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = this.ɵfac = function SessionServiceProxy_Factory(t) {
    return new (t || SessionServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: SessionServiceProxy,
    factory: SessionServiceProxy.ɵfac
  });
}
class TenantServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }
  /**
   * @param body (optional)
   * @return Success
   */
  create(body) {
    let url_ = this.baseUrl + "api/services/app/Tenant/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TenantDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return Success
   */
  delete(id) {
    let url_ = this.baseUrl + "api/services/app/Tenant/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return Success
   */
  get(id) {
    let url_ = this.baseUrl + "api/services/app/Tenant/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        Accept: "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TenantDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param isActive (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return Success
   */
  getAll(keyword, isActive, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "api/services/app/Tenant/GetAll?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (isActive === null) throw new Error("The parameter 'isActive' cannot be null.");else if (isActive !== undefined) url_ += "IsActive=" + encodeURIComponent("" + isActive) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        Accept: "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TenantDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  update(body) {
    let url_ = this.baseUrl + "api/services/app/Tenant/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TenantDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = this.ɵfac = function TenantServiceProxy_Factory(t) {
    return new (t || TenantServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: TenantServiceProxy,
    factory: TenantServiceProxy.ɵfac
  });
}
class TokenAuthServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }
  /**
   * @param body (optional)
   * @return Success
   */
  authenticate(body) {
    let url_ = this.baseUrl + "api/TokenAuth/Authenticate";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processAuthenticate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processAuthenticate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processAuthenticate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = AuthenticateResultModel.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = this.ɵfac = function TokenAuthServiceProxy_Factory(t) {
    return new (t || TokenAuthServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: TokenAuthServiceProxy,
    factory: TokenAuthServiceProxy.ɵfac
  });
}
class UserServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }
  /**
   * @param body (optional)
   * @return Success
   */
  create(body) {
    let url_ = this.baseUrl + "api/services/app/User/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UserDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  update(body) {
    let url_ = this.baseUrl + "api/services/app/User/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UserDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return Success
   */
  delete(id) {
    let url_ = this.baseUrl + "api/services/app/User/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  activate(body) {
    let url_ = this.baseUrl + "api/services/app/User/Activate";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json-patch+json"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processActivate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processActivate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processActivate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  deActivate(body) {
    let url_ = this.baseUrl + "api/services/app/User/DeActivate";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json-patch+json"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDeActivate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDeActivate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDeActivate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @return Success
   */
  getRoles() {
    let url_ = this.baseUrl + "api/services/app/User/GetRoles";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        Accept: "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetRoles(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetRoles(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetRoles(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RoleDtoListResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  changeLanguage(body) {
    let url_ = this.baseUrl + "api/services/app/User/ChangeLanguage";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json-patch+json"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processChangeLanguage(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processChangeLanguage(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processChangeLanguage(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  changePassword(body) {
    let url_ = this.baseUrl + "api/services/app/User/ChangePassword";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processChangePassword(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processChangePassword(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processChangePassword(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : null;
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  resetPassword(body) {
    let url_ = this.baseUrl + "api/services/app/User/ResetPassword";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processResetPassword(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processResetPassword(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processResetPassword(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : null;
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return Success
   */
  get(id) {
    let url_ = this.baseUrl + "api/services/app/User/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        Accept: "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UserDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param isActive (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return Success
   */
  getAll(keyword, isActive, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "api/services/app/User/GetAll?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (isActive === null) throw new Error("The parameter 'isActive' cannot be null.");else if (isActive !== undefined) url_ += "IsActive=" + encodeURIComponent("" + isActive) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        Accept: "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UserDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = this.ɵfac = function UserServiceProxy_Factory(t) {
    return new (t || UserServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: UserServiceProxy,
    factory: UserServiceProxy.ɵfac
  });
}
class ApplicationInfoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.version = _data["version"];
      this.releaseDate = _data["releaseDate"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["releaseDate"].toString()) : undefined;
      if (_data["features"]) {
        this.features = {};
        for (let key in _data["features"]) {
          if (_data["features"].hasOwnProperty(key)) this.features[key] = _data["features"][key];
        }
      }
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new ApplicationInfoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["version"] = this.version;
    data["releaseDate"] = this.releaseDate ? this.releaseDate.toISOString() : undefined;
    if (this.features) {
      data["features"] = {};
      for (let key in this.features) {
        if (this.features.hasOwnProperty(key)) data["features"][key] = this.features[key];
      }
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ApplicationInfoDto();
    result.init(json);
    return result;
  }
}
class AuthenticateModel {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.userNameOrEmailAddress = _data["userNameOrEmailAddress"];
      this.password = _data["password"];
      this.rememberClient = _data["rememberClient"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new AuthenticateModel();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["userNameOrEmailAddress"] = this.userNameOrEmailAddress;
    data["password"] = this.password;
    data["rememberClient"] = this.rememberClient;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new AuthenticateModel();
    result.init(json);
    return result;
  }
}
class AuthenticateResultModel {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.accessToken = _data["accessToken"];
      this.encryptedAccessToken = _data["encryptedAccessToken"];
      this.expireInSeconds = _data["expireInSeconds"];
      this.userId = _data["userId"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new AuthenticateResultModel();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["accessToken"] = this.accessToken;
    data["encryptedAccessToken"] = this.encryptedAccessToken;
    data["expireInSeconds"] = this.expireInSeconds;
    data["userId"] = this.userId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new AuthenticateResultModel();
    result.init(json);
    return result;
  }
}
class ChangePasswordDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.currentPassword = _data["currentPassword"];
      this.newPassword = _data["newPassword"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new ChangePasswordDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["currentPassword"] = this.currentPassword;
    data["newPassword"] = this.newPassword;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ChangePasswordDto();
    result.init(json);
    return result;
  }
}
class ChangeUiThemeInput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.theme = _data["theme"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new ChangeUiThemeInput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["theme"] = this.theme;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ChangeUiThemeInput();
    result.init(json);
    return result;
  }
}
class ChangeUserLanguageDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.languageName = _data["languageName"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new ChangeUserLanguageDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["languageName"] = this.languageName;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ChangeUserLanguageDto();
    result.init(json);
    return result;
  }
}
class CreateRoleDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.name = _data["name"];
      this.displayName = _data["displayName"];
      this.normalizedName = _data["normalizedName"];
      this.description = _data["description"];
      if (Array.isArray(_data["grantedPermissions"])) {
        this.grantedPermissions = [];
        for (let item of _data["grantedPermissions"]) this.grantedPermissions.push(item);
      }
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new CreateRoleDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["name"] = this.name;
    data["displayName"] = this.displayName;
    data["normalizedName"] = this.normalizedName;
    data["description"] = this.description;
    if (Array.isArray(this.grantedPermissions)) {
      data["grantedPermissions"] = [];
      for (let item of this.grantedPermissions) data["grantedPermissions"].push(item);
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateRoleDto();
    result.init(json);
    return result;
  }
}
class CreateTenantDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.tenancyName = _data["tenancyName"];
      this.name = _data["name"];
      this.adminEmailAddress = _data["adminEmailAddress"];
      this.connectionString = _data["connectionString"];
      this.isActive = _data["isActive"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new CreateTenantDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["tenancyName"] = this.tenancyName;
    data["name"] = this.name;
    data["adminEmailAddress"] = this.adminEmailAddress;
    data["connectionString"] = this.connectionString;
    data["isActive"] = this.isActive;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateTenantDto();
    result.init(json);
    return result;
  }
}
class CreateUserDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.userName = _data["userName"];
      this.name = _data["name"];
      this.surname = _data["surname"];
      this.emailAddress = _data["emailAddress"];
      this.isActive = _data["isActive"];
      if (Array.isArray(_data["roleNames"])) {
        this.roleNames = [];
        for (let item of _data["roleNames"]) this.roleNames.push(item);
      }
      this.password = _data["password"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new CreateUserDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["userName"] = this.userName;
    data["name"] = this.name;
    data["surname"] = this.surname;
    data["emailAddress"] = this.emailAddress;
    data["isActive"] = this.isActive;
    if (Array.isArray(this.roleNames)) {
      data["roleNames"] = [];
      for (let item of this.roleNames) data["roleNames"].push(item);
    }
    data["password"] = this.password;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateUserDto();
    result.init(json);
    return result;
  }
}
class FlatPermissionDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.name = _data["name"];
      this.displayName = _data["displayName"];
      this.description = _data["description"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new FlatPermissionDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["name"] = this.name;
    data["displayName"] = this.displayName;
    data["description"] = this.description;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new FlatPermissionDto();
    result.init(json);
    return result;
  }
}
class GetCurrentLoginInformationsOutput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.application = _data["application"] ? ApplicationInfoDto.fromJS(_data["application"]) : undefined;
      this.user = _data["user"] ? UserLoginInfoDto.fromJS(_data["user"]) : undefined;
      this.tenant = _data["tenant"] ? TenantLoginInfoDto.fromJS(_data["tenant"]) : undefined;
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new GetCurrentLoginInformationsOutput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["application"] = this.application ? this.application.toJSON() : undefined;
    data["user"] = this.user ? this.user.toJSON() : undefined;
    data["tenant"] = this.tenant ? this.tenant.toJSON() : undefined;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new GetCurrentLoginInformationsOutput();
    result.init(json);
    return result;
  }
}
class GetRoleForEditOutput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.role = _data["role"] ? RoleEditDto.fromJS(_data["role"]) : undefined;
      if (Array.isArray(_data["permissions"])) {
        this.permissions = [];
        for (let item of _data["permissions"]) this.permissions.push(FlatPermissionDto.fromJS(item));
      }
      if (Array.isArray(_data["grantedPermissionNames"])) {
        this.grantedPermissionNames = [];
        for (let item of _data["grantedPermissionNames"]) this.grantedPermissionNames.push(item);
      }
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new GetRoleForEditOutput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["role"] = this.role ? this.role.toJSON() : undefined;
    if (Array.isArray(this.permissions)) {
      data["permissions"] = [];
      for (let item of this.permissions) data["permissions"].push(item.toJSON());
    }
    if (Array.isArray(this.grantedPermissionNames)) {
      data["grantedPermissionNames"] = [];
      for (let item of this.grantedPermissionNames) data["grantedPermissionNames"].push(item);
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new GetRoleForEditOutput();
    result.init(json);
    return result;
  }
}
class Int64EntityDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new Int64EntityDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new Int64EntityDto();
    result.init(json);
    return result;
  }
}
class IsTenantAvailableInput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.tenancyName = _data["tenancyName"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new IsTenantAvailableInput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["tenancyName"] = this.tenancyName;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new IsTenantAvailableInput();
    result.init(json);
    return result;
  }
}
class IsTenantAvailableOutput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.state = _data["state"];
      this.tenantId = _data["tenantId"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new IsTenantAvailableOutput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["state"] = this.state;
    data["tenantId"] = this.tenantId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new IsTenantAvailableOutput();
    result.init(json);
    return result;
  }
}
class PermissionDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.name = _data["name"];
      this.displayName = _data["displayName"];
      this.description = _data["description"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new PermissionDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["displayName"] = this.displayName;
    data["description"] = this.description;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new PermissionDto();
    result.init(json);
    return result;
  }
}
class PermissionDtoListResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(PermissionDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new PermissionDtoListResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new PermissionDtoListResultDto();
    result.init(json);
    return result;
  }
}
class RegisterInput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.name = _data["name"];
      this.surname = _data["surname"];
      this.userName = _data["userName"];
      this.emailAddress = _data["emailAddress"];
      this.password = _data["password"];
      this.captchaResponse = _data["captchaResponse"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new RegisterInput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["name"] = this.name;
    data["surname"] = this.surname;
    data["userName"] = this.userName;
    data["emailAddress"] = this.emailAddress;
    data["password"] = this.password;
    data["captchaResponse"] = this.captchaResponse;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RegisterInput();
    result.init(json);
    return result;
  }
}
class RegisterOutput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.canLogin = _data["canLogin"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new RegisterOutput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["canLogin"] = this.canLogin;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RegisterOutput();
    result.init(json);
    return result;
  }
}
class ResetPasswordDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.adminPassword = _data["adminPassword"];
      this.userId = _data["userId"];
      this.newPassword = _data["newPassword"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new ResetPasswordDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["adminPassword"] = this.adminPassword;
    data["userId"] = this.userId;
    data["newPassword"] = this.newPassword;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ResetPasswordDto();
    result.init(json);
    return result;
  }
}
class RoleDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.name = _data["name"];
      this.displayName = _data["displayName"];
      this.normalizedName = _data["normalizedName"];
      this.description = _data["description"];
      if (Array.isArray(_data["grantedPermissions"])) {
        this.grantedPermissions = [];
        for (let item of _data["grantedPermissions"]) this.grantedPermissions.push(item);
      }
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new RoleDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["displayName"] = this.displayName;
    data["normalizedName"] = this.normalizedName;
    data["description"] = this.description;
    if (Array.isArray(this.grantedPermissions)) {
      data["grantedPermissions"] = [];
      for (let item of this.grantedPermissions) data["grantedPermissions"].push(item);
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RoleDto();
    result.init(json);
    return result;
  }
}
class RoleDtoListResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(RoleDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new RoleDtoListResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RoleDtoListResultDto();
    result.init(json);
    return result;
  }
}
class RoleDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(RoleDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new RoleDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RoleDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class RoleEditDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.name = _data["name"];
      this.displayName = _data["displayName"];
      this.description = _data["description"];
      this.isStatic = _data["isStatic"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new RoleEditDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["displayName"] = this.displayName;
    data["description"] = this.description;
    data["isStatic"] = this.isStatic;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RoleEditDto();
    result.init(json);
    return result;
  }
}
class RoleListDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.name = _data["name"];
      this.displayName = _data["displayName"];
      this.isStatic = _data["isStatic"];
      this.isDefault = _data["isDefault"];
      this.creationTime = _data["creationTime"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["creationTime"].toString()) : undefined;
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new RoleListDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["displayName"] = this.displayName;
    data["isStatic"] = this.isStatic;
    data["isDefault"] = this.isDefault;
    data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : undefined;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RoleListDto();
    result.init(json);
    return result;
  }
}
class RoleListDtoListResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(RoleListDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new RoleListDtoListResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RoleListDtoListResultDto();
    result.init(json);
    return result;
  }
}
var TenantAvailabilityState;
(function (TenantAvailabilityState) {
  TenantAvailabilityState[TenantAvailabilityState["_1"] = 1] = "_1";
  TenantAvailabilityState[TenantAvailabilityState["_2"] = 2] = "_2";
  TenantAvailabilityState[TenantAvailabilityState["_3"] = 3] = "_3";
})(TenantAvailabilityState || (TenantAvailabilityState = {}));
class TenantDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.tenancyName = _data["tenancyName"];
      this.name = _data["name"];
      this.isActive = _data["isActive"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new TenantDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["tenancyName"] = this.tenancyName;
    data["name"] = this.name;
    data["isActive"] = this.isActive;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new TenantDto();
    result.init(json);
    return result;
  }
}
class TenantDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(TenantDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new TenantDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new TenantDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class TenantLoginInfoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.tenancyName = _data["tenancyName"];
      this.name = _data["name"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new TenantLoginInfoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["tenancyName"] = this.tenancyName;
    data["name"] = this.name;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new TenantLoginInfoDto();
    result.init(json);
    return result;
  }
}
class UserDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.userName = _data["userName"];
      this.name = _data["name"];
      this.surname = _data["surname"];
      this.emailAddress = _data["emailAddress"];
      this.isActive = _data["isActive"];
      this.fullName = _data["fullName"];
      this.lastLoginTime = _data["lastLoginTime"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["lastLoginTime"].toString()) : undefined;
      this.creationTime = _data["creationTime"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["creationTime"].toString()) : undefined;
      if (Array.isArray(_data["roleNames"])) {
        this.roleNames = [];
        for (let item of _data["roleNames"]) this.roleNames.push(item);
      }
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new UserDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["userName"] = this.userName;
    data["name"] = this.name;
    data["surname"] = this.surname;
    data["emailAddress"] = this.emailAddress;
    data["isActive"] = this.isActive;
    data["fullName"] = this.fullName;
    data["lastLoginTime"] = this.lastLoginTime ? this.lastLoginTime.toISOString() : undefined;
    data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : undefined;
    if (Array.isArray(this.roleNames)) {
      data["roleNames"] = [];
      for (let item of this.roleNames) data["roleNames"].push(item);
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UserDto();
    result.init(json);
    return result;
  }
}
class UserDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(UserDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new UserDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UserDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class UserLoginInfoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.name = _data["name"];
      this.surname = _data["surname"];
      this.userName = _data["userName"];
      this.emailAddress = _data["emailAddress"];
    }
  }
  static fromJS(data) {
    data = typeof data === "object" ? data : {};
    let result = new UserLoginInfoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["surname"] = this.surname;
    data["userName"] = this.userName;
    data["emailAddress"] = this.emailAddress;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UserLoginInfoDto();
    result.init(json);
    return result;
  }
}
class ApiException extends Error {
  constructor(message, status, response, headers, result) {
    super();
    this.isApiException = true;
    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }
  static isApiException(obj) {
    return obj.isApiException === true;
  }
}
function throwException(message, status, response, headers, result) {
  if (result !== null && result !== undefined) return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(result);else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(new ApiException(message, status, response, headers, null));
}
function blobToText(blob) {
  return new rxjs__WEBPACK_IMPORTED_MODULE_7__.Observable(observer => {
    if (!blob) {
      observer.next("");
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = event => {
        observer.next(event.target.result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}

/***/ }),

/***/ 7707:
/*!************************************************************!*\
  !*** ./src/shared/service-proxies/service-proxy.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ServiceProxyModule: () => (/* binding */ ServiceProxyModule)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! abp-ng2-module */ 26173);
/* harmony import */ var _service_proxies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service-proxies */ 81801);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);




class ServiceProxyModule {
  static #_ = this.ɵfac = function ServiceProxyModule_Factory(t) {
    return new (t || ServiceProxyModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: ServiceProxyModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    providers: [_service_proxies__WEBPACK_IMPORTED_MODULE_0__.RoleServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.SessionServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.TenantServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.UserServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.TokenAuthServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.AccountServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.ConfigurationServiceProxy, {
      provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HTTP_INTERCEPTORS,
      useClass: abp_ng2_module__WEBPACK_IMPORTED_MODULE_3__.AbpHttpInterceptor,
      multi: true
    }]
  });
}

/***/ }),

/***/ 6707:
/*!***************************************************************************************!*\
  !*** ./src/shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SuggestionLookupTableModaLService: () => (/* binding */ SuggestionLookupTableModaLService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 70271);
/* harmony import */ var _shared_AppBaseURL_appBaseURL__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/AppBaseURL/appBaseURL */ 15473);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 46443);




class SuggestionLookupTableModaLService {
  constructor(http) {
    this.http = http;
    this.url = "";
    this.url_ = "";
    this.commonUrl = "api/services/app/";
    this.baseUrl = _shared_AppBaseURL_appBaseURL__WEBPACK_IMPORTED_MODULE_0__.newBaseUrl + this.commonUrl;
  }
  getAll(SkipCount, MaxResultCount, name = "", target, serialNumber) {
    debugger;
    if (name == null) {
      name = "";
    }
    this.url = this.baseUrl;
    this.url += `Suggestion/GetSuggestions?Target=${target}&SerialNumber=${serialNumber}&Name=${name}&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  // getAllSubLedgers(
  //   SkipCount: number,
  //   MaxResultCount: number,
  //   name: string = "",
  //   target: string,
  //   chartOfAccountSubLedgerType: string,
  //   coaIdForSubledger: string,
  //   serialNumber?: string
  // ) {
  //   debugger;
  //   this.url = this.baseUrl;
  //   this.url += `ChartOfAccountSubLedger/GetAll?chartOfAccountSubLedgerTypes=${chartOfAccountSubLedgerType}&SerialNumber=${serialNumber}&Name=${name}&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
  //   if (coaIdForSubledger) {
  //     this.url = this.url + `&ChartOfAccountId=${coaIdForSubledger}`;
  //   }
  //   debugger;
  //   return this.http.get(this.url).pipe(
  //     map((response: any) => {
  //       console.log(response);
  //       return response["result"];
  //     })
  //   );
  // }
  getAllSubLedgers(SkipCount, MaxResultCount, name = "", target, chartOfAccountSubLedgerType,
  // e.g., "3,4"
  coaIdForSubledger, locationId, serialNumber) {
    this.url = `${this.baseUrl}ChartOfAccountSubLedger/GetAll?`;
    debugger;
    if (chartOfAccountSubLedgerType.length > 1 && !chartOfAccountSubLedgerType.includes(",")) {
      this.url += `ChartOfAccountSubLedgerTypes=${chartOfAccountSubLedgerType}`;
    } else {
      // Split the chartOfAccountSubLedgerType string by commas and add each as a query param
      const subLedgerTypes = chartOfAccountSubLedgerType?.toString().split(",");
      debugger;
      subLedgerTypes?.forEach((type, index) => {
        this.url += `ChartOfAccountSubLedgerTypes=${type}`;
        // Add '&' between parameters but avoid for the last parameter
        if (index < subLedgerTypes.length - 1) {
          this.url += "&";
        }
      });
    }
    if (coaIdForSubledger) {
      this.url = this.url + `&ChartOfAccountId=${coaIdForSubledger}`;
    }
    if (locationId) {
      this.url = this.url + `&LocationId=${locationId}`;
    }
    // Add other query parameters
    if (serialNumber) {
      this.url += `&SerialNumber=${serialNumber}`;
    }
    if (name == null) {
      name = "";
    }
    if (name) {
      this.url += `&Title=${name}`;
    }
    this.url += `&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    // Call the API
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  getAllHouseOrVehicle(SkipCount, MaxResultCount, name = "", target, locationId, serialNumber) {
    if (target === "Vehicle") {
      this.url = `${this.baseUrl}Vehicle/GetAll?`;
    } else if (target === "House") {
      this.url = `${this.baseUrl}House/GetAll?`;
    }
    debugger;
    if (locationId) {
      this.url = this.url + `&LocationId=${locationId}`;
    }
    // Add other query parameters
    if (serialNumber) {
      this.url += `&SerialNumber=${serialNumber}`;
    }
    if (name == null) {
      name = "";
    }
    if (name) {
      this.url += `&Title=${name}&name=${name}`;
    }
    this.url += `&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    // Call the API
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  // getAllItems(
  //   SkipCount: number,
  //   MaxResultCount: number,
  //   name: string = "",
  //   target: string,
  //   locationId?: string,
  //   isPetty?: string,
  //   serialNumber?: string
  // ) {
  //   if (target === "ServiceItem") {
  //     this.url = `${this.baseUrl}ServiceItem/GetAll?`;
  //     if (isPetty) {
  //       this.url = this.url + "isPettyJob=true&`";
  //     }
  //   } else if (target === "InventoryItem") {
  //     this.url = `${this.baseUrl}InventoryItem/GetAll?`;
  //     if (isPetty) {
  //       this.url = this.url + "isPettyItem=true&`";
  //     }
  //   }
  //   debugger;
  //   if (locationId) {
  //     this.url = this.url + `LocationId=${locationId}&`;
  //   }
  //   // Add other query parameters
  //   if (serialNumber) {
  //     this.url = this.url + `SerialNumber=${serialNumber}&`;
  //   }
  //   if (name) {
  //     this.url = this.url + `Title=${name}&name=${name}&`;
  //   }
  //   this.url =
  //     this.url + `SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
  //   // Call the API
  //   return this.http.get(this.url).pipe(
  //     map((response: any) => {
  //       console.log(response);
  //       return response["result"];
  //     })
  //   );
  // }
  getAllItems(SkipCount, MaxResultCount, name = "", target, locationId, isPetty, serialNumber) {
    if (target === "ServiceItem") {
      this.url = `${this.baseUrl}ServiceItem/GetAll?`;
      debugger;
      if (isPetty) {
        this.url += `isPettyJob=true&`;
      }
    } else if (target === "InventoryItem") {
      this.url = `${this.baseUrl}InventoryItem/GetAll?`;
      if (isPetty) {
        debugger;
        this.url += `isPettyItem=true&`;
      }
    }
    if (locationId) {
      this.url += `LocationId=${encodeURIComponent(locationId)}&`;
    }
    if (serialNumber) {
      this.url += `SerialNumber=${encodeURIComponent(serialNumber)}&`;
    }
    if (name == null) {
      name = "";
    }
    if (name) {
      this.url += `Title=${encodeURIComponent(name)}&name=${encodeURIComponent(name)}&`;
    }
    this.url += `SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    // Remove trailing `&` if present
    if (this.url.endsWith("&")) {
      this.url = this.url.slice(0, -1);
    }
    debugger;
    // Call the API
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  getAllActiveVehicleOrHouse(SkipCount, MaxResultCount, name = "", target, locationId, serialNumber) {
    if (target === "ActiveVehicle") {
      this.url = `${this.baseUrl}RentalContract/GetAll?IsActiveVehicleContract=true&IsActive=true&`;
      debugger;
    } else if (target === "ActiveHouse") {
      this.url = `${this.baseUrl}RentalContract/GetAll?IsActiveHouseContract=true&IsActive=true&`;
      debugger;
    }
    if (locationId) {
      this.url += `UserLocationId=${encodeURIComponent(locationId)}&`;
    }
    if (serialNumber) {
      this.url += `SerialNumber=${encodeURIComponent(serialNumber)}&`;
    }
    if (name == null) {
      name = "";
    }
    if (name) {
      this.url += `Title=${encodeURIComponent(name)}&`;
    }
    this.url += `SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    // Remove trailing `&` if present
    if (this.url.endsWith("&")) {
      this.url = this.url.slice(0, -1);
    }
    debugger;
    // Call the API
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  // getAllSubLedgers(
  //   SkipCount: number,
  //   MaxResultCount: number,
  //   name: string = "",
  //   target: string,
  //   chartOfAccountSubLedgerType: string, // e.g., "3,4"
  //   serialNumber?: string
  // ) {
  //   // Construct the base URL
  //   this.url = `${this.baseUrl}ChartOfAccountSubLedger/GetAll?`;
  //   // Handle chartOfAccountSubLedgerType parameter properly
  //   if (chartOfAccountSubLedgerType) {
  //     this.url += `ChartOfAccountSubLedgerTypes=${chartOfAccountSubLedgerType}`;
  //   }
  //   // Add serialNumber if provided
  //   if (serialNumber) {
  //     this.url += `&SerialNumber=${serialNumber}`;
  //   }
  //   // Add name (previously Title)
  //   if (name) {
  //     this.url += `&Name=${name}`;
  //   }
  //   // Add SkipCount and MaxResultCount as they are essential parameters
  //   this.url += `&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
  //   // Call the API
  //   return this.http.get(this.url).pipe(
  //     map((response: any) => {
  //       console.log(response);
  //       return response["result"];
  //     })
  //   );
  // }
  getAllCOA(SkipCount, MaxResultCount, name = "", filter = "", serialNumber) {
    debugger;
    if (serialNumber == undefined) {
      serialNumber = "";
    }
    if (name == null) {
      name = "";
    }
    this.url = this.baseUrl;
    if (filter.toLocaleLowerCase() === "bank") {
      this.url += `ChartOfAccount/GetAll?NatureOfChartOfAccount=0&hasSubLedger=false&Name=${name}&SerialNumber=${serialNumber}&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    } else if (filter.toLocaleLowerCase() === "tax") {
      this.url += `ChartOfAccount/GetAll?NatureOfChartOfAccount=5&hasSubLedger=false&Name=${name}&SerialNumber=${serialNumber}&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    } else if (filter.toLocaleLowerCase() === "all") {
      this.url += `ChartOfAccount/GetAll?Name=${name}&SerialNumber=${serialNumber}&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    } else if (filter.toLocaleLowerCase() === "otax") {
      this.url += `ChartOfAccount/GetAll?NatureOfChartOfAccount=5&Name=${name}&SerialNumber=${serialNumber}&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    } else if (filter.toLocaleLowerCase() === "chartofaccount") {
      this.url += `ChartOfAccount/GetAll?IsBank=false&hasSubLedger=true&Name=${name}&SerialNumber=${serialNumber}&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    } else {
      this.url += `ChartOfAccount/GetAll?Name=${name}&SerialNumber=${serialNumber}&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    }
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  getBudgetCOA(SkipCount, MaxResultCount, name = "", filter = "", serialNumber) {
    debugger;
    if (serialNumber == undefined) {
      serialNumber = "";
    }
    if (name == null) {
      name = "";
    }
    this.url = this.baseUrl;
    this.url += `ChartOfAccount/GetAll?Name=${name}&SerialNumber=${serialNumber}&ShowIncomeExpenseOnly=true&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  getChecksByBankId(SkipCount, MaxResultCount, name = "", filter = "", bankAccountId = "", serialNumber) {
    debugger;
    if (serialNumber == undefined) {
      serialNumber = "";
    }
    this.url = this.baseUrl;
    //65.109.118.136:449/api/services/app/ChequeBookRegister/GetAvailableCheques?ChartOfAccountId=434&Name=${name}&SerialNumber=${serialNumber}&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}
    // "http://65.109.118.136:449/api/services/app/ChequeBookRegister/GetAvailableCheques?ChartOfAccountId=434?Name=&SerialNumber=&SkipCount=0&MaxResultCount=5"
    http: this.url += `ChequeBookRegister/GetAvailableCheques?ChartOfAccountId=${bankAccountId}`;
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  getAllCOAData(SkipCount, MaxResultCount, name = "", target = "", serialNumber, Lvl1_Id, Lvl2_Id) {
    if (serialNumber == undefined) {
      serialNumber = "";
    }
    if (name == null) {
      name = "";
    }
    this.url = this.baseUrl;
    debugger;
    if (Lvl1_Id) {
      this.url += `${target}?name=${name}&SerialNumber=${serialNumber}&Lvl1_Id=${Lvl1_Id}&Lvl2_Id=${Lvl2_Id}&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    } else {
      this.url += `${target}?name=${name}&SerialNumber=${serialNumber}&Lvl2_Id=${Lvl2_Id}&&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    }
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  static #_ = this.ɵfac = function SuggestionLookupTableModaLService_Factory(t) {
    return new (t || SuggestionLookupTableModaLService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: SuggestionLookupTableModaLService,
    factory: SuggestionLookupTableModaLService.ɵfac,
    providedIn: "root"
  });
}

/***/ }),

/***/ 59626:
/*!***************************************************!*\
  !*** ./src/shared/session/app-session.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppSessionService: () => (/* binding */ AppSessionService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/service-proxies/service-proxies */ 81801);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! abp-ng2-module */ 26173);



class AppSessionService {
  constructor(_sessionService, _abpMultiTenancyService) {
    this._sessionService = _sessionService;
    this._abpMultiTenancyService = _abpMultiTenancyService;
  }
  get application() {
    return this._application;
  }
  get user() {
    return this._user;
  }
  get userId() {
    return this.user ? this.user.id : null;
  }
  get tenant() {
    return this._tenant;
  }
  get tenantId() {
    return this.tenant ? this.tenant.id : null;
  }
  getShownLoginName() {
    const userName = this._user.userName;
    if (!this._abpMultiTenancyService.isEnabled) {
      return userName;
    }
    return (this._tenant ? this._tenant.tenancyName : '.') + '\\' + userName;
  }
  init() {
    return new Promise((resolve, reject) => {
      this._sessionService.getCurrentLoginInformations().toPromise().then(result => {
        this._application = result.application;
        this._user = result.user;
        this._tenant = result.tenant;
        resolve(true);
      }, err => {
        reject(err);
      });
    });
  }
  changeTenantIfNeeded(tenantId) {
    if (this.isCurrentTenant(tenantId)) {
      return false;
    }
    abp.multiTenancy.setTenantIdCookie(tenantId);
    location.reload();
    return true;
  }
  isCurrentTenant(tenantId) {
    if (!tenantId && this.tenant) {
      return false;
    } else if (tenantId && (!this.tenant || this.tenant.id !== tenantId)) {
      return false;
    }
    return true;
  }
  static #_ = this.ɵfac = function AppSessionService_Factory(t) {
    return new (t || AppSessionService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_0__.SessionServiceProxy), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.AbpMultiTenancyService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: AppSessionService,
    factory: AppSessionService.ɵfac
  });
}

/***/ }),

/***/ 31699:
/*!*************************************!*\
  !*** ./src/shared/shared.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SharedModule: () => (/* binding */ SharedModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ngx-pagination */ 82423);
/* harmony import */ var _components_picker_picker_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/picker/picker.component */ 79023);
/* harmony import */ var _components_suggestion_lookup_table_modal_SuggestionLookupTableModalComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent */ 76606);
/* harmony import */ var _session_app_session_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./session/app-session.service */ 59626);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! primeng/table */ 76676);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! primeng/button */ 49136);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! primeng/dialog */ 16280);
/* harmony import */ var _nav_app_url_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nav/app-url.service */ 95874);
/* harmony import */ var _auth_app_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth/app-auth.service */ 43728);
/* harmony import */ var _auth_auth_route_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth/auth-route-guard */ 37191);
/* harmony import */ var _shared_pipes_localize_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/pipes/localize.pipe */ 54747);
/* harmony import */ var primeng_checkbox__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! primeng/checkbox */ 26771);
/* harmony import */ var _components_pagination_abp_pagination_controls_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/pagination/abp-pagination-controls.component */ 18612);
/* harmony import */ var _components_validation_abp_validation_summary_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/validation/abp-validation.summary.component */ 48339);
/* harmony import */ var _components_modal_abp_modal_header_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/modal/abp-modal-header.component */ 417);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! primeng/inputtext */ 48361);
/* harmony import */ var _components_modal_abp_modal_footer_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/modal/abp-modal-footer.component */ 42991);
/* harmony import */ var _layout_layout_store_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./layout/layout-store.service */ 4166);
/* harmony import */ var _components_dropdown_selector_dropdown_selector_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/dropdown-selector/dropdown-selector.component */ 78589);
/* harmony import */ var _directives_busy_directive__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./directives/busy.directive */ 56851);
/* harmony import */ var _directives_equal_validator_directive__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./directives/equal-validator.directive */ 70433);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! primeng/paginator */ 43157);
/* harmony import */ var _components_chart_of_account_picker_chart_of_account_picker_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/chart-of-account-picker/chart-of-account-picker.component */ 9341);
/* harmony import */ var _directives_positive_number_only_directive__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./directives/positive-number-only.directive */ 96418);
/* harmony import */ var _directives_allow_only_alphabets_directive__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./directives/allow-only-alphabets.directive */ 92645);
/* harmony import */ var primeng_fileupload__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! primeng/fileupload */ 13209);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/core */ 37580);






























// import { ChartOfAccountModalComponent } from './components/chart-of-account-picker/chart-of-account-modal.component'
class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [_session_app_session_service__WEBPACK_IMPORTED_MODULE_2__.AppSessionService, _nav_app_url_service__WEBPACK_IMPORTED_MODULE_3__.AppUrlService, _auth_app_auth_service__WEBPACK_IMPORTED_MODULE_4__.AppAuthService, _auth_auth_route_guard__WEBPACK_IMPORTED_MODULE_5__.AppRouteGuard, _layout_layout_store_service__WEBPACK_IMPORTED_MODULE_11__.LayoutStoreService]
    };
  }
  static #_ = this.ɵfac = function SharedModule_Factory(t) {
    return new (t || SharedModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineNgModule"]({
    type: SharedModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_19__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_20__.RouterModule, ngx_pagination__WEBPACK_IMPORTED_MODULE_21__.NgxPaginationModule, primeng_checkbox__WEBPACK_IMPORTED_MODULE_22__.CheckboxModule, primeng_table__WEBPACK_IMPORTED_MODULE_23__.TableModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_24__.InputTextModule, primeng_button__WEBPACK_IMPORTED_MODULE_25__.ButtonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormsModule, primeng_dialog__WEBPACK_IMPORTED_MODULE_27__.DialogModule, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.ReactiveFormsModule, primeng_paginator__WEBPACK_IMPORTED_MODULE_28__.PaginatorModule, primeng_fileupload__WEBPACK_IMPORTED_MODULE_29__.FileUploadModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵsetNgModuleScope"](SharedModule, {
    declarations: [_components_pagination_abp_pagination_controls_component__WEBPACK_IMPORTED_MODULE_7__.AbpPaginationControlsComponent, _components_picker_picker_component__WEBPACK_IMPORTED_MODULE_0__.PickerComponent, _components_suggestion_lookup_table_modal_SuggestionLookupTableModalComponent__WEBPACK_IMPORTED_MODULE_1__.SuggestionLookupTableModalComponent, _components_validation_abp_validation_summary_component__WEBPACK_IMPORTED_MODULE_8__.AbpValidationSummaryComponent, _components_chart_of_account_picker_chart_of_account_picker_component__WEBPACK_IMPORTED_MODULE_15__.ChartOfAccountPickerComponent,
    // ChartOfAccountModalComponent,
    _components_modal_abp_modal_header_component__WEBPACK_IMPORTED_MODULE_9__.AbpModalHeaderComponent, _components_dropdown_selector_dropdown_selector_component__WEBPACK_IMPORTED_MODULE_12__.DropdownSelectorComponent, _directives_allow_only_alphabets_directive__WEBPACK_IMPORTED_MODULE_17__.AllowOnlyAlphabetsDirective, _components_modal_abp_modal_footer_component__WEBPACK_IMPORTED_MODULE_10__.AbpModalFooterComponent, _shared_pipes_localize_pipe__WEBPACK_IMPORTED_MODULE_6__.LocalizePipe, _directives_busy_directive__WEBPACK_IMPORTED_MODULE_13__.BusyDirective, _directives_equal_validator_directive__WEBPACK_IMPORTED_MODULE_14__.EqualValidator, _directives_positive_number_only_directive__WEBPACK_IMPORTED_MODULE_16__.PositiveNumberOnlyDirective],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_19__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_20__.RouterModule, ngx_pagination__WEBPACK_IMPORTED_MODULE_21__.NgxPaginationModule, primeng_checkbox__WEBPACK_IMPORTED_MODULE_22__.CheckboxModule, primeng_table__WEBPACK_IMPORTED_MODULE_23__.TableModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_24__.InputTextModule, primeng_button__WEBPACK_IMPORTED_MODULE_25__.ButtonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormsModule, primeng_dialog__WEBPACK_IMPORTED_MODULE_27__.DialogModule, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.ReactiveFormsModule, primeng_paginator__WEBPACK_IMPORTED_MODULE_28__.PaginatorModule, primeng_fileupload__WEBPACK_IMPORTED_MODULE_29__.FileUploadModule],
    exports: [_components_pagination_abp_pagination_controls_component__WEBPACK_IMPORTED_MODULE_7__.AbpPaginationControlsComponent, _components_validation_abp_validation_summary_component__WEBPACK_IMPORTED_MODULE_8__.AbpValidationSummaryComponent, _components_chart_of_account_picker_chart_of_account_picker_component__WEBPACK_IMPORTED_MODULE_15__.ChartOfAccountPickerComponent,
    // ChartOfAccountModalComponent,
    _components_modal_abp_modal_header_component__WEBPACK_IMPORTED_MODULE_9__.AbpModalHeaderComponent, _components_suggestion_lookup_table_modal_SuggestionLookupTableModalComponent__WEBPACK_IMPORTED_MODULE_1__.SuggestionLookupTableModalComponent, _components_picker_picker_component__WEBPACK_IMPORTED_MODULE_0__.PickerComponent, _directives_allow_only_alphabets_directive__WEBPACK_IMPORTED_MODULE_17__.AllowOnlyAlphabetsDirective, _components_modal_abp_modal_footer_component__WEBPACK_IMPORTED_MODULE_10__.AbpModalFooterComponent, _components_dropdown_selector_dropdown_selector_component__WEBPACK_IMPORTED_MODULE_12__.DropdownSelectorComponent, _shared_pipes_localize_pipe__WEBPACK_IMPORTED_MODULE_6__.LocalizePipe, _directives_busy_directive__WEBPACK_IMPORTED_MODULE_13__.BusyDirective, _directives_equal_validator_directive__WEBPACK_IMPORTED_MODULE_14__.EqualValidator, _directives_positive_number_only_directive__WEBPACK_IMPORTED_MODULE_16__.PositiveNumberOnlyDirective]
  });
})();

/***/ }),

/***/ 77055:
/*!***********************************************************************************!*\
  !*** ./node_modules/@angular/common/locales/ lazy ^\.\/.*\.mjs$ namespace object ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af-NA.mjs": [
		14610,
		"node_modules_angular_common_locales_af-NA_mjs"
	],
	"./af.mjs": [
		35188,
		"node_modules_angular_common_locales_af_mjs"
	],
	"./agq.mjs": [
		9070,
		"node_modules_angular_common_locales_agq_mjs"
	],
	"./ak.mjs": [
		6561,
		"node_modules_angular_common_locales_ak_mjs"
	],
	"./am.mjs": [
		94455,
		"node_modules_angular_common_locales_am_mjs"
	],
	"./ar-AE.mjs": [
		36095,
		"node_modules_angular_common_locales_ar-AE_mjs"
	],
	"./ar-BH.mjs": [
		15651,
		"node_modules_angular_common_locales_ar-BH_mjs"
	],
	"./ar-DJ.mjs": [
		45071,
		"node_modules_angular_common_locales_ar-DJ_mjs"
	],
	"./ar-DZ.mjs": [
		40287,
		"node_modules_angular_common_locales_ar-DZ_mjs"
	],
	"./ar-EG.mjs": [
		98865,
		"node_modules_angular_common_locales_ar-EG_mjs"
	],
	"./ar-EH.mjs": [
		62838,
		"node_modules_angular_common_locales_ar-EH_mjs"
	],
	"./ar-ER.mjs": [
		13052,
		"node_modules_angular_common_locales_ar-ER_mjs"
	],
	"./ar-IL.mjs": [
		54198,
		"node_modules_angular_common_locales_ar-IL_mjs"
	],
	"./ar-IQ.mjs": [
		14523,
		"node_modules_angular_common_locales_ar-IQ_mjs"
	],
	"./ar-JO.mjs": [
		9084,
		"node_modules_angular_common_locales_ar-JO_mjs"
	],
	"./ar-KM.mjs": [
		79537,
		"node_modules_angular_common_locales_ar-KM_mjs"
	],
	"./ar-KW.mjs": [
		98867,
		"node_modules_angular_common_locales_ar-KW_mjs"
	],
	"./ar-LB.mjs": [
		78207,
		"node_modules_angular_common_locales_ar-LB_mjs"
	],
	"./ar-LY.mjs": [
		66332,
		"node_modules_angular_common_locales_ar-LY_mjs"
	],
	"./ar-MA.mjs": [
		35407,
		"node_modules_angular_common_locales_ar-MA_mjs"
	],
	"./ar-MR.mjs": [
		38532,
		"node_modules_angular_common_locales_ar-MR_mjs"
	],
	"./ar-OM.mjs": [
		60237,
		"node_modules_angular_common_locales_ar-OM_mjs"
	],
	"./ar-PS.mjs": [
		55338,
		"node_modules_angular_common_locales_ar-PS_mjs"
	],
	"./ar-QA.mjs": [
		42995,
		"node_modules_angular_common_locales_ar-QA_mjs"
	],
	"./ar-SA.mjs": [
		45373,
		"node_modules_angular_common_locales_ar-SA_mjs"
	],
	"./ar-SD.mjs": [
		30064,
		"node_modules_angular_common_locales_ar-SD_mjs"
	],
	"./ar-SO.mjs": [
		22627,
		"node_modules_angular_common_locales_ar-SO_mjs"
	],
	"./ar-SS.mjs": [
		8599,
		"node_modules_angular_common_locales_ar-SS_mjs"
	],
	"./ar-SY.mjs": [
		31493,
		"node_modules_angular_common_locales_ar-SY_mjs"
	],
	"./ar-TD.mjs": [
		76913,
		"node_modules_angular_common_locales_ar-TD_mjs"
	],
	"./ar-TN.mjs": [
		55331,
		"node_modules_angular_common_locales_ar-TN_mjs"
	],
	"./ar-YE.mjs": [
		51351,
		"node_modules_angular_common_locales_ar-YE_mjs"
	],
	"./ar.mjs": [
		45512,
		"node_modules_angular_common_locales_ar_mjs"
	],
	"./as.mjs": [
		67849,
		"node_modules_angular_common_locales_as_mjs"
	],
	"./asa.mjs": [
		26570,
		"node_modules_angular_common_locales_asa_mjs"
	],
	"./ast.mjs": [
		26015,
		"node_modules_angular_common_locales_ast_mjs"
	],
	"./az-Cyrl.mjs": [
		10691,
		"node_modules_angular_common_locales_az-Cyrl_mjs"
	],
	"./az-Latn.mjs": [
		7158,
		"node_modules_angular_common_locales_az-Latn_mjs"
	],
	"./az.mjs": [
		15920,
		"node_modules_angular_common_locales_az_mjs"
	],
	"./bas.mjs": [
		67273,
		"node_modules_angular_common_locales_bas_mjs"
	],
	"./be-tarask.mjs": [
		55831,
		"node_modules_angular_common_locales_be-tarask_mjs"
	],
	"./be.mjs": [
		96846,
		"node_modules_angular_common_locales_be_mjs"
	],
	"./bem.mjs": [
		93779,
		"node_modules_angular_common_locales_bem_mjs"
	],
	"./bez.mjs": [
		65892,
		"node_modules_angular_common_locales_bez_mjs"
	],
	"./bg.mjs": [
		43868,
		"node_modules_angular_common_locales_bg_mjs"
	],
	"./bm.mjs": [
		84806,
		"node_modules_angular_common_locales_bm_mjs"
	],
	"./bn-IN.mjs": [
		33551,
		"node_modules_angular_common_locales_bn-IN_mjs"
	],
	"./bn.mjs": [
		18021,
		"node_modules_angular_common_locales_bn_mjs"
	],
	"./bo-IN.mjs": [
		94168,
		"node_modules_angular_common_locales_bo-IN_mjs"
	],
	"./bo.mjs": [
		8116,
		"node_modules_angular_common_locales_bo_mjs"
	],
	"./br.mjs": [
		79153,
		"node_modules_angular_common_locales_br_mjs"
	],
	"./brx.mjs": [
		23251,
		"node_modules_angular_common_locales_brx_mjs"
	],
	"./bs-Cyrl.mjs": [
		35523,
		"node_modules_angular_common_locales_bs-Cyrl_mjs"
	],
	"./bs-Latn.mjs": [
		46486,
		"node_modules_angular_common_locales_bs-Latn_mjs"
	],
	"./bs.mjs": [
		16592,
		"node_modules_angular_common_locales_bs_mjs"
	],
	"./ca-AD.mjs": [
		31933,
		"node_modules_angular_common_locales_ca-AD_mjs"
	],
	"./ca-ES-valencia.mjs": [
		6222,
		"node_modules_angular_common_locales_ca-ES-valencia_mjs"
	],
	"./ca-FR.mjs": [
		64714,
		"node_modules_angular_common_locales_ca-FR_mjs"
	],
	"./ca-IT.mjs": [
		55365,
		"node_modules_angular_common_locales_ca-IT_mjs"
	],
	"./ca.mjs": [
		28765,
		"node_modules_angular_common_locales_ca_mjs"
	],
	"./ccp-IN.mjs": [
		64583,
		"node_modules_angular_common_locales_ccp-IN_mjs"
	],
	"./ccp.mjs": [
		14525,
		"node_modules_angular_common_locales_ccp_mjs"
	],
	"./ce.mjs": [
		53777,
		"node_modules_angular_common_locales_ce_mjs"
	],
	"./ceb.mjs": [
		33905,
		"node_modules_angular_common_locales_ceb_mjs"
	],
	"./cgg.mjs": [
		11238,
		"node_modules_angular_common_locales_cgg_mjs"
	],
	"./chr.mjs": [
		36538,
		"node_modules_angular_common_locales_chr_mjs"
	],
	"./ckb-IR.mjs": [
		96333,
		"node_modules_angular_common_locales_ckb-IR_mjs"
	],
	"./ckb.mjs": [
		85791,
		"node_modules_angular_common_locales_ckb_mjs"
	],
	"./cs.mjs": [
		83543,
		"node_modules_angular_common_locales_cs_mjs"
	],
	"./cy.mjs": [
		27397,
		"node_modules_angular_common_locales_cy_mjs"
	],
	"./da-GL.mjs": [
		66184,
		"node_modules_angular_common_locales_da-GL_mjs"
	],
	"./da.mjs": [
		67564,
		"node_modules_angular_common_locales_da_mjs"
	],
	"./dav.mjs": [
		78702,
		"node_modules_angular_common_locales_dav_mjs"
	],
	"./de-AT.mjs": [
		76622,
		"node_modules_angular_common_locales_de-AT_mjs"
	],
	"./de-BE.mjs": [
		29958,
		"node_modules_angular_common_locales_de-BE_mjs"
	],
	"./de-CH.mjs": [
		6412,
		"node_modules_angular_common_locales_de-CH_mjs"
	],
	"./de-IT.mjs": [
		73606,
		"node_modules_angular_common_locales_de-IT_mjs"
	],
	"./de-LI.mjs": [
		77044,
		"node_modules_angular_common_locales_de-LI_mjs"
	],
	"./de-LU.mjs": [
		57776,
		"node_modules_angular_common_locales_de-LU_mjs"
	],
	"./de.mjs": [
		73840,
		"node_modules_angular_common_locales_de_mjs"
	],
	"./dje.mjs": [
		78120,
		"node_modules_angular_common_locales_dje_mjs"
	],
	"./doi.mjs": [
		65059,
		"node_modules_angular_common_locales_doi_mjs"
	],
	"./dsb.mjs": [
		73660,
		"node_modules_angular_common_locales_dsb_mjs"
	],
	"./dua.mjs": [
		93674,
		"node_modules_angular_common_locales_dua_mjs"
	],
	"./dyo.mjs": [
		16679,
		"node_modules_angular_common_locales_dyo_mjs"
	],
	"./dz.mjs": [
		45679,
		"node_modules_angular_common_locales_dz_mjs"
	],
	"./ebu.mjs": [
		61821,
		"node_modules_angular_common_locales_ebu_mjs"
	],
	"./ee-TG.mjs": [
		77847,
		"node_modules_angular_common_locales_ee-TG_mjs"
	],
	"./ee.mjs": [
		29499,
		"node_modules_angular_common_locales_ee_mjs"
	],
	"./el-CY.mjs": [
		31607,
		"node_modules_angular_common_locales_el-CY_mjs"
	],
	"./el.mjs": [
		17546,
		"node_modules_angular_common_locales_el_mjs"
	],
	"./en-001.mjs": [
		33434,
		"node_modules_angular_common_locales_en-001_mjs"
	],
	"./en-150.mjs": [
		24341,
		"node_modules_angular_common_locales_en-150_mjs"
	],
	"./en-AE.mjs": [
		23599,
		"node_modules_angular_common_locales_en-AE_mjs"
	],
	"./en-AG.mjs": [
		39525,
		"node_modules_angular_common_locales_en-AG_mjs"
	],
	"./en-AI.mjs": [
		13051,
		"node_modules_angular_common_locales_en-AI_mjs"
	],
	"./en-AS.mjs": [
		64617,
		"node_modules_angular_common_locales_en-AS_mjs"
	],
	"./en-AT.mjs": [
		64630,
		"node_modules_angular_common_locales_en-AT_mjs"
	],
	"./en-AU.mjs": [
		35167,
		"node_modules_angular_common_locales_en-AU_mjs"
	],
	"./en-BB.mjs": [
		54465,
		"node_modules_angular_common_locales_en-BB_mjs"
	],
	"./en-BE.mjs": [
		83726,
		"node_modules_angular_common_locales_en-BE_mjs"
	],
	"./en-BI.mjs": [
		35274,
		"node_modules_angular_common_locales_en-BI_mjs"
	],
	"./en-BM.mjs": [
		90374,
		"node_modules_angular_common_locales_en-BM_mjs"
	],
	"./en-BS.mjs": [
		86512,
		"node_modules_angular_common_locales_en-BS_mjs"
	],
	"./en-BW.mjs": [
		20492,
		"node_modules_angular_common_locales_en-BW_mjs"
	],
	"./en-BZ.mjs": [
		80521,
		"node_modules_angular_common_locales_en-BZ_mjs"
	],
	"./en-CA.mjs": [
		56989,
		"node_modules_angular_common_locales_en-CA_mjs"
	],
	"./en-CC.mjs": [
		31943,
		"node_modules_angular_common_locales_en-CC_mjs"
	],
	"./en-CH.mjs": [
		15588,
		"node_modules_angular_common_locales_en-CH_mjs"
	],
	"./en-CK.mjs": [
		67039,
		"node_modules_angular_common_locales_en-CK_mjs"
	],
	"./en-CM.mjs": [
		39689,
		"node_modules_angular_common_locales_en-CM_mjs"
	],
	"./en-CX.mjs": [
		33204,
		"node_modules_angular_common_locales_en-CX_mjs"
	],
	"./en-CY.mjs": [
		43109,
		"node_modules_angular_common_locales_en-CY_mjs"
	],
	"./en-DE.mjs": [
		43760,
		"node_modules_angular_common_locales_en-DE_mjs"
	],
	"./en-DG.mjs": [
		71522,
		"node_modules_angular_common_locales_en-DG_mjs"
	],
	"./en-DK.mjs": [
		52054,
		"node_modules_angular_common_locales_en-DK_mjs"
	],
	"./en-DM.mjs": [
		50056,
		"node_modules_angular_common_locales_en-DM_mjs"
	],
	"./en-ER.mjs": [
		30156,
		"node_modules_angular_common_locales_en-ER_mjs"
	],
	"./en-FI.mjs": [
		92478,
		"node_modules_angular_common_locales_en-FI_mjs"
	],
	"./en-FJ.mjs": [
		60765,
		"node_modules_angular_common_locales_en-FJ_mjs"
	],
	"./en-FK.mjs": [
		58028,
		"node_modules_angular_common_locales_en-FK_mjs"
	],
	"./en-FM.mjs": [
		9858,
		"node_modules_angular_common_locales_en-FM_mjs"
	],
	"./en-GB.mjs": [
		27666,
		"node_modules_angular_common_locales_en-GB_mjs"
	],
	"./en-GD.mjs": [
		43996,
		"node_modules_angular_common_locales_en-GD_mjs"
	],
	"./en-GG.mjs": [
		88311,
		"node_modules_angular_common_locales_en-GG_mjs"
	],
	"./en-GH.mjs": [
		53176,
		"node_modules_angular_common_locales_en-GH_mjs"
	],
	"./en-GI.mjs": [
		62169,
		"node_modules_angular_common_locales_en-GI_mjs"
	],
	"./en-GM.mjs": [
		68677,
		"node_modules_angular_common_locales_en-GM_mjs"
	],
	"./en-GU.mjs": [
		13181,
		"node_modules_angular_common_locales_en-GU_mjs"
	],
	"./en-GY.mjs": [
		45353,
		"node_modules_angular_common_locales_en-GY_mjs"
	],
	"./en-HK.mjs": [
		59130,
		"node_modules_angular_common_locales_en-HK_mjs"
	],
	"./en-IE.mjs": [
		62967,
		"node_modules_angular_common_locales_en-IE_mjs"
	],
	"./en-IL.mjs": [
		68998,
		"node_modules_angular_common_locales_en-IL_mjs"
	],
	"./en-IM.mjs": [
		56271,
		"node_modules_angular_common_locales_en-IM_mjs"
	],
	"./en-IN.mjs": [
		92308,
		"node_modules_angular_common_locales_en-IN_mjs"
	],
	"./en-IO.mjs": [
		85861,
		"node_modules_angular_common_locales_en-IO_mjs"
	],
	"./en-JE.mjs": [
		32726,
		"node_modules_angular_common_locales_en-JE_mjs"
	],
	"./en-JM.mjs": [
		27486,
		"node_modules_angular_common_locales_en-JM_mjs"
	],
	"./en-KE.mjs": [
		46201,
		"node_modules_angular_common_locales_en-KE_mjs"
	],
	"./en-KI.mjs": [
		30573,
		"node_modules_angular_common_locales_en-KI_mjs"
	],
	"./en-KN.mjs": [
		60114,
		"node_modules_angular_common_locales_en-KN_mjs"
	],
	"./en-KY.mjs": [
		96605,
		"node_modules_angular_common_locales_en-KY_mjs"
	],
	"./en-LC.mjs": [
		91622,
		"node_modules_angular_common_locales_en-LC_mjs"
	],
	"./en-LR.mjs": [
		36863,
		"node_modules_angular_common_locales_en-LR_mjs"
	],
	"./en-LS.mjs": [
		84118,
		"node_modules_angular_common_locales_en-LS_mjs"
	],
	"./en-MG.mjs": [
		28105,
		"node_modules_angular_common_locales_en-MG_mjs"
	],
	"./en-MH.mjs": [
		37150,
		"node_modules_angular_common_locales_en-MH_mjs"
	],
	"./en-MO.mjs": [
		95217,
		"node_modules_angular_common_locales_en-MO_mjs"
	],
	"./en-MP.mjs": [
		37958,
		"node_modules_angular_common_locales_en-MP_mjs"
	],
	"./en-MS.mjs": [
		52485,
		"node_modules_angular_common_locales_en-MS_mjs"
	],
	"./en-MT.mjs": [
		82858,
		"node_modules_angular_common_locales_en-MT_mjs"
	],
	"./en-MU.mjs": [
		88371,
		"node_modules_angular_common_locales_en-MU_mjs"
	],
	"./en-MV.mjs": [
		94456,
		"node_modules_angular_common_locales_en-MV_mjs"
	],
	"./en-MW.mjs": [
		3449,
		"node_modules_angular_common_locales_en-MW_mjs"
	],
	"./en-MY.mjs": [
		8631,
		"node_modules_angular_common_locales_en-MY_mjs"
	],
	"./en-NA.mjs": [
		10078,
		"node_modules_angular_common_locales_en-NA_mjs"
	],
	"./en-NF.mjs": [
		48913,
		"node_modules_angular_common_locales_en-NF_mjs"
	],
	"./en-NG.mjs": [
		11472,
		"node_modules_angular_common_locales_en-NG_mjs"
	],
	"./en-NL.mjs": [
		27331,
		"node_modules_angular_common_locales_en-NL_mjs"
	],
	"./en-NR.mjs": [
		18221,
		"node_modules_angular_common_locales_en-NR_mjs"
	],
	"./en-NU.mjs": [
		94738,
		"node_modules_angular_common_locales_en-NU_mjs"
	],
	"./en-NZ.mjs": [
		29861,
		"node_modules_angular_common_locales_en-NZ_mjs"
	],
	"./en-PG.mjs": [
		71046,
		"node_modules_angular_common_locales_en-PG_mjs"
	],
	"./en-PH.mjs": [
		35137,
		"node_modules_angular_common_locales_en-PH_mjs"
	],
	"./en-PK.mjs": [
		66802,
		"node_modules_angular_common_locales_en-PK_mjs"
	],
	"./en-PN.mjs": [
		41719,
		"node_modules_angular_common_locales_en-PN_mjs"
	],
	"./en-PR.mjs": [
		6723,
		"node_modules_angular_common_locales_en-PR_mjs"
	],
	"./en-PW.mjs": [
		91830,
		"node_modules_angular_common_locales_en-PW_mjs"
	],
	"./en-RW.mjs": [
		15004,
		"node_modules_angular_common_locales_en-RW_mjs"
	],
	"./en-SB.mjs": [
		70926,
		"node_modules_angular_common_locales_en-SB_mjs"
	],
	"./en-SC.mjs": [
		11735,
		"node_modules_angular_common_locales_en-SC_mjs"
	],
	"./en-SD.mjs": [
		12160,
		"node_modules_angular_common_locales_en-SD_mjs"
	],
	"./en-SE.mjs": [
		7489,
		"node_modules_angular_common_locales_en-SE_mjs"
	],
	"./en-SG.mjs": [
		93915,
		"node_modules_angular_common_locales_en-SG_mjs"
	],
	"./en-SH.mjs": [
		36116,
		"node_modules_angular_common_locales_en-SH_mjs"
	],
	"./en-SI.mjs": [
		92101,
		"node_modules_angular_common_locales_en-SI_mjs"
	],
	"./en-SL.mjs": [
		76600,
		"node_modules_angular_common_locales_en-SL_mjs"
	],
	"./en-SS.mjs": [
		4231,
		"node_modules_angular_common_locales_en-SS_mjs"
	],
	"./en-SX.mjs": [
		61028,
		"node_modules_angular_common_locales_en-SX_mjs"
	],
	"./en-SZ.mjs": [
		17206,
		"node_modules_angular_common_locales_en-SZ_mjs"
	],
	"./en-TC.mjs": [
		74734,
		"node_modules_angular_common_locales_en-TC_mjs"
	],
	"./en-TK.mjs": [
		11110,
		"node_modules_angular_common_locales_en-TK_mjs"
	],
	"./en-TO.mjs": [
		68810,
		"node_modules_angular_common_locales_en-TO_mjs"
	],
	"./en-TT.mjs": [
		91665,
		"node_modules_angular_common_locales_en-TT_mjs"
	],
	"./en-TV.mjs": [
		54443,
		"node_modules_angular_common_locales_en-TV_mjs"
	],
	"./en-TZ.mjs": [
		68255,
		"node_modules_angular_common_locales_en-TZ_mjs"
	],
	"./en-UG.mjs": [
		10481,
		"node_modules_angular_common_locales_en-UG_mjs"
	],
	"./en-UM.mjs": [
		36931,
		"node_modules_angular_common_locales_en-UM_mjs"
	],
	"./en-VC.mjs": [
		82644,
		"node_modules_angular_common_locales_en-VC_mjs"
	],
	"./en-VG.mjs": [
		87544,
		"node_modules_angular_common_locales_en-VG_mjs"
	],
	"./en-VI.mjs": [
		71374,
		"node_modules_angular_common_locales_en-VI_mjs"
	],
	"./en-VU.mjs": [
		1882,
		"node_modules_angular_common_locales_en-VU_mjs"
	],
	"./en-WS.mjs": [
		93723,
		"node_modules_angular_common_locales_en-WS_mjs"
	],
	"./en-ZA.mjs": [
		49482,
		"node_modules_angular_common_locales_en-ZA_mjs"
	],
	"./en-ZM.mjs": [
		55406,
		"node_modules_angular_common_locales_en-ZM_mjs"
	],
	"./en-ZW.mjs": [
		56836,
		"node_modules_angular_common_locales_en-ZW_mjs"
	],
	"./en.mjs": [
		39032,
		"node_modules_angular_common_locales_en_mjs"
	],
	"./eo.mjs": [
		48025,
		"node_modules_angular_common_locales_eo_mjs"
	],
	"./es-419.mjs": [
		3292,
		"node_modules_angular_common_locales_es-419_mjs"
	],
	"./es-AR.mjs": [
		91611,
		"node_modules_angular_common_locales_es-AR_mjs"
	],
	"./es-BO.mjs": [
		75899,
		"node_modules_angular_common_locales_es-BO_mjs"
	],
	"./es-BR.mjs": [
		75894,
		"node_modules_angular_common_locales_es-BR_mjs"
	],
	"./es-BZ.mjs": [
		19678,
		"node_modules_angular_common_locales_es-BZ_mjs"
	],
	"./es-CL.mjs": [
		10503,
		"node_modules_angular_common_locales_es-CL_mjs"
	],
	"./es-CO.mjs": [
		13964,
		"node_modules_angular_common_locales_es-CO_mjs"
	],
	"./es-CR.mjs": [
		42009,
		"node_modules_angular_common_locales_es-CR_mjs"
	],
	"./es-CU.mjs": [
		88454,
		"node_modules_angular_common_locales_es-CU_mjs"
	],
	"./es-DO.mjs": [
		92465,
		"node_modules_angular_common_locales_es-DO_mjs"
	],
	"./es-EA.mjs": [
		45588,
		"node_modules_angular_common_locales_es-EA_mjs"
	],
	"./es-EC.mjs": [
		62246,
		"node_modules_angular_common_locales_es-EC_mjs"
	],
	"./es-GQ.mjs": [
		26062,
		"node_modules_angular_common_locales_es-GQ_mjs"
	],
	"./es-GT.mjs": [
		49051,
		"node_modules_angular_common_locales_es-GT_mjs"
	],
	"./es-HN.mjs": [
		32220,
		"node_modules_angular_common_locales_es-HN_mjs"
	],
	"./es-IC.mjs": [
		67738,
		"node_modules_angular_common_locales_es-IC_mjs"
	],
	"./es-MX.mjs": [
		40997,
		"node_modules_angular_common_locales_es-MX_mjs"
	],
	"./es-NI.mjs": [
		53753,
		"node_modules_angular_common_locales_es-NI_mjs"
	],
	"./es-PA.mjs": [
		81227,
		"node_modules_angular_common_locales_es-PA_mjs"
	],
	"./es-PE.mjs": [
		43591,
		"node_modules_angular_common_locales_es-PE_mjs"
	],
	"./es-PH.mjs": [
		80442,
		"node_modules_angular_common_locales_es-PH_mjs"
	],
	"./es-PR.mjs": [
		78368,
		"node_modules_angular_common_locales_es-PR_mjs"
	],
	"./es-PY.mjs": [
		85747,
		"node_modules_angular_common_locales_es-PY_mjs"
	],
	"./es-SV.mjs": [
		73077,
		"node_modules_angular_common_locales_es-SV_mjs"
	],
	"./es-US.mjs": [
		60518,
		"node_modules_angular_common_locales_es-US_mjs"
	],
	"./es-UY.mjs": [
		3228,
		"node_modules_angular_common_locales_es-UY_mjs"
	],
	"./es-VE.mjs": [
		34821,
		"node_modules_angular_common_locales_es-VE_mjs"
	],
	"./es.mjs": [
		41565,
		"node_modules_angular_common_locales_es_mjs"
	],
	"./et.mjs": [
		55458,
		"node_modules_angular_common_locales_et_mjs"
	],
	"./eu.mjs": [
		54155,
		"node_modules_angular_common_locales_eu_mjs"
	],
	"./ewo.mjs": [
		40900,
		"node_modules_angular_common_locales_ewo_mjs"
	],
	"./extra/af-NA.mjs": [
		34709,
		"node_modules_angular_common_locales_extra_af-NA_mjs"
	],
	"./extra/af.mjs": [
		77465,
		"node_modules_angular_common_locales_extra_af_mjs"
	],
	"./extra/agq.mjs": [
		41301,
		"node_modules_angular_common_locales_extra_agq_mjs"
	],
	"./extra/ak.mjs": [
		59292,
		"node_modules_angular_common_locales_extra_ak_mjs"
	],
	"./extra/am.mjs": [
		42962,
		"node_modules_angular_common_locales_extra_am_mjs"
	],
	"./extra/ar-AE.mjs": [
		66916,
		"node_modules_angular_common_locales_extra_ar-AE_mjs"
	],
	"./extra/ar-BH.mjs": [
		24804,
		"node_modules_angular_common_locales_extra_ar-BH_mjs"
	],
	"./extra/ar-DJ.mjs": [
		93364,
		"node_modules_angular_common_locales_extra_ar-DJ_mjs"
	],
	"./extra/ar-DZ.mjs": [
		59396,
		"node_modules_angular_common_locales_extra_ar-DZ_mjs"
	],
	"./extra/ar-EG.mjs": [
		78626,
		"node_modules_angular_common_locales_extra_ar-EG_mjs"
	],
	"./extra/ar-EH.mjs": [
		10741,
		"node_modules_angular_common_locales_extra_ar-EH_mjs"
	],
	"./extra/ar-ER.mjs": [
		11607,
		"node_modules_angular_common_locales_extra_ar-ER_mjs"
	],
	"./extra/ar-IL.mjs": [
		43189,
		"node_modules_angular_common_locales_extra_ar-IL_mjs"
	],
	"./extra/ar-IQ.mjs": [
		23744,
		"node_modules_angular_common_locales_extra_ar-IQ_mjs"
	],
	"./extra/ar-JO.mjs": [
		85755,
		"node_modules_angular_common_locales_extra_ar-JO_mjs"
	],
	"./extra/ar-KM.mjs": [
		60766,
		"node_modules_angular_common_locales_extra_ar-KM_mjs"
	],
	"./extra/ar-KW.mjs": [
		21620,
		"node_modules_angular_common_locales_extra_ar-KW_mjs"
	],
	"./extra/ar-LB.mjs": [
		97316,
		"node_modules_angular_common_locales_extra_ar-LB_mjs"
	],
	"./extra/ar-LY.mjs": [
		1943,
		"node_modules_angular_common_locales_extra_ar-LY_mjs"
	],
	"./extra/ar-MA.mjs": [
		39092,
		"node_modules_angular_common_locales_extra_ar-MA_mjs"
	],
	"./extra/ar-MR.mjs": [
		86719,
		"node_modules_angular_common_locales_extra_ar-MR_mjs"
	],
	"./extra/ar-OM.mjs": [
		20346,
		"node_modules_angular_common_locales_extra_ar-OM_mjs"
	],
	"./extra/ar-PS.mjs": [
		76185,
		"node_modules_angular_common_locales_extra_ar-PS_mjs"
	],
	"./extra/ar-QA.mjs": [
		69272,
		"node_modules_angular_common_locales_extra_ar-QA_mjs"
	],
	"./extra/ar-SA.mjs": [
		76674,
		"node_modules_angular_common_locales_extra_ar-SA_mjs"
	],
	"./extra/ar-SD.mjs": [
		10055,
		"node_modules_angular_common_locales_extra_ar-SD_mjs"
	],
	"./extra/ar-SO.mjs": [
		5028,
		"node_modules_angular_common_locales_extra_ar-SO_mjs"
	],
	"./extra/ar-SS.mjs": [
		72512,
		"node_modules_angular_common_locales_extra_ar-SS_mjs"
	],
	"./extra/ar-SY.mjs": [
		14026,
		"node_modules_angular_common_locales_extra_ar-SY_mjs"
	],
	"./extra/ar-TD.mjs": [
		86338,
		"node_modules_angular_common_locales_extra_ar-TD_mjs"
	],
	"./extra/ar-TN.mjs": [
		64872,
		"node_modules_angular_common_locales_extra_ar-TN_mjs"
	],
	"./extra/ar-YE.mjs": [
		1148,
		"node_modules_angular_common_locales_extra_ar-YE_mjs"
	],
	"./extra/ar.mjs": [
		86389,
		"node_modules_angular_common_locales_extra_ar_mjs"
	],
	"./extra/as.mjs": [
		36548,
		"node_modules_angular_common_locales_extra_as_mjs"
	],
	"./extra/asa.mjs": [
		70937,
		"node_modules_angular_common_locales_extra_asa_mjs"
	],
	"./extra/ast.mjs": [
		30020,
		"node_modules_angular_common_locales_extra_ast_mjs"
	],
	"./extra/az-Cyrl.mjs": [
		59760,
		"node_modules_angular_common_locales_extra_az-Cyrl_mjs"
	],
	"./extra/az-Latn.mjs": [
		80677,
		"node_modules_angular_common_locales_extra_az-Latn_mjs"
	],
	"./extra/az.mjs": [
		28477,
		"node_modules_angular_common_locales_extra_az_mjs"
	],
	"./extra/bas.mjs": [
		81278,
		"node_modules_angular_common_locales_extra_bas_mjs"
	],
	"./extra/be-tarask.mjs": [
		90720,
		"node_modules_angular_common_locales_extra_be-tarask_mjs"
	],
	"./extra/be.mjs": [
		94539,
		"node_modules_angular_common_locales_extra_be_mjs"
	],
	"./extra/bem.mjs": [
		88988,
		"node_modules_angular_common_locales_extra_bem_mjs"
	],
	"./extra/bez.mjs": [
		3403,
		"node_modules_angular_common_locales_extra_bez_mjs"
	],
	"./extra/bg.mjs": [
		29201,
		"node_modules_angular_common_locales_extra_bg_mjs"
	],
	"./extra/bm.mjs": [
		59203,
		"node_modules_angular_common_locales_extra_bm_mjs"
	],
	"./extra/bn-IN.mjs": [
		2372,
		"node_modules_angular_common_locales_extra_bn-IN_mjs"
	],
	"./extra/bn.mjs": [
		72936,
		"node_modules_angular_common_locales_extra_bn_mjs"
	],
	"./extra/bo-IN.mjs": [
		11291,
		"node_modules_angular_common_locales_extra_bo-IN_mjs"
	],
	"./extra/bo.mjs": [
		48297,
		"node_modules_angular_common_locales_extra_bo_mjs"
	],
	"./extra/br.mjs": [
		77564,
		"node_modules_angular_common_locales_extra_br_mjs"
	],
	"./extra/brx.mjs": [
		81640,
		"node_modules_angular_common_locales_extra_brx_mjs"
	],
	"./extra/bs-Cyrl.mjs": [
		77472,
		"node_modules_angular_common_locales_extra_bs-Cyrl_mjs"
	],
	"./extra/bs-Latn.mjs": [
		99125,
		"node_modules_angular_common_locales_extra_bs-Latn_mjs"
	],
	"./extra/bs.mjs": [
		73389,
		"node_modules_angular_common_locales_extra_bs_mjs"
	],
	"./extra/ca-AD.mjs": [
		98,
		"node_modules_angular_common_locales_extra_ca-AD_mjs"
	],
	"./extra/ca-ES-valencia.mjs": [
		36999,
		"node_modules_angular_common_locales_extra_ca-ES-valencia_mjs"
	],
	"./extra/ca-FR.mjs": [
		12225,
		"node_modules_angular_common_locales_extra_ca-FR_mjs"
	],
	"./extra/ca-IT.mjs": [
		83354,
		"node_modules_angular_common_locales_extra_ca-IT_mjs"
	],
	"./extra/ca.mjs": [
		74652,
		"node_modules_angular_common_locales_extra_ca_mjs"
	],
	"./extra/ccp-IN.mjs": [
		99442,
		"node_modules_angular_common_locales_extra_ccp-IN_mjs"
	],
	"./extra/ccp.mjs": [
		65086,
		"node_modules_angular_common_locales_extra_ccp_mjs"
	],
	"./extra/ce.mjs": [
		19392,
		"node_modules_angular_common_locales_extra_ce_mjs"
	],
	"./extra/ceb.mjs": [
		13918,
		"node_modules_angular_common_locales_extra_ceb_mjs"
	],
	"./extra/cgg.mjs": [
		63301,
		"node_modules_angular_common_locales_extra_cgg_mjs"
	],
	"./extra/chr.mjs": [
		58957,
		"node_modules_angular_common_locales_extra_chr_mjs"
	],
	"./extra/ckb-IR.mjs": [
		81532,
		"node_modules_angular_common_locales_extra_ckb-IR_mjs"
	],
	"./extra/ckb.mjs": [
		79364,
		"node_modules_angular_common_locales_extra_ckb_mjs"
	],
	"./extra/cs.mjs": [
		71102,
		"node_modules_angular_common_locales_extra_cs_mjs"
	],
	"./extra/cy.mjs": [
		94436,
		"node_modules_angular_common_locales_extra_cy_mjs"
	],
	"./extra/da-GL.mjs": [
		5875,
		"node_modules_angular_common_locales_extra_da-GL_mjs"
	],
	"./extra/da.mjs": [
		16141,
		"node_modules_angular_common_locales_extra_da_mjs"
	],
	"./extra/dav.mjs": [
		40825,
		"node_modules_angular_common_locales_extra_dav_mjs"
	],
	"./extra/de-AT.mjs": [
		11673,
		"node_modules_angular_common_locales_extra_de-AT_mjs"
	],
	"./extra/de-BE.mjs": [
		93413,
		"node_modules_angular_common_locales_extra_de-BE_mjs"
	],
	"./extra/de-CH.mjs": [
		39279,
		"node_modules_angular_common_locales_extra_de-CH_mjs"
	],
	"./extra/de-IT.mjs": [
		18545,
		"node_modules_angular_common_locales_extra_de-IT_mjs"
	],
	"./extra/de-LI.mjs": [
		77131,
		"node_modules_angular_common_locales_extra_de-LI_mjs"
	],
	"./extra/de-LU.mjs": [
		21071,
		"node_modules_angular_common_locales_extra_de-LU_mjs"
	],
	"./extra/de.mjs": [
		29761,
		"node_modules_angular_common_locales_extra_de_mjs"
	],
	"./extra/dje.mjs": [
		58403,
		"node_modules_angular_common_locales_extra_dje_mjs"
	],
	"./extra/doi.mjs": [
		69384,
		"node_modules_angular_common_locales_extra_doi_mjs"
	],
	"./extra/dsb.mjs": [
		25207,
		"node_modules_angular_common_locales_extra_dsb_mjs"
	],
	"./extra/dua.mjs": [
		64354,
		"node_modules_angular_common_locales_extra_dua_mjs"
	],
	"./extra/dyo.mjs": [
		97592,
		"node_modules_angular_common_locales_extra_dyo_mjs"
	],
	"./extra/dz.mjs": [
		12630,
		"node_modules_angular_common_locales_extra_dz_mjs"
	],
	"./extra/ebu.mjs": [
		15246,
		"node_modules_angular_common_locales_extra_ebu_mjs"
	],
	"./extra/ee-TG.mjs": [
		65208,
		"node_modules_angular_common_locales_extra_ee-TG_mjs"
	],
	"./extra/ee.mjs": [
		3998,
		"node_modules_angular_common_locales_extra_ee_mjs"
	],
	"./extra/el-CY.mjs": [
		76276,
		"node_modules_angular_common_locales_extra_el-CY_mjs"
	],
	"./extra/el.mjs": [
		82335,
		"node_modules_angular_common_locales_extra_el_mjs"
	],
	"./extra/en-001.mjs": [
		57643,
		"node_modules_angular_common_locales_extra_en-001_mjs"
	],
	"./extra/en-150.mjs": [
		1192,
		"node_modules_angular_common_locales_extra_en-150_mjs"
	],
	"./extra/en-AE.mjs": [
		71012,
		"node_modules_angular_common_locales_extra_en-AE_mjs"
	],
	"./extra/en-AG.mjs": [
		342,
		"node_modules_angular_common_locales_extra_en-AG_mjs"
	],
	"./extra/en-AI.mjs": [
		97104,
		"node_modules_angular_common_locales_extra_en-AI_mjs"
	],
	"./extra/en-AS.mjs": [
		88394,
		"node_modules_angular_common_locales_extra_en-AS_mjs"
	],
	"./extra/en-AT.mjs": [
		98533,
		"node_modules_angular_common_locales_extra_en-AT_mjs"
	],
	"./extra/en-AU.mjs": [
		88628,
		"node_modules_angular_common_locales_extra_en-AU_mjs"
	],
	"./extra/en-BB.mjs": [
		28638,
		"node_modules_angular_common_locales_extra_en-BB_mjs"
	],
	"./extra/en-BE.mjs": [
		86705,
		"node_modules_angular_common_locales_extra_en-BE_mjs"
	],
	"./extra/en-BI.mjs": [
		68629,
		"node_modules_angular_common_locales_extra_en-BI_mjs"
	],
	"./extra/en-BM.mjs": [
		19593,
		"node_modules_angular_common_locales_extra_en-BM_mjs"
	],
	"./extra/en-BS.mjs": [
		16471,
		"node_modules_angular_common_locales_extra_en-BS_mjs"
	],
	"./extra/en-BW.mjs": [
		10555,
		"node_modules_angular_common_locales_extra_en-BW_mjs"
	],
	"./extra/en-BZ.mjs": [
		29446,
		"node_modules_angular_common_locales_extra_en-BZ_mjs"
	],
	"./extra/en-CA.mjs": [
		25842,
		"node_modules_angular_common_locales_extra_en-CA_mjs"
	],
	"./extra/en-CC.mjs": [
		86912,
		"node_modules_angular_common_locales_extra_en-CC_mjs"
	],
	"./extra/en-CH.mjs": [
		47315,
		"node_modules_angular_common_locales_extra_en-CH_mjs"
	],
	"./extra/en-CK.mjs": [
		35000,
		"node_modules_angular_common_locales_extra_en-CK_mjs"
	],
	"./extra/en-CM.mjs": [
		99462,
		"node_modules_angular_common_locales_extra_en-CM_mjs"
	],
	"./extra/en-CX.mjs": [
		54435,
		"node_modules_angular_common_locales_extra_en-CX_mjs"
	],
	"./extra/en-CY.mjs": [
		46458,
		"node_modules_angular_common_locales_extra_en-CY_mjs"
	],
	"./extra/en-DE.mjs": [
		78331,
		"node_modules_angular_common_locales_extra_en-DE_mjs"
	],
	"./extra/en-DG.mjs": [
		91905,
		"node_modules_angular_common_locales_extra_en-DG_mjs"
	],
	"./extra/en-DK.mjs": [
		76517,
		"node_modules_angular_common_locales_extra_en-DK_mjs"
	],
	"./extra/en-DM.mjs": [
		56979,
		"node_modules_angular_common_locales_extra_en-DM_mjs"
	],
	"./extra/en-ER.mjs": [
		27383,
		"node_modules_angular_common_locales_extra_en-ER_mjs"
	],
	"./extra/en-FI.mjs": [
		21625,
		"node_modules_angular_common_locales_extra_en-FI_mjs"
	],
	"./extra/en-FJ.mjs": [
		27210,
		"node_modules_angular_common_locales_extra_en-FJ_mjs"
	],
	"./extra/en-FK.mjs": [
		62451,
		"node_modules_angular_common_locales_extra_en-FK_mjs"
	],
	"./extra/en-FM.mjs": [
		31013,
		"node_modules_angular_common_locales_extra_en-FM_mjs"
	],
	"./extra/en-GB.mjs": [
		26549,
		"node_modules_angular_common_locales_extra_en-GB_mjs"
	],
	"./extra/en-GD.mjs": [
		92419,
		"node_modules_angular_common_locales_extra_en-GD_mjs"
	],
	"./extra/en-GG.mjs": [
		32328,
		"node_modules_angular_common_locales_extra_en-GG_mjs"
	],
	"./extra/en-GH.mjs": [
		90727,
		"node_modules_angular_common_locales_extra_en-GH_mjs"
	],
	"./extra/en-GI.mjs": [
		58814,
		"node_modules_angular_common_locales_extra_en-GI_mjs"
	],
	"./extra/en-GM.mjs": [
		80642,
		"node_modules_angular_common_locales_extra_en-GM_mjs"
	],
	"./extra/en-GU.mjs": [
		74794,
		"node_modules_angular_common_locales_extra_en-GU_mjs"
	],
	"./extra/en-GY.mjs": [
		97070,
		"node_modules_angular_common_locales_extra_en-GY_mjs"
	],
	"./extra/en-HK.mjs": [
		54041,
		"node_modules_angular_common_locales_extra_en-HK_mjs"
	],
	"./extra/en-IE.mjs": [
		49900,
		"node_modules_angular_common_locales_extra_en-IE_mjs"
	],
	"./extra/en-IL.mjs": [
		58965,
		"node_modules_angular_common_locales_extra_en-IL_mjs"
	],
	"./extra/en-IM.mjs": [
		88388,
		"node_modules_angular_common_locales_extra_en-IM_mjs"
	],
	"./extra/en-IN.mjs": [
		34399,
		"node_modules_angular_common_locales_extra_en-IN_mjs"
	],
	"./extra/en-IO.mjs": [
		40566,
		"node_modules_angular_common_locales_extra_en-IO_mjs"
	],
	"./extra/en-JE.mjs": [
		50681,
		"node_modules_angular_common_locales_extra_en-JE_mjs"
	],
	"./extra/en-JM.mjs": [
		72577,
		"node_modules_angular_common_locales_extra_en-JM_mjs"
	],
	"./extra/en-KE.mjs": [
		29878,
		"node_modules_angular_common_locales_extra_en-KE_mjs"
	],
	"./extra/en-KI.mjs": [
		98370,
		"node_modules_angular_common_locales_extra_en-KI_mjs"
	],
	"./extra/en-KN.mjs": [
		49277,
		"node_modules_angular_common_locales_extra_en-KN_mjs"
	],
	"./extra/en-KY.mjs": [
		63762,
		"node_modules_angular_common_locales_extra_en-KY_mjs"
	],
	"./extra/en-LC.mjs": [
		16853,
		"node_modules_angular_common_locales_extra_en-LC_mjs"
	],
	"./extra/en-LR.mjs": [
		58452,
		"node_modules_angular_common_locales_extra_en-LR_mjs"
	],
	"./extra/en-LS.mjs": [
		14437,
		"node_modules_angular_common_locales_extra_en-LS_mjs"
	],
	"./extra/en-MG.mjs": [
		33898,
		"node_modules_angular_common_locales_extra_en-MG_mjs"
	],
	"./extra/en-MH.mjs": [
		26061,
		"node_modules_angular_common_locales_extra_en-MH_mjs"
	],
	"./extra/en-MO.mjs": [
		2578,
		"node_modules_angular_common_locales_extra_en-MO_mjs"
	],
	"./extra/en-MP.mjs": [
		69301,
		"node_modules_angular_common_locales_extra_en-MP_mjs"
	],
	"./extra/en-MS.mjs": [
		46454,
		"node_modules_angular_common_locales_extra_en-MS_mjs"
	],
	"./extra/en-MT.mjs": [
		62793,
		"node_modules_angular_common_locales_extra_en-MT_mjs"
	],
	"./extra/en-MU.mjs": [
		75080,
		"node_modules_angular_common_locales_extra_en-MU_mjs"
	],
	"./extra/en-MV.mjs": [
		35171,
		"node_modules_angular_common_locales_extra_en-MV_mjs"
	],
	"./extra/en-MW.mjs": [
		954,
		"node_modules_angular_common_locales_extra_en-MW_mjs"
	],
	"./extra/en-MY.mjs": [
		79468,
		"node_modules_angular_common_locales_extra_en-MY_mjs"
	],
	"./extra/en-NA.mjs": [
		10377,
		"node_modules_angular_common_locales_extra_en-NA_mjs"
	],
	"./extra/en-NF.mjs": [
		94038,
		"node_modules_angular_common_locales_extra_en-NF_mjs"
	],
	"./extra/en-NG.mjs": [
		64575,
		"node_modules_angular_common_locales_extra_en-NG_mjs"
	],
	"./extra/en-NL.mjs": [
		27052,
		"node_modules_angular_common_locales_extra_en-NL_mjs"
	],
	"./extra/en-NR.mjs": [
		65130,
		"node_modules_angular_common_locales_extra_en-NR_mjs"
	],
	"./extra/en-NU.mjs": [
		68933,
		"node_modules_angular_common_locales_extra_en-NU_mjs"
	],
	"./extra/en-NZ.mjs": [
		50162,
		"node_modules_angular_common_locales_extra_en-NZ_mjs"
	],
	"./extra/en-PG.mjs": [
		49301,
		"node_modules_angular_common_locales_extra_en-PG_mjs"
	],
	"./extra/en-PH.mjs": [
		50370,
		"node_modules_angular_common_locales_extra_en-PH_mjs"
	],
	"./extra/en-PK.mjs": [
		67377,
		"node_modules_angular_common_locales_extra_en-PK_mjs"
	],
	"./extra/en-PN.mjs": [
		40236,
		"node_modules_angular_common_locales_extra_en-PN_mjs"
	],
	"./extra/en-PR.mjs": [
		82968,
		"node_modules_angular_common_locales_extra_en-PR_mjs"
	],
	"./extra/en-PW.mjs": [
		63378,
		"node_modules_angular_common_locales_extra_en-PW_mjs"
	],
	"./extra/en-RW.mjs": [
		52619,
		"node_modules_angular_common_locales_extra_en-RW_mjs"
	],
	"./extra/en-SB.mjs": [
		37425,
		"node_modules_angular_common_locales_extra_en-SB_mjs"
	],
	"./extra/en-SC.mjs": [
		99984,
		"node_modules_angular_common_locales_extra_en-SC_mjs"
	],
	"./extra/en-SD.mjs": [
		14151,
		"node_modules_angular_common_locales_extra_en-SD_mjs"
	],
	"./extra/en-SE.mjs": [
		98590,
		"node_modules_angular_common_locales_extra_en-SE_mjs"
	],
	"./extra/en-SG.mjs": [
		60140,
		"node_modules_angular_common_locales_extra_en-SG_mjs"
	],
	"./extra/en-SH.mjs": [
		15843,
		"node_modules_angular_common_locales_extra_en-SH_mjs"
	],
	"./extra/en-SI.mjs": [
		81626,
		"node_modules_angular_common_locales_extra_en-SI_mjs"
	],
	"./extra/en-SL.mjs": [
		97663,
		"node_modules_angular_common_locales_extra_en-SL_mjs"
	],
	"./extra/en-SS.mjs": [
		8147,
		"node_modules_angular_common_locales_extra_en-SS_mjs"
	],
	"./extra/en-SX.mjs": [
		33459,
		"node_modules_angular_common_locales_extra_en-SX_mjs"
	],
	"./extra/en-SZ.mjs": [
		92633,
		"node_modules_angular_common_locales_extra_en-SZ_mjs"
	],
	"./extra/en-TC.mjs": [
		55581,
		"node_modules_angular_common_locales_extra_en-TC_mjs"
	],
	"./extra/en-TK.mjs": [
		59637,
		"node_modules_angular_common_locales_extra_en-TK_mjs"
	],
	"./extra/en-TO.mjs": [
		53129,
		"node_modules_angular_common_locales_extra_en-TO_mjs"
	],
	"./extra/en-TT.mjs": [
		92914,
		"node_modules_angular_common_locales_extra_en-TT_mjs"
	],
	"./extra/en-TV.mjs": [
		40192,
		"node_modules_angular_common_locales_extra_en-TV_mjs"
	],
	"./extra/en-TZ.mjs": [
		76052,
		"node_modules_angular_common_locales_extra_en-TZ_mjs"
	],
	"./extra/en-UG.mjs": [
		69874,
		"node_modules_angular_common_locales_extra_en-UG_mjs"
	],
	"./extra/en-UM.mjs": [
		95384,
		"node_modules_angular_common_locales_extra_en-UM_mjs"
	],
	"./extra/en-VC.mjs": [
		58091,
		"node_modules_angular_common_locales_extra_en-VC_mjs"
	],
	"./extra/en-VG.mjs": [
		20455,
		"node_modules_angular_common_locales_extra_en-VG_mjs"
	],
	"./extra/en-VI.mjs": [
		11849,
		"node_modules_angular_common_locales_extra_en-VI_mjs"
	],
	"./extra/en-VU.mjs": [
		36941,
		"node_modules_angular_common_locales_extra_en-VU_mjs"
	],
	"./extra/en-WS.mjs": [
		31140,
		"node_modules_angular_common_locales_extra_en-WS_mjs"
	],
	"./extra/en-ZA.mjs": [
		40309,
		"node_modules_angular_common_locales_extra_en-ZA_mjs"
	],
	"./extra/en-ZM.mjs": [
		27761,
		"node_modules_angular_common_locales_extra_en-ZM_mjs"
	],
	"./extra/en-ZW.mjs": [
		23795,
		"node_modules_angular_common_locales_extra_en-ZW_mjs"
	],
	"./extra/en.mjs": [
		18293,
		"node_modules_angular_common_locales_extra_en_mjs"
	],
	"./extra/eo.mjs": [
		14532,
		"node_modules_angular_common_locales_extra_eo_mjs"
	],
	"./extra/es-419.mjs": [
		67329,
		"node_modules_angular_common_locales_extra_es-419_mjs"
	],
	"./extra/es-AR.mjs": [
		52688,
		"node_modules_angular_common_locales_extra_es-AR_mjs"
	],
	"./extra/es-BO.mjs": [
		14540,
		"node_modules_angular_common_locales_extra_es-BO_mjs"
	],
	"./extra/es-BR.mjs": [
		42585,
		"node_modules_angular_common_locales_extra_es-BR_mjs"
	],
	"./extra/es-BZ.mjs": [
		41185,
		"node_modules_angular_common_locales_extra_es-BZ_mjs"
	],
	"./extra/es-CL.mjs": [
		98272,
		"node_modules_angular_common_locales_extra_es-CL_mjs"
	],
	"./extra/es-CO.mjs": [
		92827,
		"node_modules_angular_common_locales_extra_es-CO_mjs"
	],
	"./extra/es-CR.mjs": [
		76470,
		"node_modules_angular_common_locales_extra_es-CR_mjs"
	],
	"./extra/es-CU.mjs": [
		71241,
		"node_modules_angular_common_locales_extra_es-CU_mjs"
	],
	"./extra/es-DO.mjs": [
		74930,
		"node_modules_angular_common_locales_extra_es-DO_mjs"
	],
	"./extra/es-EA.mjs": [
		55839,
		"node_modules_angular_common_locales_extra_es-EA_mjs"
	],
	"./extra/es-EC.mjs": [
		8149,
		"node_modules_angular_common_locales_extra_es-EC_mjs"
	],
	"./extra/es-GQ.mjs": [
		92249,
		"node_modules_angular_common_locales_extra_es-GQ_mjs"
	],
	"./extra/es-GT.mjs": [
		93748,
		"node_modules_angular_common_locales_extra_es-GT_mjs"
	],
	"./extra/es-HN.mjs": [
		17191,
		"node_modules_angular_common_locales_extra_es-HN_mjs"
	],
	"./extra/es-IC.mjs": [
		50969,
		"node_modules_angular_common_locales_extra_es-IC_mjs"
	],
	"./extra/es-MX.mjs": [
		95798,
		"node_modules_angular_common_locales_extra_es-MX_mjs"
	],
	"./extra/es-NI.mjs": [
		35614,
		"node_modules_angular_common_locales_extra_es-NI_mjs"
	],
	"./extra/es-PA.mjs": [
		22336,
		"node_modules_angular_common_locales_extra_es-PA_mjs"
	],
	"./extra/es-PE.mjs": [
		8220,
		"node_modules_angular_common_locales_extra_es-PE_mjs"
	],
	"./extra/es-PH.mjs": [
		84441,
		"node_modules_angular_common_locales_extra_es-PH_mjs"
	],
	"./extra/es-PR.mjs": [
		15307,
		"node_modules_angular_common_locales_extra_es-PR_mjs"
	],
	"./extra/es-PY.mjs": [
		5032,
		"node_modules_angular_common_locales_extra_es-PY_mjs"
	],
	"./extra/es-SV.mjs": [
		95082,
		"node_modules_angular_common_locales_extra_es-SV_mjs"
	],
	"./extra/es-US.mjs": [
		83317,
		"node_modules_angular_common_locales_extra_es-US_mjs"
	],
	"./extra/es-UY.mjs": [
		93031,
		"node_modules_angular_common_locales_extra_es-UY_mjs"
	],
	"./extra/es-VE.mjs": [
		9938,
		"node_modules_angular_common_locales_extra_es-VE_mjs"
	],
	"./extra/es.mjs": [
		82016,
		"node_modules_angular_common_locales_extra_es_mjs"
	],
	"./extra/et.mjs": [
		35511,
		"node_modules_angular_common_locales_extra_et_mjs"
	],
	"./extra/eu.mjs": [
		37230,
		"node_modules_angular_common_locales_extra_eu_mjs"
	],
	"./extra/ewo.mjs": [
		8975,
		"node_modules_angular_common_locales_extra_ewo_mjs"
	],
	"./extra/fa-AF.mjs": [
		39653,
		"node_modules_angular_common_locales_extra_fa-AF_mjs"
	],
	"./extra/fa.mjs": [
		19139,
		"node_modules_angular_common_locales_extra_fa_mjs"
	],
	"./extra/ff-Adlm-BF.mjs": [
		1844,
		"node_modules_angular_common_locales_extra_ff-Adlm-BF_mjs"
	],
	"./extra/ff-Adlm-CM.mjs": [
		20799,
		"node_modules_angular_common_locales_extra_ff-Adlm-CM_mjs"
	],
	"./extra/ff-Adlm-GH.mjs": [
		1109,
		"node_modules_angular_common_locales_extra_ff-Adlm-GH_mjs"
	],
	"./extra/ff-Adlm-GM.mjs": [
		64360,
		"node_modules_angular_common_locales_extra_ff-Adlm-GM_mjs"
	],
	"./extra/ff-Adlm-GW.mjs": [
		57682,
		"node_modules_angular_common_locales_extra_ff-Adlm-GW_mjs"
	],
	"./extra/ff-Adlm-LR.mjs": [
		10762,
		"node_modules_angular_common_locales_extra_ff-Adlm-LR_mjs"
	],
	"./extra/ff-Adlm-MR.mjs": [
		32525,
		"node_modules_angular_common_locales_extra_ff-Adlm-MR_mjs"
	],
	"./extra/ff-Adlm-NE.mjs": [
		87939,
		"node_modules_angular_common_locales_extra_ff-Adlm-NE_mjs"
	],
	"./extra/ff-Adlm-NG.mjs": [
		42409,
		"node_modules_angular_common_locales_extra_ff-Adlm-NG_mjs"
	],
	"./extra/ff-Adlm-SL.mjs": [
		35213,
		"node_modules_angular_common_locales_extra_ff-Adlm-SL_mjs"
	],
	"./extra/ff-Adlm-SN.mjs": [
		72375,
		"node_modules_angular_common_locales_extra_ff-Adlm-SN_mjs"
	],
	"./extra/ff-Adlm.mjs": [
		31019,
		"node_modules_angular_common_locales_extra_ff-Adlm_mjs"
	],
	"./extra/ff-CM.mjs": [
		99661,
		"node_modules_angular_common_locales_extra_ff-CM_mjs"
	],
	"./extra/ff-GN.mjs": [
		65922,
		"node_modules_angular_common_locales_extra_ff-GN_mjs"
	],
	"./extra/ff-Latn-BF.mjs": [
		72331,
		"node_modules_angular_common_locales_extra_ff-Latn-BF_mjs"
	],
	"./extra/ff-Latn-CM.mjs": [
		84832,
		"node_modules_angular_common_locales_extra_ff-Latn-CM_mjs"
	],
	"./extra/ff-Latn-GH.mjs": [
		32754,
		"node_modules_angular_common_locales_extra_ff-Latn-GH_mjs"
	],
	"./extra/ff-Latn-GM.mjs": [
		19575,
		"node_modules_angular_common_locales_extra_ff-Latn-GM_mjs"
	],
	"./extra/ff-Latn-GN.mjs": [
		35292,
		"node_modules_angular_common_locales_extra_ff-Latn-GN_mjs"
	],
	"./extra/ff-Latn-GW.mjs": [
		99477,
		"node_modules_angular_common_locales_extra_ff-Latn-GW_mjs"
	],
	"./extra/ff-Latn-LR.mjs": [
		22137,
		"node_modules_angular_common_locales_extra_ff-Latn-LR_mjs"
	],
	"./extra/ff-Latn-MR.mjs": [
		13494,
		"node_modules_angular_common_locales_extra_ff-Latn-MR_mjs"
	],
	"./extra/ff-Latn-NE.mjs": [
		54092,
		"node_modules_angular_common_locales_extra_ff-Latn-NE_mjs"
	],
	"./extra/ff-Latn-NG.mjs": [
		7390,
		"node_modules_angular_common_locales_extra_ff-Latn-NG_mjs"
	],
	"./extra/ff-Latn-SL.mjs": [
		40954,
		"node_modules_angular_common_locales_extra_ff-Latn-SL_mjs"
	],
	"./extra/ff-Latn.mjs": [
		85314,
		"node_modules_angular_common_locales_extra_ff-Latn_mjs"
	],
	"./extra/ff-MR.mjs": [
		89112,
		"node_modules_angular_common_locales_extra_ff-MR_mjs"
	],
	"./extra/ff.mjs": [
		84132,
		"node_modules_angular_common_locales_extra_ff_mjs"
	],
	"./extra/fi.mjs": [
		7499,
		"node_modules_angular_common_locales_extra_fi_mjs"
	],
	"./extra/fil.mjs": [
		7981,
		"node_modules_angular_common_locales_extra_fil_mjs"
	],
	"./extra/fo-DK.mjs": [
		86621,
		"node_modules_angular_common_locales_extra_fo-DK_mjs"
	],
	"./extra/fo.mjs": [
		76061,
		"node_modules_angular_common_locales_extra_fo_mjs"
	],
	"./extra/fr-BE.mjs": [
		79278,
		"node_modules_angular_common_locales_extra_fr-BE_mjs"
	],
	"./extra/fr-BF.mjs": [
		49165,
		"node_modules_angular_common_locales_extra_fr-BF_mjs"
	],
	"./extra/fr-BI.mjs": [
		57002,
		"node_modules_angular_common_locales_extra_fr-BI_mjs"
	],
	"./extra/fr-BJ.mjs": [
		51417,
		"node_modules_angular_common_locales_extra_fr-BJ_mjs"
	],
	"./extra/fr-BL.mjs": [
		44879,
		"node_modules_angular_common_locales_extra_fr-BL_mjs"
	],
	"./extra/fr-CA.mjs": [
		98397,
		"node_modules_angular_common_locales_extra_fr-CA_mjs"
	],
	"./extra/fr-CD.mjs": [
		78640,
		"node_modules_angular_common_locales_extra_fr-CD_mjs"
	],
	"./extra/fr-CF.mjs": [
		47490,
		"node_modules_angular_common_locales_extra_fr-CF_mjs"
	],
	"./extra/fr-CG.mjs": [
		29835,
		"node_modules_angular_common_locales_extra_fr-CG_mjs"
	],
	"./extra/fr-CH.mjs": [
		6468,
		"node_modules_angular_common_locales_extra_fr-CH_mjs"
	],
	"./extra/fr-CI.mjs": [
		56309,
		"node_modules_angular_common_locales_extra_fr-CI_mjs"
	],
	"./extra/fr-CM.mjs": [
		30569,
		"node_modules_angular_common_locales_extra_fr-CM_mjs"
	],
	"./extra/fr-DJ.mjs": [
		13695,
		"node_modules_angular_common_locales_extra_fr-DJ_mjs"
	],
	"./extra/fr-DZ.mjs": [
		2127,
		"node_modules_angular_common_locales_extra_fr-DZ_mjs"
	],
	"./extra/fr-GA.mjs": [
		9345,
		"node_modules_angular_common_locales_extra_fr-GA_mjs"
	],
	"./extra/fr-GF.mjs": [
		69230,
		"node_modules_angular_common_locales_extra_fr-GF_mjs"
	],
	"./extra/fr-GN.mjs": [
		57190,
		"node_modules_angular_common_locales_extra_fr-GN_mjs"
	],
	"./extra/fr-GP.mjs": [
		88976,
		"node_modules_angular_common_locales_extra_fr-GP_mjs"
	],
	"./extra/fr-GQ.mjs": [
		51537,
		"node_modules_angular_common_locales_extra_fr-GQ_mjs"
	],
	"./extra/fr-HT.mjs": [
		80173,
		"node_modules_angular_common_locales_extra_fr-HT_mjs"
	],
	"./extra/fr-KM.mjs": [
		35905,
		"node_modules_angular_common_locales_extra_fr-KM_mjs"
	],
	"./extra/fr-LU.mjs": [
		85608,
		"node_modules_angular_common_locales_extra_fr-LU_mjs"
	],
	"./extra/fr-MA.mjs": [
		4031,
		"node_modules_angular_common_locales_extra_fr-MA_mjs"
	],
	"./extra/fr-MC.mjs": [
		39989,
		"node_modules_angular_common_locales_extra_fr-MC_mjs"
	],
	"./extra/fr-MF.mjs": [
		62120,
		"node_modules_angular_common_locales_extra_fr-MF_mjs"
	],
	"./extra/fr-MG.mjs": [
		49833,
		"node_modules_angular_common_locales_extra_fr-MG_mjs"
	],
	"./extra/fr-ML.mjs": [
		10434,
		"node_modules_angular_common_locales_extra_fr-ML_mjs"
	],
	"./extra/fr-MQ.mjs": [
		92463,
		"node_modules_angular_common_locales_extra_fr-MQ_mjs"
	],
	"./extra/fr-MR.mjs": [
		72756,
		"node_modules_angular_common_locales_extra_fr-MR_mjs"
	],
	"./extra/fr-MU.mjs": [
		39827,
		"node_modules_angular_common_locales_extra_fr-MU_mjs"
	],
	"./extra/fr-NC.mjs": [
		89356,
		"node_modules_angular_common_locales_extra_fr-NC_mjs"
	],
	"./extra/fr-NE.mjs": [
		99490,
		"node_modules_angular_common_locales_extra_fr-NE_mjs"
	],
	"./extra/fr-PF.mjs": [
		25551,
		"node_modules_angular_common_locales_extra_fr-PF_mjs"
	],
	"./extra/fr-PM.mjs": [
		25244,
		"node_modules_angular_common_locales_extra_fr-PM_mjs"
	],
	"./extra/fr-RE.mjs": [
		7006,
		"node_modules_angular_common_locales_extra_fr-RE_mjs"
	],
	"./extra/fr-RW.mjs": [
		70908,
		"node_modules_angular_common_locales_extra_fr-RW_mjs"
	],
	"./extra/fr-SC.mjs": [
		90935,
		"node_modules_angular_common_locales_extra_fr-SC_mjs"
	],
	"./extra/fr-SN.mjs": [
		3690,
		"node_modules_angular_common_locales_extra_fr-SN_mjs"
	],
	"./extra/fr-SY.mjs": [
		73717,
		"node_modules_angular_common_locales_extra_fr-SY_mjs"
	],
	"./extra/fr-TD.mjs": [
		82433,
		"node_modules_angular_common_locales_extra_fr-TD_mjs"
	],
	"./extra/fr-TG.mjs": [
		97746,
		"node_modules_angular_common_locales_extra_fr-TG_mjs"
	],
	"./extra/fr-TN.mjs": [
		52403,
		"node_modules_angular_common_locales_extra_fr-TN_mjs"
	],
	"./extra/fr-VU.mjs": [
		50234,
		"node_modules_angular_common_locales_extra_fr-VU_mjs"
	],
	"./extra/fr-WF.mjs": [
		48766,
		"node_modules_angular_common_locales_extra_fr-WF_mjs"
	],
	"./extra/fr-YT.mjs": [
		50286,
		"node_modules_angular_common_locales_extra_fr-YT_mjs"
	],
	"./extra/fr.mjs": [
		99704,
		"node_modules_angular_common_locales_extra_fr_mjs"
	],
	"./extra/fur.mjs": [
		70463,
		"node_modules_angular_common_locales_extra_fur_mjs"
	],
	"./extra/fy.mjs": [
		33371,
		"node_modules_angular_common_locales_extra_fy_mjs"
	],
	"./extra/ga-GB.mjs": [
		57138,
		"node_modules_angular_common_locales_extra_ga-GB_mjs"
	],
	"./extra/ga.mjs": [
		45816,
		"node_modules_angular_common_locales_extra_ga_mjs"
	],
	"./extra/gd.mjs": [
		3845,
		"node_modules_angular_common_locales_extra_gd_mjs"
	],
	"./extra/gl.mjs": [
		39181,
		"node_modules_angular_common_locales_extra_gl_mjs"
	],
	"./extra/gsw-FR.mjs": [
		40538,
		"node_modules_angular_common_locales_extra_gsw-FR_mjs"
	],
	"./extra/gsw-LI.mjs": [
		75519,
		"node_modules_angular_common_locales_extra_gsw-LI_mjs"
	],
	"./extra/gsw.mjs": [
		6810,
		"node_modules_angular_common_locales_extra_gsw_mjs"
	],
	"./extra/gu.mjs": [
		57924,
		"node_modules_angular_common_locales_extra_gu_mjs"
	],
	"./extra/guz.mjs": [
		50274,
		"node_modules_angular_common_locales_extra_guz_mjs"
	],
	"./extra/gv.mjs": [
		3935,
		"node_modules_angular_common_locales_extra_gv_mjs"
	],
	"./extra/ha-GH.mjs": [
		33091,
		"node_modules_angular_common_locales_extra_ha-GH_mjs"
	],
	"./extra/ha-NE.mjs": [
		51049,
		"node_modules_angular_common_locales_extra_ha-NE_mjs"
	],
	"./extra/ha.mjs": [
		67801,
		"node_modules_angular_common_locales_extra_ha_mjs"
	],
	"./extra/haw.mjs": [
		71156,
		"node_modules_angular_common_locales_extra_haw_mjs"
	],
	"./extra/he.mjs": [
		74309,
		"node_modules_angular_common_locales_extra_he_mjs"
	],
	"./extra/hi-Latn.mjs": [
		52737,
		"node_modules_angular_common_locales_extra_hi-Latn_mjs"
	],
	"./extra/hi.mjs": [
		89697,
		"node_modules_angular_common_locales_extra_hi_mjs"
	],
	"./extra/hr-BA.mjs": [
		26084,
		"node_modules_angular_common_locales_extra_hr-BA_mjs"
	],
	"./extra/hr.mjs": [
		37562,
		"node_modules_angular_common_locales_extra_hr_mjs"
	],
	"./extra/hsb.mjs": [
		44219,
		"node_modules_angular_common_locales_extra_hsb_mjs"
	],
	"./extra/hu.mjs": [
		76725,
		"node_modules_angular_common_locales_extra_hu_mjs"
	],
	"./extra/hy.mjs": [
		35441,
		"node_modules_angular_common_locales_extra_hy_mjs"
	],
	"./extra/ia.mjs": [
		41774,
		"node_modules_angular_common_locales_extra_ia_mjs"
	],
	"./extra/id.mjs": [
		13179,
		"node_modules_angular_common_locales_extra_id_mjs"
	],
	"./extra/ig.mjs": [
		51808,
		"node_modules_angular_common_locales_extra_ig_mjs"
	],
	"./extra/ii.mjs": [
		32070,
		"node_modules_angular_common_locales_extra_ii_mjs"
	],
	"./extra/is.mjs": [
		62188,
		"node_modules_angular_common_locales_extra_is_mjs"
	],
	"./extra/it-CH.mjs": [
		5905,
		"node_modules_angular_common_locales_extra_it-CH_mjs"
	],
	"./extra/it-SM.mjs": [
		76412,
		"node_modules_angular_common_locales_extra_it-SM_mjs"
	],
	"./extra/it-VA.mjs": [
		44871,
		"node_modules_angular_common_locales_extra_it-VA_mjs"
	],
	"./extra/it.mjs": [
		44779,
		"node_modules_angular_common_locales_extra_it_mjs"
	],
	"./extra/ja.mjs": [
		65295,
		"node_modules_angular_common_locales_extra_ja_mjs"
	],
	"./extra/jgo.mjs": [
		97004,
		"node_modules_angular_common_locales_extra_jgo_mjs"
	],
	"./extra/jmc.mjs": [
		74682,
		"node_modules_angular_common_locales_extra_jmc_mjs"
	],
	"./extra/jv.mjs": [
		34952,
		"node_modules_angular_common_locales_extra_jv_mjs"
	],
	"./extra/ka.mjs": [
		32356,
		"node_modules_angular_common_locales_extra_ka_mjs"
	],
	"./extra/kab.mjs": [
		73450,
		"node_modules_angular_common_locales_extra_kab_mjs"
	],
	"./extra/kam.mjs": [
		65613,
		"node_modules_angular_common_locales_extra_kam_mjs"
	],
	"./extra/kde.mjs": [
		47622,
		"node_modules_angular_common_locales_extra_kde_mjs"
	],
	"./extra/kea.mjs": [
		98517,
		"node_modules_angular_common_locales_extra_kea_mjs"
	],
	"./extra/kgp.mjs": [
		12978,
		"node_modules_angular_common_locales_extra_kgp_mjs"
	],
	"./extra/khq.mjs": [
		95670,
		"node_modules_angular_common_locales_extra_khq_mjs"
	],
	"./extra/ki.mjs": [
		70572,
		"node_modules_angular_common_locales_extra_ki_mjs"
	],
	"./extra/kk.mjs": [
		9022,
		"node_modules_angular_common_locales_extra_kk_mjs"
	],
	"./extra/kkj.mjs": [
		47268,
		"node_modules_angular_common_locales_extra_kkj_mjs"
	],
	"./extra/kl.mjs": [
		47857,
		"node_modules_angular_common_locales_extra_kl_mjs"
	],
	"./extra/kln.mjs": [
		8181,
		"node_modules_angular_common_locales_extra_kln_mjs"
	],
	"./extra/km.mjs": [
		10416,
		"node_modules_angular_common_locales_extra_km_mjs"
	],
	"./extra/kn.mjs": [
		26987,
		"node_modules_angular_common_locales_extra_kn_mjs"
	],
	"./extra/ko-KP.mjs": [
		44486,
		"node_modules_angular_common_locales_extra_ko-KP_mjs"
	],
	"./extra/ko.mjs": [
		30850,
		"node_modules_angular_common_locales_extra_ko_mjs"
	],
	"./extra/kok.mjs": [
		53553,
		"node_modules_angular_common_locales_extra_kok_mjs"
	],
	"./extra/ks-Arab.mjs": [
		30511,
		"node_modules_angular_common_locales_extra_ks-Arab_mjs"
	],
	"./extra/ks-Deva.mjs": [
		32521,
		"node_modules_angular_common_locales_extra_ks-Deva_mjs"
	],
	"./extra/ks.mjs": [
		67302,
		"node_modules_angular_common_locales_extra_ks_mjs"
	],
	"./extra/ksb.mjs": [
		83140,
		"node_modules_angular_common_locales_extra_ksb_mjs"
	],
	"./extra/ksf.mjs": [
		84904,
		"node_modules_angular_common_locales_extra_ksf_mjs"
	],
	"./extra/ksh.mjs": [
		6782,
		"node_modules_angular_common_locales_extra_ksh_mjs"
	],
	"./extra/ku.mjs": [
		89624,
		"node_modules_angular_common_locales_extra_ku_mjs"
	],
	"./extra/kw.mjs": [
		25002,
		"node_modules_angular_common_locales_extra_kw_mjs"
	],
	"./extra/ky.mjs": [
		12572,
		"node_modules_angular_common_locales_extra_ky_mjs"
	],
	"./extra/lag.mjs": [
		52704,
		"node_modules_angular_common_locales_extra_lag_mjs"
	],
	"./extra/lb.mjs": [
		50550,
		"node_modules_angular_common_locales_extra_lb_mjs"
	],
	"./extra/lg.mjs": [
		39875,
		"node_modules_angular_common_locales_extra_lg_mjs"
	],
	"./extra/lkt.mjs": [
		15569,
		"node_modules_angular_common_locales_extra_lkt_mjs"
	],
	"./extra/ln-AO.mjs": [
		69935,
		"node_modules_angular_common_locales_extra_ln-AO_mjs"
	],
	"./extra/ln-CF.mjs": [
		96,
		"node_modules_angular_common_locales_extra_ln-CF_mjs"
	],
	"./extra/ln-CG.mjs": [
		95425,
		"node_modules_angular_common_locales_extra_ln-CG_mjs"
	],
	"./extra/ln.mjs": [
		76514,
		"node_modules_angular_common_locales_extra_ln_mjs"
	],
	"./extra/lo.mjs": [
		75211,
		"node_modules_angular_common_locales_extra_lo_mjs"
	],
	"./extra/lrc-IQ.mjs": [
		59392,
		"node_modules_angular_common_locales_extra_lrc-IQ_mjs"
	],
	"./extra/lrc.mjs": [
		96309,
		"node_modules_angular_common_locales_extra_lrc_mjs"
	],
	"./extra/lt.mjs": [
		43736,
		"node_modules_angular_common_locales_extra_lt_mjs"
	],
	"./extra/lu.mjs": [
		69081,
		"node_modules_angular_common_locales_extra_lu_mjs"
	],
	"./extra/luo.mjs": [
		96812,
		"node_modules_angular_common_locales_extra_luo_mjs"
	],
	"./extra/luy.mjs": [
		19922,
		"node_modules_angular_common_locales_extra_luy_mjs"
	],
	"./extra/lv.mjs": [
		38602,
		"node_modules_angular_common_locales_extra_lv_mjs"
	],
	"./extra/mai.mjs": [
		84115,
		"node_modules_angular_common_locales_extra_mai_mjs"
	],
	"./extra/mas-TZ.mjs": [
		92056,
		"node_modules_angular_common_locales_extra_mas-TZ_mjs"
	],
	"./extra/mas.mjs": [
		88081,
		"node_modules_angular_common_locales_extra_mas_mjs"
	],
	"./extra/mer.mjs": [
		47028,
		"node_modules_angular_common_locales_extra_mer_mjs"
	],
	"./extra/mfe.mjs": [
		73986,
		"node_modules_angular_common_locales_extra_mfe_mjs"
	],
	"./extra/mg.mjs": [
		35924,
		"node_modules_angular_common_locales_extra_mg_mjs"
	],
	"./extra/mgh.mjs": [
		20848,
		"node_modules_angular_common_locales_extra_mgh_mjs"
	],
	"./extra/mgo.mjs": [
		81991,
		"node_modules_angular_common_locales_extra_mgo_mjs"
	],
	"./extra/mi.mjs": [
		52786,
		"node_modules_angular_common_locales_extra_mi_mjs"
	],
	"./extra/mk.mjs": [
		64,
		"node_modules_angular_common_locales_extra_mk_mjs"
	],
	"./extra/ml.mjs": [
		39607,
		"node_modules_angular_common_locales_extra_ml_mjs"
	],
	"./extra/mn.mjs": [
		82298,
		"node_modules_angular_common_locales_extra_mn_mjs"
	],
	"./extra/mni-Beng.mjs": [
		41665,
		"node_modules_angular_common_locales_extra_mni-Beng_mjs"
	],
	"./extra/mni.mjs": [
		17214,
		"node_modules_angular_common_locales_extra_mni_mjs"
	],
	"./extra/mr.mjs": [
		13001,
		"node_modules_angular_common_locales_extra_mr_mjs"
	],
	"./extra/ms-BN.mjs": [
		62709,
		"node_modules_angular_common_locales_extra_ms-BN_mjs"
	],
	"./extra/ms-ID.mjs": [
		26814,
		"node_modules_angular_common_locales_extra_ms-ID_mjs"
	],
	"./extra/ms-SG.mjs": [
		71243,
		"node_modules_angular_common_locales_extra_ms-SG_mjs"
	],
	"./extra/ms.mjs": [
		25288,
		"node_modules_angular_common_locales_extra_ms_mjs"
	],
	"./extra/mt.mjs": [
		67199,
		"node_modules_angular_common_locales_extra_mt_mjs"
	],
	"./extra/mua.mjs": [
		33359,
		"node_modules_angular_common_locales_extra_mua_mjs"
	],
	"./extra/my.mjs": [
		73602,
		"node_modules_angular_common_locales_extra_my_mjs"
	],
	"./extra/mzn.mjs": [
		80629,
		"node_modules_angular_common_locales_extra_mzn_mjs"
	],
	"./extra/naq.mjs": [
		31752,
		"node_modules_angular_common_locales_extra_naq_mjs"
	],
	"./extra/nb-SJ.mjs": [
		11310,
		"node_modules_angular_common_locales_extra_nb-SJ_mjs"
	],
	"./extra/nb.mjs": [
		92144,
		"node_modules_angular_common_locales_extra_nb_mjs"
	],
	"./extra/nd.mjs": [
		78846,
		"node_modules_angular_common_locales_extra_nd_mjs"
	],
	"./extra/nds-NL.mjs": [
		16356,
		"node_modules_angular_common_locales_extra_nds-NL_mjs"
	],
	"./extra/nds.mjs": [
		95309,
		"node_modules_angular_common_locales_extra_nds_mjs"
	],
	"./extra/ne-IN.mjs": [
		33137,
		"node_modules_angular_common_locales_extra_ne-IN_mjs"
	],
	"./extra/ne.mjs": [
		36935,
		"node_modules_angular_common_locales_extra_ne_mjs"
	],
	"./extra/nl-AW.mjs": [
		72403,
		"node_modules_angular_common_locales_extra_nl-AW_mjs"
	],
	"./extra/nl-BE.mjs": [
		77148,
		"node_modules_angular_common_locales_extra_nl-BE_mjs"
	],
	"./extra/nl-BQ.mjs": [
		74992,
		"node_modules_angular_common_locales_extra_nl-BQ_mjs"
	],
	"./extra/nl-CW.mjs": [
		6061,
		"node_modules_angular_common_locales_extra_nl-CW_mjs"
	],
	"./extra/nl-SR.mjs": [
		33296,
		"node_modules_angular_common_locales_extra_nl-SR_mjs"
	],
	"./extra/nl-SX.mjs": [
		91642,
		"node_modules_angular_common_locales_extra_nl-SX_mjs"
	],
	"./extra/nl.mjs": [
		438,
		"node_modules_angular_common_locales_extra_nl_mjs"
	],
	"./extra/nmg.mjs": [
		53626,
		"node_modules_angular_common_locales_extra_nmg_mjs"
	],
	"./extra/nn.mjs": [
		48260,
		"node_modules_angular_common_locales_extra_nn_mjs"
	],
	"./extra/nnh.mjs": [
		67872,
		"node_modules_angular_common_locales_extra_nnh_mjs"
	],
	"./extra/no.mjs": [
		18837,
		"node_modules_angular_common_locales_extra_no_mjs"
	],
	"./extra/nus.mjs": [
		82286,
		"node_modules_angular_common_locales_extra_nus_mjs"
	],
	"./extra/nyn.mjs": [
		29663,
		"node_modules_angular_common_locales_extra_nyn_mjs"
	],
	"./extra/om-KE.mjs": [
		71405,
		"node_modules_angular_common_locales_extra_om-KE_mjs"
	],
	"./extra/om.mjs": [
		91252,
		"node_modules_angular_common_locales_extra_om_mjs"
	],
	"./extra/or.mjs": [
		27627,
		"node_modules_angular_common_locales_extra_or_mjs"
	],
	"./extra/os-RU.mjs": [
		94608,
		"node_modules_angular_common_locales_extra_os-RU_mjs"
	],
	"./extra/os.mjs": [
		28930,
		"node_modules_angular_common_locales_extra_os_mjs"
	],
	"./extra/pa-Arab.mjs": [
		50330,
		"node_modules_angular_common_locales_extra_pa-Arab_mjs"
	],
	"./extra/pa-Guru.mjs": [
		22933,
		"node_modules_angular_common_locales_extra_pa-Guru_mjs"
	],
	"./extra/pa.mjs": [
		6337,
		"node_modules_angular_common_locales_extra_pa_mjs"
	],
	"./extra/pcm.mjs": [
		34124,
		"node_modules_angular_common_locales_extra_pcm_mjs"
	],
	"./extra/pl.mjs": [
		77492,
		"node_modules_angular_common_locales_extra_pl_mjs"
	],
	"./extra/ps-PK.mjs": [
		175,
		"node_modules_angular_common_locales_extra_ps-PK_mjs"
	],
	"./extra/ps.mjs": [
		13867,
		"node_modules_angular_common_locales_extra_ps_mjs"
	],
	"./extra/pt-AO.mjs": [
		12345,
		"node_modules_angular_common_locales_extra_pt-AO_mjs"
	],
	"./extra/pt-CH.mjs": [
		36664,
		"node_modules_angular_common_locales_extra_pt-CH_mjs"
	],
	"./extra/pt-CV.mjs": [
		87262,
		"node_modules_angular_common_locales_extra_pt-CV_mjs"
	],
	"./extra/pt-GQ.mjs": [
		41101,
		"node_modules_angular_common_locales_extra_pt-GQ_mjs"
	],
	"./extra/pt-GW.mjs": [
		6971,
		"node_modules_angular_common_locales_extra_pt-GW_mjs"
	],
	"./extra/pt-LU.mjs": [
		70812,
		"node_modules_angular_common_locales_extra_pt-LU_mjs"
	],
	"./extra/pt-MO.mjs": [
		47909,
		"node_modules_angular_common_locales_extra_pt-MO_mjs"
	],
	"./extra/pt-MZ.mjs": [
		2248,
		"node_modules_angular_common_locales_extra_pt-MZ_mjs"
	],
	"./extra/pt-PT.mjs": [
		10513,
		"node_modules_angular_common_locales_extra_pt-PT_mjs"
	],
	"./extra/pt-ST.mjs": [
		22812,
		"node_modules_angular_common_locales_extra_pt-ST_mjs"
	],
	"./extra/pt-TL.mjs": [
		97453,
		"node_modules_angular_common_locales_extra_pt-TL_mjs"
	],
	"./extra/pt.mjs": [
		79692,
		"node_modules_angular_common_locales_extra_pt_mjs"
	],
	"./extra/qu-BO.mjs": [
		57042,
		"node_modules_angular_common_locales_extra_qu-BO_mjs"
	],
	"./extra/qu-EC.mjs": [
		18351,
		"node_modules_angular_common_locales_extra_qu-EC_mjs"
	],
	"./extra/qu.mjs": [
		24842,
		"node_modules_angular_common_locales_extra_qu_mjs"
	],
	"./extra/rm.mjs": [
		68723,
		"node_modules_angular_common_locales_extra_rm_mjs"
	],
	"./extra/rn.mjs": [
		74808,
		"node_modules_angular_common_locales_extra_rn_mjs"
	],
	"./extra/ro-MD.mjs": [
		88237,
		"node_modules_angular_common_locales_extra_ro-MD_mjs"
	],
	"./extra/ro.mjs": [
		153,
		"node_modules_angular_common_locales_extra_ro_mjs"
	],
	"./extra/rof.mjs": [
		91573,
		"node_modules_angular_common_locales_extra_rof_mjs"
	],
	"./extra/ru-BY.mjs": [
		81963,
		"node_modules_angular_common_locales_extra_ru-BY_mjs"
	],
	"./extra/ru-KG.mjs": [
		39646,
		"node_modules_angular_common_locales_extra_ru-KG_mjs"
	],
	"./extra/ru-KZ.mjs": [
		25043,
		"node_modules_angular_common_locales_extra_ru-KZ_mjs"
	],
	"./extra/ru-MD.mjs": [
		72299,
		"node_modules_angular_common_locales_extra_ru-MD_mjs"
	],
	"./extra/ru-UA.mjs": [
		3590,
		"node_modules_angular_common_locales_extra_ru-UA_mjs"
	],
	"./extra/ru.mjs": [
		53400,
		"node_modules_angular_common_locales_extra_ru_mjs"
	],
	"./extra/rw.mjs": [
		75569,
		"node_modules_angular_common_locales_extra_rw_mjs"
	],
	"./extra/rwk.mjs": [
		98568,
		"node_modules_angular_common_locales_extra_rwk_mjs"
	],
	"./extra/sa.mjs": [
		96012,
		"node_modules_angular_common_locales_extra_sa_mjs"
	],
	"./extra/sah.mjs": [
		67592,
		"node_modules_angular_common_locales_extra_sah_mjs"
	],
	"./extra/saq.mjs": [
		12289,
		"node_modules_angular_common_locales_extra_saq_mjs"
	],
	"./extra/sat-Olck.mjs": [
		86710,
		"node_modules_angular_common_locales_extra_sat-Olck_mjs"
	],
	"./extra/sat.mjs": [
		88572,
		"node_modules_angular_common_locales_extra_sat_mjs"
	],
	"./extra/sbp.mjs": [
		10173,
		"node_modules_angular_common_locales_extra_sbp_mjs"
	],
	"./extra/sc.mjs": [
		42705,
		"node_modules_angular_common_locales_extra_sc_mjs"
	],
	"./extra/sd-Arab.mjs": [
		52554,
		"node_modules_angular_common_locales_extra_sd-Arab_mjs"
	],
	"./extra/sd-Deva.mjs": [
		40968,
		"node_modules_angular_common_locales_extra_sd-Deva_mjs"
	],
	"./extra/sd.mjs": [
		23153,
		"node_modules_angular_common_locales_extra_sd_mjs"
	],
	"./extra/se-FI.mjs": [
		95558,
		"node_modules_angular_common_locales_extra_se-FI_mjs"
	],
	"./extra/se-SE.mjs": [
		44313,
		"node_modules_angular_common_locales_extra_se-SE_mjs"
	],
	"./extra/se.mjs": [
		78384,
		"node_modules_angular_common_locales_extra_se_mjs"
	],
	"./extra/seh.mjs": [
		10932,
		"node_modules_angular_common_locales_extra_seh_mjs"
	],
	"./extra/ses.mjs": [
		58695,
		"node_modules_angular_common_locales_extra_ses_mjs"
	],
	"./extra/sg.mjs": [
		89794,
		"node_modules_angular_common_locales_extra_sg_mjs"
	],
	"./extra/shi-Latn.mjs": [
		99460,
		"node_modules_angular_common_locales_extra_shi-Latn_mjs"
	],
	"./extra/shi-Tfng.mjs": [
		22864,
		"node_modules_angular_common_locales_extra_shi-Tfng_mjs"
	],
	"./extra/shi.mjs": [
		49638,
		"node_modules_angular_common_locales_extra_shi_mjs"
	],
	"./extra/si.mjs": [
		34500,
		"node_modules_angular_common_locales_extra_si_mjs"
	],
	"./extra/sk.mjs": [
		86678,
		"node_modules_angular_common_locales_extra_sk_mjs"
	],
	"./extra/sl.mjs": [
		56041,
		"node_modules_angular_common_locales_extra_sl_mjs"
	],
	"./extra/smn.mjs": [
		2882,
		"node_modules_angular_common_locales_extra_smn_mjs"
	],
	"./extra/sn.mjs": [
		1571,
		"node_modules_angular_common_locales_extra_sn_mjs"
	],
	"./extra/so-DJ.mjs": [
		95681,
		"node_modules_angular_common_locales_extra_so-DJ_mjs"
	],
	"./extra/so-ET.mjs": [
		99384,
		"node_modules_angular_common_locales_extra_so-ET_mjs"
	],
	"./extra/so-KE.mjs": [
		74923,
		"node_modules_angular_common_locales_extra_so-KE_mjs"
	],
	"./extra/so.mjs": [
		36730,
		"node_modules_angular_common_locales_extra_so_mjs"
	],
	"./extra/sq-MK.mjs": [
		55561,
		"node_modules_angular_common_locales_extra_sq-MK_mjs"
	],
	"./extra/sq-XK.mjs": [
		58222,
		"node_modules_angular_common_locales_extra_sq-XK_mjs"
	],
	"./extra/sq.mjs": [
		87868,
		"node_modules_angular_common_locales_extra_sq_mjs"
	],
	"./extra/sr-Cyrl-BA.mjs": [
		62888,
		"node_modules_angular_common_locales_extra_sr-Cyrl-BA_mjs"
	],
	"./extra/sr-Cyrl-ME.mjs": [
		31061,
		"node_modules_angular_common_locales_extra_sr-Cyrl-ME_mjs"
	],
	"./extra/sr-Cyrl-XK.mjs": [
		3840,
		"node_modules_angular_common_locales_extra_sr-Cyrl-XK_mjs"
	],
	"./extra/sr-Cyrl.mjs": [
		82686,
		"node_modules_angular_common_locales_extra_sr-Cyrl_mjs"
	],
	"./extra/sr-Latn-BA.mjs": [
		89495,
		"node_modules_angular_common_locales_extra_sr-Latn-BA_mjs"
	],
	"./extra/sr-Latn-ME.mjs": [
		51510,
		"node_modules_angular_common_locales_extra_sr-Latn-ME_mjs"
	],
	"./extra/sr-Latn-XK.mjs": [
		87131,
		"node_modules_angular_common_locales_extra_sr-Latn-XK_mjs"
	],
	"./extra/sr-Latn.mjs": [
		38463,
		"node_modules_angular_common_locales_extra_sr-Latn_mjs"
	],
	"./extra/sr.mjs": [
		52919,
		"node_modules_angular_common_locales_extra_sr_mjs"
	],
	"./extra/su-Latn.mjs": [
		75654,
		"node_modules_angular_common_locales_extra_su-Latn_mjs"
	],
	"./extra/su.mjs": [
		85632,
		"node_modules_angular_common_locales_extra_su_mjs"
	],
	"./extra/sv-AX.mjs": [
		51603,
		"node_modules_angular_common_locales_extra_sv-AX_mjs"
	],
	"./extra/sv-FI.mjs": [
		25471,
		"node_modules_angular_common_locales_extra_sv-FI_mjs"
	],
	"./extra/sv.mjs": [
		47003,
		"node_modules_angular_common_locales_extra_sv_mjs"
	],
	"./extra/sw-CD.mjs": [
		48258,
		"node_modules_angular_common_locales_extra_sw-CD_mjs"
	],
	"./extra/sw-KE.mjs": [
		32563,
		"node_modules_angular_common_locales_extra_sw-KE_mjs"
	],
	"./extra/sw-UG.mjs": [
		65003,
		"node_modules_angular_common_locales_extra_sw-UG_mjs"
	],
	"./extra/sw.mjs": [
		61650,
		"node_modules_angular_common_locales_extra_sw_mjs"
	],
	"./extra/ta-LK.mjs": [
		58501,
		"node_modules_angular_common_locales_extra_ta-LK_mjs"
	],
	"./extra/ta-MY.mjs": [
		66452,
		"node_modules_angular_common_locales_extra_ta-MY_mjs"
	],
	"./extra/ta-SG.mjs": [
		53140,
		"node_modules_angular_common_locales_extra_ta-SG_mjs"
	],
	"./extra/ta.mjs": [
		95389,
		"node_modules_angular_common_locales_extra_ta_mjs"
	],
	"./extra/te.mjs": [
		95665,
		"node_modules_angular_common_locales_extra_te_mjs"
	],
	"./extra/teo-KE.mjs": [
		15933,
		"node_modules_angular_common_locales_extra_teo-KE_mjs"
	],
	"./extra/teo.mjs": [
		7108,
		"node_modules_angular_common_locales_extra_teo_mjs"
	],
	"./extra/tg.mjs": [
		26827,
		"node_modules_angular_common_locales_extra_tg_mjs"
	],
	"./extra/th.mjs": [
		3460,
		"node_modules_angular_common_locales_extra_th_mjs"
	],
	"./extra/ti-ER.mjs": [
		1815,
		"node_modules_angular_common_locales_extra_ti-ER_mjs"
	],
	"./extra/ti.mjs": [
		53301,
		"node_modules_angular_common_locales_extra_ti_mjs"
	],
	"./extra/tk.mjs": [
		28735,
		"node_modules_angular_common_locales_extra_tk_mjs"
	],
	"./extra/to.mjs": [
		38467,
		"node_modules_angular_common_locales_extra_to_mjs"
	],
	"./extra/tr-CY.mjs": [
		44187,
		"node_modules_angular_common_locales_extra_tr-CY_mjs"
	],
	"./extra/tr.mjs": [
		29710,
		"node_modules_angular_common_locales_extra_tr_mjs"
	],
	"./extra/tt.mjs": [
		70944,
		"node_modules_angular_common_locales_extra_tt_mjs"
	],
	"./extra/twq.mjs": [
		58776,
		"node_modules_angular_common_locales_extra_twq_mjs"
	],
	"./extra/tzm.mjs": [
		61515,
		"node_modules_angular_common_locales_extra_tzm_mjs"
	],
	"./extra/ug.mjs": [
		30620,
		"node_modules_angular_common_locales_extra_ug_mjs"
	],
	"./extra/uk.mjs": [
		65144,
		"node_modules_angular_common_locales_extra_uk_mjs"
	],
	"./extra/und.mjs": [
		71307,
		"node_modules_angular_common_locales_extra_und_mjs"
	],
	"./extra/ur-IN.mjs": [
		31843,
		"node_modules_angular_common_locales_extra_ur-IN_mjs"
	],
	"./extra/ur.mjs": [
		65905,
		"node_modules_angular_common_locales_extra_ur_mjs"
	],
	"./extra/uz-Arab.mjs": [
		38786,
		"node_modules_angular_common_locales_extra_uz-Arab_mjs"
	],
	"./extra/uz-Cyrl.mjs": [
		37348,
		"node_modules_angular_common_locales_extra_uz-Cyrl_mjs"
	],
	"./extra/uz-Latn.mjs": [
		1289,
		"node_modules_angular_common_locales_extra_uz-Latn_mjs"
	],
	"./extra/uz.mjs": [
		98793,
		"node_modules_angular_common_locales_extra_uz_mjs"
	],
	"./extra/vai-Latn.mjs": [
		97422,
		"node_modules_angular_common_locales_extra_vai-Latn_mjs"
	],
	"./extra/vai-Vaii.mjs": [
		59652,
		"node_modules_angular_common_locales_extra_vai-Vaii_mjs"
	],
	"./extra/vai.mjs": [
		67208,
		"node_modules_angular_common_locales_extra_vai_mjs"
	],
	"./extra/vi.mjs": [
		31323,
		"node_modules_angular_common_locales_extra_vi_mjs"
	],
	"./extra/vun.mjs": [
		50219,
		"node_modules_angular_common_locales_extra_vun_mjs"
	],
	"./extra/wae.mjs": [
		809,
		"node_modules_angular_common_locales_extra_wae_mjs"
	],
	"./extra/wo.mjs": [
		85598,
		"node_modules_angular_common_locales_extra_wo_mjs"
	],
	"./extra/xh.mjs": [
		23888,
		"node_modules_angular_common_locales_extra_xh_mjs"
	],
	"./extra/xog.mjs": [
		89042,
		"node_modules_angular_common_locales_extra_xog_mjs"
	],
	"./extra/yav.mjs": [
		22176,
		"node_modules_angular_common_locales_extra_yav_mjs"
	],
	"./extra/yi.mjs": [
		73238,
		"node_modules_angular_common_locales_extra_yi_mjs"
	],
	"./extra/yo-BJ.mjs": [
		39913,
		"node_modules_angular_common_locales_extra_yo-BJ_mjs"
	],
	"./extra/yo.mjs": [
		1864,
		"node_modules_angular_common_locales_extra_yo_mjs"
	],
	"./extra/yrl-CO.mjs": [
		20318,
		"node_modules_angular_common_locales_extra_yrl-CO_mjs"
	],
	"./extra/yrl-VE.mjs": [
		94635,
		"node_modules_angular_common_locales_extra_yrl-VE_mjs"
	],
	"./extra/yrl.mjs": [
		82059,
		"node_modules_angular_common_locales_extra_yrl_mjs"
	],
	"./extra/yue-Hans.mjs": [
		76228,
		"node_modules_angular_common_locales_extra_yue-Hans_mjs"
	],
	"./extra/yue-Hant.mjs": [
		11235,
		"node_modules_angular_common_locales_extra_yue-Hant_mjs"
	],
	"./extra/yue.mjs": [
		61263,
		"node_modules_angular_common_locales_extra_yue_mjs"
	],
	"./extra/zgh.mjs": [
		86267,
		"node_modules_angular_common_locales_extra_zgh_mjs"
	],
	"./extra/zh-Hans-HK.mjs": [
		87695,
		"node_modules_angular_common_locales_extra_zh-Hans-HK_mjs"
	],
	"./extra/zh-Hans-MO.mjs": [
		51840,
		"node_modules_angular_common_locales_extra_zh-Hans-MO_mjs"
	],
	"./extra/zh-Hans-SG.mjs": [
		31070,
		"node_modules_angular_common_locales_extra_zh-Hans-SG_mjs"
	],
	"./extra/zh-Hans.mjs": [
		80195,
		"node_modules_angular_common_locales_extra_zh-Hans_mjs"
	],
	"./extra/zh-Hant-HK.mjs": [
		37702,
		"node_modules_angular_common_locales_extra_zh-Hant-HK_mjs"
	],
	"./extra/zh-Hant-MO.mjs": [
		37162,
		"node_modules_angular_common_locales_extra_zh-Hant-MO_mjs"
	],
	"./extra/zh-Hant.mjs": [
		45188,
		"node_modules_angular_common_locales_extra_zh-Hant_mjs"
	],
	"./extra/zh.mjs": [
		55422,
		"node_modules_angular_common_locales_extra_zh_mjs"
	],
	"./extra/zu.mjs": [
		6643,
		"node_modules_angular_common_locales_extra_zu_mjs"
	],
	"./fa-AF.mjs": [
		57626,
		"node_modules_angular_common_locales_fa-AF_mjs"
	],
	"./fa.mjs": [
		70774,
		"node_modules_angular_common_locales_fa_mjs"
	],
	"./ff-Adlm-BF.mjs": [
		49893,
		"node_modules_angular_common_locales_ff-Adlm-BF_mjs"
	],
	"./ff-Adlm-CM.mjs": [
		86097,
		"node_modules_angular_common_locales_ff-Adlm-CM_mjs"
	],
	"./ff-Adlm-GH.mjs": [
		42560,
		"node_modules_angular_common_locales_ff-Adlm-GH_mjs"
	],
	"./ff-Adlm-GM.mjs": [
		18765,
		"node_modules_angular_common_locales_ff-Adlm-GM_mjs"
	],
	"./ff-Adlm-GW.mjs": [
		26047,
		"node_modules_angular_common_locales_ff-Adlm-GW_mjs"
	],
	"./ff-Adlm-LR.mjs": [
		81351,
		"node_modules_angular_common_locales_ff-Adlm-LR_mjs"
	],
	"./ff-Adlm-MR.mjs": [
		53788,
		"node_modules_angular_common_locales_ff-Adlm-MR_mjs"
	],
	"./ff-Adlm-NE.mjs": [
		36266,
		"node_modules_angular_common_locales_ff-Adlm-NE_mjs"
	],
	"./ff-Adlm-NG.mjs": [
		888,
		"node_modules_angular_common_locales_ff-Adlm-NG_mjs"
	],
	"./ff-Adlm-SL.mjs": [
		76928,
		"node_modules_angular_common_locales_ff-Adlm-SL_mjs"
	],
	"./ff-Adlm-SN.mjs": [
		55506,
		"node_modules_angular_common_locales_ff-Adlm-SN_mjs"
	],
	"./ff-Adlm.mjs": [
		62672,
		"node_modules_angular_common_locales_ff-Adlm_mjs"
	],
	"./ff-CM.mjs": [
		51170,
		"node_modules_angular_common_locales_ff-CM_mjs"
	],
	"./ff-GN.mjs": [
		21029,
		"node_modules_angular_common_locales_ff-GN_mjs"
	],
	"./ff-Latn-BF.mjs": [
		34222,
		"node_modules_angular_common_locales_ff-Latn-BF_mjs"
	],
	"./ff-Latn-CM.mjs": [
		30754,
		"node_modules_angular_common_locales_ff-Latn-CM_mjs"
	],
	"./ff-Latn-GH.mjs": [
		57235,
		"node_modules_angular_common_locales_ff-Latn-GH_mjs"
	],
	"./ff-Latn-GM.mjs": [
		64294,
		"node_modules_angular_common_locales_ff-Latn-GM_mjs"
	],
	"./ff-Latn-GN.mjs": [
		25797,
		"node_modules_angular_common_locales_ff-Latn-GN_mjs"
	],
	"./ff-Latn-GW.mjs": [
		83916,
		"node_modules_angular_common_locales_ff-Latn-GW_mjs"
	],
	"./ff-Latn-LR.mjs": [
		86384,
		"node_modules_angular_common_locales_ff-Latn-LR_mjs"
	],
	"./ff-Latn-MR.mjs": [
		11035,
		"node_modules_angular_common_locales_ff-Latn-MR_mjs"
	],
	"./ff-Latn-NE.mjs": [
		6745,
		"node_modules_angular_common_locales_ff-Latn-NE_mjs"
	],
	"./ff-Latn-NG.mjs": [
		47571,
		"node_modules_angular_common_locales_ff-Latn-NG_mjs"
	],
	"./ff-Latn-SL.mjs": [
		53787,
		"node_modules_angular_common_locales_ff-Latn-SL_mjs"
	],
	"./ff-Latn.mjs": [
		72873,
		"node_modules_angular_common_locales_ff-Latn_mjs"
	],
	"./ff-MR.mjs": [
		71419,
		"node_modules_angular_common_locales_ff-MR_mjs"
	],
	"./ff.mjs": [
		87113,
		"node_modules_angular_common_locales_ff_mjs"
	],
	"./fi.mjs": [
		25886,
		"node_modules_angular_common_locales_fi_mjs"
	],
	"./fil.mjs": [
		67066,
		"node_modules_angular_common_locales_fil_mjs"
	],
	"./fo-DK.mjs": [
		3166,
		"node_modules_angular_common_locales_fo-DK_mjs"
	],
	"./fo.mjs": [
		27280,
		"node_modules_angular_common_locales_fo_mjs"
	],
	"./fr-BE.mjs": [
		59329,
		"node_modules_angular_common_locales_fr-BE_mjs"
	],
	"./fr-BF.mjs": [
		55794,
		"node_modules_angular_common_locales_fr-BF_mjs"
	],
	"./fr-BI.mjs": [
		74565,
		"node_modules_angular_common_locales_fr-BI_mjs"
	],
	"./fr-BJ.mjs": [
		29414,
		"node_modules_angular_common_locales_fr-BJ_mjs"
	],
	"./fr-BL.mjs": [
		51736,
		"node_modules_angular_common_locales_fr-BL_mjs"
	],
	"./fr-CA.mjs": [
		24194,
		"node_modules_angular_common_locales_fr-CA_mjs"
	],
	"./fr-CD.mjs": [
		34279,
		"node_modules_angular_common_locales_fr-CD_mjs"
	],
	"./fr-CF.mjs": [
		66045,
		"node_modules_angular_common_locales_fr-CF_mjs"
	],
	"./fr-CG.mjs": [
		80268,
		"node_modules_angular_common_locales_fr-CG_mjs"
	],
	"./fr-CH.mjs": [
		35971,
		"node_modules_angular_common_locales_fr-CH_mjs"
	],
	"./fr-CI.mjs": [
		1754,
		"node_modules_angular_common_locales_fr-CI_mjs"
	],
	"./fr-CM.mjs": [
		47254,
		"node_modules_angular_common_locales_fr-CM_mjs"
	],
	"./fr-DJ.mjs": [
		35364,
		"node_modules_angular_common_locales_fr-DJ_mjs"
	],
	"./fr-DZ.mjs": [
		96180,
		"node_modules_angular_common_locales_fr-DZ_mjs"
	],
	"./fr-GA.mjs": [
		82662,
		"node_modules_angular_common_locales_fr-GA_mjs"
	],
	"./fr-GF.mjs": [
		64505,
		"node_modules_angular_common_locales_fr-GF_mjs"
	],
	"./fr-GN.mjs": [
		63105,
		"node_modules_angular_common_locales_fr-GN_mjs"
	],
	"./fr-GP.mjs": [
		97279,
		"node_modules_angular_common_locales_fr-GP_mjs"
	],
	"./fr-GQ.mjs": [
		3446,
		"node_modules_angular_common_locales_fr-GQ_mjs"
	],
	"./fr-HT.mjs": [
		36814,
		"node_modules_angular_common_locales_fr-HT_mjs"
	],
	"./fr-KM.mjs": [
		63662,
		"node_modules_angular_common_locales_fr-KM_mjs"
	],
	"./fr-LU.mjs": [
		85635,
		"node_modules_angular_common_locales_fr-LU_mjs"
	],
	"./fr-MA.mjs": [
		98212,
		"node_modules_angular_common_locales_fr-MA_mjs"
	],
	"./fr-MC.mjs": [
		43894,
		"node_modules_angular_common_locales_fr-MC_mjs"
	],
	"./fr-MF.mjs": [
		33219,
		"node_modules_angular_common_locales_fr-MF_mjs"
	],
	"./fr-MG.mjs": [
		67770,
		"node_modules_angular_common_locales_fr-MG_mjs"
	],
	"./fr-ML.mjs": [
		3217,
		"node_modules_angular_common_locales_fr-ML_mjs"
	],
	"./fr-MQ.mjs": [
		32180,
		"node_modules_angular_common_locales_fr-MQ_mjs"
	],
	"./fr-MR.mjs": [
		12495,
		"node_modules_angular_common_locales_fr-MR_mjs"
	],
	"./fr-MU.mjs": [
		37080,
		"node_modules_angular_common_locales_fr-MU_mjs"
	],
	"./fr-NC.mjs": [
		23411,
		"node_modules_angular_common_locales_fr-NC_mjs"
	],
	"./fr-NE.mjs": [
		3877,
		"node_modules_angular_common_locales_fr-NE_mjs"
	],
	"./fr-PF.mjs": [
		61172,
		"node_modules_angular_common_locales_fr-PF_mjs"
	],
	"./fr-PM.mjs": [
		48183,
		"node_modules_angular_common_locales_fr-PM_mjs"
	],
	"./fr-RE.mjs": [
		6833,
		"node_modules_angular_common_locales_fr-RE_mjs"
	],
	"./fr-RW.mjs": [
		30683,
		"node_modules_angular_common_locales_fr-RW_mjs"
	],
	"./fr-SC.mjs": [
		7040,
		"node_modules_angular_common_locales_fr-SC_mjs"
	],
	"./fr-SN.mjs": [
		86981,
		"node_modules_angular_common_locales_fr-SN_mjs"
	],
	"./fr-SY.mjs": [
		27853,
		"node_modules_angular_common_locales_fr-SY_mjs"
	],
	"./fr-TD.mjs": [
		55634,
		"node_modules_angular_common_locales_fr-TD_mjs"
	],
	"./fr-TG.mjs": [
		12033,
		"node_modules_angular_common_locales_fr-TG_mjs"
	],
	"./fr-TN.mjs": [
		64792,
		"node_modules_angular_common_locales_fr-TN_mjs"
	],
	"./fr-VU.mjs": [
		95037,
		"node_modules_angular_common_locales_fr-VU_mjs"
	],
	"./fr-WF.mjs": [
		40169,
		"node_modules_angular_common_locales_fr-WF_mjs"
	],
	"./fr-YT.mjs": [
		89773,
		"node_modules_angular_common_locales_fr-YT_mjs"
	],
	"./fr.mjs": [
		45669,
		"node_modules_angular_common_locales_fr_mjs"
	],
	"./fur.mjs": [
		95760,
		"node_modules_angular_common_locales_fur_mjs"
	],
	"./fy.mjs": [
		64142,
		"node_modules_angular_common_locales_fy_mjs"
	],
	"./ga-GB.mjs": [
		98649,
		"node_modules_angular_common_locales_ga-GB_mjs"
	],
	"./ga.mjs": [
		82849,
		"node_modules_angular_common_locales_ga_mjs"
	],
	"./gd.mjs": [
		81852,
		"node_modules_angular_common_locales_gd_mjs"
	],
	"./gl.mjs": [
		62452,
		"node_modules_angular_common_locales_gl_mjs"
	],
	"./gsw-FR.mjs": [
		64911,
		"node_modules_angular_common_locales_gsw-FR_mjs"
	],
	"./gsw-LI.mjs": [
		75854,
		"node_modules_angular_common_locales_gsw-LI_mjs"
	],
	"./gsw.mjs": [
		40662,
		"node_modules_angular_common_locales_gsw_mjs"
	],
	"./gu.mjs": [
		41981,
		"node_modules_angular_common_locales_gu_mjs"
	],
	"./guz.mjs": [
		66365,
		"node_modules_angular_common_locales_guz_mjs"
	],
	"./gv.mjs": [
		78302,
		"node_modules_angular_common_locales_gv_mjs"
	],
	"./ha-GH.mjs": [
		4736,
		"node_modules_angular_common_locales_ha-GH_mjs"
	],
	"./ha-NE.mjs": [
		80650,
		"node_modules_angular_common_locales_ha-NE_mjs"
	],
	"./ha.mjs": [
		99344,
		"node_modules_angular_common_locales_ha_mjs"
	],
	"./haw.mjs": [
		3563,
		"node_modules_angular_common_locales_haw_mjs"
	],
	"./he.mjs": [
		16972,
		"node_modules_angular_common_locales_he_mjs"
	],
	"./hi-Latn.mjs": [
		3681,
		"node_modules_angular_common_locales_hi-Latn_mjs"
	],
	"./hi.mjs": [
		5640,
		"node_modules_angular_common_locales_hi_mjs"
	],
	"./hr-BA.mjs": [
		96771,
		"node_modules_angular_common_locales_hr-BA_mjs"
	],
	"./hr.mjs": [
		67963,
		"node_modules_angular_common_locales_hr_mjs"
	],
	"./hsb.mjs": [
		43192,
		"node_modules_angular_common_locales_hsb_mjs"
	],
	"./hu.mjs": [
		8828,
		"node_modules_angular_common_locales_hu_mjs"
	],
	"./hy.mjs": [
		43352,
		"node_modules_angular_common_locales_hy_mjs"
	],
	"./ia.mjs": [
		20379,
		"node_modules_angular_common_locales_ia_mjs"
	],
	"./id.mjs": [
		48974,
		"node_modules_angular_common_locales_id_mjs"
	],
	"./ig.mjs": [
		89133,
		"node_modules_angular_common_locales_ig_mjs"
	],
	"./ii.mjs": [
		89683,
		"node_modules_angular_common_locales_ii_mjs"
	],
	"./is.mjs": [
		96529,
		"node_modules_angular_common_locales_is_mjs"
	],
	"./it-CH.mjs": [
		52402,
		"node_modules_angular_common_locales_it-CH_mjs"
	],
	"./it-SM.mjs": [
		40711,
		"node_modules_angular_common_locales_it-SM_mjs"
	],
	"./it-VA.mjs": [
		1820,
		"node_modules_angular_common_locales_it-VA_mjs"
	],
	"./it.mjs": [
		38462,
		"node_modules_angular_common_locales_it_mjs"
	],
	"./ja.mjs": [
		59245,
		"node_modules_angular_common_locales_ja_mjs"
	],
	"./jgo.mjs": [
		34167,
		"node_modules_angular_common_locales_jgo_mjs"
	],
	"./jmc.mjs": [
		84381,
		"node_modules_angular_common_locales_jmc_mjs"
	],
	"./jv.mjs": [
		55941,
		"node_modules_angular_common_locales_jv_mjs"
	],
	"./ka.mjs": [
		8357,
		"node_modules_angular_common_locales_ka_mjs"
	],
	"./kab.mjs": [
		21469,
		"node_modules_angular_common_locales_kab_mjs"
	],
	"./kam.mjs": [
		76410,
		"node_modules_angular_common_locales_kam_mjs"
	],
	"./kde.mjs": [
		71737,
		"node_modules_angular_common_locales_kde_mjs"
	],
	"./kea.mjs": [
		8314,
		"node_modules_angular_common_locales_kea_mjs"
	],
	"./kgp.mjs": [
		77249,
		"node_modules_angular_common_locales_kgp_mjs"
	],
	"./khq.mjs": [
		54673,
		"node_modules_angular_common_locales_khq_mjs"
	],
	"./ki.mjs": [
		13677,
		"node_modules_angular_common_locales_ki_mjs"
	],
	"./kk.mjs": [
		85463,
		"node_modules_angular_common_locales_kk_mjs"
	],
	"./kkj.mjs": [
		60031,
		"node_modules_angular_common_locales_kkj_mjs"
	],
	"./kl.mjs": [
		31968,
		"node_modules_angular_common_locales_kl_mjs"
	],
	"./kln.mjs": [
		93658,
		"node_modules_angular_common_locales_kln_mjs"
	],
	"./km.mjs": [
		27297,
		"node_modules_angular_common_locales_km_mjs"
	],
	"./kn.mjs": [
		94194,
		"node_modules_angular_common_locales_kn_mjs"
	],
	"./ko-KP.mjs": [
		78801,
		"node_modules_angular_common_locales_ko-KP_mjs"
	],
	"./ko.mjs": [
		10171,
		"node_modules_angular_common_locales_ko_mjs"
	],
	"./kok.mjs": [
		86722,
		"node_modules_angular_common_locales_kok_mjs"
	],
	"./ks-Arab.mjs": [
		99756,
		"node_modules_angular_common_locales_ks-Arab_mjs"
	],
	"./ks-Deva.mjs": [
		56566,
		"node_modules_angular_common_locales_ks-Deva_mjs"
	],
	"./ks.mjs": [
		32287,
		"node_modules_angular_common_locales_ks_mjs"
	],
	"./ksb.mjs": [
		84511,
		"node_modules_angular_common_locales_ksb_mjs"
	],
	"./ksf.mjs": [
		21923,
		"node_modules_angular_common_locales_ksf_mjs"
	],
	"./ksh.mjs": [
		2141,
		"node_modules_angular_common_locales_ksh_mjs"
	],
	"./ku.mjs": [
		88585,
		"node_modules_angular_common_locales_ku_mjs"
	],
	"./kw.mjs": [
		99491,
		"node_modules_angular_common_locales_kw_mjs"
	],
	"./ky.mjs": [
		22237,
		"node_modules_angular_common_locales_ky_mjs"
	],
	"./lag.mjs": [
		40543,
		"node_modules_angular_common_locales_lag_mjs"
	],
	"./lb.mjs": [
		72495,
		"node_modules_angular_common_locales_lb_mjs"
	],
	"./lg.mjs": [
		84618,
		"node_modules_angular_common_locales_lg_mjs"
	],
	"./lkt.mjs": [
		76258,
		"node_modules_angular_common_locales_lkt_mjs"
	],
	"./ln-AO.mjs": [
		60676,
		"node_modules_angular_common_locales_ln-AO_mjs"
	],
	"./ln-CF.mjs": [
		83983,
		"node_modules_angular_common_locales_ln-CF_mjs"
	],
	"./ln-CG.mjs": [
		80358,
		"node_modules_angular_common_locales_ln-CG_mjs"
	],
	"./ln.mjs": [
		78299,
		"node_modules_angular_common_locales_ln_mjs"
	],
	"./lo.mjs": [
		69650,
		"node_modules_angular_common_locales_lo_mjs"
	],
	"./lrc-IQ.mjs": [
		13885,
		"node_modules_angular_common_locales_lrc-IQ_mjs"
	],
	"./lrc.mjs": [
		29910,
		"node_modules_angular_common_locales_lrc_mjs"
	],
	"./lt.mjs": [
		29865,
		"node_modules_angular_common_locales_lt_mjs"
	],
	"./lu.mjs": [
		42152,
		"node_modules_angular_common_locales_lu_mjs"
	],
	"./luo.mjs": [
		62059,
		"node_modules_angular_common_locales_luo_mjs"
	],
	"./luy.mjs": [
		99213,
		"node_modules_angular_common_locales_luy_mjs"
	],
	"./lv.mjs": [
		2243,
		"node_modules_angular_common_locales_lv_mjs"
	],
	"./mai.mjs": [
		27564,
		"node_modules_angular_common_locales_mai_mjs"
	],
	"./mas-TZ.mjs": [
		12277,
		"node_modules_angular_common_locales_mas-TZ_mjs"
	],
	"./mas.mjs": [
		97446,
		"node_modules_angular_common_locales_mas_mjs"
	],
	"./mer.mjs": [
		10795,
		"node_modules_angular_common_locales_mer_mjs"
	],
	"./mfe.mjs": [
		59113,
		"node_modules_angular_common_locales_mfe_mjs"
	],
	"./mg.mjs": [
		45833,
		"node_modules_angular_common_locales_mg_mjs"
	],
	"./mgh.mjs": [
		21307,
		"node_modules_angular_common_locales_mgh_mjs"
	],
	"./mgo.mjs": [
		62172,
		"node_modules_angular_common_locales_mgo_mjs"
	],
	"./mi.mjs": [
		54439,
		"node_modules_angular_common_locales_mi_mjs"
	],
	"./mk.mjs": [
		79485,
		"node_modules_angular_common_locales_mk_mjs"
	],
	"./ml.mjs": [
		93378,
		"node_modules_angular_common_locales_ml_mjs"
	],
	"./mn.mjs": [
		64176,
		"node_modules_angular_common_locales_mn_mjs"
	],
	"./mni-Beng.mjs": [
		20176,
		"node_modules_angular_common_locales_mni-Beng_mjs"
	],
	"./mni.mjs": [
		44517,
		"node_modules_angular_common_locales_mni_mjs"
	],
	"./mr.mjs": [
		55700,
		"node_modules_angular_common_locales_mr_mjs"
	],
	"./ms-BN.mjs": [
		65866,
		"node_modules_angular_common_locales_ms-BN_mjs"
	],
	"./ms-ID.mjs": [
		88013,
		"node_modules_angular_common_locales_ms-ID_mjs"
	],
	"./ms-SG.mjs": [
		23100,
		"node_modules_angular_common_locales_ms-SG_mjs"
	],
	"./ms.mjs": [
		65605,
		"node_modules_angular_common_locales_ms_mjs"
	],
	"./mt.mjs": [
		55466,
		"node_modules_angular_common_locales_mt_mjs"
	],
	"./mua.mjs": [
		84432,
		"node_modules_angular_common_locales_mua_mjs"
	],
	"./my.mjs": [
		42711,
		"node_modules_angular_common_locales_my_mjs"
	],
	"./mzn.mjs": [
		53702,
		"node_modules_angular_common_locales_mzn_mjs"
	],
	"./naq.mjs": [
		42103,
		"node_modules_angular_common_locales_naq_mjs"
	],
	"./nb-SJ.mjs": [
		91969,
		"node_modules_angular_common_locales_nb-SJ_mjs"
	],
	"./nb.mjs": [
		26013,
		"node_modules_angular_common_locales_nb_mjs"
	],
	"./nd.mjs": [
		57451,
		"node_modules_angular_common_locales_nd_mjs"
	],
	"./nds-NL.mjs": [
		69901,
		"node_modules_angular_common_locales_nds-NL_mjs"
	],
	"./nds.mjs": [
		57082,
		"node_modules_angular_common_locales_nds_mjs"
	],
	"./ne-IN.mjs": [
		85342,
		"node_modules_angular_common_locales_ne-IN_mjs"
	],
	"./ne.mjs": [
		75106,
		"node_modules_angular_common_locales_ne_mjs"
	],
	"./nl-AW.mjs": [
		23844,
		"node_modules_angular_common_locales_nl-AW_mjs"
	],
	"./nl-BE.mjs": [
		2023,
		"node_modules_angular_common_locales_nl-BE_mjs"
	],
	"./nl-BQ.mjs": [
		9499,
		"node_modules_angular_common_locales_nl-BQ_mjs"
	],
	"./nl-CW.mjs": [
		42014,
		"node_modules_angular_common_locales_nl-CW_mjs"
	],
	"./nl-SR.mjs": [
		18619,
		"node_modules_angular_common_locales_nl-SR_mjs"
	],
	"./nl-SX.mjs": [
		37145,
		"node_modules_angular_common_locales_nl-SX_mjs"
	],
	"./nl.mjs": [
		69091,
		"node_modules_angular_common_locales_nl_mjs"
	],
	"./nmg.mjs": [
		8829,
		"node_modules_angular_common_locales_nmg_mjs"
	],
	"./nn.mjs": [
		58185,
		"node_modules_angular_common_locales_nn_mjs"
	],
	"./nnh.mjs": [
		58363,
		"node_modules_angular_common_locales_nnh_mjs"
	],
	"./no.mjs": [
		35848,
		"node_modules_angular_common_locales_no_mjs"
	],
	"./nus.mjs": [
		96169,
		"node_modules_angular_common_locales_nus_mjs"
	],
	"./nyn.mjs": [
		65648,
		"node_modules_angular_common_locales_nyn_mjs"
	],
	"./om-KE.mjs": [
		26350,
		"node_modules_angular_common_locales_om-KE_mjs"
	],
	"./om.mjs": [
		79901,
		"node_modules_angular_common_locales_om_mjs"
	],
	"./or.mjs": [
		32202,
		"node_modules_angular_common_locales_or_mjs"
	],
	"./os-RU.mjs": [
		61143,
		"node_modules_angular_common_locales_os-RU_mjs"
	],
	"./os.mjs": [
		67443,
		"node_modules_angular_common_locales_os_mjs"
	],
	"./pa-Arab.mjs": [
		34701,
		"node_modules_angular_common_locales_pa-Arab_mjs"
	],
	"./pa-Guru.mjs": [
		32994,
		"node_modules_angular_common_locales_pa-Guru_mjs"
	],
	"./pa.mjs": [
		10040,
		"node_modules_angular_common_locales_pa_mjs"
	],
	"./pcm.mjs": [
		41628,
		"node_modules_angular_common_locales_pcm_mjs"
	],
	"./pl.mjs": [
		4013,
		"node_modules_angular_common_locales_pl_mjs"
	],
	"./ps-PK.mjs": [
		99300,
		"node_modules_angular_common_locales_ps-PK_mjs"
	],
	"./ps.mjs": [
		24378,
		"node_modules_angular_common_locales_ps_mjs"
	],
	"./pt-AO.mjs": [
		31262,
		"node_modules_angular_common_locales_pt-AO_mjs"
	],
	"./pt-CH.mjs": [
		50803,
		"node_modules_angular_common_locales_pt-CH_mjs"
	],
	"./pt-CV.mjs": [
		14845,
		"node_modules_angular_common_locales_pt-CV_mjs"
	],
	"./pt-GQ.mjs": [
		20582,
		"node_modules_angular_common_locales_pt-GQ_mjs"
	],
	"./pt-GW.mjs": [
		42904,
		"node_modules_angular_common_locales_pt-GW_mjs"
	],
	"./pt-LU.mjs": [
		98387,
		"node_modules_angular_common_locales_pt-LU_mjs"
	],
	"./pt-MO.mjs": [
		89714,
		"node_modules_angular_common_locales_pt-MO_mjs"
	],
	"./pt-MZ.mjs": [
		36967,
		"node_modules_angular_common_locales_pt-MZ_mjs"
	],
	"./pt-PT.mjs": [
		13606,
		"node_modules_angular_common_locales_pt-PT_mjs"
	],
	"./pt-ST.mjs": [
		73559,
		"node_modules_angular_common_locales_pt-ST_mjs"
	],
	"./pt-TL.mjs": [
		94778,
		"node_modules_angular_common_locales_pt-TL_mjs"
	],
	"./pt.mjs": [
		58581,
		"node_modules_angular_common_locales_pt_mjs"
	],
	"./qu-BO.mjs": [
		79465,
		"node_modules_angular_common_locales_qu-BO_mjs"
	],
	"./qu-EC.mjs": [
		26320,
		"node_modules_angular_common_locales_qu-EC_mjs"
	],
	"./qu.mjs": [
		92143,
		"node_modules_angular_common_locales_qu_mjs"
	],
	"./rm.mjs": [
		94198,
		"node_modules_angular_common_locales_rm_mjs"
	],
	"./rn.mjs": [
		17045,
		"node_modules_angular_common_locales_rn_mjs"
	],
	"./ro-MD.mjs": [
		64022,
		"node_modules_angular_common_locales_ro-MD_mjs"
	],
	"./ro.mjs": [
		72644,
		"node_modules_angular_common_locales_ro_mjs"
	],
	"./rof.mjs": [
		81990,
		"node_modules_angular_common_locales_rof_mjs"
	],
	"./ru-BY.mjs": [
		76848,
		"node_modules_angular_common_locales_ru-BY_mjs"
	],
	"./ru-KG.mjs": [
		70589,
		"node_modules_angular_common_locales_ru-KG_mjs"
	],
	"./ru-KZ.mjs": [
		11192,
		"node_modules_angular_common_locales_ru-KZ_mjs"
	],
	"./ru-MD.mjs": [
		66292,
		"node_modules_angular_common_locales_ru-MD_mjs"
	],
	"./ru-UA.mjs": [
		77377,
		"node_modules_angular_common_locales_ru-UA_mjs"
	],
	"./ru.mjs": [
		87566,
		"node_modules_angular_common_locales_ru_mjs"
	],
	"./rw.mjs": [
		52860,
		"node_modules_angular_common_locales_rw_mjs"
	],
	"./rwk.mjs": [
		14643,
		"node_modules_angular_common_locales_rwk_mjs"
	],
	"./sa.mjs": [
		26221,
		"node_modules_angular_common_locales_sa_mjs"
	],
	"./sah.mjs": [
		19783,
		"node_modules_angular_common_locales_sah_mjs"
	],
	"./saq.mjs": [
		46150,
		"node_modules_angular_common_locales_saq_mjs"
	],
	"./sat-Olck.mjs": [
		42391,
		"node_modules_angular_common_locales_sat-Olck_mjs"
	],
	"./sat.mjs": [
		96563,
		"node_modules_angular_common_locales_sat_mjs"
	],
	"./sbp.mjs": [
		69438,
		"node_modules_angular_common_locales_sbp_mjs"
	],
	"./sc.mjs": [
		89559,
		"node_modules_angular_common_locales_sc_mjs"
	],
	"./sd-Arab.mjs": [
		725,
		"node_modules_angular_common_locales_sd-Arab_mjs"
	],
	"./sd-Deva.mjs": [
		85931,
		"node_modules_angular_common_locales_sd-Deva_mjs"
	],
	"./sd.mjs": [
		50016,
		"node_modules_angular_common_locales_sd_mjs"
	],
	"./se-FI.mjs": [
		32637,
		"node_modules_angular_common_locales_se-FI_mjs"
	],
	"./se-SE.mjs": [
		7970,
		"node_modules_angular_common_locales_se-SE_mjs"
	],
	"./se.mjs": [
		6273,
		"node_modules_angular_common_locales_se_mjs"
	],
	"./seh.mjs": [
		80371,
		"node_modules_angular_common_locales_seh_mjs"
	],
	"./ses.mjs": [
		24656,
		"node_modules_angular_common_locales_ses_mjs"
	],
	"./sg.mjs": [
		11387,
		"node_modules_angular_common_locales_sg_mjs"
	],
	"./shi-Latn.mjs": [
		51857,
		"node_modules_angular_common_locales_shi-Latn_mjs"
	],
	"./shi-Tfng.mjs": [
		2809,
		"node_modules_angular_common_locales_shi-Tfng_mjs"
	],
	"./shi.mjs": [
		93745,
		"node_modules_angular_common_locales_shi_mjs"
	],
	"./si.mjs": [
		21509,
		"node_modules_angular_common_locales_si_mjs"
	],
	"./sk.mjs": [
		21935,
		"node_modules_angular_common_locales_sk_mjs"
	],
	"./sl.mjs": [
		98680,
		"node_modules_angular_common_locales_sl_mjs"
	],
	"./smn.mjs": [
		65981,
		"node_modules_angular_common_locales_smn_mjs"
	],
	"./sn.mjs": [
		17706,
		"node_modules_angular_common_locales_sn_mjs"
	],
	"./so-DJ.mjs": [
		81218,
		"node_modules_angular_common_locales_so-DJ_mjs"
	],
	"./so-ET.mjs": [
		69691,
		"node_modules_angular_common_locales_so-ET_mjs"
	],
	"./so-KE.mjs": [
		81252,
		"node_modules_angular_common_locales_so-KE_mjs"
	],
	"./so.mjs": [
		52947,
		"node_modules_angular_common_locales_so_mjs"
	],
	"./sq-MK.mjs": [
		96822,
		"node_modules_angular_common_locales_sq-MK_mjs"
	],
	"./sq-XK.mjs": [
		49361,
		"node_modules_angular_common_locales_sq-XK_mjs"
	],
	"./sq.mjs": [
		65405,
		"node_modules_angular_common_locales_sq_mjs"
	],
	"./sr-Cyrl-BA.mjs": [
		49933,
		"node_modules_angular_common_locales_sr-Cyrl-BA_mjs"
	],
	"./sr-Cyrl-ME.mjs": [
		89480,
		"node_modules_angular_common_locales_sr-Cyrl-ME_mjs"
	],
	"./sr-Cyrl-XK.mjs": [
		20921,
		"node_modules_angular_common_locales_sr-Cyrl-XK_mjs"
	],
	"./sr-Cyrl.mjs": [
		23333,
		"node_modules_angular_common_locales_sr-Cyrl_mjs"
	],
	"./sr-Latn-BA.mjs": [
		81318,
		"node_modules_angular_common_locales_sr-Latn-BA_mjs"
	],
	"./sr-Latn-ME.mjs": [
		25575,
		"node_modules_angular_common_locales_sr-Latn-ME_mjs"
	],
	"./sr-Latn-XK.mjs": [
		53934,
		"node_modules_angular_common_locales_sr-Latn-XK_mjs"
	],
	"./sr-Latn.mjs": [
		5436,
		"node_modules_angular_common_locales_sr-Latn_mjs"
	],
	"./sr.mjs": [
		1726,
		"node_modules_angular_common_locales_sr_mjs"
	],
	"./su-Latn.mjs": [
		79857,
		"node_modules_angular_common_locales_su-Latn_mjs"
	],
	"./su.mjs": [
		56913,
		"node_modules_angular_common_locales_su_mjs"
	],
	"./sv-AX.mjs": [
		60456,
		"node_modules_angular_common_locales_sv-AX_mjs"
	],
	"./sv-FI.mjs": [
		10512,
		"node_modules_angular_common_locales_sv-FI_mjs"
	],
	"./sv.mjs": [
		23554,
		"node_modules_angular_common_locales_sv_mjs"
	],
	"./sw-CD.mjs": [
		14869,
		"node_modules_angular_common_locales_sw-CD_mjs"
	],
	"./sw-KE.mjs": [
		45196,
		"node_modules_angular_common_locales_sw-KE_mjs"
	],
	"./sw-UG.mjs": [
		14328,
		"node_modules_angular_common_locales_sw-UG_mjs"
	],
	"./sw.mjs": [
		19691,
		"node_modules_angular_common_locales_sw_mjs"
	],
	"./ta-LK.mjs": [
		44330,
		"node_modules_angular_common_locales_ta-LK_mjs"
	],
	"./ta-MY.mjs": [
		66803,
		"node_modules_angular_common_locales_ta-MY_mjs"
	],
	"./ta-SG.mjs": [
		56343,
		"node_modules_angular_common_locales_ta-SG_mjs"
	],
	"./ta.mjs": [
		99580,
		"node_modules_angular_common_locales_ta_mjs"
	],
	"./te.mjs": [
		44320,
		"node_modules_angular_common_locales_te_mjs"
	],
	"./teo-KE.mjs": [
		7668,
		"node_modules_angular_common_locales_teo-KE_mjs"
	],
	"./teo.mjs": [
		7843,
		"node_modules_angular_common_locales_teo_mjs"
	],
	"./tg.mjs": [
		83250,
		"node_modules_angular_common_locales_tg_mjs"
	],
	"./th.mjs": [
		24261,
		"node_modules_angular_common_locales_th_mjs"
	],
	"./ti-ER.mjs": [
		20112,
		"node_modules_angular_common_locales_ti-ER_mjs"
	],
	"./ti.mjs": [
		68276,
		"node_modules_angular_common_locales_ti_mjs"
	],
	"./tk.mjs": [
		56870,
		"node_modules_angular_common_locales_tk_mjs"
	],
	"./to.mjs": [
		97770,
		"node_modules_angular_common_locales_to_mjs"
	],
	"./tr-CY.mjs": [
		1036,
		"node_modules_angular_common_locales_tr-CY_mjs"
	],
	"./tr.mjs": [
		20039,
		"node_modules_angular_common_locales_tr_mjs"
	],
	"./tt.mjs": [
		85393,
		"node_modules_angular_common_locales_tt_mjs"
	],
	"./twq.mjs": [
		81395,
		"node_modules_angular_common_locales_twq_mjs"
	],
	"./tzm.mjs": [
		96144,
		"node_modules_angular_common_locales_tzm_mjs"
	],
	"./ug.mjs": [
		14161,
		"node_modules_angular_common_locales_ug_mjs"
	],
	"./uk.mjs": [
		10357,
		"node_modules_angular_common_locales_uk_mjs"
	],
	"./und.mjs": [
		6248,
		"node_modules_angular_common_locales_und_mjs"
	],
	"./ur-IN.mjs": [
		38944,
		"node_modules_angular_common_locales_ur-IN_mjs"
	],
	"./ur.mjs": [
		62524,
		"node_modules_angular_common_locales_ur_mjs"
	],
	"./uz-Arab.mjs": [
		38201,
		"node_modules_angular_common_locales_uz-Arab_mjs"
	],
	"./uz-Cyrl.mjs": [
		32223,
		"node_modules_angular_common_locales_uz-Cyrl_mjs"
	],
	"./uz-Latn.mjs": [
		33138,
		"node_modules_angular_common_locales_uz-Latn_mjs"
	],
	"./uz.mjs": [
		43124,
		"node_modules_angular_common_locales_uz_mjs"
	],
	"./vai-Latn.mjs": [
		50543,
		"node_modules_angular_common_locales_vai-Latn_mjs"
	],
	"./vai-Vaii.mjs": [
		70517,
		"node_modules_angular_common_locales_vai-Vaii_mjs"
	],
	"./vai.mjs": [
		10759,
		"node_modules_angular_common_locales_vai_mjs"
	],
	"./vi.mjs": [
		39310,
		"node_modules_angular_common_locales_vi_mjs"
	],
	"./vun.mjs": [
		1476,
		"node_modules_angular_common_locales_vun_mjs"
	],
	"./wae.mjs": [
		39038,
		"node_modules_angular_common_locales_wae_mjs"
	],
	"./wo.mjs": [
		49695,
		"node_modules_angular_common_locales_wo_mjs"
	],
	"./xh.mjs": [
		24838,
		"node_modules_angular_common_locales_xh_mjs"
	],
	"./xog.mjs": [
		45929,
		"node_modules_angular_common_locales_xog_mjs"
	],
	"./yav.mjs": [
		59679,
		"node_modules_angular_common_locales_yav_mjs"
	],
	"./yi.mjs": [
		80163,
		"node_modules_angular_common_locales_yi_mjs"
	],
	"./yo-BJ.mjs": [
		60214,
		"node_modules_angular_common_locales_yo-BJ_mjs"
	],
	"./yo.mjs": [
		48917,
		"node_modules_angular_common_locales_yo_mjs"
	],
	"./yrl-CO.mjs": [
		51539,
		"node_modules_angular_common_locales_yrl-CO_mjs"
	],
	"./yrl-VE.mjs": [
		70394,
		"node_modules_angular_common_locales_yrl-VE_mjs"
	],
	"./yrl.mjs": [
		49064,
		"node_modules_angular_common_locales_yrl_mjs"
	],
	"./yue-Hans.mjs": [
		51081,
		"node_modules_angular_common_locales_yue-Hans_mjs"
	],
	"./yue-Hant.mjs": [
		72662,
		"node_modules_angular_common_locales_yue-Hant_mjs"
	],
	"./yue.mjs": [
		22224,
		"node_modules_angular_common_locales_yue_mjs"
	],
	"./zgh.mjs": [
		69488,
		"node_modules_angular_common_locales_zgh_mjs"
	],
	"./zh-Hans-HK.mjs": [
		37114,
		"node_modules_angular_common_locales_zh-Hans-HK_mjs"
	],
	"./zh-Hans-MO.mjs": [
		5713,
		"node_modules_angular_common_locales_zh-Hans-MO_mjs"
	],
	"./zh-Hans-SG.mjs": [
		90811,
		"node_modules_angular_common_locales_zh-Hans-SG_mjs"
	],
	"./zh-Hans.mjs": [
		94136,
		"node_modules_angular_common_locales_zh-Hans_mjs"
	],
	"./zh-Hant-HK.mjs": [
		55227,
		"node_modules_angular_common_locales_zh-Hant-HK_mjs"
	],
	"./zh-Hant-MO.mjs": [
		11804,
		"node_modules_angular_common_locales_zh-Hant-MO_mjs"
	],
	"./zh-Hant.mjs": [
		52591,
		"node_modules_angular_common_locales_zh-Hant_mjs"
	],
	"./zh.mjs": [
		6747,
		"node_modules_angular_common_locales_zh_mjs"
	],
	"./zu.mjs": [
		30038,
		"node_modules_angular_common_locales_zu_mjs"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 77055;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 35358:
/*!***************************************************!*\
  !*** ./node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af": 85637,
	"./af.js": 85637,
	"./ar": 6777,
	"./ar-dz": 74508,
	"./ar-dz.js": 74508,
	"./ar-kw": 67504,
	"./ar-kw.js": 67504,
	"./ar-ly": 95373,
	"./ar-ly.js": 95373,
	"./ar-ma": 92412,
	"./ar-ma.js": 92412,
	"./ar-ps": 78823,
	"./ar-ps.js": 78823,
	"./ar-sa": 36670,
	"./ar-sa.js": 36670,
	"./ar-tn": 36448,
	"./ar-tn.js": 36448,
	"./ar.js": 6777,
	"./az": 23009,
	"./az.js": 23009,
	"./be": 28299,
	"./be.js": 28299,
	"./bg": 4685,
	"./bg.js": 4685,
	"./bm": 11171,
	"./bm.js": 11171,
	"./bn": 23590,
	"./bn-bd": 5841,
	"./bn-bd.js": 5841,
	"./bn.js": 23590,
	"./bo": 54309,
	"./bo.js": 54309,
	"./br": 54130,
	"./br.js": 54130,
	"./bs": 8033,
	"./bs.js": 8033,
	"./ca": 55294,
	"./ca.js": 55294,
	"./cs": 53028,
	"./cs.js": 53028,
	"./cv": 5807,
	"./cv.js": 5807,
	"./cy": 70342,
	"./cy.js": 70342,
	"./da": 38269,
	"./da.js": 38269,
	"./de": 11489,
	"./de-at": 42123,
	"./de-at.js": 42123,
	"./de-ch": 17757,
	"./de-ch.js": 17757,
	"./de.js": 11489,
	"./dv": 28152,
	"./dv.js": 28152,
	"./el": 7687,
	"./el.js": 7687,
	"./en-au": 46668,
	"./en-au.js": 46668,
	"./en-ca": 76798,
	"./en-ca.js": 76798,
	"./en-gb": 53615,
	"./en-gb.js": 53615,
	"./en-ie": 91364,
	"./en-ie.js": 91364,
	"./en-il": 79907,
	"./en-il.js": 79907,
	"./en-in": 70533,
	"./en-in.js": 70533,
	"./en-nz": 33190,
	"./en-nz.js": 33190,
	"./en-sg": 51096,
	"./en-sg.js": 51096,
	"./eo": 3962,
	"./eo.js": 3962,
	"./es": 37726,
	"./es-do": 65010,
	"./es-do.js": 65010,
	"./es-mx": 63654,
	"./es-mx.js": 63654,
	"./es-us": 59043,
	"./es-us.js": 59043,
	"./es.js": 37726,
	"./et": 25343,
	"./et.js": 25343,
	"./eu": 90728,
	"./eu.js": 90728,
	"./fa": 60787,
	"./fa.js": 60787,
	"./fi": 71771,
	"./fi.js": 71771,
	"./fil": 45335,
	"./fil.js": 45335,
	"./fo": 69761,
	"./fo.js": 69761,
	"./fr": 1670,
	"./fr-ca": 28991,
	"./fr-ca.js": 28991,
	"./fr-ch": 97280,
	"./fr-ch.js": 97280,
	"./fr.js": 1670,
	"./fy": 24203,
	"./fy.js": 24203,
	"./ga": 69858,
	"./ga.js": 69858,
	"./gd": 38605,
	"./gd.js": 38605,
	"./gl": 27365,
	"./gl.js": 27365,
	"./gom-deva": 33896,
	"./gom-deva.js": 33896,
	"./gom-latn": 95587,
	"./gom-latn.js": 95587,
	"./gu": 97950,
	"./gu.js": 97950,
	"./he": 92029,
	"./he.js": 92029,
	"./hi": 51897,
	"./hi.js": 51897,
	"./hr": 29816,
	"./hr.js": 29816,
	"./hu": 22253,
	"./hu.js": 22253,
	"./hy-am": 28196,
	"./hy-am.js": 28196,
	"./id": 51307,
	"./id.js": 51307,
	"./is": 95474,
	"./is.js": 95474,
	"./it": 23099,
	"./it-ch": 45807,
	"./it-ch.js": 45807,
	"./it.js": 23099,
	"./ja": 19127,
	"./ja.js": 19127,
	"./jv": 30182,
	"./jv.js": 30182,
	"./ka": 10758,
	"./ka.js": 10758,
	"./kk": 93444,
	"./kk.js": 93444,
	"./km": 72034,
	"./km.js": 72034,
	"./kn": 46223,
	"./kn.js": 46223,
	"./ko": 83064,
	"./ko.js": 83064,
	"./ku": 8714,
	"./ku-kmr": 10961,
	"./ku-kmr.js": 10961,
	"./ku.js": 8714,
	"./ky": 12062,
	"./ky.js": 12062,
	"./lb": 84796,
	"./lb.js": 84796,
	"./lo": 19279,
	"./lo.js": 19279,
	"./lt": 106,
	"./lt.js": 106,
	"./lv": 11840,
	"./lv.js": 11840,
	"./me": 42240,
	"./me.js": 42240,
	"./mi": 13588,
	"./mi.js": 13588,
	"./mk": 15518,
	"./mk.js": 15518,
	"./ml": 37823,
	"./ml.js": 37823,
	"./mn": 98657,
	"./mn.js": 98657,
	"./mr": 61285,
	"./mr.js": 61285,
	"./ms": 43014,
	"./ms-my": 86253,
	"./ms-my.js": 86253,
	"./ms.js": 43014,
	"./mt": 20167,
	"./mt.js": 20167,
	"./my": 47940,
	"./my.js": 47940,
	"./nb": 50014,
	"./nb.js": 50014,
	"./ne": 49023,
	"./ne.js": 49023,
	"./nl": 34208,
	"./nl-be": 71412,
	"./nl-be.js": 71412,
	"./nl.js": 34208,
	"./nn": 81354,
	"./nn.js": 81354,
	"./oc-lnc": 40870,
	"./oc-lnc.js": 40870,
	"./pa-in": 80389,
	"./pa-in.js": 80389,
	"./pl": 7342,
	"./pl.js": 7342,
	"./pt": 34774,
	"./pt-br": 73003,
	"./pt-br.js": 73003,
	"./pt.js": 34774,
	"./ro": 85333,
	"./ro.js": 85333,
	"./ru": 73451,
	"./ru.js": 73451,
	"./sd": 43921,
	"./sd.js": 43921,
	"./se": 59682,
	"./se.js": 59682,
	"./si": 80582,
	"./si.js": 80582,
	"./sk": 4348,
	"./sk.js": 4348,
	"./sl": 95337,
	"./sl.js": 95337,
	"./sq": 39358,
	"./sq.js": 39358,
	"./sr": 50683,
	"./sr-cyrl": 69382,
	"./sr-cyrl.js": 69382,
	"./sr.js": 50683,
	"./ss": 51156,
	"./ss.js": 51156,
	"./sv": 29855,
	"./sv.js": 29855,
	"./sw": 18536,
	"./sw.js": 18536,
	"./ta": 15373,
	"./ta.js": 15373,
	"./te": 37809,
	"./te.js": 37809,
	"./tet": 61297,
	"./tet.js": 61297,
	"./tg": 92527,
	"./tg.js": 92527,
	"./th": 85862,
	"./th.js": 85862,
	"./tk": 79331,
	"./tk.js": 79331,
	"./tl-ph": 44387,
	"./tl-ph.js": 44387,
	"./tlh": 3592,
	"./tlh.js": 3592,
	"./tr": 79732,
	"./tr.js": 79732,
	"./tzl": 99570,
	"./tzl.js": 99570,
	"./tzm": 83553,
	"./tzm-latn": 7699,
	"./tzm-latn.js": 7699,
	"./tzm.js": 83553,
	"./ug-cn": 25674,
	"./ug-cn.js": 25674,
	"./uk": 69974,
	"./uk.js": 69974,
	"./ur": 45773,
	"./ur.js": 45773,
	"./uz": 357,
	"./uz-latn": 77135,
	"./uz-latn.js": 77135,
	"./uz.js": 357,
	"./vi": 20043,
	"./vi.js": 20043,
	"./x-pseudo": 40767,
	"./x-pseudo.js": 40767,
	"./yo": 80150,
	"./yo.js": 80150,
	"./zh-cn": 21828,
	"./zh-cn.js": 21828,
	"./zh-hk": 86644,
	"./zh-hk.js": 86644,
	"./zh-mo": 79305,
	"./zh-mo.js": 79305,
	"./zh-tw": 31860,
	"./zh-tw.js": 31860
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 35358;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(84429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map