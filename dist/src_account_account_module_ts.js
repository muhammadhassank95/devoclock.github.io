"use strict";
(self["webpackChunkERP"] = self["webpackChunkERP"] || []).push([["src_account_account_module_ts"],{

/***/ 52946:
/*!***********************************************!*\
  !*** ./src/account/account-routing.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccountRoutingModule: () => (/* binding */ AccountRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login/login.component */ 56188);
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register/register.component */ 48520);
/* harmony import */ var _account_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./account.component */ 69804);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);






class AccountRoutingModule {
  static #_ = this.ɵfac = function AccountRoutingModule_Factory(t) {
    return new (t || AccountRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: AccountRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild([{
      path: '',
      component: _account_component__WEBPACK_IMPORTED_MODULE_2__.AccountComponent,
      children: [{
        path: 'login',
        component: _login_login_component__WEBPACK_IMPORTED_MODULE_0__.LoginComponent
      }, {
        path: 'register',
        component: _register_register_component__WEBPACK_IMPORTED_MODULE_1__.RegisterComponent
      }]
    }]), _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AccountRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
})();

/***/ }),

/***/ 69804:
/*!******************************************!*\
  !*** ./src/account/account.component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccountComponent: () => (/* binding */ AccountComponent)
/* harmony export */ });
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 18133);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _layout_account_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout/account-header.component */ 28431);
/* harmony import */ var _layout_account_footer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout/account-footer.component */ 54345);
/* harmony import */ var _tenant_tenant_change_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tenant/tenant-change.component */ 40257);







function AccountComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "tenant-change");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
class AccountComponent extends _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase {
  constructor(injector, renderer) {
    super(injector);
    this.renderer = renderer;
  }
  showTenantChange() {
    return abp.multiTenancy.isEnabled;
  }
  ngOnInit() {
    this.renderer.addClass(document.body, 'login-page-new');
  }
  static #_ = this.ɵfac = function AccountComponent_Factory(t) {
    return new (t || AccountComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.Renderer2));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: AccountComponent,
    selectors: [["ng-component"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]],
    decls: 13,
    vars: 1,
    consts: [[1, "main-login-container", "d-flex", "align-items-center"], [1, "login-box", "d-flex", "align-items-center", "justify-content-start", "flex-column", "position-relative"], ["class", "card-header w-100", 4, "ngIf"], [1, "card", "d-flex", "align-items-center", "w-100"], [1, "card-body", "login-card-body", "w-100"], [1, "row", "m-0", "rhs-login", "position-relative", "d-flex", "justify-content-center", "align-items-center"], [1, "col-12", "position-absolute", "w-100", "h-100"], [1, "rhs-logo-img", "d-flex", "align-items-center", "justify-content-center", "w-100", "h-100"], ["src", "assets/img/logo-c.svg", "alt", "", 1, "rotate-logo", 2, "height", "40%", "width", "40%"], ["src", "assets/img/HNL.svg", "alt", "", 1, "", 2, "height", "45%", "width", "45%"], [1, "card-header", "w-100"]],
    template: function AccountComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, AccountComponent_div_2_Template, 2, 0, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "account-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 3)(5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](7, "account-footer");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 5)(9, "div", 6)(10, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](11, "img", 8)(12, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.showTenantChange());
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterOutlet, _layout_account_header_component__WEBPACK_IMPORTED_MODULE_1__.AccountHeaderComponent, _layout_account_footer_component__WEBPACK_IMPORTED_MODULE_2__.AccountFooterComponent, _tenant_tenant_change_component__WEBPACK_IMPORTED_MODULE_3__.TenantChangeComponent],
    encapsulation: 2
  });
}

/***/ }),

/***/ 55547:
/*!***************************************!*\
  !*** ./src/account/account.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccountModule: () => (/* binding */ AccountModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-bootstrap/modal */ 2457);
/* harmony import */ var _account_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./account-routing.module */ 52946);
/* harmony import */ var _shared_service_proxies_service_proxy_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/service-proxies/service-proxy.module */ 7707);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/shared.module */ 31699);
/* harmony import */ var _account_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./account.component */ 69804);
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login/login.component */ 56188);
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./register/register.component */ 48520);
/* harmony import */ var _layout_account_languages_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./layout/account-languages.component */ 29277);
/* harmony import */ var _layout_account_header_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./layout/account-header.component */ 28431);
/* harmony import */ var _layout_account_footer_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./layout/account-footer.component */ 54345);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/dropdown */ 26895);
/* harmony import */ var _tenant_tenant_change_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tenant/tenant-change.component */ 40257);
/* harmony import */ var _tenant_tenant_change_dialog_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./tenant/tenant-change-dialog.component */ 79852);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 37580);















