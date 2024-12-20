import { Component } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, generate, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ReportService } from "../shared/services/report.service";
import * as moment from "moment";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";

@Component({
  selector: "app-general-ledger-report",
  templateUrl: "./general-ledger-report.component.html",
  styleUrl: "./general-ledger-report.component.css",
})
export class GeneralLedgerReportComponent {
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
  fromChartOfAccountId: number;
  fromChartOfAccountName: string;
  toChartOfAccountId: number;
  toChartOfAccountName: string;
  fromProjectId: number;
  fromProjectName: string;
  toProjectId: number;
  toProjectName: string;
  fromCostCenterId: number;
  fromCostCenterName: string;
  toCostCenterId: number;
  toCostCenterName: string;
  fromSupplierId: number;
  fromSupplierName: string;
  toSupplierId: number;
  toSupplierName: string;
  startDate: string;
  endDate: string;

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
      case "Project From":
        this.fromProjectId = +value.id || null;
        this.fromProjectName = value.name;
        break;
      case "Project To":
        this.toProjectId = +value.id || null;
        this.toProjectName = value.name;
        break;
      case "From A/c":
        this.fromChartOfAccountId = value.id.split("/")[0] || "";
        this.fromChartOfAccountName = value.name;
        break;
      case "To A/c":
        this.toChartOfAccountId = value.id.split("/")[0] || "";
        this.toChartOfAccountName = value.name;
        break;
      case "Location":
        this.locationId = +value.id || null;
        this.locationName = value.name;
        break;
      case "C.C. From":
        this.fromCostCenterId = +value.id || null;
        this.fromCostCenterName = value.name;
        break;
      case "C.C. To":
        this.toCostCenterId = +value.id || null;
        this.toCostCenterName = value.name;
        break;
      case "from Supplier":
        this.fromSupplierId = +value.id || null;
        this.fromSupplierName = value.name;
        break;
      case "to Supplier":
        this.toSupplierId = +value.id || null;
        this.toSupplierName = value.name;
        break;
      // case "AnalysisCode":
      //     analysisCodeId: +value.id || "",
      //     analysisCodeName: value.name,
      //   break;
      // case "ItemID":
      //     itemId: +value.id || "",
      //     itemName: value.name,
      //   break;
      default:
        alert(`${title} is not defined`);
    }
  }
  getGeneralledgerReport() {
    this.loading = true;
    debugger;
    this.reportService
      .getGeneralLedgerReportFilters(
        this.target,
        this.startDate,
        this.endDate,
        this.fromSupplierId,
        this.toSupplierId,
        this.fromChartOfAccountId,
        this.toChartOfAccountId,
        this.fromProjectId,
        this.toProjectId,
        this.fromCostCenterId,
        this.toCostCenterId,
        this.locationId
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
