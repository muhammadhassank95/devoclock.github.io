"use strict";
(self["webpackChunkERP"] = self["webpackChunkERP"] || []).push([["default-src_app_main_budget_shared_Dtos_restriction-dto_ts-src_app_main_budget_shared_service-01ea67"],{

/***/ 97223:
/*!************************************************************!*\
  !*** ./src/app/main/budget/shared/Dtos/restriction-dto.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RestrictionDto: () => (/* binding */ RestrictionDto)
/* harmony export */ });
class RestrictionDto {
  constructor() {
    this.isActive = true;
    this.isCreationAllowed = true;
    this.isEditAllowed = true;
    this.isApprovalAllowed = true;
    this.isUnapprovalAllowed = true;
    this.isRevisionAllowed = true;
  }
}

/***/ }),

/***/ 92076:
/*!********************************************************************!*\
  !*** ./src/app/main/budget/shared/services/restriction.service.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RestrictionService: () => (/* binding */ RestrictionService)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _shared_AppBaseURL_appBaseURL__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/AppBaseURL/appBaseURL */ 15473);
/* harmony import */ var _node_modules_moment_timezone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @node_modules/moment-timezone */ 6923);
/* harmony import */ var _node_modules_moment_timezone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_moment_timezone__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 46443);





class RestrictionService {
  constructor(http) {
    this.http = http;
    this.commonUrl = "api/services/app/";
    this.baseUrl = _shared_AppBaseURL_appBaseURL__WEBPACK_IMPORTED_MODULE_0__.newBaseUrl + this.commonUrl;
    this.url = "";
    this.url_ = "";
  }
  getVoucherRestriction(VoucherPrefix) {
    this.url += this.baseUrl + "VoucherRestriction/GetAll?VoucherPrefix=" + VoucherPrefix;
    return this.http.get(this.url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      return response["result"];
    }));
  }
  getVoucherNumber(target, prefix, issueDate, userLocationId) {
    this.url = this.baseUrl;
    this.url += target + "/GetVoucherNumber" + `?prefix=${prefix}&issueDate=${_node_modules_moment_timezone__WEBPACK_IMPORTED_MODULE_1__(issueDate).format("YYYY-MM-DD")}&userLocationId=${userLocationId}`;
    return this.http.get(this.url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
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
    return this.http.get(this.url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  static #_ = this.ɵfac = function RestrictionService_Factory(t) {
    return new (t || RestrictionService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: RestrictionService,
    factory: RestrictionService.ɵfac,
    providedIn: "root"
  });
}

/***/ }),

/***/ 23693:
/*!***************************************************************************!*\
  !*** ./src/app/main/inventory/Shared/Services/inventory-setup.service.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SetupsService: () => (/* binding */ SetupsService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var _shared_AppBaseURL_appBaseURL__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/AppBaseURL/appBaseURL */ 15473);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 70271);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 61318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 77919);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ 39545);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);






