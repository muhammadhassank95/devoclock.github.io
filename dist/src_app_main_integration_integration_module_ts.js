"use strict";
(self["webpackChunkERP"] = self["webpackChunkERP"] || []).push([["src_app_main_integration_integration_module_ts"],{

/***/ 38484:
/*!*****************************************************************!*\
  !*** ./src/app/main/integration/defaults/defaults-component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultsComponent: () => (/* binding */ DefaultsComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 70271);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 89475);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 61318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 77919);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _integration_module_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../integration-module.service */ 37531);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/api */ 17780);
/* harmony import */ var _shared_servicesAndDtos_Services_suggestion_lookup_table_moda_l_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service */ 6707);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/button */ 49136);
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/dialog */ 16280);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/table */ 76676);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/paginator */ 43157);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/dropdown */ 26895);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/toolbar */ 31973);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/inputtext */ 48361);
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/confirmdialog */ 68160);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/toast */ 61225);

















const _c0 = () => ({
  width: "100%",
  "overflow-y": "auto"
});
const _c1 = () => ["chartOfAccountSerialNumber", "name", "chartOfAccountName", "chartOfAccountAccountTypeName"];
const _c2 = a0 => [5, 10, 50, 100, a0];
function DefaultsComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h3", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Defaults Integration");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function DefaultsComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 27)(1, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "i", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "input", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("input", function DefaultsComponent_ng_template_4_Template_input_input_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      const defaultTable_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](7);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.onGlobalFilter(defaultTable_r4, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 31)(5, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function DefaultsComponent_ng_template_4_Template_span_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.handleCreateDefault());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, " Create ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("rounded", true);
  }
}
function DefaultsComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr")(1, "th", 33)(2, "div", 34)(3, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, " Value");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "p-sortIcon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "th", 37)(7, "div", 34)(8, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "AccountId");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "p-sortIcon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "th", 39)(12, "div", 34)(13, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "p-sortIcon", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "th", 41)(17, "div", 34)(18, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "Type ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](20, "p-sortIcon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "th", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "Actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function DefaultsComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr")(1, "td", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "td", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "td", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "td", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "td", 45)(10, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function DefaultsComponent_ng_template_9_Template_span_click_10_listener() {
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.getForEdit(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "svg", 47)(12, "g", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "path", 49)(14, "path", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "defs")(16, "clipPath", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](17, "rect", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "span", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function DefaultsComponent_ng_template_9_Template_span_click_18_listener() {
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.delete(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "svg", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](20, "path", 55)(21, "path", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("title", item_r6.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", item_r6.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("title", item_r6.chartOfAccountSerialNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", item_r6.chartOfAccountSerialNumber, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("title", item_r6.chartOfAccountName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", item_r6.chartOfAccountName, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("title", item_r6.chartOfAccountAccountTypeName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", item_r6.chartOfAccountAccountTypeName, " ");
  }
}
function DefaultsComponent_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate2"]("title", "", item_r7.id, " - ", item_r7.name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"]("", item_r7.id, " - ", item_r7.name, "");
  }
}
function DefaultsComponent_ng_template_19_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate2"]("title", "", item_r8.id, " - ", item_r8.name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"]("", item_r8.id, " - ", item_r8.name, "");
  }
}
function DefaultsComponent_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, DefaultsComponent_ng_template_19_div_0_Template, 2, 5, "div", 58);
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", item_r8);
  }
}
class DefaultsComponent {
  constructor(integrationService, messageService, confirmationService, _suggestionLookUpService) {
    this.integrationService = integrationService;
    this.messageService = messageService;
    this.confirmationService = confirmationService;
    this._suggestionLookUpService = _suggestionLookUpService;
    this.target = "DefaultIntegrations";
    this.tableData = [];
    this.loading = false;
    this.isGLModalVisible = false;
    this.currentPage = 1;
    this.skipCount = 0;
    this.maxCount = 10;
    this.chartOfAccountDropdown = [];
    this.glFormGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroup({
      chartOfAccount: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl({}, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required),
      id: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(0, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required),
      name: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl("", _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required),
      remarks: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl("")
    });
  }
  ngOnInit() {
    this.getAll(this.skipCount, this.maxCount);
    this.fetchDropdownData('ChartOfAccount').subscribe(items => this.chartOfAccountDropdown = items);
  }
  fetchDropdownData(target, limit = 100, offset = 0) {
    return this._suggestionLookUpService.getAll(offset, limit, '', target, '').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(response => {
      if (response && response.items) {
        return response.items.map(item => ({
          id: +item.id?.split("/")[0] || 0,
          name: item.name
        }));
      } else {
        console.error(`Invalid response format for ${target}: `, response);
        return [];
      }
    }));
  }
  onDropdownChange(event) {
    const selectedItem = event.value;
    if (selectedItem) {
      console.log(selectedItem);
      this.glFormGroup.patchValue({
        chartOfAccountName: selectedItem.name,
        chartOfAccountId: selectedItem.id
      });
    }
  }
  getAll(skipCount, maxCount) {
    this.integrationService.getAll(this.target, skipCount, maxCount).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.catchError)(error => {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.throwError)(() => new Error(error.error.error.message || "An unknown error occurred"));
    })).subscribe(response => {
      this.tableData = response.items;
      this.count = response.totalCount;
      this.loading = false;
    });
  }
  getForEdit(id, viewOnly) {
    this.glFormGroup.reset();
    if (viewOnly) {
      this.glFormGroup.disable();
    } else {
      this.glFormGroup.enable();
    }
    this.isGLModalVisible = true;
    this.integrationService.getDataForEdit(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.catchError)(error => {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.throwError)(() => new Error(error.error.error.message || "An unknown error occurred"));
    })).subscribe(result => {
      console.log({
        result
      });
      let obj = {
        id: result.chartOfAccountId,
        name: result.chartOfAccountName
      };
      this.glFormGroup.patchValue({
        ...result,
        chartOfAccount: obj
      });
    });
  }
  save() {
    this.loading = true;
    let obj = {
      ...this.glFormGroup.value,
      chartOfAccountId: this.glFormGroup.value.chartOfAccount.id,
      chartOfAccountName: this.glFormGroup.value.chartOfAccount.name
    };
    if (this.glFormGroup.value.id > 0) {
      this.integrationService.update(obj, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.catchError)(error => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.throwError)(() => new Error(error.error.error.message || "An unknown error occurred"));
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.finalize)(() => this.loading = false)).subscribe(_ => {
        this.isGLModalVisible = false;
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Updated Successfully"
        });
        this.getAll(this.skipCount, this.maxCount);
      });
    } else {
      this.integrationService.create(obj, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.catchError)(error => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.throwError)(() => new Error(error.error.error.message || "An unknown error occurred"));
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.finalize)(() => this.loading = false)).subscribe(_ => {
        this.isGLModalVisible = false;
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Created Successfully"
        });
        this.getAll(this.skipCount, this.maxCount);
      });
    }
  }
  delete(id) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete this?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.loading = true;
        this.integrationService.delete(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.finalize)(() => {
          this.loading = false;
        }), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.catchError)(error => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message
          });
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.throwError)(() => new Error(error.error.error.message || "An unknown error occurred"));
        })).subscribe({
          next: response => {
            if (response) {
              this.messageService.add({
                severity: "info",
                summary: "Confirmed",
                detail: "Deleted Successfully"
              });
              this.getAll(this.skipCount, this.maxCount);
            }
          }
        });
      }
    });
  }
  handleCreateDefault() {
    let glFormPatchValues = {
      chartOfAccountId: null,
      chartOfAccountName: "",
      id: 0,
      name: "",
      remarks: ""
    };
    this.glFormGroup.reset();
    this.glFormGroup.patchValue(glFormPatchValues);
    this.isGLModalVisible = true;
  }
  setPickerValue(value, title, title2 = "") {
    debugger;
    switch (title) {
      case "ChartOfAccount":
        console.log(title, value);
        this.glFormGroup.patchValue({
          chartOfAccountName: value.name,
          chartOfAccountId: value.id?.split("/")[0] || 0,
          chartOfAccountSerialNumber: value.id?.split("/")[1] || 0
        });
        // this.MakeVoucher();
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  onGlobalFilter(table, event) {
    table.filterGlobal(event.target.value, "contains");
  }
  onPageChange(event) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.skipCount = (this.currentPage - 1) * 10;
    this.loading = true;
    this.getAll(this.skipCount, this.maxCount);
  }
  static #_ = this.ɵfac = function DefaultsComponent_Factory(t) {
    return new (t || DefaultsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_integration_module_service__WEBPACK_IMPORTED_MODULE_0__.IntegrationModuleService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_8__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_8__.ConfirmationService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_shared_servicesAndDtos_Services_suggestion_lookup_table_moda_l_service__WEBPACK_IMPORTED_MODULE_1__.SuggestionLookupTableModaLService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: DefaultsComponent,
    selectors: [["app-general-ledger"]],
    decls: 35,
    vars: 29,
    consts: [["defaultTable", ""], [1, "defaults-integration-box"], [1, "tab-content-box"], ["styleClass", "pb-4"], ["pTemplate", "left"], ["pTemplate", "right"], [1, "card"], ["styleClass", "p-datatable-gridlines", "scrollHeight", "75vh", "dataKey", "id", "responsiveLayout", "scroll", 3, "value", "scrollable", "rowHover", "loading", "paginatorDropdownAppendTo", "totalRecords", "globalFilterFields"], ["pTemplate", "header"], ["pTemplate", "body"], ["currentPageReportTemplate", "Showing {first} to {last} of {totalRecords} entries", 1, "mt-4", 3, "onPageChange", "rows", "totalRecords", "showCurrentPageReport", "rowsPerPageOptions"], [1, "defaults-integration-modal", 3, "visibleChange", "maximizable", "header", "modal", "visible", "draggable"], [3, "ngSubmit", "formGroup"], [1, "row"], ["id", "inputField", 1, "col-md-12", "p-field", "flex-grow-1", "d-flex", "flex-column"], [1, ""], ["formControlName", "chartOfAccount", "optionLabel", "name", "placeholder", "Chart of Account", 3, "options", "filter", "showClear", "filterBy"], ["pTemplate", "item"], ["pTemplate", "selectedItem"], [1, "row", "mt-3"], [1, "col-md-12", "flex", "flex-column"], ["type", "text", "pInputText", "", "required", "", "formControlName", "name", 1, "w-100"], ["type", "text", "pInputText", "", "formControlName", "remarks", 1, "w-100"], [1, "flex", "justify-content-end", "mt-3", "position-absolute", "bottom-0", "w-100", 2, "left", "0", "border-top", "1px solid #DBDBDB", "background-color", "#FBFBFB"], ["type", "submit", "label", "Submit", 1, "submit", 2, "padding", "1rem 1.5rem", 3, "loading", "disabled"], [1, "cancel-modal"], [1, "tab-name", "m-0"], [1, "table-search-container"], [1, "block", "md:mt-0", "p-input-icon-left"], [1, "pi", "pi-search"], ["pInputText", "", "type", "text", "placeholder", "Search...", 1, "globalSearchStyle", 3, "input"], [1, "p-toolbar-group-left"], ["pButton", "", "pRipple", "", 1, "create-btn", "p-button-success", 3, "click", "rounded"], ["title", "Value", "pSortableColumn", "name", 1, "nowrap"], [1, "d-flex", "justify-content-between"], [1, "th-data"], ["field", "name"], ["title", "AccountId", "pSortableColumn", "chartOfAccountSerialNumber", 1, "nowrap"], ["field", "chartOfAccountSerialNumber"], ["title", "Name", "pSortableColumn", "chartOfAccountName", 1, "nowrap"], ["field", "chartOfAccountName"], ["title", "Type ", "pSortableColumn", "chartOfAccountAccountTypeName", 1, "nowrap"], ["field", "chartOfAccountAccountTypeName"], [1, "nowrap"], [1, "no-wrap-header", 3, "title"], [1, "icon-group"], [1, "edit-btn", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["clip-path", "url(#clip0_530_1269)"], ["d", "M12.7146 4.5625L13.4081 3.86903C13.5213 3.75589 13.6111 3.62156 13.6723 3.47371C13.7336 3.32585 13.7651 3.16738 13.7651 3.00733C13.7651 2.84729 13.7336 2.68882 13.6723 2.54096C13.6111 2.39311 13.5213 2.25878 13.4081 2.14564L12.1197 0.857056C11.8911 0.628617 11.5811 0.500298 11.2579 0.500298C10.9347 0.500298 10.6247 0.628617 10.3961 0.857056L9.70264 1.55054L12.7146 4.5625Z", "fill", "#019999"], ["d", "M9.12837 2.125L1.29061 9.96278C1.22851 10.0248 1.18821 10.1052 1.17576 10.1921L0.76533 13.0358C0.757082 13.0935 0.761311 13.1522 0.77773 13.2081C0.794149 13.2639 0.822375 13.3156 0.860499 13.3596C0.898622 13.4036 0.945753 13.4389 0.998704 13.4632C1.05165 13.4874 1.10919 13.4999 1.16742 13.5C1.1866 13.5001 1.20575 13.4987 1.22474 13.496L4.07266 13.0898C4.1597 13.0773 4.24036 13.0369 4.30255 12.9747L12.1403 5.13696L9.12837 2.125Z", "fill", "#019999"], ["id", "clip0_530_1269"], ["width", "13", "height", "13", "fill", "white", "transform", "translate(0.765137 0.5)"], [1, "delete-btn", "mr-2", 3, "click"], ["width", "15", "height", "19", "viewBox", "0 0 15 19", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M14.1401 2.75H10.7651V2.375C10.7651 1.34113 9.92401 0.5 8.89014 0.5H6.64014C5.60626 0.5 4.76514 1.34113 4.76514 2.375V2.75H1.39014C0.976137 2.75 0.640137 3.086 0.640137 3.5V4.625C0.640137 5.039 0.976137 5.375 1.39014 5.375H14.1401C14.5541 5.375 14.8901 5.039 14.8901 4.625V3.5C14.8901 3.086 14.5541 2.75 14.1401 2.75ZM6.26514 2.375C6.26514 2.16838 6.43351 2 6.64014 2H8.89014C9.09676 2 9.26514 2.16838 9.26514 2.375V2.75H6.26514V2.375Z", "fill", "#FF0000"], ["d", "M13.8703 6.37063C13.7282 6.21425 13.5264 6.125 13.3153 6.125H2.2153C2.00418 6.125 1.80242 6.21425 1.6603 6.37063C1.51817 6.527 1.4488 6.73625 1.46867 6.94662L2.39042 16.5796C2.49505 17.6746 3.45842 18.5004 4.63142 18.5004H10.8992C12.0718 18.5004 13.0355 17.6746 13.1402 16.5796L14.0619 6.94662C14.0822 6.73625 14.0124 6.527 13.8703 6.37063ZM6.01255 16.6235C5.99643 16.6242 5.98067 16.625 5.96455 16.625C5.57192 16.625 5.24193 16.3197 5.2168 15.9222L4.7668 8.79725C4.74092 8.384 5.0548 8.02775 5.46805 8.0015C5.88243 7.979 6.23793 8.2895 6.2638 8.70275L6.7138 15.8277C6.73967 16.241 6.4258 16.5972 6.01255 16.6235ZM10.3138 15.9222C10.2887 16.3197 9.95867 16.625 9.56605 16.625C9.5503 16.625 9.53417 16.6246 9.51805 16.6235C9.10442 16.5972 8.79093 16.241 8.8168 15.8277L9.2668 8.70275C9.29305 8.28912 9.64742 7.97825 10.0625 8.0015C10.4762 8.02775 10.7897 8.384 10.7638 8.79725L10.3138 15.9222Z", "fill", "#FF0000"], [1, "one-dropdown-list", "nowrap", 3, "title"], ["class", "one-dropdown nowrap", 3, "title", 4, "ngIf"], [1, "one-dropdown", "nowrap", 3, "title"]],
    template: function DefaultsComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "p-toolbar", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, DefaultsComponent_ng_template_3_Template, 2, 0, "ng-template", 4)(4, DefaultsComponent_ng_template_4_Template, 7, 1, "ng-template", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 6)(6, "p-table", 7, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, DefaultsComponent_ng_template_8_Template, 23, 0, "ng-template", 8)(9, DefaultsComponent_ng_template_9_Template, 22, 8, "ng-template", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "p-paginator", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("onPageChange", function DefaultsComponent_Template_p_paginator_onPageChange_10_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.onPageChange($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "p-dialog", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("visibleChange", function DefaultsComponent_Template_p_dialog_visibleChange_11_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.isGLModalVisible, $event) || (ctx.isGLModalVisible = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "form", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function DefaultsComponent_Template_form_ngSubmit_12_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.save());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 13)(14, "div", 14)(15, "label", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Chart of Account:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "p-dropdown", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](18, DefaultsComponent_ng_template_18_Template, 2, 5, "ng-template", 17)(19, DefaultsComponent_ng_template_19_Template, 1, 1, "ng-template", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "div", 19)(21, "div", 20)(22, "label", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, "Name:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](24, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "div", 19)(26, "div", 20)(27, "label", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, "Remarks:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](29, "input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](31, "p-button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](33, "p-toast")(34, "p-confirmDialog", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](25, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", ctx.tableData)("scrollable", true)("rowHover", true)("loading", ctx.loading)("paginatorDropdownAppendTo", "body")("totalRecords", ctx.tableData == null ? null : ctx.tableData.length)("globalFilterFields", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](26, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("rows", 10)("totalRecords", ctx.count)("showCurrentPageReport", true)("rowsPerPageOptions", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](27, _c2, ctx.count));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("maximizable", true)("header", ctx.glFormGroup.value.id > 0 ? "Edit Default" : "Create Default")("modal", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("visible", ctx.isGLModalVisible);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("draggable", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.glFormGroup);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("options", ctx.chartOfAccountDropdown)("filter", true)("showClear", true)("filterBy", "id,name");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("loading", ctx.loading)("disabled", ctx.glFormGroup.invalid);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, primeng_button__WEBPACK_IMPORTED_MODULE_10__.ButtonDirective, primeng_button__WEBPACK_IMPORTED_MODULE_10__.Button, primeng_api__WEBPACK_IMPORTED_MODULE_8__.PrimeTemplate, primeng_dialog__WEBPACK_IMPORTED_MODULE_11__.Dialog, primeng_table__WEBPACK_IMPORTED_MODULE_12__.Table, primeng_table__WEBPACK_IMPORTED_MODULE_12__.SortableColumn, primeng_table__WEBPACK_IMPORTED_MODULE_12__.SortIcon, primeng_paginator__WEBPACK_IMPORTED_MODULE_13__.Paginator, primeng_dropdown__WEBPACK_IMPORTED_MODULE_14__.Dropdown, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.RequiredValidator, primeng_toolbar__WEBPACK_IMPORTED_MODULE_15__.Toolbar, primeng_inputtext__WEBPACK_IMPORTED_MODULE_16__.InputText, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_17__.ConfirmDialog, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, primeng_toast__WEBPACK_IMPORTED_MODULE_18__.Toast],
    encapsulation: 2
  });
}

/***/ }),

/***/ 37531:
/*!****************************************************************!*\
  !*** ./src/app/main/integration/integration-module.service.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IntegrationModuleService: () => (/* binding */ IntegrationModuleService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 70271);
/* harmony import */ var _shared_AppBaseURL_appBaseURL__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/AppBaseURL/appBaseURL */ 15473);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 46443);




