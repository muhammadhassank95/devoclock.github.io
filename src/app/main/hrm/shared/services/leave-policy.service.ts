import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { LeavePolicy } from "../DTOs/leave-policy";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class LeavePolicyService {
  constructor(private http: HttpClient) {}

  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  getAll(
    target: string,
    skipCount?: number,
    maxCount?: number,
    VoucherNumber?: string
  ) {
    debugger;
    this.url = this.baseUrl + target + "/GetAll";
    const queryParams: string[] = [];
    if (VoucherNumber !== undefined) {
      queryParams.push(`VoucherNumber=${VoucherNumber}`);
    }
    if (skipCount !== undefined) {
      queryParams.push(`SkipCount=${skipCount}`);
    }

    if (maxCount !== undefined) {
      queryParams.push(`MaxResultCount=${maxCount}`);
    }

    if (queryParams.length) {
      this.url += `?${queryParams.join("&")}`;
    }

    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }

  getDataForEdit(id: number) {
    debugger;
    this.url = this.baseUrl;
    this.url += "LeavePolicy/GetForEdit?Id=" + id;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }

  create(dto: LeavePolicy) {
    debugger;

    // else if (dto.departmentId) {
    //     target = dto.departmentId
    // } else if (dto.gradeId) {
    //     target = dto.gradeId
    // } else if (dto.empTypeId) {
    //     target = dto.empTypeId
    // }

    var newObj = {
      title: dto.title,
      issueDate: dto.issueDate,
      voucherNumber: dto.voucherNumber,
      userLocationId: dto.userLocationId,
      userLocationName: dto.userLocationName,
      willEffectFromDate: dto.willEffectFromDate,
      leavePolicyDetails: dto.leavePolicyDetails,
    };

    this.url = this.baseUrl;
    this.url += "LeavePolicy/Create";
    console.log(newObj);
    return this.http.post(this.url, newObj);
  }
  edit(dto: LeavePolicy) {
    debugger;

    var updatedObj = {
      id: dto.id,
      title: dto.title,
      willEffectFromDate: dto.willEffectFromDate,
      issueDate: dto.issueDate,
      userLocationId: dto.userLocationId,
      userLocationName: dto.userLocationName,
      voucherNumber: dto.voucherNumber,
      leavePolicyDetails: dto.leavePolicyDetails,
    };

    this.url = this.baseUrl;
    this.url += "LeavePolicy/Edit";
    console.log(updatedObj);
    return this.http.post(this.url, updatedObj);
  }

  delete(id: number) {
    debugger;
    this.url = this.baseUrl;
    this.url += "LeavePolicy/Delete?Id=" + id;
    return this.http.delete(this.url);
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
  approveDocument(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/ApproveDocument?Id=" + id;
    return this.http.post(this.url, {});
  }
}
