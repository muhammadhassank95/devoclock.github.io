import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { map } from "rxjs";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class TaxService {
  constructor(private http: HttpClient) {}

  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  getAll(
    target: string,
    skipCount?: number,
    maxCount?: number,
    voucherNumber?: string
  ) {
    debugger;
    this.url = this.baseUrl + target + "/GetAll";
    const queryParams: string[] = [];
    if (voucherNumber !== undefined) {
      queryParams.push(`voucherNumber=${voucherNumber}`);
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

  create(dto: any) {
    debugger;
    console.log(dto);
    debugger;
    this.url = this.baseUrl;
    this.url += "IncomeTaxDeductionPolicy/Create";
    return this.http.post(this.url, dto);
  }

  delete(id: number) {
    this.url = this.baseUrl;
    this.url += "IncomeTaxDeductionPolicy/Delete?Id=" + id;
    return this.http.delete(this.url);
  }
  Edit(dto) {
    debugger;
    this.url = this.baseUrl;
    this.url += "IncomeTaxDeductionPolicy/Edit";
    console.log(dto);
    return this.http.post(this.url, dto);
  }
  getDataForEdit(id: number) {
    debugger;
    this.url = this.baseUrl;
    this.url += "IncomeTaxDeductionPolicy/GetForEdit?Id=" + id;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }
  approveDocument(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/ApproveDocument?Id=" + id;
    return this.http.post(this.url, {});
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
}
