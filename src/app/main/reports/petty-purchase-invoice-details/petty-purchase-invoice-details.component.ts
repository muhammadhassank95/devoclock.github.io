import { Component } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, generate, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ReportService } from "../shared/services/report.service";
import * as moment from "moment";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";

@Component({
  selector: "app-petty-purchase-invoice-details",
  templateUrl: "./petty-purchase-invoice-details.component.html",
  styleUrl: "./petty-purchase-invoice-details.component.css",
})
export class PettyPurchaseInvoiceDetailsComponent {
  editMode: boolean;
  target: string = "GenerateHouseInvoiceReport";
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  rowCount: number;
  rowData: any;
  displayModal: boolean;
  loading: boolean;
  dto: {
    locationId: number;
    locationName: string;
    supplierId: number;
    supplierName: string;
    chartOfAccountId: number;
    chartOfAccountName: string;
    jobFromId: number;
    jobFromName: string;
    jobToId: number;
    jobToName: string;
    fromItemId: number;
    fromItemName: string;
    toItemId: number;
    toItemName: string;
    projectId: number;
    projectName: string;
    costCenterId: number;
    costCenterName: string;
    vehicleId: number;
    vehicleName: string;
    startDate: string;
    endDate: string;
    voucherStatusId: number;
    voucherStatusName: string;
    reportType: string;
  };

  rentalContractOptions = [
    { label: "Monthly", value: 1 },
    { label: "Two Months", value: 2 },
    { label: "Quarterly", value: 3 },
    { label: "Four Months", value: 4 },
    { label: "Five Months", value: 5 },
    { label: "Six Months", value: 6 },
    { label: "Seven Months", value: 7 },
    { label: "Eight Months", value: 8 },
    { label: "Nine Months", value: 9 },
    { label: "Ten Months", value: 10 },
    { label: "Eleven Months", value: 11 },
    { label: "Annual", value: 12 },
    { label: "Biennial", value: 24 },
    { label: "Triennial", value: 36 },
    { label: "Five Years", value: 60 },
    { label: "Ten Years", value: 120 },
  ];
  constructor(
    private reportService: ReportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {
    this.dto = {
      locationId: null,
      locationName: "",
      supplierId: null,
      supplierName: "",
      chartOfAccountId: null,
      chartOfAccountName: "",
      jobFromId: null,
      jobFromName: "",
      jobToId: null,
      jobToName: "",
      fromItemId: null,
      fromItemName: "",
      toItemId: null,
      toItemName: "",
      projectId: null,
      projectName: "",
      costCenterId: null,
      costCenterName: "",
      vehicleId: null,
      vehicleName: "",
      startDate: "",
      endDate: "",
      voucherStatusId: null,
      voucherStatusName: "",
      reportType: "",
    };
  }

  setPickerValue(value: any, title: string, title2: string = "") {
    switch (title) {
      case "Project":
        this.dto.projectId = +value.id;
        this.dto.projectName = value.name;
        break;
      case "Subledger":
        this.dto.supplierId = value.id.split("/")[0] || "";
        this.dto.supplierName = value.title;
        break;
      case "Location":
        this.dto.locationId = +value.id;
        this.dto.locationName = value.name;
        break;
      case "CostCenter":
        this.dto.costCenterId = +value.id;
        this.dto.costCenterName = value.name;
        break;
      case "Vehicle":
        this.dto.vehicleId = +value.id;
        this.dto.vehicleName = value.name;
        break;
      case "ChartOfAccount":
        this.dto.chartOfAccountId = +value.id;
        this.dto.chartOfAccountName = value.name;
        break;
      case "Job From":
        this.dto.jobFromId = +value.id;
        this.dto.jobFromName = value.name;
        break;
      case "Job To":
        this.dto.jobToId = +value.id;
        this.dto.jobToName = value.name;
        break;
      case "Item":
        this.dto.fromItemId = +value.id;
        this.dto.fromItemName = value.name;
        break;
      case "Item":
        this.dto.toItemId = +value.id;
        this.dto.toItemName = value.name;
        break;
      case "VoucherStatus":
        this.dto.voucherStatusId = +value.id;
        this.dto.voucherStatusName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  getRentalInvoiceReport() {
    this.loading = true;
    debugger;
    this.reportService.getAllReports(this.target, this.dto).subscribe(
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
}
