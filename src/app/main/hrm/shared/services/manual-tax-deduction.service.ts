import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ManualTaxDeductionService {
  constructor(private http: HttpClient) {}

  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  getAll() {
    debugger;
    this.url = this.baseUrl;
    this.url += "TaxDeductionManual/GetAll?";
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
    this.url += "TaxDeductionManual/Create";
    return this.http.post(this.url, dto);
  }

  delete(id: number) {
    this.url = this.baseUrl;
    this.url += "TaxDeductionManual/Delete?Id=" + id;
    return this.http.delete(this.url);
  }
  Edit(dto, target: string) {
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/Edit";
    console.log(dto);
    return this.http.post(this.url, dto);
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
}
