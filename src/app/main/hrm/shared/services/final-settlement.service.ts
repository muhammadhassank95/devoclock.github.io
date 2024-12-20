import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { newBaseUrl } from '@shared/AppBaseURL/appBaseURL';
import { catchError, map, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class FinalSettlementService {

    constructor(private http: HttpClient) { }

    commonUrl: string = "api/services/app/";
    baseUrl: string = newBaseUrl + this.commonUrl;

    url: string = "";
    url_: string = "";

    getAll(skipCount: number, maxCount: number) {
        debugger;
        this.url = this.baseUrl;
        this.url += `FinalSettlement/GetAll?SkipCount=${skipCount}&MaxResultCount=${maxCount}`;
        return this.http.get(this.url).pipe(map((response: any) => {
            console.log(response);
            debugger
            return response["result"];
        }));
    }

    getDataForEdit(id: number) {
        debugger
        this.url = this.baseUrl;
        this.url += "FinalSettlement/GetForEdit?Id=" + id;
        return this.http.get(this.url).pipe(map((response: any) => {
            console.log(response);
            debugger
            return response["result"];
        }));
    }


    generate(id: number, documentDate?: Date) {
        debugger
        this.url = this.baseUrl;
        this.url += "EmployeeSalary/GenerateFinalSettlement?EmployeeId=" + id;
        if (documentDate) {
            const formattedDate = this.formatDate(documentDate);
            this.url += "&DocumentDate=" + formattedDate;
        }
        return this.http.post(this.url, {});
    }


    save(dto: any) {
        console.log(dto)
        debugger
        this.url = this.baseUrl;
        this.url += "FinalSettlement/SaveFinalSettlement";
        return this.http.post(this.url, dto);
    }

    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

}