class IntegrationModuleService {
  constructor(http) {
    this.http = http;
    this.commonUrl = "api/services/app/";
    this.baseUrl = _shared_AppBaseURL_appBaseURL__WEBPACK_IMPORTED_MODULE_0__.newBaseUrl + this.commonUrl;
    this.url = "";
    this.url_ = "";
  }
  getAll(target, skipCount, maxCount) {
    this.url = `${this.baseUrl}${target}/GetAll?SkipCount=${skipCount}&MaxResultCount=${maxCount}`;
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  create(dto, target) {
    console.log(dto);
    this.url = this.baseUrl;
    this.url += target + "/Create";
    return this.http.post(this.url, dto);
  }
  delete(id, target) {
    this.url = this.baseUrl;
    this.url += target + "/Delete?Id=" + id;
    return this.http.delete(this.url);
  }
  approve(id, target) {
    this.url = this.baseUrl;
    this.url += target + "/Approve?Id=" + id;
    return this.http.post(this.url, {});
  }
  getDataForEdit(id, target) {
    this.url = this.baseUrl;
    this.url += target + "/GetForEdit?Id=" + id;
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(response => {
      return response["result"];
    }));
  }
  getData(id, target) {
    this.url = this.baseUrl;
    this.url += target + "/Get?Id=" + id;
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(response => {
      return response["result"];
    }));
  }
  update(dto, target) {
    console.log(dto);
    this.url = this.baseUrl;
    this.url += target + "/Edit";
    return this.http.post(this.url, dto);
  }
  markChequeAsCancelled(id, target) {
    this.url = this.baseUrl;
    this.url += target + "/MarkChequeAsCancelled?id=" + id;
    return this.http.post(this.url, {
      id
    });
  }
  static #_ = this.ɵfac = function IntegrationModuleService_Factory(t) {
    return new (t || IntegrationModuleService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: IntegrationModuleService,
    factory: IntegrationModuleService.ɵfac,
    providedIn: "root"
  });
}

