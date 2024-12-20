import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GridApi, GridReadyEvent, ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html'
})

export class GridComponent {
  protected gridApi: GridApi;
  rowSelection: string;
  rowCount: number;
  // rowData: any[] = [];
  colDefs: ColDef[] = [];

  @Input() inputObject: any;
  @Input() rowData: any
  @Input() viewMode?: boolean
  @Output() outputArray: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor() { }

  ngOnChanges() {
    if (this.inputObject) {
      this.generateColDefs();
    }
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("Data", this.rowData)
  }
  generateColDefs() {
    this.colDefs = [
      { headerName: "Sr", valueGetter: "node.rowIndex + 1", editable: false, width: 80 },
      ...Object.keys(this.inputObject).map(key => {
        let columnDef: ColDef = { field: key, editable: true };

        const dataType = typeof this.inputObject[key];
        switch (dataType) {
          case 'boolean':
            columnDef = {
              ...columnDef,
              cellEditor: 'agSelectCellEditor',
              cellEditorParams: { values: ['true', 'false'] },

            }; break;
          case 'number':
            columnDef = { ...columnDef, type: 'numericColumn' };
            break;
          case 'object': // Date type
            columnDef = {
              ...columnDef,
              cellEditor: 'agDateCellEditor',
              valueFormatter: params => {
                if (params.value) {
                  const date = new Date(params.value);
                  return date.toISOString().split('T')[0]; // Format date as yyyy-mm-dd
                }
                return '';
              },
              valueParser: params => {
                return new Date(params.newValue); // Parse string to Date object
              }
            };
            break;
          default:
            break;
        }

        return columnDef;
      })
    ];
  }



  onAddRow() {
    const newItem = {};
    this.colDefs.forEach(colDef => {
      newItem[colDef.field] = "";
    });
    this.gridApi.applyTransaction({ add: [newItem] });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  onRemoveRow() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.gridApi.applyTransaction({ remove: selectedNodes.map(node => node.data) });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  onSave() {
    const rowData: any[] = [];
    this.gridApi.forEachNode(node => {
      rowData.push(node.data);
    });
    this.outputArray.emit(rowData);
  }

  onGridReady(params: GridReadyEvent) {
    debugger
    console.log(this.rowData)
    this.gridApi = params.api;
    this.rowSelection = "multiple";
  }
}

