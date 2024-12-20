import { SubCategoryId } from "./../DTOs/sub-category-id";
import { CategoryId } from "./../DTOs/category-id";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { catchError, map, throwError } from "rxjs";
import * as moment from "moment";
interface VoucherDto {
  Target: string;
  Prefix: string;
  IssueDate: Date;
  UserLocationId: number;
}
@Injectable({
  providedIn: "root",
})
export class SetupsService {
  constructor(private http: HttpClient) {}

  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  // getAll(target: string, IsDropdown?: boolean) {
  //   this.url = this.baseUrl;

  //   this.url += target + "/GetAll";
  //   debugger;

  //   if (IsDropdown) {
  //     this.url = this.url + "?IsDropdown=true";
  //   }
  //   return this.http.get(this.url).pipe(
  //     map((response: any) => {
  //       console.log(response);
  //       return response["result"];
  //     })
  //   );
  // }

  // getAll(
  //   target: string,
  //   IsDropdown?: boolean,
  //   skipCount: number = 0,
  //   maxCount: number = 5
  // ) {
  //   debugger;
  //   this.url = this.baseUrl;
  //   this.url += target + "/GetAll";

  //   // Create an array to store query parameters
  //   let queryParams: string[] = [];

  //   // Add IsDropdown parameter if it's true
  //   if (IsDropdown) {
  //     queryParams.push("IsDropdown=true");
  //   }

  //   // Add skipCount and maxCount parameters
  //   queryParams.push(`SkipCount=${skipCount}`);
  //   queryParams.push(`MaxResultCount=${maxCount}`);

  //   // Append query parameters to the URL
  //   if (queryParams.length > 0) {
  //     this.url += "?" + queryParams.join("&");
  //   }

  //   return this.http.get(this.url).pipe(
  //     map((response: any) => {
  //       console.log(response);
  //       return response["result"];
  //     })
  //   );
  // }

