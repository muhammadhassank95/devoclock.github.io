import { Component } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, generate, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ReportService } from "../shared/services/report.service";
import * as moment from "moment";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";

@Component({
  selector: "app-employee-wise-ledgers",
  templateUrl: "./employee-wise-ledgers.component.html",
  styleUrl: "./employee-wise-ledgers.component.css",
})
export class EmployeeWiseLedgersComponent {
  editMode: boolean;
  serialNumber_To_COA: number;
  serialNumber_From_COA: number;
  serialNumber_From_Emp: number;
  serialNumber_To_Emp: number;
  displayModal: boolean;
  loading: boolean;
  dto: {
    locationId: number;
    locationName: string;
    fromChartOfAccountId: number;
    fromChartOfAccountName: string;
    toChartOfAccountId: number;
    toChartOfAccountName: string;
    fromEmployeeId: number;
    fromEmployeeName: string;
    toEmployeeId: number;
    toEmployeeName: string;
    startDate: string;
    endDate: string;
  };

  constructor(
    private reportService: ReportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {
    this.dto = {
      locationId: null,
      locationName: "",
      fromChartOfAccountId: null,
      fromChartOfAccountName: "",
      toChartOfAccountId: null,
      toChartOfAccountName: "",
      fromEmployeeId: null,
      fromEmployeeName: "",
      toEmployeeId: null,
      toEmployeeName: "",
      startDate: null,
      endDate: null,
    };
  }

  setPickerValue(value: any, title: string, title2: string = "") {
    debugger;
    switch (title) {
      case "From ChartOfAccount":
        this.dto.fromChartOfAccountId = value.id.split("/")[0] || "";
        this.dto.fromChartOfAccountName = value.name;
        this.serialNumber_From_COA = value.id.split("/")[1] || "";
        break;
      case "To ChartOfAccount":
        this.dto.toChartOfAccountId = value.id.split("/")[0] || "";
        this.dto.toChartOfAccountName = value.name;
        this.serialNumber_To_COA = value.id.split("/")[1] || "";
        break;
      case "From Employee":
        this.dto.fromEmployeeId = value.additional || null;
        this.dto.fromEmployeeName = value.name;
        this.serialNumber_From_Emp = value.id;
        break;
      case "To Employee":
        this.dto.toEmployeeId = value.additional || null;
        this.dto.toEmployeeName = value.name;
        this.serialNumber_To_Emp = value.id;
        break;
      case "Location":
        this.dto.locationId = value.id || null;
        this.dto.locationName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  getRentalInvoiceReport() {
    this.loading = true;
    debugger;
    this.reportService
      .getAllReports("GenerateEmployeeLedgerReport", this.dto)
      .subscribe(
        (response: any) => {
          const pdfLink = response;
          this.loading = false;
          const fullPdfLink = `${newBaseUrl}${pdfLink}`;
          window.open(fullPdfLink, "_blank");
          this.dto = {
            locationId: null,
            locationName: "",
            fromChartOfAccountId: null,
            fromChartOfAccountName: "",
            toChartOfAccountId: null,
            toChartOfAccountName: "",
            fromEmployeeId: null,
            fromEmployeeName: "",
            toEmployeeId: null,
            toEmployeeName: "",
            startDate: null,
            endDate: null,
          };
          this.serialNumber_From_COA = null;
          this.serialNumber_From_Emp = null;
          this.serialNumber_To_COA = null;
          this.serialNumber_To_Emp = null;
        },
        (error) => {
          this.loading = false;
        }
      );
  }
}