// tenants




class AccountModule {
  static #_ = this.ɵfac = function AccountModule_Factory(t) {
    return new (t || AccountModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineNgModule"]({
    type: AccountModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_14__.HttpClientModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_14__.HttpClientJsonpModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule, _shared_service_proxies_service_proxy_module__WEBPACK_IMPORTED_MODULE_1__.ServiceProxyModule, _account_routing_module__WEBPACK_IMPORTED_MODULE_0__.AccountRoutingModule, ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_15__.ModalModule.forChild(), primeng_dropdown__WEBPACK_IMPORTED_MODULE_16__.DropdownModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsetNgModuleScope"](AccountModule, {
    declarations: [_account_component__WEBPACK_IMPORTED_MODULE_3__.AccountComponent, _login_login_component__WEBPACK_IMPORTED_MODULE_4__.LoginComponent, _register_register_component__WEBPACK_IMPORTED_MODULE_5__.RegisterComponent, _layout_account_languages_component__WEBPACK_IMPORTED_MODULE_6__.AccountLanguagesComponent, _layout_account_header_component__WEBPACK_IMPORTED_MODULE_7__.AccountHeaderComponent, _layout_account_footer_component__WEBPACK_IMPORTED_MODULE_8__.AccountFooterComponent,
    // tenant
    _tenant_tenant_change_component__WEBPACK_IMPORTED_MODULE_9__.TenantChangeComponent, _tenant_tenant_change_dialog_component__WEBPACK_IMPORTED_MODULE_10__.TenantChangeDialogComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_14__.HttpClientModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_14__.HttpClientJsonpModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule, _shared_service_proxies_service_proxy_module__WEBPACK_IMPORTED_MODULE_1__.ServiceProxyModule, _account_routing_module__WEBPACK_IMPORTED_MODULE_0__.AccountRoutingModule, ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_15__.ModalModule, primeng_dropdown__WEBPACK_IMPORTED_MODULE_16__.DropdownModule]
  });
})();

/***/ }),

/***/ 54345:
/*!********************************************************!*\
  !*** ./src/account/layout/account-footer.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccountFooterComponent: () => (/* binding */ AccountFooterComponent)
/* harmony export */ });
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 18133);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);


class AccountFooterComponent extends _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase {
  constructor(injector) {
    super(injector);
    this.currentYear = new Date().getFullYear();
    this.versionText = this.appSession.application.version + ' [' + this.appSession.application.releaseDate.format('YYYYDDMM') + ']';
  }
  static #_ = this.ɵfac = function AccountFooterComponent_Factory(t) {
    return new (t || AccountFooterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: AccountFooterComponent,
    selectors: [["account-footer"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
    decls: 2,
    vars: 0,
    consts: [[1, "row"], [1, "col-md-12", "text-center"]],
    template: function AccountFooterComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
}

/***/ }),

/***/ 28431:
/*!********************************************************!*\
  !*** ./src/account/layout/account-header.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccountHeaderComponent: () => (/* binding */ AccountHeaderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);

class AccountHeaderComponent {
  static #_ = this.ɵfac = function AccountHeaderComponent_Factory(t) {
    return new (t || AccountHeaderComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: AccountHeaderComponent,
    selectors: [["account-header"]],
    decls: 2,
    vars: 0,
    consts: [[1, "login-logo", "flex", "align-items-center", "justify-content-center", "my-3"], ["src", "assets/img/logo.svg", "alt", ""]],
    template: function AccountHeaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
}

/***/ }),

/***/ 29277:
/*!***********************************************************!*\
  !*** ./src/account/layout/account-languages.component.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccountLanguagesComponent: () => (/* binding */ AccountLanguagesComponent)
/* harmony export */ });
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 18133);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash-es */ 93362);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);



class AccountLanguagesComponent extends _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase {
  constructor(injector) {
    super(injector);
  }
  ngOnInit() {
    this.languages = (0,lodash_es__WEBPACK_IMPORTED_MODULE_1__["default"])(this.localization.languages, l => !l.isDisabled);
    this.currentLanguage = this.localization.currentLanguage;
  }
  changeLanguage(languageName) {
    abp.utils.setCookieValue('Abp.Localization.CultureName', languageName, new Date(new Date().getTime() + 5 * 365 * 86400000),
    // 5 year
    abp.appPath);
    location.reload();
  }
  static #_ = this.ɵfac = function AccountLanguagesComponent_Factory(t) {
    return new (t || AccountLanguagesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: AccountLanguagesComponent,
    selectors: [["account-languages"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]],
    decls: 1,
    vars: 0,
    consts: [[1, "text-center"]],
    template: function AccountLanguagesComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "div", 0);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
}

