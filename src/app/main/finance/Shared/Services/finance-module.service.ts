import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { Observable, map } from "rxjs";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class FinanceModuleService {
  constructor(private http: HttpClient) {}

  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  // getAll(target: string, params?: any) {
  //   debugger;
  //   this.url = this.baseUrl + target + `/GetAll?`;

  //   if (params?.FromChartOfAccountId) {
  //     this.url += `FromChartOfAccountId=${params.FromChartOfAccountId}&`;
  //   }
  //   if (params?.ToChartOfAccountId) {
  //     this.url += `ToChartOfAccountId=${params.ToChartOfAccountId}&`;
  //   }
  //   if (params?.startDate) {
  //     this.url += `StartDate=${params.startDate}&`;
  //   }
  //   if (params?.endDate) {
  //     this.url += `EndDate=${params.endDate}&`;
  //   }
  //   if (params?.projectTo) {
  //     this.url += `ToProjectId=${params.projectTo}&`;
  //   }
  //   if (params?.projectFrom) {
  //     this.url += `FromProjectId=${params.projectFrom}&`;
  //   }
  //   if (params?.empIdFrom) {
  //     this.url += `FromEmployeeId=${params.empIdFrom}&`;
  //   }
  //   if (params?.empIdTo) {
  //     this.url += `ToEmployeeId=${params.empIdTo}&`;
  //   }
  //   if (params?.costCenterFrom) {
  //     this.url += `FromCostCenterId=${params.costCenterFrom}&`;
  //   }
  //   if (params?.costCenterTo) {
  //     this.url += `ToCostCenterId=${params.costCenterTo}&`;
  //   }
  //   if (params?.FromSupplierId) {
  //     this.url += `FromSupplierId=${params.FromSupplierId}&`;
  //   }
  //   if (params?.ToSupplierId) {
  //     this.url += `ToSupplierId=${params.ToSupplierId}&`;
  //   }
  //   this.url += `MinDaysAgo=${params?.MinDaysAgo ?? 0}&`;
  //   this.url += `MaxDaysAgo=${params?.MaxDaysAgo ?? 0}&`;
  //   this.url = this.url.endsWith("&") ? this.url.slice(0, -1) : this.url;
  //   debugger;
  //   // LocationId=${params.locationId}&ToCostCenterId=${params.ToCostCenterId}&
  //   return this.http.get(this.url).pipe(
  //     map((response: any) => {
  //       console.log(response);
  //       return response["result"];
  //     })
  //   );
  // }

  getAll(target: string, params?: any) {
    debugger;
    this.url = `${this.baseUrl}${target}/GetAll?`;
    const searchParams = new URLSearchParams();
    if (params) {
      if (params.fromChartOfAccountId) {
        searchParams.append(
          "FromChartOfAccountId",
          params.fromChartOfAccountId.toString()
        );
      }
      if (params.toChartOfAccountId) {
        searchParams.append(
          "ToChartOfAccountId",
          params.toChartOfAccountId.toString()
        );
      }
      if (params.startDate) {
        searchParams.append(
          "StartDate",
          moment(params.startDate).format("YYYY-MM-DD")
        );
      }
      if (params.endDate) {
        searchParams.append(
          "EndDate",
          moment(params.endDate).format("YYYY-MM-DD")
        );
      }
      if (params.status) {
        searchParams.append("Status", params.status.toString());
      }
      if (params.toProjectId) {
        searchParams.append("ToProjectId", params.toProjectId.toString());
      }
      if (params.fromProjectId) {
        searchParams.append("FromProjectId", params.fromProjectId.toString());
      }
      // if (params.regionId) {
      //   searchParams.append("RegionId", params.regionId.toString());
      // }
      if (params.showUnreconciledReceipts) {
        searchParams.append(
          "ShowUnreconciledReceipts",
          params.showUnreconciledReceipts
        );
      }
      if (params.fromEmployeeId) {
        searchParams.append("FromEmployeeId", params.fromEmployeeId.toString());
      }
      if (params.toEmployeeId) {
        searchParams.append("ToEmployeeId", params.toEmployeeId.toString());
      }
      if (params.fromCostCenterId) {
        searchParams.append(
          "FromCostCenterId",
          params.fromCostCenterId.toString()
        );
      }
      if (params.toCostCenterId) {
        searchParams.append("ToCostCenterId", params.toCostCenterId.toString());
      }
      if (params.fromSupplierId) {
        searchParams.append("FromSupplierId", params.fromSupplierId.toString());
      }
      if (params.toSupplierId) {
        searchParams.append("ToSupplierId", params.toSupplierId.toString());
      }
      if (params.fromClientId) {
        searchParams.append("FromSupplierId", params.fromClientId.toString());
      }
      if (params.toClientId) {
        searchParams.append("ToSupplierId", params.toClientId.toString());
      }
      if (params.fromPattyId) {
        searchParams.append("FromSupplierId", params.fromPattyId.toString());
      }
      if (params.toPattyId) {
        searchParams.append("ToSupplierId", params.toPattyId.toString());
      }
      if (params.maxCount) {
        searchParams.append("MaxResultCount", params.maxCount.toString());
      }
      if (params.isDropdown) {
        searchParams.append("isDropdown", params.isDropdown);
      }
      if (params.DocOrVocNumber) {
        searchParams.append("VoucherNumber", params.DocOrVocNumber.toString());
      }
      if (params.skipCount) {
        searchParams.append("SkipCount", params.skipCount.toString());
      }
      if (params.linkedDocument) {
        searchParams.append("LinkedDocument", params.linkedDocument.toString());
      }
      // Append MinDaysAgo and MaxDaysAgo, ensuring they have values
      searchParams.append("MinDaysAgo", (params.minDaysAgo ?? 0).toString());
      searchParams.append("MaxDaysAgo", (params.maxDaysAgo ?? 0).toString());
    }
    debugger;
    // Construct the final URL
    this.url += searchParams.toString();
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  getAllFuelReq(target: string, id: any) {
    debugger;
    this.url = `${this.baseUrl}${target}/GetAll?SupplierId=${id}`;
    debugger;
    // Construct the final URL
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  getAllCheackRe(target: string, params?: any) {
    this.url = this.baseUrl;
    this.url +=
      target +
      `/GetAll?FromChartOfAccountId=${
        params.FromChartOfAccountId
      }&ToChartOfAccountId=${params.ToChartOfAccountId}&
      StartDate=${params.startDate}&EndDate=${params.endDate}&
      ToProjectId=${params.projectTo}&FromProjectId=${params.projectFrom}&
      FromCostCenterId=${params.costCenterFrom}&ToCostCenterId=${
        params.costCenterTo
      }&
      FromSupplierId=${params.suppIdFrom}&ToSupplierId=${params.suppIdTo}&
      
      MinDaysAgo=${params.MinDaysAgo ?? 0}&MaxDaysAgo=${params.MaxDaysAgo ?? 0}&
      `;
    debugger;
    // LocationId=${params.locationId}&ToCostCenterId=${params.ToCostCenterId}&
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  create(dto: any, target: string) {
    debugger;
    console.log(dto);
    this.url = this.baseUrl;
    this.url += target + "/Create";
    debugger;
    return this.http.post(this.url, dto);
  }

  delete(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/Delete?Id=" + id;
    return this.http.delete(this.url);
  }

  approve(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/ApproveDocument?Id=" + id;
    return this.http.post(this.url, {});
  }

  getDataForEdit(id: number, target: string) {
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/GetForEdit?Id=" + id;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }
  downloadBPReport(id: number, target: string) {
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/GenerateBankPaymentReport?Id=" + id;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }
  downloadReportByClickGL(id: number, target: string) {
    debugger;
    this.url = this.baseUrl;
    this.url += target + "?Id=" + id;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }
  getData(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/Get?Id=" + id;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }

  GenerateCashBookReport(voucherNumber: string, target: string) {
    this.url = this.baseUrl;
    this.url +=
      target +
      `/PdfReport/GenerateCashBookReport?voucherNumber=${voucherNumber}`;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }

  update(dto: any, target: string) {
    debugger;
    console.log(dto);
    this.url = this.baseUrl;
    this.url += target + "/Edit";
    return this.http.post(this.url, dto);
  }

  updateReconciliation(dto: any, target: string) {
    debugger;
    console.log(dto);
    this.url = this.baseUrl;
    this.url += target + "/UpdateReconciliation";
    return this.http.put(this.url, dto);
  }

  markChequeAsCancelled(id: number, target: string): Observable<any> {
    this.url = this.baseUrl;
    this.url += target + "/MarkChequeAsCancelled?id=" + id;
    return this.http.post(this.url, { id });
  }
  markBookAsCancelled(id: number, target: string): Observable<any> {
    this.url = this.baseUrl;
    this.url += target + "/MarkBookAsCancelled?id=" + id;
    return this.http.post(this.url, { id });
  }

  getVoucherNumber(
    target: string,
    prefix: string,
    issueDate: Date | string,
    userLocationId: number
  ) {
    this.url = this.baseUrl;
    this.url +=
      target +
      "/GetVoucherNumber" +
      `?prefix=${prefix}&issueDate=${moment(issueDate).format(
        "YYYY-MM-DD"
      )}&userLocationId=${userLocationId}`;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }
  createBulkVouchers(
    target: string,
    chequeNumberStart?: string,
    chequeNumberEnd?: string,
    isLineSeparateVoucher?: boolean,
    bodyData?: any
  ) {
    debugger;
    this.url = this.baseUrl + target + "/CreateBulk";

    // Define the query parameters
    let params = new HttpParams()
      .set("ChequeNumberStart", chequeNumberStart)
      .set("ChequeNumberEnd", chequeNumberEnd)
      .set("IsLineSeparateVoucher", isLineSeparateVoucher.toString()); // Convert boolean to string

    // Send the request with query parameters
    return this.http.post(this.url, bodyData, { params }).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }

  getDefaultLocation(target: string, id: string) {
    this.url = this.baseUrl;
    this.url += `${target}/GetAll?`;

    if (id !== undefined) {
      this.url += `Id=${id}&`;
    }

    this.url = this.url.endsWith("&") ? this.url.slice(0, -1) : this.url;
    this.url = this.url.endsWith("?") ? this.url.slice(0, -1) : this.url;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  getAllGeneralLedger(target: string, fromCOAId: number, toCOAId?: number) {
    debugger;
    this.url = this.baseUrl;
    this.url +=
      target +
      "/GetAll?FromChartOfAccountId=" +
      fromCOAId +
      "&ToChartOfAccountId=" +
      toCOAId;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }

  GetAllGroupedVouchers(target: string, fromCOAId?: number, toCOAId?: number) {
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/GetAllGroupedData";
    // "/GetAll?FromChartOfAccountId=" +
    // fromCOAId +
    // "&ToChartOfAccountId=" +
    // toCOAId;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }
  getAllGeneralLedgerForSupplier(target: string, supplierId: number) {
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/GetAll?SupplierId=" + supplierId;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }
  getAllGeneralLedgerGroupedData(
    target: string,
    supplierId: number,
    filterByServiceQuotationInvoices: boolean = true
  ) {
    debugger;
    this.url = `${this.baseUrl}${target}/GetAllGroupedData?SupplierId=${supplierId}&FilterByServiceQuotationInvoices=${filterByServiceQuotationInvoices}`;

    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }

  getAllBankReconcilation(
    target: string,
    chartOfAccountId: number,
    startDate?: Date,
    finishDate?: Date
  ) {
    debugger;
    this.url = this.baseUrl;
    this.url +=
      target +
      `/GetAll?StartDate=${moment(startDate).format(
        "YYYY-MM-DD"
      )}&EndDate=${moment(finishDate).format("YYYY-MM-DD")}
      &ChartOfAccountId=${chartOfAccountId}
      &IsDropdown=true
      `;
    debugger;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }
  getRequetDetails(
    target: string,
    vehicleId: number,
    projectId: number,
    costCenterId: number,
    regionId: number,
    locationId: number,
    date: string
  ) {
    debugger;
    this.url = this.baseUrl;
    this.url +=
      target +
      `/FetchFuelRequestDetails?VehicleId=${vehicleId}
      &ProjectId=${projectId}
      &CostCenterId=${costCenterId}
      &RegionId=${regionId}
      &LocationId=${locationId}
      &ConsmptionMonth=${moment(date).format("YYYY-MM")}
      `;
    debugger;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }
  getGeneralLedgerReportFilters(
    target: string,
    startDate?: string,
    endDate?: string,
    fromSupplierId?: number,
    toSupplierId?: number,
    fromClientId?: number,
    toClientId?: number,
    fromPattyId?: number,
    toPattyId?: number,
    fromChartOfAccountId?: number,
    toChartOfAccountId?: number,
    fromProjectId?: number,
    toProjectId?: number,
    fromCostCenterId?: number,
    toCostCenterId?: number,
    locationId?: number,
    fromEmployeeId?: string,
    toEmployeeId?: string,
    // regionId?: number,
    status?: string,
    IsDropdown?: boolean,
    skipCount?: number,
    max?: number
  ) {
    debugger;
    debugger;
    this.url = `${this.baseUrl}${target}/GenerateGeneralLedgerReport`;

    let queryParams: string[] = [];
    // if (voucherNumber) {
    //   queryParams.push(`VoucherNumber=${voucherNumber}`);
    // }
    if (startDate) {
      queryParams.push(`StartDate=${moment(startDate).format("YYYY-MM-DD")}`);
    }
    if (endDate) {
      queryParams.push(`EndDate=${moment(endDate).format("YYYY-MM-DD")}`);
    }
    if (fromSupplierId) {
      queryParams.push(`FromSupplierId=${fromSupplierId}`);
    }
    if (toSupplierId) {
      queryParams.push(`ToSupplierId=${toSupplierId}`);
    }
    if (fromClientId) {
      queryParams.push(`FromSupplierId=${fromClientId}`);
    }
    if (toClientId) {
      queryParams.push(`ToSupplierId=${toClientId}`);
    }
    if (fromPattyId) {
      queryParams.push(`FromSupplierId=${fromPattyId}`);
    }
    if (toPattyId) {
      queryParams.push(`ToSupplierId=${toPattyId}`);
    }
    if (fromChartOfAccountId) {
      queryParams.push(`FromChartOfAccountId=${fromChartOfAccountId}`);
    }
    if (toChartOfAccountId) {
      queryParams.push(`ToChartOfAccountId=${toChartOfAccountId}`);
    }
    if (fromProjectId) {
      queryParams.push(`FromProjectId=${fromProjectId}`);
    }
    if (toProjectId) {
      queryParams.push(`ToProjectId=${toProjectId}`);
    }
    if (fromCostCenterId) {
      queryParams.push(`FromCostCenterId=${fromCostCenterId}`);
    }
    if (toCostCenterId) {
      queryParams.push(`ToCostCenterId=${toCostCenterId}`);
    }
    if (locationId) {
      queryParams.push(`LocationId=${locationId}`);
    }
    if (fromEmployeeId) {
      queryParams.push(`FromEmployeeId=${fromEmployeeId}`);
    }
    if (toEmployeeId) {
      queryParams.push(`ToEmployeeId=${toEmployeeId}`);
    }
    // if (regionId) {
    //   queryParams.push(`RegionId=${regionId}`);
    // }
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

    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }
  getSubledgerTitle(id: any) {
    debugger;
    this.url = `${this.baseUrl}ChartOfAccountSubLedger/GetAll?id=${id}`;
    debugger;
    // Construct the final URL
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }
}
