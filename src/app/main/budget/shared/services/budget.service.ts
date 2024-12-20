import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { Moment } from "moment";
import * as moment from "moment";
@Injectable({
  providedIn: "root",
})
export class BudgetService {
  constructor(private http: HttpClient) {}
  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  GetProjectCount(id: any) {
    debugger;
    this.url = this.baseUrl;
    this.url += `Project/GetSerialNumber?Id=${id}`;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }
  GetLevelTwoCount(id: any) {
    debugger;
    this.url = this.baseUrl;
    this.url += `COALvl2/GetSerialNumber?Id=${id}`;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }
  GetLevelThreeCount(id: any) {
    debugger;
    this.url = this.baseUrl;
    this.url += `COALvl3/GetSerialNumber?Id=${id}`;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }
  GetChartOfAccountCount(id: any) {
    debugger;
    this.url = this.baseUrl;
    this.url += `ChartOfAccount/GetSerialNumber?Id=${id}`;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }
  GetCostCenterCount(id: any) {
    debugger;
    this.url = this.baseUrl;
    this.url += `CostCenter/GetSerialNumber?Id=${id}`;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        debugger;
        return response["result"];
      })
    );
  }
  CreateBulk(bulk: any) {
    console.log({ bulk });
    debugger;
    this.url = this.baseUrl;
    this.url += "COALvl1/CreateBulk";
    debugger;
    return this.http.post(this.url, bulk);
  }
  CreateBulkLvl2(bulk: any) {
    console.log({ bulk });
    debugger;
    this.url = this.baseUrl;
    this.url += "COALvl2/CreateBulk";
    return this.http.post(this.url, bulk);
  }
  CreateBulkLvl3(bulk: any) {
    debugger;
    console.log({ bulk });
    this.url = this.baseUrl;
    this.url += "COALvl3/CreateBulk";

    return this.http.post(this.url, bulk);
  }
  CreateBulkSupplier(bulk: any) {
    debugger;
    console.log({ bulk });
    this.url = this.baseUrl;
    this.url += "Supplier/CreateBulk";

    return this.http.post(this.url, bulk);
  }
  CreateBulkCOA(bulk: any) {
    console.log({ bulk });
    this.url = this.baseUrl;
    this.url += "ChartOfAccount/CreateBulk";
    let data = {
      bulkDtos: bulk,
    };
    console.log(data);
    debugger;
    return this.http.post(this.url, data);
  }
  getAll(
    target: string,
    skipCount?: number,
    maxCount?: number,
    p0?: number,
    IsDropdown?: boolean
  ) {
    debugger;
    let url = this.baseUrl + target + `/GetAll?`;
    const params = [];
    if (skipCount !== undefined) {
      params.push(`SkipCount=${skipCount}`);
    }

    if (maxCount !== undefined) {
      params.push(`MaxResultCount=${maxCount}`);
    }

    if (p0 !== undefined) {
      params.push(`p0=${p0}`);
    }

    if (IsDropdown !== undefined && IsDropdown === true) {
      params.push(`IsDropdown=true`);
    }
    url += params.join("&");
    return this.http.get(url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }
  getAllRecord(target: string, params?: any) {
    debugger;
    this.url = `${this.baseUrl}${target}/GetAll?`;
    const searchParams = new URLSearchParams();
    if (params) {
      if (params.DocOrVocNumber) {
        searchParams.append("VoucherNumber", params.DocOrVocNumber.toString());
      }
      if (params.maxCount) {
        searchParams.append("MaxResultCount", params.maxCount.toString());
      }
      if (params.skipCount) {
        searchParams.append("SkipCount", params.skipCount.toString());
      }
      if (params.name) {
        searchParams.append("Name", params.name.toString());
      }
    }
    debugger;
    // Construct the final URL
    this.url += searchParams.toString();
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  create(dto: any, target: string) {
    console.log(dto);
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/Create";
    return this.http.post(this.url, dto);
  }
  update(dto: any, target: string) {
    console.log(dto);
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/Edit";
    return this.http.post(this.url, dto);
  }
  getPDFReport(dto: any, target: string) {
    console.log(dto);
    debugger;
    this.url = this.baseUrl;
    this.url += target + "/GenerateChartOfAccountsReport";
    return this.http.get(this.url, {});
  }

  delete(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/Delete?Id=" + id;
    return this.http.delete(this.url);
  }

  getDataForEdit(id: number, target: string) {
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
}
