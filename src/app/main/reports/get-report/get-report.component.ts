import { Component } from "@angular/core";
import { ReportService } from "../shared/services/report.service";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";

@Component({
  selector: "app-get-report",
  templateUrl: "./get-report.component.html",
  styleUrl: "./get-report.component.css",
})
export class GetReportComponent {
  constructor(private _reportService: ReportService) {}
  target: string = "ChartOfAccount";

  getReport() {
    debugger;
    this._reportService.createReport(this.target).subscribe(
      (response: any) => {
        const pdfLink = response.result;
        const fullPdfLink = `${newBaseUrl}${pdfLink}`;
        window.open(fullPdfLink, "_blank");
      },
      (error) => {
        console.error("Error generating report:", error);
      }
    );
  }
}
