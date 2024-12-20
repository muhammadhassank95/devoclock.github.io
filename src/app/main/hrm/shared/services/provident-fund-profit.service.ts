import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { Observable } from "rxjs";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class ProvidentFundProfitService {
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
    if (skipCount !== undefined) {
      queryParams.push(`SkipCount=${skipCount}`);
    }

    if (VoucherNumber !== undefined) {
      queryParams.push(`VoucherNumber=${VoucherNumber}`);
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
    console.log(dto);
    debugger;
    this.url = this.baseUrl;
    this.url += "ProvidentFundProfitContribution/Create";
    return this.http.post(this.url, dto);
  }

  Edit(dto: any) {
    debugger;
    this.url = this.baseUrl;
    this.url += "ProvidentFundProfitContribution/Edit";
    console.log(dto);
    return this.http.post(this.url, dto);
  }
  delete(id: number) {
    this.url = this.baseUrl;
    this.url += "ProvidentFundProfitContribution/Delete?Id=" + id;
    return this.http.delete(this.url);
  }

  getDataForEdit(id: number) {
    debugger;
    this.url = this.baseUrl;
    this.url += "ProvidentFundProfitContribution/GetForEdit?Id=" + id;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }

  getBalance(StartDate: Date, EndDate: Date, id: number) {
    debugger;
    this.url = this.baseUrl + "ProvidentFundProfitContribution/GetProfit";

    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
      const day = ("0" + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    };

    let params = new HttpParams()
      .set("StartDate", formatDate(StartDate))
      .set("EndDate", formatDate(EndDate))
      .set("EmployeeId", id.toString());

    return this.http.get(this.url, { params: params }).pipe(
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
