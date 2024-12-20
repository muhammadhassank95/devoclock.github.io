import { Component } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, generate, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ReportService } from "../shared/services/report.service";
import * as moment from "moment";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";

@Component({
  selector: "app-machine-working-details",
  templateUrl: "./machine-working-details.component.html",
  styleUrl: "./machine-working-details.component.css",
})
export class MachineWorkingDetailsComponent {
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
    projectId: number;
    projectName: string;
    costCenterId: number;
    costCenterName: string;
    houseId: number;
    houseName: string;
    startDate: string;
    endDate: string;
    rentalContractType: any;
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
      projectId: null,
      projectName: "",
      costCenterId: null,
      costCenterName: "",
      houseId: null,
      houseName: "",
      startDate: "",
      endDate: "",
      rentalContractType: "",
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
      case "House":
        this.dto.houseId = +value.id;
        this.dto.houseName = value.name;
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
