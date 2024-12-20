import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "../../../../shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
@Component({
  selector: "app-item-linking-grid",
  templateUrl: "./item-linking-grid.component.html",
})
export class ItemLinkingGridComponent {
  protected gridApi: GridApi;
  rowSelection: string;
  rowCount: number;
  // rowData: any[] = [];
  protected setParms;
  target: string;
  @Input() rowData: any;

  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  @Output() outputLicenseArray: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor(private suggestionService: BsModalService) {}

  colDefs: ColDef[] = [
    {
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true,
    },

    {
      headerName: "ID",
      editable: false,
      field: "stockItemId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addStockItem",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Title",
      editable: false,
      field: "stockItemName",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowSelection = "multiple";
  }

  onAddRow() {
    const newItem: Record<string, any> = {};
    this.colDefs.forEach((colDef) => {
      if (colDef.field) {
        // Ensure field is defined
        newItem[colDef.field] = "";
      }
    });
    this.gridApi.applyTransaction({ add: [newItem] });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.gridApi.applyTransaction({
      remove: selectedNodes.map((node) => node.data),
    });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  addIconCellRendererFunc() {
    debugger;
    return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
  }

  cellClicked(params) {
    debugger;
    switch (params.column["colId"]) {
      case "addStockItem":
        this.setParms = params;
        this.openSelectLicenseType();
        break;
      default:
        break;
    }
  }

  openSelectLicenseType() {
    debugger;
    this.target = "StockItem";
    const initialState: any = {
      target: this.target,
    };
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );

    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      debugger;
      this.setParms.data.stockItemId = result.id;
      this.setParms.data.stockItemName = result.name;
      this.gridApi.refreshCells();
    });
  }

  onSave() {
    debugger;
    var rowData: any = [];
    this.gridApi.forEachNode((node) => {
      rowData.push(node.data);
    });
    this.outputLicenseArray.emit(rowData);
  }
}
