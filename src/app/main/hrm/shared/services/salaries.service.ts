import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ViewSalariesDto } from "../DTOs/salaries-dto";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SalariesService {
  constructor(private http: HttpClient) {}

  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  getAll(
    SalaryMonth?: Date,
    StartDate?: Date,
    EndDate?: Date,
    LocationId?: number,
    EmployeeTypeId?: number,
    PaymentModeId?: number
  ): Observable<any> {
    debugger;
    this.url = this.baseUrl;
    this.url += "EmployeeSalary/GenerateSalary?";

    if (SalaryMonth) {
      this.url += `SalaryMonth=${this.formatDate(SalaryMonth)}&`;
    }
    if (StartDate) {
      this.url += `StartDate=${this.formatDate(StartDate)}&`;
    }
    if (EndDate) {
      this.url += `EndDate=${this.formatDate(EndDate)}&`;
    }
    if (LocationId) {
      this.url += `LocationId=${LocationId}&`;
    }
    if (EmployeeTypeId) {
      this.url += `EmployeeTypeId=${EmployeeTypeId}&`;
    }
    if (PaymentModeId) {
      this.url += `PaymentModeId=${PaymentModeId}&`;
    }

    this.url = this.url.replace(/[?&]$/, "");
    debugger;
    return this.http.post(this.url, {}).pipe(
      map((response: any) => {
        console.log(response);
        return response.result;
      })
    );
  }
  getAllRecord(params?: any) {
    debugger;
    this.url = this.baseUrl;
    this.url += "EmployeeSalary/GenerateSalary?";
    const searchParams = new URLSearchParams();
    if (params) {
      if (params.DocOrVocNumber) {
        searchParams.append("VoucherNumber", params.DocOrVocNumber.toString());
      }
      if (params.name) {
        searchParams.append("Name", params.name.toString());
      }
      if (params.maxCount) {
        searchParams.append("MaxCount", params.maxCount.toString());
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
        return response["result"];
      })
    );
  }
  formatDate(date: Date): string {
    // Get year, month, and day from the date object
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    // Format and return the date as "YYYY-MM-DD"
    return `${year}-${month}-${day}`;
  }

  getSalaryStucture() {
    debugger;
    this.url = this.baseUrl;
    this.url += "SalaryStructurePolicy/GetAll?";
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }

  SaveSalary(dto) {
    debugger;
    this.url = this.baseUrl;
    this.url += "EmployeeSalary/SaveSalaries";
    return this.http.post(this.url, dto);
  }

  getAllSalaries(): Observable<any> {
    debugger;
    this.url = this.baseUrl;
    this.url += "EmployeeSalary/GetAllDocuments?";

    this.url = this.url.replace(/[?&]$/, "");

    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response.result;
      })
    );
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
  Approve(id: number) {
    debugger;
    this.url = this.baseUrl;
    this.url += "EmployeeSalary/ApprovedStatus?Id=" + id;

    this.url = this.url.replace(/[?&]$/, "");

    return this.http.post(this.url, {}).pipe(
      map((response: any) => {
        console.log(response);
        return response.result;
      })
    );
  }

  UpApprove(id: number) {
    debugger;
    this.url = this.baseUrl;
    this.url += "EmployeeSalary/UnapproveStatus?Id=" + id;

    this.url = this.url.replace(/[?&]$/, "");

    return this.http.post(this.url, {}).pipe(
      map((response: any) => {
        console.log(response);
        return response.result;
      })
    );
  }
  delete(id: number) {
    debugger;
    this.url = this.baseUrl;
    this.url += "EmployeeSalary/DeleteDocument?Id=" + id;
    return this.http.delete(this.url);
  }
  dispatch(id: number) {
    debugger;
    this.url = this.baseUrl;
    this.url += "EmployeeSalary/DispatchStatus?Id=" + id;

    this.url = this.url.replace(/[?&]$/, "");

    return this.http.post(this.url, {}).pipe(
      map((response: any) => {
        console.log(response);
        return response.result;
      })
    );
  }

  downloadSalariesReport(id: number, target: string) {
    debugger;
    this.url = `${this.baseUrl}PdfReport/${target}?Id=${id}`;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response.result;
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
