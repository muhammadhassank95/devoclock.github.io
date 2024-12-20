import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Observable, map } from "rxjs";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ReportService {
  constructor(private http: HttpClient) {}
  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  getGeneralLedgerReportFilters(
    target: string,
    startDate: string,
    endDate: string,
    fromSupplierId: number,
    toSupplierId: number,
    fromChartOfAccountId: number,
    toChartOfAccountId: number,
    fromProjectId: number,
    toProjectId: number,
    fromCostCenterId: number,
    toCostCenterId: number,
    locationId: number,
    IsDropdown?: boolean,
    skipCount?: number,
    max?: number
  ) {
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
  createReport(target: string) {
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/GenerateReport";
    debugger;
    return this.http.post(this.url, {});
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

  getData(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/Get?Id=" + id;
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
  getRentalInvoiceReport(
    target: string,
    startDate: string,
    endDate: string,
    supplierId: number,
    projectId: number,
    costCenterId: number,
    locationId: number,
    attendanceMonth?: string,
    vehicleId?: number,
    contractTypeId?: number
  ) {
    debugger;
    this.url = `${this.baseUrl}${target}/GenerateVehicleInvoiceReport`;

    let queryParams: string[] = [];
    if (startDate) {
      queryParams.push(`StartDate=${moment(startDate).format("YYYY-MM-DD")}`);
    }
    if (endDate) {
      queryParams.push(`EndDate=${moment(endDate).format("YYYY-MM-DD")}`);
    }
    if (supplierId) {
      queryParams.push(`SupplierId=${supplierId}`);
    }
    if (projectId) {
      queryParams.push(`ProjectId=${projectId}`);
    }
    if (costCenterId) {
      queryParams.push(`CostCenterId=${costCenterId}`);
    }
    if (locationId) {
      queryParams.push(`LocationId=${locationId}`);
    }
    if (attendanceMonth) {
      queryParams.push(
        `AttendanceMonth=${moment(attendanceMonth).format("YYYY-MM-DD")}`
      );
    }
    if (vehicleId) {
      queryParams.push(`VehicleId=${vehicleId}`);
    }
    if (contractTypeId) {
      queryParams.push(`RentalContractTypeId=${contractTypeId}`);
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
  getAllReports(target: string, params?: any) {
    debugger;
    this.url = `${this.baseUrl}PdfReport/${target}?`;
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
      if (params.projectId) {
        searchParams.append("ProjectId", params.projectId.toString());
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
      if (params.costCenterId) {
        searchParams.append("CostCenterId", params.costCenterId.toString());
      }
      if (params.fromSupplierId) {
        searchParams.append("FromSupplierId", params.fromSupplierId.toString());
      }
      if (params.toSupplierId) {
        searchParams.append("ToSupplierId", params.toSupplierId.toString());
      }
      if (params.supplierId) {
        searchParams.append("SupplierId", params.supplierId.toString());
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
      if (params.rentalContractType) {
        searchParams.append(
          "RentalContractType",
          params.rentalContractType.toString()
        );
      }
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
  getDatabaseName(target: string) {
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/GetAttachedDatabaseName";
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }
  sendBackupLocation(target: string, backupLocation: string): Observable<any> {
    debugger;
    const url = `${
      this.baseUrl
    }${target}/PerformSQLBackup?BackupLocation=${encodeURIComponent(
      backupLocation
    )}`;
    return this.http.post(url, {});
  }
}
