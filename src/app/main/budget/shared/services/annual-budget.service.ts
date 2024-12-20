import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AnnualBudgetService {
  constructor(private http: HttpClient) {}

  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  // getAll() {
  //   this.url = this.baseUrl;
  //   this.url += "YearlyBudget/GetAll";
  //   this.url = this.url.replace(/[?&]$/, "");
  //   debugger;
  //   return this.http.get(this.url).pipe(
  //     map((response: any) => {
  //       console.log(response);
  //       return response["result"];
  //     })
  //   );
  // }
  getAll(skipCount?: number, maxCount?: number,DocumentNumber?:string) {
    this.url = this.baseUrl + "YearlyBudget/GetAll";
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
  create(dto: any) {
    console.log(dto);
    debugger;
    this.url = this.baseUrl;
    this.url += "YearlyBudget/AddBudget";
    return this.http.post(this.url, dto);
  }

  approve(id: number) {
    this.url = this.baseUrl;
    this.url += "YearlyBudget/ApproveBudget?yearlyBudgetId=" + id;
    return this.http.post(this.url, null);
  }

  getDataForEdit(id: number) {
    debugger;
    this.url = this.baseUrl;
    this.url += "YearlyBudget/GetForEdit?Id=" + id;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }

  getMaxId(year: number) {
    this.url = this.baseUrl;
    this.url += "YearlyBudget/GetMaxBudgetCount?Year=" + year;
    this.url = this.url.replace(/[?&]$/, "");
    debugger;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  update(dto: any) {
    console.log(dto);
    debugger;
    this.url = this.baseUrl;
    this.url += "YearlyBudget/Edit";
    return this.http.post(this.url, dto);
  }
  VoucherRestriction(dto: any) {
    console.log(dto);
    debugger;
    this.url = this.baseUrl;
    this.url += `VoucherRestriction/GetAll?VoucherPrefix=${dto.VoucherPrefix}`;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  revise(dto: any, newArr: any[], prevArr: any[]) {
    let newDto = {
      isActive: true,
      yearlyBudgetId: dto.budgetId,
      months: dto.months,
      reviseDetails: newArr,
      reviseBudget: prevArr,
    };
    console.log("reviseDTO", newDto);
    debugger;
    this.url = this.baseUrl;
    this.url += "YearlyBudget/ReviseBudget";
    return this.http.post(this.url, newDto);
  }

  getAllAvailableVehicles(
    target: string,
    financialYearId: number,
    UserLocationId: number,
    IsDropdown?: boolean,
    skipCount?: number,
    max?: number
  ) {
    debugger;
    this.url = this.baseUrl;

    this.url += target + "/GetAll";
    debugger;
    if (financialYearId) {
      this.url = this.url + "?FinancialYearId=" + financialYearId;
    }
    if (UserLocationId) {
      this.url = this.url + "&UserLocationId=" + UserLocationId;
    }
    if (IsDropdown) {
      this.url = this.url + "&IsDropdown=true";
    }
    this.url = this.url + "&IsActiveVehicleContract=true";
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }
}
