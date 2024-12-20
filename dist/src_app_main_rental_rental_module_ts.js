"use strict";
(self["webpackChunkERP"] = self["webpackChunkERP"] || []).push([["src_app_main_rental_rental_module_ts"],{

/***/ 39705:
/*!********************************************************************************!*\
  !*** ./src/app/main/rental/house-rent-invoice/house-rent-invoice.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HouseRentInvoiceComponent: () => (/* binding */ HouseRentInvoiceComponent)
/* harmony export */ });
/* harmony import */ var _Users_muhammadhassankhan_Documents_devoclock_github_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 89475);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 61318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 77919);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _budget_shared_Dtos_restriction_dto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../budget/shared/Dtos/restriction-dto */ 97223);
/* harmony import */ var _shared_Utials_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/Utials/utils */ 2584);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _rental_shared_services_rental_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../rental/shared/services/rental.service */ 9725);
/* harmony import */ var _budget_shared_services_restriction_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../budget/shared/services/restriction.service */ 92076);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/api */ 17780);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/button */ 49136);
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/dialog */ 16280);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/table */ 76676);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/toolbar */ 31973);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/inputtext */ 48361);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/calendar */ 41314);
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ag-grid-angular */ 34733);
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! primeng/confirmdialog */ 68160);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primeng/toast */ 61225);
/* harmony import */ var _shared_components_picker_picker_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/components/picker/picker.component */ 79023);





















const _c0 = () => ({
  width: "100%",
  "overflow-y": "auto"
});
const _c1 = () => [5, 10, 20];
const _c2 = () => ["issueDate", "attendanceMonth", "remarks", "voucherNumber", "userLocationName", "costCenterName", "status"];
const _c3 = () => ({
  width: "1500px"
});
function HouseRentInvoiceComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Rental House Invoice");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function HouseRentInvoiceComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HouseRentInvoiceComponent_ng_template_2_Template_span_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.show());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "i", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "input", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("keydown.enter", function HouseRentInvoiceComponent_ng_template_2_Template_input_keydown_enter_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.onEnter($event));
    })("input", function HouseRentInvoiceComponent_ng_template_2_Template_input_input_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      const policyTable_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.onGlobalFilter(policyTable_r4, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}
function HouseRentInvoiceComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr")(1, "th", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, " Actions ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "p-sortIcon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "th", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, " Invoice Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "p-sortIcon", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "th", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, " Voucher Number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](9, "p-sortIcon", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "th", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, " Location Id ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "p-sortIcon", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "th", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14, " Location Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](15, "p-sortIcon", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "th", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](17, " Remarks");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](18, "p-sortIcon", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "th", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](20, " Status ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](21, "p-sortIcon", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}
function HouseRentInvoiceComponent_ng_template_7_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HouseRentInvoiceComponent_ng_template_7_span_2_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r5);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.edit(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function HouseRentInvoiceComponent_ng_template_7_span_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HouseRentInvoiceComponent_ng_template_7_span_3_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r7);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.viewOnly(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function HouseRentInvoiceComponent_ng_template_7_span_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HouseRentInvoiceComponent_ng_template_7_span_4_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.delete(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function HouseRentInvoiceComponent_ng_template_7_span_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HouseRentInvoiceComponent_ng_template_7_span_5_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r9);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.approve(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function HouseRentInvoiceComponent_ng_template_7_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.status);
  }
}
function HouseRentInvoiceComponent_ng_template_7_span_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.status);
  }
}
function HouseRentInvoiceComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, HouseRentInvoiceComponent_ng_template_7_span_2_Template, 1, 0, "span", 54)(3, HouseRentInvoiceComponent_ng_template_7_span_3_Template, 1, 0, "span", 55)(4, HouseRentInvoiceComponent_ng_template_7_span_4_Template, 1, 0, "span", 56)(5, HouseRentInvoiceComponent_ng_template_7_span_5_Template, 1, 0, "span", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](18, HouseRentInvoiceComponent_ng_template_7_span_18_Template, 2, 1, "span", 58)(19, HouseRentInvoiceComponent_ng_template_7_span_19_Template, 2, 1, "span", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status !== "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status !== "APPROVED" || item_r6.status == "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status !== "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status === "PENDING" || item_r6.status == "UNAPPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](8, 11, item_r6.issueDate));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.voucherNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.userLocationId);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.userLocationName);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.remarks);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status == "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status != "APPROVED");
  }
}
function HouseRentInvoiceComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function HouseRentInvoiceComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function HouseRentInvoiceComponent_p_button_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p-button", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HouseRentInvoiceComponent_p_button_43_Template_p_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r10);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.save());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("loading", ctx_r2.saving)("disabled", !ctx_r2.houseRentInvform.valid)("outlined", true);
  }
}
function HouseRentInvoiceComponent_p_button_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p-button", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HouseRentInvoiceComponent_p_button_44_Template_p_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r11);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.update());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("loading", ctx_r2.saving)("disabled", !ctx_r2.houseRentInvform.valid)("outlined", true);
  }
}
class HouseRentInvoiceComponent {
  constructor(fb, _rentalService, _restrictionService, msgService, confirmationService) {
    this.fb = fb;
    this._rentalService = _rentalService;
    this._restrictionService = _restrictionService;
    this.msgService = msgService;
    this.confirmationService = confirmationService;
    this.restrictionDto = new _budget_shared_Dtos_restriction_dto__WEBPACK_IMPORTED_MODULE_1__.RestrictionDto();
    this.target = "HouseInvoice";
    this.currentPage = 1;
    this.skipCount = 0;
    this.maxCount = 50;
    this.showSupplierDetails = false;
    this.today = new Date();
    this.MinDate = new Date();
    this.dto = {
      DocOrVocNumber: ""
    };
    this.minDate = new Date();
    this.rentalContractTypeOption = [{
      label: "Monthly",
      value: 1
    }, {
      label: "Two Months",
      value: 2
    }, {
      label: "Quarterly",
      value: 3
    }, {
      label: "Four Months",
      value: 4
    }, {
      label: "Five Months",
      value: 5
    }, {
      label: "Six Months",
      value: 6
    }, {
      label: "Seven Months",
      value: 7
    }, {
      label: "Eight Months",
      value: 8
    }, {
      label: "Nine Months",
      value: 9
    }, {
      label: "Ten Months",
      value: 10
    }, {
      label: "Eleven Months",
      value: 11
    }, {
      label: "Annual",
      value: 12
    }, {
      label: "Biennial",
      value: 24
    }, {
      label: "Triennial",
      value: 36
    }, {
      label: "Five Years",
      value: 60
    }, {
      label: "Ten Years",
      value: 120
    }];
    this.colDefs = [{
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      width: 90,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true
    }, {
      headerName: "Start Date",
      editable: false,
      field: "startDate",
      resizable: true,
      width: 250,
      suppressSizeToFit: true
      // valueFormatter: (params) => {
      //   return params.value ? new Date(params.value).toLocaleDateString() : "";
      // },
    }, {
      headerName: "End Date",
      editable: false,
      field: "endDate",
      resizable: true,
      width: 250,
      suppressSizeToFit: true
      // valueFormatter: (params) => {
      //   return params.value ? new Date(params.value).toLocaleDateString() : "";
      // },
    }, {
      headerName: "House Id",
      editable: false,
      field: "houseId",
      resizable: true,
      width: 180,
      suppressSizeToFit: true
    }, {
      headerName: "House Title",
      editable: false,
      field: "houseName",
      resizable: true,
      width: 180,
      suppressSizeToFit: true
    },
    // {
    //   headerName: "Supplier Id",
    //   editable: false,
    //   field: "supplierSerialNumber",
    //   resizable: true,
    //   width: 180,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Supplier Title",
      editable: false,
      field: "supplierName",
      resizable: true,
      width: 250,
      suppressSizeToFit: true
    },
    // {
    //   headerName: "Region Id",
    //   editable: false,
    //   field: "regionId",
    //   width: 200,
    // },
    // {
    //   headerName: "Region Title",
    //   editable: false,
    //   field: "regionName",
    //   width: 200,
    // },
    {
      headerName: "Location Id",
      editable: false,
      field: "locationId",
      width: 200
    }, {
      headerName: "Location Title",
      editable: false,
      field: "locationName",
      width: 200
    }, {
      headerName: "Rate",
      editable: false,
      field: "rate",
      width: 200
    }, {
      headerName: "Contract Type Title",
      editable: false,
      field: "rentalContractTypeTitle",
      resizable: true,
      width: 200,
      suppressSizeToFit: true
    }, {
      headerName: "Total Amount",
      editable: false,
      field: "totalAmount",
      resizable: true,
      width: 200,
      suppressSizeToFit: true
    }, {
      headerName: "Contract Number",
      editable: false,
      field: "voucherNumber",
      resizable: true,
      width: 180,
      suppressSizeToFit: true
    }];
    this.houseRentInvform = this.fb.group({
      issueDate: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required],
      voucherNumber: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required],
      userLocationId: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]],
      userLocationName: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]],
      remarks: [""],
      totalAmount: "",
      houseInvoiceDetails: [[]]
    });
  }
  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("RHI");
  }
  setPickerValue(value, title) {
    switch (title) {
      case "Location":
        debugger;
        this.houseRentInvform.patchValue({
          userLocationId: value?.id,
          userLocationName: value.name
        });
        this.employeeErpId = value.id;
        this.GetDocMaxCount("VehicleInvoice");
        break;
      case "CostCenter":
        this.houseRentInvform.patchValue({
          costCenterId: +value.id,
          costCenterName: value.name
        });
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  getAll(skipCount = this.skipCount, maxCount = this.maxCount) {
    this._rentalService.getAll(this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;
      }
    });
  }
  show(id) {
    if (id) {
      this._rentalService.getDataForEdit(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
        debugger;
        this.msgService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
      })).subscribe({
        next: response => {
          debugger;
          this.dataForEdit = response;
          this.houseRentInvform.get("userLocationId")?.setValue(this.dataForEdit.userLocationId);
          this.houseRentInvform.get("userLocationName")?.setValue(this.dataForEdit.userLocationName);
          this.houseRentInvform.get("issueDate")?.setValue(new Date(this.dataForEdit.issueDate));
          this.houseRentInvform.get("voucherNumber").setValue(this.dataForEdit.voucherNumber);
          this.houseRentInvform.get("remarks").setValue(this.dataForEdit.remarks);
          this.rowData = this.dataForEdit.houseInvoiceDetails;
          this.calculateTotalAmount();
        }
      });
      this.displayModal = true;
    } else {
      if (!this.restrictionDto.isCreationAllowed) {
        this.msgService.add({
          severity: "info",
          summary: "Info",
          detail: "Creation Restricted"
        });
        return;
      }
      debugger;
      this.getDefaultLocation("Location", "userLocationName", "userLocationId", "");
      this.editMode = false;
      this.viewMode = false;
      this.rowData = [];
      this.displayModal = true;
      this.houseRentInvform.reset();
      this.houseRentInvform.enable();
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.houseRentInvform.get("isActive")?.setValue(true);
      this.houseRentInvform.get("issueDate").setValue(this.today);
    }
  }
  save() {
    debugger;
    this.saving = true;
    if (!this.houseRentInvform.valid) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all Required fields",
        life: 2000
      });
      this.saving = false;
      return;
    }
    this.houseRentInvform.patchValue({
      houseInvoiceDetails: this.rowData
    });
    this._rentalService.create(this.houseRentInvform.value, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {
      this.saving = false;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.msgService.add({
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
  update() {
    this.saving = true;
    // this.houseRentInvform.patchValue({
    //   vehicleInvoiceDetails: this.rowData,
    // });
    const updateData = {
      ...this.houseRentInvform.value,
      id: this.dataForEdit.id
    };
    this._rentalService.update(updateData, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {
      this.saving = false;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.msgService.add({
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
  delete(id) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._rentalService.delete(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
          debugger;
          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000
          });
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
        })).subscribe({
          next: response => {
            debugger;
            if (response) {
              this.msgService.add({
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
  isFieldInvalid(field) {
    const control = this.houseRentInvform.get(field);
    return control ? control.invalid && control.touched : false;
  }
  onDateChange(value) {
    debugger;
    if (value) {
      this.houseRentInvform.value.issueDate = value;
    }
    if (this.houseRentInvform.value.userLocationId && this.houseRentInvform.value.issueDate) {
      this.GetDocMaxCount("VehicleInvoice");
    }
  }
  MakeVoucher() {
    debugger;
    if (this.houseRentInvform.value.userLocationId && this.documentNumber) {
      const voucherNumber = "RHI-HNL" + "-" + this.houseRentInvform.value.userLocationId + "-" + this.houseRentInvform.value.issueDate.getFullYear() + "-" + (this.houseRentInvform.value.issueDate.getMonth() + 1) + "-" + this.documentNumber;
      this.houseRentInvform.get("voucherNumber").setValue(voucherNumber);
    } else {
      this.GetDocMaxCount("VehicleInvoice");
    }
  }
  getDefaultLocation(target, name, id, filterId) {
    var _this = this;
    return (0,_Users_muhammadhassankhan_Documents_devoclock_github_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this._rentalService.getDefaultLocation(target, filterId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
        _this.msgService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
      })).subscribe({
        next: response => {
          debugger;
          _this.houseRentInvform.get("userLocationName").setValue(response.items[0].name);
          _this.houseRentInvform.get("userLocationId").setValue(response.items[0].id);
          _this.GetDocMaxCount("VehicleInvoice");
        }
      });
    })();
  }
  GetDocMaxCount(target) {
    debugger;
    if (this.houseRentInvform.value.userLocationId && this.houseRentInvform.value.issueDate) {
      this._rentalService.GetDocMaxCount(target, this.houseRentInvform.value.userLocationId, this.houseRentInvform.value.issueDate).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
        this.msgService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
      })).subscribe({
        next: response => {
          debugger;
          this.documentNumber = response;
          this.MakeVoucher();
        }
      });
    }
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = [];
    this.rowSelection = "multiple";
  }
  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const dataToRemove = selectedNodes.map(node => node.data);
      this.gridApi.applyTransaction({
        remove: dataToRemove
      });
      this.rowData = this.rowData.filter(row => !dataToRemove.includes(row));
      this.rowCount = this.gridApi.getDisplayedRowCount();
    }
    this.calculateTotalAmount();
  }
  generatHouseDetails() {
    debugger;
    if (!this.houseRentInvform.value.issueDate) {
      this.msgService.add({
        severity: "error",
        summary: "Required",
        detail: "Please Select Date"
      });
    } else {
      this._rentalService.GetHouseRentDetails(this.houseRentInvform.value.issueDate, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
        debugger;
        this.msgService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
      })).subscribe({
        next: response => {
          debugger;
          if (response.length === 0) {
            alert("There is no data in Database...");
            return;
          } else {
            this.rowData = response;
            this.calculateTotalAmount();
          }
        },
        error: err => {
          console.log("An error occurred", err);
        }
      });
    }
  }
  edit(id) {
    if (!this.restrictionDto.isEditAllowed) {
      this.msgService.add({
        severity: "info",
        summary: "Info",
        detail: "Edit Restricted"
      });
      return;
    }
    this.editMode = true;
    this.viewMode = false;
    this.show(id);
    this.houseRentInvform.enable();
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }
  viewOnly(id) {
    this.viewMode = true;
    this.editMode = false;
    this.show(id);
    this.houseRentInvform.disable();
    this.MinDate = null;
  }
  approve(id) {
    if (!this.restrictionDto.isApprovalAllowed) {
      this.msgService.add({
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
        this._rentalService.Approve(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
          debugger;
          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000
          });
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
        })).subscribe({
          next: response => {
            debugger;
            if (response) {
              this.msgService.add({
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
  calculateTotalAmount() {
    let total = 0;
    this.rowData.forEach(node => {
      debugger;
      if (node.totalAmount) {
        total += +node.totalAmount;
      }
    });
    this.houseRentInvform.get("totalAmount").setValue(total);
  }
  onGlobalFilter(table, event) {
    table.filterGlobal(event.target.value, "contains");
  }
  onEnter(event) {
    const inputValue = event.target.value;
    this.loading = true;
    debugger;
    this.dto.DocOrVocNumber = inputValue;
    debugger;
    this._rentalService.getAllRecord(this.target, this.dto).subscribe({
      next: response => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;
        this.loading = false;
      }
    });
  }
  VoucherRestriction(prefix) {
    this._restrictionService.getVoucherRestriction(prefix).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        console.log(response);
        debugger;
        this.restrictionDto = (0,_shared_Utials_utils__WEBPACK_IMPORTED_MODULE_2__.mapRestrictionDto)(response.items[0]);
        console.log(this.restrictionDto);
      }
    });
  }
  static #_ = this.ɵfac = function HouseRentInvoiceComponent_Factory(t) {
    return new (t || HouseRentInvoiceComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_rental_shared_services_rental_service__WEBPACK_IMPORTED_MODULE_3__.RentalService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_budget_shared_services_restriction_service__WEBPACK_IMPORTED_MODULE_4__.RestrictionService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_11__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_11__.ConfirmationService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: HouseRentInvoiceComponent,
    selectors: [["app-house-rent-invoice"]],
    decls: 48,
    vars: 42,
    consts: [["policyTable", ""], ["styleClass", "mb-4"], ["pTemplate", "left"], ["pTemplate", "right"], [1, "card", "p-4"], ["styleClass", "p-datatable-gridlines", "scrollHeight", "58vh", "responsiveLayout", "scroll", "dataKey", "id", "responsiveLayout", "scroll", 3, "paginator", "rows", "rowsPerPageOptions", "value", "scrollable", "loading", "rowHover", "paginatorDropdownAppendTo", "globalFilterFields"], ["pTemplate", "header"], ["pTemplate", "body"], [3, "visibleChange", "maximizable", "closeOnEscape", "header", "modal", "visible", "draggable"], [3, "ngSubmit", "formGroup"], [1, "row", "col-md-12", "mt-4"], ["id", "inputField", 1, "col-md-3", "flex", "flex-column"], ["for", "name"], ["formControlName", "issueDate", "inputId", "date", "appendTo", "body", "tabindex", "1", "name", "issueDate", 3, "ngModelChange", "minDate", "maxDate", "showOnFocus"], ["class", "text-danger", 4, "ngIf"], [1, "col-md-4"], [3, "valueSelected", "title", "id", "name", "showId"], ["id", "inputField", 1, "col-md-4", "flex", "flex-column"], ["type", "text", "pInputText", "", "formControlName", "voucherNumber", "id", "voucherNumber", "autocomplete", "off", "readonly", "", 2, "position", "relative", "z-index", "1000"], [1, "row", "col-md-12"], [1, "my-auto"], ["label", "Generat Details For House ", "severity", "success", 3, "click", "text", "raised"], ["label", "Remove Row", "size", "small", "severity", "danger", 2, "padding", "0.25rem 0.5rem", "font-size", "0.75rem", "height", "auto", "line-height", "1.25", 3, "click"], [1, "mt-3"], [1, "ag-theme-quartz", 2, "height", "500px", 3, "gridReady", "rowData", "columnDefs", "rowSelection", "singleClickEdit"], ["id", "inputField", 1, "col-md-12", "flex", "flex-column"], ["for", "remarks"], ["type", "text", "pInputText", "", "formControlName", "remarks", "id", "remarks", "autocomplete", "off", 2, "position", "relative", "z-index", "1000"], ["for", "totalAmount"], ["type", "text", "pInputText", "", "formControlName", "totalAmount", "id", "totalAmount", "autocomplete", "off", "readonly", "", 2, "position", "relative", "z-index", "1000"], [1, "flex", "gap-1", "justify-content-end", "mt-4"], ["label", "Cancel", "severity", "warning", 3, "onClick", "outlined"], ["label", "Save", "severity", "contrast", 3, "loading", "disabled", "outlined", "click", 4, "ngIf"], ["label", "Update", "severity", "contrast", 3, "loading", "disabled", "outlined", "click", 4, "ngIf"], [1, "p-toolbar-group-left"], [1, "p-toolbar-separator", 2, "margin-right", "10px"], ["pButton", "", "icon", "pi pi-plus-circle", 1, "p-button-success", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], [1, "block", "md:mt-0", "p-input-icon-left"], [1, "pi", "pi-search"], ["pInputText", "", "type", "text", "placeholder", "Search...", 2, "height", "25px", "cursor", "pointer", 3, "keydown.enter", "input"], ["pSortableColumn", "Actions", 2, "min-width", "200px"], ["field", "Actions"], ["pSortableColumn", "issueDate", 2, "min-width", "200px"], ["field", "issueDate"], ["pSortableColumn", "voucherNumber", 2, "min-width", "200px"], ["field", "voucherNumber"], ["pSortableColumn", "userLocationId", 2, "min-width", "200px"], ["field", "userLocationId"], ["pSortableColumn", "userLocationName", 2, "min-width", "200px"], ["field", "userLocationName"], ["pSortableColumn", "costCenterName", 2, "min-width", "200px"], ["field", "costCenterName"], ["pSortableColumn", "Active", 2, "min-width", "200px"], ["field", "Active"], ["style", "height: 25px; width: 25px; cursor: pointer", "pButton", "", "pRipple", "", "icon", "pi pi-pencil", "class", "p-button-rounded p-button-info mr-2", 3, "click", 4, "ngIf"], ["style", "height: 25px; width: 25px; cursor: pointer", "pButton", "", "pRipple", "", "icon", "pi pi-eye", "class", "p-button-rounded p-button-info mr-2", 3, "click", 4, "ngIf"], ["style", "height: 25px; width: 25px; cursor: pointer", "pButton", "", "pRipple", "", "icon", "pi pi-trash", "class", "p-button-rounded p-button-warning mr-2", 3, "click", 4, "ngIf"], ["pButton", "", "pRipple", "", "icon", "pi pi-check", "style", "height: 25px; width: 25px; cursor: pointer", "class", "p-button-rounded p-button-success mr-2", 3, "click", 4, "ngIf"], ["class", "yes-bg", 4, "ngIf"], ["class", "no-bg", 4, "ngIf"], ["pButton", "", "pRipple", "", "icon", "pi pi-pencil", 1, "p-button-rounded", "p-button-info", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], ["pButton", "", "pRipple", "", "icon", "pi pi-eye", 1, "p-button-rounded", "p-button-info", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], ["pButton", "", "pRipple", "", "icon", "pi pi-trash", 1, "p-button-rounded", "p-button-warning", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], ["pButton", "", "pRipple", "", "icon", "pi pi-check", 1, "p-button-rounded", "p-button-success", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], [1, "yes-bg"], [1, "no-bg"], [1, "text-danger"], ["label", "Save", "severity", "contrast", 3, "click", "loading", "disabled", "outlined"], ["label", "Update", "severity", "contrast", 3, "click", "loading", "disabled", "outlined"]],
    template: function HouseRentInvoiceComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p-toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, HouseRentInvoiceComponent_ng_template_1_Template, 2, 0, "ng-template", 2)(2, HouseRentInvoiceComponent_ng_template_2_Template, 6, 0, "ng-template", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 4)(4, "p-table", 5, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, HouseRentInvoiceComponent_ng_template_6_Template, 22, 0, "ng-template", 6)(7, HouseRentInvoiceComponent_ng_template_7_Template, 20, 13, "ng-template", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "p-dialog", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayListener"]("visibleChange", function HouseRentInvoiceComponent_Template_p_dialog_visibleChange_8_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayBindingSet"](ctx.displayModal, $event) || (ctx.displayModal = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "form", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngSubmit", function HouseRentInvoiceComponent_Template_form_ngSubmit_10_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.save());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "div", 10)(12, "div", 11)(13, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14, "Date:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "p-calendar", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function HouseRentInvoiceComponent_Template_p_calendar_ngModelChange_15_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.onDateChange($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](16, HouseRentInvoiceComponent_div_16_Template, 2, 0, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "div", 15)(18, "app-picker", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("valueSelected", function HouseRentInvoiceComponent_Template_app_picker_valueSelected_18_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.setPickerValue($event, "Location"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "div", 17)(20, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](21, "Voucher Number:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](22, "input", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](23, HouseRentInvoiceComponent_div_23_Template, 2, 0, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](24, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](25, "div", 19)(26, "div", 20)(27, "p-button", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HouseRentInvoiceComponent_Template_p_button_click_27_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.generatHouseDetails());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](28, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](29, "p-button", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HouseRentInvoiceComponent_Template_p_button_click_29_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.onRemoveSelected());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](30, "div", 23)(31, "ag-grid-angular", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("gridReady", function HouseRentInvoiceComponent_Template_ag_grid_angular_gridReady_31_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.onGridReady($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](32, "div", 19)(33, "div", 25)(34, "label", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](35, "Narration:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](36, "input", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](37, "div", 17)(38, "label", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](39, "Total Amount:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](40, "input", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](41, "div", 30)(42, "p-button", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onClick", function HouseRentInvoiceComponent_Template_p_button_onClick_42_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.displayModal = false);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](43, HouseRentInvoiceComponent_p_button_43_Template, 1, 3, "p-button", 32)(44, HouseRentInvoiceComponent_p_button_44_Template, 1, 3, "p-button", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](45, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](46, "p-toast")(47, "p-confirmDialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        let tmp_24_0;
        let tmp_25_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](38, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("paginator", true)("rows", 5)("rowsPerPageOptions", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](39, _c1))("value", ctx.tableData)("scrollable", true)("loading", ctx.loading)("rowHover", true)("paginatorDropdownAppendTo", "body")("globalFilterFields", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](40, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](41, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("maximizable", true)("closeOnEscape", false)("header", ctx.editMode ? "Edit Rental House Invoice" : "Create Rental House Invoice")("modal", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayProperty"]("visible", ctx.displayModal);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("draggable", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formGroup", ctx.houseRentInvform);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("minDate", ctx.MinDate)("maxDate", ctx.today)("showOnFocus", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("issueDate"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("title", "Location")("id", (tmp_24_0 = ctx.houseRentInvform.get("userLocationId")) == null ? null : tmp_24_0.value)("name", (tmp_25_0 = ctx.houseRentInvform.get("userLocationName")) == null ? null : tmp_25_0.value)("showId", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("voucherNumber"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("text", true)("raised", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("rowData", ctx.rowData)("columnDefs", ctx.colDefs)("rowSelection", ctx.rowSelection)("singleClickEdit", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("outlined", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.editMode && !ctx.viewMode);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.editMode && !ctx.viewMode);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, primeng_button__WEBPACK_IMPORTED_MODULE_13__.ButtonDirective, primeng_button__WEBPACK_IMPORTED_MODULE_13__.Button, primeng_api__WEBPACK_IMPORTED_MODULE_11__.PrimeTemplate, primeng_dialog__WEBPACK_IMPORTED_MODULE_14__.Dialog, primeng_table__WEBPACK_IMPORTED_MODULE_15__.Table, primeng_table__WEBPACK_IMPORTED_MODULE_15__.SortableColumn, primeng_table__WEBPACK_IMPORTED_MODULE_15__.SortIcon, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatusGroup, primeng_toolbar__WEBPACK_IMPORTED_MODULE_16__.Toolbar, primeng_inputtext__WEBPACK_IMPORTED_MODULE_17__.InputText, primeng_calendar__WEBPACK_IMPORTED_MODULE_18__.Calendar, ag_grid_angular__WEBPACK_IMPORTED_MODULE_19__.AgGridAngular, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_20__.ConfirmDialog, primeng_toast__WEBPACK_IMPORTED_MODULE_21__.Toast, _shared_components_picker_picker_component__WEBPACK_IMPORTED_MODULE_5__.PickerComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlName, _angular_common__WEBPACK_IMPORTED_MODULE_12__.DatePipe],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 29318:
/*!*********************************************************************************!*\
  !*** ./src/app/main/rental/rental house/rental-house/rental-house.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RentalHouseComponent: () => (/* binding */ RentalHouseComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 89475);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 61318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 77919);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! papaparse */ 92853);
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(papaparse__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _shared_services_rental_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/rental.service */ 9725);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/api */ 17780);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/button */ 49136);
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/dialog */ 16280);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/table */ 76676);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/paginator */ 43157);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/dropdown */ 26895);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/toolbar */ 31973);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/inputtext */ 48361);
/* harmony import */ var primeng_checkbox__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/checkbox */ 26771);
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/confirmdialog */ 68160);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/toast */ 61225);
/* harmony import */ var _shared_components_picker_picker_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../shared/components/picker/picker.component */ 79023);



















