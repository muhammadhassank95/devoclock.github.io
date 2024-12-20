"use strict";
(self["webpackChunkERP"] = self["webpackChunkERP"] || []).push([["src_app_main_commercial_commercial_module_ts"],{

/***/ 55090:
/*!**********************************************************************!*\
  !*** ./src/app/main/commercial/Shared/Dtos/service-quotation-dto.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ServiceQuotation: () => (/* binding */ ServiceQuotation)
/* harmony export */ });
class ServiceQuotation {}

/***/ }),

/***/ 71960:
/*!**************************************************************!*\
  !*** ./src/app/main/commercial/commercial-routing.module.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommercialRoutingModule: () => (/* binding */ CommercialRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _setup_forms_voucher_status_voucher_status_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setup forms/voucher-status/voucher-status.component */ 70514);
/* harmony import */ var _service_quotation_service_quotation_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service-quotation/service-quotation.component */ 54035);
/* harmony import */ var _setup_forms_sales_tax_type_sales_tax_type_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setup forms/sales-tax-type/sales-tax-type.component */ 71586);
/* harmony import */ var _sales_invoice_sales_invoice_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sales-invoice/sales-invoice.component */ 99643);
/* harmony import */ var _service_quotation_filters_service_quotation_filters_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./service-quotation-filters/service-quotation-filters.component */ 47775);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37580);








const routes = [{
  path: "",
  children: [{
    path: "voucher-status",
    component: _setup_forms_voucher_status_voucher_status_component__WEBPACK_IMPORTED_MODULE_0__.VoucherStatusComponent
  }, {
    path: "sales-tax-type",
    component: _setup_forms_sales_tax_type_sales_tax_type_component__WEBPACK_IMPORTED_MODULE_2__.SalesTaxTypeComponent
  }, {
    path: "service-quatation",
    component: _service_quotation_service_quotation_component__WEBPACK_IMPORTED_MODULE_1__.ServiceQuotationComponent
  }, {
    path: "sale-invoice",
    component: _sales_invoice_sales_invoice_component__WEBPACK_IMPORTED_MODULE_3__.SalesInvoiceComponent
  }, {
    path: "service-quotation-invoice-filters",
    component: _service_quotation_filters_service_quotation_filters_component__WEBPACK_IMPORTED_MODULE_4__.ServiceQuotationFiltersComponent
  }]
}];
class CommercialRoutingModule {
  static #_ = this.ɵfac = function CommercialRoutingModule_Factory(t) {
    return new (t || CommercialRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
    type: CommercialRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](CommercialRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
  });
})();

/***/ }),

/***/ 1929:
/*!******************************************************!*\
  !*** ./src/app/main/commercial/commercial.module.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommercialModule: () => (/* binding */ CommercialModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _commercial_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commercial-routing.module */ 71960);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/button */ 49136);
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/dialog */ 16280);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/table */ 76676);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/paginator */ 43157);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/toolbar */ 31973);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/inputtext */ 48361);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/calendar */ 41314);
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ag-grid-angular */ 34733);
/* harmony import */ var primeng_checkbox__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/checkbox */ 26771);
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/confirmdialog */ 68160);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! primeng/toast */ 61225);
/* harmony import */ var primeng_tabview__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primeng/tabview */ 634);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _main_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../main.module */ 12007);
/* harmony import */ var primeng_floatlabel__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! primeng/floatlabel */ 61740);
/* harmony import */ var primeng_radiobutton__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! primeng/radiobutton */ 54665);
/* harmony import */ var primeng_inputmask__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! primeng/inputmask */ 32084);
/* harmony import */ var primeng_multiselect__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! primeng/multiselect */ 92159);
/* harmony import */ var primeng_menu__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! primeng/menu */ 23673);
/* harmony import */ var ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ngx-bootstrap/dropdown */ 54195);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/shared.module */ 31699);
/* harmony import */ var primeng_inputswitch__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! primeng/inputswitch */ 46764);
/* harmony import */ var _setup_forms_voucher_status_voucher_status_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./setup forms/voucher-status/voucher-status.component */ 70514);
/* harmony import */ var _service_quotation_service_quotation_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./service-quotation/service-quotation.component */ 54035);
/* harmony import */ var _setup_forms_sales_tax_type_sales_tax_type_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./setup forms/sales-tax-type/sales-tax-type.component */ 71586);
/* harmony import */ var _sales_invoice_sales_invoice_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sales-invoice/sales-invoice.component */ 99643);
/* harmony import */ var _service_quotation_filters_service_quotation_filters_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./service-quotation-filters/service-quotation-filters.component */ 47775);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 37580);






























class CommercialModule {
  static #_ = this.ɵfac = function CommercialModule_Factory(t) {
    return new (t || CommercialModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
    type: CommercialModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, _commercial_routing_module__WEBPACK_IMPORTED_MODULE_0__.CommercialRoutingModule, primeng_button__WEBPACK_IMPORTED_MODULE_10__.ButtonModule, primeng_dialog__WEBPACK_IMPORTED_MODULE_11__.DialogModule, primeng_table__WEBPACK_IMPORTED_MODULE_12__.TableModule, primeng_paginator__WEBPACK_IMPORTED_MODULE_13__.PaginatorModule, primeng_toolbar__WEBPACK_IMPORTED_MODULE_14__.ToolbarModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_15__.InputTextModule, primeng_calendar__WEBPACK_IMPORTED_MODULE_16__.CalendarModule, ag_grid_angular__WEBPACK_IMPORTED_MODULE_17__.AgGridAngular, primeng_checkbox__WEBPACK_IMPORTED_MODULE_18__.CheckboxModule, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_19__.ConfirmDialogModule, primeng_toast__WEBPACK_IMPORTED_MODULE_20__.ToastModule, primeng_tabview__WEBPACK_IMPORTED_MODULE_21__.TabViewModule, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.ReactiveFormsModule, _main_module__WEBPACK_IMPORTED_MODULE_1__.MainModule, primeng_floatlabel__WEBPACK_IMPORTED_MODULE_23__.FloatLabelModule, primeng_radiobutton__WEBPACK_IMPORTED_MODULE_24__.RadioButtonModule, primeng_inputmask__WEBPACK_IMPORTED_MODULE_25__.InputMaskModule, primeng_multiselect__WEBPACK_IMPORTED_MODULE_26__.MultiSelectModule, primeng_menu__WEBPACK_IMPORTED_MODULE_27__.MenuModule, ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_28__.BsDropdownModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule, primeng_inputswitch__WEBPACK_IMPORTED_MODULE_29__.InputSwitchModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](CommercialModule, {
    declarations: [_setup_forms_voucher_status_voucher_status_component__WEBPACK_IMPORTED_MODULE_3__.VoucherStatusComponent, _service_quotation_service_quotation_component__WEBPACK_IMPORTED_MODULE_4__.ServiceQuotationComponent, _setup_forms_sales_tax_type_sales_tax_type_component__WEBPACK_IMPORTED_MODULE_5__.SalesTaxTypeComponent, _sales_invoice_sales_invoice_component__WEBPACK_IMPORTED_MODULE_6__.SalesInvoiceComponent, _service_quotation_filters_service_quotation_filters_component__WEBPACK_IMPORTED_MODULE_7__.ServiceQuotationFiltersComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, _commercial_routing_module__WEBPACK_IMPORTED_MODULE_0__.CommercialRoutingModule, primeng_button__WEBPACK_IMPORTED_MODULE_10__.ButtonModule, primeng_dialog__WEBPACK_IMPORTED_MODULE_11__.DialogModule, primeng_table__WEBPACK_IMPORTED_MODULE_12__.TableModule, primeng_paginator__WEBPACK_IMPORTED_MODULE_13__.PaginatorModule, primeng_toolbar__WEBPACK_IMPORTED_MODULE_14__.ToolbarModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_15__.InputTextModule, primeng_calendar__WEBPACK_IMPORTED_MODULE_16__.CalendarModule, ag_grid_angular__WEBPACK_IMPORTED_MODULE_17__.AgGridAngular, primeng_checkbox__WEBPACK_IMPORTED_MODULE_18__.CheckboxModule, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_19__.ConfirmDialogModule, primeng_toast__WEBPACK_IMPORTED_MODULE_20__.ToastModule, primeng_tabview__WEBPACK_IMPORTED_MODULE_21__.TabViewModule, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.ReactiveFormsModule, _main_module__WEBPACK_IMPORTED_MODULE_1__.MainModule, primeng_floatlabel__WEBPACK_IMPORTED_MODULE_23__.FloatLabelModule, primeng_radiobutton__WEBPACK_IMPORTED_MODULE_24__.RadioButtonModule, primeng_inputmask__WEBPACK_IMPORTED_MODULE_25__.InputMaskModule, primeng_multiselect__WEBPACK_IMPORTED_MODULE_26__.MultiSelectModule, primeng_menu__WEBPACK_IMPORTED_MODULE_27__.MenuModule, ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_28__.BsDropdownModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule, primeng_inputswitch__WEBPACK_IMPORTED_MODULE_29__.InputSwitchModule]
  });
})();

/***/ }),

/***/ 99643:
/*!**************************************************************************!*\
  !*** ./src/app/main/commercial/sales-invoice/sales-invoice.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SalesInvoiceComponent: () => (/* binding */ SalesInvoiceComponent)
/* harmony export */ });
/* harmony import */ var _Users_muhammadhassankhan_Documents_devoclock_github_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 89475);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 61318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 77919);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ 39545);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _budget_shared_Dtos_restriction_dto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../budget/shared/Dtos/restriction-dto */ 97223);
/* harmony import */ var _shared_Utials_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/Utials/utils */ 2584);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _app_main_finance_Shared_Services_finance_module_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/main/finance/Shared/Services/finance-module.service */ 33460);
/* harmony import */ var _budget_shared_services_restriction_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../budget/shared/services/restriction.service */ 92076);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/api */ 17780);
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-bootstrap/modal */ 2457);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/button */ 49136);
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/dialog */ 16280);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/table */ 76676);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/paginator */ 43157);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/toolbar */ 31973);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! primeng/inputtext */ 48361);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primeng/calendar */ 41314);
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ag-grid-angular */ 34733);
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! primeng/confirmdialog */ 68160);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! primeng/toast */ 61225);
/* harmony import */ var primeng_tabview__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! primeng/tabview */ 634);
/* harmony import */ var _shared_components_picker_picker_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/components/picker/picker.component */ 79023);

























