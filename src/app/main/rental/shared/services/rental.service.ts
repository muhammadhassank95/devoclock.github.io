import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { catchError, map, throwError } from "rxjs";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class RentalService {
  constructor(private http: HttpClient) {}
  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

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

  getAll(target: string, skipCount?: number, maxCount?: number) {
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
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }
  getAllRecord(target: string, params?: any) {
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
    return this.http.post(this.url, dto);
  }

  delete(id: number, target: string) {
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/Delete?Id=" + id;
    return this.http.delete(this.url);
  }
  CloseDocument(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/MarkContractAsCancelled?Id=" + id;
    return this.http.post(this.url, id);
  }

  getDataForEdit(id: number, target: string) {
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
      this.url += `IssueDate=${moment(IssueDate).format("yy-MM-DD")}&`;
    }
    debugger;
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
  Approve(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/ApproveDocument?Id=" + id;
    return this.http.post(this.url, {});
  }
  GetAvailableVehicles(
    attendanceDate: string,
    locationId: number,
    costCenterId: number,
    target: string
  ) {
    debugger;
    this.url = this.baseUrl;
    this.url +=
      target +
      "/GetAvailableVehicles?AttendanceDate=" +
      moment(attendanceDate).format("YYYY-MM-DD") +
      "&LocationId=" +
      locationId +
      "&CostCenterId=" +
      costCenterId;

    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }

  GetVehiclesAttendance(AttendanceMonth: string, target: string) {
    debugger;
    this.url = this.baseUrl;
    this.url +=
      target +
      "/GetVehiclesAttendance?AttendanceMonth=" +
      moment(AttendanceMonth).format("YYYY-MM-DD");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }

  GetHouseRentDetails(InvoiceMonth: string, target: string) {
    debugger;
    this.url = this.baseUrl;
    this.url +=
      target +
      "/GenerateInvoiceDetailsForHouse?InvoiceDate=" +
      moment(InvoiceMonth).format("YYYY-MM-DD");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }

  getVoucherNumber(
    prefix: string,
    IssueDate: string,
    locationId: number,
    target: string
  ) {
    debugger;
    this.url = this.baseUrl;
    this.url +=
      target +
      "/GetVoucherNumber?Prefix=" +
      prefix +
      "&IssueDate=" +
      new Date(IssueDate).toISOString().slice(0, 10) +
      "&UserLocationId=" +
      locationId;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }
}