const _c0 = () => ({
  width: "100%",
  "overflow-y": "auto"
});
const _c1 = () => ["name", "fullAddress", "occupiedStatus", "totalCoveredArea", "houseType", "description", "isElectricityIncluded", "isGasIncluded", "isMaintenanceIncluded", "isActive"];
const _c2 = a0 => [5, 10, 20, a0];
const _c3 = () => ({
  width: "100%",
  height: "35px",
  display: "flex",
  "align-items": "center"
});
function RentalHouseComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Rental House");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function RentalHouseComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 51)(3, "span", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function RentalHouseComponent_ng_template_2_Template_span_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.show());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "span", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "i", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "input", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("keydown.enter", function RentalHouseComponent_ng_template_2_Template_input_keydown_enter_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.onEnter($event));
    })("input", function RentalHouseComponent_ng_template_2_Template_input_input_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      const policyTable_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.onGlobalFilter(policyTable_r4, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "span", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function RentalHouseComponent_ng_template_2_Template_span_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.downloadCSVFile());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
}
function RentalHouseComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr")(1, "th", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, " Actions ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "p-sortIcon", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "th", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, " Name ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](6, "p-sortIcon", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "th", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, " Full Address");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](9, "p-sortIcon", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "th", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, " Occupied Status");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](12, "p-sortIcon", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "th", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, " Total Covered Area ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](15, "p-sortIcon", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "th", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, " House Type");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](18, "p-sortIcon", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "th", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, " Description ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](21, "p-sortIcon", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "th", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, " Electricity Included ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](24, "p-sortIcon", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "th", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26, " Gas Included ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](27, "p-sortIcon", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "th", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](29, " Maintenance Included ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](30, "p-sortIcon", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](31, "th", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](32, " Water Included ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](33, "p-sortIcon", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "th", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](35, " Active ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](36, "p-sortIcon", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
function RentalHouseComponent_ng_template_7_span_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Yes");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function RentalHouseComponent_ng_template_7_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "No");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function RentalHouseComponent_ng_template_7_span_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Yes");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function RentalHouseComponent_ng_template_7_span_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "No");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function RentalHouseComponent_ng_template_7_span_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Yes");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function RentalHouseComponent_ng_template_7_span_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "No");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function RentalHouseComponent_ng_template_7_span_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Yes");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function RentalHouseComponent_ng_template_7_span_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "No");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function RentalHouseComponent_ng_template_7_span_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Yes");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function RentalHouseComponent_ng_template_7_span_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "No");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function RentalHouseComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr")(1, "td", 75)(2, "span", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function RentalHouseComponent_ng_template_7_Template_span_click_2_listener() {
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r5).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.show(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function RentalHouseComponent_ng_template_7_Template_span_click_3_listener() {
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r5).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.delete(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](17, RentalHouseComponent_ng_template_7_span_17_Template, 2, 0, "span", 78)(18, RentalHouseComponent_ng_template_7_span_18_Template, 2, 0, "span", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](20, RentalHouseComponent_ng_template_7_span_20_Template, 2, 0, "span", 78)(21, RentalHouseComponent_ng_template_7_span_21_Template, 2, 0, "span", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](23, RentalHouseComponent_ng_template_7_span_23_Template, 2, 0, "span", 78)(24, RentalHouseComponent_ng_template_7_span_24_Template, 2, 0, "span", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](26, RentalHouseComponent_ng_template_7_span_26_Template, 2, 0, "span", 78)(27, RentalHouseComponent_ng_template_7_span_27_Template, 2, 0, "span", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](29, RentalHouseComponent_ng_template_7_span_29_Template, 2, 0, "span", 78)(30, RentalHouseComponent_ng_template_7_span_30_Template, 2, 0, "span", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](item_r6.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](item_r6.fullAddress);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](item_r6.occupiedStatus);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](item_r6.totalCoveredArea);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](item_r6.houseType);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](item_r6.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", item_r6.isElectricityIncluded);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !item_r6.isElectricityIncluded);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", item_r6.isGasIncluded);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !item_r6.isGasIncluded);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", item_r6.isMaintenanceIncluded);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !item_r6.isMaintenanceIncluded);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", item_r6.isWaterIncluded);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !item_r6.isWaterIncluded);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", item_r6.isActive);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !item_r6.isActive);
  }
}
function RentalHouseComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function RentalHouseComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function RentalHouseComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function RentalHouseComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function RentalHouseComponent_p_button_73_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p-button", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function RentalHouseComponent_p_button_73_Template_p_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r7);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.save());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("loading", ctx_r2.saving)("disabled", !ctx_r2.rentalhouseform.valid)("outlined", true);
  }
}
function RentalHouseComponent_p_button_74_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p-button", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function RentalHouseComponent_p_button_74_Template_p_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.update());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("loading", ctx_r2.saving)("disabled", !ctx_r2.rentalhouseform.valid)("outlined", true);
  }
}
class RentalHouseComponent {
  constructor(fb, _rentalService, msgService, confirmationService) {
    this.fb = fb;
    this._rentalService = _rentalService;
    this.msgService = msgService;
    this.confirmationService = confirmationService;
    this.target = "House";
    this.currentPage = 1;
    this.skipCount = 0;
    this.maxCount = 5;
    this.showSupplierDetails = false;
    this.dto = {
      name: ""
    };
    this.coveredAreaOptions = [{
      label: "1 Marla",
      value: "1 Marla"
    }, {
      label: "2 Marla",
      value: "2 Marla"
    }, {
      label: "2.5 Marla",
      value: "2.5 Marla"
    }, {
      label: "3 Marla",
      value: "3 Marla"
    }, {
      label: "5 Marla",
      value: "5 Marla"
    }, {
      label: "1 Kanal",
      value: "1 Kanal"
    }, {
      label: "2 Kanal",
      value: "2 Kanal"
    }];
    this.houseTypeOptions = [{
      label: "Single Story",
      value: "Single Story"
    }, {
      label: "Double Story",
      value: "Double Story"
    }, {
      label: "Triple Story",
      value: "Triple Story"
    }, {
      label: "Flat",
      value: "Flat"
    }, {
      label: "Portion",
      value: "Portion"
    }, {
      label: "Hall",
      value: "Hall"
    }];
    this.rentalhouseform = this.fb.group({
      isActive: [""],
      name: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required]],
      fullAddress: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
      occupiedStatus: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
      totalCoveredArea: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
      houseType: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
      description: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required]],
      locationId: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required]],
      locationName: [""],
      // regionId: ["", [Validators.required]],
      // regionName: [""],
      isElectricityIncluded: [""],
      isGasIncluded: [""],
      isMaintenanceIncluded: [""],
      isWaterIncluded: [""],
      isAdminOnly: [false]
    });
  }
  ngOnInit() {
    this.getAll();
  }
  getAll(skipCount = this.skipCount, maxCount = this.maxCount) {
    this._rentalService.getAll(this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;
      }
    });
  }
  show(id) {
    if (id) {
      this.editMode = true;
      this._rentalService.getDataForEdit(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.catchError)(error => {
        debugger;
        this.msgService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.throwError)(error.error.error.message);
      })).subscribe({
        next: response => {
          debugger;
          this.dataForEdit = response;
          this.rentalhouseform.get("name").setValue(this.dataForEdit.name);
          this.rentalhouseform.get("locationId").setValue(this.dataForEdit.locationId);
          this.rentalhouseform.get("locationName").setValue(this.dataForEdit.locationName);
          // this.rentalhouseform
          //   .get("regionId")
          //   .setValue(this.dataForEdit.regionId);
          // this.rentalhouseform
          //   .get("regionName")
          //   .setValue(this.dataForEdit.regionName);
          this.rentalhouseform.get("fullAddress").setValue(this.dataForEdit.fullAddress);
          this.rentalhouseform.get("occupiedStatus").setValue(this.dataForEdit.occupiedStatus);
          this.rentalhouseform.get("totalCoveredArea").setValue(this.dataForEdit.totalCoveredArea);
          this.rentalhouseform.get("houseType").setValue(this.dataForEdit.houseType);
          this.rentalhouseform.get("isElectricityIncluded").setValue(this.dataForEdit.isElectricityIncluded);
          this.rentalhouseform.get("isGasIncluded").setValue(this.dataForEdit.isGasIncluded);
          this.rentalhouseform.get("isMaintenanceIncluded").setValue(this.dataForEdit.isMaintenanceIncluded);
          this.rentalhouseform.get("description").setValue(this.dataForEdit.description);
          this.rentalhouseform.get("isWaterIncluded").setValue(this.dataForEdit.isWaterIncluded);
          this.rentalhouseform.get("isAdminOnly").setValue(this.dataForEdit.isAdminOnly);
          this.rentalhouseform.get("isActive").setValue(this.dataForEdit.isActive);
          this.displayModal = true;
        }
      });
    } else {
      this.editMode = false;
      this.displayModal = true;
      this.rentalhouseform.reset();
      this.rentalhouseform.get("isWaterIncluded").setValue(false);
      this.rentalhouseform.get("isMaintenanceIncluded").setValue(false);
      this.rentalhouseform.get("isGasIncluded").setValue(false);
      this.rentalhouseform.get("isElectricityIncluded").setValue(false);
      this.rentalhouseform.get("isActive").setValue(true);
      // this.rentalhouseform.value.isElectricityIncluded
    }
  }
  save() {
    debugger;
    this.saving = true;
    if (!this.rentalhouseform.valid) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all Required fields",
        life: 2000
      });
      this.saving = false;
      return;
    }
    this._rentalService.create(this.rentalhouseform.value, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.finalize)(() => {
      this.saving = false;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.msgService.add({
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
  update() {
    this.saving = true;
    const updateData = {
      ...this.rentalhouseform.value,
      id: this.dataForEdit.id
    };
    this._rentalService.update(updateData, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.finalize)(() => {
      this.saving = false;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.msgService.add({
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
  delete(id) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._rentalService.delete(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.catchError)(error => {
          debugger;
          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000
          });
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.throwError)(error.error.error.message);
        })).subscribe({
          next: response => {
            debugger;
            if (response) {
              this.msgService.add({
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
  isFieldInvalid(field) {
    const control = this.rentalhouseform.get(field);
    return control ? control.invalid && control.touched : false;
  }
  downloadCSVFile() {
    // Assuming this.tableData is an array of objects
    const data = this.tableData;
    if (!data || data.length === 0) {
      return; // No data to export
    }
    // Convert data to CSV using PapaParse
    const csv = papaparse__WEBPACK_IMPORTED_MODULE_0__.unparse(data);
    // Create a Blob from the CSV string
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;"
    });
    // Create a link element and trigger download
    const link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  onGlobalFilter(table, event) {
    table.filterGlobal(event.target.value, "contains");
  }
  setPickerValue(value, title, title2 = "") {
    switch (title) {
      case "Location":
        debugger;
        this.rentalhouseform.patchValue({
          locationId: value?.id,
          loacationName: value.name
        });
        break;
      case "Region":
        debugger;
        this.rentalhouseform.patchValue({
          regionId: value?.id,
          regionName: value.name
        });
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  onPageChange(event) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * 5;
    this._rentalService.getAll(this.target, this.skipCount, this.maxCount).subscribe({
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
    this.dto.name = inputValue;
    debugger;
    this._rentalService.getAllRecord(this.target, this.dto).subscribe({
      next: response => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;
        this.loading = false;
      }
    });
  }
  static #_ = this.ɵfac = function RentalHouseComponent_Factory(t) {
    return new (t || RentalHouseComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_shared_services_rental_service__WEBPACK_IMPORTED_MODULE_1__.RentalService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_8__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_8__.ConfirmationService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: RentalHouseComponent,
    selectors: [["app-rental-house"]],
    decls: 78,
    vars: 49,
    consts: [["policyTable", ""], ["styleClass", "mb-4"], ["pTemplate", "left"], ["pTemplate", "right"], [1, "card", "p-4"], ["styleClass", "p-datatable-gridlines", "scrollHeight", "58vh", "responsiveLayout", "scroll", "dataKey", "id", "responsiveLayout", "scroll", 3, "value", "loading", "scrollable", "rowHover", "paginatorDropdownAppendTo", "globalFilterFields"], ["pTemplate", "header"], ["pTemplate", "body"], ["currentPageReportTemplate", "Showing {first} to {last} of {totalRecords} entries", 3, "onPageChange", "rows", "totalRecords", "showCurrentPageReport", "rowsPerPageOptions"], [2, "width", "800vh", 3, "visibleChange", "maximizable", "closeOnEscape", "header", "modal", "visible", "draggable"], [3, "ngSubmit", "formGroup"], [1, "row", "col-md-12", "mt-4"], ["id", "inputField", 1, "col-md-4", "flex", "flex-column"], ["for", "name"], ["type", "text", "pInputText", "", "formControlName", "name", "id", "name", "autocomplete", "off", 2, "position", "relative", "z-index", "1000"], ["class", "text-danger", 4, "ngIf"], ["for", "fullAddress"], ["type", "text", "pInputText", "", "formControlName", "fullAddress", "id", "fullAddress", "autocomplete", "off", 2, "position", "relative", "z-index", "1000"], ["for", "occupiedStatus"], ["type", "text", "pInputText", "", "formControlName", "occupiedStatus", "id", "occupiedStatus", "autocomplete", "off", 2, "position", "relative", "z-index", "1000"], [1, "row", "col-md-12"], ["id", "inputField", 1, "col-md-4", "flex-column", "p-field"], [3, "valueSelected", "title2", "title", "id", "name", "showId"], [1, "col-md-4", "flex-column"], ["for", "totalCoveredArea"], ["id", "totalCoveredArea", "placeholder", "--Select--", "formControlName", "totalCoveredArea", "autocomplete", "off", 3, "options"], ["for", "houseType"], ["id", "houseType", "placeholder", "--Select--", "formControlName", "houseType", "autocomplete", "off", 3, "options"], [1, "col-md-12", "flex", "flex-column", "mb-2"], ["for", "description"], ["type", "text", "pInputText", "", "formControlName", "description", "id", "description", "autocomplete", "off", 2, "position", "relative", "z-index", "1000"], [1, "col-md-12", "row", "gap-5"], [1, "flex", "align-items-center", "mb-2", 2, "margin-bottom", "10px"], ["formControlName", "isElectricityIncluded", "inputId", "isElectricityIncluded", 3, "binary"], ["for", "isElectricityIncluded", 1, "mb-0"], ["formControlName", "isGasIncluded", "inputId", "isGasIncluded", 3, "binary"], ["for", "isGasIncluded", 1, "mb-0"], ["formControlName", "isMaintenanceIncluded", "inputId", "isMaintenanceIncluded", 3, "binary"], ["for", "isMaintenanceIncluded", 1, "mb-0"], ["formControlName", "isWaterIncluded", "inputId", "isWaterIncluded", 3, "binary"], ["for", "isWaterIncluded", 1, "mb-0"], ["formControlName", "isAdminOnly", "inputId", "isAdminOnly", 3, "binary"], ["for", "isAdminOnly", 1, "mb-0"], ["formControlName", "isActive", "inputId", "isActive", 3, "binary"], ["for", "isActive", 1, "mb-0"], [1, "flex", "gap-1", "justify-content-end", "mt-4"], ["label", "Cancel", "severity", "warning", 3, "onClick", "outlined"], ["label", "Save", "severity", "contrast", 3, "loading", "disabled", "outlined", "click", 4, "ngIf"], ["label", "Update", "severity", "contrast", 3, "loading", "disabled", "outlined", "click", 4, "ngIf"], [1, "p-toolbar-group-left"], [1, "p-toolbar-separator", 2, "margin-right", "10px"], [1, "gap-3", "flex"], ["pButton", "", "icon", "pi pi-plus-circle", 1, "p-button-success", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], [1, "block", "md:mt-0", "p-input-icon-left"], [1, "pi", "pi-search"], ["pInputText", "", "type", "text", "placeholder", "Search...", 2, "height", "25px", "cursor", "pointer", 3, "keydown.enter", "input"], ["pButton", "", "icon", "pi pi-download", 1, "p-button-info", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], ["pSortableColumn", "Actions", 2, "min-width", "200px"], ["field", "Actions"], ["pSortableColumn", "name", 2, "min-width", "200px"], ["field", "name"], ["pSortableColumn", "address", 2, "min-width", "200px"], ["field", "address"], ["pSortableColumn", "occupiedStatus", 2, "min-width", "200px"], ["field", "occupiedStatus"], ["pSortableColumn", "occupiedStatus", 2, "min-width", "300px"], ["pSortableColumn", "description", 2, "min-width", "200px"], ["field", "description"], ["pSortableColumn", "isElectricityIncluded", 2, "min-width", "250px"], ["field", "isElectricityIncluded"], ["pSortableColumn", "isGasIncluded", 2, "min-width", "200px"], ["field", "isGasIncluded"], ["pSortableColumn", "isGasIncluded", 2, "min-width", "250px"], ["pSortableColumn", "isActive", 2, "min-width", "200px"], ["field", "isActive"], [1, "flex", "justify-content-center"], ["pButton", "", "pRipple", "", "icon", "pi pi-pencil", 1, "p-bu", "p-button-info", "mr-2", 2, "height", "35px", "width", "35px", "cursor", "pointer", 3, "click"], ["pButton", "", "pRipple", "", "icon", "pi pi-trash", 1, "p-", "p-button-warning", "mr-2", 2, "height", "35px", "width", "35px", "cursor", "pointer", 3, "click"], ["class", "yes-bg", 4, "ngIf"], ["class", "no-bg", 4, "ngIf"], [1, "yes-bg"], [1, "no-bg"], [1, "text-danger"], ["label", "Save", "severity", "contrast", 3, "click", "loading", "disabled", "outlined"], ["label", "Update", "severity", "contrast", 3, "click", "loading", "disabled", "outlined"]],
    template: function RentalHouseComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p-toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, RentalHouseComponent_ng_template_1_Template, 2, 0, "ng-template", 2)(2, RentalHouseComponent_ng_template_2_Template, 8, 0, "ng-template", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 4)(4, "p-table", 5, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, RentalHouseComponent_ng_template_6_Template, 37, 0, "ng-template", 6)(7, RentalHouseComponent_ng_template_7_Template, 31, 16, "ng-template", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "p-paginator", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("onPageChange", function RentalHouseComponent_Template_p_paginator_onPageChange_8_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.onPageChange($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "p-dialog", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("visibleChange", function RentalHouseComponent_Template_p_dialog_visibleChange_9_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.displayModal, $event) || (ctx.displayModal = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "form", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngSubmit", function RentalHouseComponent_Template_form_ngSubmit_11_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.save());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 11)(13, "div", 12)(14, "label", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "Name:");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](16, "input", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](17, RentalHouseComponent_div_17_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "div", 12)(19, "label", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, "Full Address:");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](21, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](22, RentalHouseComponent_div_22_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "div", 12)(24, "label", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25, "Occupied Status:");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](26, "input", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](27, RentalHouseComponent_div_27_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](28, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "div", 20)(30, "div", 21)(31, "app-picker", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("valueSelected", function RentalHouseComponent_Template_app_picker_valueSelected_31_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.setPickerValue($event, "Location"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "div", 23)(33, "label", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](34, "Total Covered Area:");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](35, "p-dropdown", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "div", 23)(37, "label", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](38, "House Type:");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](39, "p-dropdown", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](40, "div", 20)(41, "div", 28)(42, "label", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](43, "Description:");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](44, "input", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](45, RentalHouseComponent_div_45_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](46, "div", 31)(47, "div", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](48, "p-checkbox", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "label", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](50, "Electricity Included");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](51, "div", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](52, "p-checkbox", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](53, "label", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](54, "Gas Included");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](55, "div", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](56, "p-checkbox", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](57, "label", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](58, "Maintenance Included");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](59, "div", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](60, "p-checkbox", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](61, "label", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](62, "Water Included");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](63, "div", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](64, "p-checkbox", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](65, "label", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](66, "For Admin");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](67, "div", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](68, "p-checkbox", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](69, "label", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](70, "Active");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](71, "div", 45)(72, "p-button", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("onClick", function RentalHouseComponent_Template_p_button_onClick_72_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.displayModal = false);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](73, RentalHouseComponent_p_button_73_Template, 1, 3, "p-button", 47)(74, RentalHouseComponent_p_button_74_Template, 1, 3, "p-button", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](75, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](76, "p-toast")(77, "p-confirmDialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](43, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", ctx.tableData)("loading", ctx.loading)("scrollable", true)("rowHover", true)("paginatorDropdownAppendTo", "body")("globalFilterFields", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](44, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("rows", 5)("totalRecords", ctx.count)("showCurrentPageReport", true)("rowsPerPageOptions", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](45, _c2, ctx.count));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("maximizable", true)("closeOnEscape", false)("header", ctx.editMode ? "Edit Rental House" : "Create Rental House")("modal", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("visible", ctx.displayModal);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("draggable", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx.rentalhouseform);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("name"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("fullAddress"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("occupiedStatus"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("title2", "Location")("title", "Location")("id", ctx.rentalhouseform.value.locationId)("name", ctx.rentalhouseform.value.locationName)("showId", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](47, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("options", ctx.coveredAreaOptions);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](48, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("options", ctx.houseTypeOptions);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("description"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("binary", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("binary", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("binary", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("binary", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("binary", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("binary", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("outlined", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.editMode);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.editMode);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, primeng_button__WEBPACK_IMPORTED_MODULE_10__.ButtonDirective, primeng_button__WEBPACK_IMPORTED_MODULE_10__.Button, primeng_api__WEBPACK_IMPORTED_MODULE_8__.PrimeTemplate, primeng_dialog__WEBPACK_IMPORTED_MODULE_11__.Dialog, primeng_table__WEBPACK_IMPORTED_MODULE_12__.Table, primeng_table__WEBPACK_IMPORTED_MODULE_12__.SortableColumn, primeng_table__WEBPACK_IMPORTED_MODULE_12__.SortIcon, primeng_paginator__WEBPACK_IMPORTED_MODULE_13__.Paginator, primeng_dropdown__WEBPACK_IMPORTED_MODULE_14__.Dropdown, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, primeng_toolbar__WEBPACK_IMPORTED_MODULE_15__.Toolbar, primeng_inputtext__WEBPACK_IMPORTED_MODULE_16__.InputText, primeng_checkbox__WEBPACK_IMPORTED_MODULE_17__.Checkbox, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_18__.ConfirmDialog, primeng_toast__WEBPACK_IMPORTED_MODULE_19__.Toast, _shared_components_picker_picker_component__WEBPACK_IMPORTED_MODULE_2__.PickerComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName],
    encapsulation: 2
  });
}

/***/ }),

/***/ 73248:
/*!******************************************************!*\
  !*** ./src/app/main/rental/rental-routing.module.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RentalRoutingModule: () => (/* binding */ RentalRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _vehicle_management_vehicle_management_vehicle_management_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vehicle management/vehicle-management/vehicle-management.component */ 53925);
/* harmony import */ var _setup_forms_vehicle_color_vehicle_color_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setup forms/vehicle-color/vehicle-color.component */ 87718);
/* harmony import */ var _setup_forms_fuel_type_fuel_type_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setup forms/fuel-type/fuel-type.component */ 30010);
/* harmony import */ var _setup_forms_type_type_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./setup forms/type/type.component */ 32392);
/* harmony import */ var _setup_forms_ownership_ownership_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./setup forms/ownership/ownership.component */ 97062);
/* harmony import */ var _setup_forms_rental_contract_type_rental_contract_type_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./setup forms/rental-contract-type/rental-contract-type.component */ 40556);
/* harmony import */ var _vehicle_management_rental_contract_rental_contract_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./vehicle management/rental-contract/rental-contract.component */ 76235);
/* harmony import */ var _vehicle_management_rental_vehicle_attendance_rental_vehicle_attendance_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./vehicle management/rental-vehicle-attendance/rental-vehicle-attendance.component */ 9855);
/* harmony import */ var _rental_house_rental_house_rental_house_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rental house/rental-house/rental-house.component */ 29318);
/* harmony import */ var _vehicle_management_rental_vehicle_invoice_rental_vehicle_invoice_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./vehicle management/rental-vehicle-invoice/rental-vehicle-invoice.component */ 94327);
/* harmony import */ var _house_rent_invoice_house_rent_invoice_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./house-rent-invoice/house-rent-invoice.component */ 39705);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 37580);