/***/ }),

/***/ 56188:
/*!**********************************************!*\
  !*** ./src/account/login/login.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginComponent: () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 18133);
/* harmony import */ var _shared_animations_routerTransition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/animations/routerTransition */ 42856);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _shared_auth_app_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/auth/app-auth.service */ 43728);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! abp-ng2-module */ 26173);
/* harmony import */ var _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/service-proxies/service-proxies */ 81801);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _shared_components_validation_abp_validation_summary_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/validation/abp-validation.summary.component */ 48339);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/dropdown */ 26895);
/* harmony import */ var _shared_pipes_localize_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/pipes/localize.pipe */ 54747);











function LoginComponent_img_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "img", 28);
  }
}
function LoginComponent_img_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "img", 29);
  }
}
class LoginComponent extends _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase {
  constructor(injector, authService, _sessionService, _accountServiceProxy) {
    super(injector);
    this.authService = authService;
    this._sessionService = _sessionService;
    this._accountServiceProxy = _accountServiceProxy;
    this.submitting = false;
    this.showPassword = false;
  }
  ngOnInit() {
    this.getItem();
  }
  getItem() {
    console.log(this._sessionService.userId);
    if (this._sessionService.tenantId) {
      console.log(this._sessionService.tenantId);
      this._accountServiceProxy.getFinancialYears(this._sessionService.tenantId).subscribe(result => {
        console.log(result.body.result);
        this.FinancialYears = result.body.result;
      });
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onSelectionChange(event) {
    const selectedValue = event.target.value;
    this.handleSelectionChange(selectedValue);
  }
  handleSelectionChange(value) {
    console.log("Handling selection change:", value);
    let fy = this.FinancialYears.find(item => item.id == value);
    if (fy) {
      localStorage.setItem("FinancialYearObject", JSON.stringify(fy));
    } else {
      localStorage.removeItem("FinancialYearObject");
    }
  }
  get multiTenancySideIsTeanant() {
    debugger;
    return this._sessionService.tenantId > 0;
  }
  get isSelfRegistrationAllowed() {
    if (!this._sessionService.tenantId) {
      return false;
    }
    return true;
  }
  login() {
    this.submitting = true;
    this.authService.authenticate(() => this.submitting = false);
  }
  static #_ = this.ɵfac = function LoginComponent_Factory(t) {
    return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_shared_auth_app_auth_service__WEBPACK_IMPORTED_MODULE_2__.AppAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_7__.AbpSessionService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_3__.AccountServiceProxy));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: LoginComponent,
    selectors: [["ng-component"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵInheritDefinitionFeature"]],
    decls: 53,
    vars: 28,
    consts: [["loginForm", "ngForm"], ["userNameOrEmailAddressModel", "ngModel", "userNameOrEmailAddressEl", ""], ["passwordModel", "ngModel", "passwordEl", ""], ["novalidate", "", "autocomplete", "off", 1, "d-flex", "flex-column", "gap-1", 3, "ngSubmit"], [1, "form-group", "mb-0", 2, "height", "106px"], [1, "login-dropdown", "input-group"], ["for", "", 1, "text-sm"], ["optionLabel", "name", "placeholder", "Select Financial Year", 1, "w-100", "text-sm", 3, "ngModelChange", "onChange", "options", "ngModel"], [3, "control", "controlEl"], [1, "form-group", "mb-0", "form-group-height", 2, "height", "106px"], [1, "input-group"], ["type", "text", "name", "userNameOrEmailAddress", "required", "", "maxlength", "256", 1, "form-control", 3, "ngModelChange", "ngModel", "placeholder"], [1, "input-group-append"], [1, "input-group-text", 2, "cursor", "pointer"], ["src", "assets/img/email.svg", "alt", ""], ["name", "password", "required", "", "maxlength", "32", 1, "form-control", 3, "ngModelChange", "type", "ngModel", "placeholder"], [1, "input-group-text", 2, "cursor", "pointer", 3, "click"], ["src", "assets/img/password.svg", "alt", "", 4, "ngIf"], ["src", "assets/img/eye.svg", "alt", "", 4, "ngIf"], [1, "form-group", "mb-0", "row"], [1, "col-md-12"], [1, "custom-control", "custom-checkbox", "float-right", "mb-4"], ["type", "checkbox", "id", "rememberMe", "name", "rememberMe", 1, "custom-control-input", 3, "ngModelChange", "ngModel"], ["for", "rememberMe", 1, "custom-control-label", "text-sm"], ["type", "submit", 1, "login-btn", "btn-block", 3, "disabled"], [1, "my-3", "d-flex", "justify-content-center", "align-items-center", "gap-2"], [1, "or-bar"], [1, "outline-btn", "btn-block"], ["src", "assets/img/password.svg", "alt", ""], ["src", "assets/img/eye.svg", "alt", ""]],
    template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div")(1, "form", 3, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_1_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.login());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 4)(4, "div", 5)(5, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "Financial Year");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "p-dropdown", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayListener"]("ngModelChange", function LoginComponent_Template_p_dropdown_ngModelChange_7_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayBindingSet"](ctx.selectedFinancialYear, $event) || (ctx.selectedFinancialYear = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onChange", function LoginComponent_Template_p_dropdown_onChange_7_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.onSelectionChange($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](8, "abp-validation-summary", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 9)(10, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, "Email address");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "div", 10)(13, "input", 11, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](16, "localize");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayListener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_13_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayBindingSet"](ctx.authService.authenticateModel.userNameOrEmailAddress, $event) || (ctx.authService.authenticateModel.userNameOrEmailAddress = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "div", 12)(18, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](19, "img", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](20, "abp-validation-summary", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "div", 9)(22, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](23, "Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](24, "div", 10)(25, "input", 15, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](28, "localize");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayListener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_25_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayBindingSet"](ctx.authService.authenticateModel.password, $event) || (ctx.authService.authenticateModel.password = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](29, "div", 12)(30, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function LoginComponent_Template_div_click_30_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.togglePasswordVisibility());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](31, LoginComponent_img_31_Template, 1, 0, "img", 17)(32, LoginComponent_img_32_Template, 1, 0, "img", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](33, "abp-validation-summary", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](34, "div", 19)(35, "div", 20)(36, "div", 21)(37, "input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayListener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_37_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayBindingSet"](ctx.authService.rememberMe, $event) || (ctx.authService.rememberMe = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](38, "label", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](39);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](40, "localize");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](41, "div", 20)(42, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](43);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](44, "localize");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](45, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](46, "span", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](47, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](48, "Or");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](49, "span", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](50, "div", 20)(51, "button", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](52, " Signup Now ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        const loginForm_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](2);
        const userNameOrEmailAddressModel_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](14);
        const userNameOrEmailAddressEl_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](15);
        const passwordModel_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](26);
        const passwordEl_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](27);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("@routerTransition", undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("options", ctx.FinancialYears);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayProperty"]("ngModel", ctx.selectedFinancialYear);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("control", userNameOrEmailAddressModel_r3)("controlEl", userNameOrEmailAddressEl_r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayProperty"]("ngModel", ctx.authService.authenticateModel.userNameOrEmailAddress);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](16, 20, "UserNameOrEmail"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("control", userNameOrEmailAddressModel_r3)("controlEl", userNameOrEmailAddressEl_r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("type", ctx.showPassword ? "text" : "password");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayProperty"]("ngModel", ctx.authService.authenticateModel.password);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](28, 22, "Password"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.showPassword);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.showPassword);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("control", passwordModel_r5)("controlEl", passwordEl_r6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayProperty"]("ngModel", ctx.authService.rememberMe);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](40, 24, "RememberMe"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", !loginForm_r2.form.valid || ctx.submitting);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](44, 26, "Login now"), " ");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgForm, _shared_components_validation_abp_validation_summary_component__WEBPACK_IMPORTED_MODULE_4__.AbpValidationSummaryComponent, primeng_dropdown__WEBPACK_IMPORTED_MODULE_10__.Dropdown, _shared_pipes_localize_pipe__WEBPACK_IMPORTED_MODULE_5__.LocalizePipe],
    encapsulation: 2,
    data: {
      animation: [(0,_shared_animations_routerTransition__WEBPACK_IMPORTED_MODULE_1__.accountModuleAnimation)()]
    }
  });
}

