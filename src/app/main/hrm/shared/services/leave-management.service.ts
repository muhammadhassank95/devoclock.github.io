import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { LeaveManagement } from '../DTOs/leave-management';
import { newBaseUrl } from '@shared/AppBaseURL/appBaseURL';


@Injectable({
    providedIn: 'root'
})
export class LeaveManagementService {


    constructor(private http: HttpClient) { }


    commonUrl: string = "api/services/app/";
    baseUrl: string = newBaseUrl + this.commonUrl;

    url: string = "";
    url_: string = "";

    getAll() {
        debugger;
        this.url = this.baseUrl;
        this.url += "LeaveManagement/GetAll?";
        return this.http.get(this.url).pipe(map((response: any) => {
            console.log(response);
            debugger
            return response["result"];
        }));
    }

    create(dto: LeaveManagement) {
        debugger
        console.log(dto);
        this.url = this.baseUrl;
        this.url += "LeaveManagement/Create";
        return this.http.post(this.url, dto);

    }
    edit(dto: LeaveManagement) {
        debugger
        console.log(dto);
        this.url = this.baseUrl;
        this.url += "LeaveManagement/Edit";
        return this.http.post(this.url, dto);

    }
    createCheckLeaves(id: string, fId: number) {
        debugger
        console.log(id);
        this.url = this.baseUrl;
        this.url += `LeaveManagement/CheckLeaves?FinancialYearId=${fId}&ERPId=${id}`
        return this.http.post(this.url, { id });
    }

    getEmpDetais(erpId: string) {
        debugger
        this.url = this.baseUrl;
        this.url += "/Employee/GetDetails?ERPId=" + erpId;
        return this.http.get(this.url).pipe(map((response: any) => {
            console.log(response);
            debugger
            return response["result"];
        }));

    }

    getDataForEdit(id: number) {
        debugger
        this.url = this.baseUrl;
        this.url += "LeaveManagement/GetForEdit?Id=" + id;
        return this.http.get(this.url).pipe(map((response: any) => {
            return response["result"];
        }));
    }
    approveLeave(id: number) {
        debugger
        this.url = this.baseUrl;
        this.url += "LeaveManagement/ApproveLeave?Id=" + id;
        return this.http.get(this.url).pipe(map((response: any) => {
            return response["result"];
        }));
    }

    delete(id: number) {
        this.url = this.baseUrl;
        this.url += "LeaveManagement/Delete?Id=" + id;
        return this.http.delete(this.url);
    }

    approve(id: number) {
        this.url = this.baseUrl;
        this.url += "LeaveManagement/ApproveLeave?Id=" + id;
        return this.http.post(this.url, null);
    }

    reject(id: number) {
        this.url = this.baseUrl;
        this.url += "LeaveManagement/RejectLeave?Id=" + id;
        return this.http.post(this.url, null);
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
