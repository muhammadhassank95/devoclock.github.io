import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Observable, map } from "rxjs";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CommercialService {
  constructor(private http: HttpClient) {}
  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  getAll(
    target: string,
    IsDropdown?: boolean,
    skipCount?: number,
    max?: number
  ) {
    this.url = this.baseUrl;

    this.url += target + "/GetAll";
    debugger;

    if (IsDropdown) {
      this.url = this.url + "?IsDropdown=true";
    }
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  create(dto: any, target: string) {
    debugger;
    console.log(dto);
    this.url = this.baseUrl;
    this.url += target + "/Create";
    debugger;
    return this.http.post(this.url, dto);
  }

  delete(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/Delete?Id=" + id;
    return this.http.delete(this.url);
  }

  approve(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/ApproveDocument?Id=" + id;
    return this.http.post(this.url, {});
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

  getData(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/Get?Id=" + id;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }

  update(dto: any, target: string) {
    debugger;
    console.log(dto);
    this.url = this.baseUrl;
    this.url += target + "/Edit";
    return this.http.post(this.url, dto);
  }
  getSeviceQuotationInvoiceFilters(
    target: string,
    dateRange: string,
    startDate: string,
    endDate: string,
    supplierId: number,
    status: string,
    IsDropdown?: boolean,
    skipCount?: number,
    max?: number
  ) {
    debugger;
    this.url = `${this.baseUrl}${target}/GetAll`;

    let queryParams: string[] = [];
    if (dateRange) {
      queryParams.push(`DateRange=${moment(dateRange).format("YYYY-MM-DD")}`);
    }
    if (startDate) {
      queryParams.push(`StartDate=${moment(startDate).format("YYYY-MM-DD")}`);
    }
    if (endDate) {
      queryParams.push(`EndDate=${moment(endDate).format("YYYY-MM-DD")}`);
    }
    if (supplierId) {
      queryParams.push(`SupplierId=${supplierId}`);
    }
    if (status) {
      queryParams.push(`Status=${status}`);
    }
    if (IsDropdown) {
      queryParams.push(`IsDropdown=true`);
    }
    if (skipCount !== undefined) {
      queryParams.push(`SkipCount=${skipCount}`);
    }
    if (max !== undefined) {
      queryParams.push(`Max=${max}`);
    }
    if (queryParams.length) {
      this.url += `?${queryParams.join("&")}`;
    }
    debugger;

    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }
  updateSalexTaxInvoice(dto: any, target: string) {
    debugger;
    console.log(dto);
    this.url = this.baseUrl;
    this.url += target + "/BulkUpdateSalesTaxDetails";
    debugger;
    return this.http.post(this.url, dto);
  }
  getInvoiceNumber(target: string, salesTaxId: number, salesTaxDate: string) {
    debugger;
    this.url = `${this.baseUrl}${target}/GetSalesTaxInvoiceNumber`;

    let queryParams: string[] = [];
    if (salesTaxId) {
      queryParams.push(`SalesTaxTypeId=${salesTaxId}`);
    }
    if (salesTaxDate) {
      queryParams.push(
        `SalesTaxApprovalDate=${moment(salesTaxDate).format("YYYY-MM-DD")}`
      );
    }
    if (queryParams.length) {
      this.url += `?${queryParams.join("&")}`;
    }
    debugger;

    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }
}
