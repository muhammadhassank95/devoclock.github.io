import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { LeavePolicy } from "../DTOs/leave-policy";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import * as moment from "moment";
@Injectable({
  providedIn: "root",
})
export class AttendanceRegisterService {
  constructor(private http: HttpClient) {}

  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  getAll(
    sDate?: Date | string,
    eDate?: Date | string,
    ProjectId?: number,
    LocationId?: number,
    EmployeeId?: string
  ) {
    debugger;
    this.url = `${this.baseUrl}Attendance/GetAttendance?`;

    if (sDate && eDate) {
      // StartDate=2024-08-02&EndDate=2024-08-02
      // const StartDate = new Date(
      //   sDate.getTime() - sDate.getTimezoneOffset() * 60000
      // );
      // const EndDate = new Date(
      //   eDate.getTime() - eDate.getTimezoneOffset() * 60000
      // );
      // this.url += `attendanceDate=${localDate.toISOString().split('T')[0]}&`;
      // this.url += `StartDate=${StartDate.toISOString().split("T")[0]}&EndDate=${EndDate.toISOString().split("T")[0]
      this.url += `StartDate=${moment(sDate).format(
        "yy-MM-DD"
      )}&EndDate=${moment(eDate).format("yy-MM-DD")}&`;
    }

    if (ProjectId) {
      this.url += `ProjectId=${ProjectId}&`;
    }
    if (LocationId) {
      this.url += `LocationId=${LocationId}&`;
    }
    if (LocationId) {
      this.url += `LocationId=${LocationId}&`;
    }
    if (EmployeeId) {
      this.url += `EmployeeId=${EmployeeId}&`;
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

  MarkAttendance(dto: any) {
    debugger;
    this.url = this.baseUrl;
    this.url += `Attendance/MarkAttendance`;

    let object = {
      erpId: dto.erpId,
      checkIn: dto.checkIn_Time,
      checkOut: dto.checkOut_Time,
      attendanceDate: dto.attendanceDate,
    };

    console.log(object);
    return this.http.post(this.url, object);
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
}
