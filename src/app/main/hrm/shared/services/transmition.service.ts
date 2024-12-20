import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { TransitionInputsDto } from '../DTOs/transmition-dto';
import { newBaseUrl } from '@shared/AppBaseURL/appBaseURL';
@Injectable({
    providedIn: 'root'
})
export class TransmitionService {

    constructor(private http: HttpClient) { }

    commonUrl: string = "api/services/app/";
    baseUrl: string = newBaseUrl + this.commonUrl;

    url: string = "";
    url_: string = "";


    getAll() {
        debugger;
        this.url = this.baseUrl;
        this.url += "EmployeeChangeLog/GetAll?";
        this.url = this.url.replace(/[?&]$/, "");
        return this.http.get(this.url).pipe(map((response: any) => {
            console.log(response);
            debugger
            return response["result"];
        }));
    }
    GetAllHistory(dto: any) {
        debugger;
        this.url = this.baseUrl;
        this.url += `EmployeeChangeLog/GetAllHistory?ERPId=${dto.erpId}&Target=${dto.target}`;
        this.url = this.url.replace(/[?&]$/, "");
        return this.http.get(this.url).pipe(map((response: any) => {
            console.log(response);
            debugger
            return response["result"];
        }));
    }

    getCurrentInfo(id: any, target: string) {
        debugger;
        this.url = this.baseUrl;
        this.url += `EmployeeChangeLog/${target}?EmployeeId=${id}`;
        this.url = this.url.replace(/[?&]$/, "");
        return this.http.get(this.url).pipe(map((response: any) => {
            console.log(response);
            debugger
            return response["result"];
        }));
    }
    getDataForEdit(id: number) {
        debugger
        this.url = this.baseUrl;
        this.url += "EmployeeChangeLog/GetForEdit?Id=" + id;
        return this.http.get(this.url).pipe(map((response: any) => {
            return response["result"];
        }));
    }

    create(dto: TransitionInputsDto, targetApi: string) {
        debugger
        let target;

        this.url = this.baseUrl;
        this.url += "EmployeeChangeLog/" + targetApi;

        console.log(dto)

        return this.http.put(this.url, dto);
    }

    delete(id: number) {
        debugger
        this.url = this.baseUrl;
        this.url += "EmployeeChangeLog/Delete?Id=" + id;
        return this.http.delete(this.url);
    }


}