const _c0 = () => ({
  width: "100%",
  "overflow-y": "auto"
});
const _c1 = () => ["userLocationName", "voucherNumber", "supplierName", "issueDate", "status"];
const _c2 = a0 => [a0, 5, 20, 100];
const _c3 = () => [5, 10, 20];
function SalesInvoiceComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "Sales Invoice");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function SalesInvoiceComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "span", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "span", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function SalesInvoiceComponent_ng_template_2_Template_span_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r2.show());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "span", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "i", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "input", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("input", function SalesInvoiceComponent_ng_template_2_Template_input_input_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      const policyTable_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r2.onGlobalFilter(policyTable_r4, $event));
    })("keydown.enter", function SalesInvoiceComponent_ng_template_2_Template_input_keydown_enter_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r2.onEnter($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
}
function SalesInvoiceComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "tr")(1, "th", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, " Actions ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "p-sortIcon", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "th", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5, " Voucher No ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](6, "p-sortIcon", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "th", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](8, " IssueDate ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](9, "p-sortIcon", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "th", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](11, " ClientName ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](12, "p-sortIcon", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "th", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](14, " Status ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](15, "p-sortIcon", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
}
function SalesInvoiceComponent_ng_template_7_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function SalesInvoiceComponent_ng_template_7_span_2_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r5);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r2.viewOnly(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function SalesInvoiceComponent_ng_template_7_span_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function SalesInvoiceComponent_ng_template_7_span_3_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r2.edit(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function SalesInvoiceComponent_ng_template_7_span_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function SalesInvoiceComponent_ng_template_7_span_4_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r8);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r2.delete(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function SalesInvoiceComponent_ng_template_7_span_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function SalesInvoiceComponent_ng_template_7_span_5_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r9);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r2.approve(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function SalesInvoiceComponent_ng_template_7_span_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](item_r6.status);
  }
}
function SalesInvoiceComponent_ng_template_7_span_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](item_r6.status);
  }
}
function SalesInvoiceComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, SalesInvoiceComponent_ng_template_7_span_2_Template, 1, 0, "span", 83)(3, SalesInvoiceComponent_ng_template_7_span_3_Template, 1, 0, "span", 84)(4, SalesInvoiceComponent_ng_template_7_span_4_Template, 1, 0, "span", 85)(5, SalesInvoiceComponent_ng_template_7_span_5_Template, 1, 0, "span", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](10, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](14, SalesInvoiceComponent_ng_template_7_span_14_Template, 2, 1, "span", 87)(15, SalesInvoiceComponent_ng_template_7_span_15_Template, 2, 1, "span", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", item_r6.status == "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", item_r6.status !== "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", item_r6.status !== "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", item_r6.status === "PENDING" || item_r6.status == "UNAPPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](item_r6.voucherNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](10, 9, item_r6.issueDate));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](item_r6.supplierName);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", item_r6.status == "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", item_r6.status != "APPROVED");
  }
}
function SalesInvoiceComponent_div_88_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 23)(1, "app-picker", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("valueSelected", function SalesInvoiceComponent_div_88_Template_app_picker_valueSelected_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r10);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r2.setPickerValue($event, "ChartOfAccount"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("title", "PST ChartOfAccount")("title2", "Tax")("filterWiseChartOfAccTarget", "Tax")("id", ctx_r2.salesInoviceForm.value.pstChartOfAccountSerialNumber)("name", ctx_r2.salesInoviceForm.value.pstChartOfAccountName);
  }
}
function SalesInvoiceComponent_p_button_112_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "p-button", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function SalesInvoiceComponent_p_button_112_Template_p_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r11);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r2.create());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("loading", ctx_r2.saving)("outlined", true);
  }
}
function SalesInvoiceComponent_p_button_113_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "p-button", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function SalesInvoiceComponent_p_button_113_Template_p_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r12);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r2.update());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("loading", ctx_r2.saving)("outlined", true);
  }
}
function SalesInvoiceComponent_ng_template_118_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "tr")(1, "th", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, " ID ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "p-sortIcon", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "th", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5, " Voucher No ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](6, "p-sortIcon", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "th", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](8, " Issue Date ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](9, "p-sortIcon", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "th", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](11, " Actions ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](12, "p-sortIcon", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
}
function SalesInvoiceComponent_ng_template_119_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](7, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "td")(9, "button", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function SalesInvoiceComponent_ng_template_119_Template_button_click_9_listener() {
      const item_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r13).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r2.SelectServiceQuotation(item_r14.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const item_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](item_r14.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](item_r14.voucherNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind2"](7, 3, item_r14.issueDate, "yyyy-MM-dd"));
  }
}
class SalesInvoiceComponent {
  constructor(fb, _financeModuleService, _restrictionService, messageService, suggestionService, confirmationService) {
    this.fb = fb;
    this._financeModuleService = _financeModuleService;
    this._restrictionService = _restrictionService;
    this.messageService = messageService;
    this.suggestionService = suggestionService;
    this.confirmationService = confirmationService;
    this.restrictionDto = new _budget_shared_Dtos_restriction_dto__WEBPACK_IMPORTED_MODULE_2__.RestrictionDto();
    this.today = new Date();
    this.MinDate = new Date();
    this.currentPage = 1;
    this.dto = {
      skipCount: 0,
      maxCount: 5,
      DocOrVocNumber: ""
    };
    this.target = "ServiceQuotationInvoice";
    this.colDefs = [{
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      width: 90,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true
    }, {
      headerName: "Job ID",
      editable: false,
      field: "serviceItemId",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Job Title",
      editable: false,
      field: "serviceItemName",
      width: 300,
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Item ID",
      editable: false,
      field: "inventoryItemId",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Item Title",
      editable: false,
      field: "inventoryItemName",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "For Location ID",
      editable: false,
      field: "locationId",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "For Location Title",
      editable: false,
      field: "locationName",
      resizable: true,
      width: 300,
      suppressSizeToFit: true
    }, {
      headerName: "Client Item Code",
      editable: false,
      field: "clientItemCode",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Client Item Title",
      editable: false,
      field: "clientItemTitle",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Remarks ",
      editable: false,
      field: "remarks",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Ref Voucher No ",
      editable: false,
      field: "referenceVoucherNumber",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Offer Qty",
      editable: false,
      field: "offerQty",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Ack Client Qty",
      editable: false,
      field: "acknowledgedClientQty",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Final Qty",
      editable: false,
      field: "finalQty",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Gross Rate",
      editable: false,
      field: "grossRate",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Total Amount",
      editable: false,
      field: "totalAmount",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "GST %",
      editable: false,
      field: "gstPercentage",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "GST Amount",
      editable: false,
      field: "gstAmount",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "PST %",
      editable: false,
      field: "pstPercentage",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "PST Amount",
      editable: false,
      field: "pstAmount",
      resizable: true,
      suppressSizeToFit: true
    }, {
      field: "businessMonth",
      headerName: "Buy Date",
      editable: false,
      cellEditor: "agDateCellEditor",
      valueFormatter: params => {
        if (params.value) {
          const date = new Date(params.value);
          return date.toISOString().split("T")[0]; // Format date as yyyy-mm-dd
        }
        return "";
      },
      valueParser: params => {
        return new Date(params.newValue); // Parse string to Date object
      }
    }, {
      headerName: "Reference Number",
      editable: false,
      field: "referenceNumber",
      resizable: true,
      suppressSizeToFit: true
    }];
    this.salesInoviceForm = this.fb.group({
      issueDate: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required],
      voucherNumber: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required],
      supplierId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required],
      supplierName: [""],
      supplierSerialNumber: "",
      employeeId: [null],
      employeeName: [""],
      employeeErpId: "",
      salesmanName: [""],
      referenceNumber: [""],
      attentionPerson: [""],
      userLocationId: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required]],
      userLocationName: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required]],
      remarks: [""],
      grossAmount: [{
        value: "",
        disabled: true
      }],
      totalAmount: [{
        value: "",
        disabled: true
      }],
      gstPercentage: [{
        value: ""
      }],
      gstAmount: [{
        value: ""
      }],
      pstPercentage: [{
        value: ""
      }],
      pstAmount: [{
        value: ""
      }],
      designation: [""],
      invoiceSubmissionDate: [""],
      businessMonth: [""],
      costCenterId: "",
      costCenterName: "",
      projectId: "",
      projectName: "",
      // regionId: "",
      // regionName: "",
      // subject: "",
      // terms: "",
      // origin: "",
      // validity: "",
      // startingComments: "",
      // paragraph: "",
      // endingComments: "",
      voucherStatusId: "",
      voucherStatusName: "",
      pstChartOfAccountId: [""],
      pstChartOfAccountName: [""],
      pstChartOfAccountSerialNumber: "",
      serviceQuotationInvoiceDetails: [[]]
    });
    this.salesInoviceForm.get("gstPercentage")?.valueChanges.subscribe(value => {
      if (value) {
        this.salesInoviceForm.get("pstPercentage")?.disable();
      } else {
        this.salesInoviceForm.get("pstPercentage")?.enable();
      }
    });
    this.salesInoviceForm.get("pstPercentage")?.valueChanges.subscribe(value => {
      if (value) {
        this.salesInoviceForm.get("gstPercentage")?.disable();
      } else {
        this.salesInoviceForm.get("gstPercentage")?.enable();
      }
    });
  }
  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("SI");
  }
  show(id) {
    if (id) {
      this._financeModuleService.getDataForEdit(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
        debugger;
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.error.error.message);
      })).subscribe({
        next: response => {
          debugger;
          this.dataForEdit = response;
          this.salesInoviceForm.patchValue({
            ...response,
            employeeErpId: this.dataForEdit.employeeErpId,
            issueDate: new Date(response.issueDate),
            invoiceSubmissionDate: new Date(response.invoiceSubmissionDate),
            businessMonth: new Date(response.businessMonth)
          });
          this.rowData = response.serviceQuotationInvoiceDetails;
          this.displaySaleInvoice = true;
        }
      });
    } else {
      if (!this.restrictionDto.isCreationAllowed) {
        this.messageService.add({
          severity: "info",
          summary: "Info",
          detail: "Creation Restricted"
        });
        return;
      }
      debugger;
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.getDefaultLocation("Location", "locationName", "locationId", "");
      this.editMode = false;
      this.viewMode = false;
      this.rowData = [];
      this.displaySaleInvoice = true;
      this.salesInoviceForm.reset();
      this.salesInoviceForm.enable();
      this.salesInoviceForm.get("issueDate").setValue(this.today);
    }
  }
  getAll() {
    this._financeModuleService.getAll(this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
      debugger;
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.data = response.items;
        this.count = response.totalCount;
      }
    });
  }
  create() {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.saving = true;
        var tempArr = [];
        this.gridApi.forEachNode((node, index) => {
          const {
            id,
            ...rest
          } = node.data;
          var tempObj = {
            ...rest,
            serviceQuotationDetailId: id
          };
          tempArr.push(tempObj);
        });
        this.salesInoviceForm.patchValue({
          serviceQuotationInvoiceDetails: tempArr
        });
        if (this.rowData.length < 1) {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Please add details",
            life: 2000
          });
          this.saving = false;
          return;
        }
        this._financeModuleService.create(this.salesInoviceForm.value, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.finalize)(() => {
          this.saving = false;
        }), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
          debugger;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000
          });
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.error.error.message);
        })).subscribe({
          next: response => {
            if (response) {
              debugger;
              this.messageService.add({
                severity: "info",
                summary: "Confirmed",
                detail: "CreatedSuccessfully",
                life: 2000
              });
              this.saving = false;
              this.displaySaleInvoice = false;
              this.getAll();
            }
          }
        });
      }
    });
  }
  update() {
    debugger;
    this.saving = true;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      const {
        id,
        ...rest
      } = node.data;
      var tempObj = {
        ...rest,
        serviceQuotationDetailId: node.data.serviceQuotationDetailId
      };
      tempArr.push(tempObj);
    });
    this.salesInoviceForm.patchValue({
      serviceQuotationInvoiceDetails: tempArr
    });
    if (this.rowData.length < 1) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please add details",
        life: 2000
      });
      this.saving = false;
      return;
    }
    const updateData = {
      ...this.salesInoviceForm.value,
      id: this.dataForEdit.id
    };
    this._financeModuleService.update(updateData, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.finalize)(() => {
      this.saving = false;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
      debugger;
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.messageService.add({
          severity: "success",
          summary: "Confirmed",
          detail: "UpdatedSuccessfully",
          life: 2000
        });
        this.displaySaleInvoice = false;
        this.getAll();
        this.saving = false;
      }
    });
  }
  onDateChange(value) {
    debugger;
    if (value) {
      this.salesInoviceForm.value.issueDate = value;
    }
    if (this.salesInoviceForm.value.userLocationId && this.salesInoviceForm.value.issueDate) {
      this.getVoucherNumber();
    }
  }
  getVoucherNumber() {
    debugger;
    this._financeModuleService.getVoucherNumber(this.target, "SI", this.salesInoviceForm.value.issueDate, this.salesInoviceForm.value.userLocationId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
      debugger;
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.salesInoviceForm.get("voucherNumber").setValue(response);
      },
      error: err => {
        console.log("An error occurred", err);
      }
    });
  }
  getDefaultLocation(target, name, id, filterId) {
    var _this = this;
    return (0,_Users_muhammadhassankhan_Documents_devoclock_github_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this._financeModuleService.getDefaultLocation(target, filterId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
        _this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.error.error.message);
      })).subscribe({
        next: response => {
          debugger;
          _this.salesInoviceForm.get("userLocationName").setValue(response.items[0].shortName);
          _this.salesInoviceForm.get("userLocationId").setValue(response.items[0].id);
          _this.getVoucherNumber();
        }
      });
    })();
  }
  setPickerValue(value, title) {
    debugger;
    switch (title) {
      case "Location":
        debugger;
        this.salesInoviceForm.patchValue({
          userLocationId: value?.id,
          userLocationName: value.name
        });
        this.getVoucherNumber();
        break;
      case "Supplier":
        this.salesInoviceForm.patchValue({
          supplierId: value.id,
          supplierName: value.title,
          supplierSerialNumber: value.serialNumber
        });
        break;
      // case "Region":
      //   this.salesInoviceForm.patchValue({
      //     regionId: value.id,
      //     regionName: value.title,
      //   });
      //   break;
      case "Employee":
        this.salesInoviceForm.patchValue({
          employeeId: value.additional,
          employeeName: value.name,
          employeeErpId: value.id
        });
        break;
      case "ChartOfAccount":
        this.salesInoviceForm.patchValue({
          pstChartOfAccountId: value.id,
          pstChartOfAccountName: value.name,
          pstChartOfAccountSerialNumber: value.serialNumber
        });
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  onRemoveSelected() {
    debugger;
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const dataToRemove = selectedNodes.map(node => node.data);
      this.rowData = this.rowData.filter(row => !dataToRemove.some(removeItem => removeItem.generalLedgerId === row.generalLedgerId));
      this.gridApi.setRowData(this.rowData);
      this.rowCount = this.gridApi.getDisplayedRowCount();
      this.gridApi.refreshCells();
    }
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = [];
    this.rowSelection = "multiple";
  }
  CloseModel() {
    this.viewMode = true;
    this.displaySaleInvoice = false;
  }
  viewOnly(id) {
    this.viewMode = true;
    this.editMode = false;
    this.show(id);
    // this.salesInoviceForm.disable();
    this.MinDate = null;
  }
  edit(id) {
    if (!this.restrictionDto.isEditAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Edit Restricted"
      });
      return;
    }
    this.editMode = true;
    this.viewMode = false;
    this.show(id);
    this.salesInoviceForm.enable();
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }
  OpenServiceInvoice() {
    debugger;
    this.displayServiceQuotation = true;
    this.GetServiceQuotation();
  }
  GetServiceQuotation() {
    this._financeModuleService.getAll("ServiceQuotation").pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
      debugger;
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.ServiceQuotationData = response.items.filter(item => item.linkedStatus == "PENDING" && item.status == "APPROVED");
      }
    });
  }
  SelectServiceQuotation(id) {
    this._financeModuleService.getDataForEdit(id, "ServiceQuotation").pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
      debugger;
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.salesInoviceForm.patchValue({
          attentionPerson: response.attentionPerson,
          // businessMonth: new Date(response.businessMonth),
          designation: response.designation,
          invoiceSubmissionDate: new Date(response.invoiceSubmissionDate),
          supplierId: response.supplierId,
          supplierName: response.supplierName,
          supplierSerialNumber: response.supplierSerialNumber,
          costCenterId: response.costCenterId,
          costCenterName: response.costCenterName,
          projectId: response.projectId,
          projectName: response.projectName,
          subject: response.subject,
          terms: response.terms,
          origin: response.origin,
          validity: response.validity,
          startingComments: response.startingComments,
          endingComments: response.endingComments,
          paragraph: response.paragraph,
          voucherStatusId: response.voucherStatusId,
          voucherStatusName: response.voucherStatusName,
          remarks: response.remarks,
          referenceNumber: response.referenceNumber
        });
        // this.rowData = response.serviceQuotationDetails;
        this.rowData = [...this.rowData, ...response.serviceQuotationDetails.map(item => ({
          ...item,
          businessMonth: moment__WEBPACK_IMPORTED_MODULE_1__(response.businessMonth).format("DD-MM-YYYY"),
          referenceNumber: response.voucherNumber
        }))];
        this.gridApi.refreshCells();
        this.displayServiceQuotation = false;
        this.calculateTotalAmount();
        console.log(this.rowData);
      }
    });
  }
  approve(id) {
    if (!this.restrictionDto.isApprovalAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Approve Restricted"
      });
      return;
    }
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._financeModuleService.approve(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
          debugger;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000
          });
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.error.error.message);
        })).subscribe({
          next: response => {
            debugger;
            if (response) {
              this.messageService.add({
                severity: "info",
                summary: "Confirmed",
                detail: "Approved Successfully",
                life: 2000
              });
              this.getAll();
            }
          }
        });
      }
    });
  }
  delete(id) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._financeModuleService.delete(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
          debugger;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000
          });
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.error.error.message);
        })).subscribe({
          next: response => {
            debugger;
            if (response) {
              this.messageService.add({
                severity: "info",
                summary: "Confirmed",
                detail: "Deleted Successfully",
                life: 2000
              });
              this.getAll();
            }
          }
        });
      }
    });
  }
  OnCellValueChanged(params) {
    // debugger
    // this.calculateTotalAmount();
  }
  // calculateTotalAmount() {
  //   let total = 0;
  //   let gst = 0;
  //   let pst = 0;
  //   this.rowData.forEach((node) => {
  //     debugger;
  //     if (node.totalAmount) {
  //       total += +node.totalAmount;
  //     }
  //     if (node.gstAmount) {
  //       gst += +node.gstAmount;
  //     }
  //     if (node.pstAmount) {
  //       pst += +node.pstAmount;
  //     }
  //   });
  //   this.salesInoviceForm.get("grossAmount").setValue(total);
  //   this.salesInoviceForm.get("gstAmount").setValue(gst);
  //   this.salesInoviceForm.get("pstAmount").setValue(pst);
  //   debugger;
  //   const netAmount = total + gst + pst;
  //   this.salesInoviceForm.get("totalAmount").setValue(netAmount);
  // }
  calculateTotalAmount() {
    let total = 0;
    let gst = 0;
    let pst = 0;
    this.rowData.forEach(node => {
      debugger;
      if (node.totalAmount) {
        total += +node.totalAmount;
      }
    });
    const gstPercent = this.salesInoviceForm.get("gstPercentage")?.value || 0;
    const pstPercent = this.salesInoviceForm.get("pstPercentage")?.value || 0;
    gst = total * gstPercent / 100;
    pst = total * pstPercent / 100;
    debugger;
    this.salesInoviceForm.get("grossAmount").setValue(total);
    this.salesInoviceForm.get("gstAmount").setValue(gst);
    this.salesInoviceForm.get("pstAmount").setValue(pst);
    const netAmount = total + gst + pst;
    this.salesInoviceForm.get("totalAmount").setValue(netAmount);
  }
  onGstPercentChange() {
    this.calculateTotalAmount();
  }
  onPstPercentChange() {
    this.calculateTotalAmount();
  }
  onPageChange(event) {
    debugger;
    this.dto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.dto.skipCount = (this.currentPage - 1) * 5;
    this._financeModuleService.getAll(this.target, this.dto).subscribe({
      next: response => {
        debugger;
        this.data = response.items;
        this.count = response.totalCount;
        this.loading = false;
      }
    });
  }
  onEnter(event) {
    const inputValue = event.target.value;
    this.loading = true;
    debugger;
    this.dto.DocOrVocNumber = inputValue;
    debugger;
    this._financeModuleService.getAll(this.target, this.dto).subscribe({
      next: response => {
        debugger;
        this.data = response.items;
        this.count = response.totalCount;
        this.loading = false;
      }
    });
  }
  onGlobalFilter(table, event) {
    table.filterGlobal(event.target.value, "contains");
  }
  VoucherRestriction(prefix) {
    this._restrictionService.getVoucherRestriction(prefix).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        console.log(response);
        debugger;
        this.restrictionDto = (0,_shared_Utials_utils__WEBPACK_IMPORTED_MODULE_3__.mapRestrictionDto)(response.items[0]);
        console.log(this.restrictionDto);
      }
    });
  }
  static #_ = this.ɵfac = function SalesInvoiceComponent_Factory(t) {
    return new (t || SalesInvoiceComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_app_main_finance_Shared_Services_finance_module_service__WEBPACK_IMPORTED_MODULE_4__.FinanceModuleService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_budget_shared_services_restriction_service__WEBPACK_IMPORTED_MODULE_5__.RestrictionService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_12__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_13__.BsModalService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_12__.ConfirmationService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
    type: SalesInvoiceComponent,
    selectors: [["app-sales-invoice"]],
    decls: 123,
    vars: 75,
    consts: [["policyTable", ""], ["requisitionTable", ""], ["styleClass", "mb-4"], ["pTemplate", "left"], ["pTemplate", "right"], [1, "card", "p-4"], ["styleClass", "p-datatable-gridlines", "dataKey", "id", "scrollHeight", "58vh", "responsiveLayout", "scroll", 3, "value", "rowHover", "paginatorDropdownAppendTo", "loading", "globalFilterFields"], ["pTemplate", "header"], ["pTemplate", "body"], ["currentPageReportTemplate", "Showing {first} to {last} of {totalRecords} entries", 3, "onPageChange", "rows", "totalRecords", "showCurrentPageReport", "rowsPerPageOptions"], [3, "visibleChange", "maximizable", "header", "modal", "visible", "draggable"], [3, "ngSubmit", "formGroup"], [1, "custom-tabview"], ["header", "Sales Invoice"], [1, "row", "col-md-12", "flex", "mt-3"], [1, "border", "col-md-6"], [1, "row", "p-2"], [1, "row", "col-md-12"], [1, "col-md-3", "p-field"], ["for", "date"], ["tabindex", "1", "formControlName", "issueDate", "inputId", "date", "appendTo", "body", 3, "ngModelChange", "minDate", "maxDate", "showOnFocus"], [1, "col-md-9", "p-field"], [3, "valueSelected", "showId", "title", "id", "name"], ["id", "inputField", 1, "col-md-4", "p-field", "flex", "flex-column"], ["for", "name"], ["readonly", "", "id", "name", "type", "text", "pInputText", "", "formControlName", "voucherNumber"], [1, "row", "col-md-12", 2, "margin-bottom", "1rem", "margin-top", "1rem"], [1, "my-auto"], ["label", "Offer Performa Invoice", "severity", "success", 3, "click", "text", "raised"], ["id", "inputField", 1, "col-md-12", "p-field", "flex", "flex-column"], [3, "valueSelected", "title", "title2", "id", "name", "chartOfAccountSubLedgerType"], [3, "valueSelected", "title", "id", "name"], ["id", "name", "type", "text", "pInputText", "", "formControlName", "attentionPerson"], ["id", "name", "type", "text", "pInputText", "", "formControlName", "attentionPerson", "readonly", ""], ["id", "name", "type", "text", "pInputText", "", "formControlName", "referenceNumber"], ["id", "name", "type", "text", "pInputText", "", "formControlName", "designation", "readonly", ""], ["tabindex", "1", "formControlName", "invoiceSubmissionDate", "inputId", "date", "appendTo", "body", "readonly", ""], [1, "my-4"], ["label", "Remove Row", "size", "small", "severity", "danger", 2, "padding", "0.25rem 0.5rem", "font-size", "0.75rem", "height", "auto", "line-height", "1.25", 3, "click"], [1, "ag-theme-balham", 2, "width", "100%", "height", "200px", "margin-top", "12px", 3, "gridReady", "cellValueChanged", "rowData", "columnDefs", "animateRows", "suppressAutoSize", "suppressDragLeaveHidesColumns", "rowSelection", "singleClickEdit"], ["id", "inputField", 1, "col-md-2", "p-field", "flex", "flex-column"], ["for", "grossAmount"], ["id", "grossAmount", "type", "number", "pInputText", "", "formControlName", "grossAmount", "readonly", ""], ["id", "inputField", 1, "col-md-1", "p-field", "flex", "flex-column"], ["for", "serviceTaxGst"], ["id", "serviceTaxGst", "type", "number", "pInputText", "", "formControlName", "gstPercentage", 3, "change"], ["id", "serviceTaxGst", "type", "number", "pInputText", "", "formControlName", "gstAmount", "readonly", ""], ["for", "serviceTaxPst"], ["id", "serviceTaxPst", "type", "number", "pInputText", "", "formControlName", "pstPercentage", 3, "change"], ["id", "serviceTaxPst", "type", "number", "pInputText", "", "formControlName", "pstAmount", "readonly", ""], ["id", "inputField", "class", "col-md-4 p-field flex flex-column", 4, "ngIf"], [1, ""], ["id", "inputField", 1, "col-md-3", "p-field", "flex", "flex-column"], ["for", "totalAmount"], ["id", "totalAmount", "type", "number", "pInputText", "", "formControlName", "totalAmount", "readonly", ""], ["header", "Other Details"], ["id", "inputField", 1, "p-field", "col-md-6"], ["id", "inputField", 1, "col-md-6"], ["for", "narration", 1, "form-label"], ["id", "endNarration", "required", "", "type", "text", "pInputText", "", "formControlName", "remarks", 1, "form-control"], [1, "flex", "gap-1", "justify-content-end", "mt-4"], ["label", "Cancel", "severity", "warning", 3, "onClick", "outlined"], ["label", "Save", "severity", "contrast", 3, "loading", "outlined", "click", 4, "ngIf"], ["label", "Update", "severity", "contrast", 3, "loading", "outlined", "click", 4, "ngIf"], ["header", "Copy Service Quotation", 3, "visibleChange", "maximizable", "modal", "visible", "draggable"], [1, "p-4"], ["styleClass", "p-datatable-gridlines", "dataKey", "id", "responsiveLayout", "scroll", 3, "paginator", "rows", "rowsPerPageOptions", "value", "rowHover", "paginatorDropdownAppendTo"], [1, "p-toolbar-group-left"], [1, "p-toolbar-separator", 2, "margin-right", "10px"], ["pButton", "", "icon", "pi pi-plus-circle", 1, "p-button-success", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], [1, "block", "md:mt-0", "p-input-icon-left"], [1, "pi", "pi-search"], ["pInputText", "", "type", "text", "placeholder", "Search...", 2, "height", "25px", "cursor", "pointer", 3, "input", "keydown.enter"], ["pSortableColumn", "Actions", 2, "min-width", "200px"], ["field", "Actions"], ["pSortableColumn", "voucher", 2, "min-width", "200px"], ["field", "voucher"], ["pSortableColumn", "IssueDate", 2, "min-width", "200px"], ["field", "IssueDate"], ["pSortableColumn", "clientName", 2, "min-width", "200px"], ["field", "clientName"], ["pSortableColumn", "status", 2, "min-width", "200px"], ["field", "status"], ["style", "height: 25px; width: 25px; cursor: pointer", "pButton", "", "pRipple", "", "icon", "pi pi-eye", "class", "p-button-rounded p-button-info mr-2", 3, "click", 4, "ngIf"], ["style", "height: 25px; width: 25px; cursor: pointer", "pButton", "", "pRipple", "", "icon", "pi pi-pencil", "class", "p-button-rounded p-button-info mr-2", 3, "click", 4, "ngIf"], ["style", "height: 25px; width: 25px; cursor: pointer", "pButton", "", "pRipple", "", "icon", "pi pi-trash", "class", "p-button-rounded p-button-warning mr-2", 3, "click", 4, "ngIf"], ["pButton", "", "pRipple", "", "style", "height: 25px; width: 25px; cursor: pointer", "icon", "pi pi-check", "class", "p-button-rounded p-button-warning mr-2", 3, "click", 4, "ngIf"], ["class", "yes-bg", "style", "height: 25px; cursor: pointer", 4, "ngIf"], ["class", "no-bg", 4, "ngIf"], ["pButton", "", "pRipple", "", "icon", "pi pi-eye", 1, "p-button-rounded", "p-button-info", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], ["pButton", "", "pRipple", "", "icon", "pi pi-pencil", 1, "p-button-rounded", "p-button-info", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], ["pButton", "", "pRipple", "", "icon", "pi pi-trash", 1, "p-button-rounded", "p-button-warning", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], ["pButton", "", "pRipple", "", "icon", "pi pi-check", 1, "p-button-rounded", "p-button-warning", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], [1, "yes-bg", 2, "height", "25px", "cursor", "pointer"], [1, "no-bg"], [3, "valueSelected", "title", "title2", "filterWiseChartOfAccTarget", "id", "name"], ["label", "Save", "severity", "contrast", 3, "click", "loading", "outlined"], ["label", "Update", "severity", "contrast", 3, "click", "loading", "outlined"], ["pSortableColumn", "id", 2, "min-width", "200px"], ["field", "id"], ["pSortableColumn", "voucherNumber", 2, "min-width", "200px"], ["field", "voucherNumber"], ["pSortableColumn", "issueDate", 2, "min-width", "200px"], ["field", "issueDate"], ["pSortableColumn", "action", 2, "min-width", "200px"], ["field", "action"], ["pButton", "", "pRipple", "", "label", "Select", 1, "p-button-rounded", "p-button-info", "mr-2", 3, "click"]],
    template: function SalesInvoiceComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "p-toolbar", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, SalesInvoiceComponent_ng_template_1_Template, 2, 0, "ng-template", 3)(2, SalesInvoiceComponent_ng_template_2_Template, 6, 0, "ng-template", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "div", 5)(4, "p-table", 6, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](6, SalesInvoiceComponent_ng_template_6_Template, 16, 0, "ng-template", 7)(7, SalesInvoiceComponent_ng_template_7_Template, 16, 11, "ng-template", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "p-paginator", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("onPageChange", function SalesInvoiceComponent_Template_p_paginator_onPageChange_8_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.onPageChange($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "p-dialog", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayListener"]("visibleChange", function SalesInvoiceComponent_Template_p_dialog_visibleChange_9_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayBindingSet"](ctx.displaySaleInvoice, $event) || (ctx.displaySaleInvoice = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "form", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngSubmit", function SalesInvoiceComponent_Template_form_ngSubmit_10_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.create());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "p-tabView", 12)(12, "p-tabPanel", 13)(13, "div", 14)(14, "div", 15)(15, "div", 16)(16, "div", 17)(17, "div", 18)(18, "label", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](19, "Date");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](20, "p-calendar", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function SalesInvoiceComponent_Template_p_calendar_ngModelChange_20_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.onDateChange($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](21, "div", 21)(22, "app-picker", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("valueSelected", function SalesInvoiceComponent_Template_app_picker_valueSelected_22_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.setPickerValue($event, "Location"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](23, "div", 17)(24, "div", 23)(25, "label", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](26, "Voucher Number");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](27, "input", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](28, "div", 26)(29, "div", 27)(30, "p-button", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function SalesInvoiceComponent_Template_p_button_click_30_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.OpenServiceInvoice());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](31, "div", 15)(32, "div", 16)(33, "div", 17)(34, "div", 29)(35, "app-picker", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("valueSelected", function SalesInvoiceComponent_Template_app_picker_valueSelected_35_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.setPickerValue($event, "Supplier"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](36, "div", 17)(37, "div", 29)(38, "app-picker", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("valueSelected", function SalesInvoiceComponent_Template_app_picker_valueSelected_38_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.setPickerValue($event, "Employee"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](39, "div", 17)(40, "div", 23)(41, "label", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](42, "Sales Man");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](43, "input", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](44, "div", 23)(45, "label", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](46, "Attention");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](47, "input", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](48, "div", 23)(49, "label", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](50, "Reference Number");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](51, "input", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](52, "div", 17)(53, "div", 23)(54, "label", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](55, "Designation");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](56, "input", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](57, "div", 23)(58, "label", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](59, "Invoice Submission Date");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](60, "p-calendar", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](61, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](62, "div", 37)(63, "div", 17)(64, "div")(65, "p-button", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function SalesInvoiceComponent_Template_p_button_click_65_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.onRemoveSelected());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](66, "ag-grid-angular", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("gridReady", function SalesInvoiceComponent_Template_ag_grid_angular_gridReady_66_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.onGridReady($event));
        })("cellValueChanged", function SalesInvoiceComponent_Template_ag_grid_angular_cellValueChanged_66_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.OnCellValueChanged($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](67, "div", 17)(68, "div", 40)(69, "label", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](70, "Gross Amount");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](71, "input", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](72, "div", 43)(73, "label", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](74, "GST %");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](75, "input", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("change", function SalesInvoiceComponent_Template_input_change_75_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.onGstPercentChange());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](76, "div", 40)(77, "label", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](78, "GST Amount");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](79, "input", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](80, "div", 43)(81, "label", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](82, "PST %");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](83, "input", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("change", function SalesInvoiceComponent_Template_input_change_83_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.onPstPercentChange());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](84, "div", 40)(85, "label", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](86, "PST Amount");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](87, "input", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](88, SalesInvoiceComponent_div_88_Template, 2, 5, "div", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](89, "div", 51)(90, "div", 52)(91, "label", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](92, "Net Amount");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](93, "input", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](94, "p-tabPanel", 55)(95, "div", 17)(96, "div", 56)(97, "app-picker", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("valueSelected", function SalesInvoiceComponent_Template_app_picker_valueSelected_97_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.setPickerValue($event, "CostCenter"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](98, "div", 17)(99, "div", 56)(100, "app-picker", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("valueSelected", function SalesInvoiceComponent_Template_app_picker_valueSelected_100_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.setPickerValue($event, "Project"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](101, "div", 56)(102, "app-picker", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("valueSelected", function SalesInvoiceComponent_Template_app_picker_valueSelected_102_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.setPickerValue($event, "Site"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](103, "div", 17)(104, "div", 56)(105, "app-picker", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("valueSelected", function SalesInvoiceComponent_Template_app_picker_valueSelected_105_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.setPickerValue($event, "VoucherStatus"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](106, "div", 57)(107, "label", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](108, "Voucher Status Remarks");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](109, "input", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](110, "div", 60)(111, "p-button", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("onClick", function SalesInvoiceComponent_Template_p_button_onClick_111_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.CloseModel());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](112, SalesInvoiceComponent_p_button_112_Template, 1, 2, "p-button", 62)(113, SalesInvoiceComponent_p_button_113_Template, 1, 2, "p-button", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](114, "p-dialog", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayListener"]("visibleChange", function SalesInvoiceComponent_Template_p_dialog_visibleChange_114_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayBindingSet"](ctx.displayServiceQuotation, $event) || (ctx.displayServiceQuotation = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](115, "div", 65)(116, "p-table", 66, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](118, SalesInvoiceComponent_ng_template_118_Template, 13, 0, "ng-template", 7)(119, SalesInvoiceComponent_ng_template_119_Template, 10, 6, "ng-template", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](120, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](121, "p-toast")(122, "p-confirmDialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](69, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", ctx.data)("rowHover", true)("paginatorDropdownAppendTo", "body")("loading", ctx.loading)("globalFilterFields", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](70, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("rows", 5)("totalRecords", ctx.count)("showCurrentPageReport", true)("rowsPerPageOptions", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](71, _c2, ctx.count));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("maximizable", true)("header", ctx.editMode ? "Edit Sales Invoice" : "Create Sales Invoice")("modal", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayProperty"]("visible", ctx.displaySaleInvoice);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("draggable", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("formGroup", ctx.salesInoviceForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("minDate", ctx.MinDate)("maxDate", ctx.today)("showOnFocus", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("showId", false)("title", "Location")("id", ctx.salesInoviceForm.value.userLocationId)("name", ctx.salesInoviceForm.value.userLocationName);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("text", true)("raised", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("title", "Client")("title2", "Subledger")("id", ctx.salesInoviceForm.value.supplierSerialNumber)("name", ctx.salesInoviceForm.value.supplierName)("chartOfAccountSubLedgerType", "3,4");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("title", "Employee")("id", ctx.salesInoviceForm.value.employeeErpId)("name", ctx.salesInoviceForm.value.employeeName);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](28);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("rowData", ctx.rowData)("columnDefs", ctx.colDefs)("animateRows", true)("suppressAutoSize", true)("suppressDragLeaveHidesColumns", true)("rowSelection", ctx.rowSelection)("singleClickEdit", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.salesInoviceForm.value.gstPercentage);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("title", "CostCenter")("id", ctx.salesInoviceForm.value.costCenterId)("name", ctx.salesInoviceForm.value.costCenterName);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("title", "Project")("id", ctx.salesInoviceForm.value.projectId)("name", ctx.salesInoviceForm.value.projectName);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("title", "Site")("id", ctx.salesInoviceForm.value.siteId)("name", ctx.salesInoviceForm.value.siteName);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("title", "VoucherStatus")("id", ctx.salesInoviceForm.value.voucherStatusId)("name", ctx.salesInoviceForm.value.voucherStatusName);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("outlined", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.editMode && !ctx.viewMode);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.editMode && !ctx.viewMode);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("maximizable", true)("modal", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayProperty"]("visible", ctx.displayServiceQuotation);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("draggable", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](73, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("paginator", true)("rows", 5)("rowsPerPageOptions", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](74, _c3))("value", ctx.ServiceQuotationData)("rowHover", true)("paginatorDropdownAppendTo", "body");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, primeng_button__WEBPACK_IMPORTED_MODULE_15__.ButtonDirective, primeng_button__WEBPACK_IMPORTED_MODULE_15__.Button, primeng_api__WEBPACK_IMPORTED_MODULE_12__.PrimeTemplate, primeng_dialog__WEBPACK_IMPORTED_MODULE_16__.Dialog, primeng_table__WEBPACK_IMPORTED_MODULE_17__.Table, primeng_table__WEBPACK_IMPORTED_MODULE_17__.SortableColumn, primeng_table__WEBPACK_IMPORTED_MODULE_17__.SortIcon, primeng_paginator__WEBPACK_IMPORTED_MODULE_18__.Paginator, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.RequiredValidator, primeng_toolbar__WEBPACK_IMPORTED_MODULE_19__.Toolbar, primeng_inputtext__WEBPACK_IMPORTED_MODULE_20__.InputText, primeng_calendar__WEBPACK_IMPORTED_MODULE_21__.Calendar, ag_grid_angular__WEBPACK_IMPORTED_MODULE_22__.AgGridAngular, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_23__.ConfirmDialog, primeng_toast__WEBPACK_IMPORTED_MODULE_24__.Toast, primeng_tabview__WEBPACK_IMPORTED_MODULE_25__.TabView, primeng_tabview__WEBPACK_IMPORTED_MODULE_25__.TabPanel, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControlName, _shared_components_picker_picker_component__WEBPACK_IMPORTED_MODULE_6__.PickerComponent, _angular_common__WEBPACK_IMPORTED_MODULE_14__.DatePipe],
    encapsulation: 2
  });
}

/***/ }),

/***/ 47775:
/*!**************************************************************************************************!*\
  !*** ./src/app/main/commercial/service-quotation-filters/service-quotation-filters.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ServiceQuotationFiltersComponent: () => (/* binding */ ServiceQuotationFiltersComponent)