/***/ }),

/***/ 48520:
/*!****************************************************!*\
  !*** ./src/account/register/register.component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RegisterComponent: () => (/* binding */ RegisterComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 89475);
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 18133);
/* harmony import */ var _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/service-proxies/service-proxies */ 81801);
/* harmony import */ var _shared_animations_routerTransition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/animations/routerTransition */ 42856);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _shared_auth_app_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/auth/app-auth.service */ 43728);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _shared_components_validation_abp_validation_summary_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/validation/abp-validation.summary.component */ 48339);
/* harmony import */ var _shared_pipes_localize_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/pipes/localize.pipe */ 54747);











const _c0 = () => ["../login"];
class RegisterComponent extends _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase {
  constructor(injector, _accountService, _router, authService) {
    super(injector);
    this._accountService = _accountService;
    this._router = _router;
    this.authService = authService;
    this.model = new _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_1__.RegisterInput();
    this.saving = false;
  }
  save() {
    this.saving = true;
    this._accountService.register(this.model).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.finalize)(() => {
      this.saving = false;
    })).subscribe(result => {
      if (!result.canLogin) {
        this.notify.success(this.l('SuccessfullyRegistered'));
        this._router.navigate(['/login']);
        return;
      }
      // Autheticate
      this.saving = true;
      this.authService.authenticateModel.userNameOrEmailAddress = this.model.userName;
      this.authService.authenticateModel.password = this.model.password;
      this.authService.authenticate(() => {
        this.saving = false;
      });
    });
  }
  static #_ = this.ɵfac = function RegisterComponent_Factory(t) {
    return new (t || RegisterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_1__.AccountServiceProxy), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_auth_app_auth_service__WEBPACK_IMPORTED_MODULE_3__.AppAuthService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
    type: RegisterComponent,
    selectors: [["ng-component"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]],
    decls: 66,
    vars: 45,
    consts: [["registerForm", "ngForm"], ["nameModel", "ngModel", "nameEl", ""], ["surnameModel", "ngModel", "surnameEl", ""], ["emailAddressModel", "ngModel", "emailAddressEl", ""], ["userNameModel", "ngModel", "userNameEl", ""], ["passwordModel", "ngModel", "passwordEl", ""], [1, "text-center", "mb-3"], ["autocomplete", "off", 3, "ngSubmit"], [1, "form-group"], [1, "input-group"], ["type", "text", "name", "name", "required", "", "maxlength", "64", 1, "form-control", 3, "ngModelChange", "placeholder", "ngModel"], [1, "input-group-append"], [1, "input-group-text"], [1, "fas", "fa-arrow-left"], [3, "control", "controlEl"], ["type", "text", "name", "surname", "required", "", "maxlength", "64", 1, "form-control", 3, "ngModelChange", "placeholder", "ngModel"], ["type", "email", "name", "emailAddress", "required", "", "maxlength", "256", "pattern", "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{1,})+$", 1, "form-control", 3, "ngModelChange", "placeholder", "ngModel"], [1, "fas", "fa-envelope"], ["type", "email", "name", "userName", "required", "", "maxlength", "32", 1, "form-control", 3, "ngModelChange", "placeholder", "ngModel"], [1, "fas", "fa-user"], ["type", "password", "name", "password", "required", "", "maxlength", "32", 1, "form-control", 3, "ngModelChange", "placeholder", "ngModel"], [1, "fas", "fa-lock"], [1, "row"], [1, "col-8"], ["type", "button", 1, "btn", "btn-default", 3, "disabled", "routerLink"], [1, "fa", "fa-arrow-circle-left"], [1, "col-4"], ["type", "submit", 1, "btn", "btn-primary", "btn-block", 3, "disabled"]],
    template: function RegisterComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div")(1, "h4", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "localize");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "form", 7, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngSubmit", function RegisterComponent_Template_form_ngSubmit_4_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.save());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "div", 8)(7, "div", 9)(8, "input", 10, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](11, "localize");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayListener"]("ngModelChange", function RegisterComponent_Template_input_ngModelChange_8_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayBindingSet"](ctx.model.name, $event) || (ctx.model.name = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "div", 11)(13, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](14, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](15, "abp-validation-summary", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](16, "div", 8)(17, "div", 9)(18, "input", 15, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](21, "localize");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayListener"]("ngModelChange", function RegisterComponent_Template_input_ngModelChange_18_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayBindingSet"](ctx.model.surname, $event) || (ctx.model.surname = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](22, "div", 11)(23, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](24, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](25, "abp-validation-summary", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](26, "div", 8)(27, "div", 9)(28, "input", 16, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](31, "localize");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayListener"]("ngModelChange", function RegisterComponent_Template_input_ngModelChange_28_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayBindingSet"](ctx.model.emailAddress, $event) || (ctx.model.emailAddress = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](32, "div", 11)(33, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](34, "span", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](35, "abp-validation-summary", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](36, "div", 8)(37, "div", 9)(38, "input", 18, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](41, "localize");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayListener"]("ngModelChange", function RegisterComponent_Template_input_ngModelChange_38_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayBindingSet"](ctx.model.userName, $event) || (ctx.model.userName = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](42, "div", 11)(43, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](44, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](45, "abp-validation-summary", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](46, "div", 8)(47, "div", 9)(48, "input", 20, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](51, "localize");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayListener"]("ngModelChange", function RegisterComponent_Template_input_ngModelChange_48_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayBindingSet"](ctx.model.password, $event) || (ctx.model.password = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](52, "div", 11)(53, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](54, "span", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](55, "abp-validation-summary", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](56, "div", 22)(57, "div", 23)(58, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](59, "i", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](60);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](61, "localize");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](62, "div", 26)(63, "button", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](64);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](65, "localize");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()()();
      }
      if (rf & 2) {
        const registerForm_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](5);
        const nameModel_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](9);
        const nameEl_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](10);
        const surnameModel_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](19);
        const surnameEl_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](20);
        const emailAddressModel_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](29);
        const emailAddressEl_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](30);
        const userNameModel_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](39);
        const userNameEl_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](40);
        const passwordModel_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](49);
        const passwordEl_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](50);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("@routerTransition", undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 28, "Register"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](11, 30, "Name"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayProperty"]("ngModel", ctx.model.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("control", nameModel_r3)("controlEl", nameEl_r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](21, 32, "Surname"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayProperty"]("ngModel", ctx.model.surname);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("control", surnameModel_r5)("controlEl", surnameEl_r6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](31, 34, "EmailAddress"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayProperty"]("ngModel", ctx.model.emailAddress);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("control", emailAddressModel_r7)("controlEl", emailAddressEl_r8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate1"]("placeholder", " ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](41, 36, "UserName"), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayProperty"]("ngModel", ctx.model.userName);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("control", userNameModel_r9)("controlEl", userNameEl_r10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](51, 38, "Password"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayProperty"]("ngModel", ctx.model.password);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("control", passwordModel_r11)("controlEl", passwordEl_r12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", ctx.saving)("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](44, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](61, 40, "Back"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", !registerForm_r2.form.valid || ctx.saving);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](65, 42, "Register"), " ");
      }
    },
    dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_9__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.PatternValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgForm, _shared_components_validation_abp_validation_summary_component__WEBPACK_IMPORTED_MODULE_4__.AbpValidationSummaryComponent, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterLink, _shared_pipes_localize_pipe__WEBPACK_IMPORTED_MODULE_5__.LocalizePipe],
    encapsulation: 2,
    data: {
      animation: [(0,_shared_animations_routerTransition__WEBPACK_IMPORTED_MODULE_2__.accountModuleAnimation)()]
    }
  });
}

