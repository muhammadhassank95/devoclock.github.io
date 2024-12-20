import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { catchError, map, throwError } from "rxjs";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class InternalPartRecquService {
  constructor(private http: HttpClient) {}

  commonUrl: string = "api/services/app/";
  baseUrl: string = "" + this.commonUrl;

  url: string = "";
  url_: string = "";

  getAll(params?: any) {
    debugger;
    this.url = newBaseUrl + this.baseUrl;
    this.url += "InternalPartRequisition/GetAll?";

    const searchParams = new URLSearchParams();
    if (params.name) {
      searchParams.append("name", params.name.toString());
    }
    if (params.DocOrVocNumber) {
      searchParams.append("VoucherNumber", params.DocOrVocNumber.toString());
    }
    if (params.maxCount) {
      searchParams.append("MaxResultCount", params.maxCount.toString());
    }
    if (params.skipCount) {
      searchParams.append("SkipCount", params.skipCount.toString());
    }

    debugger;
    // Construct the final URL
    this.url += searchParams.toString();
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }

  create(dto: any) {
    console.log(dto);
    debugger;
    this.url = newBaseUrl + this.baseUrl;
    this.url += "InternalPartRequisition/Create";
    return this.http.post(this.url, dto);
  }

  delete(id: number) {
    this.url = newBaseUrl + this.baseUrl;
    this.url += "InternalPartRequisition/Delete?Id=" + id;
    return this.http.delete(this.url);
  }

  getDataForEdit(id: number) {
    debugger;
    this.url = newBaseUrl + this.baseUrl;
    this.url += "InternalPartRequisition/GetForEdit?Id=" + id;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }

  getMaxCount(date: Date, locationId) {
    debugger;
    this.url = newBaseUrl + this.baseUrl;
    this.url += `InternalPartRequisition/GetMaxCount?LocationId=${locationId}&IssueDate=${moment(
      date
    ).format("yy-MM-DD")}`;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        debugger;
        return response["result"];
      })
    );
  }

  ApproveDocument(id: number) {
    this.url = newBaseUrl + this.baseUrl;
    this.url += "InternalPartRequisition/ApproveDocument?Id=" + id;
    return this.http.post(this.url, {});
  }

  update(dto: any) {
    console.log(dto);
    debugger;
    this.url = newBaseUrl + this.baseUrl;
    this.url += "InternalPartRequisition/Edit";
    return this.http.post(this.url, dto);
  }

  getStockDetails(
    itemId: number,
    locationId: number,
    costCenterId: number,
    projectId: number
  ) {
    this.url = newBaseUrl + this.baseUrl;
    this.url = `${this.url}InventoryRequisition/GetStockDetails?ItemId=${itemId}&LocationId=${locationId}&CostCenterId=${costCenterId}&ProjectId=${projectId}`;

    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  GetEmployeeLedgerCount(
    itemId: number,
    locationId: number,
    costCenterId: number,
    projectId: number,
    employeeId: number
  ) {
    this.url = newBaseUrl + this.baseUrl;
    this.url = `${this.url}InternalPartRequisition/GetEmployeeLedgerCount?ItemId=${itemId}&LocationId=${locationId}&CostCenterId=${costCenterId}&ProjectId=${projectId}&EmployeeId=${employeeId}`;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  getLinkedItem(
    costCenterId: number,
    projectId: number,
    userLocationId: number
  ) {
    this.url = newBaseUrl + this.baseUrl;
    this.url = `${this.url}InventoryItemLinking/GetSuggestions?CostCenterId=${costCenterId}&ProjectId=${projectId}&LocationId=${userLocationId}`;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  fetchStockRequestDetails(
    employeeId: number,
    itemId: number,
    projectId: number,
    costCenterId: number,
    locationId: number
    // regionId: number
  ) {
    this.url =
      `${newBaseUrl}${this.baseUrl}InternalPartRequisition/RetrieveStockForEmployeeAndWarehouse?` +
      `EmployeeId=${employeeId}&` +
      `ItemId=${itemId}&` +
      `ProjectId=${projectId}&` +
      `CostCenterId=${costCenterId}&` +
      `LocationId=${locationId}&`;
    // `RegionId=${regionId}`;

    // Send the request with no body (null body)
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      }),
      catchError((error) => {
        console.error(
          "Error occurred while fetching stock request details:",
          error
        );
        return throwError(() => new Error(error.message));
      })
    );
  }
}
