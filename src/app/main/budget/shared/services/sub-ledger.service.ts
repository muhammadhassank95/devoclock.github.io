import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { hasSubscribers } from "diagnostics_channel";

@Injectable({
  providedIn: "root",
})
export class SubLedgerService {
  constructor(private http: HttpClient) {}
  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  getAll(
    target: string,
    skipCount?: number,
    maxCount?: number,
    IsDropdown?: boolean,
    HasSubLedger?: boolean
  ) {
    let url = this.baseUrl + target + `/GetAll?`;
    const params = [];

    if (skipCount !== undefined) params.push(`SkipCount=${skipCount}`);
    if (maxCount !== undefined) params.push(`MaxResultCount=${maxCount}`);
    if (IsDropdown !== undefined) params.push(`IsDropdown=${IsDropdown}`);
    if (HasSubLedger !== undefined) params.push(`HasSubLedger=${HasSubLedger}`);
    url += params.join("&");
    debugger;
    return this.http.get(url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  getAllSupplier(
    target: string,
    skipCount?: number,
    maxCount?: number,
    IsDropdown?: boolean,
    ChartOfAccountId?: string
  ) {
    let url = this.baseUrl + target + `/GetAll?`;
    const params = [];

    if (skipCount !== undefined) params.push(`SkipCount=${skipCount}`);
    if (maxCount !== undefined) params.push(`MaxResultCount=${maxCount}`);
    if (IsDropdown !== undefined) params.push(`IsDropdown=${IsDropdown}`);
    if (ChartOfAccountId !== undefined)
      params.push(`ChartOfAccountId=${ChartOfAccountId}`);
    url += params.join("&");
    debugger;
    return this.http.get(url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  create(dto: any, target: string) {
    console.log(dto);
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/Create";
    return this.http.post(this.url, dto);
  }

  GetDocMaxCount(target, ChartOfAccountId: number) {
    this.url = this.baseUrl;
    this.url += `${target}/GetMaxCount?ChartOfAccountId=${ChartOfAccountId}`;
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

  update(dto: any, target: string) {
    console.log(dto);
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/Edit";
    return this.http.post(this.url, dto);
  }
}