/***/ }),

/***/ 18782:
/*!****************************************************************!*\
  !*** ./src/app/main/integration/integration-routing.module.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IntegrationRoutingModule: () => (/* binding */ IntegrationRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _defaults_defaults_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaults/defaults-component */ 38484);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);




const routes = [{
  path: "",
  children: [{
    path: "defaults",
    component: _defaults_defaults_component__WEBPACK_IMPORTED_MODULE_0__.DefaultsComponent
  }]
}];
class IntegrationRoutingModule {
  static #_ = this.ɵfac = function IntegrationRoutingModule_Factory(t) {
    return new (t || IntegrationRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: IntegrationRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](IntegrationRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 71879:
/*!********************************************************!*\
  !*** ./src/app/main/integration/integration.module.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IntegrationModule: () => (/* binding */ IntegrationModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/button */ 49136);
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/dialog */ 16280);
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/dynamicdialog */ 55079);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/table */ 76676);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/paginator */ 43157);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/toolbar */ 31973);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/inputtext */ 48361);
/* harmony import */ var primeng_checkbox__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/checkbox */ 26771);
/* harmony import */ var primeng_menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/menu */ 23673);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/api */ 17780);
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/confirmdialog */ 68160);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/toast */ 61225);
/* harmony import */ var primeng_inputswitch__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/inputswitch */ 46764);
/* harmony import */ var _integration_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./integration-routing.module */ 18782);
/* harmony import */ var _defaults_defaults_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaults/defaults-component */ 38484);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/shared.module */ 31699);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);