const routes = [{
  path: "",
  children: [{
    path: "vehicle-color",
    component: _setup_forms_vehicle_color_vehicle_color_component__WEBPACK_IMPORTED_MODULE_1__.VehicleColorComponent
  }, {
    path: "fuel-type",
    component: _setup_forms_fuel_type_fuel_type_component__WEBPACK_IMPORTED_MODULE_2__.FuelTypeComponent
  }, {
    path: "type",
    component: _setup_forms_type_type_component__WEBPACK_IMPORTED_MODULE_3__.TypeComponent
  }, {
    path: "ownership",
    component: _setup_forms_ownership_ownership_component__WEBPACK_IMPORTED_MODULE_4__.OwnershipComponent
  }, {
    path: "rental-contract-type",
    component: _setup_forms_rental_contract_type_rental_contract_type_component__WEBPACK_IMPORTED_MODULE_5__.RentalContractTypeComponent
  }, {
    path: "vehicle-management",
    component: _vehicle_management_vehicle_management_vehicle_management_component__WEBPACK_IMPORTED_MODULE_0__.VehicleManagementComponent
  }, {
    path: "rental-contract",
    component: _vehicle_management_rental_contract_rental_contract_component__WEBPACK_IMPORTED_MODULE_6__.RentalContractComponent
  }, {
    path: "rental-vehicle-attendance",
    component: _vehicle_management_rental_vehicle_attendance_rental_vehicle_attendance_component__WEBPACK_IMPORTED_MODULE_7__.RentalVehicleAttendanceComponent
  }, {
    path: "rental-vehicle-invoice",
    component: _vehicle_management_rental_vehicle_invoice_rental_vehicle_invoice_component__WEBPACK_IMPORTED_MODULE_9__.RentalVehicleInvoiceComponent
  }, {
    path: "rental-house",
    component: _rental_house_rental_house_rental_house_component__WEBPACK_IMPORTED_MODULE_8__.RentalHouseComponent
  }, {
    path: "rental-house-invoice",
    component: _house_rent_invoice_house_rent_invoice_component__WEBPACK_IMPORTED_MODULE_10__.HouseRentInvoiceComponent
  }]
}];
class RentalRoutingModule {
  static #_ = this.ɵfac = function RentalRoutingModule_Factory(t) {
    return new (t || RentalRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineNgModule"]({
    type: RentalRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsetNgModuleScope"](RentalRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule]
  });
})();

/***/ }),

/***/ 16817:
/*!**********************************************!*\
  !*** ./src/app/main/rental/rental.module.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RentalModule: () => (/* binding */ RentalModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _rental_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rental-routing.module */ 73248);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/button */ 49136);
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/dialog */ 16280);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/table */ 76676);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/paginator */ 43157);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! primeng/dropdown */ 26895);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primeng/toolbar */ 31973);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! primeng/inputtext */ 48361);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! primeng/calendar */ 41314);
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ag-grid-angular */ 34733);
/* harmony import */ var primeng_checkbox__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! primeng/checkbox */ 26771);
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! primeng/confirmdialog */ 68160);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! primeng/toast */ 61225);
/* harmony import */ var primeng_tabview__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! primeng/tabview */ 634);
/* harmony import */ var primeng_menu__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! primeng/menu */ 23673);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/shared.module */ 31699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _main_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../main.module */ 12007);
/* harmony import */ var _vehicle_management_vehicle_management_vehicle_management_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vehicle management/vehicle-management/vehicle-management.component */ 53925);
/* harmony import */ var _setup_forms_fuel_type_fuel_type_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./setup forms/fuel-type/fuel-type.component */ 30010);
/* harmony import */ var _setup_forms_vehicle_color_vehicle_color_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./setup forms/vehicle-color/vehicle-color.component */ 87718);
/* harmony import */ var _setup_forms_type_type_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./setup forms/type/type.component */ 32392);
/* harmony import */ var _setup_forms_ownership_ownership_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./setup forms/ownership/ownership.component */ 97062);
/* harmony import */ var _setup_forms_rental_contract_type_rental_contract_type_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./setup forms/rental-contract-type/rental-contract-type.component */ 40556);
/* harmony import */ var _vehicle_management_rental_contract_rental_contract_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./vehicle management/rental-contract/rental-contract.component */ 76235);
/* harmony import */ var _vehicle_management_rental_vehicle_attendance_rental_vehicle_attendance_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./vehicle management/rental-vehicle-attendance/rental-vehicle-attendance.component */ 9855);
/* harmony import */ var _rental_house_rental_house_rental_house_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./rental house/rental-house/rental-house.component */ 29318);
/* harmony import */ var _vehicle_management_rental_vehicle_invoice_rental_vehicle_invoice_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./vehicle management/rental-vehicle-invoice/rental-vehicle-invoice.component */ 94327);
/* harmony import */ var _house_rent_invoice_house_rent_invoice_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./house-rent-invoice/house-rent-invoice.component */ 39705);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 37580);































class RentalModule {
  static #_ = this.ɵfac = function RentalModule_Factory(t) {
    return new (t || RentalModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineNgModule"]({
    type: RentalModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.CommonModule, _rental_routing_module__WEBPACK_IMPORTED_MODULE_0__.RentalRoutingModule, primeng_button__WEBPACK_IMPORTED_MODULE_16__.ButtonModule, primeng_dialog__WEBPACK_IMPORTED_MODULE_17__.DialogModule, primeng_table__WEBPACK_IMPORTED_MODULE_18__.TableModule, primeng_paginator__WEBPACK_IMPORTED_MODULE_19__.PaginatorModule, primeng_dropdown__WEBPACK_IMPORTED_MODULE_20__.DropdownModule, primeng_toolbar__WEBPACK_IMPORTED_MODULE_21__.ToolbarModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_22__.InputTextModule, primeng_calendar__WEBPACK_IMPORTED_MODULE_23__.CalendarModule, ag_grid_angular__WEBPACK_IMPORTED_MODULE_24__.AgGridAngular, primeng_checkbox__WEBPACK_IMPORTED_MODULE_25__.CheckboxModule, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_26__.ConfirmDialogModule, primeng_toast__WEBPACK_IMPORTED_MODULE_27__.ToastModule, primeng_tabview__WEBPACK_IMPORTED_MODULE_28__.TabViewModule, primeng_menu__WEBPACK_IMPORTED_MODULE_29__.MenuModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_forms__WEBPACK_IMPORTED_MODULE_30__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_30__.FormsModule, _main_module__WEBPACK_IMPORTED_MODULE_2__.MainModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵsetNgModuleScope"](RentalModule, {
    declarations: [_vehicle_management_vehicle_management_vehicle_management_component__WEBPACK_IMPORTED_MODULE_3__.VehicleManagementComponent, _setup_forms_fuel_type_fuel_type_component__WEBPACK_IMPORTED_MODULE_4__.FuelTypeComponent, _setup_forms_vehicle_color_vehicle_color_component__WEBPACK_IMPORTED_MODULE_5__.VehicleColorComponent, _setup_forms_type_type_component__WEBPACK_IMPORTED_MODULE_6__.TypeComponent, _setup_forms_ownership_ownership_component__WEBPACK_IMPORTED_MODULE_7__.OwnershipComponent, _setup_forms_rental_contract_type_rental_contract_type_component__WEBPACK_IMPORTED_MODULE_8__.RentalContractTypeComponent, _vehicle_management_rental_contract_rental_contract_component__WEBPACK_IMPORTED_MODULE_9__.RentalContractComponent, _vehicle_management_rental_vehicle_attendance_rental_vehicle_attendance_component__WEBPACK_IMPORTED_MODULE_10__.RentalVehicleAttendanceComponent, _rental_house_rental_house_rental_house_component__WEBPACK_IMPORTED_MODULE_11__.RentalHouseComponent, _house_rent_invoice_house_rent_invoice_component__WEBPACK_IMPORTED_MODULE_13__.HouseRentInvoiceComponent, _vehicle_management_rental_vehicle_invoice_rental_vehicle_invoice_component__WEBPACK_IMPORTED_MODULE_12__.RentalVehicleInvoiceComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.CommonModule, _rental_routing_module__WEBPACK_IMPORTED_MODULE_0__.RentalRoutingModule, primeng_button__WEBPACK_IMPORTED_MODULE_16__.ButtonModule, primeng_dialog__WEBPACK_IMPORTED_MODULE_17__.DialogModule, primeng_table__WEBPACK_IMPORTED_MODULE_18__.TableModule, primeng_paginator__WEBPACK_IMPORTED_MODULE_19__.PaginatorModule, primeng_dropdown__WEBPACK_IMPORTED_MODULE_20__.DropdownModule, primeng_toolbar__WEBPACK_IMPORTED_MODULE_21__.ToolbarModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_22__.InputTextModule, primeng_calendar__WEBPACK_IMPORTED_MODULE_23__.CalendarModule, ag_grid_angular__WEBPACK_IMPORTED_MODULE_24__.AgGridAngular, primeng_checkbox__WEBPACK_IMPORTED_MODULE_25__.CheckboxModule, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_26__.ConfirmDialogModule, primeng_toast__WEBPACK_IMPORTED_MODULE_27__.ToastModule, primeng_tabview__WEBPACK_IMPORTED_MODULE_28__.TabViewModule, primeng_menu__WEBPACK_IMPORTED_MODULE_29__.MenuModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_forms__WEBPACK_IMPORTED_MODULE_30__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_30__.FormsModule, _main_module__WEBPACK_IMPORTED_MODULE_2__.MainModule]
  });
})();

/***/ }),

/***/ 30010:
/*!**************************************************************************!*\
  !*** ./src/app/main/rental/setup forms/fuel-type/fuel-type.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FuelTypeComponent: () => (/* binding */ FuelTypeComponent)
/* harmony export */ });
/* harmony import */ var _app_main_generics_components_lookup_lookup_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../generics/components/lookup/lookup.component */ 72426);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/api */ 17780);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/inputtext */ 48361);
/* harmony import */ var primeng_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/checkbox */ 26771);
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/confirmdialog */ 68160);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/toast */ 61225);
/* harmony import */ var _shared_components_picker_picker_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../shared/components/picker/picker.component */ 79023);










const _c0 = () => [];
function FuelTypeComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 2)(1, "div", 3)(2, "label", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Name:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "input", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function FuelTypeComponent_ng_template_1_Template_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r2.dto.name, $event) || (ctx_r2.dto.name = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 2)(7, "div", 6)(8, "app-picker", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("valueSelected", function FuelTypeComponent_ng_template_1_Template_app_picker_valueSelected_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.setPickerValue($event, "ServiceItem"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 8)(10, "div", 9)(11, "p-checkbox", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function FuelTypeComponent_ng_template_1_Template_p_checkbox_ngModelChange_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r2.dto.isActive, $event) || (ctx_r2.dto.isActive = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "label", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "Active");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.dto.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("title", "ServiceItem")("id", ctx_r2.dto.serviceItemId)("name", ctx_r2.dto.serviceItemName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.dto.isActive);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("binary", true);
  }
}
class FuelTypeComponent extends _app_main_generics_components_lookup_lookup_component__WEBPACK_IMPORTED_MODULE_0__.LookupComponent {
  constructor(injector, msgService) {
    super(injector);
    this.msgService = msgService;
    this.dto = {
      id: 0,
      name: null,
      isActive: true,
      serviceItemId: null,
      serviceItemName: null
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
    if (this.dto.serviceItemId == "" || this.dto.serviceItemId == null) {
      this.msgService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill the Service Item field"
      });
      return;
    }
    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "FuelType");
  }
  setPickerValue(value, title) {
    switch (title) {
      case "ServiceItem":
        this.dto.serviceItemId = value.id;
        this.dto.serviceItemName = value.name;
        debugger;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  static #_ = this.ɵfac = function FuelTypeComponent_Factory(t) {
    return new (t || FuelTypeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_3__.MessageService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: FuelTypeComponent,
    selectors: [["app-fuel-type"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]],
    decls: 6,
    vars: 4,
    consts: [["dialogView", ""], ["action", "FuelType", 3, "validateFunction", "mainDto", "excludedColumns", "validateFromParent"], [1, "row", "col-md-12"], [1, "col-md-12", "flex", "flex-column"], ["for", "name"], ["type", "text", "pInputText", "", "id", "name", "autocomplete", "off", 3, "ngModelChange", "ngModel"], [1, "col-md-12"], [3, "valueSelected", "title", "id", "name"], [1, "row", "col-md-12", "mt-3"], [1, "flex", "align-items-center", "gap-2"], ["inputId", "active", 3, "ngModelChange", "ngModel", "binary"], ["for", "active", 1, "mb-0"]],
    template: function FuelTypeComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "app-lookup", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("validateFunction", function FuelTypeComponent_Template_app_lookup_validateFunction_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.validateLocation());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, FuelTypeComponent_ng_template_1_Template, 14, 6, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "p-toast")(5, "p-confirmDialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("mainDto", ctx.dto)("excludedColumns", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](3, _c0))("validateFromParent", ctx.validateFromParent);
      }
    },
    dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, primeng_inputtext__WEBPACK_IMPORTED_MODULE_5__.InputText, primeng_checkbox__WEBPACK_IMPORTED_MODULE_6__.Checkbox, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_7__.ConfirmDialog, primeng_toast__WEBPACK_IMPORTED_MODULE_8__.Toast, _shared_components_picker_picker_component__WEBPACK_IMPORTED_MODULE_1__.PickerComponent, _app_main_generics_components_lookup_lookup_component__WEBPACK_IMPORTED_MODULE_0__.LookupComponent],
    encapsulation: 2
  });
}

/***/ }),

/***/ 97062:
/*!**************************************************************************!*\
  !*** ./src/app/main/rental/setup forms/ownership/ownership.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OwnershipComponent: () => (/* binding */ OwnershipComponent)
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
function OwnershipComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 2)(1, "div", 3)(2, "label", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Name:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "input", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function OwnershipComponent_ng_template_1_Template_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.dto.name, $event) || (ctx_r2.dto.name = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 6)(6, "div", 7)(7, "p-checkbox", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function OwnershipComponent_ng_template_1_Template_p_checkbox_ngModelChange_7_listener($event) {
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
class OwnershipComponent extends _app_main_generics_components_lookup_lookup_component__WEBPACK_IMPORTED_MODULE_0__.LookupComponent {
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
    this.createOrEditAfterValidation(this.dto, "VehicleOwnership");
  }
  static #_ = this.ɵfac = function OwnershipComponent_Factory(t) {
    return new (t || OwnershipComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_2__.MessageService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: OwnershipComponent,
    selectors: [["app-ownership"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
    decls: 6,
    vars: 4,
    consts: [["dialogView", ""], ["action", "VehicleOwnership", 3, "validateFunction", "mainDto", "excludedColumns", "validateFromParent"], [1, "row", "col-md-12"], [1, "col-md-12", "flex", "flex-column"], ["for", "name"], ["type", "text", "pInputText", "", "id", "name", "autocomplete", "off", 3, "ngModelChange", "ngModel"], [1, "row", "col-md-12", "mt-3"], [1, "flex", "align-items-center", "gap-2"], ["inputId", "active", 3, "ngModelChange", "ngModel", "binary"], ["for", "active", 1, "mb-0"]],
    template: function OwnershipComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "app-lookup", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("validateFunction", function OwnershipComponent_Template_app_lookup_validateFunction_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.validateLocation());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, OwnershipComponent_ng_template_1_Template, 10, 3, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
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

/***/ 40556:
/*!************************************************************************************************!*\
  !*** ./src/app/main/rental/setup forms/rental-contract-type/rental-contract-type.component.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RentalContractTypeComponent: () => (/* binding */ RentalContractTypeComponent)
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
function RentalContractTypeComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 2)(1, "div", 3)(2, "label", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Name:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "input", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function RentalContractTypeComponent_ng_template_1_Template_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.dto.name, $event) || (ctx_r2.dto.name = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 6)(6, "div", 7)(7, "p-checkbox", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function RentalContractTypeComponent_ng_template_1_Template_p_checkbox_ngModelChange_7_listener($event) {
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
class RentalContractTypeComponent extends _app_main_generics_components_lookup_lookup_component__WEBPACK_IMPORTED_MODULE_0__.LookupComponent {
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
    this.createOrEditAfterValidation(this.dto, "RentalContractType");
  }
  static #_ = this.ɵfac = function RentalContractTypeComponent_Factory(t) {
    return new (t || RentalContractTypeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_2__.MessageService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: RentalContractTypeComponent,
    selectors: [["app-rental-contract-type"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
    decls: 6,
    vars: 4,
    consts: [["dialogView", ""], ["action", "RentalContractType", 3, "validateFunction", "mainDto", "excludedColumns", "validateFromParent"], [1, "row", "col-md-12"], [1, "col-md-12", "flex", "flex-column"], ["for", "name"], ["type", "text", "pInputText", "", "id", "name", "autocomplete", "off", 3, "ngModelChange", "ngModel"], [1, "row", "col-md-12", "mt-3"], [1, "flex", "align-items-center", "gap-2"], ["inputId", "active", 3, "ngModelChange", "ngModel", "binary"], ["for", "active", 1, "mb-0"]],
    template: function RentalContractTypeComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "app-lookup", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("validateFunction", function RentalContractTypeComponent_Template_app_lookup_validateFunction_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.validateLocation());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, RentalContractTypeComponent_ng_template_1_Template, 10, 3, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
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

/***/ 32392:
/*!****************************************************************!*\
  !*** ./src/app/main/rental/setup forms/type/type.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TypeComponent: () => (/* binding */ TypeComponent)
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
function TypeComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 2)(1, "div", 3)(2, "label", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Name:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "input", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function TypeComponent_ng_template_1_Template_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.dto.name, $event) || (ctx_r2.dto.name = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 6)(6, "div", 7)(7, "p-checkbox", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function TypeComponent_ng_template_1_Template_p_checkbox_ngModelChange_7_listener($event) {
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
class TypeComponent extends _app_main_generics_components_lookup_lookup_component__WEBPACK_IMPORTED_MODULE_0__.LookupComponent {
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
    this.createOrEditAfterValidation(this.dto, "VehicleType");
  }
  static #_ = this.ɵfac = function TypeComponent_Factory(t) {
    return new (t || TypeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_2__.MessageService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: TypeComponent,
    selectors: [["app-type"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
    decls: 6,
    vars: 4,
    consts: [["dialogView", ""], ["action", "VehicleType", 3, "validateFunction", "mainDto", "excludedColumns", "validateFromParent"], [1, "row", "col-md-12"], [1, "col-md-12", "flex", "flex-column"], ["for", "name"], ["type", "text", "pInputText", "", "id", "name", "autocomplete", "off", 3, "ngModelChange", "ngModel"], [1, "row", "col-md-12", "mt-3"], [1, "flex", "align-items-center", "gap-2"], ["inputId", "active", 3, "ngModelChange", "ngModel", "binary"], ["for", "active", 1, "mb-0"]],
    template: function TypeComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "app-lookup", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("validateFunction", function TypeComponent_Template_app_lookup_validateFunction_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.validateLocation());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, TypeComponent_ng_template_1_Template, 10, 3, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
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

/***/ 87718:
/*!**********************************************************************************!*\
  !*** ./src/app/main/rental/setup forms/vehicle-color/vehicle-color.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VehicleColorComponent: () => (/* binding */ VehicleColorComponent)
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
function VehicleColorComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 2)(1, "div", 3)(2, "label", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Name:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "input", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function VehicleColorComponent_ng_template_1_Template_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.dto.name, $event) || (ctx_r2.dto.name = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 6)(6, "div", 7)(7, "p-checkbox", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function VehicleColorComponent_ng_template_1_Template_p_checkbox_ngModelChange_7_listener($event) {
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
class VehicleColorComponent extends _app_main_generics_components_lookup_lookup_component__WEBPACK_IMPORTED_MODULE_0__.LookupComponent {
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
    this.createOrEditAfterValidation(this.dto, "Colour");
  }
  static #_ = this.ɵfac = function VehicleColorComponent_Factory(t) {
    return new (t || VehicleColorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_2__.MessageService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: VehicleColorComponent,
    selectors: [["app-vehicle-color"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
    decls: 6,
    vars: 4,
    consts: [["dialogView", ""], ["action", "Colour", 3, "validateFunction", "mainDto", "excludedColumns", "validateFromParent"], [1, "row", "col-md-12"], [1, "col-md-12", "flex", "flex-column"], ["for", "name"], ["type", "text", "pInputText", "", "id", "name", "autocomplete", "off", 3, "ngModelChange", "ngModel"], [1, "row", "col-md-12", "mt-3"], [1, "flex", "align-items-center", "gap-2"], ["inputId", "active", 3, "ngModelChange", "ngModel", "binary"], ["for", "active", 1, "mb-0"]],
    template: function VehicleColorComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "app-lookup", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("validateFunction", function VehicleColorComponent_Template_app_lookup_validateFunction_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.validateLocation());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, VehicleColorComponent_ng_template_1_Template, 10, 3, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
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

/***/ 9725:
/*!***************************************************************!*\
  !*** ./src/app/main/rental/shared/services/rental.service.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RentalService: () => (/* binding */ RentalService)
/* harmony export */ });
/* harmony import */ var _shared_AppBaseURL_appBaseURL__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/AppBaseURL/appBaseURL */ 15473);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 70271);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ 39545);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 46443);





class RentalService {
  constructor(http) {
    this.http = http;
    this.commonUrl = "api/services/app/";
    this.baseUrl = _shared_AppBaseURL_appBaseURL__WEBPACK_IMPORTED_MODULE_0__.newBaseUrl + this.commonUrl;
    this.url = "";
    this.url_ = "";
  }
  // getAll(
  //   target: string,
  //   IsDropdown?: boolean,
  //   skipCount?: number,
  //   max?: number
  // ) {
  //   this.url = this.baseUrl;
  //   this.url += target + "/GetAll";
  //   debugger;
  //   if (IsDropdown) {
  //     this.url = this.url + "?IsDropdown=true";
  //   }
  //   return this.http.get(this.url).pipe(
  //     map((response: any) => {
  //       console.log(response);
  //       return response["result"];
  //     })
  //   );
  // }
  getAll(target, skipCount, maxCount) {
    debugger;
    this.url = `${this.baseUrl}${target}/GetAll`;
    const params = [];
    if (skipCount !== undefined) {
      params.push(`SkipCount=${skipCount}`);
    }
    if (maxCount !== undefined) {
      params.push(`MaxResultCount=${maxCount}`);
    }
    if (params.length > 0) {
      this.url += `?${params.join("&")}`;
    }
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      console.log(response);
      debugger;
      return response["result"];
    }));
  }
  getAllRecord(target, params) {
    debugger;
    this.url = `${this.baseUrl}${target}/GetAll?`;
    const searchParams = new URLSearchParams();
    if (params) {
      if (params.DocOrVocNumber) {
        searchParams.append("VoucherNumber", params.DocOrVocNumber.toString());
      }
      if (params.name) {
        searchParams.append("Name", params.name.toString());
      }
    }
    debugger;
    // Construct the final URL
    this.url += searchParams.toString();
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
    return this.http.post(this.url, dto);
  }
  delete(id, target) {
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/Delete?Id=" + id;
    return this.http.delete(this.url);
  }
  CloseDocument(id, target) {
    this.url = this.baseUrl;
    this.url += target + "/MarkContractAsCancelled?Id=" + id;
    return this.http.post(this.url, id);
  }
  getDataForEdit(id, target) {
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
    console.log(dto);
    this.url = this.baseUrl;
    this.url += target + "/Edit";
    return this.http.post(this.url, dto);
  }
  GetDocMaxCount(target, LocationId, IssueDate) {
    this.url = this.baseUrl;
    this.url += `${target}/GetMaxCount?`;
    if (LocationId !== undefined) {
      this.url += `LocationId=${LocationId}&`;
    }
    if (IssueDate !== undefined) {
      this.url += `IssueDate=${moment__WEBPACK_IMPORTED_MODULE_1__(IssueDate).format("yy-MM-DD")}&`;
    }
    debugger;
    this.url = this.url.endsWith("&") ? this.url.slice(0, -1) : this.url;
    this.url = this.url.endsWith("?") ? this.url.slice(0, -1) : this.url;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  getDefaultLocation(target, id) {
    this.url = this.baseUrl;
    this.url += `${target}/GetAll?`;
    if (id !== undefined) {
      this.url += `Id=${id}&`;
    }
    this.url = this.url.endsWith("&") ? this.url.slice(0, -1) : this.url;
    this.url = this.url.endsWith("?") ? this.url.slice(0, -1) : this.url;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  Approve(id, target) {
    this.url = this.baseUrl;
    this.url += target + "/ApproveDocument?Id=" + id;
    return this.http.post(this.url, {});
  }
  GetAvailableVehicles(attendanceDate, locationId, costCenterId, target) {
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/GetAvailableVehicles?AttendanceDate=" + moment__WEBPACK_IMPORTED_MODULE_1__(attendanceDate).format("YYYY-MM-DD") + "&LocationId=" + locationId + "&CostCenterId=" + costCenterId;
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      return response["result"];
    }));
  }
  GetVehiclesAttendance(AttendanceMonth, target) {
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/GetVehiclesAttendance?AttendanceMonth=" + moment__WEBPACK_IMPORTED_MODULE_1__(AttendanceMonth).format("YYYY-MM-DD");
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      return response["result"];
    }));
  }
  GetHouseRentDetails(InvoiceMonth, target) {
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/GenerateInvoiceDetailsForHouse?InvoiceDate=" + moment__WEBPACK_IMPORTED_MODULE_1__(InvoiceMonth).format("YYYY-MM-DD");
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      return response["result"];
    }));
  }
  getVoucherNumber(prefix, IssueDate, locationId, target) {
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/GetVoucherNumber?Prefix=" + prefix + "&IssueDate=" + new Date(IssueDate).toISOString().slice(0, 10) + "&UserLocationId=" + locationId;
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      return response["result"];
    }));
  }
  static #_ = this.ɵfac = function RentalService_Factory(t) {
    return new (t || RentalService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: RentalService,
    factory: RentalService.ɵfac,
    providedIn: "root"
  });
}

