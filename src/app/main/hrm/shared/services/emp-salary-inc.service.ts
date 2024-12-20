import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";

@Injectable({
  providedIn: "root",
})
export class EmpSalaryIncService {
  constructor(private http: HttpClient) {}

  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  getAll() {
    debugger;
    this.url = this.baseUrl;
    this.url += "SalaryIncrement/GetAllSalaryIncrements?";
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
    this.url = this.baseUrl;
    this.url += "EmployeeSalary/AddSalaryIncrement";
    return this.http.post(this.url, dto);
  }

  getEmployeeSalaryHistory(EmployeeErpId: number) {
    debugger;
    this.url = this.baseUrl;
    this.url += "EmployeeSalary/GetAllSalaryIncrements?ERPId=" + EmployeeErpId;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }

  getAllAllowance() {
    debugger;
    this.url = this.baseUrl;
    this.url += "Allowance/GetAll?MaxResultCount=1000";
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }

  getMasterAllowance(id: number) {
    debugger;
    this.url = this.baseUrl;
    this.url += "EmployeeSalary/GetMasterSalary?ERPId=" + id;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }
  BulkAddSalaryIncrement(dto: any) {
    debugger;
    this.url = this.baseUrl;
    this.url += "EmployeeSalary/BulkAddSalaryIncrement";
    console.log(dto.__zone_symbol__value);
    debugger;
    return this.http.post(this.url, dto.__zone_symbol__value);
  }
}
