import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MonthlyBudgetService {
  constructor(private http: HttpClient) {}

  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  getMaxId(Id: number) {
    this.url = this.baseUrl;
    this.url += "MonthlyBudget/GetMaxBudgetCount?Id=" + Id;
    this.url = this.url.replace(/[?&]$/, "");
    debugger;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  // getAll() {
  //     this.url = this.baseUrl;
  //     this.url += "MonthlyBudget/GetAll";
  //     debugger;
  //     return this.http.get(this.url).pipe(
  //         map((response: any) => {
  //             console.log(response);
  //             return response["result"];
  //         })
  //     );
  // }
  getAll(skipCount?: number, maxCount?: number, DocumentNumber?: string) {
    this.url = this.baseUrl + "MonthlyBudget/GetAll";
    const queryParams: string[] = [];
    if (DocumentNumber !== undefined) {
      queryParams.push(`DocumentNumber=${DocumentNumber}`);
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

    debugger;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }
  Approve(id: number) {
    this.url = this.baseUrl;
    this.url += "MonthlyBudget/ApproveBudget?Id=" + id;
    debugger;
    return this.http.post(this.url, {}).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  create(dto: any) {
    debugger;
    let object = {
      title: dto.narration,
      yearlyBudgetId: dto.yearlyBudgetId,
      documentNumber: dto.documentNumber,
      month: dto.month,
      budgetDetails: dto.budgetDetails,
      id: dto.id,
    };
    console.log(object);
    debugger;
    this.url = this.baseUrl;
    this.url += "MonthlyBudget/AddOrUpdateBudget";
    return this.http.post(this.url, object);
  }
  ReviseMonthlyBudget(dto: any) {
    console.log(dto);
    debugger;
    this.url = this.baseUrl;
    this.url += "MonthlyBudget/ReviseBudget?Id=" + dto.id;
    return this.http.post(this.url, dto.reviseObject);
  }

  getDataForEdit(id: number) {
    debugger;
    this.url = this.baseUrl;
    this.url += "MonthlyBudget/GetForEdit?Id=" + id;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }
}