class SetupsService {
  constructor(http) {
    this.http = http;
    this.commonUrl = "api/services/app/";
    this.baseUrl = _shared_AppBaseURL_appBaseURL__WEBPACK_IMPORTED_MODULE_0__.newBaseUrl + this.commonUrl;
    this.url = "";
    this.url_ = "";
  }
  // getAll(target: string, IsDropdown?: boolean) {
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
  // getAll(
  //   target: string,
  //   IsDropdown?: boolean,
  //   skipCount: number = 0,
  //   maxCount: number = 5
  // ) {
  //   debugger;
  //   this.url = this.baseUrl;
  //   this.url += target + "/GetAll";
  //   // Create an array to store query parameters
  //   let queryParams: string[] = [];
  //   // Add IsDropdown parameter if it's true
  //   if (IsDropdown) {
  //     queryParams.push("IsDropdown=true");
  //   }
  //   // Add skipCount and maxCount parameters
  //   queryParams.push(`SkipCount=${skipCount}`);
  //   queryParams.push(`MaxResultCount=${maxCount}`);
  //   // Append query parameters to the URL
  //   if (queryParams.length > 0) {
  //     this.url += "?" + queryParams.join("&");
  //   }
  //   return this.http.get(this.url).pipe(
  //     map((response: any) => {
  //       console.log(response);
  //       return response["result"];
  //     })
  //   );
  // }
  getAll(target, params) {
    debugger;
    this.url = `${this.baseUrl}${target}/GetAll?`;
    const searchParams = new URLSearchParams();
    if (params) {
      if (params.userLocationId) {
        searchParams.append("LocationId", params.userLocationId.toString());
      }
      if (params.name) {
        searchParams.append("name", params.name.toString());
      }
      if (params.itemType) {
        searchParams.append("itemType", params.itemType.toString());
      }
      if (params.DocOrVocNumber) {
        searchParams.append("VoucherNumber", params.DocOrVocNumber.toString());
      }
      if (params.status) {
        searchParams.append("Status", params.status.toString());
      }
      if (params.id) {
        searchParams.append("id", params.id.toString());
      }
      if (params.maxCount) {
        searchParams.append("MaxResultCount", params.maxCount.toString());
      }
      if (params.skipCount) {
        searchParams.append("SkipCount", params.skipCount.toString());
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
  getAllRequisition(target, CostCenterId, ProjectId, EmployeeId) {
    debugger;
    this.url = this.baseUrl;
    this.url += `${target}/GetAll?`;
    if (EmployeeId !== undefined) {
      this.url += `EmployeeId=${EmployeeId}&`;
    }
    if (CostCenterId !== undefined) {
      this.url += `CostCenterId=${CostCenterId}&`;
    }
    if (ProjectId !== undefined) {
      this.url += `ProjectId=${ProjectId}&`;
    }
    this.url = this.url.endsWith("&") ? this.url.slice(0, -1) : this.url;
    this.url = this.url.endsWith("?") ? this.url.slice(0, -1) : this.url;
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
    this.url = this.baseUrl;
    this.url += target + "/Delete?Id=" + id;
    return this.http.delete(this.url);
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
  GetCategoryCount(id) {
    this.url = this.baseUrl;
    this.url += `Project/GetSerialNumber?Id=${id}`;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  GetNextCategoryCount(Service, id) {
    this.url = this.baseUrl;
    this.url += `${Service}/GetSerialNumber?Id=${id}`;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  getItemDetails(service, id) {
    const data = {
      bulkDtos: [{
        itemId: id,
        itemCategory: service
      }]
    };
    this.url = `${this.baseUrl}PurchaseRatePolicy/FetchLatestPurchaseRates`;
    return this.http.post(this.url, data);
  }
  // getItemDetails(Service: string, id: any) {
  //     ;
  //     const data= {
  //         itemId:id,
  //         itemCategory:Service
  //     }
  //     this.url = this.baseUrl;
  //     this.url += `PurchaseRatePolicy/GetLatestRate`;
  //     this.url = this.url.replace(/[?&]$/, "");
  //     return this.http.post(this.url, data  );
  //     // this.http.get(this.url, { params }).pipe(
  //     //     map((response: any) => {
  //     //         console.log(response);
  //     //         return response["result"].rate;
  //     //     })
  //     // )
  // }
  // getItemDetails(Service: string, id: any) {
  //     ;
  //     this.url = this.baseUrl;
  //     this.url += `PurchaseRatePolicy/GetLatestRate?ItemId=${id}&ItemCategory=${Service}`;
  //     this.url = this.url.replace(/[?&]$/, "");
  //     return this.http.get(this.url).pipe(
  //         map((response: any) => {
  //             console.log(response);
  //             ;
  //             return response["result"].rate;
  //         })
  //     );
  // }
  Approve(id, target) {
    this.url = this.baseUrl;
    this.url += target + "/Approve?Id=" + id;
    return this.http.post(this.url, {});
  }
  ApproveDocument(id, target) {
    this.url = this.baseUrl;
    this.url += target + "/ApproveDocument?Id=" + id;
    return this.http.post(this.url, {});
  }
  UnApprove(id, target) {
    this.url = this.baseUrl;
    this.url += target + "/UnApprove?Id=" + id;
    return this.http.post(this.url, {});
  }
  GetItemCategoryCount(target, id) {
    this.url = this.baseUrl;
    this.url += target + "/CategoryWiseCount";
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  GetItemSubCategoryCount(target, id) {
    this.url = this.baseUrl;
    this.url += target + "/SubCategoryWiseCount";
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
  getPaymentMode(id) {
    this.url = this.baseUrl;
    this.url += `ChartOfAccountSubLedger/GetForEdit?Id=${id}`;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  getUpdateRate(SupplierId, serviceItemIds) {
    this.url = this.baseUrl;
    this.url += `PurchaseRatePolicy/FetchLatestPurchaseRates?SupplierId=${SupplierId}`;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.put(this.url, serviceItemIds).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  // "http://65.109.118.136:444/api/services/app/ServiceRequisition/GetMaxCount?LocationId=1&IssueDate=2024-17"
  GetDocMaxCount(target, LocationId, IssueDate) {
    this.url = this.baseUrl;
    this.url += `${target}/GetMaxCount?`;
    if (LocationId !== undefined) {
      this.url += `LocationId=${LocationId}&`;
    }
    if (IssueDate !== undefined) {
      // var month = IssueDate.getMonth() + 1;
      // var year = IssueDate.getFullYear();
      // this.url += `IssueDate=${year + "-" + month}&`;
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
  GetDocMaxCountGI(LocationId, IssueDate) {
    debugger;
    this.url = this.baseUrl;
    this.url += `InwardGatepass/GetMaxCount?LocationId=${LocationId}&IssueDate=${moment__WEBPACK_IMPORTED_MODULE_1__(IssueDate).format("yy-MM-DD")}`;
    // if (LocationId !== undefined) {
    //     this.url += `LocationId=${LocationId}&`;
    // }
    // if (IssueDate !== undefined) {
    //     var month = IssueDate.getMonth() + 1;
    //     var year = IssueDate.getFullYear();
    //     this.url += `IssueDate=${year + "-" + month}&`;
    // }
    // this.url = this.url.endsWith("&") ? this.url.slice(0, -1) : this.url;
    // this.url = this.url.endsWith("?") ? this.url.slice(0, -1) : this.url;
    // this.url = this.url.replace(/[?&]$/, "");
    return this.http.post(this.url, {}).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  GetDocMaxCountGO(target, LocationId, IssueDate) {
    this.url = this.baseUrl;
    this.url += `${target}/GO_GetMaxCount?`;
    if (LocationId !== undefined) {
      this.url += `LocationId=${LocationId}&`;
    }
    if (IssueDate !== undefined) {
      var month = IssueDate.getMonth() + 1;
      var year = IssueDate.getFullYear();
      this.url += `IssueDate=${year + "-" + month}&`;
    }
    this.url = this.url.endsWith("&") ? this.url.slice(0, -1) : this.url;
    this.url = this.url.endsWith("?") ? this.url.slice(0, -1) : this.url;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.post(this.url, {}).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  getStockDetails(itemId, locationId, costCenterId, projectId) {
    this.url = this.baseUrl;
    this.url = `${this.baseUrl}InventoryRequisition/GetStockDetails?ItemId=${itemId}&LocationId=${locationId}&CostCenterId=${costCenterId}&ProjectId=${projectId}`;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  /////////////////////// Test /////////////////////
  // fetchStockRequestDetails(
  //   itemId: number,
  //   projectId: number,
  //   costCenterId: number,
  //   locationId: number,
  //   regionId: number,
  //   consumptionMonth: Date,
  //   providerProjectId: number,
  //   providerCostCenterId: number,
  //   providerLocationId: number,
  //   providerRegionId: number
  // ) {
  //   // Directly map query parameters in the URL string
  //   this.url = `${this.baseUrl}StockRequisition/FetchStockRequestDetails?ItemId=${itemId}&LocationId=${locationId}&CostCenterId=${costCenterId}&ProjectId=${projectId}&RegionId=${regionId}&ConsumptionMonth=${moment(consumptionMonth).format("yy-MM-DD")}&ProviderProjectId=${providerProjectId}&ProviderCostCenterId=${providerCostCenterId}&ProviderLocationId=${providerLocationId}&ProviderRegionId=${providerRegionId}`;
  //   return this.http.post(this.url).pipe(
  //     map((response: any) => {
  //       console.log(response);
  //       return response["result"];
  //     })
  //   );
  // }
  fetchStockRequestDetails(itemId, projectId, costCenterId, locationId,
  // regionId: number,
  consumptionMonth, providerProjectId, providerCostCenterId, providerLocationId
  // providerRegionId: number
  ) {
    // Construct URL with query parameters
    this.url = `${this.baseUrl}StockRequisition/FetchStockRequestDetails?` + `ItemId=${itemId}&` + `ProjectId=${projectId}&` + `CostCenterId=${costCenterId}&` + `LocationId=${locationId}&` +
    // `RegionId=${regionId}&` +
    `ConsumptionMonth=${moment__WEBPACK_IMPORTED_MODULE_1__(consumptionMonth).format("YYYY-MM-DD")}&` + `ProviderProjectId=${providerProjectId}&` + `ProviderCostCenterId=${providerCostCenterId}&` + `ProviderLocationId=${providerLocationId}&`;
    // `ProviderRegionId=${providerRegionId}`;
    // Send the request with no body (null body)
    return this.http.post(this.url, null).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      console.log(response);
      return response["result"];
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(error => {
      console.error("Error occurred while fetching stock request details:", error);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.throwError)(() => new Error(error.message));
    }));
  }
  downloadBPReport(id, target) {
    debugger;
    this.url = `${this.baseUrl}PdfReport/${target}?Id=${id}`;
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      return response.result;
    }));
  }
  getItemBudget(budgetDate, costCenterId, toLocation, itemId, projectId) {
    var month = budgetDate.getMonth() + 1;
    var year = budgetDate.getFullYear();
    debugger;
    this.url = this.baseUrl;
    this.url = `${this.baseUrl}InventoryItem/GetMonthlyBudget?ProjectId=${projectId}&CostCenterId=${costCenterId}&LocationId=${toLocation}&BudgetDate=${year + "-" + month}&itemId=${itemId}`;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  getItemNextSerialNumb(CategoryId, SubCategoryId) {
    this.url = this.baseUrl;
    this.url = `${this.baseUrl}InventoryItem/GetCategoryAndSubCategoryWiseCount?CategoryId=${CategoryId}&SubCategoryId=${SubCategoryId}`;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  getLinkedItem(costCenterId, projectId, locationId) {
    this.url = this.baseUrl;
    this.url = `${this.baseUrl}InventoryItemLinking/GetSuggestions?CostCenterId=${costCenterId}&ProjectId=${projectId}`;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  createBuilty(dto, target, id) {
    debugger;
    console.log(dto);
    this.url = this.baseUrl;
    this.url += target + "/UpdateBuiltyDetails";
    return this.http.put(this.url, dto);
  }
  GetVoucherNumber(dto) {
    debugger;
    console.log(dto);
    this.url = this.baseUrl + `${dto.Target}/GetVoucherNumber?Prefix=${dto.Prefix}&IssueDate=${moment__WEBPACK_IMPORTED_MODULE_1__(dto.IssueDate).format("yy-MM-DD")}&UserLocationId=${dto.UserLocationId}`;
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      console.log(response);
      return response["result"];
    }));
  }
  UploadImage(base64Data) {
    debugger;
    console.log(base64Data);
    this.url = this.baseUrl;
    this.url += "EmployeeManagement/UploadImage";
    const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpHeaders({
      "Content-Type": "application/json"
    });
    const payload = base64Data;
    debugger;
    return this.http.post(this.url, payload, {
      headers
    });
    // return this.http.post(this.url, uploadData);
  }
  // getVoucherNumber(
  //   prefix: string,
  //   issueDate: Date,
  //   locationId: number,
  //   target: string
  // ) {
  //   debugger;
  //   this.url = this.baseUrl;
  //   this.url +=
  //     target +
  //     "/GetVoucherNumber?Prefix=" +
  //     prefix +
  //     "&IssueDate=" +
  //     new Date(issueDate).toISOString().slice(0, 10) +
  //     "&UserLocationId=" +
  //     locationId;
  //   return this.http.get(this.url).pipe(
  //     map((response: any) => {
  //       return response["result"];
  //     })
  //   );
  // }
  getVoucherNumber(prefix, issueDate, locationId, target) {
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/GetVoucherNumber?Prefix=" + prefix + "&IssueDate=" + issueDate.toISOString().slice(0, 10) +
    // Convert Date to ISO format
    "&UserLocationId=" + locationId;
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      return response["result"];
    }));
  }
  getTracingRecord(id, target) {
    this.url = this.baseUrl;
    this.url += target + "/TracePurchaseTransactions?Id=" + id;
    return this.http.get(this.url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
      return response["result"];
    }));
  }
  static #_ = this.ɵfac = function SetupsService_Factory(t) {
    return new (t || SetupsService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
    token: SetupsService,
    factory: SetupsService.ɵfac,
    providedIn: "root"
  });
}

/***/ }),

/***/ 2584:
/*!************************************!*\
  !*** ./src/shared/Utials/utils.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatDateToISO: () => (/* binding */ formatDateToISO),
/* harmony export */   isrestrictionAllowed: () => (/* binding */ isrestrictionAllowed),
/* harmony export */   mapDateOrDefault: () => (/* binding */ mapDateOrDefault),
/* harmony export */   mapRestrictionDto: () => (/* binding */ mapRestrictionDto)
/* harmony export */ });
function formatDateToISO(date) {
  const pad = number => (number < 10 ? "0" : "") + number;
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  return `${year}-${month}-${day}`;
}
function mapDateOrDefault(RestrictDate, defaultDate) {
  // var defDate = new Date(defaultDate) >= new Date(RestrictDate);
  // var resDate = new Date(RestrictDate) >= new Date(RestrictDate);
  if (RestrictDate) {
    if (new Date(RestrictDate) >= new Date(defaultDate)) {
      var dateAndTime = new Date(RestrictDate).toISOString();
      return new Date(dateAndTime);
    } else {
      return new Date(defaultDate);
    }
  } else {
    return new Date(defaultDate);
  }
}
function isrestrictionAllowed(dateString, bool) {
  debugger;
  if (dateString) {
    return new Date() >= new Date(dateString) ? true : false;
  } else {
    return false;
  }
}
function mapRestrictionDto(apiResponse) {
  var fY = JSON.parse(localStorage.getItem("FinancialYearObject"));
  debugger;
  var DEFAULT_DATE = "";
  if (fY) {
    fY.startDate;
    DEFAULT_DATE = new Date(fY.startDate).toISOString();
  } else {
    DEFAULT_DATE = new Date("1970-01-01T00:00:00Z").toISOString();
  }
  debugger;
  var restrictionDto = {
    isActive: apiResponse.isActive,
    name: apiResponse.name,
    voucherPrefix: apiResponse.voucherPrefix,
    isCreationAllowed: isrestrictionAllowed(apiResponse.creationRestrictionDate),
    creationRestrictionDate: mapDateOrDefault(apiResponse.creationRestrictionDate, DEFAULT_DATE),
    isEditAllowed: isrestrictionAllowed(apiResponse.editRestrictionDate),
    editRestrictionDate: mapDateOrDefault(apiResponse.editRestrictionDate, DEFAULT_DATE),
    isApprovalAllowed: isrestrictionAllowed(apiResponse.approvalRestrictionDate),
    approvalRestrictionDate: mapDateOrDefault(apiResponse.approvalRestrictionDate, DEFAULT_DATE),
    isUnapprovalAllowed: isrestrictionAllowed(apiResponse.unapprovalRestrictionDate),
    unapprovalRestrictionDate: mapDateOrDefault(apiResponse.unapprovalRestrictionDate, DEFAULT_DATE),
    isRevisionAllowed: isrestrictionAllowed(apiResponse.revisionRestrictionDate),
    revisionRestrictionDate: mapDateOrDefault(apiResponse.revisionRestrictionDate, DEFAULT_DATE)
  };
  return restrictionDto;
}

/***/ })

}]);
//# sourceMappingURL=default-src_app_main_budget_shared_Dtos_restriction-dto_ts-src_app_main_budget_shared_service-01ea67.js.map