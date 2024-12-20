import { Injectable } from '@angular/core';
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoldSalaryService {

  constructor(private http: HttpClient) { }

  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";


  getAll() {
    debugger;
    this.url = this.baseUrl;
    this.url += "HoldSalary/GetAll?";
    return this.http.get(this.url).pipe(map((response: any) => {
      console.log(response);
      debugger
      return response["result"];
    }));
  }

  create(dto: any) {
    debugger
    console.log(dto);
    this.url = this.baseUrl;
    this.url += "HoldSalary/Create";
    return this.http.post(this.url, dto);

  }

  getDataForEdit(id: number) {
    debugger
    this.url = this.baseUrl;
    this.url += "HoldSalary/GetForEdit?Id=" + id;
    return this.http.get(this.url).pipe(map((response: any) => {
      return response["result"];
    }));
  }

  delete(id: number) {
    this.url = this.baseUrl;
    this.url += "HoldSalary/Delete?Id=" + id;
    return this.http.delete(this.url);
  }


  Update(dto: any) {
    debugger
    console.log(dto);
    this.url = this.baseUrl;
    this.url += "HoldSalary/Edit";
    return this.http.post(this.url, dto);
  }

}
