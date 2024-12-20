import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { newBaseUrl } from '@shared/AppBaseURL/appBaseURL';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GauzatedHolidayService {

    constructor(private http: HttpClient) { }

    commonUrl: string = "api/services/app/";
    baseUrl: string = newBaseUrl + this.commonUrl;

    url: string = "";
    url_: string = "";


    getAll(
    ) {
        debugger;
        this.url = this.baseUrl;
        this.url += "GauztedHoliday/GetAll";
        return this.http.get(this.url).pipe(map((response: any) => {
            console.log(response);
            debugger
            return response["result"];
        }));
    }

    create(dto: any) {
        console.log(dto)
        debugger
        this.url = this.baseUrl;
        this.url += "GauztedHoliday/Create";
        return this.http.post(this.url, dto);

    }


    delete(id: number) {
        this.url = this.baseUrl;
        this.url += "GauztedHoliday/Delete?Id=" + id;
        return this.http.delete(this.url);
    }

    getDataForEdit(id: number) {
        debugger
        this.url = this.baseUrl;
        this.url += "GauztedHoliday/GetId=" + id;
        return this.http.get(this.url).pipe(map((response: any) => {
            return response["result"];
        }));
    }

}