  getAll(target: string, params?: any) {
    debugger;
    this.url = `${this.baseUrl}${target}/GetAll?`;
    const searchParams = new URLSearchParams();
    if (params) {
      if (params.userLocationId) {
        searchParams.append("LocationId", params.userLocationId.toString());
      }
      if (params.name) {
        searchParams.append("name", params.name.toString());
      }
      if (params.itemType) {
        searchParams.append("itemType", params.itemType.toString());
      }
      if (params.DocOrVocNumber) {
        searchParams.append("VoucherNumber", params.DocOrVocNumber.toString());
      }
      if (params.status) {
        searchParams.append("Status", params.status.toString());
      }
      if (params.id) {
        searchParams.append("id", params.id.toString());
      }
      if (params.maxCount) {
        searchParams.append("MaxResultCount", params.maxCount.toString());
      }
      if (params.skipCount) {
        searchParams.append("SkipCount", params.skipCount.toString());
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

  getAllRequisition(
    target: string,
    CostCenterId?: number,
    ProjectId?: number,
    EmployeeId?: number
  ) {
    debugger;
    this.url = this.baseUrl;
    this.url += `${target}/GetAll?`;

    if (EmployeeId !== undefined) {
      this.url += `EmployeeId=${EmployeeId}&`;
    }
    if (CostCenterId !== undefined) {
      this.url += `CostCenterId=${CostCenterId}&`;
    }
    if (ProjectId !== undefined) {
      this.url += `ProjectId=${ProjectId}&`;
    }

    this.url = this.url.endsWith("&") ? this.url.slice(0, -1) : this.url;
    this.url = this.url.endsWith("?") ? this.url.slice(0, -1) : this.url;

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
    return this.http.post(this.url, dto);
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

  update(dto: any, target: string) {
    console.log(dto);
    this.url = this.baseUrl;
    this.url += target + "/Edit";
    return this.http.post(this.url, dto);
  }

  GetCategoryCount(id: any) {
    this.url = this.baseUrl;
    this.url += `Project/GetSerialNumber?Id=${id}`;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  GetNextCategoryCount(Service: string, id: any) {
    this.url = this.baseUrl;
    this.url += `${Service}/GetSerialNumber?Id=${id}`;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  getItemDetails(service: string, id: any) {
    const data = {
      bulkDtos: [
        {
          itemId: id,
          itemCategory: service,
        },
      ],
    };

    this.url = `${this.baseUrl}PurchaseRatePolicy/FetchLatestPurchaseRates`;

    return this.http.post(this.url, data);
  }

  // getItemDetails(Service: string, id: any) {
  //     ;
  //     const data= {
  //         itemId:id,
  //         itemCategory:Service
  //     }
  //     this.url = this.baseUrl;
  //     this.url += `PurchaseRatePolicy/GetLatestRate`;
  //     this.url = this.url.replace(/[?&]$/, "");
  //     return this.http.post(this.url, data  );
  //     // this.http.get(this.url, { params }).pipe(
  //     //     map((response: any) => {
  //     //         console.log(response);
  //     //         return response["result"].rate;
  //     //     })
  //     // )
  // }
  // getItemDetails(Service: string, id: any) {
  //     ;
  //     this.url = this.baseUrl;
  //     this.url += `PurchaseRatePolicy/GetLatestRate?ItemId=${id}&ItemCategory=${Service}`;
  //     this.url = this.url.replace(/[?&]$/, "");
  //     return this.http.get(this.url).pipe(
  //         map((response: any) => {
  //             console.log(response);
  //             ;
  //             return response["result"].rate;
  //         })
  //     );
  // }

  Approve(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/Approve?Id=" + id;
    return this.http.post(this.url, {});
  }
  ApproveDocument(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/ApproveDocument?Id=" + id;
    return this.http.post(this.url, {});
  }

  UnApprove(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/UnApprove?Id=" + id;
    return this.http.post(this.url, {});
  }

  GetItemCategoryCount(target: string, id: any) {
    this.url = this.baseUrl;
    this.url += target + "/CategoryWiseCount";
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }
  GetItemSubCategoryCount(target: string, id: any) {
    this.url = this.baseUrl;
    this.url += target + "/SubCategoryWiseCount";
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

  getPaymentMode(id: any) {
    this.url = this.baseUrl;
    this.url += `ChartOfAccountSubLedger/GetForEdit?Id=${id}`;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  getUpdateRate(SupplierId, serviceItemIds: number[]) {
    this.url = this.baseUrl;
    this.url += `PurchaseRatePolicy/FetchLatestPurchaseRates?SupplierId=${SupplierId}`;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.put(this.url, serviceItemIds).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }
  // "http://65.109.118.136:444/api/services/app/ServiceRequisition/GetMaxCount?LocationId=1&IssueDate=2024-17"
  GetDocMaxCount(target, LocationId, IssueDate) {
    this.url = this.baseUrl;
    this.url += `${target}/GetMaxCount?`;

    if (LocationId !== undefined) {
      this.url += `LocationId=${LocationId}&`;
    }
    if (IssueDate !== undefined) {
      // var month = IssueDate.getMonth() + 1;
      // var year = IssueDate.getFullYear();
      // this.url += `IssueDate=${year + "-" + month}&`;
      this.url += `IssueDate=${moment(IssueDate).format("yy-MM-DD")}&`;
    }
    debugger;
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
  GetDocMaxCountGI(LocationId, IssueDate?) {
    debugger;

    this.url = this.baseUrl;
    this.url += `InwardGatepass/GetMaxCount?LocationId=${LocationId}&IssueDate=${moment(
      IssueDate
    ).format("yy-MM-DD")}`;

    // if (LocationId !== undefined) {
    //     this.url += `LocationId=${LocationId}&`;
    // }
    // if (IssueDate !== undefined) {
    //     var month = IssueDate.getMonth() + 1;
    //     var year = IssueDate.getFullYear();
    //     this.url += `IssueDate=${year + "-" + month}&`;
    // }

    // this.url = this.url.endsWith("&") ? this.url.slice(0, -1) : this.url;
    // this.url = this.url.endsWith("?") ? this.url.slice(0, -1) : this.url;
    // this.url = this.url.replace(/[?&]$/, "");
    return this.http.post(this.url, {}).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }
  GetDocMaxCountGO(target, LocationId, IssueDate?) {
    this.url = this.baseUrl;
    this.url += `${target}/GO_GetMaxCount?`;

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
    return this.http.post(this.url, {}).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  getStockDetails(
    itemId: number,
    locationId: number,
    costCenterId: number,
    projectId: number
  ) {
    this.url = this.baseUrl;
    this.url = `${this.baseUrl}InventoryRequisition/GetStockDetails?ItemId=${itemId}&LocationId=${locationId}&CostCenterId=${costCenterId}&ProjectId=${projectId}`;

    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }
  /////////////////////// Test /////////////////////
  // fetchStockRequestDetails(
  //   itemId: number,
  //   projectId: number,
  //   costCenterId: number,
  //   locationId: number,
  //   regionId: number,
  //   consumptionMonth: Date,
  //   providerProjectId: number,
  //   providerCostCenterId: number,
  //   providerLocationId: number,
  //   providerRegionId: number
  // ) {
  //   // Directly map query parameters in the URL string
  //   this.url = `${this.baseUrl}StockRequisition/FetchStockRequestDetails?ItemId=${itemId}&LocationId=${locationId}&CostCenterId=${costCenterId}&ProjectId=${projectId}&RegionId=${regionId}&ConsumptionMonth=${moment(consumptionMonth).format("yy-MM-DD")}&ProviderProjectId=${providerProjectId}&ProviderCostCenterId=${providerCostCenterId}&ProviderLocationId=${providerLocationId}&ProviderRegionId=${providerRegionId}`;

  //   return this.http.post(this.url).pipe(
  //     map((response: any) => {
  //       console.log(response);
  //       return response["result"];
  //     })
  //   );
  // }
  fetchStockRequestDetails(
    itemId: number,
    projectId: number,
    costCenterId: number,
    locationId: number,
    // regionId: number,
    consumptionMonth: Date,
    providerProjectId: number,
    providerCostCenterId: number,
    providerLocationId: number
    // providerRegionId: number
  ) {
    // Construct URL with query parameters
    this.url =
      `${this.baseUrl}StockRequisition/FetchStockRequestDetails?` +
      `ItemId=${itemId}&` +
      `ProjectId=${projectId}&` +
      `CostCenterId=${costCenterId}&` +
      `LocationId=${locationId}&` +
      // `RegionId=${regionId}&` +
      `ConsumptionMonth=${moment(consumptionMonth).format("YYYY-MM-DD")}&` +
      `ProviderProjectId=${providerProjectId}&` +
      `ProviderCostCenterId=${providerCostCenterId}&` +
      `ProviderLocationId=${providerLocationId}&`;
    // `ProviderRegionId=${providerRegionId}`;

    // Send the request with no body (null body)
    return this.http.post(this.url, null).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      }),
      catchError((error) => {
        console.error(
          "Error occurred while fetching stock request details:",
          error
        );
        return throwError(() => new Error(error.message));
      })
    );
  }

  downloadBPReport(id: number, target: string) {
    debugger;
    this.url = `${this.baseUrl}PdfReport/${target}?Id=${id}`;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response.result;
      })
    );
  }

  getItemBudget(
    budgetDate: any,
    costCenterId: number,
    toLocation: number,
    itemId: number,
    projectId: number
  ) {
    var month = budgetDate.getMonth() + 1;
    var year = budgetDate.getFullYear();
    debugger;
    this.url = this.baseUrl;
    this.url = `${
      this.baseUrl
    }InventoryItem/GetMonthlyBudget?ProjectId=${projectId}&CostCenterId=${costCenterId}&LocationId=${toLocation}&BudgetDate=${
      year + "-" + month
    }&itemId=${itemId}`;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  getItemNextSerialNumb(CategoryId: number, SubCategoryId: number) {
    this.url = this.baseUrl;
    this.url = `${this.baseUrl}InventoryItem/GetCategoryAndSubCategoryWiseCount?CategoryId=${CategoryId}&SubCategoryId=${SubCategoryId}`;
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  getLinkedItem(costCenterId: number, projectId: number, locationId: number) {
    this.url = this.baseUrl;
    this.url = `${this.baseUrl}InventoryItemLinking/GetSuggestions?CostCenterId=${costCenterId}&ProjectId=${projectId}`;
    this.url = this.url.replace(/[?&]$/, "");

    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  createBuilty(dto: any, target: string, id?: number) {
    debugger;
    console.log(dto);
    this.url = this.baseUrl;
    this.url += target + "/UpdateBuiltyDetails";
    return this.http.put(this.url, dto);
  }

  GetVoucherNumber(dto: VoucherDto) {
    debugger;
    console.log(dto);
    this.url =
      this.baseUrl +
      `${dto.Target}/GetVoucherNumber?Prefix=${dto.Prefix}&IssueDate=${moment(
        dto.IssueDate
      ).format("yy-MM-DD")}&UserLocationId=${dto.UserLocationId}`;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  UploadImage(base64Data: any) {
    debugger;
    console.log(base64Data);
    this.url = this.baseUrl;
    this.url += "EmployeeManagement/UploadImage";

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    const payload = base64Data;
    debugger;
    return this.http.post(this.url, payload, { headers });
    // return this.http.post(this.url, uploadData);
  }

  // getVoucherNumber(
  //   prefix: string,
  //   issueDate: Date,
  //   locationId: number,
  //   target: string
  // ) {
  //   debugger;
  //   this.url = this.baseUrl;
  //   this.url +=
  //     target +
  //     "/GetVoucherNumber?Prefix=" +
  //     prefix +
  //     "&IssueDate=" +
  //     new Date(issueDate).toISOString().slice(0, 10) +
  //     "&UserLocationId=" +
  //     locationId;
  //   return this.http.get(this.url).pipe(
  //     map((response: any) => {
  //       return response["result"];
  //     })
  //   );
  // }
  getVoucherNumber(
    prefix: string,
    issueDate: Date,
    locationId: number,
    target: string
  ) {
    debugger;
    this.url = this.baseUrl;
    this.url +=
      target +
      "/GetVoucherNumber?Prefix=" +
      prefix +
      "&IssueDate=" +
      issueDate.toISOString().slice(0, 10) + // Convert Date to ISO format
      "&UserLocationId=" +
      locationId;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }
  getTracingRecord(id: number, target: string) {
    this.url = this.baseUrl;
    this.url += target + "/TracePurchaseTransactions?Id=" + id;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response["result"];
      })
    );
  }
}