/***/ }),

/***/ 76235:
/*!*********************************************************************************************!*\
  !*** ./src/app/main/rental/vehicle management/rental-contract/rental-contract.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RentalContractComponent: () => (/* binding */ RentalContractComponent)
/* harmony export */ });
/* harmony import */ var _Users_muhammadhassankhan_Documents_devoclock_github_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 89475);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 61318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 77919);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _budget_shared_Dtos_restriction_dto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../budget/shared/Dtos/restriction-dto */ 97223);
/* harmony import */ var _shared_Utials_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/Utials/utils */ 2584);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _shared_services_rental_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/rental.service */ 9725);
/* harmony import */ var _budget_shared_services_restriction_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../budget/shared/services/restriction.service */ 92076);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/api */ 17780);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/button */ 49136);
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/dialog */ 16280);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/table */ 76676);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/paginator */ 43157);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/dropdown */ 26895);
/* harmony import */ var primeng_inputnumber__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/inputnumber */ 61759);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/toolbar */ 31973);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! primeng/inputtext */ 48361);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primeng/calendar */ 41314);
/* harmony import */ var primeng_checkbox__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! primeng/checkbox */ 26771);
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! primeng/confirmdialog */ 68160);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! primeng/toast */ 61225);
/* harmony import */ var _shared_components_picker_picker_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../shared/components/picker/picker.component */ 79023);
























