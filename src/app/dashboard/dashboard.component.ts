import { HttpClient } from "@angular/common/http";
import { Component, Inject, Optional } from "@angular/core";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { API_BASE_URL } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent {
  constructor(private http: HttpClient) {}
  baseurl: string = newBaseUrl;
}
