import { Component } from "@angular/core";
import { SetupsService } from "../Shared/Services/inventory-setup.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError, map } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";


@Component({
  selector: 'app-tracing',
  templateUrl: './tracing.component.html',

})
export class TracingComponent {

  constructor(
    private _basicTypeService: SetupsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) { }

  ngOnInit() {
    this.getAllData();
  }


  colDefsTracing: ColDef[] = [
    {
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true,
    },
    {
      headerName: "Voucher Title",
      editable: false,
      field: "voucherTitle",
      resizable: true,
      suppressSizeToFit: true,
    },

    {
      headerName: "Voucher Date",
      editable: false,
      field: "voucherDate",
      resizable: true,
      suppressSizeToFit: true,
    },

    {
      headerName: "Ref.Voucher No.",
      editable: false,
      field: "refVoucherNo",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Prepared By",
      editable: false,
      field: "preparedBy",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "EntryDate",
      editable: false,
      field: "entryDate",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Checked By",
      editable: false,
      field: "checkedBy",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Checked Date",
      editable: false,
      field: "checkedDate",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Cancelled By ",
      editable: false,
      field: "cancelledBy",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Cancelled Date",
      editable: false,
      field: "cancelledDate",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];




  getAllData() {

  }

}
