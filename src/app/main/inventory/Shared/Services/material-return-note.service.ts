import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { catchError, map, throwError } from "rxjs";

import { VoucherDto } from "./../DTOs/material-return-note";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class MaterialReturnNoteService {
  constructor(private http: HttpClient) {}

  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  // getAll(target: string, IsDropdown?: boolean) {
  //     this.url = this.baseUrl;

  //     this.url += target + "/GetAll";
  //     debugger

  //     if (IsDropdown) {
  //         this.url = this.url + "?IsDropdown=true"
  //     }
  //     return this.http.get(this.url).pipe(
  //         map((response: any) => {
  //             console.log(response);
  //             return response["result"];
  //         })
  //     );
  // }

  getAll(target: string, params?: any) {
    debugger;
    this.url = `${this.baseUrl}${target}/GetAll?`;
    const searchParams = new URLSearchParams();
    if (params) {
      if (params.userLocationId) {
        searchParams.append("LocationId", params.userLocationId.toString());
      }
      if (params.voucherNumber) {
        searchParams.append("VoucherNumber", params.voucherNumber.toString());
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
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  getAllInspactions(
    target: string,
    CostCenterId?: number,
    ProjectId?: number,
    EmployeeId?: number
  ) {
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

    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  create(dto: any, target: string) {
    console.log(dto);
    dto.issueDate = moment(dto.issueDate).format("yy-MM-DD");
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/Create";
    return this.http.post(this.url, dto);
  }
  update(dto: any, target: string) {
    console.log(dto);
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/Edit";
    return this.http.post(this.url, dto);
  }

  delete(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/Delete?Id=" + id;
    return this.http.delete(this.url);
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

  GetVoucherNumber(dto: VoucherDto) {
    debugger;
    console.log(dto);
    this.url =
      this.baseUrl +
      `${dto.Target}/GetVoucherNumber?Prefix=${dto.Prefix}&IssueDate=${moment(
        dto.IssueDate
      ).format("yy-MM-DD")}&UserLocationId=${dto.UserLocationId}`;
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
    this.url += target + "/Approve?Id=" + id;
    return this.http.post(this.url, {});
  }
}
