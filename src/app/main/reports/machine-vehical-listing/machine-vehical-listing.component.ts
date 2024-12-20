import { Component } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, generate, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ReportService } from "../shared/services/report.service";
import * as moment from "moment";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";

@Component({
  selector: 'app-machine-vehical-listing',
  templateUrl: './machine-vehical-listing.component.html',
  styleUrl: './machine-vehical-listing.component.css'
})
export class MachineVehicalListingComponent {
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
  vehicleId: number;
  vehicleName: string;
  title: string;
  regNo: string;

  statusOptions = [
    { label: "Posted", value: "posted" },
    { label: "Unposted", value: "unposted" },
  ];

  constructor(
    private reportService: ReportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) { }

  setPickerValue(value: any, title: string, title2: string = "") {
    switch (title) {

      case "Location":
        this.locationId = +value.id;
        this.locationName = value.name;
        break;
      case "Vehicle":
        this.vehicleId = +value.id;
        this.vehicleName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  // getRentalInvoiceReport() {
  //   this.loading = true;
  //   debugger;
  //   this.reportService
  //     .getRentalInvoiceReport(
  //       this.target,
  //       this.startDate,
  //       this.endDate,
  //       this.supplierId,
  //       this.projectId,
  //       this.costCenterId,
  //       this.locationId,
  //       this.attendanceMonth,
  //       this.vehicleId,
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