/***/ }),

/***/ 79852:
/*!**************************************************************!*\
  !*** ./src/account/tenant/tenant-change-dialog.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TenantChangeDialogComponent: () => (/* binding */ TenantChangeDialogComponent)
/* harmony export */ });
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 18133);
/* harmony import */ var _shared_AppEnums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/AppEnums */ 80007);
/* harmony import */ var _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/service-proxies/service-proxies */ 81801);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap/modal */ 2457);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _shared_components_modal_abp_modal_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/modal/abp-modal-header.component */ 417);
/* harmony import */ var _shared_components_modal_abp_modal_footer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/modal/abp-modal-footer.component */ 42991);
/* harmony import */ var _shared_pipes_localize_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/pipes/localize.pipe */ 54747);










class TenantChangeDialogComponent extends _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase {
  constructor(injector, _accountService, bsModalRef) {
    super(injector);
    this._accountService = _accountService;
    this.bsModalRef = bsModalRef;
    this.saving = false;
    this.tenancyName = '';
  }
  save() {
    if (!this.tenancyName) {
      abp.multiTenancy.setTenantIdCookie(undefined);
      this.bsModalRef.hide();
      location.reload();
      return;
    }
    const input = new _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_2__.IsTenantAvailableInput();
    input.tenancyName = this.tenancyName;
    this.saving = true;
    this._accountService.isTenantAvailable(input).subscribe(result => {
      switch (result.state) {
        case _shared_AppEnums__WEBPACK_IMPORTED_MODULE_1__.AppTenantAvailabilityState.Available:
          abp.multiTenancy.setTenantIdCookie(result.tenantId);
          location.reload();
          return;
        case _shared_AppEnums__WEBPACK_IMPORTED_MODULE_1__.AppTenantAvailabilityState.InActive:
          this.message.warn(this.l('TenantIsNotActive', this.tenancyName));
          break;
        case _shared_AppEnums__WEBPACK_IMPORTED_MODULE_1__.AppTenantAvailabilityState.NotFound:
          this.message.warn(this.l('ThereIsNoTenantDefinedWithName{0}', this.tenancyName));
          break;
      }
    }, () => {
      this.saving = false;
    });
  }
  static #_ = this.ɵfac = function TenantChangeDialogComponent_Factory(t) {
    return new (t || TenantChangeDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_2__.AccountServiceProxy), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__.BsModalRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: TenantChangeDialogComponent,
    selectors: [["ng-component"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵInheritDefinitionFeature"]],
    decls: 16,
    vars: 12,
    consts: [["changeTenantForm", "ngForm"], ["autocomplete", "off", 1, "form-horizontal", 3, "ngSubmit"], [3, "onCloseClick", "title"], [1, "modal-body"], [1, "form-group", "row"], ["for", "tenancyName", 1, "col-md-3", "col-form-label"], [1, "col-md-9"], ["type", "text", "id", "tenancyName", "name", "tenancyName", "maxlength", "64", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "fa", "fa-info-circle"], [3, "onCancelClick", "cancelDisabled", "saveDisabled"]],
    template: function TenantChangeDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "form", 1, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngSubmit", function TenantChangeDialogComponent_Template_form_ngSubmit_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.save());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "abp-modal-header", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "localize");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onCloseClick", function TenantChangeDialogComponent_Template_abp_modal_header_onCloseClick_2_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.bsModalRef.hide());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 3)(5, "div", 4)(6, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](8, "localize");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 6)(10, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayListener"]("ngModelChange", function TenantChangeDialogComponent_Template_input_ngModelChange_10_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayBindingSet"](ctx.tenancyName, $event) || (ctx.tenancyName = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "i", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](14, "localize");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "abp-modal-footer", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onCancelClick", function TenantChangeDialogComponent_Template_abp_modal_footer_onCancelClick_15_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.bsModalRef.hide());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        const changeTenantForm_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 6, "ChangeTenant"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](8, 8, "TenancyName"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayProperty"]("ngModel", ctx.tenancyName);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](14, 10, "LeaveEmptyToSwitchToHost"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("cancelDisabled", ctx.saving)("saveDisabled", !changeTenantForm_r2.form.valid || ctx.saving);
      }
    },
    dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgForm, _shared_components_modal_abp_modal_header_component__WEBPACK_IMPORTED_MODULE_3__.AbpModalHeaderComponent, _shared_components_modal_abp_modal_footer_component__WEBPACK_IMPORTED_MODULE_4__.AbpModalFooterComponent, _shared_pipes_localize_pipe__WEBPACK_IMPORTED_MODULE_5__.LocalizePipe],
    encapsulation: 2
  });
}

