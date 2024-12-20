import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class IssuanceNoteService {
  constructor(private http: HttpClient) {}

  commonUrl: string = "api/services/app/";
  baseUrl: string = "" + this.commonUrl;

  url: string = "";
  url_: string = "";

  getAll(params?: any) {
    debugger;
    this.url = newBaseUrl + this.baseUrl;
    this.url += "PartIssuanceNote/GetAll?";

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
    this.url += "PartIssuanceNote/Create";
    return this.http.post(this.url, dto);
  }

  delete(id: number) {
    this.url = newBaseUrl + this.baseUrl;
    this.url += "PartIssuanceNote/Delete?Id=" + id;
    return this.http.delete(this.url);
  }

  getDataForEdit(id: number) {
    debugger;
    this.url = newBaseUrl + this.baseUrl;
    this.url += "PartIssuanceNote/GetForEdit?Id=" + id;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }

  ApproveDocument(id: number) {
    debugger;
    this.url = newBaseUrl + this.baseUrl;
    this.url += "PartIssuanceNote/ApproveDocument?Id=" + id;
    return this.http.post(this.url, {});
  }

  update(dto: any) {
    console.log(dto);
    debugger;
    this.url = newBaseUrl + this.baseUrl;
    this.url += "PartIssuanceNote/Edit";
    return this.http.post(this.url, dto);
  }

  getAllInternalReq() {
    debugger;
    this.url = newBaseUrl + this.baseUrl;
    this.url += "InternalPartRequisition/GetAll";
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }

  getDataForEditReq(id: number) {
    debugger;
    this.url = newBaseUrl + this.baseUrl;
    this.url += "InternalPartRequisition/GetForEdit?Id=" + id;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }
}
