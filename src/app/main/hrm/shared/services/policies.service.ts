import { Injectable } from "@angular/core";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class PoliciesService {
  constructor(private http: HttpClient) {}

  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  getAll(
    target: string,
    skipCount?: number,
    maxCount?: number,
    VoucherNumber?: string
  ) {
    debugger;
    this.url = this.baseUrl + target + "/GetAll";
    const queryParams: string[] = [];
    if (skipCount !== undefined) {
      queryParams.push(`SkipCount=${skipCount}`);
    }

    if (VoucherNumber !== undefined) {
      queryParams.push(`VoucherNumber=${VoucherNumber}`);
    }
    if (maxCount !== undefined) {
      queryParams.push(`MaxResultCount=${maxCount}`);
    }

    if (queryParams.length) {
      this.url += `?${queryParams.join("&")}`;
    }

    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
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

  get(id: number, target: string) {
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/Get?Id=" + id;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }

  Edit(dto, target: string) {
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/Edit";
    console.log(dto);
    return this.http.post(this.url, dto);
  }

  create(dto, target: string) {
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/Create";
    console.log({ ...dto, employeeId: dto.erpId });
    return this.http.post(this.url, { ...dto, employeeId: dto.erpId });
  }

  delete(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/Delete?Id=" + id;
    return this.http.delete(this.url);
  }
  approveDocument(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/ApproveDocument?Id=" + id;
    return this.http.post(this.url, {});
  }
  getAllLeaveTypes() {
    debugger;
    this.url = this.baseUrl;
    this.url += "LeaveType/GetAll";
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }

  getLeaveEncashmentDocument(
    FinancialYearId?: number,
    LocationId?: number,
    ProjectId?: number,
    CostCenterId?: number
  ) {
    debugger;
    this.url = this.baseUrl + "AnnualLeaveEncashment/GenerateDocument";

    let params = new URLSearchParams();

    if (FinancialYearId !== undefined && FinancialYearId !== null) {
      params.append("FinancialYearId", FinancialYearId.toString());
    }
    if (LocationId !== undefined && LocationId !== null) {
      params.append("LocationId", LocationId.toString());
    }
    if (ProjectId !== undefined && ProjectId !== null) {
      params.append("ProjectId", ProjectId.toString());
    }
    if (CostCenterId !== undefined && CostCenterId !== null) {
      params.append("CostCenterId", CostCenterId.toString());
    }

    if (params.toString()) {
      this.url += "?" + params.toString();
    }

    return this.http.post(this.url, {}).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }

  SubmitLeaveEncashDoc(dto) {
    debugger;
    this.url = this.baseUrl;
    this.url += "AnnualLeaveEncashment/SubmitDocument";
    console.log(dto);
    return this.http.post(this.url, dto);
  }

  getEmployeeShift(id: number) {
    debugger;
    this.url = this.baseUrl;
    this.url += "Shift/GetEmployeeShift?EmployeeId=" + id;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }

  fetchAttendance(id: number, attendanceDate: Date) {
    debugger;
    this.url = this.baseUrl;
    this.url += "Attendance/FetchDetails?ERPId=" + id;
    if (attendanceDate) {
      const formattedDate = this.formatDate(attendanceDate);
      this.url += "&AttendanceDate=" + formattedDate;
    }
    return this.http.post(this.url, {}).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  getVoucherNumber(
    target: string,
    prefix: string,
    issueDate: Date | string,
    userLocationId: number
  ) {
    this.url = this.baseUrl;
    this.url +=
      target +
      "/GetVoucherNumber" +
      `?prefix=${prefix}&issueDate=${moment(issueDate).format(
        "YYYY-MM-DD"
      )}&userLocationId=${userLocationId}`;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }
  // getVoucherNumber(
  //   target: string,
  //   prefix: string,
  //   issueDate: Date | string,
  //   userLocationId?: number
  // ) {
  //   const queryParams: string[] = [];

  //   if (prefix) {
  //     queryParams.push(`prefix=${prefix}`);
  //   }

  //   if (issueDate) {
  //     queryParams.push(`issueDate=${moment(issueDate).format("YYYY-MM-DD")}`);
  //   }

  //   if (userLocationId !== undefined) {
  //     queryParams.push(`userLocationId=${userLocationId}`);
  //   }

  //   this.url = `${this.baseUrl}${target}/GetVoucherNumber`;

  //   if (queryParams.length) {
  //     this.url += `?${queryParams.join("&")}`;
  //   }

  //   return this.http.get(this.url).pipe(
  //     map((response: any) => {
  //       return response["result"];
  //     })
  //   );
  // }
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