const _c0 = () => ({
  width: "100%",
  "overflow-y": "auto"
});
const _c1 = () => ["contractReferenceName", "supplierName", "issueDate", "voucherNumber", "userLocationName", "employeeCode", "rate", "startDate", "endDate", "costCenterName", "projectName", "Status"];
const _c2 = a0 => [5, 10, 20, a0];
const _c3 = () => ({
  width: "100%",
  height: "40px"
});
function RentalContractComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Rental Contract");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalContractComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "span", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalContractComponent_ng_template_2_Template_span_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.show());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "span", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "i", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "input", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("keydown.enter", function RentalContractComponent_ng_template_2_Template_input_keydown_enter_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.onEnter($event));
    })("input", function RentalContractComponent_ng_template_2_Template_input_input_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      const policyTable_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.onGlobalFilter(policyTable_r4, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}
function RentalContractComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr")(1, "th", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, " Actions ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "p-sortIcon", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "th", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, " voucher Number ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "p-sortIcon", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "th", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, " userLocationName");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](9, "p-sortIcon", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "th", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, " ProjectName");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "p-sortIcon", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "th", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14, " CostCenter Name ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](15, "p-sortIcon", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "th", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](17, " Supplier Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](18, "p-sortIcon", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "th", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](20, " Rate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](21, "p-sortIcon", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "th", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](23, " Start Date ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](24, "p-sortIcon", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](25, "th", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](26, " End Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](27, "p-sortIcon", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](28, "th", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](29, " Contract Reference Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](30, "p-sortIcon", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](31, "th", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](32, " Rental ContractType");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](33, "p-sortIcon", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](34, "th", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](35, " Maximum Travelling ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](36, "p-sortIcon", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](37, "th", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](38, " Employee Name ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](39, "p-sortIcon", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](40, "th", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](41, " Employee Code ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](42, "p-sortIcon", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](43, "th", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](44, " issue Date ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](45, "p-sortIcon", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](46, "th", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](47, " status ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](48, "p-sortIcon", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](49, "th", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](50, " remarks ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](51, "p-sortIcon", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](52, "th", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](53, " Active ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](54, "p-sortIcon", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](55, "th", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](56, " isVehicleContract ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](57, "p-sortIcon", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](58, "th", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](59, " Contract Category ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](60, "p-sortIcon", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}
function RentalContractComponent_ng_template_7_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalContractComponent_ng_template_7_span_2_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r5);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.viewOnly(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalContractComponent_ng_template_7_span_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalContractComponent_ng_template_7_span_3_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r7);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.edit(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalContractComponent_ng_template_7_span_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalContractComponent_ng_template_7_span_4_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.closeDocument(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalContractComponent_ng_template_7_span_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalContractComponent_ng_template_7_span_5_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r9);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.approve(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalContractComponent_ng_template_7_span_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.status);
  }
}
function RentalContractComponent_ng_template_7_span_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 110);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.status);
  }
}
function RentalContractComponent_ng_template_7_span_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Yes");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalContractComponent_ng_template_7_span_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 110);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "No");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalContractComponent_ng_template_7_span_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Yes");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalContractComponent_ng_template_7_span_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 110);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "No");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalContractComponent_ng_template_7_span_49_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " Vehicle ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalContractComponent_ng_template_7_span_50_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " House ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalContractComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, RentalContractComponent_ng_template_7_span_2_Template, 1, 0, "span", 97)(3, RentalContractComponent_ng_template_7_span_3_Template, 1, 0, "span", 98)(4, RentalContractComponent_ng_template_7_span_4_Template, 1, 0, "span", 99)(5, RentalContractComponent_ng_template_7_span_5_Template, 1, 0, "span", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](20, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](23, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](24, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](26, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](28, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](30, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](32, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](34, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](36, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](37, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](38, RentalContractComponent_ng_template_7_span_38_Template, 2, 1, "span", 101)(39, RentalContractComponent_ng_template_7_span_39_Template, 2, 1, "span", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](40, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](42, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](43, RentalContractComponent_ng_template_7_span_43_Template, 2, 0, "span", 101)(44, RentalContractComponent_ng_template_7_span_44_Template, 2, 0, "span", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](45, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](46, RentalContractComponent_ng_template_7_span_46_Template, 2, 0, "span", 101)(47, RentalContractComponent_ng_template_7_span_47_Template, 2, 0, "span", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](48, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](49, RentalContractComponent_ng_template_7_span_49_Template, 2, 0, "span", 103)(50, RentalContractComponent_ng_template_7_span_50_Template, 2, 0, "span", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status == "APPROVED" || item_r6.status == "CLOSED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status != "APPROVED" && item_r6.status != "CLOSED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status == "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status === "PENDING" || item_r6.status == "UNAPPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.voucherNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.userLocationName);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.projectName);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.costCenterName);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.supplierName);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.rate);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](20, 27, item_r6.startDate));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](23, 29, item_r6.endDate));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.contractReferenceName);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.rentalContractTypeTitle);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.maximumTravelling);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.employeeName);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.employeeCode);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](36, 31, item_r6.issueDate));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status == "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status != "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.remarks);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.isActive);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !item_r6.isActive);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.isVehicleContract);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !item_r6.isVehicleContract);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.isVehicleContract);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !item_r6.isVehicleContract);
  }
}
function RentalContractComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalContractComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalContractComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 24)(1, "app-picker", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("valueSelected", function RentalContractComponent_div_31_Template_app_picker_valueSelected_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r10);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.setPickerValue($event, "Vehicle"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("title", "Vehicle")("id", (tmp_3_0 = ctx_r2.rentalcontractform.get("contractReferenceId")) == null ? null : tmp_3_0.value)("name", (tmp_4_0 = ctx_r2.rentalcontractform.get("contractReferenceName")) == null ? null : tmp_4_0.value)("locationId", ctx_r2.rentalcontractform.value.userLocationId);
  }
}
function RentalContractComponent_div_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 24)(1, "app-picker", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("valueSelected", function RentalContractComponent_div_32_Template_app_picker_valueSelected_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r11);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.setPickerValue($event, "RentalHouse"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("title", "RentalHouse")("id", (tmp_3_0 = ctx_r2.rentalcontractform.get("contractReferenceId")) == null ? null : tmp_3_0.value)("name", (tmp_4_0 = ctx_r2.rentalcontractform.get("contractReferenceName")) == null ? null : tmp_4_0.value)("locationId", ctx_r2.rentalcontractform.value.userLocationId);
  }
}
function RentalContractComponent_div_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalContractComponent_div_52_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalContractComponent_div_57_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " This field is required and must be numeric ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalContractComponent_div_70_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalContractComponent_div_76_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalContractComponent_div_81_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalContractComponent_p_button_88_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p-button", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalContractComponent_p_button_88_Template_p_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r12);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.save());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("loading", ctx_r2.saving)("disabled", !ctx_r2.rentalcontractform.valid)("outlined", true);
  }
}
function RentalContractComponent_p_button_89_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p-button", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalContractComponent_p_button_89_Template_p_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r13);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.update());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("loading", ctx_r2.saving)("outlined", true);
  }
}
class RentalContractComponent {
  constructor(fb, _rentalService, _restrictionService, msgService, confirmationService) {
    this.fb = fb;
    this._rentalService = _rentalService;
    this._restrictionService = _restrictionService;
    this.msgService = msgService;
    this.confirmationService = confirmationService;
    this.restrictionDto = new _budget_shared_Dtos_restriction_dto__WEBPACK_IMPORTED_MODULE_1__.RestrictionDto();
    this.target = "RentalContract";
    this.today = new Date();
    this.MinDate = new Date();
    this.currentPage = 1;
    this.skipCount = 0;
    this.maxCount = 5;
    this.dto = {
      DocOrVocNumber: ""
    };
    this.showSupplierDetails = false;
    this.maxDate = new Date();
    this.minDate = new Date();
    this.rentalContractOptions = [{
      label: "Monthly",
      value: 1
    }, {
      label: "Two Months",
      value: 2
    }, {
      label: "Quarterly",
      value: 3
    }, {
      label: "Four Months",
      value: 4
    }, {
      label: "Five Months",
      value: 5
    }, {
      label: "Six Months",
      value: 6
    }, {
      label: "Seven Months",
      value: 7
    }, {
      label: "Eight Months",
      value: 8
    }, {
      label: "Nine Months",
      value: 9
    }, {
      label: "Ten Months",
      value: 10
    }, {
      label: "Eleven Months",
      value: 11
    }, {
      label: "Annual",
      value: 12
    }, {
      label: "Biennial",
      value: 24
    }, {
      label: "Triennial",
      value: 36
    }, {
      label: "Five Years",
      value: 60
    }, {
      label: "Ten Years",
      value: 120
    }];
    this.chooseContractOptions = [{
      label: "Vehicle Contract",
      value: true
    }, {
      label: "House Contract",
      value: false
    }];
    this.rentalcontractform = this.fb.group({
      issueDate: [new Date(), _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required],
      voucherNumber: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required],
      contractReferenceId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required],
      contractReferenceName: [""],
      supplierId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required],
      supplierName: [""],
      costCenterId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required],
      costCenterName: [""],
      // regionId: [null, Validators.required],
      // regionName: [""],
      projectId: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]],
      projectName: [""],
      rentalContractType: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]],
      startDate: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]],
      endDate: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]],
      rate: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]],
      // maximumTravelling: [null, [Validators.required]],
      employeeId: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]],
      employeeName: [""],
      employeeErpId: "",
      employeeCode: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]],
      userLocationId: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]],
      userLocationName: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]],
      isVehicleContract: [""],
      isActive: [""],
      status: [""],
      remarks: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]],
      refundableSecurityDeposit: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]]
    });
  }
  ngOnInit() {
    this.getAll();
    const isVehicleContract = this.rentalcontractform.get("isVehicleContract")?.value ?? true;
    const prefix = isVehicleContract ? "RVC" : "RHC";
    this.VoucherRestriction(prefix);
  }
  setPickerValue(value, title) {
    switch (title) {
      case "Location":
        debugger;
        this.rentalcontractform.patchValue({
          userLocationId: value?.id,
          userLocationName: value.name
        });
        this.GetDocMaxCount("RentalContract");
        break;
      case "CostCenter":
        this.rentalcontractform.patchValue({
          costCenterId: value.id,
          costCenterName: value.name
        });
        break;
      case "Project":
        this.rentalcontractform.patchValue({
          projectId: value.id,
          projectName: value.name
        });
        break;
      case "Region":
        this.rentalcontractform.patchValue({
          regionId: value.id,
          regionName: value.name
        });
        break;
      case "Supplier":
        this.rentalcontractform.patchValue({
          supplierId: value.id,
          supplierName: value.title
        });
        this.showSerialNumber = value.serialNumber;
        break;
      case "Employee":
        this.rentalcontractform.patchValue({
          employeeId: value.additional,
          employeeName: value.name,
          employeeErpId: value.id
        });
        break;
      case "Vehicle":
        this.rentalcontractform.patchValue({
          contractReferenceId: value.id,
          contractReferenceName: value.name
        });
        break;
      case "RentalHouse":
        this.rentalcontractform.patchValue({
          contractReferenceId: value.id,
          contractReferenceName: value.name
        });
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  getAll(skipCount = this.skipCount, maxCount = this.maxCount) {
    this._rentalService.getAll(this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;
      }
    });
  }
  show(id) {
    if (id) {
      this._rentalService.getDataForEdit(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {
        // Any cleanup or loading off code if needed
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
        debugger;
        this.msgService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
      })).subscribe({
        next: response => {
          debugger;
          this.dataForEdit = response;
          this.rentalcontractform.patchValue({
            voucherNumber: this.dataForEdit.voucherNumber,
            issueDate: new Date(this.dataForEdit.issueDate),
            startDate: new Date(this.dataForEdit.startDate),
            endDate: new Date(this.dataForEdit.endDate),
            remarks: this.dataForEdit.remarks,
            refundableSecurityDeposit: this.dataForEdit.refundableSecurityDeposit,
            costCenterId: this.dataForEdit.costCenterId,
            costCenterName: this.dataForEdit.costCenterName,
            projectId: this.dataForEdit.projectId,
            projectName: this.dataForEdit.projectName,
            userLocationId: this.dataForEdit.userLocationId,
            userLocationName: this.dataForEdit.userLocationName,
            rate: this.dataForEdit.rate,
            employeeId: this.dataForEdit.employeeId,
            employeeName: this.dataForEdit.employeeName,
            employeeErpId: this.dataForEdit.employeeErpId,
            employeeCode: this.dataForEdit.employeeCode,
            contractReferenceId: this.dataForEdit.contractReferenceId,
            contractReferenceName: this.dataForEdit.contractReferenceName,
            supplierId: this.dataForEdit.supplierId,
            supplierName: this.dataForEdit.supplierName,
            // regionId: this.dataForEdit.regionId,
            // regionName: this.dataForEdit.regionName,
            supplierSerialNumber: this.dataForEdit.supplierSerialNumber,
            rentalContractType: this.dataForEdit.rentalContractType,
            isVehicleContract: this.dataForEdit.isVehicleContract ? true : false,
            // Uncomment if needed
            // maximumTravelling: this.dataForEdit.maximumTravelling,
            isActive: this.dataForEdit.isActive
          });
          this.showSerialNumber = this.dataForEdit.supplierSerialNumber, this.displayModal = true;
        }
      });
    } else {
      if (!this.restrictionDto.isCreationAllowed) {
        this.msgService.add({
          severity: "info",
          summary: "Info",
          detail: "Creation Restricted"
        });
        return;
      }
      this.getDefaultLocation("Location", "locationName", "locationId", "");
      this.editMode = false;
      this.viewMode = false;
      this.rentalcontractform.enable();
      this.displayModal = true;
      this.rentalcontractform.reset();
      this.showSerialNumber = null;
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.rentalcontractform.get("issueDate")?.setValue(this.today);
      this.rentalcontractform.get("isActive").setValue(true);
      this.rentalcontractform.get("isVehicleContract").setValue(true);
      this.onContractTypeChange();
    }
  }
  save() {
    this.saving = true;
    if (!this.rentalcontractform.valid) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all Required fields",
        life: 2000
      });
      this.saving = false;
      return;
    }
    this._rentalService.create(this.rentalcontractform.value, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {
      this.saving = false;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.msgService.add({
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
  update() {
    this.saving = true;
    const updateData = {
      ...this.rentalcontractform.value,
      id: this.dataForEdit.id
    };
    this._rentalService.update(updateData, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {
      this.saving = false;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.msgService.add({
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
  closeDocument(id) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._rentalService.CloseDocument(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
          debugger;
          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000
          });
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
        })).subscribe({
          next: response => {
            debugger;
            if (response) {
              this.msgService.add({
                severity: "info",
                summary: "Confirmed",
                detail: "Closed Successfully",
                life: 2000
              });
              this.getAll();
            }
          }
        });
      }
    });
  }
  isFieldInvalid(field) {
    const control = this.rentalcontractform.get(field);
    return control ? control.invalid && control.touched : false;
  }
  onDateChange(value) {
    debugger;
    if (value) {
      this.rentalcontractform.value.issueDate = value;
    }
    if (this.rentalcontractform.value.userLocationId && this.rentalcontractform.value.issueDate) {
      this.GetDocMaxCount("RentalContract");
    }
  }
  MakeVoucher() {
    debugger;
    const isVehicleContract = this.rentalcontractform.value.isVehicleContract;
    const prefix = isVehicleContract ? "RVC-HNL" : "RHC-HNL";
    if (this.rentalcontractform.value.userLocationId && this.documentNumber) {
      const voucherNumber = prefix + "-" + this.rentalcontractform.value.userLocationId + "-" + this.rentalcontractform.value.issueDate.getFullYear() + "-" + (this.rentalcontractform.value.issueDate.getMonth() + 1) + "-" + this.documentNumber;
      this.rentalcontractform.get("voucherNumber").setValue(voucherNumber);
    } else {
      this.GetDocMaxCount("RentalContract");
    }
  }
  getDefaultLocation(target, name, id, filterId) {
    var _this = this;
    return (0,_Users_muhammadhassankhan_Documents_devoclock_github_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this._rentalService.getDefaultLocation(target, filterId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
        _this.msgService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
      })).subscribe({
        next: response => {
          debugger;
          _this.rentalcontractform.get("userLocationName").setValue(response.items[0].shortName);
          _this.rentalcontractform.get("userLocationId").setValue(response.items[0].id);
          _this.GetDocMaxCount("RentalContract");
        }
      });
    })();
  }
  GetDocMaxCount(target) {
    debugger;
    if (this.rentalcontractform.value.userLocationId && this.rentalcontractform.value.issueDate) {
      this._rentalService.GetDocMaxCount(target, this.rentalcontractform.value.userLocationId, this.rentalcontractform.value.issueDate).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
        this.msgService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
      })).subscribe({
        next: response => {
          debugger;
          this.documentNumber = response;
          this.MakeVoucher();
        }
      });
    }
  }
  approve(id) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._rentalService.Approve(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
          debugger;
          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000
          });
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
        })).subscribe({
          next: response => {
            debugger;
            if (response) {
              this.msgService.add({
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
  edit(id) {
    if (!this.restrictionDto.isEditAllowed) {
      this.msgService.add({
        severity: "info",
        summary: "Info",
        detail: "Edit Restricted"
      });
      return;
    }
    this.editMode = true;
    this.viewMode = false;
    this.show(id);
    this.rentalcontractform.enable();
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }
  viewOnly(id) {
    this.viewMode = true;
    this.editMode = false;
    this.show(id);
    this.rentalcontractform.disable();
    this.MinDate = null;
  }
  onGlobalFilter(table, event) {
    table.filterGlobal(event.target.value, "contains");
  }
  onContractTypeChange() {
    if (this.rentalcontractform.get("isVehicleContract")?.value) {
      this.subLedgerType = "16";
    } else {
      this.subLedgerType = "18";
    }
    if (this.rentalcontractform.get("isVehicleContract")?.value === false) {
      this.rentalcontractform.get("issueDate").reset();
      this.rentalcontractform.get("userLocationId").reset();
      this.rentalcontractform.get("userLocationName").reset();
      this.rentalcontractform.get("voucherNumber").reset();
    }
    this.MakeVoucher();
  }
  onPageChange(event) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * 5;
    this._rentalService.getAll(this.target, this.skipCount, this.maxCount).subscribe({
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
    this.dto.DocOrVocNumber = inputValue;
    debugger;
    this._rentalService.getAllRecord(this.target, this.dto).subscribe({
      next: response => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;
        this.loading = false;
      }
    });
  }
  VoucherRestriction(prefix) {
    this._restrictionService.getVoucherRestriction(prefix).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        console.log(response);
        debugger;
        this.restrictionDto = (0,_shared_Utials_utils__WEBPACK_IMPORTED_MODULE_2__.mapRestrictionDto)(response.items[0]);
        console.log(this.restrictionDto);
      }
    });
  }
  onChange() {
    debugger;
    const periodFrom = this.rentalcontractform.get("startDate")?.value;
    const periodTo = this.rentalcontractform.get("endDate")?.value;
    if (periodFrom && periodTo) {
      const fromDate = new Date(periodFrom);
      const toDate = new Date(periodTo);
      if (fromDate > toDate) {
        this.msgService.add({
          severity: "error",
          summary: "Validation Error",
          detail: "Start Date cannot be later than End Date."
        });
        this.rentalcontractform.get("endDate")?.setValue(periodFrom);
      }
    }
  }
  static #_ = this.ɵfac = function RentalContractComponent_Factory(t) {
    return new (t || RentalContractComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_shared_services_rental_service__WEBPACK_IMPORTED_MODULE_3__.RentalService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_budget_shared_services_restriction_service__WEBPACK_IMPORTED_MODULE_4__.RestrictionService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_11__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_11__.ConfirmationService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: RentalContractComponent,
    selectors: [["app-rental-contract"]],
    decls: 93,
    vars: 71,
    consts: [["policyTable", ""], ["styleClass", "mb-4"], ["pTemplate", "left"], ["pTemplate", "right"], [1, "card", "p-4"], ["styleClass", "p-datatable-gridlines", "scrollHeight", "58vh", "responsiveLayout", "scroll", "dataKey", "id", "responsiveLayout", "scroll", 3, "value", "scrollable", "rowHover", "paginatorDropdownAppendTo", "globalFilterFields"], ["pTemplate", "header"], ["pTemplate", "body"], ["currentPageReportTemplate", "Showing {first} to {last} of {totalRecords} entries", 3, "onPageChange", "rows", "totalRecords", "showCurrentPageReport", "rowsPerPageOptions"], [3, "visibleChange", "maximizable", "closeOnEscape", "header", "modal", "visible", "draggable"], [3, "ngSubmit", "formGroup"], [1, "col-md-3"], ["for", "rentalContractType"], ["id", "rentalContractType", "placeholder", "--Select--", "formControlName", "isVehicleContract", "autocomplete", "off", 3, "onChange", "options"], [1, "row", "col-md-12", "mt-4"], ["id", "inputField", 1, "col-md-4", "flex", "flex-column"], ["for", "name"], ["formControlName", "issueDate", "inputId", "date", "appendTo", "body", "tabindex", "1", "name", "issueDate", 3, "ngModelChange", "minDate", "maxDate", "showOnFocus"], ["class", "text-danger", 4, "ngIf"], ["id", "inputField", 1, "col-md-4"], [3, "valueSelected", "title", "id", "name", "showId"], ["type", "text", "pInputText", "", "formControlName", "voucherNumber", "id", "voucherNumber", "autocomplete", "off", "readonly", "", 2, "position", "relative", "z-index", "1000"], [1, "row", "col-md-12"], ["class", "col-md-12", 4, "ngIf"], [1, "col-md-12"], [3, "valueSelected", "title", "title2", "id", "name", "chartOfAccountSubLedgerType", "locationId"], [3, "valueSelected", "title", "id", "name"], [1, "row", "col-md-12", "mt-2"], ["id", "inputField", 1, "col-md-3", "flex", "flex-column"], ["formControlName", "startDate", "inputId", "date", "appendTo", "body", 3, "onSelect", "maxDate", "showOnFocus"], ["formControlName", "endDate", "inputId", "date", "appendTo", "body", 3, "onSelect", "showOnFocus"], ["for", "rate"], ["formControlName", "rate", "id", "rate", "mode", "decimal", "autocomplete", "off", 3, "useGrouping"], ["id", "rentalContractType", "placeholder", "--Select--", "formControlName", "rentalContractType", "autocomplete", "off", 3, "options"], [1, "col-md-6"], [3, "valueSelected", "title", "title2", "id", "name"], ["id", "inputField", 1, "col-md-6"], ["for", "employeeCode"], ["type", "text", "pInputText", "", "formControlName", "employeeCode", "id", "employeeCode", "autocomplete", "off", 2, "position", "relative", "z-index", "1000"], ["id", "inputField", 1, "col-md-6", "flex", "flex-column"], ["for", "remarks"], ["type", "text", "pInputText", "", "formControlName", "remarks", "id", "remarks", "autocomplete", "off", 2, "position", "relative", "z-index", "1000"], ["for", "refundableSecurityDeposit"], ["type", "text", "pInputText", "", "formControlName", "refundableSecurityDeposit", "id", "refundableSecurityDeposit", "autocomplete", "off", 2, "position", "relative", "z-index", "1000"], [1, "flex", "gap-2", "align-items-center"], ["formControlName", "isActive", "inputId", "isActive", "inputId", "binary", 3, "binary"], ["for", "isActive"], [1, "flex", "gap-1", "justify-content-end", "mt-4"], ["label", "Cancel", "severity", "warning", 3, "onClick", "outlined"], ["label", "Save", "severity", "contrast", 3, "loading", "disabled", "outlined", "click", 4, "ngIf"], ["label", "Update", "severity", "contrast", 3, "loading", "outlined", "click", 4, "ngIf"], [1, "p-toolbar-group-left"], [1, "p-toolbar-separator", 2, "margin-right", "10px"], ["pButton", "", "icon", "pi pi-plus-circle", 1, "p-button-success", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], [1, "block", "md:mt-0", "p-input-icon-left"], [1, "pi", "pi-search"], ["pInputText", "", "type", "text", "placeholder", "Search...", 2, "height", "25px", "cursor", "pointer", 3, "keydown.enter", "input"], ["pSortableColumn", "Actions", 2, "min-width", "200px"], ["field", "Actions"], ["pSortableColumn", "voucherNumber", 2, "min-width", "200px"], ["field", "voucherNumber"], ["pSortableColumn", "userLocationName", 2, "min-width", "200px"], ["field", "userLocationName"], ["pSortableColumn", "projectName", 2, "min-width", "200px"], ["field", "projectName"], ["pSortableColumn", "costCenterName", 2, "min-width", "200px"], ["field", "costCenterName"], ["pSortableColumn", "supplierName", 2, "min-width", "200px"], ["field", "supplierName"], ["pSortableColumn", "rate", 2, "min-width", "200px"], ["field", "rate"], ["pSortableColumn", "startDate", 2, "min-width", "200px"], ["field", "startDate"], ["pSortableColumn", "endDate", 2, "min-width", "200px"], ["field", "endDate"], ["pSortableColumn", "contractReferenceName", 2, "min-width", "200px"], ["field", "contractReferenceName"], ["pSortableColumn", "rentalContractTypeName", 2, "min-width", "200px"], ["field", "rentalContractTypeName"], ["pSortableColumn", "maximumTravelling", 2, "min-width", "200px"], ["field", "maximumTravelling"], ["pSortableColumn", "employeeName", 2, "min-width", "200px"], ["field", "employeeName"], ["pSortableColumn", "employeeCode", 2, "min-width", "200px"], ["field", "employeeCode"], ["pSortableColumn", "issueDate", 2, "min-width", "200px"], ["field", "issueDate"], ["pSortableColumn", "status", 2, "min-width", "200px"], ["field", "status"], ["pSortableColumn", "remarks", 2, "min-width", "200px"], ["field", "remarks"], ["pSortableColumn", "Active", 2, "min-width", "200px"], ["field", "Active"], ["pSortableColumn", "isVehicleContract", 2, "min-width", "200px"], ["field", "isVehicleContract"], ["pSortableColumn", "Contract Category", 2, "min-width", "200px"], ["field", "Contract Category"], ["style", "height: 25px; width: 25px; cursor: pointer", "pButton", "", "pRipple", "", "icon", "pi pi-eye", "class", "p-button-rounded p-button-info mr-2", 3, "click", 4, "ngIf"], ["style", "height: 25px; width: 25px; cursor: pointer", "pButton", "", "pRipple", "", "icon", "pi pi-pencil", "class", "p-button-rounded p-button-info mr-2", 3, "click", 4, "ngIf"], ["style", "height: 25px; width: 25px; cursor: pointer", "pButton", "", "pRipple", "", "icon", "pi pi-times", "class", "p-button-rounded p-button-warning mr-2", 3, "click", 4, "ngIf"], ["pButton", "", "pRipple", "", "icon", "pi pi-check", "style", "height: 25px; width: 25px; cursor: pointer", "class", "p-button-rounded p-button-success mr-2", 3, "click", 4, "ngIf"], ["class", "yes-bg", 4, "ngIf"], ["class", "no-bg", 4, "ngIf"], ["style", "\n              color: green;\n              font-weight: bold;\n              padding: 4px 8px;\n              border-radius: 4px;\n              background-color: #e6f4e6;\n            ", 4, "ngIf"], ["style", "\n              color: red;\n              font-weight: bold;\n              padding: 4px 8px;\n              border-radius: 4px;\n              background-color: #fdecea;\n            ", 4, "ngIf"], ["pButton", "", "pRipple", "", "icon", "pi pi-eye", 1, "p-button-rounded", "p-button-info", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], ["pButton", "", "pRipple", "", "icon", "pi pi-pencil", 1, "p-button-rounded", "p-button-info", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], ["pButton", "", "pRipple", "", "icon", "pi pi-times", 1, "p-button-rounded", "p-button-warning", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], ["pButton", "", "pRipple", "", "icon", "pi pi-check", 1, "p-button-rounded", "p-button-success", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], [1, "yes-bg"], [1, "no-bg"], [2, "color", "green", "font-weight", "bold", "padding", "4px 8px", "border-radius", "4px", "background-color", "#e6f4e6"], [2, "color", "red", "font-weight", "bold", "padding", "4px 8px", "border-radius", "4px", "background-color", "#fdecea"], [1, "text-danger"], [3, "valueSelected", "title", "id", "name", "locationId"], ["label", "Save", "severity", "contrast", 3, "click", "loading", "disabled", "outlined"], ["label", "Update", "severity", "contrast", 3, "click", "loading", "outlined"]],
    template: function RentalContractComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p-toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, RentalContractComponent_ng_template_1_Template, 2, 0, "ng-template", 2)(2, RentalContractComponent_ng_template_2_Template, 6, 0, "ng-template", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 4)(4, "p-table", 5, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, RentalContractComponent_ng_template_6_Template, 61, 0, "ng-template", 6)(7, RentalContractComponent_ng_template_7_Template, 51, 33, "ng-template", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "p-paginator", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onPageChange", function RentalContractComponent_Template_p_paginator_onPageChange_8_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.onPageChange($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "p-dialog", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayListener"]("visibleChange", function RentalContractComponent_Template_p_dialog_visibleChange_9_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayBindingSet"](ctx.displayModal, $event) || (ctx.displayModal = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "form", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngSubmit", function RentalContractComponent_Template_form_ngSubmit_11_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.save());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "div", 11)(13, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14, "Choose Contract:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "p-dropdown", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onChange", function RentalContractComponent_Template_p_dropdown_onChange_15_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.onContractTypeChange());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "div", 14)(17, "div", 15)(18, "label", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](19, "Date:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "p-calendar", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RentalContractComponent_Template_p_calendar_ngModelChange_20_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.onDateChange($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](21, RentalContractComponent_div_21_Template, 2, 0, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "div", 19)(23, "app-picker", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("valueSelected", function RentalContractComponent_Template_app_picker_valueSelected_23_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.setPickerValue($event, "Location"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](24, "div", 15)(25, "label", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](26, "Voucher Number:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](27, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](28, RentalContractComponent_div_28_Template, 2, 0, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](29, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](30, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](31, RentalContractComponent_div_31_Template, 2, 4, "div", 23)(32, RentalContractComponent_div_32_Template, 2, 4, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](33, "div", 22)(34, "div", 24)(35, "app-picker", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("valueSelected", function RentalContractComponent_Template_app_picker_valueSelected_35_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.setPickerValue($event, "Supplier"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](36, "div", 22)(37, "div", 24)(38, "app-picker", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("valueSelected", function RentalContractComponent_Template_app_picker_valueSelected_38_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.setPickerValue($event, "CostCenter"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](39, "div", 22)(40, "div", 24)(41, "app-picker", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("valueSelected", function RentalContractComponent_Template_app_picker_valueSelected_41_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.setPickerValue($event, "Project"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](42, "div", 27)(43, "div", 28)(44, "label", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](45, "Period From:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](46, "p-calendar", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onSelect", function RentalContractComponent_Template_p_calendar_onSelect_46_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.onChange());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](47, RentalContractComponent_div_47_Template, 2, 0, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](48, "div", 28)(49, "label", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](50, "Period to:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](51, "p-calendar", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onSelect", function RentalContractComponent_Template_p_calendar_onSelect_51_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.onChange());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](52, RentalContractComponent_div_52_Template, 2, 0, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](53, "div", 28)(54, "label", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](55, "Rate:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](56, "p-inputNumber", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](57, RentalContractComponent_div_57_Template, 2, 0, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](58, "div", 11)(59, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](60, "Rental Contract Type:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](61, "p-dropdown", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](62, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](63, "div", 22)(64, "div", 34)(65, "app-picker", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("valueSelected", function RentalContractComponent_Template_app_picker_valueSelected_65_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.setPickerValue($event, "Employee"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](66, "div", 36)(67, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](68, "Cluster Code:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](69, "input", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](70, RentalContractComponent_div_70_Template, 2, 0, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](71, "div", 22)(72, "div", 39)(73, "label", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](74, "Remarks:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](75, "input", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](76, RentalContractComponent_div_76_Template, 2, 0, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](77, "div", 39)(78, "label", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](79, "Security Deposit:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](80, "input", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](81, RentalContractComponent_div_81_Template, 2, 0, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](82, "div", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](83, "p-checkbox", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](84, "label", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](85, "Active");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](86, "div", 47)(87, "p-button", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onClick", function RentalContractComponent_Template_p_button_onClick_87_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.displayModal = false);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](88, RentalContractComponent_p_button_88_Template, 1, 3, "p-button", 49)(89, RentalContractComponent_p_button_89_Template, 1, 2, "p-button", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](90, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](91, "p-toast")(92, "p-confirmDialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        let tmp_25_0;
        let tmp_26_0;
        let tmp_29_0;
        let tmp_30_0;
        let tmp_34_0;
        let tmp_38_0;
        let tmp_39_0;
        let tmp_41_0;
        let tmp_42_0;
        let tmp_54_0;
        let tmp_55_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](65, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", ctx.tableData)("scrollable", true)("rowHover", true)("paginatorDropdownAppendTo", "body")("globalFilterFields", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](66, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("rows", 5)("totalRecords", ctx.count)("showCurrentPageReport", true)("rowsPerPageOptions", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](67, _c2, ctx.count));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("maximizable", true)("closeOnEscape", false)("header", ctx.editMode ? "Edit Rental Contract" : "Create Rental Contract")("modal", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayProperty"]("visible", ctx.displayModal);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("draggable", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formGroup", ctx.rentalcontractform);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](69, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("options", ctx.chooseContractOptions);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("minDate", ctx.MinDate)("maxDate", ctx.today)("showOnFocus", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("issueDate"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("title", "Location")("id", (tmp_25_0 = ctx.rentalcontractform.get("userLocationId")) == null ? null : tmp_25_0.value)("name", (tmp_26_0 = ctx.rentalcontractform.get("userLocationName")) == null ? null : tmp_26_0.value)("showId", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("voucherNumber"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ((tmp_29_0 = ctx.rentalcontractform.get("isVehicleContract")) == null ? null : tmp_29_0.value) == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ((tmp_30_0 = ctx.rentalcontractform.get("isVehicleContract")) == null ? null : tmp_30_0.value) == false);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("title", "Supplier")("title2", "Subledger")("id", ctx.showSerialNumber)("name", (tmp_34_0 = ctx.rentalcontractform.get("supplierName")) == null ? null : tmp_34_0.value)("chartOfAccountSubLedgerType", ctx.subLedgerType)("locationId", ctx.rentalcontractform.value.userLocationId);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("title", "CostCenter")("id", (tmp_38_0 = ctx.rentalcontractform.get("costCenterId")) == null ? null : tmp_38_0.value)("name", (tmp_39_0 = ctx.rentalcontractform.get("costCenterName")) == null ? null : tmp_39_0.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("title", "Project")("id", (tmp_41_0 = ctx.rentalcontractform.get("projectId")) == null ? null : tmp_41_0.value)("name", (tmp_42_0 = ctx.rentalcontractform.get("projectName")) == null ? null : tmp_42_0.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("maxDate", ctx.maxDate)("showOnFocus", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("startDate"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("showOnFocus", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("endDate"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("useGrouping", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("rate"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](70, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("options", ctx.rentalContractOptions);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("title", "Cluster Owner")("title2", "Employee")("id", (tmp_54_0 = ctx.rentalcontractform.get("employeeErpId")) == null ? null : tmp_54_0.value)("name", (tmp_55_0 = ctx.rentalcontractform.get("employeeName")) == null ? null : tmp_55_0.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("employeeCode"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("remarks"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("refundableSecurityDeposit"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("binary", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("outlined", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.editMode && !ctx.viewMode);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.editMode && !ctx.viewMode);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, primeng_button__WEBPACK_IMPORTED_MODULE_13__.ButtonDirective, primeng_button__WEBPACK_IMPORTED_MODULE_13__.Button, primeng_api__WEBPACK_IMPORTED_MODULE_11__.PrimeTemplate, primeng_dialog__WEBPACK_IMPORTED_MODULE_14__.Dialog, primeng_table__WEBPACK_IMPORTED_MODULE_15__.Table, primeng_table__WEBPACK_IMPORTED_MODULE_15__.SortableColumn, primeng_table__WEBPACK_IMPORTED_MODULE_15__.SortIcon, primeng_paginator__WEBPACK_IMPORTED_MODULE_16__.Paginator, primeng_dropdown__WEBPACK_IMPORTED_MODULE_17__.Dropdown, primeng_inputnumber__WEBPACK_IMPORTED_MODULE_18__.InputNumber, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatusGroup, primeng_toolbar__WEBPACK_IMPORTED_MODULE_19__.Toolbar, primeng_inputtext__WEBPACK_IMPORTED_MODULE_20__.InputText, primeng_calendar__WEBPACK_IMPORTED_MODULE_21__.Calendar, primeng_checkbox__WEBPACK_IMPORTED_MODULE_22__.Checkbox, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_23__.ConfirmDialog, primeng_toast__WEBPACK_IMPORTED_MODULE_24__.Toast, _shared_components_picker_picker_component__WEBPACK_IMPORTED_MODULE_5__.PickerComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlName, _angular_common__WEBPACK_IMPORTED_MODULE_12__.DatePipe],
    encapsulation: 2
  });
}

/***/ }),

/***/ 9855:
/*!*****************************************************************************************************************!*\
  !*** ./src/app/main/rental/vehicle management/rental-vehicle-attendance/rental-vehicle-attendance.component.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RentalVehicleAttendanceComponent: () => (/* binding */ RentalVehicleAttendanceComponent)
/* harmony export */ });
/* harmony import */ var _Users_muhammadhassankhan_Documents_devoclock_github_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 89475);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 61318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 77919);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _budget_shared_Dtos_restriction_dto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../budget/shared/Dtos/restriction-dto */ 97223);
/* harmony import */ var _shared_Utials_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/Utials/utils */ 2584);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _shared_services_rental_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/rental.service */ 9725);
/* harmony import */ var _budget_shared_services_restriction_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../budget/shared/services/restriction.service */ 92076);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/api */ 17780);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/button */ 49136);
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/dialog */ 16280);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/table */ 76676);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/paginator */ 43157);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/toolbar */ 31973);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/inputtext */ 48361);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/calendar */ 41314);
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ag-grid-angular */ 34733);
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primeng/confirmdialog */ 68160);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! primeng/toast */ 61225);
/* harmony import */ var _shared_components_picker_picker_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../shared/components/picker/picker.component */ 79023);






