// Primeng


















class IntegrationModule {
  static #_ = this.ɵfac = function IntegrationModule_Factory(t) {
    return new (t || IntegrationModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: IntegrationModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    providers: [primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_4__.DynamicDialogRef, primeng_toolbar__WEBPACK_IMPORTED_MODULE_5__.ToolbarModule, primeng_menu__WEBPACK_IMPORTED_MODULE_6__.MenuModule, primeng_api__WEBPACK_IMPORTED_MODULE_7__.MessageService, primeng_api__WEBPACK_IMPORTED_MODULE_7__.ConfirmationService],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, _integration_routing_module__WEBPACK_IMPORTED_MODULE_0__.IntegrationRoutingModule, primeng_button__WEBPACK_IMPORTED_MODULE_9__.ButtonModule, primeng_dialog__WEBPACK_IMPORTED_MODULE_10__.DialogModule, primeng_table__WEBPACK_IMPORTED_MODULE_11__.TableModule, primeng_paginator__WEBPACK_IMPORTED_MODULE_12__.PaginatorModule, primeng_toolbar__WEBPACK_IMPORTED_MODULE_5__.ToolbarModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_13__.InputTextModule, primeng_checkbox__WEBPACK_IMPORTED_MODULE_14__.CheckboxModule, primeng_menu__WEBPACK_IMPORTED_MODULE_6__.MenuModule, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_15__.ConfirmDialogModule, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.ReactiveFormsModule, primeng_toast__WEBPACK_IMPORTED_MODULE_17__.ToastModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule, primeng_inputswitch__WEBPACK_IMPORTED_MODULE_18__.InputSwitchModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](IntegrationModule, {
    declarations: [_defaults_defaults_component__WEBPACK_IMPORTED_MODULE_1__.DefaultsComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, _integration_routing_module__WEBPACK_IMPORTED_MODULE_0__.IntegrationRoutingModule, primeng_button__WEBPACK_IMPORTED_MODULE_9__.ButtonModule, primeng_dialog__WEBPACK_IMPORTED_MODULE_10__.DialogModule, primeng_table__WEBPACK_IMPORTED_MODULE_11__.TableModule, primeng_paginator__WEBPACK_IMPORTED_MODULE_12__.PaginatorModule, primeng_toolbar__WEBPACK_IMPORTED_MODULE_5__.ToolbarModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_13__.InputTextModule, primeng_checkbox__WEBPACK_IMPORTED_MODULE_14__.CheckboxModule, primeng_menu__WEBPACK_IMPORTED_MODULE_6__.MenuModule, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_15__.ConfirmDialogModule, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.ReactiveFormsModule, primeng_toast__WEBPACK_IMPORTED_MODULE_17__.ToastModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule, primeng_inputswitch__WEBPACK_IMPORTED_MODULE_18__.InputSwitchModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_main_integration_integration_module_ts.js.map