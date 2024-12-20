import { Component } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, generate, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import * as moment from "moment";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrl: "./filters.component.css",
})
export class FiltersComponent {
  editMode: boolean;
  target: string = "PdfReport";
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  rowCount: number;
  rowData: any;
  displayModal: boolean;
  loading: boolean;
  fromChartOfAccountId: number;
  fromChartOfAccountName: string;
  toChartOfAccountId: number;
  toChartOfAccountName: string;
  fromEmployeeId: number;
  fromEmployeeName: string;
  toEmployeeId: number;
  toEmployeeName: string;
  locationId: number;
  locationName: string;
  startDate: string;
  endDate: string;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) { }

  setPickerValue(value: any, title: string, title2: string = "") {
    switch (title) {
      case "Emp From":
        this.fromEmployeeId = +value.additional || null;
        this.fromEmployeeId = +value.id || null;
        this.fromEmployeeName = value.name;
        break;
      case "Emp To":
        this.toEmployeeId = +value.id || null;
        this.toEmployeeName = value.name;
        break;
      case "From A/c":
        this.fromChartOfAccountId = value.id.split("/")[1] || "";
        this.fromChartOfAccountName = value.name;
        break;
      case "To A/c":
        this.toChartOfAccountId = value.id.split("/")[1] || "";
        this.toChartOfAccountName = value.name;
        break;
      case "Location":
        this.locationId = value.id || null;
        this.locationName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  // getGeneralledgerReport() {
  //   this.loading = true;
  //   debugger;
  //   this.reportService
  //     .getGeneralLedgerReportFilters(
  //       this.target,
  //       this.startDate,
  //       this.endDate,
  //       this.fromSupplierId,
  //       this.toSupplierId,
  //       this.fromChartOfAccountId,
  //       this.toChartOfAccountId,
  //       this.fromProjectId,
  //       this.toProjectId,
  //       this.fromCostCenterId,
  //       this.toCostCenterId,
  //       this.locationId
  //     )
  //     .subscribe(
  //       (response: any) => {
  //         const pdfLink = response;
  //         this.loading = false;
  //         const fullPdfLink = `${newBaseUrl}${pdfLink}`;
  //         window.open(fullPdfLink, "_blank");
  //       },
  //       (error) => {
  //         this.loading = false;
  //       }
  //     );
  // }
}
