import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import {
  FreezeLoanDto,
  InputLoanManagementDto,
} from "../DTOs/loan-management-dto";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoanManagementService {
  constructor(private http: HttpClient) {}

  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  getAll() {
    debugger;
    this.url = this.baseUrl;
    this.url += "Loan/GetAll";
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }

  getDataForEdit(id: number) {
    debugger;
    this.url = this.baseUrl;
    this.url += "Loan/Get?LoanId=" + id;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }

  create(dto: InputLoanManagementDto) {
    debugger;
    this.url = this.baseUrl;
    this.url += "Loan/Create";
    console.log(dto);
    return this.http.post(this.url, dto);
  }

  delete(id: number) {
    this.url = this.baseUrl;
    this.url += "Loan/Delete?Id=" + id;
    return this.http.delete(this.url);
  }
  getForEdit(id: number) {
    debugger;
    this.url = this.baseUrl;
    this.url += "Loan/GetForEdit?Id=" + id;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }
  createFreezeLoan(dto: any): Observable<any> {
    const params = new URLSearchParams({
      RepaymentId: dto.RepaymentId,
      TransferredToDate: new Date(dto.TransferredToDate).toLocaleDateString(),
    });

    const url = `${this.baseUrl}Loan/TransferRepayment?${params.toString()}`;
    return this.http.post(url, {});
  }

  approve(id: number) {
    debugger;
    this.url = this.baseUrl;
    this.url += "Loan/ApproveLoan?LoanId=" + id;
    return this.http.post(this.url, {});
  }

  update(dto: any) {
    debugger;
    var newObj = {
      id: dto.id,
      isActive: dto.isActive,
      voucherNumber: dto.voucherNumber,
      employeeERPId: dto.erpId,
      userLocationId: dto.userLocationId,
      loanTypeId: dto.loanTypeId,
      reasonOfDeductionId: dto.reasonOfDeductionId,
      amount: dto.amount,
      numberOfInstallments: dto.numberOfInstallments,
      repaymentStartDate: dto.repaymentStartDate,
      documentDate: dto.documentDate,
      installmentAmount: dto.installmentAmount,
      recommendedByERPId: `${dto.recommendedByERPId}`,
      comments: dto.comments,
      status: dto.status,
    };
    debugger;
    this.url = this.baseUrl;
    this.url += "Loan/Edit";
    console.log("newObj", newObj);
    return this.http.post(this.url, newObj);
  }
  GetDocMaxCount(target, LocationId, IssueDate?) {
    this.url = this.baseUrl;
    this.url += `${target}/GetMaxCount?`;

    if (LocationId !== undefined) {
      this.url += `LocationId=${LocationId}&`;
    }
    if (IssueDate !== undefined) {
      var month = IssueDate.getMonth() + 1;
      var year = IssueDate.getFullYear();
      this.url += `IssueDate=${year + "-" + month}&`;
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