/***/ }),

/***/ 40257:
/*!*******************************************************!*\
  !*** ./src/account/tenant/tenant-change.component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TenantChangeComponent: () => (/* binding */ TenantChangeComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 10819);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 52575);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 33900);
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 18133);
/* harmony import */ var _shared_AppEnums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/AppEnums */ 80007);
/* harmony import */ var _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/service-proxies/service-proxies */ 81801);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _shared_pipes_localize_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/pipes/localize.pipe */ 54747);










function TenantChangeComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "label", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](5, "localize");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](9, "localize");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "div", 7)(11, "input", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](12, "localize");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function TenantChangeComponent_div_0_Template_input_ngModelChange_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.inputTenancyName, $event) || (ctx_r1.inputTenancyName = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function TenantChangeComponent_div_0_Template_input_ngModelChange_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.onInputChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](5, 4, "Select Tenancy"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](9, 6, "LeaveEmptyToSwitchToHost"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](12, 8, "Enter tenant name..."));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.inputTenancyName);
  }
}
class TenantChangeComponent extends _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase {
  constructor(injector, _accountService) {
    super(injector);
    this._accountService = _accountService;
    this.tenancyName = '';
    this.name = '';
    this.saving = false;
    this.inputTenancyName = '';
    this.inputChanged = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
    this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
  }
  get isMultiTenancyEnabled() {
    return abp.multiTenancy.isEnabled;
  }
  ngOnInit() {
    // Initialize the tenant details
    if (this.appSession.tenant) {
      this.tenancyName = this.appSession.tenant.tenancyName;
      this.name = this.appSession.tenant.name;
    }
    this.inputTenancyName = this.tenancyName;
    // Handle input changes with debounce
    this.inputChanged.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.debounceTime)(2000), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.takeUntil)(this.destroy$)).subscribe(tenantName => {
      this.changeTenantWithDebounce(tenantName);
    });
  }
  onInputChange(value) {
    this.inputChanged.next(value);
  }
  changeTenantWithDebounce(tenantName) {
    if (!tenantName) {
      abp.multiTenancy.setTenantIdCookie(undefined);
      location.reload();
      return;
    }
    const input = new _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_2__.IsTenantAvailableInput();
    input.tenancyName = tenantName;
    this.saving = true;
    this._accountService.isTenantAvailable(input).subscribe(result => {
      this.saving = false;
      switch (result.state) {
        case _shared_AppEnums__WEBPACK_IMPORTED_MODULE_1__.AppTenantAvailabilityState.Available:
          abp.multiTenancy.setTenantIdCookie(result.tenantId);
          this.tenancyName = tenantName;
          location.reload();
          return;
        case _shared_AppEnums__WEBPACK_IMPORTED_MODULE_1__.AppTenantAvailabilityState.InActive:
          this.message.warn(this.l('TenantIsNotActive', tenantName));
          break;
        case _shared_AppEnums__WEBPACK_IMPORTED_MODULE_1__.AppTenantAvailabilityState.NotFound:
          this.message.warn(this.l('ThereIsNoTenantDefinedWithName{0}', tenantName));
          break;
      }
    }, () => {
      this.saving = false;
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static #_ = this.ɵfac = function TenantChangeComponent_Factory(t) {
    return new (t || TenantChangeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_2__.AccountServiceProxy));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: TenantChangeComponent,
    selectors: [["tenant-change"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]],
    decls: 1,
    vars: 1,
    consts: [["class", "text-center text-sm tenant-change-component", 4, "ngIf"], [1, "text-center", "text-sm", "tenant-change-component"], [1, "form-group", "mb-0", "form-group-height", 2, "height", "84px", "margin-top", "4px"], [1, "d-flex", "align-items-center", "gap-2", "w-100"], ["for", "tenancyName", 1, "text-left", "text-sm", "tenancy-lable"], [1, "fa", "fa-info-circle", "tenancy-info-icon", 2, "cursor", "pointer", "margin-top", "-6px"], [1, "tenancy-info", 2, "font-size", "10px", "margin-top", "-12px", "margin-left", "-4px", "color", "#019999"], [1, "input-group"], ["id", "tenancyName", "name", "inputTenancyName", "required", "", "maxlength", "64", 1, "form-control", 2, "height", "50px !important", 3, "ngModelChange", "ngModel", "placeholder"]],
    template: function TenantChangeComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, TenantChangeComponent_div_0_Template, 13, 10, "div", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.isMultiTenancyEnabled);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _shared_pipes_localize_pipe__WEBPACK_IMPORTED_MODULE_3__.LocalizePipe],
    encapsulation: 2
  });
}

