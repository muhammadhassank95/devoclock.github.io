import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { newBaseUrl } from '@shared/AppBaseURL/appBaseURL';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";


  getPresent(startDate: string, endDate: string) {
    debugger;
    this.url = `${this.baseUrl}Attendance/GetAllPresentEmployees`;

    let params = new HttpParams();
    params = params.append('StartDate', startDate);
    params = params.append('EndDate', endDate);

    return this.http.get(this.url, { params }).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }

  getAbsent(startDate: string, endDate: string) {
    debugger;
    this.url = `${this.baseUrl}Attendance/GetAllAbsentEmployees`;

    let params = new HttpParams();
    params = params.append('StartDate', startDate);
    params = params.append('EndDate', endDate);

    return this.http.get(this.url, { params }).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }

  CheckIn(id: number) {
    debugger
    this.url = this.baseUrl;
    this.url += "Attendance/CheckIn?ERPId=" + id;
    return this.http.post(this.url, {});
  }


  CheckOut(id: number) {
    debugger
    this.url = this.baseUrl;
    this.url += "Attendance/CheckOut?ERPId=" + id;
    return this.http.post(this.url, {});
  }

  CreateBulk(bulk: any) {
    console.log({ bulkDtos: bulk });
    debugger
    this.url = this.baseUrl;
    this.url += "Attendance/MarkBulkAttendance";
    return this.http.post(this.url, { bulkDtos: bulk });
  }
  CreateMachineIntegrationBulk(bulk: any) {
    console.log({ bulkDtos: bulk });
    debugger
    this.url = this.baseUrl;
    this.url += "EmployeeManagement/BulkUpdateBiometricId";
    debugger
    return this.http.post(this.url, bulk);
  }
}