const _c0 = () => ({
  width: "100%",
  "overflow-y": "auto"
});
const _c1 = () => ["issueDate", "voucherNumber", "userLocationName", "costCenterName"];
const _c2 = a0 => [5, 10, 20, a0];
const _c3 = () => ({
  width: "1500px"
});
function RentalVehicleAttendanceComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Rental Vehicle Attendance");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalVehicleAttendanceComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalVehicleAttendanceComponent_ng_template_2_Template_span_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.show());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "i", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "input", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("keydown.enter", function RentalVehicleAttendanceComponent_ng_template_2_Template_input_keydown_enter_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.onEnter($event));
    })("input", function RentalVehicleAttendanceComponent_ng_template_2_Template_input_input_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      const policyTable_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.onGlobalFilter(policyTable_r4, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}
function RentalVehicleAttendanceComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr")(1, "th", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, " Actions ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "p-sortIcon", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "th", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, " Voucher Number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "p-sortIcon", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "th", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, " Status ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](9, "p-sortIcon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "th", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, " Issue Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "p-sortIcon", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "th", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14, " Location Id ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](15, "p-sortIcon", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "th", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](17, " Location Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](18, "p-sortIcon", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "th", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](20, " CostCenter Id");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](21, "p-sortIcon", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "th", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](23, " CostCenter Name ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](24, "p-sortIcon", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}
function RentalVehicleAttendanceComponent_ng_template_7_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalVehicleAttendanceComponent_ng_template_7_span_2_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r5);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.viewOnly(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalVehicleAttendanceComponent_ng_template_7_span_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalVehicleAttendanceComponent_ng_template_7_span_3_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r7);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.edit(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalVehicleAttendanceComponent_ng_template_7_span_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalVehicleAttendanceComponent_ng_template_7_span_4_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.approve(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalVehicleAttendanceComponent_ng_template_7_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.status);
  }
}
function RentalVehicleAttendanceComponent_ng_template_7_span_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.status);
  }
}
function RentalVehicleAttendanceComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, RentalVehicleAttendanceComponent_ng_template_7_span_2_Template, 1, 0, "span", 52)(3, RentalVehicleAttendanceComponent_ng_template_7_span_3_Template, 1, 0, "span", 53)(4, RentalVehicleAttendanceComponent_ng_template_7_span_4_Template, 1, 0, "span", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, RentalVehicleAttendanceComponent_ng_template_7_span_8_Template, 2, 1, "span", 55)(9, RentalVehicleAttendanceComponent_ng_template_7_span_9_Template, 2, 1, "span", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](12, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status == "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status != "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status === "PENDING" || item_r6.status == "UNAPPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.voucherNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status == "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status != "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](12, 11, item_r6.issueDate));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.userLocationId);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.userLocationName);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.costCenterId);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.costCenterName);
  }
}
function RentalVehicleAttendanceComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalVehicleAttendanceComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalVehicleAttendanceComponent_p_button_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p-button", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalVehicleAttendanceComponent_p_button_36_Template_p_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r9);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.save());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("loading", ctx_r2.saving)("disabled", !ctx_r2.vehicleattendanceform.valid)("outlined", true);
  }
}
function RentalVehicleAttendanceComponent_p_button_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p-button", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalVehicleAttendanceComponent_p_button_37_Template_p_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r10);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.update());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("loading", ctx_r2.saving)("disabled", !ctx_r2.vehicleattendanceform.valid)("outlined", true);
  }
}
class RentalVehicleAttendanceComponent {
  constructor(fb, _rentalService, _restrictionService, msgService, confirmationService) {
    this.fb = fb;
    this._rentalService = _rentalService;
    this._restrictionService = _restrictionService;
    this.msgService = msgService;
    this.confirmationService = confirmationService;
    this.restrictionDto = new _budget_shared_Dtos_restriction_dto__WEBPACK_IMPORTED_MODULE_1__.RestrictionDto();
    this.target = "VehicleAttendance";
    this.currentPage = 1;
    this.skipCount = 0;
    this.maxCount = 5;
    this.showSupplierDetails = false;
    this.today = new Date();
    this.MinDate = new Date();
    this.dto = {
      DocOrVocNumber: ""
    };
    this.colDefs = [{
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      width: 90,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true
    }, {
      headerName: "Vehicle Id",
      editable: false,
      field: "vehicleId",
      resizable: true,
      width: 120,
      suppressSizeToFit: true
    }, {
      headerName: "Vehicle Title",
      editable: false,
      field: "vehicleName",
      resizable: true,
      width: 200,
      suppressSizeToFit: true
    },
    // {
    //   headerName: "Region Id",
    //   editable: false,
    //   field: "regionId",
    //   resizable: true,
    //   width: 120,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Region Title",
    //   editable: false,
    //   field: "regionName",
    //   resizable: true,
    //   width: 200,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Location Id",
    //   editable: false,
    //   field: "locationId",
    //   resizable: true,
    //   width: 120,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Location Title",
      editable: false,
      field: "locationName",
      resizable: true,
      width: 200,
      suppressSizeToFit: true
    }, {
      headerName: "CostCenter Title",
      editable: false,
      field: "costCenterName",
      resizable: true,
      width: 200,
      suppressSizeToFit: true
    }, {
      headerName: "Project Title",
      editable: false,
      field: "projectName",
      resizable: true,
      width: 200,
      suppressSizeToFit: true
    }, {
      headerName: "Contract V.No",
      editable: false,
      field: "contractVoucherNumber",
      resizable: true,
      width: 200,
      suppressSizeToFit: true
    }, {
      headerName: "Present",
      editable: true,
      field: "isPresent"
      // resizable: true,
      // checkboxSelection: true,
      // width: 150,
    }, {
      headerName: "Time In (00:00 AM/PM)",
      editable: true,
      field: "checkIn_Time",
      resizable: true,
      width: 200,
      suppressSizeToFit: true
      // valueFormatter: function (params) {
      //   const time = moment(params.value, ["HH:mm", moment.ISO_8601]);
      //   return time.isValid() ? time.format("hh:mm A") : params.value;
      // },
    }, {
      headerName: "Time Out (00:00 AM/PM)",
      editable: true,
      field: "checkOut_Time",
      resizable: true,
      width: 200,
      suppressSizeToFit: true
      // valueFormatter: function (params) {
      //   const time = moment(params.value, ["HH:mm", moment.ISO_8601]);
      //   return time.isValid() ? time.format("hh:mm A") : params.value;
      // },
    }, {
      headerName: "Vehicle Reading In",
      editable: true,
      field: "vehicleReadingIn",
      resizable: true,
      width: 200,
      suppressSizeToFit: true
    }, {
      headerName: "Vehicle Reading Out",
      editable: true,
      field: "vehicleReadingOut",
      resizable: true,
      width: 200,
      suppressSizeToFit: true
    }, {
      headerName: "Remarks",
      editable: true,
      field: "remarks",
      resizable: true,
      width: 200,
      suppressSizeToFit: true
    }];
    this.vehicleattendanceform = this.fb.group({
      issueDate: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required],
      voucherNumber: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required],
      costCenterId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required],
      costCenterName: [""],
      userLocationId: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]],
      userLocationName: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]],
      vehicleAttendanceDetails: [[]]
    });
  }
  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("RVA");
  }
  setPickerValue(value, title) {
    switch (title) {
      case "Location":
        debugger;
        this.vehicleattendanceform.patchValue({
          userLocationId: value?.id,
          userLocationName: value.name
        });
        this.getVoucherNumber("RVA", this.vehicleattendanceform.value?.issueDate, value?.id);
        break;
      case "CostCenter":
        this.vehicleattendanceform.patchValue({
          costCenterId: +value.id,
          costCenterName: value.name
        });
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  getAll(skipCount = this.skipCount, maxCount = this.maxCount) {
    this._rentalService.getAll(this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;
      }
    });
  }
  show(id) {
    if (id) {
      this._rentalService.getDataForEdit(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
        debugger;
        this.msgService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
      })).subscribe({
        next: response => {
          debugger;
          this.dataForEdit = response;
          this.vehicleattendanceform.get("voucherNumber").setValue(this.dataForEdit.voucherNumber);
          this.vehicleattendanceform.get("issueDate").setValue(new Date(this.dataForEdit.issueDate));
          this.vehicleattendanceform.get("userLocationId")?.setValue(this.dataForEdit.userLocationId);
          this.vehicleattendanceform.get("userLocationName")?.setValue(this.dataForEdit.userLocationName);
          this.vehicleattendanceform.get("costCenterId").setValue(this.dataForEdit.costCenterId);
          this.vehicleattendanceform.get("costCenterName").setValue(this.dataForEdit.costCenterName);
          this.rowData = this.dataForEdit.vehicleAttendanceDetails;
          this.displayModal = true;
        }
      });
    } else {
      if (!this.restrictionDto.isCreationAllowed) {
        this.msgService.add({
          severity: "info",
          summary: "Info",
          detail: "Creation Restricted"
        });
        return;
      }
      this.getDefaultLocation("Location", "locationName", "locationId", "");
      this.editMode = false;
      this.viewMode = false;
      this.vehicleattendanceform.enable();
      this.rowData = [];
      this.displayModal = true;
      this.vehicleattendanceform.reset();
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.vehicleattendanceform.get("issueDate").setValue(this.today);
      // this.vehicleattendanceform.get("isActive").setValue(true);
    }
  }
  save() {
    debugger;
    this.saving = true;
    if (!this.vehicleattendanceform.valid) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all Required fields",
        life: 2000
      });
      this.saving = false;
      return;
    }
    this.vehicleattendanceform.patchValue({
      vehicleAttendanceDetails: this.rowData
    });
    this._rentalService.create(this.vehicleattendanceform.value, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {
      this.saving = false;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.msgService.add({
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
  update() {
    this.saving = true;
    this.vehicleattendanceform.patchValue({
      vehicleAttendanceDetails: this.rowData
    });
    const updateData = {
      ...this.vehicleattendanceform.value,
      id: this.dataForEdit.id
    };
    this._rentalService.update(updateData, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {
      this.saving = false;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.msgService.add({
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
  delete(id) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._rentalService.delete(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
          debugger;
          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000
          });
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
        })).subscribe({
          next: response => {
            debugger;
            if (response) {
              this.msgService.add({
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
  isFieldInvalid(field) {
    const control = this.vehicleattendanceform.get(field);
    return control ? control.invalid && control.touched : false;
  }
  onDateChange(value) {
    debugger;
    if (value) {
      this.vehicleattendanceform.value.issueDate = value;
    }
    if (this.vehicleattendanceform.value.userLocationId && this.vehicleattendanceform.value.issueDate) {
      this.getVoucherNumber("RVA", this.vehicleattendanceform.value.issueDate, this.vehicleattendanceform.value.userLocationId);
    }
  }
  getDefaultLocation(target, name, id, filterId) {
    var _this = this;
    return (0,_Users_muhammadhassankhan_Documents_devoclock_github_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this._rentalService.getDefaultLocation(target, filterId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
        _this.msgService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
      })).subscribe({
        next: response => {
          debugger;
          _this.vehicleattendanceform.get("userLocationName").setValue(response.items[0].shortName);
          _this.vehicleattendanceform.get("userLocationId").setValue(response.items[0].id);
          _this.getVoucherNumber("RVA", _this.vehicleattendanceform.value.issueDate, _this.vehicleattendanceform.value.userLocationId);
        }
      });
    })();
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = [];
    this.rowSelection = "multiple";
  }
  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const dataToRemove = selectedNodes.map(node => node.data);
      this.gridApi.applyTransaction({
        remove: dataToRemove
      });
      this.rowData = this.rowData.filter(row => !dataToRemove.includes(row));
      this.rowCount = this.gridApi.getDisplayedRowCount();
    }
  }
  cellValueChanged(params) {}
  copyMachines(attendanceDate, userLocationId, costCenterID) {
    debugger;
    this._rentalService.GetAvailableVehicles(attendanceDate, userLocationId, costCenterID, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.rowData = response;
      },
      error: err => {
        console.log("An error occurred", err);
      }
    });
  }
  getVoucherNumber(prefix, issueDate, userLocationId) {
    debugger;
    this._rentalService.getVoucherNumber(prefix, issueDate, userLocationId, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.vehicleattendanceform.get("voucherNumber").setValue(response);
      },
      error: err => {
        console.log("An error occurred", err);
      }
    });
  }
  onGlobalFilter(table, event) {
    table.filterGlobal(event.target.value, "contains");
  }
  onPageChange(event) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * 5;
    this._rentalService.getAll(this.target, this.skipCount, this.maxCount).subscribe({
      next: response => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;
        this.loading = false;
      }
    });
  }
  approve(id) {
    if (!this.restrictionDto.isApprovalAllowed) {
      this.msgService.add({
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
        this._rentalService.Approve(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
          debugger;
          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000
          });
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
        })).subscribe({
          next: response => {
            debugger;
            if (response) {
              this.msgService.add({
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
  edit(id) {
    if (!this.restrictionDto.isEditAllowed) {
      this.msgService.add({
        severity: "info",
        summary: "Info",
        detail: "Edit Restricted"
      });
      return;
    }
    this.editMode = true;
    this.viewMode = false;
    this.show(id);
    this.vehicleattendanceform.enable();
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }
  viewOnly(id) {
    this.viewMode = true;
    this.editMode = false;
    this.show(id);
    this.vehicleattendanceform.disable();
    this.MinDate = null;
  }
  onEnter(event) {
    const inputValue = event.target.value;
    this.loading = true;
    debugger;
    this.dto.DocOrVocNumber = inputValue;
    debugger;
    this._rentalService.getAllRecord(this.target, this.dto).subscribe({
      next: response => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;
        this.loading = false;
      }
    });
  }
  VoucherRestriction(prefix) {
    this._restrictionService.getVoucherRestriction(prefix).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        console.log(response);
        debugger;
        this.restrictionDto = (0,_shared_Utials_utils__WEBPACK_IMPORTED_MODULE_2__.mapRestrictionDto)(response.items[0]);
        console.log(this.restrictionDto);
      }
    });
  }
  static #_ = this.ɵfac = function RentalVehicleAttendanceComponent_Factory(t) {
    return new (t || RentalVehicleAttendanceComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_shared_services_rental_service__WEBPACK_IMPORTED_MODULE_3__.RentalService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_budget_shared_services_restriction_service__WEBPACK_IMPORTED_MODULE_4__.RestrictionService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_11__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_11__.ConfirmationService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: RentalVehicleAttendanceComponent,
    selectors: [["app-rental-vehicle-attendance"]],
    decls: 41,
    vars: 47,
    consts: [["policyTable", ""], ["styleClass", "mb-4"], ["pTemplate", "left"], ["pTemplate", "right"], [1, "card", "p-4"], ["styleClass", "p-datatable-gridlines", "scrollHeight", "58vh", "responsiveLayout", "scroll", "dataKey", "id", "responsiveLayout", "scroll", 3, "value", "loading", "scrollable", "rowHover", "paginatorDropdownAppendTo", "globalFilterFields"], ["pTemplate", "header"], ["pTemplate", "body"], ["currentPageReportTemplate", "Showing {first} to {last} of {totalRecords} entries", 3, "onPageChange", "rows", "totalRecords", "showCurrentPageReport", "rowsPerPageOptions"], [3, "visibleChange", "maximizable", "closeOnEscape", "header", "modal", "visible", "draggable"], [3, "ngSubmit", "formGroup"], [1, "row", "col-md-12", "mt-4"], ["id", "inputField", 1, "col-md-4", "flex", "flex-column"], ["for", "name"], ["formControlName", "issueDate", "inputId", "date", "appendTo", "body", "tabindex", "1", "name", "issueDate", 3, "ngModelChange", "minDate", "maxDate", "showOnFocus"], ["class", "text-danger", 4, "ngIf"], [1, "col-md-4"], [3, "valueSelected", "title", "id", "name", "showId"], ["type", "text", "pInputText", "", "formControlName", "voucherNumber", "id", "voucherNumber", "autocomplete", "off", "readonly", "", 2, "position", "relative", "z-index", "1000"], [1, "row", "col-md-12"], [1, "col-md-8"], [3, "valueSelected", "title", "id", "name"], [1, "my-auto"], ["label", "Copy Machines", "severity", "success", 3, "click", "text", "raised"], ["label", "Remove Row", "size", "small", "severity", "danger", 2, "padding", "0.25rem 0.5rem", "font-size", "0.75rem", "height", "auto", "line-height", "1.25", 3, "click"], [1, "ag-theme-quartz", 2, "height", "500px", 3, "gridReady", "cellValueChanged", "rowData", "columnDefs", "rowSelection", "singleClickEdit"], [1, "flex", "gap-1", "justify-content-end", "mt-4"], ["label", "Cancel", "severity", "warning", 3, "onClick", "outlined"], ["label", "Save", "severity", "contrast", 3, "loading", "disabled", "outlined", "click", 4, "ngIf"], ["label", "Update", "severity", "contrast", 3, "loading", "disabled", "outlined", "click", 4, "ngIf"], [1, "p-toolbar-group-left"], [1, "p-toolbar-separator", 2, "margin-right", "10px"], ["pButton", "", "icon", "pi pi-plus-circle", 1, "p-button-success", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], [1, "block", "md:mt-0", "p-input-icon-left"], [1, "pi", "pi-search"], ["pInputText", "", "type", "text", "placeholder", "Search...", 2, "height", "25px", "cursor", "pointer", 3, "keydown.enter", "input"], ["pSortableColumn", "Actions", 2, "min-width", "200px"], ["field", "Actions"], ["pSortableColumn", "voucherNumber", 2, "min-width", "250px"], ["field", "voucherNumber"], ["pSortableColumn", "status", 2, "min-width", "200px"], ["field", "status"], ["pSortableColumn", "issueDate", 2, "min-width", "200px"], ["field", "issueDate"], ["pSortableColumn", "locationId", 2, "min-width", "200px"], ["field", "locationId"], ["pSortableColumn", "locationName", 2, "min-width", "200px"], ["field", "locationName"], ["pSortableColumn", "costCenterId", 2, "min-width", "200px"], ["field", "costCenterId"], ["pSortableColumn", "costCenterName", 2, "min-width", "200px"], ["field", "costCenterName"], ["style", "height: 25px; width: 25px; cursor: pointer", "pButton", "", "pRipple", "", "icon", "pi pi-eye", "class", "p-button-rounded p-button-info mr-2", 3, "click", 4, "ngIf"], ["style", "height: 25px; width: 25px; cursor: pointer", "pButton", "", "pRipple", "", "icon", "pi pi-pencil", "class", "p-button-rounded p-button-info mr-2", 3, "click", 4, "ngIf"], ["pButton", "", "pRipple", "", "icon", "pi pi-check", "style", "height: 25px; width: 25px; cursor: pointer", "class", "p-button-rounded p-button-success mr-2", 3, "click", 4, "ngIf"], ["class", "yes-bg", 4, "ngIf"], ["class", "no-bg", 4, "ngIf"], ["pButton", "", "pRipple", "", "icon", "pi pi-eye", 1, "p-button-rounded", "p-button-info", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], ["pButton", "", "pRipple", "", "icon", "pi pi-pencil", 1, "p-button-rounded", "p-button-info", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], ["pButton", "", "pRipple", "", "icon", "pi pi-check", 1, "p-button-rounded", "p-button-success", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], [1, "yes-bg"], [1, "no-bg"], [1, "text-danger"], ["label", "Save", "severity", "contrast", 3, "click", "loading", "disabled", "outlined"], ["label", "Update", "severity", "contrast", 3, "click", "loading", "disabled", "outlined"]],
    template: function RentalVehicleAttendanceComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p-toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, RentalVehicleAttendanceComponent_ng_template_1_Template, 2, 0, "ng-template", 2)(2, RentalVehicleAttendanceComponent_ng_template_2_Template, 6, 0, "ng-template", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 4)(4, "p-table", 5, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, RentalVehicleAttendanceComponent_ng_template_6_Template, 25, 0, "ng-template", 6)(7, RentalVehicleAttendanceComponent_ng_template_7_Template, 21, 13, "ng-template", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "p-paginator", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onPageChange", function RentalVehicleAttendanceComponent_Template_p_paginator_onPageChange_8_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.onPageChange($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "p-dialog", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayListener"]("visibleChange", function RentalVehicleAttendanceComponent_Template_p_dialog_visibleChange_9_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayBindingSet"](ctx.displayModal, $event) || (ctx.displayModal = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "form", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngSubmit", function RentalVehicleAttendanceComponent_Template_form_ngSubmit_11_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.save());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "div", 11)(13, "div", 12)(14, "label", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](15, "Date:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "p-calendar", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RentalVehicleAttendanceComponent_Template_p_calendar_ngModelChange_16_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.onDateChange($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](17, RentalVehicleAttendanceComponent_div_17_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "div", 16)(19, "app-picker", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("valueSelected", function RentalVehicleAttendanceComponent_Template_app_picker_valueSelected_19_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.setPickerValue($event, "Location"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "div", 12)(21, "label", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](22, "Voucher Number:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](23, "input", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](24, RentalVehicleAttendanceComponent_div_24_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](25, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](26, "div", 19)(27, "div", 20)(28, "app-picker", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("valueSelected", function RentalVehicleAttendanceComponent_Template_app_picker_valueSelected_28_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.setPickerValue($event, "CostCenter"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](29, "div", 22)(30, "p-button", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalVehicleAttendanceComponent_Template_p_button_click_30_listener() {
          let tmp_2_0;
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.copyMachines(ctx.vehicleattendanceform.get("issueDate").value, (tmp_2_0 = ctx.vehicleattendanceform.get("userLocationId")) == null ? null : tmp_2_0.value, (tmp_2_0 = ctx.vehicleattendanceform.get("costCenterId")) == null ? null : tmp_2_0.value));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](31, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](32, "p-button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalVehicleAttendanceComponent_Template_p_button_click_32_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.onRemoveSelected());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](33, "ag-grid-angular", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("gridReady", function RentalVehicleAttendanceComponent_Template_ag_grid_angular_gridReady_33_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.onGridReady($event));
        })("cellValueChanged", function RentalVehicleAttendanceComponent_Template_ag_grid_angular_cellValueChanged_33_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.cellValueChanged($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](34, "div", 26)(35, "p-button", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onClick", function RentalVehicleAttendanceComponent_Template_p_button_onClick_35_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.displayModal = false);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](36, RentalVehicleAttendanceComponent_p_button_36_Template, 1, 3, "p-button", 28)(37, RentalVehicleAttendanceComponent_p_button_37_Template, 1, 3, "p-button", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](38, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](39, "p-toast")(40, "p-confirmDialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        let tmp_25_0;
        let tmp_26_0;
        let tmp_30_0;
        let tmp_31_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](42, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", ctx.tableData)("loading", ctx.loading)("scrollable", true)("rowHover", true)("paginatorDropdownAppendTo", "body")("globalFilterFields", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](43, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("rows", 5)("totalRecords", ctx.count)("showCurrentPageReport", true)("rowsPerPageOptions", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](44, _c2, ctx.count));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](46, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("maximizable", true)("closeOnEscape", false)("header", ctx.editMode ? "Edit Rental Vehicle Attendance" : "Create Rental Vehicle Attendance")("modal", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayProperty"]("visible", ctx.displayModal);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("draggable", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formGroup", ctx.vehicleattendanceform);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("minDate", ctx.MinDate)("maxDate", ctx.today)("showOnFocus", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("issueDate"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("title", "Location")("id", (tmp_25_0 = ctx.vehicleattendanceform.get("userLocationId")) == null ? null : tmp_25_0.value)("name", (tmp_26_0 = ctx.vehicleattendanceform.get("userLocationName")) == null ? null : tmp_26_0.value)("showId", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("voucherNumber"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("title", "CostCenter")("id", (tmp_30_0 = ctx.vehicleattendanceform.get("costCenterId")) == null ? null : tmp_30_0.value)("name", (tmp_31_0 = ctx.vehicleattendanceform.get("costCenterName")) == null ? null : tmp_31_0.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("text", true)("raised", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("rowData", ctx.rowData)("columnDefs", ctx.colDefs)("rowSelection", ctx.rowSelection)("singleClickEdit", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("outlined", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.editMode && !ctx.viewMode);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.editMode && !ctx.viewMode);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, primeng_button__WEBPACK_IMPORTED_MODULE_13__.ButtonDirective, primeng_button__WEBPACK_IMPORTED_MODULE_13__.Button, primeng_api__WEBPACK_IMPORTED_MODULE_11__.PrimeTemplate, primeng_dialog__WEBPACK_IMPORTED_MODULE_14__.Dialog, primeng_table__WEBPACK_IMPORTED_MODULE_15__.Table, primeng_table__WEBPACK_IMPORTED_MODULE_15__.SortableColumn, primeng_table__WEBPACK_IMPORTED_MODULE_15__.SortIcon, primeng_paginator__WEBPACK_IMPORTED_MODULE_16__.Paginator, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatusGroup, primeng_toolbar__WEBPACK_IMPORTED_MODULE_17__.Toolbar, primeng_inputtext__WEBPACK_IMPORTED_MODULE_18__.InputText, primeng_calendar__WEBPACK_IMPORTED_MODULE_19__.Calendar, ag_grid_angular__WEBPACK_IMPORTED_MODULE_20__.AgGridAngular, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_21__.ConfirmDialog, primeng_toast__WEBPACK_IMPORTED_MODULE_22__.Toast, _shared_components_picker_picker_component__WEBPACK_IMPORTED_MODULE_5__.PickerComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlName, _angular_common__WEBPACK_IMPORTED_MODULE_12__.DatePipe],
    encapsulation: 2
  });
}

/***/ }),

/***/ 94327:
/*!***********************************************************************************************************!*\
  !*** ./src/app/main/rental/vehicle management/rental-vehicle-invoice/rental-vehicle-invoice.component.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RentalVehicleInvoiceComponent: () => (/* binding */ RentalVehicleInvoiceComponent)
/* harmony export */ });
/* harmony import */ var _Users_muhammadhassankhan_Documents_devoclock_github_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 89475);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 61318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 77919);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _budget_shared_Dtos_restriction_dto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../budget/shared/Dtos/restriction-dto */ 97223);
/* harmony import */ var _shared_Utials_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/Utials/utils */ 2584);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _shared_services_rental_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/rental.service */ 9725);
/* harmony import */ var _budget_shared_services_restriction_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../budget/shared/services/restriction.service */ 92076);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/api */ 17780);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/button */ 49136);
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/dialog */ 16280);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/table */ 76676);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/paginator */ 43157);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/toolbar */ 31973);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/inputtext */ 48361);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/calendar */ 41314);
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ag-grid-angular */ 34733);
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primeng/confirmdialog */ 68160);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! primeng/toast */ 61225);
/* harmony import */ var _shared_components_picker_picker_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../shared/components/picker/picker.component */ 79023);






