/***/ }),

/***/ 80007:
/*!********************************!*\
  !*** ./src/shared/AppEnums.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppTenantAvailabilityState: () => (/* binding */ AppTenantAvailabilityState)
/* harmony export */ });
/* harmony import */ var _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/service-proxies/service-proxies */ 81801);

class AppTenantAvailabilityState {
  static #_ = this.Available = _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_0__.TenantAvailabilityState._1;
  static #_2 = this.InActive = _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_0__.TenantAvailabilityState._2;
  static #_3 = this.NotFound = _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_0__.TenantAvailabilityState._3;
}

/***/ }),

/***/ 52575:
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/operators/debounceTime.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounceTime: () => (/* binding */ debounceTime)
/* harmony export */ });
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/async */ 18473);
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ 50819);
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OperatorSubscriber */ 91687);



function debounceTime(dueTime, scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_0__.asyncScheduler) {
  return (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)((source, subscriber) => {
    let activeTask = null;
    let lastValue = null;
    let lastTime = null;
    const emit = () => {
      if (activeTask) {
        activeTask.unsubscribe();
        activeTask = null;
        const value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
    };
    function emitWhenIdle() {
      const targetTime = lastTime + dueTime;
      const now = scheduler.now();
      if (now < targetTime) {
        activeTask = this.schedule(undefined, targetTime - now);
        subscriber.add(activeTask);
        return;
      }
      emit();
    }
    source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__.createOperatorSubscriber)(subscriber, value => {
      lastValue = value;
      lastTime = scheduler.now();
      if (!activeTask) {
        activeTask = scheduler.schedule(emitWhenIdle, dueTime);
        subscriber.add(activeTask);
      }
    }, () => {
      emit();
      subscriber.complete();
    }, undefined, () => {
      lastValue = activeTask = null;
    }));
  });
}

/***/ })

}]);
//# sourceMappingURL=src_account_account_module_ts.js.map