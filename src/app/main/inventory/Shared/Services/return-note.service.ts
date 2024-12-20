import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ReturnNoteService {
  constructor(private http: HttpClient) {}

  commonUrl: string = "api/services/app/";
  baseUrl: string = "" + this.commonUrl;

  url: string = "";
  url_: string = "";

  getAll(params?: any) {
    debugger;
    this.url = newBaseUrl + this.baseUrl;
    this.url += "PartReturnNote/GetAll?";

    const searchParams = new URLSearchParams();
    if (params) {
      if (params.DocOrVocNumber) {
        searchParams.append("VoucherNumber", params.DocOrVocNumber.toString());
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
        debugger;
        return response["result"];
      })
    );
  }

  create(dto: any) {
    console.log(dto);
    debugger;
    this.url = newBaseUrl + this.baseUrl;
    this.url += "PartReturnNote/Create";
    return this.http.post(this.url, dto);
  }

  approve(id: any) {
    debugger;
    this.url = newBaseUrl + this.baseUrl;
    this.url += "PartReturnNote/approve?id=" + id;
    return this.http.post(this.url, {});
  }

  delete(id: number) {
    this.url = newBaseUrl + this.baseUrl;
    this.url += "PartReturnNote/Delete?Id=" + id;
    return this.http.delete(this.url);
  }

  getDataForEdit(id: number) {
    debugger;
    this.url = newBaseUrl + this.baseUrl;
    this.url += "PartReturnNote/GetForEdit?Id=" + id;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }

  Approve(id: number) {
    debugger;
    this.url = newBaseUrl + this.baseUrl;
    this.url += "PartReturnNote/Approve?Id=" + id;
    return this.http.post(this.url, {});
  }

  update(dto: any) {
    console.log(dto);
    debugger;
    this.url = newBaseUrl + this.baseUrl;
    this.url += "PartReturnNote/Edit";
    return this.http.post(this.url, dto);
  }

  getAllIssuanceNote() {
    debugger;
    this.url = newBaseUrl + this.baseUrl;
    this.url += "PartIssuanceNote/GetAll";
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }
  getDataForEditIssuanceNote(id: number) {
    debugger;
    this.url = newBaseUrl + this.baseUrl;
    this.url +=
      "PartIssuanceNote/GetForEdit?Id=" + id + "&RefreshStockDetails=true";
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }
}