/* harmony export */ });
/* harmony import */ var _shared_components_suggestion_lookup_table_modal_SuggestionLookupTableModalComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent */ 76606);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ 39545);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _shared_services_commercial_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/services/commercial.service */ 29221);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/api */ 17780);
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap/modal */ 2457);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/button */ 49136);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/toolbar */ 31973);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/calendar */ 41314);
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ag-grid-angular */ 34733);
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/confirmdialog */ 68160);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/toast */ 61225);
/* harmony import */ var primeng_radiobutton__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/radiobutton */ 54665);
/* harmony import */ var _shared_components_picker_picker_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/components/picker/picker.component */ 79023);















const _c0 = ["SuggestionLookupTableModalComponent"];
function ServiceQuotationFiltersComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Service Quotation Invoice Filters");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
class ServiceQuotationFiltersComponent {
  constructor(commercialService, messageService, confirmationService, suggestionService) {
    this.commercialService = commercialService;
    this.messageService = messageService;
    this.confirmationService = confirmationService;
    this.suggestionService = suggestionService;
    this.colDefs = [{
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      width: 90,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true
    }, {
      headerName: "SalesTax Id",
      editable: false,
      field: "salesTaxTypeId",
      resizable: true,
      width: 130,
      suppressSizeToFit: true
    }, {
      headerName: "",
      field: "addItem",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true
    }, {
      headerName: "Sales Tax Name",
      editable: false,
      field: "salesTaxTypeName",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Dated",
      editable: false,
      field: "issueDate",
      filter: "agDateColumnFilter",
      resizable: true,
      suppressSizeToFit: true,
      valueFormatter: params => {
        const date = new Date(params.value); // Convert the value to a date
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          });
        }
        return ""; // Return empty if the date is invalid
      }
    }, {
      headerName: "Client",
      editable: false,
      field: "supplierName",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Invoice Number",
      editable: false,
      field: "salesTaxInvoiceNumber",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "St Amount",
      editable: false,
      field: "gstAmount",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      }
    }, {
      headerName: "Pst Amount",
      editable: false,
      field: "pstAmount",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      }
    }, {
      headerName: "Invoice Amount",
      editable: false,
      field: "totalAmount",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "ST. Date",
      field: "salesTaxApprovalDate",
      editable: true,
      cellEditor: "agDateCellEditor",
      cellEditorParams: {
        inputId: "date",
        appendTo: "body",
        dateFormat: "yy-mm-dd"
      },
      valueFormatter: this.dateFormatter,
      valueParser: this.dateParser,
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "St Number",
      editable: false,
      field: "totalAmount",
      resizable: true,
      suppressSizeToFit: true
    }
    // {
    //   headerName: "Party",
    //   editable: false,
    //   field: "totalAmount",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    ];
  }
  setPickerValue(value, title) {
    debugger;
    switch (title) {
      case "Client":
        debugger;
        this.clientId = value.id;
        this.clientName = value.title;
        this.clientSerialNumber = value.serialNumber;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  addIconCellRendererFunc() {
    debugger;
    return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
  }
  dateFormatter(params) {
    if (params.value) {
      const date = new Date(params.value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`; // Format date as YYYY-MM-DD
    }
    return "";
  }
  dateParser(params) {
    const dateString = params.newValue;
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return null;
  }
  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const dataToRemove = selectedNodes.map(node => node.data);
      this.gridApi.applyTransaction({
        remove: dataToRemove
      });
      const updatedRowData = [];
      this.gridApi.forEachNode(node => updatedRowData.push(node.data));
      this.gridApi.setRowData(updatedRowData);
      this.rowCount = this.gridApi.getDisplayedRowCount();
    }
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = [];
    this.rowSelection = "multiple";
  }
  cellClicked(params) {
    debugger;
    switch (params.column["colId"]) {
      case "addItem":
        debugger;
        this.setParms = params;
        this.openSelectItem();
        break;
      default:
        break;
    }
  }
  openSelectItem() {
    debugger;
    const initialState = {
      target: "SalesTaxType"
    };
    this.suggestionModalRef = this.suggestionService.show(_shared_components_suggestion_lookup_table_modal_SuggestionLookupTableModalComponent__WEBPACK_IMPORTED_MODULE_0__.SuggestionLookupTableModalComponent, {
      initialState
    });
    this.suggestionModalRef.content.saveSuggestion.subscribe(result => {
      debugger;
      this.setParms.data.salesTaxTypeId = +result.id;
      this.setParms.data.salesTaxTypeName = result.name;
      this.gridApi.refreshCells();
    });
  }
  generate() {
    debugger;
    this.commercialService.getSeviceQuotationInvoiceFilters("ServiceQuotationInvoice", this.dateRange, this.startDate, this.endDate, this.clientId, this.status).subscribe({
      next: response => {
        this.rowData = response.items;
      },
      error: error => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to fetch data."
        });
      },
      complete: () => {
        console.log("API call completed.");
      }
    });
  }
  update(payload) {
    debugger;
    this.commercialService.updateSalexTaxInvoice(payload, "ServiceQuotationInvoice").subscribe({
      next: response => {
        console.log("Update successful:", response);
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Sales tax invoice updated successfully."
        });
      },
      error: error => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to update sales tax invoice."
        });
      }
    });
  }
  onRowDoubleClick(event) {
    const selectedRowData = event.data;
    if (!selectedRowData.salesTaxTypeId) {
      this.messageService.add({
        severity: "error",
        summary: "error",
        detail: "Sales tax Id is required",
        life: 2000
      });
      return;
    }
    if (!selectedRowData.salesTaxInvoiceNumber) {
      this.messageService.add({
        severity: "error",
        summary: "error",
        detail: "ST. Invoice Number is required",
        life: 2000
      });
      return;
    }
    if (!selectedRowData.salesTaxApprovalDate) {
      this.messageService.add({
        severity: "error",
        summary: "error",
        detail: "ST. Date is required",
        life: 2000
      });
      return;
    }
    this.confirmationService.confirm({
      message: `Are you sure you want to update  ${moment__WEBPACK_IMPORTED_MODULE_1__(selectedRowData.salesTaxApprovalDate).format("YYYY-MM-DD")} date? of id ${selectedRowData.id} and this Invoice Number ${selectedRowData.salesTaxInvoiceNumber}`,
      header: "Update Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        const obj = [{
          id: selectedRowData.id,
          salesTaxApprovalDate: moment__WEBPACK_IMPORTED_MODULE_1__(selectedRowData.salesTaxApprovalDate).format("YYYY-MM-DD"),
          salesTaxTypeId: selectedRowData.salesTaxTypeId,
          salesTaxTypeName: selectedRowData.salesTaxTypeName,
          salesTaxInvoiceNumber: selectedRowData.salesTaxInvoiceNumber
        }];
        debugger;
        this.update(obj);
      },
      reject: () => {}
    });
  }
  cellValueChanged(event) {
    const rowData = event.data;
    if (event.colDef.field === "salesTaxTypeId" || event.colDef.field === "salesTaxApprovalDate") {
      if (rowData.salesTaxTypeId && rowData.salesTaxApprovalDate) {
        this.commercialService.getInvoiceNumber("ServiceQuotationInvoice", rowData.salesTaxTypeId, rowData.salesTaxApprovalDate).subscribe({
          next: response => {
            rowData.salesTaxInvoiceNumber = response;
            this.gridApi.refreshCells({
              force: true
            });
          },
          error: error => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Failed to fetch invoice number."
            });
          },
          complete: () => {}
        });
      }
    }
  }
  static #_ = this.ɵfac = function ServiceQuotationFiltersComponent_Factory(t) {
    return new (t || ServiceQuotationFiltersComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_shared_services_commercial_service__WEBPACK_IMPORTED_MODULE_2__.CommercialService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_5__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_5__.ConfirmationService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__.BsModalService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: ServiceQuotationFiltersComponent,
    selectors: [["app-service-quotation-filters"]],
    viewQuery: function ServiceQuotationFiltersComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.SuggestionLookupTableModalComponent = _t.first);
      }
    },
    decls: 44,
    vars: 22,
    consts: [["styleClass", "mb-4"], ["pTemplate", "left"], [1, "container-fluid", 2, "max-height", "80vh", "overflow-y", "auto"], [1, "row", "col-md-12", "mt-4"], ["id", "inputField", 1, "p-field", "col-md-8"], [3, "valueSelected", "title", "title2", "id", "chartOfAccountSubLedgerType", "name"], ["id", "inputField", 1, "col-md-2", "flex", "flex-column"], ["for", "name"], ["inputId", "date", "appendTo", "body", "tabindex", "1", "name", "issueDate", 3, "ngModelChange", "ngModel", "showOnFocus"], ["label", "Remove Row", "size", "small", "severity", "danger", 2, "padding", "0.25rem 0.5rem", "font-size", "0.75rem", "height", "auto", "line-height", "1.25", 3, "click"], [1, "ag-theme-quartz", 2, "height", "500px", 3, "gridReady", "cellClicked", "rowDoubleClicked", "cellValueChanged", "rowData", "columnDefs", "rowSelection", "singleClickEdit"], [1, "flex", "align-items-center"], ["name", "status", "value", "PENDING", 3, "ngModelChange", "ngModel"], ["for", "cnic"], ["name", "status", "value", "APPROVED", 3, "ngModelChange", "ngModel"], ["for", "token"], ["name", "status", "value", "", 3, "ngModelChange", "ngModel"], [1, "flex", "gap-1", "justify-content-end", "mt-4"], ["label", "Generate", "severity", "contrast", 3, "click", "loading", "outlined"]],
    template: function ServiceQuotationFiltersComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ServiceQuotationFiltersComponent_ng_template_1_Template, 2, 0, "ng-template", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 4)(5, "app-picker", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("valueSelected", function ServiceQuotationFiltersComponent_Template_app_picker_valueSelected_5_listener($event) {
          return ctx.setPickerValue($event, "Client");
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 3)(7, "div", 6)(8, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, "Date Range:");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "p-calendar", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationFiltersComponent_Template_p_calendar_ngModelChange_10_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx.dateRange, $event) || (ctx.dateRange = $event);
          return $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "div", 6)(12, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13, "To:");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "p-calendar", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationFiltersComponent_Template_p_calendar_ngModelChange_14_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx.to, $event) || (ctx.to = $event);
          return $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "div", 6)(16, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "Start Date:");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "p-calendar", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationFiltersComponent_Template_p_calendar_ngModelChange_18_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx.startDate, $event) || (ctx.startDate = $event);
          return $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "div", 6)(20, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21, "End Date:");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "p-calendar", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationFiltersComponent_Template_p_calendar_ngModelChange_22_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx.endDate, $event) || (ctx.endDate = $event);
          return $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](23, "br")(24, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](25, "p-button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ServiceQuotationFiltersComponent_Template_p_button_click_25_listener() {
          return ctx.onRemoveSelected();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "ag-grid-angular", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("gridReady", function ServiceQuotationFiltersComponent_Template_ag_grid_angular_gridReady_26_listener($event) {
          return ctx.onGridReady($event);
        })("cellClicked", function ServiceQuotationFiltersComponent_Template_ag_grid_angular_cellClicked_26_listener($event) {
          return ctx.cellClicked($event);
        })("rowDoubleClicked", function ServiceQuotationFiltersComponent_Template_ag_grid_angular_rowDoubleClicked_26_listener($event) {
          return ctx.onRowDoubleClick($event);
        })("cellValueChanged", function ServiceQuotationFiltersComponent_Template_ag_grid_angular_cellValueChanged_26_listener($event) {
          return ctx.cellValueChanged($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](27, "div", 11)(28, "p-radioButton", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationFiltersComponent_Template_p_radioButton_ngModelChange_28_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx.status, $event) || (ctx.status = $event);
          return $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](29, "label", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](30, "Pending");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](31, "div", 11)(32, "p-radioButton", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationFiltersComponent_Template_p_radioButton_ngModelChange_32_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx.status, $event) || (ctx.status = $event);
          return $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "label", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](34, "Approved");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](35, "div", 11)(36, "p-radioButton", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationFiltersComponent_Template_p_radioButton_ngModelChange_36_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx.status, $event) || (ctx.status = $event);
          return $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](37, "label", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](38, "All");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](39, "div", 17)(40, "p-button", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ServiceQuotationFiltersComponent_Template_p_button_click_40_listener() {
          return ctx.generate();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](41, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](42, "p-toast")(43, "p-confirmDialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("title", "Client")("title2", "Subledger")("id", ctx.clientSerialNumber)("chartOfAccountSubLedgerType", "3,4")("name", ctx.clientName);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx.dateRange);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("showOnFocus", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx.to);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("showOnFocus", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx.startDate);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("showOnFocus", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx.endDate);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("showOnFocus", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("rowData", ctx.rowData)("columnDefs", ctx.colDefs)("rowSelection", ctx.rowSelection)("singleClickEdit", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx.status);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx.status);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx.status);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("loading", ctx.saving)("outlined", true);
      }
    },
    dependencies: [primeng_button__WEBPACK_IMPORTED_MODULE_7__.Button, primeng_api__WEBPACK_IMPORTED_MODULE_5__.PrimeTemplate, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgModel, primeng_toolbar__WEBPACK_IMPORTED_MODULE_9__.Toolbar, primeng_calendar__WEBPACK_IMPORTED_MODULE_10__.Calendar, ag_grid_angular__WEBPACK_IMPORTED_MODULE_11__.AgGridAngular, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_12__.ConfirmDialog, primeng_toast__WEBPACK_IMPORTED_MODULE_13__.Toast, primeng_radiobutton__WEBPACK_IMPORTED_MODULE_14__.RadioButton, _shared_components_picker_picker_component__WEBPACK_IMPORTED_MODULE_3__.PickerComponent],
    encapsulation: 2
  });
}

/***/ }),

/***/ 54035:
/*!**********************************************************************************!*\
  !*** ./src/app/main/commercial/service-quotation/service-quotation.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ServiceQuotationComponent: () => (/* binding */ ServiceQuotationComponent)
/* harmony export */ });
/* harmony import */ var _Users_muhammadhassankhan_Documents_devoclock_github_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var _Shared_Dtos_service_quotation_dto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Shared/Dtos/service-quotation-dto */ 55090);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 89475);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 61318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 77919);
/* harmony import */ var _shared_components_suggestion_lookup_table_modal_SuggestionLookupTableModalComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent */ 76606);
/* harmony import */ var _budget_shared_Dtos_restriction_dto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../budget/shared/Dtos/restriction-dto */ 97223);
/* harmony import */ var _shared_Utials_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/Utials/utils */ 2584);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _inventory_Shared_Services_inventory_setup_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../inventory/Shared/Services/inventory-setup.service */ 23693);
/* harmony import */ var _budget_shared_services_restriction_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../budget/shared/services/restriction.service */ 92076);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/api */ 17780);
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-bootstrap/modal */ 2457);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/button */ 49136);
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/dialog */ 16280);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/table */ 76676);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/paginator */ 43157);
/* harmony import */ var primeng_inputnumber__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/inputnumber */ 61759);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primeng/toolbar */ 31973);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! primeng/inputtext */ 48361);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! primeng/calendar */ 41314);
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ag-grid-angular */ 34733);
/* harmony import */ var primeng_checkbox__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! primeng/checkbox */ 26771);
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! primeng/confirmdialog */ 68160);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! primeng/toast */ 61225);
/* harmony import */ var primeng_tabview__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! primeng/tabview */ 634);
/* harmony import */ var _shared_components_picker_picker_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../shared/components/picker/picker.component */ 79023);



























const _c0 = ["SuggestionLookupTableModalComponent"];
const _c1 = () => ({
  width: "100%",
  "overflow-y": "auto"
});
const _c2 = () => ["userLocationName", "voucherNumber", "supplierName", "issueDate", "status"];
const _c3 = a0 => [a0, 5, 20, 100];
const _c4 = () => [5, 10, 20];
function ServiceQuotationComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Offer / Performa Invoice");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function ServiceQuotationComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "span", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ServiceQuotationComponent_ng_template_2_Template_span_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r2.show());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "span", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "i", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "input", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("input", function ServiceQuotationComponent_ng_template_2_Template_input_input_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      const policyTable_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r2.onGlobalFilter(policyTable_r4, $event));
    })("keydown.enter", function ServiceQuotationComponent_ng_template_2_Template_input_keydown_enter_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r2.onEnter($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
function ServiceQuotationComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "tr")(1, "th", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, " Actions ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "p-sortIcon", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "th", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, " Voucher ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](6, "p-sortIcon", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "th", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8, " Location ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](9, "p-sortIcon", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "th", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](11, " Linked Status ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](12, "p-sortIcon", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "th", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14, " Document Status ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](15, "p-sortIcon", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
function ServiceQuotationComponent_ng_template_7_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ServiceQuotationComponent_ng_template_7_span_2_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r2.viewOnly(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function ServiceQuotationComponent_ng_template_7_span_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ServiceQuotationComponent_ng_template_7_span_3_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r2.edit(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function ServiceQuotationComponent_ng_template_7_span_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ServiceQuotationComponent_ng_template_7_span_4_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r8);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r2.delete(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function ServiceQuotationComponent_ng_template_7_span_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ServiceQuotationComponent_ng_template_7_span_5_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r9);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r2.approve(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function ServiceQuotationComponent_ng_template_7_span_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](item_r6.linkedStatus);
  }
}
function ServiceQuotationComponent_ng_template_7_span_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](item_r6.linkedStatus);
  }
}
function ServiceQuotationComponent_ng_template_7_span_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](item_r6.status);
  }
}
function ServiceQuotationComponent_ng_template_7_span_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](item_r6.status);
  }
}
function ServiceQuotationComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, ServiceQuotationComponent_ng_template_7_span_2_Template, 1, 0, "span", 95)(3, ServiceQuotationComponent_ng_template_7_span_3_Template, 1, 0, "span", 96)(4, ServiceQuotationComponent_ng_template_7_span_4_Template, 1, 0, "span", 97)(5, ServiceQuotationComponent_ng_template_7_span_5_Template, 1, 0, "span", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](11, ServiceQuotationComponent_ng_template_7_span_11_Template, 2, 1, "span", 99)(12, ServiceQuotationComponent_ng_template_7_span_12_Template, 2, 1, "span", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](14, ServiceQuotationComponent_ng_template_7_span_14_Template, 2, 1, "span", 99)(15, ServiceQuotationComponent_ng_template_7_span_15_Template, 2, 1, "span", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", item_r6.status == "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", item_r6.status !== "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", item_r6.status !== "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", item_r6.status === "PENDING" || item_r6.status == "UNAPPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](item_r6.voucherNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](item_r6.userLocationName);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", item_r6.linkedStatus == "COMPLETED");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", item_r6.linkedStatus != "COMPLETED");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", item_r6.status == "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", item_r6.status == "PENDING");
  }
}
function ServiceQuotationComponent_ng_template_154_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "tr")(1, "th", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, " Item Id ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "p-sortIcon", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "th", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, " Item Title ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](6, "p-sortIcon", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "th", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8, " Actions ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](9, "p-sortIcon", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
function ServiceQuotationComponent_ng_template_155_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "td")(6, "button", 110);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ServiceQuotationComponent_ng_template_155_Template_button_click_6_listener() {
      const item_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r2.SelectItem(item_r11));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](item_r11.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](item_r11.name);
  }
}
function ServiceQuotationComponent_p_button_158_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "p-button", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ServiceQuotationComponent_p_button_158_Template_p_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r12);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r2.save());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("loading", ctx_r2.saving)("outlined", true);
  }
}
function ServiceQuotationComponent_p_button_159_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "p-button", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ServiceQuotationComponent_p_button_159_Template_p_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r13);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r2.update());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("loading", ctx_r2.saving)("outlined", true);
  }
}
class ServiceQuotationComponent {
  constructor(_basicTypeService,
  // private dialogService: DialogService,
  _restrictionService, messageService, confirmationService, suggestionService) {
    this._basicTypeService = _basicTypeService;
    this._restrictionService = _restrictionService;
    this.messageService = messageService;
    this.confirmationService = confirmationService;
    this.suggestionService = suggestionService;
    this.serviceQuotationDto = new _Shared_Dtos_service_quotation_dto__WEBPACK_IMPORTED_MODULE_1__.ServiceQuotation();
    this.restrictionDto = new _budget_shared_Dtos_restriction_dto__WEBPACK_IMPORTED_MODULE_3__.RestrictionDto();
    this.target = "ServiceQuotation";
    this.today = new Date();
    this.MinDate = new Date();
    this.currentPage = 1;
    this.filterDto = {
      skipCount: 0,
      maxCount: 5,
      DocOrVocNumber: ""
    };
    this.maxDate = new Date();
    this.colDefs = [{
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true
    }, {
      headerName: "Job ID",
      editable: false,
      field: "serialNumber",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      }
    }, {
      headerName: "",
      field: "ServiceItem",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true
    }, {
      headerName: "Job Title",
      editable: false,
      field: "serviceItemName",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      }
    }, {
      headerName: "Item ID",
      editable: false,
      field: "inventoryItemId",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "",
      field: "InventoryItem",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true
    }, {
      headerName: "Item Name",
      editable: false,
      field: "inventoryItemName",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Site ID",
      editable: false,
      field: "siteId",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "",
      field: "siteId",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true
    }, {
      headerName: "Site Title",
      editable: false,
      field: "siteName",
      resizable: true,
      suppressSizeToFit: true
    },
    // {
    //   headerName: "Ref VoucherNo",
    //   editable: true,
    //   field: "referenceVoucherNumber",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Client Item Code",
      editable: true,
      field: "clientItemCode",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Client Item Title",
      editable: true,
      field: "clientItemTitle",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Offer Qty",
      editable: true,
      field: "offerQty",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
      cellEditor: "agNumberCellEditor" // Forces number input in editor
    }, {
      headerName: "acknowledgedClientQty",
      editable: true,
      field: "acknowledgedClientQty",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
      cellEditor: "agNumberCellEditor" // Forces number input in editor
    }, {
      headerName: "Final Qty",
      editable: true,
      field: "finalQty",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) || newValue < 0 ? 0 : newValue;
      },
      cellEditor: "agNumberCellEditor" // Forces number input in editor
    }, {
      headerName: "Gross Rate",
      editable: true,
      field: "grossRate",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
      cellEditor: "agNumberCellEditor" // Forces number input in editor
    }, {
      headerName: "Total",
      editable: false,
      field: "totalAmount",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? "" : newValue;
      },
      cellEditor: "agNumberCellEditor" // Forces number input in editor
    }, {
      headerName: "GST %",
      editable: true,
      field: "gstPercentage",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
      cellEditor: "agNumberCellEditor" // Forces number input in editor
    },
    // {
    //   headerName: "GST Amount",
    //   editable: false,
    //   field: "gstAmount",
    //   resizable: true,
    //   suppressSizeToFit: true,
    //   valueParser: function (params) {
    //     const newValue = parseFloat(params.newValue);
    //     return isNaN(newValue) ? 0 : newValue;
    //   },
    //   cellEditor: "agNumberCellEditor", // Forces number input in editor
    // },
    {
      headerName: "GST Amount",
      editable: false,
      field: "gstAmount",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? 0 : newValue;
      },
      valueFormatter: function (params) {
        const value = parseFloat(params.value);
        return isNaN(value) ? "0" : value.toString(); // Ensures the output is a string
      },
      cellEditor: "agNumberCellEditor"
    }, {
      headerName: "PST %",
      editable: true,
      field: "pstPercentage",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
      cellEditor: "agNumberCellEditor" // Forces number input in editor
    },
    // {
    //   headerName: "PST Amount",
    //   editable: false,
    //   field: "pstAmount",
    //   resizable: true,
    //   suppressSizeToFit: true,
    //   valueParser: function (params) {
    //     const newValue = parseFloat(params.newValue);
    //     return isNaN(newValue) ? "" : newValue;
    //   },
    //   cellEditor: "agNumberCellEditor", // Forces number input in editor
    // },
    {
      headerName: "PST Amount",
      editable: false,
      field: "pstAmount",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? 0 : newValue;
      },
      valueFormatter: function (params) {
        const value = parseFloat(params.value);
        return isNaN(value) ? "0" : value.toString(); // Ensures the output is a string
      },
      cellEditor: "agNumberCellEditor"
    }, {
      headerName: "Remarks",
      editable: true,
      field: "remarks",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Other for location",
      editable: false,
      field: "locationName",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "",
      field: "Location",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true
    }, {
      headerName: "Location Id",
      editable: false,
      field: "locationId",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Engine Ac Make",
      editable: true,
      field: "engineMakeYear",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Engine Rating",
      editable: true,
      field: "engineRating",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Vehicle Visit Type Title",
      editable: false,
      field: "vehicleVisitTypeName",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "",
      field: "VehicleVisitType",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true
    }, {
      headerName: "Vehicle Visit Type Id",
      editable: false,
      field: "vehicleVisitTypeId",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "Genset Hours",
      editable: true,
      field: "gensetHours",
      resizable: true,
      suppressSizeToFit: true
    }, {
      headerName: "CI VoucherNo",
      editable: false,
      field: "voucherNumber",
      resizable: true,
      suppressSizeToFit: true
    }];
  }
  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("OF");
  }
  addIconCellRendererFunc() {
    return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
  }
  show(id) {
    this.saving = false;
    if (id) {
      this._basicTypeService.getDataForEdit(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
        debugger;
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.error.error.message);
      })).subscribe({
        next: response => {
          debugger;
          this.serviceQuotationDto = response;
          this.serviceQuotationDto.invoiceSubmissionDate = new Date(response.invoiceSubmissionDate);
          this.serviceQuotationDto.budgetDate = new Date(response.budgetDate);
          this.serviceQuotationDto.issueDate = new Date(response.issueDate);
          this.serviceQuotationDto.employeeId = response.employeeId;
          this.serviceQuotationDto.employeeName = response.employeeName;
          this.serviceQuotationDto.fromLocation = response.fromLocation;
          this.serviceQuotationDto.toLocation = response.toLocation;
          this.serviceQuotationDto.toLocationName = response.toLocationName;
          debugger;
          this.serviceQuotationDto.userLocationId = response.userLocationId;
          this.serviceQuotationDto.businessMonth = new Date(response.businessMonth);
          this.serviceQuotationDto.userLocationName = response.userLocationName;
          this.serviceQuotationDto.totalBudgetAmount = response.totalBudgetAmount;
          this.serviceQuotationDto.totalPurchaseAmount = response.totalPurchaseAmount;
          this.serviceQuotationDto.totalSaleAmount = response.totalSaleAmount;
          this.rowData = [];
          this.rowData = [...this.rowData, ...response.serviceQuotationDetails];
          this.displayModal = true;
        }
      });
    } else {
      if (!this.restrictionDto.isCreationAllowed) {
        this.messageService.add({
          severity: "info",
          summary: "Info",
          detail: "Creation Restricted"
        });
        return;
      }
      debugger;
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.getDefaultLocation("Location", "locationName", "locationId", "");
      this.editMode = false;
      this.view = false;
      this.addRow = false;
      this.displayModal = true;
      this.serviceQuotationDto = new _Shared_Dtos_service_quotation_dto__WEBPACK_IMPORTED_MODULE_1__.ServiceQuotation();
      this.serviceQuotationDto.issueDate = this.today;
      this.serviceQuotationDto.isActive = true;
      this.locationName = null;
      this.rowData = [];
    }
  }
  edit(id) {
    if (!this.restrictionDto.isEditAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Edit Restricted"
      });
      return;
    }
    this.editMode = true;
    this.view = false;
    this.show(id);
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }
  viewOnly(id) {
    this.view = true;
    this.editMode = false;
    this.show(id);
    this.MinDate = null;
  }
  CloseModel() {
    this.confirmationService.confirm({
      message: "Are you sure you want to close without saving?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.view = false;
        this.displayModal = false;
      },
      reject: () => {
        this.displayModal = true;
      }
    });
  }
  delete(id) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._basicTypeService.delete(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
          debugger;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000
          });
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.error.error.message);
        })).subscribe({
          next: response => {
            debugger;
            if (response) {
              this.messageService.add({
                severity: "info",
                summary: "Confirmed",
                detail: "Deleted Successfully",
                life: 2000
              });
              this.getAll();
            }
          }
        });
      }
    });
  }
  approve(id) {
    if (!this.restrictionDto.isApprovalAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Approve Restricted"
      });
      return;
    }
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._basicTypeService.ApproveDocument(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
          debugger;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000
          });
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.error.error.message);
        })).subscribe({
          next: response => {
            debugger;
            if (response) {
              this.messageService.add({
                severity: "info",
                summary: "Confirmed",
                detail: "Approved Successfully",
                life: 2000
              });
              this.getAll();
            }
          }
        });
      }
    });
  }
  validationOfReq() {
    if (!this.serviceQuotationDto.issueDate) {
      this.messageService.add({
        severity: "error",
        detail: "Date is Required",
        life: 2000
      });
      this.saving = false;
      return;
    }
    if (!this.serviceQuotationDto.userLocationId) {
      this.messageService.add({
        severity: "error",
        detail: "User Location is Required",
        life: 2000
      });
      this.saving = false;
      return;
    }
    if (!this.serviceQuotationDto.costCenterId) {
      this.messageService.add({
        severity: "error",
        detail: "Cost Center Id is Required",
        life: 2000
      });
      this.saving = false;
      return;
    }
    if (!this.serviceQuotationDto.projectId) {
      this.messageService.add({
        severity: "error",
        detail: "Project ID is Required",
        life: 2000
      });
      this.saving = false;
      return;
    }
    if (!this.serviceQuotationDto.supplierId) {
      this.messageService.add({
        severity: "error",
        detail: "Client is Required",
        life: 2000
      });
      this.saving = false;
      return;
    }
    if (!this.serviceQuotationDto.invoiceSubmissionDate) {
      this.messageService.add({
        severity: "error",
        detail: "Submission Date is Required",
        life: 2000
      });
      this.saving = false;
      return;
    }
    if (!this.serviceQuotationDto.indentNumber) {
      this.messageService.add({
        severity: "error",
        detail: "Indent Number is Required",
        life: 2000
      });
      this.saving = false;
      return;
    }
    if (!this.serviceQuotationDto.attentionPerson) {
      this.messageService.add({
        severity: "error",
        detail: "Attention Person is Required",
        life: 2000
      });
      this.saving = false;
      return;
    }
    if (!this.serviceQuotationDto.designation) {
      this.messageService.add({
        severity: "error",
        detail: "Designation Required",
        life: 2000
      });
      this.saving = false;
      return;
    }
    if (!this.serviceQuotationDto.referenceNumber) {
      this.messageService.add({
        severity: "error",
        detail: "Reference Number is Required",
        life: 2000
      });
      this.saving = false;
      return;
    }
    // if (!this.serviceQuotationDto.employeeId) {
    //   this.messageService.add({
    //     severity: "error",
    //     detail: "Employee Name is Required",
    //     life: 2000,
    //   });
    //   this.saving = false;
    //   return;
    // }
    if (!this.serviceQuotationDto.businessMonth) {
      this.messageService.add({
        severity: "error",
        detail: "Business Date is Required",
        life: 2000
      });
      this.saving = false;
      return;
    }
    console.log(this.rowData.forEach(item => item.totalAmount == 0));
    if (this.rowData.some(item => item.totalAmount == 0)) {
      debugger;
      this.messageService.add({
        severity: "error",
        detail: "Please add some purchase rate amount",
        life: 2000
      });
      this.saving = false;
      return;
    }
    if (this.serviceQuotationDto.totalPurchaseAmount > this.serviceQuotationDto.totalBudgetAmount) {
      this.serviceQuotationDto.totalPurchaseAmount = 0;
      this.serviceQuotationDto.totalBudgetAmount = 0;
      this.messageService.add({
        severity: "error",
        detail: "Your Current Month Budget is Less Than Total Purchase Amount.",
        life: 2000
      });
    }
    return true;
  }
  update() {
    this.saving = true;
    debugger;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        serviceItemId: node.data.serviceItemId,
        inventoryItemId: node.data.inventoryItemId,
        siteId: node.data.siteId,
        referenceVoucherNumber: node.data.referenceVoucherNumber,
        clientItemCode: node.data.clientItemCode,
        clientItemTitle: node.data.clientItemTitle,
        offerQty: node.data.offerQty,
        acknowledgedClientQty: node.data.acknowledgedClientQty,
        finalQty: node.data.finalQty,
        grossRate: node.data.grossRate,
        gstPercentage: node.data.gstPercentage,
        gstAmount: node.data.gstAmount,
        pstAmount: node.data.pstAmount,
        pstPercentage: node.data.pstPercentage,
        locationId: node.data.locationId,
        engineMakeYear: node.data.engineMakeYear,
        engineRating: node.data.engineRating,
        vehicleVisitTypeId: node.data.vehicleVisitTypeId,
        gensetHours: node.data.gensetHours,
        remarks: node.data.remarks,
        totalAmount: node.data.totalAmount,
        voucherNumber: this.serviceQuotationDto.voucherNumber
      };
      tempArr.push(tempObj);
    });
    this.serviceQuotationDto.serviceQuotationDetails = tempArr;
    debugger;
    this._basicTypeService.update(this.serviceQuotationDto, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.finalize)(() => {
      this.saving = false;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
      debugger;
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.messageService.add({
          severity: "success",
          summary: "Confirmed",
          detail: "UpdatedSuccessfully",
          life: 2000
        });
        this.getAll();
        this.saving = false;
        this.displayModal = false;
      }
    });
  }
  onDateChange(value) {
    debugger;
    if (value) {
      this.serviceQuotationDto.issueDate = value;
    }
    if (this.serviceQuotationDto.userLocationId && this.serviceQuotationDto.issueDate) {
      this.GetDocMaxCount("ServiceQuotation");
    }
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowSelection = "multiple";
    this.rowData = [];
  }
  save() {
    debugger;
    if (!this.validationOfReq()) {
      return;
    }
    this.indentNumber = this.serviceQuotationDto.indentNumber;
    this.invoiceSubmissionDate = new Date(this.serviceQuotationDto.invoiceSubmissionDate);
    this.saving = true;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        vehicleVisitTypeId: node.data.vehicleVisitTypeId || 0,
        locationId: node.data.locationId || 0,
        serviceItemId: node.data.serviceItemId || 0,
        inventoryItemId: node.data.inventoryItemId || 0,
        referenceVoucherNumber: node.data.referenceVoucherNumber || "",
        clientItemCode: node.data.clientItemCode || "",
        clientItemTitle: node.data.clientItemTitle || "",
        engineMakeYear: node.data.engineMakeYear || "",
        engineRating: node.data.engineRating || "",
        gensetHours: node.data.gensetHours || "",
        remarks: node.data.remarks || "",
        offerQty: node.data.offerQty || 0,
        acknowledgedClientQty: node.data.acknowledgedClientQty || 0,
        finalQty: node.data.finalQty || 0,
        grossRate: node.data.grossRate || 0,
        totalAmount: node.data.totalAmount || 0,
        gstPercentage: node.data.gstPercentage || 0,
        gstAmount: node.data.gstAmount || 0,
        pstAmount: node.data.gstAmount || 0,
        pstPercentage: node.data.pstPercentage || 0,
        chartOfAccountId: node.data.chartOfAccountId || 0,
        chartOfAccountName: node.data.chartOfAccountName || 0,
        qtyInStockFromLoc: node.data.qtyInStockFromLoc || 0,
        voucherNumber: this.serviceQuotationDto.voucherNumber + "/" + (index + 1)
      };
      tempArr.push(tempObj);
    });
    this.serviceQuotationDto.serviceQuotationDetails = tempArr;
    let isValid = true;
    this.gridApi.forEachNode(node => {
      const {
        serviceItemId,
        inventoryItemId
      } = node.data;
      if (!serviceItemId && !inventoryItemId) {
        this.messageService.add({
          severity: "error",
          summary: "Required",
          detail: "Please select either an Item or Job in the grid."
        });
        isValid = false;
        return;
      }
      if (serviceItemId && inventoryItemId) {
        this.messageService.add({
          severity: "error",
          summary: "Required",
          detail: "Please select only one: either an Item or Job in the grid."
        });
        isValid = false;
        return;
      }
    });
    if (!isValid) {
      this.saving = false;
      return;
    }
    this._basicTypeService.create(this.serviceQuotationDto, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.finalize)(() => {
      this.saving = false;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
      debugger;
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.messageService.add({
          severity: "success",
          summary: "Confirmed",
          detail: "SavedSuccessfully",
          life: 2000
        });
        this.getAll();
        this.saving = false;
        this.displayModal = false;
      }
    });
  }
  getAll() {
    debugger;
    this._basicTypeService.getAllRequisition(this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
      debugger;
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error?.error?.error?.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error?.error?.error?.message);
    })).subscribe({
      next: response => {
        debugger;
        console.log(response.items);
        this.tableData = response.items;
        this.count = response.totalCount;
      }
    });
  }
  onAddRow() {
    if (this.validationOfReq()) {
      this.addRow = true;
      var newItem = {
        itemId: "",
        itemName: "",
        requestedQty: "",
        unitId: "",
        unitName: "",
        qtyInStock: "",
        remarks: ""
      };
      this.gridApi.applyTransaction({
        add: [newItem]
      });
      this.rowCount = this.gridApi.getDisplayedRowCount();
    }
  }
  cellClicked(params) {
    this.setParms = params;
    switch (params.column["colId"]) {
      case "ServiceItem":
        if (params.data.inventoryItemId) {
          this.messageService.add({
            severity: "error",
            summary: "Selection Error",
            detail: "You can only choose either a Service Item or an Inventory Item, not both."
          });
          return;
        }
        if (params.data.serviceItemId) {
          this.messageService.add({
            severity: "error",
            summary: "Selection Error",
            detail: "Service Item is already selected."
          });
          return;
        }
        this.openSelectItem("ServiceItem");
        break;
      case "InventoryItem":
        if (params.data.serviceItemId) {
          this.messageService.add({
            severity: "error",
            summary: "Selection Error",
            detail: "You can only choose either a Service Item or an Inventory Item, not both."
          });
          return;
        }
        if (params.data.inventoryItemId) {
          this.messageService.add({
            severity: "error",
            summary: "Selection Error",
            detail: "Inventory Item is already selected."
          });
          return;
        }
        this.openSelectItem("InventoryItem");
        break;
      case "Location":
        debugger;
        this.setParms = params;
        this.openSelectItem("Location");
        break;
      case "VehicleVisitType":
        debugger;
        this.setParms = params;
        this.openSelectItem("VehicleVisitType");
        break;
      case "addProject":
        debugger;
        this.setParms = params;
        this.openSelectItem("Project");
        break;
      default:
        break;
    }
  }
  openSelectItem(target) {
    debugger;
    const initialState = {
      target: target
    };
    this.suggestionModalRef = this.suggestionService.show(_shared_components_suggestion_lookup_table_modal_SuggestionLookupTableModalComponent__WEBPACK_IMPORTED_MODULE_2__.SuggestionLookupTableModalComponent, {
      initialState
    });
    this.suggestionModalRef.content.saveSuggestion.subscribe(result => {
      debugger;
      if (target == "ServiceItem") {
        this.setParms.data.serviceItemId = result.id;
        this.setParms.data.serviceItemName = result.name;
        this.setParms.data.serialNumber = result.serialNumber;
      } else if (target == "InventoryItem") {
        this.setParms.data.inventoryItemId = result.id;
        this.setParms.data.inventoryItemName = result.name;
      } else if (target == "Location") {
        this.setParms.data.locationId = +result.id;
        this.setParms.data.locationName = result.name;
      } else if (target == "VehicleVisitType") {
        this.setParms.data.vehicleVisitTypeId = +result.id || 0;
        this.setParms.data.vehicleVisitTypeName = result.name;
      } else if (target == "Project") {
        this.setParms.data.projectId = +result.id;
        this.setParms.data.projectName = result.name;
      }
      this.gridApi.refreshCells();
    });
  }
  openSelectUnit() {
    debugger;
    const initialState = {
      target: "Unit"
    };
    this.suggestionModalRef = this.suggestionService.show(_shared_components_suggestion_lookup_table_modal_SuggestionLookupTableModalComponent__WEBPACK_IMPORTED_MODULE_2__.SuggestionLookupTableModalComponent, {
      initialState
    });
    this.suggestionModalRef.content.saveSuggestion.subscribe(result => {
      debugger;
      this.setParms.data.unitId = +result.id.split("/")[0];
      this.setParms.data.unitName = result.name;
      this.gridApi.refreshCells();
    });
  }
  AmountCalculations() {
    debugger;
    console.log(this.rowData);
    let totalPurchaseAmount = 0;
    let totalGstAmount = 0;
    let totalPstAmount = 0;
    // Loop through the grid rows to calculate the total amounts
    this.gridApi.forEachNode(node => {
      // Use Number() and handle undefined/null values with fallback to 0
      const totalAmount = Number(node.data.totalAmount) || 0;
      const gstAmount = Number(node.data.gstAmount) || 0;
      const pstAmount = Number(node.data.pstAmount) || 0;
      totalPurchaseAmount += totalAmount;
      totalGstAmount += gstAmount;
      totalPstAmount += pstAmount;
    });
    debugger;
    // Safely convert the totals and update serviceQuotationDto
    this.serviceQuotationDto.grossAmount = totalPurchaseAmount;
    this.serviceQuotationDto.gstAmount = totalGstAmount;
    this.serviceQuotationDto.pstAmount = totalPstAmount;
    // Calculate net total amount (purchase amount excluding GST and PST)
    this.serviceQuotationDto.totalAmount = totalPurchaseAmount + (totalGstAmount + totalPstAmount);
  }
  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const dataToRemove = selectedNodes.map(node => node.data);
      this.gridApi.applyTransaction({
        remove: dataToRemove
      });
      debugger;
      this.rowData = [];
      this.gridApi.forEachNode(node => this.rowData.push(node.data));
      this.AmountCalculations();
    }
    this.addRow = this.gridApi.getDisplayedRowCount() === 0 ? false : true;
  }
  setPickerValue(value, title) {
    debugger;
    switch (title) {
      case "LocationTo":
        debugger;
        this.serviceQuotationDto.toLocation = +value.id;
        this.serviceQuotationDto.userLocationId = +value.id;
        this.serviceQuotationDto.userLocationName = value.name;
        this.GetDocMaxCount("ServiceQuotation");
        break;
      case "Supplier":
        debugger;
        // this.serviceQuotationDto.toLocation = +value.id;
        this.serviceQuotationDto.supplierId = +value.id;
        this.serviceQuotationDto.supplierName = value.title;
        this.serviceQuotationDto.supplierSerialNumber = value.serialNumber;
        break;
      case "CostCenter":
        debugger;
        this.serviceQuotationDto.costCenterId = +value.id;
        this.serviceQuotationDto.costCenterName = value.name;
        break;
      // case "Region":
      //   debugger;
      //   this.serviceQuotationDto.regionId = value.id;
      //   this.serviceQuotationDto.regionName = value.name;
      //   break;
      case "Project":
        debugger;
        this.serviceQuotationDto.projectId = +value.id;
        this.serviceQuotationDto.projectName = value.name;
        break;
      case "Site":
        debugger;
        this.serviceQuotationDto.siteId = value.id;
        this.serviceQuotationDto.siteName = value.name;
        break;
      case "VoucherStatus":
        debugger;
        this.serviceQuotationDto.voucherStatusId = +value.id;
        this.serviceQuotationDto.voucherStatusName = value.name;
        break;
      case "Employee":
        debugger;
        this.serviceQuotationDto.employeeId = value.additional;
        this.serviceQuotationDto.employeeErpId = value.id;
        this.serviceQuotationDto.employeeName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  getStockDetails(itemId, locationId, costCenterId, projectId) {
    var _this = this;
    return (0,_Users_muhammadhassankhan_Documents_devoclock_github_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      debugger;
      return _this._basicTypeService.getStockDetails(itemId, locationId, costCenterId, projectId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
        _this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.message);
      })).toPromise();
    })();
  }
  getItemBudget(budgetDate, costCenterId, toLocation, itemId, projectId) {
    var _this2 = this;
    return (0,_Users_muhammadhassankhan_Documents_devoclock_github_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      debugger;
      return _this2._basicTypeService.getItemBudget(budgetDate, costCenterId, toLocation, itemId, projectId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
        _this2.messageService.add({
          severity: "error",
          summary: "Error",
          detail: error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.message);
      })).toPromise();
    })();
  }
  SelectItem(item) {
    var _this3 = this;
    return (0,_Users_muhammadhassankhan_Documents_devoclock_github_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      debugger;
      const isItemAlreadyAdded = _this3.rowData.some(row => row.itemId === item.id);
      if (isItemAlreadyAdded) {
        _this3.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "This item has already been added.",
          life: 2000
        });
        return;
      }
      try {
        const {
          fromLocation,
          costCenterId,
          projectId,
          budgetDate,
          toLocation
        } = _this3.serviceQuotationDto;
        var fromStockDetails = yield _this3.getStockDetails(item.id, _this3.serviceQuotationDto.fromLocation, _this3.serviceQuotationDto.fromCostCenterId, _this3.serviceQuotationDto.fromProjectId);
        var toStockDetails = yield _this3.getStockDetails(item.id, _this3.serviceQuotationDto.toLocation, _this3.serviceQuotationDto.costCenterId, _this3.serviceQuotationDto.projectId);
        debugger;
        var budget = yield _this3.getItemBudget(budgetDate, costCenterId, toLocation, item.id, projectId);
        debugger;
        console.log(fromStockDetails);
        console.log(toStockDetails);
        _this3.setParms.data.itemId = item.id;
        _this3.setParms.data.itemName = item.name;
        _this3.setParms.data.unitId = item.additional.split("/")[0];
        _this3.setParms.data.unitName = item.additional.split("/")[1];
        _this3.setParms.data.monthlyBudgetAvailable = budget.availableBudget;
        _this3.setParms.data.monthlyBudgetAmount = budget.monthlyBudget;
        _this3.setParms.data.monthlyBudgetConsumed = budget.budgetConsumed;
        _this3.setParms.data.chartOfAccountId = budget.itemFinancialIntegration[0].chartOfAccountId;
        _this3.setParms.data.chartOfAccountName = budget.itemFinancialIntegration[0].name;
        _this3.setParms.data.qtyInStockFromLoc = fromStockDetails.qtyInStock;
        _this3.setParms.data.lastPurchaseRate = fromStockDetails.lastPurchaseRate;
        _this3.setParms.data.qtyInStock = toStockDetails.qtyInStock;
        _this3.setParms.data.lastPurchaseRate = toStockDetails.lastPurchaseRate;
      } catch (error) {
        console.error("Error fetching stock details", error);
      }
      _this3.displayItem = false;
      _this3.rowData.push(_this3.setParms.data);
      _this3.gridApi.refreshCells();
    })();
  }
  // OnCellValueChanged(params) {
  //   debugger;
  //   if (!params.data.finalQty && params.data.acknowledgedClientQty) {
  //     params.data.finalQty = params.data.acknowledgedClientQty;
  //   }
  //   if (params.data.finalQty < 0) {
  //     params.data.finalQty = 0;
  //     this.messageService.add({
  //       severity: "error",
  //       detail: "Final Quantity cannot be negative.",
  //       life: 2000,
  //     });
  //   }
  //   if (params.data.finalQty > params.data.offerQty) {
  //     params.data.finalQty = 0;
  //     this.messageService.add({
  //       severity: "error",
  //       detail: "Final Quantity cannot be greater than Offer Quantity.",
  //       life: 2000,
  //     });
  //   }
  //   if (params.data.finalQty && params.data.grossRate) {
  //     params.data.totalAmount = Number(
  //       params.data.finalQty * params.data.grossRate
  //     );
  //   }
  //   params.data.gstAmount = Number(
  //     (params.data.totalAmount * params.data.gstPercentage) / 100
  //   );
  //   params.data.pstAmount = Number(
  //     (params.data.totalAmount * params.data.pstPercentage) / 100
  //   );
  //   // this.serviceQuotationDto.grossAmount = Number(params.data.totalAmount);
  //   // this.serviceQuotationDto.pstAmount = Number(params.data.pstAmount);
  //   // this.serviceQuotationDto.gstAmount = Number(params.data.gstAmount);
  //   // this.serviceQuotationDto.totalAmount =
  //   //   params.data.totalAmount + (params.data.pstAmount + params.data.gstAmount);
  //   // Refresh grid and recalculate amounts
  //   this.gridApi.refreshCells();
  //   this.AmountCalculations();
  // }
  OnCellValueChanged(params) {
    debugger;
    if (params.data.acknowledgedClientQty > params.data.offerQty) {
      params.data.acknowledgedClientQty = params.data.offerQty;
      this.messageService.add({
        severity: "error",
        detail: "Acknowledged Client Quantity cannot be greater than Offer Quantity.",
        life: 2000
      });
    }
    if (params.data.finalQty > params.data.acknowledgedClientQty) {
      params.data.finalQty = params.data.acknowledgedClientQty;
      this.messageService.add({
        severity: "error",
        detail: "Final Quantity cannot be greater than Acknowledged Client Quantity.",
        life: 2000
      });
    }
    if (!params.data.finalQty && params.data.acknowledgedQty) {
      params.data.finalQty = params.data.acknowledgedQty;
    }
    if (params.data.finalQty < 0) {
      params.data.finalQty = 0;
      this.messageService.add({
        severity: "error",
        detail: "Final Quantity cannot be negative.",
        life: 2000
      });
    }
    if (params.data.finalQty > params.data.offerQty) {
      params.data.finalQty = 0;
      this.messageService.add({
        severity: "error",
        detail: "Final Quantity cannot be greater than Offer Quantity.",
        life: 2000
      });
    }
    if (params.data.finalQty && params.data.grossRate) {
      params.data.totalAmount = Number(params.data.finalQty * params.data.grossRate);
    }
    params.data.gstAmount = Number(params.data.totalAmount * params.data.gstPercentage / 100);
    params.data.pstAmount = Number(params.data.totalAmount * params.data.pstPercentage / 100);
    this.gridApi.refreshCells();
    this.AmountCalculations();
  }
  GetDocMaxCount(target) {
    debugger;
    if (this.serviceQuotationDto.userLocationId && this.serviceQuotationDto.issueDate) {
      this._basicTypeService.GetDocMaxCount(target, this.serviceQuotationDto.userLocationId, this.serviceQuotationDto.issueDate).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.error.error.message);
      })).subscribe({
        next: response => {
          debugger;
          this.documentNumber = response;
          this.MakeVoucher();
        }
      });
    }
  }
  getDefaultLocation(target, name, id, filterId) {
    var _this4 = this;
    return (0,_Users_muhammadhassankhan_Documents_devoclock_github_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this4._basicTypeService.getDefaultLocation(target, filterId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
        _this4.messageService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.error.error.message);
      })).subscribe({
        next: response => {
          debugger;
          _this4.serviceQuotationDto.userLocationName = response.items[0].shortName;
          _this4.serviceQuotationDto.userLocationId = response.items[0].id;
          _this4.serviceQuotationDto.toLocationName = response.items[0].shortName;
          _this4.serviceQuotationDto.toLocation = response.items[0].id;
          _this4.GetDocMaxCount("ServiceQuotation");
        }
      });
    })();
  }
  MakeVoucher() {
    debugger;
    if (this.serviceQuotationDto.userLocationId && this.documentNumber) {
      this.serviceQuotationDto.voucherNumber = "OF-HNL" + "-" + this.serviceQuotationDto.userLocationId + "-" + this.serviceQuotationDto.issueDate.getFullYear() + "-" + (this.serviceQuotationDto.issueDate.getMonth() + 1) + "-" + this.documentNumber;
    } else {
      this.GetDocMaxCount("ServiceQuotation");
    }
  }
  onPageChange(event) {
    debugger;
    this.filterDto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.filterDto.skipCount = (this.currentPage - 1) * 5;
    this._basicTypeService.getAll(this.target, this.filterDto).subscribe({
      next: response => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;
        this.loading = false;
      }
    });
  }
  onEnter(event) {
    const inputValue = event.target.value;
    this.loading = true;
    debugger;
    this.filterDto.DocOrVocNumber = inputValue;
    debugger;
    this._basicTypeService.getAll(this.target, this.filterDto).subscribe({
      next: response => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;
        this.loading = false;
      }
    });
  }
  onGlobalFilter(table, event) {
    table.filterGlobal(event.target.value, "contains");
  }
  VoucherRestriction(prefix) {
    this._restrictionService.getVoucherRestriction(prefix).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(error => {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        console.log(response);
        debugger;
        this.restrictionDto = (0,_shared_Utials_utils__WEBPACK_IMPORTED_MODULE_4__.mapRestrictionDto)(response.items[0]);
        console.log(this.restrictionDto);
      }
    });
  }
  static #_ = this.ɵfac = function ServiceQuotationComponent_Factory(t) {
    return new (t || ServiceQuotationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_inventory_Shared_Services_inventory_setup_service__WEBPACK_IMPORTED_MODULE_5__.SetupsService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_budget_shared_services_restriction_service__WEBPACK_IMPORTED_MODULE_6__.RestrictionService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_12__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_12__.ConfirmationService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_13__.BsModalService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
    type: ServiceQuotationComponent,
    selectors: [["app-service-quotation"]],
    viewQuery: function ServiceQuotationComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.SuggestionLookupTableModalComponent = _t.first);
      }
    },
    decls: 163,
    vars: 110,
    consts: [["policyTable", ""], ["requisitionTable", ""], ["styleClass", "mb-4"], ["pTemplate", "left"], ["pTemplate", "right"], [1, "card", "p-4"], ["styleClass", "p-datatable-gridlines", "dataKey", "id", "scrollHeight", "58vh", "responsiveLayout", "scroll", 3, "value", "rowHover", "paginatorDropdownAppendTo", "loading", "globalFilterFields"], ["pTemplate", "header"], ["pTemplate", "body"], ["currentPageReportTemplate", "Showing {first} to {last} of {totalRecords} entries", 3, "onPageChange", "rows", "totalRecords", "showCurrentPageReport", "rowsPerPageOptions"], [3, "visibleChange", "maximizable", "closeOnEscape", "header", "modal", "visible", "draggable"], [1, "custom-tabview"], ["header", "Offer / Performa Invoice"], [1, "row", "col-md-12", "flex", "mt-3"], [1, "border", "col-md-6"], [1, "row", "p-2"], [1, "row", "col-md-12"], [1, "p-field", "col-md-3"], ["for", "date"], ["inputId", "date", "appendTo", "body", "tabindex", "1", 3, "ngModelChange", "ngModel", "minDate", "maxDate", "showOnFocus"], [1, "row", "col-md-12", "flex"], ["id", "inputField", 1, "p-field", "col-md-12"], ["title2", "Location", 3, "valueSelected", "disable", "title", "id", "name"], [3, "valueSelected", "title2", "title", "id", "name", "chartOfAccountSubLedgerType"], ["title2", "Employee", 3, "valueSelected", "disable", "title", "id", "name"], ["id", "inputField", 1, "col-md-6", "p-field", "flex", "flex-column"], ["for", "name"], ["readonly", "", "id", "name", "type", "text", "pInputText", "", 3, "ngModelChange", "ngModel"], ["id", "inputField", 1, "col-md-4", "p-field", "flex", "flex-column"], ["view", "month", "dateFormat", "mm/yy", "inputId", "businessMonth", "appendTo", "body", 3, "ngModelChange", "disabled", "ngModel"], [1, "p-field", "col-md-6"], ["inputId", "date", "appendTo", "body", "tabindex", "1", 3, "ngModelChange", "ngModel", "maxDate", "showOnFocus"], ["id", "inputField", 1, "col-md-6"], ["for", "indentNumber", 1, "form-label"], ["id", "indentNumber", "required", "", "type", "text", "pInputText", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "attentionPerson", 1, "form-label"], ["id", "attentionPerson", "required", "", "type", "text", "pInputText", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "designation", 1, "form-label"], ["id", "designation", "required", "", "type", "text", "pInputText", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["id", "inputField", 1, "col-md-4"], ["for", "referenceNumber", 1, "form-label"], ["id", "referenceNumber", "required", "", "type", "text", "pInputText", "", 1, "form-control", 3, "ngModelChange", "disabled", "ngModel"], ["for", "narration", 1, "form-label"], ["id", "narration", "required", "", "type", "text", "pInputText", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["id", "siteId", "required", "", "type", "text", "pInputText", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "my-4"], ["label", "Add Row", "size", "small", 3, "click"], ["label", "Remove Row", "size", "small", "severity", "danger", 3, "click"], [1, "ag-theme-balham", 2, "width", "100%", "height", "200px", "margin-top", "12px", 3, "gridReady", "cellClicked", "cellValueChanged", "rowData", "columnDefs", "animateRows", "suppressAutoSize", "suppressDragLeaveHidesColumns", "rowSelection", "singleClickEdit"], ["id", "inputField", 1, "col-md-3", "flex", "flex-column"], ["for", "grossAmount", 1, "form-label"], ["useGrouping", "false", "aria-readonly", "true", "id", "grossAmount", "type", "text", 3, "ngModelChange", "readonly", "ngModel", "min"], ["for", "gstAmount", 1, "form-label"], ["useGrouping", "false", "aria-readonly", "true", "id", "gstAmount", "type", "text", 3, "ngModelChange", "readonly", "ngModel", "min"], ["for", "pstAmount", 1, "form-label"], ["useGrouping", "false", "aria-readonly", "true", "id", "pstAmount", "type", "text", 3, "ngModelChange", "readonly", "ngModel", "min"], ["for", "totalAmount", 1, "form-label"], ["useGrouping", "false", "id", "totalAmount", "type", "text", "aria-readonly", "true", 3, "ngModelChange", "readonly", "ngModel", "min"], ["header", "Other Details"], ["id", "inputField", 1, "p-field", "col-md-6"], [3, "valueSelected", "title", "id", "name"], ["id", "inputField", 1, "col-md-12"], ["id", "subject", "required", "", "type", "text", "pInputText", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["id", "terms", "required", "", "type", "text", "pInputText", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["id", "origin", "required", "", "type", "text", "pInputText", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["id", "validity", "required", "", "type", "text", "pInputText", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["id", "comments", "required", "", "type", "text", "pInputText", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["id", "paragraph", "required", "", "type", "text", "pInputText", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["id", "endNarration", "required", "", "type", "text", "pInputText", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "flex", "col-md-2", "gap-2", "align-items-center"], ["inputId", "isConfirmed", 3, "ngModelChange", "binary", "ngModel"], ["for", "isConfirmed"], ["header", "Linkind Item", 3, "visibleChange", "closeOnEscape", "maximizable", "modal", "visible", "draggable"], [1, "p-4"], ["styleClass", "p-datatable-gridlines", "dataKey", "id", "responsiveLayout", "scroll", 3, "paginator", "rows", "rowsPerPageOptions", "value", "rowHover", "paginatorDropdownAppendTo"], [1, "flex", "gap-1", "justify-content-end", "mt-4"], ["label", "Cancel", "severity", "warning", 3, "onClick", "outlined"], ["label", "Save", "severity", "contrast", 3, "loading", "outlined", "click", 4, "ngIf"], ["label", "Update", "severity", "contrast", 3, "loading", "outlined", "click", 4, "ngIf"], [1, "p-toolbar-group-left"], [1, "p-toolbar-separator", 2, "margin-right", "10px"], ["pButton", "", "icon", "pi pi-plus-circle", 1, "p-button-success", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], [1, "block", "md:mt-0", "p-input-icon-left"], [1, "pi", "pi-search"], ["pInputText", "", "type", "text", "placeholder", "Search...", 2, "height", "25px", "cursor", "pointer", 3, "input", "keydown.enter"], ["pSortableColumn", "Actions", 2, "min-width", "200px"], ["field", "Actions"], ["pSortableColumn", "voucher", 2, "min-width", "200px"], ["field", "voucher"], ["pSortableColumn", "type", 2, "min-width", "200px"], ["field", "type"], ["pSortableColumn", "status", 2, "min-width", "200px"], ["field", "status"], ["pSortableColumn", "Active", 2, "min-width", "200px"], ["field", "Active"], ["style", "height: 25px; width: 25px; cursor: pointer", "pButton", "", "pRipple", "", "icon", "pi pi-eye", "class", "p-button-rounded p-button-info mr-2", 3, "click", 4, "ngIf"], ["style", "height: 25px; width: 25px; cursor: pointer", "pButton", "", "pRipple", "", "icon", "pi pi-pencil", "class", "p-button-rounded p-button-info mr-2", 3, "click", 4, "ngIf"], ["style", "height: 25px; width: 25px; cursor: pointer", "pButton", "", "pRipple", "", "icon", "pi pi-trash", "class", "p-button-rounded p-button-warning mr-2", 3, "click", 4, "ngIf"], ["pButton", "", "pRipple", "", "style", "height: 25px; width: 25px; cursor: pointer", "icon", "pi pi-check", "class", "p-button-rounded p-button-warning mr-2", 3, "click", 4, "ngIf"], ["class", "yes-bg", "style", "height: 25px; cursor: pointer", 4, "ngIf"], ["class", "no-bg", 4, "ngIf"], ["pButton", "", "pRipple", "", "icon", "pi pi-eye", 1, "p-button-rounded", "p-button-info", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], ["pButton", "", "pRipple", "", "icon", "pi pi-pencil", 1, "p-button-rounded", "p-button-info", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], ["pButton", "", "pRipple", "", "icon", "pi pi-trash", 1, "p-button-rounded", "p-button-warning", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], ["pButton", "", "pRipple", "", "icon", "pi pi-check", 1, "p-button-rounded", "p-button-warning", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], [1, "yes-bg", 2, "height", "25px", "cursor", "pointer"], [1, "no-bg"], ["pSortableColumn", "namvouchere", 2, "min-width", "200px"], ["pSortableColumn", "date", 2, "min-width", "200px"], ["field", "date"], ["pButton", "", "pRipple", "", "label", "Select", 1, "p-button-rounded", "p-button-info", "mr-2", 3, "click"], ["label", "Save", "severity", "contrast", 3, "click", "loading", "outlined"], ["label", "Update", "severity", "contrast", 3, "click", "loading", "outlined"]],
    template: function ServiceQuotationComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "p-toolbar", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, ServiceQuotationComponent_ng_template_1_Template, 2, 0, "ng-template", 3)(2, ServiceQuotationComponent_ng_template_2_Template, 6, 0, "ng-template", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 5)(4, "p-table", 6, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, ServiceQuotationComponent_ng_template_6_Template, 16, 0, "ng-template", 7)(7, ServiceQuotationComponent_ng_template_7_Template, 16, 10, "ng-template", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "p-paginator", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("onPageChange", function ServiceQuotationComponent_Template_p_paginator_onPageChange_8_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.onPageChange($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "p-dialog", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("visibleChange", function ServiceQuotationComponent_Template_p_dialog_visibleChange_9_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.displayModal, $event) || (ctx.displayModal = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "p-tabView", 11)(11, "p-tabPanel", 12)(12, "div", 13)(13, "div", 14)(14, "div", 15)(15, "div", 16)(16, "div", 17)(17, "label", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](18, "Document Date");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "p-calendar", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function ServiceQuotationComponent_Template_p_calendar_ngModelChange_19_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.onDateChange($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_p_calendar_ngModelChange_19_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.issueDate, $event) || (ctx.serviceQuotationDto.issueDate = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "div", 20)(21, "div", 21)(22, "app-picker", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueSelected", function ServiceQuotationComponent_Template_app_picker_valueSelected_22_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.setPickerValue($event, "LocationTo"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](23, "div", 16)(24, "div", 21)(25, "app-picker", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueSelected", function ServiceQuotationComponent_Template_app_picker_valueSelected_25_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.setPickerValue($event, "Supplier"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](26, "div", 16)(27, "div", 21)(28, "app-picker", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueSelected", function ServiceQuotationComponent_Template_app_picker_valueSelected_28_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.setPickerValue($event, "Employee"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](29, "div", 16)(30, "div", 25)(31, "label", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](32, "Voucher Number");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](33, "input", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_input_ngModelChange_33_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.voucherNumber, $event) || (ctx.serviceQuotationDto.voucherNumber = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](34, "div", 28)(35, "label", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](36, "Business Month");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](37, "p-calendar", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_p_calendar_ngModelChange_37_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.businessMonth, $event) || (ctx.serviceQuotationDto.businessMonth = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](38, "div", 14)(39, "div", 15)(40, "div", 16)(41, "div", 30)(42, "label", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](43, "Invoice Submission Date");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](44, "p-calendar", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_p_calendar_ngModelChange_44_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.invoiceSubmissionDate, $event) || (ctx.serviceQuotationDto.invoiceSubmissionDate = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](45, "div", 32)(46, "label", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](47, "Indent Number");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](48, "input", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_input_ngModelChange_48_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.indentNumber, $event) || (ctx.serviceQuotationDto.indentNumber = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](49, "div", 16)(50, "div", 32)(51, "label", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](52, "Attention Person");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](53, "input", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_input_ngModelChange_53_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.attentionPerson, $event) || (ctx.serviceQuotationDto.attentionPerson = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](54, "div", 32)(55, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](56, "Designation");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](57, "input", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_input_ngModelChange_57_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.designation, $event) || (ctx.serviceQuotationDto.designation = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](58, "div", 16)(59, "div", 39)(60, "label", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](61, "Reference Number");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](62, "input", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_input_ngModelChange_62_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.referenceNumber, $event) || (ctx.serviceQuotationDto.referenceNumber = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](63, "div", 39)(64, "label", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](65, "Narration");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](66, "input", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_input_ngModelChange_66_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.remarks, $event) || (ctx.serviceQuotationDto.remarks = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](67, "div", 39)(68, "label", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](69, "Site ID:");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](70, "input", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_input_ngModelChange_70_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.siteId, $event) || (ctx.serviceQuotationDto.siteId = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](71, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](72, "div", 45)(73, "p-button", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ServiceQuotationComponent_Template_p_button_click_73_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.onAddRow());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](74, "p-button", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ServiceQuotationComponent_Template_p_button_click_74_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.onRemoveSelected());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](75, "div", 16)(76, "ag-grid-angular", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("gridReady", function ServiceQuotationComponent_Template_ag_grid_angular_gridReady_76_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.onGridReady($event));
        })("cellClicked", function ServiceQuotationComponent_Template_ag_grid_angular_cellClicked_76_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.cellClicked($event));
        })("cellValueChanged", function ServiceQuotationComponent_Template_ag_grid_angular_cellValueChanged_76_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.OnCellValueChanged($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](77, "div", 16)(78, "div", 49)(79, "label", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](80, "Gross Amount");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](81, "p-inputNumber", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_p_inputNumber_ngModelChange_81_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.grossAmount, $event) || (ctx.serviceQuotationDto.grossAmount = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](82, "div", 49)(83, "label", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](84, "GST Amount");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](85, "p-inputNumber", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_p_inputNumber_ngModelChange_85_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.gstAmount, $event) || (ctx.serviceQuotationDto.gstAmount = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](86, "div", 49)(87, "label", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](88, "PST Amount");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](89, "p-inputNumber", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_p_inputNumber_ngModelChange_89_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.pstAmount, $event) || (ctx.serviceQuotationDto.pstAmount = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](90, "div", 49)(91, "label", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](92, "Total Amount");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](93, "p-inputNumber", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_p_inputNumber_ngModelChange_93_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.totalAmount, $event) || (ctx.serviceQuotationDto.totalAmount = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](94, "p-tabPanel", 58)(95, "div", 16)(96, "div", 59)(97, "app-picker", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueSelected", function ServiceQuotationComponent_Template_app_picker_valueSelected_97_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.setPickerValue($event, "CostCenter"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](98, "div", 16)(99, "div", 59)(100, "app-picker", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueSelected", function ServiceQuotationComponent_Template_app_picker_valueSelected_100_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.setPickerValue($event, "Project"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](101, "div", 59)(102, "app-picker", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueSelected", function ServiceQuotationComponent_Template_app_picker_valueSelected_102_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.setPickerValue($event, "Site"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](103, "div", 16)(104, "div", 61)(105, "label", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](106, "Subject");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](107, "input", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_input_ngModelChange_107_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.subject, $event) || (ctx.serviceQuotationDto.subject = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](108, "div", 16)(109, "div", 61)(110, "label", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](111, "Terms");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](112, "input", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_input_ngModelChange_112_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.terms, $event) || (ctx.serviceQuotationDto.terms = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](113, "div", 16)(114, "div", 61)(115, "label", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](116, "Origin");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](117, "input", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_input_ngModelChange_117_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.origin, $event) || (ctx.serviceQuotationDto.origin = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](118, "div", 16)(119, "div", 61)(120, "label", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](121, "Validity");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](122, "input", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_input_ngModelChange_122_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.validity, $event) || (ctx.serviceQuotationDto.validity = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](123, "div", 16)(124, "div", 61)(125, "label", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](126, "Starting Comments");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](127, "input", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_input_ngModelChange_127_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.startingComments, $event) || (ctx.serviceQuotationDto.startingComments = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](128, "div", 16)(129, "div", 61)(130, "label", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](131, "Paragraph");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](132, "input", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_input_ngModelChange_132_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.paragraph, $event) || (ctx.serviceQuotationDto.paragraph = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](133, "div", 16)(134, "div", 61)(135, "label", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](136, "End Narration");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](137, "input", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_input_ngModelChange_137_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.endingComments, $event) || (ctx.serviceQuotationDto.endingComments = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](138, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](139, "div", 16)(140, "div", 59)(141, "app-picker", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueSelected", function ServiceQuotationComponent_Template_app_picker_valueSelected_141_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.setPickerValue($event, "VoucherStatus"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](142, "div", 32)(143, "label", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](144, "Voucher Status Remarks");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](145, "input", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_input_ngModelChange_145_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.remarks, $event) || (ctx.serviceQuotationDto.remarks = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](146, "div", 69)(147, "p-checkbox", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function ServiceQuotationComponent_Template_p_checkbox_ngModelChange_147_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.serviceQuotationDto.isConfirmed, $event) || (ctx.serviceQuotationDto.isConfirmed = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](148, "label", 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](149, "isConfirmed");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](150, "p-dialog", 72);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("visibleChange", function ServiceQuotationComponent_Template_p_dialog_visibleChange_150_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.displayItem, $event) || (ctx.displayItem = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](151, "div", 73)(152, "p-table", 74, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](154, ServiceQuotationComponent_ng_template_154_Template, 10, 0, "ng-template", 7)(155, ServiceQuotationComponent_ng_template_155_Template, 7, 2, "ng-template", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](156, "div", 75)(157, "p-button", 76);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("onClick", function ServiceQuotationComponent_Template_p_button_onClick_157_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.CloseModel());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](158, ServiceQuotationComponent_p_button_158_Template, 1, 2, "p-button", 77)(159, ServiceQuotationComponent_p_button_159_Template, 1, 2, "p-button", 78);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](160, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](161, "p-toast")(162, "p-confirmDialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](104, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx.tableData)("rowHover", true)("paginatorDropdownAppendTo", "body")("loading", ctx.loading)("globalFilterFields", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](105, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("rows", 5)("totalRecords", ctx.count)("showCurrentPageReport", true)("rowsPerPageOptions", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](106, _c3, ctx.count));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("maximizable", true)("closeOnEscape", false)("header", ctx.editMode ? "Edit Offer / Performa Invoice" : "Create Offer / Performa Invoice")("modal", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("visible", ctx.displayModal);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("draggable", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.issueDate);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("minDate", ctx.MinDate)("maxDate", ctx.today)("showOnFocus", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disable", ctx.editMode || ctx.addRow)("title", "User Location")("id", ctx.serviceQuotationDto.userLocationId)("name", ctx.serviceQuotationDto.userLocationName);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("title2", "Subledger")("title", "Client")("id", ctx.serviceQuotationDto.supplierSerialNumber)("name", ctx.serviceQuotationDto.supplierName)("chartOfAccountSubLedgerType", "3,4");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disable", ctx.editMode || ctx.addRow)("title", "Employee")("id", ctx.serviceQuotationDto.employeeErpId)("name", ctx.serviceQuotationDto.employeeName);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.voucherNumber);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.editMode);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.businessMonth);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.invoiceSubmissionDate);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("maxDate", ctx.maxDate)("showOnFocus", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.indentNumber);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.attentionPerson);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.designation);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.editMode);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.referenceNumber);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.remarks);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.siteId);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("rowData", ctx.rowData)("columnDefs", ctx.colDefs)("animateRows", true)("suppressAutoSize", true)("suppressDragLeaveHidesColumns", true)("rowSelection", ctx.rowSelection)("singleClickEdit", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("readonly", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.grossAmount);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("min", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("readonly", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.gstAmount);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("min", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("readonly", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.pstAmount);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("min", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("readonly", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.totalAmount);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("min", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("title", "CostCenter")("id", ctx.serviceQuotationDto.costCenterId)("name", ctx.serviceQuotationDto.costCenterName);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("title", "Project")("id", ctx.serviceQuotationDto.projectId)("name", ctx.serviceQuotationDto.projectName);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("title", "Site")("id", ctx.serviceQuotationDto.siteId)("name", ctx.serviceQuotationDto.siteName);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.subject);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.terms);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.origin);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.validity);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.startingComments);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.paragraph);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.endingComments);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("title", "VoucherStatus")("id", ctx.serviceQuotationDto.voucherStatusId)("name", ctx.serviceQuotationDto.voucherStatusName);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.remarks);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("binary", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.serviceQuotationDto.isConfirmed);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("closeOnEscape", false)("maximizable", true)("modal", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("visible", ctx.displayItem);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("draggable", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](108, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("paginator", true)("rows", 5)("rowsPerPageOptions", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](109, _c4))("value", ctx.itemData)("rowHover", true)("paginatorDropdownAppendTo", "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("outlined", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.editMode && !ctx.view);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.editMode && !ctx.view);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, primeng_button__WEBPACK_IMPORTED_MODULE_15__.ButtonDirective, primeng_button__WEBPACK_IMPORTED_MODULE_15__.Button, primeng_api__WEBPACK_IMPORTED_MODULE_12__.PrimeTemplate, primeng_dialog__WEBPACK_IMPORTED_MODULE_16__.Dialog, primeng_table__WEBPACK_IMPORTED_MODULE_17__.Table, primeng_table__WEBPACK_IMPORTED_MODULE_17__.SortableColumn, primeng_table__WEBPACK_IMPORTED_MODULE_17__.SortIcon, primeng_paginator__WEBPACK_IMPORTED_MODULE_18__.Paginator, primeng_inputnumber__WEBPACK_IMPORTED_MODULE_19__.InputNumber, _angular_forms__WEBPACK_IMPORTED_MODULE_20__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_20__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_20__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_20__.NgModel, primeng_toolbar__WEBPACK_IMPORTED_MODULE_21__.Toolbar, primeng_inputtext__WEBPACK_IMPORTED_MODULE_22__.InputText, primeng_calendar__WEBPACK_IMPORTED_MODULE_23__.Calendar, ag_grid_angular__WEBPACK_IMPORTED_MODULE_24__.AgGridAngular, primeng_checkbox__WEBPACK_IMPORTED_MODULE_25__.Checkbox, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_26__.ConfirmDialog, primeng_toast__WEBPACK_IMPORTED_MODULE_27__.Toast, primeng_tabview__WEBPACK_IMPORTED_MODULE_28__.TabView, primeng_tabview__WEBPACK_IMPORTED_MODULE_28__.TabPanel, _shared_components_picker_picker_component__WEBPACK_IMPORTED_MODULE_7__.PickerComponent],
    encapsulation: 2
  });
}

/***/ }),

/***/ 71586:
/*!****************************************************************************************!*\
  !*** ./src/app/main/commercial/setup forms/sales-tax-type/sales-tax-type.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SalesTaxTypeComponent: () => (/* binding */ SalesTaxTypeComponent)
/* harmony export */ });
/* harmony import */ var _app_main_generics_components_lookup_lookup_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../generics/components/lookup/lookup.component */ 72426);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primeng/api */ 17780);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/inputtext */ 48361);
/* harmony import */ var primeng_checkbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/checkbox */ 26771);
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/confirmdialog */ 68160);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/toast */ 61225);









const _c0 = () => [];
function SalesTaxTypeComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 2)(1, "div", 3)(2, "label", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Name:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "input", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function SalesTaxTypeComponent_ng_template_1_Template_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.dto.name, $event) || (ctx_r2.dto.name = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 6)(6, "div", 7)(7, "p-checkbox", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function SalesTaxTypeComponent_ng_template_1_Template_p_checkbox_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.dto.isActive, $event) || (ctx_r2.dto.isActive = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "label", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Active");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.dto.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.dto.isActive);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("binary", true);
  }
}
class SalesTaxTypeComponent extends _app_main_generics_components_lookup_lookup_component__WEBPACK_IMPORTED_MODULE_0__.LookupComponent {
  constructor(injector, msgService) {
    super(injector);
    this.msgService = msgService;
    this.dto = {
      id: 0,
      name: null,
      isActive: true
    };
    this.validateFromParent = true;
  }
  validateLocation() {
    if (this.dto.name == "" || this.dto.name == null) {
      this.msgService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill the Name field"
      });
      return;
    }
    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "SalesTaxType ");
  }
  static #_ = this.ɵfac = function SalesTaxTypeComponent_Factory(t) {
    return new (t || SalesTaxTypeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_2__.MessageService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: SalesTaxTypeComponent,
    selectors: [["app-sales-tax-type"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
    decls: 6,
    vars: 4,
    consts: [["dialogView", ""], ["action", "SalesTaxType", 3, "validateFunction", "mainDto", "excludedColumns", "validateFromParent"], [1, "row", "col-md-12"], [1, "col-md-12", "flex", "flex-column"], ["for", "name"], ["type", "text", "pInputText", "", "id", "name", "autocomplete", "off", 3, "ngModelChange", "ngModel"], [1, "row", "col-md-12", "mt-3"], [1, "flex", "align-items-center", "gap-2"], ["inputId", "active", 3, "ngModelChange", "ngModel", "binary"], ["for", "active", 1, "mb-0"]],
    template: function SalesTaxTypeComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "app-lookup", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("validateFunction", function SalesTaxTypeComponent_Template_app_lookup_validateFunction_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.validateLocation());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, SalesTaxTypeComponent_ng_template_1_Template, 10, 3, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "p-toast")(5, "p-confirmDialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("mainDto", ctx.dto)("excludedColumns", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](3, _c0))("validateFromParent", ctx.validateFromParent);
      }
    },
    dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgModel, primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__.InputText, primeng_checkbox__WEBPACK_IMPORTED_MODULE_5__.Checkbox, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_6__.ConfirmDialog, primeng_toast__WEBPACK_IMPORTED_MODULE_7__.Toast, _app_main_generics_components_lookup_lookup_component__WEBPACK_IMPORTED_MODULE_0__.LookupComponent],
    encapsulation: 2
  });
}

/***/ }),

/***/ 70514:
/*!****************************************************************************************!*\
  !*** ./src/app/main/commercial/setup forms/voucher-status/voucher-status.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VoucherStatusComponent: () => (/* binding */ VoucherStatusComponent)
/* harmony export */ });
/* harmony import */ var _app_main_generics_components_lookup_lookup_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../generics/components/lookup/lookup.component */ 72426);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primeng/api */ 17780);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/inputtext */ 48361);
/* harmony import */ var primeng_checkbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/checkbox */ 26771);
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/confirmdialog */ 68160);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/toast */ 61225);









const _c0 = () => [];
function VoucherStatusComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 2)(1, "div", 3)(2, "label", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Name:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "input", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function VoucherStatusComponent_ng_template_1_Template_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.dto.name, $event) || (ctx_r2.dto.name = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 6)(6, "div", 7)(7, "p-checkbox", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function VoucherStatusComponent_ng_template_1_Template_p_checkbox_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.dto.isActive, $event) || (ctx_r2.dto.isActive = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "label", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Active");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.dto.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.dto.isActive);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("binary", true);
  }
}
class VoucherStatusComponent extends _app_main_generics_components_lookup_lookup_component__WEBPACK_IMPORTED_MODULE_0__.LookupComponent {
  constructor(injector, msgService) {
    super(injector);
    this.msgService = msgService;
    this.dto = {
      id: 0,
      name: null,
      isActive: true
    };
    this.validateFromParent = true;
  }
  validateLocation() {
    if (this.dto.name == "" || this.dto.name == null) {
      this.msgService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill the Name field"
      });
      return;
    }
    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "VoucherStatus");
  }
  static #_ = this.ɵfac = function VoucherStatusComponent_Factory(t) {
    return new (t || VoucherStatusComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_2__.MessageService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: VoucherStatusComponent,
    selectors: [["app-voucher-status"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
    decls: 6,
    vars: 4,
    consts: [["dialogView", ""], ["action", "VoucherStatus", 3, "validateFunction", "mainDto", "excludedColumns", "validateFromParent"], [1, "row", "col-md-12"], [1, "col-md-12", "flex", "flex-column"], ["for", "name"], ["type", "text", "pInputText", "", "id", "name", "autocomplete", "off", 3, "ngModelChange", "ngModel"], [1, "row", "col-md-12", "mt-3"], [1, "flex", "align-items-center", "gap-2"], ["inputId", "active", 3, "ngModelChange", "ngModel", "binary"], ["for", "active", 1, "mb-0"]],
    template: function VoucherStatusComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "app-lookup", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("validateFunction", function VoucherStatusComponent_Template_app_lookup_validateFunction_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.validateLocation());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, VoucherStatusComponent_ng_template_1_Template, 10, 3, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "p-toast")(5, "p-confirmDialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("mainDto", ctx.dto)("excludedColumns", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](3, _c0))("validateFromParent", ctx.validateFromParent);
      }
    },
    dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgModel, primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__.InputText, primeng_checkbox__WEBPACK_IMPORTED_MODULE_5__.Checkbox, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_6__.ConfirmDialog, primeng_toast__WEBPACK_IMPORTED_MODULE_7__.Toast, _app_main_generics_components_lookup_lookup_component__WEBPACK_IMPORTED_MODULE_0__.LookupComponent],
    encapsulation: 2
  });
}

/***/ }),

/***/ 29221:
/*!***********************************************************************!*\
  !*** ./src/app/main/commercial/shared/services/commercial.service.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommercialService: () => (/* binding */ CommercialService)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 39545);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 70271);
/* harmony import */ var _shared_AppBaseURL_appBaseURL__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/AppBaseURL/appBaseURL */ 15473);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 46443);





class CommercialService {
  constructor(http) {
    this.http = http;
    this.commonUrl = "api/services/app/";
    this.baseUrl = _shared_AppBaseURL_appBaseURL__WEBPACK_IMPORTED_MODULE_1__.newBaseUrl + this.commonUrl;
    this.url = "";
    this.url_ = "";
  }
  getAll(target, IsDropdown, skipCount, max) {
    this.url = this.baseUrl;
    this.url += target + "/GetAll";
    debugger;
    if (IsDropdown) {
      this.url = this.url + "?IsDropdown=true";
    }
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  create(dto, target) {
    debugger;
    console.log(dto);
    this.url = this.baseUrl;
    this.url += target + "/Create";
    debugger;
    return this.http.post(this.url, dto);
  }
  delete(id, target) {
    this.url = this.baseUrl;
    this.url += target + "/Delete?Id=" + id;
    return this.http.delete(this.url);
  }
  approve(id, target) {
    this.url = this.baseUrl;
    this.url += target + "/ApproveDocument?Id=" + id;
    return this.http.post(this.url, {});
  }
  getDataForEdit(id, target) {
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/GetForEdit?Id=" + id;
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      return response["result"];
    }));
  }
  getData(id, target) {
    this.url = this.baseUrl;
    this.url += target + "/Get?Id=" + id;
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      return response["result"];
    }));
  }
  update(dto, target) {
    debugger;
    console.log(dto);
    this.url = this.baseUrl;
    this.url += target + "/Edit";
    return this.http.post(this.url, dto);
  }
  getSeviceQuotationInvoiceFilters(target, dateRange, startDate, endDate, supplierId, status, IsDropdown, skipCount, max) {
    debugger;
    this.url = `${this.baseUrl}${target}/GetAll`;
    let queryParams = [];
    if (dateRange) {
      queryParams.push(`DateRange=${moment__WEBPACK_IMPORTED_MODULE_0__(dateRange).format("YYYY-MM-DD")}`);
    }
    if (startDate) {
      queryParams.push(`StartDate=${moment__WEBPACK_IMPORTED_MODULE_0__(startDate).format("YYYY-MM-DD")}`);
    }
    if (endDate) {
      queryParams.push(`EndDate=${moment__WEBPACK_IMPORTED_MODULE_0__(endDate).format("YYYY-MM-DD")}`);
    }
    if (supplierId) {
      queryParams.push(`SupplierId=${supplierId}`);
    }
    if (status) {
      queryParams.push(`Status=${status}`);
    }
    if (IsDropdown) {
      queryParams.push(`IsDropdown=true`);
    }
    if (skipCount !== undefined) {
      queryParams.push(`SkipCount=${skipCount}`);
    }
    if (max !== undefined) {
      queryParams.push(`Max=${max}`);
    }
    if (queryParams.length) {
      this.url += `?${queryParams.join("&")}`;
    }
    debugger;
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  updateSalexTaxInvoice(dto, target) {
    debugger;
    console.log(dto);
    this.url = this.baseUrl;
    this.url += target + "/BulkUpdateSalesTaxDetails";
    debugger;
    return this.http.post(this.url, dto);
  }
  getInvoiceNumber(target, salesTaxId, salesTaxDate) {
    debugger;
    this.url = `${this.baseUrl}${target}/GetSalesTaxInvoiceNumber`;
    let queryParams = [];
    if (salesTaxId) {
      queryParams.push(`SalesTaxTypeId=${salesTaxId}`);
    }
    if (salesTaxDate) {
      queryParams.push(`SalesTaxApprovalDate=${moment__WEBPACK_IMPORTED_MODULE_0__(salesTaxDate).format("YYYY-MM-DD")}`);
    }
    if (queryParams.length) {
      this.url += `?${queryParams.join("&")}`;
    }
    debugger;
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  static #_ = this.ɵfac = function CommercialService_Factory(t) {
    return new (t || CommercialService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: CommercialService,
    factory: CommercialService.ɵfac,
    providedIn: "root"
  });
}

/***/ })

}]);
//# sourceMappingURL=src_app_main_commercial_commercial_module_ts.js.map