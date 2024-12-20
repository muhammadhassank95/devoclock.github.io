import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import * as moment from "@node_modules/moment-timezone";

@Injectable({
  providedIn: "root",
})
export class RestrictionService {
  constructor(private http: HttpClient) {}
  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  getVoucherRestriction(VoucherPrefix: string) {
    this.url +=
      this.baseUrl + "VoucherRestriction/GetAll?VoucherPrefix=" + VoucherPrefix;
    return this.http.get(this.url).pipe(
      map((response: any) => {
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
}
