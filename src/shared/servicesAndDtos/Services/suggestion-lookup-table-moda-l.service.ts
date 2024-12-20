import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";

@Injectable({
  providedIn: "root",
})
export class SuggestionLookupTableModaLService {
  constructor(private http: HttpClient) {}

  url: string = "";
  url_: string = "";
  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  getAll(
    SkipCount: number,
    MaxResultCount: number,
    name: string = "",
    target: string,
    serialNumber?: string
  ) {
    debugger;
    if (name == null) {
      name = "";
    }
    this.url = this.baseUrl;
    this.url += `Suggestion/GetSuggestions?Target=${target}&SerialNumber=${serialNumber}&Name=${name}&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;

    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }
  // getAllSubLedgers(
  //   SkipCount: number,
  //   MaxResultCount: number,
  //   name: string = "",
  //   target: string,
  //   chartOfAccountSubLedgerType: string,
  //   coaIdForSubledger: string,
  //   serialNumber?: string
  // ) {
  //   debugger;
  //   this.url = this.baseUrl;
  //   this.url += `ChartOfAccountSubLedger/GetAll?chartOfAccountSubLedgerTypes=${chartOfAccountSubLedgerType}&SerialNumber=${serialNumber}&Name=${name}&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
  //   if (coaIdForSubledger) {
  //     this.url = this.url + `&ChartOfAccountId=${coaIdForSubledger}`;
  //   }
  //   debugger;
  //   return this.http.get(this.url).pipe(
  //     map((response: any) => {
  //       console.log(response);
  //       return response["result"];
  //     })
  //   );
  // }

  getAllSubLedgers(
    SkipCount: number,
    MaxResultCount: number,
    name: string = "",
    target: string,
    chartOfAccountSubLedgerType: string, // e.g., "3,4"
    coaIdForSubledger: string,
    locationId?: string,
    serialNumber?: string
  ) {
    this.url = `${this.baseUrl}ChartOfAccountSubLedger/GetAll?`;
    debugger;
    if (
      chartOfAccountSubLedgerType.length > 1 &&
      !chartOfAccountSubLedgerType.includes(",")
    ) {
      this.url += `ChartOfAccountSubLedgerTypes=${chartOfAccountSubLedgerType}`;
    } else {
      // Split the chartOfAccountSubLedgerType string by commas and add each as a query param
      const subLedgerTypes = chartOfAccountSubLedgerType?.toString().split(",");
      debugger;
      subLedgerTypes?.forEach((type, index) => {
        this.url += `ChartOfAccountSubLedgerTypes=${type}`;
        // Add '&' between parameters but avoid for the last parameter
        if (index < subLedgerTypes.length - 1) {
          this.url += "&";
        }
      });
    }
    if (coaIdForSubledger) {
      this.url = this.url + `&ChartOfAccountId=${coaIdForSubledger}`;
    }
    if (locationId) {
      this.url = this.url + `&LocationId=${locationId}`;
    }
    // Add other query parameters
    if (serialNumber) {
      this.url += `&SerialNumber=${serialNumber}`;
    }
    if (name == null) {
      name = "";
    }
    if (name) {
      this.url += `&Title=${name}`;
    }
    this.url += `&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;

    // Call the API
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }
  getAllHouseOrVehicle(
    SkipCount: number,
    MaxResultCount: number,
    name: string = "",
    target: string,
    locationId?: string,
    serialNumber?: string
  ) {
    if (target === "Vehicle") {
      this.url = `${this.baseUrl}Vehicle/GetAll?`;
    } else if (target === "House") {
      this.url = `${this.baseUrl}House/GetAll?`;
    }

    debugger;

    if (locationId) {
      this.url = this.url + `&LocationId=${locationId}`;
    }
    // Add other query parameters
    if (serialNumber) {
      this.url += `&SerialNumber=${serialNumber}`;
    }
    if (name == null) {
      name = "";
    }
    if (name) {
      this.url += `&Title=${name}&name=${name}`;
    }
    this.url += `&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;

    // Call the API
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }
  // getAllItems(
  //   SkipCount: number,
  //   MaxResultCount: number,
  //   name: string = "",
  //   target: string,
  //   locationId?: string,
  //   isPetty?: string,
  //   serialNumber?: string
  // ) {
  //   if (target === "ServiceItem") {
  //     this.url = `${this.baseUrl}ServiceItem/GetAll?`;
  //     if (isPetty) {
  //       this.url = this.url + "isPettyJob=true&`";
  //     }
  //   } else if (target === "InventoryItem") {
  //     this.url = `${this.baseUrl}InventoryItem/GetAll?`;
  //     if (isPetty) {
  //       this.url = this.url + "isPettyItem=true&`";
  //     }
  //   }

  //   debugger;

  //   if (locationId) {
  //     this.url = this.url + `LocationId=${locationId}&`;
  //   }
  //   // Add other query parameters
  //   if (serialNumber) {
  //     this.url = this.url + `SerialNumber=${serialNumber}&`;
  //   }
  //   if (name) {
  //     this.url = this.url + `Title=${name}&name=${name}&`;
  //   }
  //   this.url =
  //     this.url + `SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;

  //   // Call the API
  //   return this.http.get(this.url).pipe(
  //     map((response: any) => {
  //       console.log(response);
  //       return response["result"];
  //     })
  //   );
  // }
  getAllItems(
    SkipCount: number,
    MaxResultCount: number,
    name: string = "",
    target: string,
    locationId?: string,
    isPetty?: string,
    serialNumber?: string
  ) {
    if (target === "ServiceItem") {
      this.url = `${this.baseUrl}ServiceItem/GetAll?`;
      debugger;
      if (isPetty) {
        this.url += `isPettyJob=true&`;
      }
    } else if (target === "InventoryItem") {
      this.url = `${this.baseUrl}InventoryItem/GetAll?`;
      if (isPetty) {
        debugger;
        this.url += `isPettyItem=true&`;
      }
    }

    if (locationId) {
      this.url += `LocationId=${encodeURIComponent(locationId)}&`;
    }
    if (serialNumber) {
      this.url += `SerialNumber=${encodeURIComponent(serialNumber)}&`;
    }
    if (name == null) {
      name = "";
    }
    if (name) {
      this.url += `Title=${encodeURIComponent(name)}&name=${encodeURIComponent(
        name
      )}&`;
    }

    this.url += `SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;

    // Remove trailing `&` if present
    if (this.url.endsWith("&")) {
      this.url = this.url.slice(0, -1);
    }
    debugger;
    // Call the API
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }
  getAllActiveVehicleOrHouse(
    SkipCount: number,
    MaxResultCount: number,
    name: string = "",
    target: string,
    locationId?: string,
    serialNumber?: string
  ) {
    if (target === "ActiveVehicle") {
      this.url = `${this.baseUrl}RentalContract/GetAll?IsActiveVehicleContract=true&IsActive=true&`;
      debugger;
    } else if (target === "ActiveHouse") {
      this.url = `${this.baseUrl}RentalContract/GetAll?IsActiveHouseContract=true&IsActive=true&`;
      debugger;
    }

    if (locationId) {
      this.url += `UserLocationId=${encodeURIComponent(locationId)}&`;
    }
    if (serialNumber) {
      this.url += `SerialNumber=${encodeURIComponent(serialNumber)}&`;
    }
    if (name == null) {
      name = "";
    }
    if (name) {
      this.url += `Title=${encodeURIComponent(name)}&`;
    }

    this.url += `SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;

    // Remove trailing `&` if present
    if (this.url.endsWith("&")) {
      this.url = this.url.slice(0, -1);
    }
    debugger;
    // Call the API
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  // getAllSubLedgers(
  //   SkipCount: number,
  //   MaxResultCount: number,
  //   name: string = "",
  //   target: string,
  //   chartOfAccountSubLedgerType: string, // e.g., "3,4"
  //   serialNumber?: string
  // ) {
  //   // Construct the base URL
  //   this.url = `${this.baseUrl}ChartOfAccountSubLedger/GetAll?`;

  //   // Handle chartOfAccountSubLedgerType parameter properly
  //   if (chartOfAccountSubLedgerType) {
  //     this.url += `ChartOfAccountSubLedgerTypes=${chartOfAccountSubLedgerType}`;
  //   }

  //   // Add serialNumber if provided
  //   if (serialNumber) {
  //     this.url += `&SerialNumber=${serialNumber}`;
  //   }

  //   // Add name (previously Title)
  //   if (name) {
  //     this.url += `&Name=${name}`;
  //   }

  //   // Add SkipCount and MaxResultCount as they are essential parameters
  //   this.url += `&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;

  //   // Call the API
  //   return this.http.get(this.url).pipe(
  //     map((response: any) => {
  //       console.log(response);
  //       return response["result"];
  //     })
  //   );
  // }

  getAllCOA(
    SkipCount: number,
    MaxResultCount: number,
    name: string = "",
    filter: string = "",
    serialNumber?: string
  ) {
    debugger;
    if (serialNumber == undefined) {
      serialNumber = "";
    }
    if (name == null) {
      name = "";
    }
    this.url = this.baseUrl;
    if (filter.toLocaleLowerCase() === "bank") {
      this.url += `ChartOfAccount/GetAll?NatureOfChartOfAccount=0&hasSubLedger=false&Name=${name}&SerialNumber=${serialNumber}&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    } else if (filter.toLocaleLowerCase() === "tax") {
      this.url += `ChartOfAccount/GetAll?NatureOfChartOfAccount=5&hasSubLedger=false&Name=${name}&SerialNumber=${serialNumber}&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    } else if (filter.toLocaleLowerCase() === "all") {
      this.url += `ChartOfAccount/GetAll?Name=${name}&SerialNumber=${serialNumber}&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    } else if (filter.toLocaleLowerCase() === "otax") {
      this.url += `ChartOfAccount/GetAll?NatureOfChartOfAccount=5&Name=${name}&SerialNumber=${serialNumber}&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    } else if (filter.toLocaleLowerCase() === "chartofaccount") {
      this.url += `ChartOfAccount/GetAll?IsBank=false&hasSubLedger=true&Name=${name}&SerialNumber=${serialNumber}&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    } else {
      this.url += `ChartOfAccount/GetAll?Name=${name}&SerialNumber=${serialNumber}&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    }

    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  getBudgetCOA(
    SkipCount: number,
    MaxResultCount: number,
    name: string = "",
    filter: string = "",
    serialNumber?: string
  ) {
    debugger;
    if (serialNumber == undefined) {
      serialNumber = "";
    }
    if (name == null) {
      name = "";
    }
    this.url = this.baseUrl;

    this.url += `ChartOfAccount/GetAll?Name=${name}&SerialNumber=${serialNumber}&ShowIncomeExpenseOnly=true&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;

    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  getChecksByBankId(
    SkipCount: number,
    MaxResultCount: number,
    name: string = "",
    filter: string = "",
    bankAccountId: string = "",
    serialNumber?: string
  ) {
    debugger;
    if (serialNumber == undefined) {
      serialNumber = "";
    }
    this.url = this.baseUrl;
    //65.109.118.136:449/api/services/app/ChequeBookRegister/GetAvailableCheques?ChartOfAccountId=434&Name=${name}&SerialNumber=${serialNumber}&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}
    // "http://65.109.118.136:449/api/services/app/ChequeBookRegister/GetAvailableCheques?ChartOfAccountId=434?Name=&SerialNumber=&SkipCount=0&MaxResultCount=5"
    http: this.url += `ChequeBookRegister/GetAvailableCheques?ChartOfAccountId=${bankAccountId}`;

    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }

  getAllCOAData(
    SkipCount: number,
    MaxResultCount: number,
    name: string = "",
    target: string = "",
    serialNumber?: string,
    Lvl1_Id?: string,
    Lvl2_Id?: string
  ) {
    if (serialNumber == undefined) {
      serialNumber = "";
    }
    if (name == null) {
      name = "";
    }
    this.url = this.baseUrl;

    debugger;
    if (Lvl1_Id) {
      this.url += `${target}?name=${name}&SerialNumber=${serialNumber}&Lvl1_Id=${Lvl1_Id}&Lvl2_Id=${Lvl2_Id}&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    } else {
      this.url += `${target}?name=${name}&SerialNumber=${serialNumber}&Lvl2_Id=${Lvl2_Id}&&SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`;
    }

    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response["result"];
      })
    );
  }
}