const _c0 = () => ({
  width: "100%",
  "overflow-y": "auto"
});
const _c1 = () => ["issueDate", "attendanceMonth", "remarks", "voucherNumber", "userLocationName", "costCenterName", "status"];
const _c2 = a0 => [5, 10, 20, a0];
const _c3 = () => ({
  width: "1500px"
});
function RentalVehicleInvoiceComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Rental Vehicle Invoice");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalVehicleInvoiceComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalVehicleInvoiceComponent_ng_template_2_Template_span_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.show());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "i", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "input", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("keydown.enter", function RentalVehicleInvoiceComponent_ng_template_2_Template_input_keydown_enter_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.onEnter($event));
    })("input", function RentalVehicleInvoiceComponent_ng_template_2_Template_input_input_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      const policyTable_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.onGlobalFilter(policyTable_r4, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}
function RentalVehicleInvoiceComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr")(1, "th", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, " Actions ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "p-sortIcon", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "th", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, " Voucher Number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "p-sortIcon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "th", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, " Attendance Month");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](9, "p-sortIcon", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "th", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, " Issue Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "p-sortIcon", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "th", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14, " Location Id ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](15, "p-sortIcon", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "th", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](17, " Location Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](18, "p-sortIcon", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "th", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](20, " Remarks");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](21, "p-sortIcon", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "th", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](23, " Status ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](24, "p-sortIcon", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}
function RentalVehicleInvoiceComponent_ng_template_7_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalVehicleInvoiceComponent_ng_template_7_span_2_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r5);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.edit(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalVehicleInvoiceComponent_ng_template_7_span_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalVehicleInvoiceComponent_ng_template_7_span_3_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r7);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.viewOnly(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalVehicleInvoiceComponent_ng_template_7_span_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalVehicleInvoiceComponent_ng_template_7_span_4_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.delete(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalVehicleInvoiceComponent_ng_template_7_span_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalVehicleInvoiceComponent_ng_template_7_span_5_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r9);
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.approve(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalVehicleInvoiceComponent_ng_template_7_span_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.status);
  }
}
function RentalVehicleInvoiceComponent_ng_template_7_span_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.status);
  }
}
function RentalVehicleInvoiceComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, RentalVehicleInvoiceComponent_ng_template_7_span_2_Template, 1, 0, "span", 55)(3, RentalVehicleInvoiceComponent_ng_template_7_span_3_Template, 1, 0, "span", 56)(4, RentalVehicleInvoiceComponent_ng_template_7_span_4_Template, 1, 0, "span", 57)(5, RentalVehicleInvoiceComponent_ng_template_7_span_5_Template, 1, 0, "span", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](10, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](13, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](21, RentalVehicleInvoiceComponent_ng_template_7_span_21_Template, 2, 1, "span", 59)(22, RentalVehicleInvoiceComponent_ng_template_7_span_22_Template, 2, 1, "span", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status !== "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status !== "APPROVED" || item_r6.status == "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status !== "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status === "PENDING" || item_r6.status == "UNAPPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.voucherNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](10, 12, item_r6.attendanceMonth));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](13, 14, item_r6.issueDate));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.userLocationId);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.userLocationName);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.remarks);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status == "APPROVED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r6.status != "APPROVED");
  }
}
function RentalVehicleInvoiceComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalVehicleInvoiceComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalVehicleInvoiceComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RentalVehicleInvoiceComponent_p_button_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p-button", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalVehicleInvoiceComponent_p_button_48_Template_p_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r10);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.save());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("loading", ctx_r2.saving)("disabled", !ctx_r2.vehicleattendanceform.valid)("outlined", true);
  }
}
function RentalVehicleInvoiceComponent_p_button_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p-button", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalVehicleInvoiceComponent_p_button_49_Template_p_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r11);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r2.update());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("loading", ctx_r2.saving)("disabled", !ctx_r2.vehicleattendanceform.valid)("outlined", true);
  }
}
class RentalVehicleInvoiceComponent {
  constructor(fb, _rentalService, _restrictionService, msgService, confirmationService) {
    this.fb = fb;
    this._rentalService = _rentalService;
    this._restrictionService = _restrictionService;
    this.msgService = msgService;
    this.confirmationService = confirmationService;
    this.restrictionDto = new _budget_shared_Dtos_restriction_dto__WEBPACK_IMPORTED_MODULE_1__.RestrictionDto();
    this.target = "VehicleInvoice";
    this.currentPage = 1;
    this.skipCount = 0;
    this.maxCount = 5;
    this.today = new Date();
    this.MinDate = new Date();
    this.dto = {
      DocOrVocNumber: ""
    };
    this.showSupplierDetails = false;
    this.minDate = new Date();
    this.colDefs = [{
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      width: 90,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true
    }, {
      headerName: "Vehicle Id",
      editable: false,
      field: "vehicleId",
      resizable: true,
      width: 120,
      suppressSizeToFit: true
    }, {
      headerName: "Vehicle Title",
      editable: false,
      field: "vehicleName",
      resizable: true,
      width: 200,
      suppressSizeToFit: true
    }, {
      headerName: "Supplier Id",
      editable: false,
      field: "supplierSerialNumber",
      resizable: true,
      width: 200,
      suppressSizeToFit: true
    }, {
      headerName: "Supplier Title",
      editable: false,
      field: "supplierName",
      resizable: true,
      width: 350,
      suppressSizeToFit: true
    },
    // {
    //   headerName: "Location Id",
    //   editable: false,
    //   field: "locationId",
    //   resizable: true,
    //   width: 150,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Location Title",
      editable: false,
      field: "locationName",
      resizable: true,
      width: 300,
      suppressSizeToFit: true
    },
    // {
    //   headerName: "CostCenter Id",
    //   editable: false,
    //   field: "costCenterId",
    //   resizable: true,
    //   width: 150,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "CostCenter Title",
      editable: false,
      field: "costCenterName",
      resizable: true,
      width: 250,
      suppressSizeToFit: true
    },
    // {
    //   headerName: "Project Id",
    //   editable: false,
    //   field: "projectId",
    //   resizable: true,
    //   width: 150,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Project Title",
      editable: false,
      field: "projectName",
      resizable: true,
      width: 250,
      suppressSizeToFit: true
    },
    // {
    //   headerName: "Region Id",
    //   editable: false,
    //   field: "regionId",
    //   resizable: true,
    //   width: 180,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Region Title",
    //   editable: false,
    //   field: "regionName",
    //   resizable: true,
    //   width: 200,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "CostCenter Id",
    //   editable: false,
    //   field: "costCenterId",
    //   resizable: true,
    //   width: 180,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "CostCenter Title",
    //   editable: false,
    //   field: "costCenterName",
    //   resizable: true,
    //   width: 180,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Project Id",
    //   editable: false,
    //   field: "projectId",
    //   width: 200,
    // },
    // {
    //   headerName: "Project Title",
    //   editable: false,
    //   field: "projectName",
    //   width: 200,
    // },
    {
      headerName: "Contract Type",
      editable: false,
      field: "rentalContractTypeTitle",
      resizable: true,
      width: 200,
      suppressSizeToFit: true
    }, {
      headerName: "Contract Voucher No",
      editable: false,
      field: "contractVoucherNumber",
      resizable: true,
      width: 250,
      suppressSizeToFit: true
    },
    // {
    //   headerName: "Supplier Id",
    //   editable: false,
    //   field: "supplierId",
    //   resizable: true,
    //   width: 180,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Supplier Title",
    //   editable: false,
    //   field: "supplierName",
    //   resizable: true,
    //   width: 180,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Rental Contract Id",
      editable: false,
      field: "rentalContractId",
      resizable: true,
      width: 180,
      suppressSizeToFit: true
    }, {
      headerName: "Days",
      editable: false,
      field: "attendanceDays",
      resizable: true,
      width: 150,
      suppressSizeToFit: true
    }, {
      headerName: "Rate",
      editable: false,
      field: "rate",
      resizable: true,
      width: 250,
      suppressSizeToFit: true
    }, {
      headerName: "Total",
      editable: false,
      field: "total",
      resizable: true,
      width: 250,
      suppressSizeToFit: true
    }];
    this.vehicleattendanceform = this.fb.group({
      issueDate: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required],
      voucherNumber: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required],
      attendanceMonth: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required],
      userLocationId: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]],
      userLocationName: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]],
      remarks: [""],
      totalAmount: [{
        value: "",
        disabled: true
      }],
      indexes: [[]]
    });
  }
  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("RVI");
  }
  setPickerValue(value, title) {
    switch (title) {
      case "Location":
        debugger;
        this.vehicleattendanceform.patchValue({
          userLocationId: value?.id,
          userLocationName: value.name
        });
        this.employeeErpId = value.id;
        this.GetDocMaxCount("VehicleInvoice");
        break;
      case "CostCenter":
        this.vehicleattendanceform.patchValue({
          costCenterId: +value.id,
          costCenterName: value.name
        });
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  getAll(skipCount = this.skipCount, maxCount = this.maxCount) {
    this._rentalService.getAll(this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;
      }
    });
  }
  show(id) {
    if (id) {
      this._rentalService.getDataForEdit(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
        debugger;
        this.msgService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
      })).subscribe({
        next: response => {
          debugger;
          this.dataForEdit = response;
          this.vehicleattendanceform.get("attendanceMonth")?.setValue(new Date(this.dataForEdit.attendanceMonth));
          this.vehicleattendanceform.get("userLocationId")?.setValue(this.dataForEdit.userLocationId);
          this.vehicleattendanceform.get("userLocationName")?.setValue(this.dataForEdit.userLocationName);
          this.vehicleattendanceform.get("issueDate")?.setValue(new Date(this.dataForEdit.issueDate));
          this.vehicleattendanceform.get("voucherNumber").setValue(this.dataForEdit.voucherNumber);
          this.vehicleattendanceform.get("remarks").setValue(this.dataForEdit.remarks);
          this.rowData = this.dataForEdit.vehicleInvoiceDetails;
          this.calculateTotalAmount();
          this.displayModal = true;
        }
      });
    } else {
      if (!this.restrictionDto.isCreationAllowed) {
        this.msgService.add({
          severity: "info",
          summary: "Info",
          detail: "Creation Restricted"
        });
        return;
      }
      debugger;
      this.getDefaultLocation("Location", "userLocationName", "userLocationId", "");
      this.editMode = false;
      this.viewMode = false;
      this.rowData = [];
      this.displayModal = true;
      this.vehicleattendanceform.reset();
      this.vehicleattendanceform.enable();
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.vehicleattendanceform.get("isActive")?.setValue(true);
      this.vehicleattendanceform.get("issueDate").setValue(this.today);
    }
  }
  save() {
    debugger;
    this.saving = true;
    if (!this.vehicleattendanceform.valid) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all Required fields",
        life: 2000
      });
      this.saving = false;
      return;
    }
    const indexes = this.rowData.map(row => row.index);
    const formData = {
      ...this.vehicleattendanceform.value,
      indexes
    };
    delete formData.totalAmount;
    this._rentalService.create(formData, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {
      this.saving = false;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.msgService.add({
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
  update() {
    this.saving = true;
    const indexes = this.rowData.map(row => row.index);
    const updateData = {
      ...this.vehicleattendanceform.value,
      id: this.dataForEdit.id,
      indexes
    };
    this._rentalService.update(updateData, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {
      this.saving = false;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.msgService.add({
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
  delete(id) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._rentalService.delete(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
          debugger;
          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000
          });
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
        })).subscribe({
          next: response => {
            debugger;
            if (response) {
              this.msgService.add({
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
  isFieldInvalid(field) {
    const control = this.vehicleattendanceform.get(field);
    return control ? control.invalid && control.touched : false;
  }
  onDateChange(value) {
    debugger;
    if (value) {
      this.vehicleattendanceform.value.issueDate = value;
    }
    if (this.vehicleattendanceform.value.userLocationId && this.vehicleattendanceform.value.issueDate) {
      this.GetDocMaxCount("VehicleInvoice");
    }
  }
  MakeVoucher() {
    debugger;
    if (this.vehicleattendanceform.value.userLocationId && this.documentNumber) {
      const voucherNumber = "RVI-HNL" + "-" + this.vehicleattendanceform.value.userLocationId + "-" + this.vehicleattendanceform.value.issueDate.getFullYear() + "-" + (this.vehicleattendanceform.value.issueDate.getMonth() + 1) + "-" + this.documentNumber;
      this.vehicleattendanceform.get("voucherNumber").setValue(voucherNumber);
    } else {
      this.GetDocMaxCount("VehicleInvoice");
    }
  }
  getDefaultLocation(target, name, id, filterId) {
    var _this = this;
    return (0,_Users_muhammadhassankhan_Documents_devoclock_github_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this._rentalService.getDefaultLocation(target, filterId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
        _this.msgService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
      })).subscribe({
        next: response => {
          debugger;
          _this.vehicleattendanceform.get("userLocationName").setValue(response.items[0].name);
          _this.vehicleattendanceform.get("userLocationId").setValue(response.items[0].id);
          _this.GetDocMaxCount("VehicleInvoice");
        }
      });
    })();
  }
  GetDocMaxCount(target) {
    debugger;
    if (this.vehicleattendanceform.value.userLocationId && this.vehicleattendanceform.value.issueDate) {
      this._rentalService.GetDocMaxCount(target, this.vehicleattendanceform.value.userLocationId, this.vehicleattendanceform.value.issueDate).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
        this.msgService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
      })).subscribe({
        next: response => {
          debugger;
          this.documentNumber = response;
          this.MakeVoucher();
        }
      });
    }
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = [];
    this.rowSelection = "multiple";
  }
  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const dataToRemove = selectedNodes.map(node => node.data);
      this.gridApi.applyTransaction({
        remove: dataToRemove
      });
      this.rowData = this.rowData.filter(row => !dataToRemove.includes(row));
      this.rowCount = this.gridApi.getDisplayedRowCount();
    }
    this.calculateTotalAmount();
  }
  copyVehiclesAttendance(attendanceDate) {
    debugger;
    this._rentalService.GetVehiclesAttendance(attendanceDate, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.rowData = response;
        this.calculateTotalAmount();
      },
      error: err => {
        console.log("An error occurred", err);
      }
    });
  }
  edit(id) {
    if (!this.restrictionDto.isEditAllowed) {
      this.msgService.add({
        severity: "info",
        summary: "Info",
        detail: "Edit Restricted"
      });
      return;
    }
    this.editMode = true;
    this.viewMode = false;
    this.show(id);
    this.vehicleattendanceform.enable();
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }
  viewOnly(id) {
    this.viewMode = true;
    this.editMode = false;
    this.show(id);
    this.vehicleattendanceform.disable();
    this.MinDate = null;
  }
  approve(id) {
    if (!this.restrictionDto.isApprovalAllowed) {
      this.msgService.add({
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
        this._rentalService.Approve(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
          debugger;
          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000
          });
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
        })).subscribe({
          next: response => {
            debugger;
            if (response) {
              this.msgService.add({
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
  calculateTotalAmount() {
    let total = 0;
    this.rowData.forEach(node => {
      debugger;
      if (node.total) {
        total += +node.total;
      }
    });
    this.vehicleattendanceform.get("totalAmount").setValue(total);
  }
  onGlobalFilter(table, event) {
    table.filterGlobal(event.target.value, "contains");
  }
  onPageChange(event) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * 5;
    this._rentalService.getAll(this.target, this.skipCount, this.maxCount).subscribe({
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
    this.dto.DocOrVocNumber = inputValue;
    debugger;
    this._rentalService.getAllRecord(this.target, this.dto).subscribe({
      next: response => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;
        this.loading = false;
      }
    });
  }
  VoucherRestriction(prefix) {
    this._restrictionService.getVoucherRestriction(prefix).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        console.log(response);
        debugger;
        this.restrictionDto = (0,_shared_Utials_utils__WEBPACK_IMPORTED_MODULE_2__.mapRestrictionDto)(response.items[0]);
        console.log(this.restrictionDto);
      }
    });
  }
  static #_ = this.ɵfac = function RentalVehicleInvoiceComponent_Factory(t) {
    return new (t || RentalVehicleInvoiceComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_shared_services_rental_service__WEBPACK_IMPORTED_MODULE_3__.RentalService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_budget_shared_services_restriction_service__WEBPACK_IMPORTED_MODULE_4__.RestrictionService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_11__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_11__.ConfirmationService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: RentalVehicleInvoiceComponent,
    selectors: [["app-rental-vehicle-invoice"]],
    decls: 53,
    vars: 46,
    consts: [["policyTable", ""], ["styleClass", "mb-4"], ["pTemplate", "left"], ["pTemplate", "right"], [1, "card", "p-4"], ["styleClass", "p-datatable-gridlines", "scrollHeight", "58vh", "responsiveLayout", "scroll", "dataKey", "id", "responsiveLayout", "scroll", 3, "value", "scrollable", "rowHover", "paginatorDropdownAppendTo", "globalFilterFields"], ["pTemplate", "header"], ["pTemplate", "body"], ["currentPageReportTemplate", "Showing {first} to {last} of {totalRecords} entries", 3, "onPageChange", "rows", "totalRecords", "showCurrentPageReport", "rowsPerPageOptions"], [3, "visibleChange", "maximizable", "closeOnEscape", "header", "modal", "visible", "draggable"], [3, "ngSubmit", "formGroup"], [1, "row", "col-md-12", "mt-4"], ["id", "inputField", 1, "col-md-4", "flex", "flex-column"], ["for", "name"], ["formControlName", "issueDate", "inputId", "date", "appendTo", "body", "tabindex", "1", "name", "issueDate", 3, "ngModelChange", "minDate", "maxDate", "showOnFocus"], ["class", "text-danger", 4, "ngIf"], [1, "col-md-4"], [3, "valueSelected", "title", "id", "name", "showId"], ["type", "text", "pInputText", "", "formControlName", "voucherNumber", "id", "voucherNumber", "autocomplete", "off", "readonly", "", 2, "position", "relative", "z-index", "1000"], [1, "row", "col-md-12"], ["formControlName", "attendanceMonth", "inputId", "date", "appendTo", "body", "dateFormat", "mm/yy", "tabindex", "1", "name", "attendanceMonth", 3, "view", "showOnFocus"], [1, "my-auto"], ["label", "Copy Vehicle Attendance", "severity", "success", 3, "click", "text", "raised"], ["label", "Remove Row", "size", "small", "severity", "danger", 2, "padding", "0.25rem 0.5rem", "font-size", "0.75rem", "height", "auto", "line-height", "1.25", 3, "click"], [1, "ag-theme-quartz", 2, "height", "500px", 3, "gridReady", "rowData", "columnDefs", "rowSelection", "singleClickEdit"], ["id", "inputField", 1, "col-md-8", "flex", "flex-column"], ["type", "text", "pInputText", "", "formControlName", "remarks", "id", "remarks", "autocomplete", "off", 2, "position", "relative", "z-index", "1000"], ["for", "totalAmount"], ["type", "text", "pInputText", "", "formControlName", "totalAmount", "id", "totalAmount", "autocomplete", "off", "readonly", "", 2, "position", "relative", "z-index", "1000"], [1, "flex", "gap-1", "justify-content-end", "mt-4"], ["label", "Cancel", "severity", "warning", 3, "onClick", "outlined"], ["label", "Save", "severity", "contrast", 3, "loading", "disabled", "outlined", "click", 4, "ngIf"], ["label", "Update", "severity", "contrast", 3, "loading", "disabled", "outlined", "click", 4, "ngIf"], [1, "p-toolbar-group-left"], [1, "p-toolbar-separator", 2, "margin-right", "10px"], ["pButton", "", "icon", "pi pi-plus-circle", 1, "p-button-success", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], [1, "block", "md:mt-0", "p-input-icon-left"], [1, "pi", "pi-search"], ["pInputText", "", "type", "text", "placeholder", "Search...", 2, "height", "25px", "cursor", "pointer", 3, "keydown.enter", "input"], ["pSortableColumn", "Actions", 2, "min-width", "200px"], ["field", "Actions"], ["pSortableColumn", "voucherNumber", 2, "min-width", "200px"], ["field", "voucherNumber"], ["pSortableColumn", "attendanceMonth", 2, "min-width", "200px"], ["field", "attendanceMonth"], ["pSortableColumn", "issueDate", 2, "min-width", "200px"], ["field", "issueDate"], ["pSortableColumn", "userLocationId", 2, "min-width", "200px"], ["field", "userLocationId"], ["pSortableColumn", "userLocationName", 2, "min-width", "200px"], ["field", "userLocationName"], ["pSortableColumn", "costCenterName", 2, "min-width", "200px"], ["field", "costCenterName"], ["pSortableColumn", "Active", 2, "min-width", "200px"], ["field", "Active"], ["style", "height: 25px; width: 25px; cursor: pointer", "pButton", "", "pRipple", "", "icon", "pi pi-pencil", "class", "p-button-rounded p-button-info mr-2", 3, "click", 4, "ngIf"], ["style", "height: 25px; width: 25px; cursor: pointer", "pButton", "", "pRipple", "", "icon", "pi pi-eye", "class", "p-button-rounded p-button-info mr-2", 3, "click", 4, "ngIf"], ["style", "height: 25px; width: 25px; cursor: pointer", "pButton", "", "pRipple", "", "icon", "pi pi-trash", "class", "p-button-rounded p-button-warning mr-2", 3, "click", 4, "ngIf"], ["pButton", "", "pRipple", "", "icon", "pi pi-check", "style", "height: 25px; width: 25px; cursor: pointer", "class", "p-button-rounded p-button-success mr-2", 3, "click", 4, "ngIf"], ["class", "yes-bg", 4, "ngIf"], ["class", "no-bg", 4, "ngIf"], ["pButton", "", "pRipple", "", "icon", "pi pi-pencil", 1, "p-button-rounded", "p-button-info", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], ["pButton", "", "pRipple", "", "icon", "pi pi-eye", 1, "p-button-rounded", "p-button-info", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], ["pButton", "", "pRipple", "", "icon", "pi pi-trash", 1, "p-button-rounded", "p-button-warning", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], ["pButton", "", "pRipple", "", "icon", "pi pi-check", 1, "p-button-rounded", "p-button-success", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], [1, "yes-bg"], [1, "no-bg"], [1, "text-danger"], ["label", "Save", "severity", "contrast", 3, "click", "loading", "disabled", "outlined"], ["label", "Update", "severity", "contrast", 3, "click", "loading", "disabled", "outlined"]],
    template: function RentalVehicleInvoiceComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p-toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, RentalVehicleInvoiceComponent_ng_template_1_Template, 2, 0, "ng-template", 2)(2, RentalVehicleInvoiceComponent_ng_template_2_Template, 6, 0, "ng-template", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 4)(4, "p-table", 5, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, RentalVehicleInvoiceComponent_ng_template_6_Template, 25, 0, "ng-template", 6)(7, RentalVehicleInvoiceComponent_ng_template_7_Template, 23, 16, "ng-template", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "p-paginator", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onPageChange", function RentalVehicleInvoiceComponent_Template_p_paginator_onPageChange_8_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.onPageChange($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "p-dialog", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayListener"]("visibleChange", function RentalVehicleInvoiceComponent_Template_p_dialog_visibleChange_9_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayBindingSet"](ctx.displayModal, $event) || (ctx.displayModal = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "form", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngSubmit", function RentalVehicleInvoiceComponent_Template_form_ngSubmit_11_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.save());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "div", 11)(13, "div", 12)(14, "label", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](15, "Date:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "p-calendar", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RentalVehicleInvoiceComponent_Template_p_calendar_ngModelChange_16_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.onDateChange($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](17, RentalVehicleInvoiceComponent_div_17_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "div", 16)(19, "app-picker", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("valueSelected", function RentalVehicleInvoiceComponent_Template_app_picker_valueSelected_19_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.setPickerValue($event, "Location"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "div", 12)(21, "label", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](22, "Voucher Number:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](23, "input", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](24, RentalVehicleInvoiceComponent_div_24_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](25, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](26, "div", 19)(27, "div", 12)(28, "label", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](29, "Attendance Date:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](30, "p-calendar", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](31, RentalVehicleInvoiceComponent_div_31_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](32, "div", 21)(33, "p-button", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalVehicleInvoiceComponent_Template_p_button_click_33_listener() {
          let tmp_2_0;
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.copyVehiclesAttendance((tmp_2_0 = ctx.vehicleattendanceform.get("attendanceMonth")) == null ? null : tmp_2_0.value));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](34, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](35, "p-button", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RentalVehicleInvoiceComponent_Template_p_button_click_35_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.onRemoveSelected());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](36, "ag-grid-angular", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("gridReady", function RentalVehicleInvoiceComponent_Template_ag_grid_angular_gridReady_36_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.onGridReady($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](37, "div", 19)(38, "div", 25)(39, "label", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](40, "Narration:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](41, "input", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](42, "div", 12)(43, "label", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](44, "Total Amount:");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](45, "input", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](46, "div", 29)(47, "p-button", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onClick", function RentalVehicleInvoiceComponent_Template_p_button_onClick_47_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.displayModal = false);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](48, RentalVehicleInvoiceComponent_p_button_48_Template, 1, 3, "p-button", 31)(49, RentalVehicleInvoiceComponent_p_button_49_Template, 1, 3, "p-button", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](50, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](51, "p-toast")(52, "p-confirmDialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        let tmp_24_0;
        let tmp_25_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](41, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", ctx.tableData)("scrollable", true)("rowHover", true)("paginatorDropdownAppendTo", "body")("globalFilterFields", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](42, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("rows", 5)("totalRecords", ctx.count)("showCurrentPageReport", true)("rowsPerPageOptions", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](43, _c2, ctx.count));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](45, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("maximizable", true)("closeOnEscape", false)("header", ctx.editMode ? "Edit Rental Vehicle Invoice" : "Create Rental Vehicle Invoice")("modal", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayProperty"]("visible", ctx.displayModal);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("draggable", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formGroup", ctx.vehicleattendanceform);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("minDate", ctx.MinDate)("maxDate", ctx.today)("showOnFocus", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("issueDate"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("title", "Location")("id", (tmp_24_0 = ctx.vehicleattendanceform.get("userLocationId")) == null ? null : tmp_24_0.value)("name", (tmp_25_0 = ctx.vehicleattendanceform.get("userLocationName")) == null ? null : tmp_25_0.value)("showId", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("voucherNumber"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("view", "month")("showOnFocus", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("attendanceMonth"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("text", true)("raised", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("rowData", ctx.rowData)("columnDefs", ctx.colDefs)("rowSelection", ctx.rowSelection)("singleClickEdit", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("outlined", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.editMode && !ctx.viewMode);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.editMode && !ctx.viewMode);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, primeng_button__WEBPACK_IMPORTED_MODULE_13__.ButtonDirective, primeng_button__WEBPACK_IMPORTED_MODULE_13__.Button, primeng_api__WEBPACK_IMPORTED_MODULE_11__.PrimeTemplate, primeng_dialog__WEBPACK_IMPORTED_MODULE_14__.Dialog, primeng_table__WEBPACK_IMPORTED_MODULE_15__.Table, primeng_table__WEBPACK_IMPORTED_MODULE_15__.SortableColumn, primeng_table__WEBPACK_IMPORTED_MODULE_15__.SortIcon, primeng_paginator__WEBPACK_IMPORTED_MODULE_16__.Paginator, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatusGroup, primeng_toolbar__WEBPACK_IMPORTED_MODULE_17__.Toolbar, primeng_inputtext__WEBPACK_IMPORTED_MODULE_18__.InputText, primeng_calendar__WEBPACK_IMPORTED_MODULE_19__.Calendar, ag_grid_angular__WEBPACK_IMPORTED_MODULE_20__.AgGridAngular, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_21__.ConfirmDialog, primeng_toast__WEBPACK_IMPORTED_MODULE_22__.Toast, _shared_components_picker_picker_component__WEBPACK_IMPORTED_MODULE_5__.PickerComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlName, _angular_common__WEBPACK_IMPORTED_MODULE_12__.DatePipe],
    encapsulation: 2
  });
}

