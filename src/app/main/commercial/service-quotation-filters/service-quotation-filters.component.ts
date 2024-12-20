import { Component, ViewChild } from "@angular/core";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { CommercialService } from "../shared/services/commercial.service";
import * as moment from "moment";
@Component({
  selector: "app-service-quotation-filters",
  templateUrl: "./service-quotation-filters.component.html",
})
export class ServiceQuotationFiltersComponent {
  clientId: number;
  clientName: string;
  clientSerialNumber: string;
  startDate: string;
  endDate: string;
  dateRange: string;
  to: string;
  saving: boolean;
  status: string;
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  rowCount: number;
  rowData: any;
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  constructor(
    private commercialService: CommercialService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {}

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Client":
        debugger;
        this.clientId = value.id;
        this.clientName = value.title;
        this.clientSerialNumber = value.serialNumber;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  addIconCellRendererFunc() {
    debugger;
    return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
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
      headerName: "SalesTax Id",
      editable: false,
      field: "salesTaxTypeId",
      resizable: true,
      width: 130,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addItem",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Sales Tax Name",
      editable: false,
      field: "salesTaxTypeName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Dated",
      editable: false,
      field: "issueDate",
      filter: "agDateColumnFilter", // Date filter
      resizable: true,
      suppressSizeToFit: true,
      valueFormatter: (params) => {
        const date = new Date(params.value); // Convert the value to a date
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        }
        return ""; // Return empty if the date is invalid
      },
    },
    {
      headerName: "Client",
      editable: false,
      field: "supplierName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Invoice Number",
      editable: false,
      field: "salesTaxInvoiceNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "St Amount",
      editable: false,
      field: "gstAmount",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Pst Amount",
      editable: false,
      field: "pstAmount",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Invoice Amount",
      editable: false,
      field: "totalAmount",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "ST. Date",
      field: "salesTaxApprovalDate",
      editable: true,
      cellEditor: "agDateCellEditor",
      cellEditorParams: {
        inputId: "date",
        appendTo: "body",
        dateFormat: "yy-mm-dd",
      },
      valueFormatter: this.dateFormatter,
      valueParser: this.dateParser,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "St Number",
      editable: false,
      field: "totalAmount",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Party",
    //   editable: false,
    //   field: "totalAmount",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
  ];
  dateFormatter(params) {
    if (params.value) {
      const date = new Date(params.value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`; // Format date as YYYY-MM-DD
    }
    return "";
  }

  dateParser(params) {
    const dateString = params.newValue;
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return null;
  }

  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const dataToRemove = selectedNodes.map((node) => node.data);

      this.gridApi.applyTransaction({ remove: dataToRemove });
      const updatedRowData = [];
      this.gridApi.forEachNode((node) => updatedRowData.push(node.data));
      this.gridApi.setRowData(updatedRowData);
      this.rowCount = this.gridApi.getDisplayedRowCount();
    }
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData = [];
    this.rowSelection = "multiple";
  }

  cellClicked(params) {
    debugger;
    switch (params.column["colId"]) {
      case "addItem":
        debugger;
        this.setParms = params;
        this.openSelectItem();
        break;
      default:
        break;
    }
  }
  openSelectItem() {
    debugger;
    const initialState: any = {
      target: "SalesTaxType",
    };
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );

    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      debugger;
      this.setParms.data.salesTaxTypeId = +result.id;
      this.setParms.data.salesTaxTypeName = result.name;
      this.gridApi.refreshCells();
    });
  }
  generate() {
    debugger;
    this.commercialService
      .getSeviceQuotationInvoiceFilters(
        "ServiceQuotationInvoice",
        this.dateRange,
        this.startDate,
        this.endDate,
        this.clientId,
        this.status
      )
      .subscribe({
        next: (response) => {
          this.rowData = response.items;
        },
        error: (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to fetch data.",
          });
        },
        complete: () => {
          console.log("API call completed.");
        },
      });
  }

  update(payload?) {
    debugger;
    this.commercialService
      .updateSalexTaxInvoice(payload, "ServiceQuotationInvoice")
      .subscribe({
        next: (response) => {
          console.log("Update successful:", response);
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Sales tax invoice updated successfully.",
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to update sales tax invoice.",
          });
        },
      });
  }
  onRowDoubleClick(event: any) {
    const selectedRowData = event.data;
    if (!selectedRowData.salesTaxTypeId) {
      this.messageService.add({
        severity: "error",
        summary: "error",
        detail: "Sales tax Id is required",
        life: 2000,
      });
      return;
    }
    if (!selectedRowData.salesTaxInvoiceNumber) {
      this.messageService.add({
        severity: "error",
        summary: "error",
        detail: "ST. Invoice Number is required",
        life: 2000,
      });
      return;
    }
    if (!selectedRowData.salesTaxApprovalDate) {
      this.messageService.add({
        severity: "error",
        summary: "error",
        detail: "ST. Date is required",
        life: 2000,
      });
      return;
    }
    this.confirmationService.confirm({
      message: `Are you sure you want to update  ${moment(
        selectedRowData.salesTaxApprovalDate
      ).format("YYYY-MM-DD")} date? of id ${
        selectedRowData.id
      } and this Invoice Number ${selectedRowData.salesTaxInvoiceNumber}`,
      header: "Update Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        const obj = [
          {
            id: selectedRowData.id,
            salesTaxApprovalDate: moment(
              selectedRowData.salesTaxApprovalDate
            ).format("YYYY-MM-DD"),
            salesTaxTypeId: selectedRowData.salesTaxTypeId,
            salesTaxTypeName: selectedRowData.salesTaxTypeName,
            salesTaxInvoiceNumber: selectedRowData.salesTaxInvoiceNumber,
          },
        ];
        debugger;
        this.update(obj);
      },
      reject: () => {},
    });
  }
  cellValueChanged(event) {
    const rowData = event.data;
    if (
      event.colDef.field === "salesTaxTypeId" ||
      event.colDef.field === "salesTaxApprovalDate"
    ) {
      if (rowData.salesTaxTypeId && rowData.salesTaxApprovalDate) {
        this.commercialService
          .getInvoiceNumber(
            "ServiceQuotationInvoice",
            rowData.salesTaxTypeId,
            rowData.salesTaxApprovalDate
          )
          .subscribe({
            next: (response) => {
              rowData.salesTaxInvoiceNumber = response;
              this.gridApi.refreshCells({ force: true });
            },
            error: (error) => {
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: "Failed to fetch invoice number.",
              });
            },
            complete: () => {},
          });
      }
    }
  }
}
