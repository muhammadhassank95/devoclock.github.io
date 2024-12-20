import { Component } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
// import { catchError, finalize, generate, throwError } from "rxjs";
// import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ReportService } from "../shared/services/report.service";
import * as moment from "moment";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { debug, error } from "console";

@Component({
  selector: 'app-trial-balance',
  templateUrl: './trial-balance.component.html',
  styleUrl: "./trial-balance.component.css",
})
export class TrialBalanceComponent {
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
    startDate: any;
    endDate: any;
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
    this.assignFinancialYearToDto()
  }


  ngOnInit() {
    this.assignFinancialYearToDto();
  }

  setPickerValue(value: any, title: string, title2: string = "") {
    switch (title) {
      case "From ChartOfAccount":
        this.dto.fromChartOfAccountId = value.id.split("/")[0] || "";
        this.dto.fromChartOfAccountName = value.name;
        this.serialNumber_From_COA = value.chartOfAccountSerialNumber;
        break;
      case "To ChartOfAccount":
        this.dto.toChartOfAccountId = value.id.split("/")[0] || "";
        this.dto.toChartOfAccountName = value.name;
        this.serialNumber_To_COA = value.chartOfAccountSerialNumber;
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
    if (this.dto.startDate == null) {
      this.messageService.add({
        severity: "Error",
        detail: "Please Select Start Date",
      });
      return
    }
    if (this.dto.endDate == null) {
      this.messageService.add({
        severity: "Error",
        detail: "Please Select End Date",
      });
      return
    }
    this.loading = true;
    debugger;
    this.reportService
      .getAllReports("GenerateTrialBalanceReport", this.dto)
      .subscribe(
        (response: any) => {
          const pdfLink = response;
          this.loading = false;
          const fullPdfLink = `${newBaseUrl}${pdfLink}`;
          window.open(fullPdfLink, "_blank");
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  assignFinancialYearToDto() {
    debugger
    const financialYear = JSON.parse(
      localStorage.getItem("FinancialYearObject")
    );
    const startDate = financialYear?.startDate
      ? new Date(financialYear.startDate)
      : new Date();
    this.dto.startDate = startDate;
    this.dto.endDate = new Date()
  }


}