/***/ }),

/***/ 53925:
/*!***************************************************************************************************!*\
  !*** ./src/app/main/rental/vehicle management/vehicle-management/vehicle-management.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VehicleManagementComponent: () => (/* binding */ VehicleManagementComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 89475);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 61318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 77919);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _shared_services_rental_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/services/rental.service */ 9725);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/api */ 17780);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/button */ 49136);
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/dialog */ 16280);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/table */ 76676);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/paginator */ 43157);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/toolbar */ 31973);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/inputtext */ 48361);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/calendar */ 41314);
/* harmony import */ var primeng_checkbox__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/checkbox */ 26771);
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/confirmdialog */ 68160);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/toast */ 61225);
/* harmony import */ var _shared_components_picker_picker_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../shared/components/picker/picker.component */ 79023);


















const _c0 = () => ({
  width: "100%",
  "overflow-y": "auto"
});
const _c1 = () => ["registrationDate", "registrationNumber", "makeYear", "vehicleBrand", "engineNumber", "colourName", "vehiclePower", "chassisNumber", "locationName", "name", "Status"];
const _c2 = a0 => [10, 50, 100, a0];
function VehicleManagementComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Vehicle Management");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function VehicleManagementComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function VehicleManagementComponent_ng_template_2_Template_span_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.show());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "i", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "input", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("keydown.enter", function VehicleManagementComponent_ng_template_2_Template_input_keydown_enter_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.onEnter($event));
    })("input", function VehicleManagementComponent_ng_template_2_Template_input_input_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      const policyTable_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.onGlobalFilter(policyTable_r4, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function VehicleManagementComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr")(1, "th", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, " Actions ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "p-sortIcon", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "th", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, " Registration Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "p-sortIcon", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "th", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, " Registration No");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](9, "p-sortIcon", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "th", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, " Make Year ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "p-sortIcon", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "th", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, " Vehicle Brand");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "p-sortIcon", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "th", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, " Engine Number");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](18, "p-sortIcon", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "th", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, " Chassis Number ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](21, "p-sortIcon", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "th", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, " Colour Name ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](24, "p-sortIcon", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "th", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26, " Vehicle TypeName ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](27, "p-sortIcon", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "th", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](29, " Vehicle OwnershipName ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](30, "p-sortIcon", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "th", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](32, " Fuel TypeName ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](33, "p-sortIcon", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "th", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](35, " Vehicle Power ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](36, "p-sortIcon", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "th", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, " Location Name ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](39, "p-sortIcon", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](40, "th", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](41, " name ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](42, "p-sortIcon", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "th", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](44, " Active ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](45, "p-sortIcon", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function VehicleManagementComponent_ng_template_7_span_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Yes");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function VehicleManagementComponent_ng_template_7_span_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "No");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function VehicleManagementComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr")(1, "td")(2, "span", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function VehicleManagementComponent_ng_template_7_Template_span_click_2_listener() {
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.show(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function VehicleManagementComponent_ng_template_7_Template_span_click_3_listener() {
      const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.delete(item_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](6, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](32, VehicleManagementComponent_ng_template_7_span_32_Template, 2, 0, "span", 82)(33, VehicleManagementComponent_ng_template_7_span_33_Template, 2, 0, "span", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](6, 15, item_r6.registrationDate));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r6.registrationNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r6.makeYear);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r6.vehicleBrand);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r6.engineNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r6.chassisNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r6.colourName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r6.vehicleTypeName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r6.vehicleOwnershipName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r6.fuelTypeName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r6.vehiclePower);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r6.locationName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r6.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", item_r6.isActive);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !item_r6.isActive);
  }
}
function VehicleManagementComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function VehicleManagementComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function VehicleManagementComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function VehicleManagementComponent_div_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function VehicleManagementComponent_div_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function VehicleManagementComponent_div_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function VehicleManagementComponent_div_49_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function VehicleManagementComponent_div_65_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " This field is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function VehicleManagementComponent_p_button_79_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p-button", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function VehicleManagementComponent_p_button_79_Template_p_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r7);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.save());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("loading", ctx_r2.saving)("disabled", !ctx_r2.vehicleForm.valid)("outlined", true);
  }
}
function VehicleManagementComponent_p_button_80_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p-button", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function VehicleManagementComponent_p_button_80_Template_p_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r8);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.update());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("loading", ctx_r2.saving)("disabled", !ctx_r2.vehicleForm.valid)("outlined", true);
  }
}
class VehicleManagementComponent {
  constructor(fb, _rentalService, msgService, confirmationService) {
    this.fb = fb;
    this._rentalService = _rentalService;
    this.msgService = msgService;
    this.confirmationService = confirmationService;
    this.target = "Vehicle";
    this.currentPage = 1;
    this.skipCount = 0;
    this.maxCount = 10;
    this.showSupplierDetails = false;
    this.dto = {
      name: ""
    };
    this.vehicleForm = this.fb.group({
      registrationDate: [new Date(), _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required],
      registrationNumber: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required],
      makeYear: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required],
      vehicleBrand: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required],
      engineNumber: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]],
      chassisNumber: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]],
      colourId: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]],
      colourName: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]],
      vehicleTypeId: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]],
      vehicleTypeName: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]],
      vehicleOwnershipId: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]],
      vehicleOwnershipName: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]],
      // regionId: ["", [Validators.required]],
      // regionName: [""],
      fuelTypeId: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]],
      fuelTypeName: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]],
      vehiclePower: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]],
      locationId: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]],
      locationName: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]],
      name: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]],
      isActive: [""],
      isAdminOnly: [false]
    });
  }
  ngOnInit() {
    this.getAll();
  }
  setPickerValue(value, title) {
    switch (title) {
      case "Colour":
        debugger;
        this.vehicleForm.patchValue({
          colourId: value?.id,
          colourName: value.name
        });
        this.employeeErpId = value.id;
        break;
      case "VehicleType":
        this.vehicleForm.patchValue({
          vehicleTypeId: +value.id,
          vehicleTypeName: value.name
        });
        break;
      case "VehicleOwnership":
        this.vehicleForm.patchValue({
          vehicleOwnershipId: +value.id,
          vehicleOwnershipName: value.name
        });
        break;
      case "FuelType":
        this.vehicleForm.patchValue({
          fuelTypeId: +value.id,
          fuelTypeName: value.name
        });
        break;
      case "Location":
        this.vehicleForm.patchValue({
          locationId: +value.id,
          locationName: value.name
        });
        break;
      // case "Region":
      //   this.vehicleForm.patchValue({
      //     regionId: value.id,
      //     regionName: value.name,
      //   });
      //   break;
      default:
        alert(`${title} is not defined`);
    }
  }
  getAll() {
    this._rentalService.getAll(this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;
      }
    });
  }
  show(id) {
    if (id) {
      this.editMode = true;
      this._rentalService.getDataForEdit(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
        debugger;
        this.msgService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error.message,
          life: 2000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.throwError)(error.error.error.message);
      })).subscribe({
        next: response => {
          debugger;
          this.dataForEdit = response;
          this.vehicleForm.get("name").setValue(this.dataForEdit.name);
          this.vehicleForm.get("registrationDate").setValue(new Date(this.dataForEdit.registrationDate));
          this.vehicleForm.get("registrationNumber").setValue(this.dataForEdit.registrationNumber);
          this.vehicleForm.get("makeYear").setValue(this.dataForEdit.makeYear);
          this.vehicleForm.get("vehicleBrand").setValue(this.dataForEdit.vehicleBrand);
          this.vehicleForm.get("colourId").setValue(this.dataForEdit.colourId);
          this.vehicleForm.get("colourName").setValue(this.dataForEdit.colourName);
          this.vehicleForm.get("vehicleTypeId").setValue(this.dataForEdit.vehicleTypeId);
          this.vehicleForm.get("vehicleTypeName").setValue(this.dataForEdit.vehicleTypeName);
          this.vehicleForm.get("engineNumber").setValue(this.dataForEdit.engineNumber);
          this.vehicleForm.get("chassisNumber").setValue(this.dataForEdit.chassisNumber);
          this.vehicleForm.get("vehicleOwnershipId").setValue(this.dataForEdit.vehicleOwnershipId);
          this.vehicleForm.get("vehicleOwnershipName").setValue(this.dataForEdit.vehicleOwnershipName);
          this.vehicleForm.get("fuelTypeId").setValue(this.dataForEdit.fuelTypeId);
          this.vehicleForm.get("fuelTypeName").setValue(this.dataForEdit.fuelTypeName);
          this.vehicleForm.get("locationId").setValue(this.dataForEdit.locationId);
          this.vehicleForm.get("locationName").setValue(this.dataForEdit.locationName);
          // this.vehicleForm
          //   .get("regionId")
          //   .setValue(this.dataForEdit.regionId);
          // this.vehicleForm
          //   .get("regionName")
          //   .setValue(this.dataForEdit.regionName);
          this.vehicleForm.get("vehiclePower").setValue(this.dataForEdit.vehiclePower);
          this.vehicleForm.get("isActive").setValue(this.dataForEdit.isActive);
          this.displayModal = true;
        }
      });
    } else {
      this.editMode = false;
      this.displayModal = true;
      this.vehicleForm.reset();
      this.vehicleForm.get("registrationDate").setValue(new Date());
      this.vehicleForm.get("isActive").setValue(true);
      this.vehicleForm.get("isAdminOnly").setValue(false);
    }
  }
  save() {
    this.saving = true;
    if (!this.vehicleForm.valid) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all Required fields",
        life: 2000
      });
      this.saving = false;
      return;
    }
    this._rentalService.create(this.vehicleForm.value, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.finalize)(() => {
      this.saving = false;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.msgService.add({
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
  update() {
    this.saving = true;
    const updateData = {
      ...this.vehicleForm.value,
      id: this.dataForEdit.id
    };
    this._rentalService.update(updateData, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.finalize)(() => {
      this.saving = false;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
      debugger;
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: error.error.error.message,
        life: 2000
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.throwError)(error.error.error.message);
    })).subscribe({
      next: response => {
        debugger;
        this.msgService.add({
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
  delete(id) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._rentalService.delete(id, this.target).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.finalize)(() => {}), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
          debugger;
          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000
          });
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.throwError)(error.error.error.message);
        })).subscribe({
          next: response => {
            debugger;
            if (response) {
              this.msgService.add({
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
  isFieldInvalid(field) {
    const control = this.vehicleForm.get(field);
    return control ? control.invalid && control.touched : false;
  }
  onGlobalFilter(table, event) {
    table.filterGlobal(event.target.value, "contains");
  }
  onPageChange(event) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * 10;
    this._rentalService.getAll(this.target, this.skipCount, this.maxCount).subscribe({
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
    this.dto.name = inputValue;
    debugger;
    this._rentalService.getAllRecord(this.target, this.dto).subscribe({
      next: response => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;
        this.loading = false;
      }
    });
  }
  static #_ = this.ɵfac = function VehicleManagementComponent_Factory(t) {
    return new (t || VehicleManagementComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_shared_services_rental_service__WEBPACK_IMPORTED_MODULE_0__.RentalService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_7__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_7__.ConfirmationService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: VehicleManagementComponent,
    selectors: [["app-vehicle-management"]],
    decls: 84,
    vars: 54,
    consts: [["policyTable", ""], ["styleClass", "mb-4"], ["pTemplate", "left"], ["pTemplate", "right"], [1, "card", "p-4"], ["styleClass", "p-datatable-gridlines", "scrollHeight", "58vh", "responsiveLayout", "scroll", "dataKey", "id", "responsiveLayout", "scroll", 3, "loading", "value", "scrollable", "rowHover", "paginatorDropdownAppendTo", "globalFilterFields"], ["pTemplate", "header"], ["pTemplate", "body"], ["currentPageReportTemplate", "Showing {first} to {last} of {totalRecords} entries", 3, "onPageChange", "rows", "totalRecords", "showCurrentPageReport", "rowsPerPageOptions"], [3, "visibleChange", "maximizable", "closeOnEscape", "header", "modal", "visible", "draggable"], [3, "ngSubmit", "formGroup"], [1, "row", "col-md-12", "mt-4"], ["id", "inputField", 1, "col-md-8", "flex", "flex-column"], ["for", "name"], ["type", "text", "pInputText", "", "formControlName", "name", "id", "name", "autocomplete", "off", 2, "position", "relative", "z-index", "1000"], ["class", "text-danger", 4, "ngIf"], [1, "row", "col-md-12", "mt-2"], ["id", "inputField", 1, "col-md-3", "flex", "flex-column"], ["for", "title"], ["type", "text", "pInputText", "", "formControlName", "registrationNumber", "id", "registrationNumber", "autocomplete", "off", 2, "position", "relative", "z-index", "1000"], ["formControlName", "registrationDate", "inputId", "date", "appendTo", "body", 3, "showOnFocus"], ["for", "makeYear"], ["type", "text", "pInputText", "", "formControlName", "makeYear", "id", "makeYear", "autocomplete", "off", 2, "position", "relative", "z-index", "1000"], ["type", "text", "pInputText", "", "formControlName", "vehicleBrand", "id", "address", "autocomplete", "off", 2, "position", "relative", "z-index", "1000"], ["id", "inputField", 1, "col-md-6", "flex", "flex-column"], ["type", "text", "pInputText", "", "formControlName", "engineNumber", "id", "address", "autocomplete", "off", 2, "position", "relative", "z-index", "1000"], ["type", "text", "pInputText", "", "formControlName", "chassisNumber", "id", "address", "autocomplete", "off", 2, "position", "relative", "z-index", "1000"], [1, "row", "col-md-12"], [1, "col-md-4"], [3, "valueSelected", "title", "id", "name"], ["for", "vehiclePower"], ["type", "text", "pInputText", "", "formControlName", "vehiclePower", "id", "vehiclePower", "autocomplete", "off"], [3, "valueSelected", "title", "id", "name", "showId"], [1, ""], [1, "flex", "gap-2", "align-items-center"], ["formControlName", "isActive", "inputId", "isActive", "inputId", "binary", 3, "binary"], ["for", "isActive"], [1, "flex", "align-items-center", "mb-2", 2, "margin-bottom", "10px"], ["formControlName", "isAdminOnly", "inputId", "isAdminOnly", 3, "binary"], ["for", "isAdminOnly", 1, "mb-0"], [1, "flex", "gap-1", "justify-content-end", "mt-4"], ["label", "Cancel", "severity", "warning", 3, "onClick", "outlined"], ["label", "Save", "severity", "contrast", 3, "loading", "disabled", "outlined", "click", 4, "ngIf"], ["label", "Update", "severity", "contrast", 3, "loading", "disabled", "outlined", "click", 4, "ngIf"], [1, "p-toolbar-group-left"], [1, "p-toolbar-separator", 2, "margin-right", "10px"], ["pButton", "", "icon", "pi pi-plus-circle", 1, "p-button-success", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], [1, "block", "md:mt-0", "p-input-icon-left"], [1, "pi", "pi-search"], ["pInputText", "", "type", "text", "placeholder", "Search...", 2, "height", "25px", "cursor", "pointer", 3, "keydown.enter", "input"], ["pSortableColumn", "Actions", 2, "min-width", "200px"], ["field", "Actions"], ["pSortableColumn", "registrationDate", 2, "min-width", "200px"], ["field", "registrationDate"], ["pSortableColumn", "registrationNumber", 2, "min-width", "200px"], ["field", "registrationNumber"], ["pSortableColumn", "makeYear", 2, "min-width", "200px"], ["field", "makeYear"], ["pSortableColumn", "vehicleBrand", 2, "min-width", "200px"], ["field", "vehicleBrand"], ["pSortableColumn", "engineNumber", 2, "min-width", "200px"], ["field", "engineNumber"], ["pSortableColumn", "chassisNumber", 2, "min-width", "200px"], ["field", "chassisNumber"], ["pSortableColumn", "colourName", 2, "min-width", "200px"], ["field", "colourName"], ["pSortableColumn", "vehicleTypeName", 2, "min-width", "200px"], ["field", "vehicleTypeName"], ["pSortableColumn", "vehicleOwnershipName", 2, "min-width", "200px"], ["field", "vehicleOwnershipName"], ["pSortableColumn", "fuelTypeName", 2, "min-width", "200px"], ["field", "fuelTypeName"], ["pSortableColumn", "vehiclePower", 2, "min-width", "200px"], ["field", "vehiclePower"], ["pSortableColumn", "locationName", 2, "min-width", "200px"], ["field", "locationName"], ["pSortableColumn", "name", 2, "min-width", "200px"], ["field", "name"], ["pSortableColumn", "Active", 2, "min-width", "200px"], ["field", "Active"], ["pButton", "", "pRipple", "", "icon", "pi pi-pencil", 1, "p-button-rounded", "p-button-info", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], ["pButton", "", "pRipple", "", "icon", "pi pi-trash", 1, "p-button-rounded", "p-button-warning", "mr-2", 2, "height", "25px", "width", "25px", "cursor", "pointer", 3, "click"], ["class", "yes-bg", 4, "ngIf"], ["class", "no-bg", 4, "ngIf"], [1, "yes-bg"], [1, "no-bg"], [1, "text-danger"], ["label", "Save", "severity", "contrast", 3, "click", "loading", "disabled", "outlined"], ["label", "Update", "severity", "contrast", 3, "click", "loading", "disabled", "outlined"]],
    template: function VehicleManagementComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p-toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, VehicleManagementComponent_ng_template_1_Template, 2, 0, "ng-template", 2)(2, VehicleManagementComponent_ng_template_2_Template, 6, 0, "ng-template", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 4)(4, "p-table", 5, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, VehicleManagementComponent_ng_template_6_Template, 46, 0, "ng-template", 6)(7, VehicleManagementComponent_ng_template_7_Template, 34, 17, "ng-template", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "p-paginator", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("onPageChange", function VehicleManagementComponent_Template_p_paginator_onPageChange_8_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.onPageChange($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "p-dialog", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("visibleChange", function VehicleManagementComponent_Template_p_dialog_visibleChange_9_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.displayModal, $event) || (ctx.displayModal = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "form", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function VehicleManagementComponent_Template_form_ngSubmit_11_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.save());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 11)(13, "div", 12)(14, "label", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Account Title:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](16, "input", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](17, VehicleManagementComponent_div_17_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 16)(19, "div", 17)(20, "label", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "Registration Number:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](22, "input", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](23, VehicleManagementComponent_div_23_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "div", 17)(25, "label", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26, "Registration Date:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](27, "p-calendar", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](28, VehicleManagementComponent_div_28_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "div", 17)(30, "label", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31, "Make:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](32, "input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](33, VehicleManagementComponent_div_33_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "div", 17)(35, "label", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](36, "Model:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](37, "input", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](38, VehicleManagementComponent_div_38_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "div", 16)(40, "div", 24)(41, "label", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](42, "Engine No:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](43, "input", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](44, VehicleManagementComponent_div_44_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](45, "div", 24)(46, "label", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](47, "Chasis Number:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](48, "input", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](49, VehicleManagementComponent_div_49_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](50, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](51, "div", 27)(52, "div", 28)(53, "app-picker", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("valueSelected", function VehicleManagementComponent_Template_app_picker_valueSelected_53_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.setPickerValue($event, "Colour"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](54, "div", 28)(55, "app-picker", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("valueSelected", function VehicleManagementComponent_Template_app_picker_valueSelected_55_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.setPickerValue($event, "VehicleType"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](56, "div", 28)(57, "app-picker", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("valueSelected", function VehicleManagementComponent_Template_app_picker_valueSelected_57_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.setPickerValue($event, "VehicleOwnership"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](58, "div", 27)(59, "div", 28)(60, "app-picker", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("valueSelected", function VehicleManagementComponent_Template_app_picker_valueSelected_60_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.setPickerValue($event, "FuelType"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](61, "div", 17)(62, "label", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](63, "Vehicle Power");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](64, "input", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](65, VehicleManagementComponent_div_65_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](66, "div", 28)(67, "app-picker", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("valueSelected", function VehicleManagementComponent_Template_app_picker_valueSelected_67_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.setPickerValue($event, "Location"));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](68, "div", 33)(69, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](70, "p-checkbox", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](71, "label", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](72, "Active");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](73, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](74, "p-checkbox", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](75, "label", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](76, "For Admin");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](77, "div", 40)(78, "p-button", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("onClick", function VehicleManagementComponent_Template_p_button_onClick_78_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.displayModal = false);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](79, VehicleManagementComponent_p_button_79_Template, 1, 3, "p-button", 42)(80, VehicleManagementComponent_p_button_80_Template, 1, 3, "p-button", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](81, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](82, "p-toast")(83, "p-confirmDialog");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        let tmp_29_0;
        let tmp_30_0;
        let tmp_32_0;
        let tmp_33_0;
        let tmp_35_0;
        let tmp_36_0;
        let tmp_38_0;
        let tmp_39_0;
        let tmp_42_0;
        let tmp_43_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](50, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("loading", ctx.loading)("value", ctx.tableData)("scrollable", true)("rowHover", true)("loading", ctx.loading)("paginatorDropdownAppendTo", "body")("globalFilterFields", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](51, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("rows", 10)("totalRecords", ctx.count)("showCurrentPageReport", true)("rowsPerPageOptions", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](52, _c2, ctx.count));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("maximizable", true)("closeOnEscape", false)("header", ctx.editMode ? "Edit Vehicle" : "Create Vehicle")("modal", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("visible", ctx.displayModal);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("draggable", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.vehicleForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("name"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("registrationNumber"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("showOnFocus", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("registrationDate"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("makeYear"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("vehicleBrand"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("engineNumber"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("chassisNumber"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("title", "Colour")("id", (tmp_29_0 = ctx.vehicleForm.get("colourId")) == null ? null : tmp_29_0.value)("name", (tmp_30_0 = ctx.vehicleForm.get("colourName")) == null ? null : tmp_30_0.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("title", "VehicleType")("id", (tmp_32_0 = ctx.vehicleForm.get("vehicleTypeId")) == null ? null : tmp_32_0.value)("name", (tmp_33_0 = ctx.vehicleForm.get("vehicleTypeName")) == null ? null : tmp_33_0.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("title", "VehicleOwnership")("id", (tmp_35_0 = ctx.vehicleForm.get("vehicleOwnershipId")) == null ? null : tmp_35_0.value)("name", (tmp_36_0 = ctx.vehicleForm.get("vehicleOwnershipName")) == null ? null : tmp_36_0.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("title", "FuelType")("id", (tmp_38_0 = ctx.vehicleForm.get("fuelTypeId")) == null ? null : tmp_38_0.value)("name", (tmp_39_0 = ctx.vehicleForm.get("fuelTypeName")) == null ? null : tmp_39_0.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isFieldInvalid("vehiclePower"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("title", "Location")("id", (tmp_42_0 = ctx.vehicleForm.get("locationId")) == null ? null : tmp_42_0.value)("name", (tmp_43_0 = ctx.vehicleForm.get("locationName")) == null ? null : tmp_43_0.value)("showId", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("binary", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("binary", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("outlined", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.editMode);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.editMode);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, primeng_button__WEBPACK_IMPORTED_MODULE_9__.ButtonDirective, primeng_button__WEBPACK_IMPORTED_MODULE_9__.Button, primeng_api__WEBPACK_IMPORTED_MODULE_7__.PrimeTemplate, primeng_dialog__WEBPACK_IMPORTED_MODULE_10__.Dialog, primeng_table__WEBPACK_IMPORTED_MODULE_11__.Table, primeng_table__WEBPACK_IMPORTED_MODULE_11__.SortableColumn, primeng_table__WEBPACK_IMPORTED_MODULE_11__.SortIcon, primeng_paginator__WEBPACK_IMPORTED_MODULE_12__.Paginator, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, primeng_toolbar__WEBPACK_IMPORTED_MODULE_13__.Toolbar, primeng_inputtext__WEBPACK_IMPORTED_MODULE_14__.InputText, primeng_calendar__WEBPACK_IMPORTED_MODULE_15__.Calendar, primeng_checkbox__WEBPACK_IMPORTED_MODULE_16__.Checkbox, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_17__.ConfirmDialog, primeng_toast__WEBPACK_IMPORTED_MODULE_18__.Toast, _shared_components_picker_picker_component__WEBPACK_IMPORTED_MODULE_1__.PickerComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _angular_common__WEBPACK_IMPORTED_MODULE_8__.DatePipe],
    encapsulation: 2
  });
}

/***/ })

}]);
//# sourceMappingURL=src_app_main_rental_rental_module_ts.js.map