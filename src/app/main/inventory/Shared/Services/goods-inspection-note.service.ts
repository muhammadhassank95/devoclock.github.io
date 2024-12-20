import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { map } from "rxjs";
import * as moment from "moment";

@Injectable({
    providedIn: "root",
})
export class GoodsInspectionNoteService {
    constructor(private http: HttpClient) { }

    commonUrl: string = "api/services/app/";
    baseUrl: string = "" + this.commonUrl;

    url: string = "";
    url_: string = "";

    getAll() {
        debugger;
        this.url = newBaseUrl + this.baseUrl;
        this.url += "GoodsInspectionNote/GetAll";
        return this.http.get(this.url).pipe(
            map((response: any) => {
                console.log(response);
                debugger;
                return response["result"];
            })
        );
    }

    create(dto: any) {
        console.log(dto);
        debugger;
        this.url = newBaseUrl + this.baseUrl;
        this.url += "GoodsInspectionNote/Create";
        return this.http.post(this.url, dto);
    }

    delete(id: number) {
        this.url = newBaseUrl + this.baseUrl;
        this.url += "GoodsInspectionNote/Delete?Id=" + id;
        return this.http.delete(this.url);
    }

    getDataForEdit(id: number) {
        debugger;
        this.url = newBaseUrl + this.baseUrl;
        this.url += "GoodsInspectionNote/GetForEdit?Id=" + id;
        return this.http.get(this.url).pipe(
            map((response: any) => {
                return response["result"];
            })
        );
    }

    getMaxCount(date: Date, userLocationId: number) {
        debugger;
        this.url = newBaseUrl + this.baseUrl;
        this.url += `GoodsInspectionNote/GetMaxCount?LocationId=${userLocationId}&IssueDate=${moment(
            date
        ).format("yy-MM-DD")}`;
        return this.http.get(this.url).pipe(
            map((response: any) => {
                debugger;
                return response["result"];
            })
        );
    }

    Approve(id: number) {
        debugger;
        this.url = newBaseUrl + this.baseUrl;
        this.url += "GoodsInspectionNote/Approve?Id=" + id;
        return this.http.post(this.url, {});
    }

    update(dto: any) {
        console.log(dto);
        debugger;
        this.url = newBaseUrl + this.baseUrl;
        this.url += "GoodsInspectionNote/Edit";
        return this.http.post(this.url, dto);
    }

    getStockDetails(
        itemId: number,
        locationId: number,
        costCenterId: number,
        projectId: number
    ) {
        this.url = newBaseUrl + this.baseUrl;
        this.url = `${this.url}InventoryRequisition/GetStockDetails?ItemId=${itemId}&LocationId=${locationId}&CostCenterId=${costCenterId}&ProjectId=${projectId}`;

        this.url = this.url.replace(/[?&]$/, "");
        return this.http.get(this.url).pipe(
            map((response: any) => {
                console.log(response);
                return response["result"];
            })
        );
    }

    GetEmployeeLedgerCount(
        itemId: number,
        locationId: number,
        costCenterId: number,
        projectId: number,
        employeeId: number
    ) {
        this.url = newBaseUrl + this.baseUrl;
        this.url = `${this.url}GoodsInspectionNote/GetEmployeeLedgerCount?ItemId=${itemId}&LocationId=${locationId}&CostCenterId=${costCenterId}&ProjectId=${projectId}&EmployeeId=${employeeId}`;
        return this.http.get(this.url).pipe(
            map((response: any) => {
                console.log(response);
                return response["result"];
            })
        );
    }

    getLinkedItem(
        costCenterId: number,
        projectId: number,
        userLocationId: number
    ) {
        this.url = newBaseUrl + this.baseUrl;
        this.url = `${this.url}ItemLinking/GetSuggestions?CostCenterId=${costCenterId}&ProjectId=${projectId}&LocationId=${userLocationId}`;
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
