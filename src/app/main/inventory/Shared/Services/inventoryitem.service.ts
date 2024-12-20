import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InventoryitemService {
  constructor(private http: HttpClient) {}

  commonUrl: string = "api/services/app/";
  baseUrl: string = newBaseUrl + this.commonUrl;

  url: string = "";
  url_: string = "";

  getAll(
    target: string,
    itemType: string,
    maxcount?: number,
    skipcount?: number,
    SerialNumber?: string
  ) {
    this.url = this.baseUrl;
    this.url += `${target}/GetAll?`;
    if (maxcount) {
      this.url += `MaxResultCount=${maxcount}&`;
    }
    if (skipcount) {
      this.url += `skipcount=${skipcount}&`;
    }
    if (itemType !== undefined) {
      this.url += `itemType=${itemType}&`;
    }
    if (SerialNumber !== undefined) {
      this.url += `SerialNumber=${SerialNumber}&`;
    }

    this.url = this.url.endsWith("&") ? this.url.slice(0, -1) : this.url;
    this.url = this.url.endsWith("?") ? this.url.slice(0, -1) : this.url;
    // this.url +=
    //   target +
    //   `/GetAll?ItemType=${itemType}&SkipCount=${skipcount}&MaxResultCount=${maxcount}&SerialNumber=${SerialNumber}`;
    debugger;
    return this.http.get(this.url).pipe(
      map((response: any) => {
        debugger;
        console.log(response);
        return response["result"];
      })
    );
  }
}
