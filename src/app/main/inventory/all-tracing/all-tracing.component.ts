import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { SetupsService } from "../Shared/Services/inventory-setup.service";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: "app-all-tracing",
  templateUrl: "./all-tracing.component.html",
})
export class AllTracingComponent implements OnInit {
  id: number;
  voucherNumber: string;
  loading: boolean;
  rowSelection: string;
  protected gridApi: GridApi;
  protected setParms;
  rowCount: number;
  target: string;
  rowData: any[] = [];
  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private _tracingService: SetupsService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.target = this.config.data.target;
    this.id = this.config.data.id;
    this.voucherNumber = this.config.data.voucherNumber;

    if (this.target && this.id) {
      this.loadTracingData();
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Invalid Data",
        detail: "Target or Voucher Number not provided.",
      });
    }
  }

  closeModal() {
    this.ref.close();
  }
  colDefs: ColDef[] = [
    {
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      width: 90,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true,
    },
    {
      headerName: "Issue Date",
      editable: false,
      field: "issueDate",
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
    },
    {
      headerName: "Voucher Number",
      editable: false,
      field: "voucherNumber",
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
    },
    {
      headerName: "Creation Time",
      editable: false,
      field: "creationTime",
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
    },
    {
      headerName: "Status",
      editable: false,
      field: "status",
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
    },
    {
      headerName: "Document Type",
      editable: false,
      field: "documentType",
      resizable: true,
      width: 300,
      suppressSizeToFit: true,
    },
  ];
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData = [];
    this.rowSelection = "multiple";
  }
  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const dataToRemove = selectedNodes.map((node) => node.data);
      this.gridApi.applyTransaction({ remove: dataToRemove });
      this.rowData = this.rowData.filter((row) => !dataToRemove.includes(row));
      this.rowCount = this.gridApi.getDisplayedRowCount();
    }
  }

  loadTracingData() {
    this.loading = true;
    this._tracingService.getTracingRecord(this.id, this.target).subscribe({
      next: (response: any) => {
        this.rowData = response;
      },
      error: () => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to load tracing data.",
        });
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
