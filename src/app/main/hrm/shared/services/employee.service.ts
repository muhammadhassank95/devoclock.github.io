import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import {
  EmployeeInputDto,
  EmployeeReplacementDto,
  MarkEmployeeAsResignedDto,
} from "./../DTOs/employee-dto";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  getAll(skipCount: number, maxCount: number) {
    debugger;
    this.url = this.baseUrl;
    this.url += `EmployeeManagement/GetAll?SkipCount=${skipCount}&MaxResultCount=${maxCount}`;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }

  GetRelations() {
    debugger;
    this.url = this.baseUrl;
    this.url += "Relation/GetAll";
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }
  create(dto: EmployeeInputDto) {
    debugger;
    console.log(dto);
    var newDto = { ...dto, biometricId: dto.erp };
    this.url = this.baseUrl;
    this.url += "EmployeeManagement/Create";
    return this.http.post(this.url, newDto);
  }
  edit(dto: EmployeeInputDto) {
    debugger;
    console.log(dto);
    var newDto = { ...dto, biometricId: dto.erp };
    this.url = this.baseUrl;
    this.url += "EmployeeManagement/Edit";
    return this.http.post(this.url, newDto);
  }
  MarkEmployeeAsResigned(dto: MarkEmployeeAsResignedDto) {
    debugger;
    console.log(dto);
    // var newDto = { ...dto, 'fpmId': dto.erp }
    this.url = this.baseUrl;
    this.url += "EmployeeManagement/MarkEmployeeAsResigned";
    return this.http.post(this.url, dto);
  }
  createEmployeeReplacement(dto: EmployeeReplacementDto) {
    const params = new URLSearchParams({
      ResignedEmployeeERPId: dto.erp,
      ReplacementEmployeeERPId: dto.ResignedEmployeeERPId,
      ReplacementDate: dto.ReplacementDate,
    });
    debugger;
    this.url = `${this.baseUrl
      }EmployeeManagement/AddEmployeeReplacement?${params.toString()}`;
    return this.http.post(this.url, {});
  }

  getEmpDetais(erpId: string) {
    debugger;
    this.url = this.baseUrl;
    this.url += "EmployeeManagement/GetBasicDetails?ERPId=" + erpId;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }

  getDataForEdit(id: string, erp?: boolean) {
    debugger;
    this.url = this.baseUrl;
    if (erp) {
      this.url += "EmployeeManagement/GetForEdit?ERPId=" + id;
    } else {
      this.url += "EmployeeManagement/GetForEdit?Id=" + id;
    }
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }

  delete(id: number) {
    this.url = this.baseUrl;
    this.url += "EmployeeManagement/Delete?Id=" + id;
    return this.http.delete(this.url);
  }

  // approve(id: number) {
  //     this.url = this.baseUrl;
  //     this.url += "LeaveManagement/ApproveLeave?Id=" + id;
  //     return this.http.post(this.url, null);
  // }

  // reject(id: number) {
  //     this.url = this.baseUrl;
  //     this.url += "LeaveManagement/RejectLeave?Id=" + id;
  //     return this.http.post(this.url, null);
  // }

  getErpId() {
    this.url = this.baseUrl;
    this.url += "EmployeeManagement/GetERP";
    this.url = this.url.replace(/[?&]$/, "");
    debugger;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  getDefaultBank() {
    this.url = this.baseUrl;
    this.url += "CompanyBank/GetDefaultBank";
    this.url = this.url.replace(/[?&]$/, "");
    debugger;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  getTaxPolicy() {
    this.url = this.baseUrl;
    this.url += "TaxDeductionPolicy/GetTaxDeductionPolicy";
    this.url = this.url.replace(/[?&]$/, "");
    debugger;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  Rejoin(dto: any): Observable<any> {
    const { rejoinId, JoiningDate } = dto;
    let url = `${this.baseUrl}EmployeeManagement/ReJoinEmployee?`;

    if (rejoinId) {
      url += `ERPId=${rejoinId}`;
    }

    if (JoiningDate) {
      const formattedDate = new Date(JoiningDate).toISOString().split("T")[0];
      url += `&JoiningDate=${formattedDate}`;
    }

    return this.http.post(url, {});
  }
  CreateBulk(bulk: any) {
    console.log({ bulk });
    debugger;
    this.url = this.baseUrl;
    this.url += "EmployeeManagement/CreateBulk";
    debugger;
    return this.http.post(this.url, bulk);
  }
}
