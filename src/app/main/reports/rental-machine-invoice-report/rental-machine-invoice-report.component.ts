import { Component } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, generate, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ReportService } from "../shared/services/report.service";
import * as moment from "moment";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";

@Component({
  selector: "app-rental-machine-invoice-report",
  templateUrl: "./rental-machine-invoice-report.component.html",
  styleUrl: "./rental-machine-invoice-report.component.css",
})
export class RentalMachineInvoiceReportComponent {
  editMode: boolean;
  target: string = "PdfReport";
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  rowCount: number;
  rowData: any;
  displayModal: boolean;
  loading: boolean;
  locationId: number;
  locationName: string;
  supplierId: number;
  supplierName: string;
  projectId: number;
  projectName: string;
  costCenterId: number;
  costCenterName: string;
  vehicleId: number;
  vehicleName: string;
  contractTypeId: number;
  contractTypeName: string;
  startDate: string;
  endDate: string;
  attendanceMonth: string;

  statusOptions = [
    { label: "Posted", value: "posted" },
    { label: "Unposted", value: "unposted" },
  ];
  constructor(
    private reportService: ReportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {}

  setPickerValue(value: any, title: string, title2: string = "") {
    switch (title) {
      case "Project":
        this.projectId = +value.id || null;
        this.projectName = value.name;
        break;
      case "Subledger":
        this.supplierId = value.id.split("/")[0] || "";
        this.supplierName = value.title;
        break;
      case "Location":
        this.locationId = +value.id || null;
        this.locationName = value.name;
        break;
      case "CostCenter":
        this.costCenterId = +value.id || null;
        this.costCenterName = value.name;
        break;
      case "Vehicle":
        this.vehicleId = +value.id || null;
        this.vehicleName = value.name;
        break;
      case "ContractType":
        this.contractTypeId = +value.id || null;
        this.contractTypeName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  getRentalInvoiceReport() {
    this.loading = true;
    debugger;
    this.reportService
      .getRentalInvoiceReport(
        this.target,
        this.startDate,
        this.endDate,
        this.supplierId,
        this.projectId,
        this.costCenterId,
        this.locationId,
        this.attendanceMonth,
        this.vehicleId,
        this.contractTypeId
      )
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
}
