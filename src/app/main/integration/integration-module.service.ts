import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, map } from "rxjs";
import { newBaseUrl } from "../../../shared/AppBaseURL/appBaseURL";

@Injectable({
  providedIn: "root",
})
export class IntegrationModuleService {
  constructor(private http: HttpClient) { }

  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  getAll(target: string, skipCount: number, maxCount: number) {
    this.url = `${this.baseUrl}${target}/GetAll?SkipCount=${skipCount}&MaxResultCount=${maxCount}`;

    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  create(dto: any, target: string) {
    console.log(dto);
    this.url = this.baseUrl;
    this.url += target + "/Create";
    return this.http.post(this.url, dto);
  }

  delete(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/Delete?Id=" + id;
    return this.http.delete(this.url);
  }

  approve(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/Approve?Id=" + id;
    return this.http.post(this.url, {});
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

  markChequeAsCancelled(id: number, target: string): Observable<any> {
    this.url = this.baseUrl;
    this.url += target + "/MarkChequeAsCancelled?id=" + id;
    return this.http.post(this.url, { id });
  }
}
