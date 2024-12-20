import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SuggestionLookupTableModalComponent } from '@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent';
import { GridApi, GridReadyEvent, ColDef } from 'ag-grid-community';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-address-grid',
    templateUrl: './address-grid.component.html'
})
export class AddressGridComponent {

    protected gridApi: GridApi;
    rowSelection: string;
    rowCount: number;
    // rowData: any[] = [];
    protected setParms;
    target: string;
    @Input() rowData: any

    suggestionModalRef: BsModalRef;
    @ViewChild('SuggestionLookupTableModalComponent') SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
    @Output() outputLicenseArray: EventEmitter<any[]> = new EventEmitter<any[]>();


    constructor(
        private suggestionService: BsModalService,
    ) {
    }



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
            headerName: "Address type",
            editable: true,
            field: "addressType",
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['Postal', 'Permanent', 'Temporary'],
            },
            resizable: true,
            suppressSizeToFit: true,
        },
        {
            headerName: "Description",
            editable: true,
            field: "description",
            resizable: true,
            suppressSizeToFit: true,
        },
        {
            headerName: "Postal Code",
            editable: true,
            field: "postalCode",
            resizable: true,
            suppressSizeToFit: true,
        },
        {
            headerName: "Province",
            editable: true,
            field: "province",
            resizable: true,
            //   cellEditor: 'agDateInput',
            suppressSizeToFit: true,
        },
        {
            headerName: "City",
            editable: true,
            field: "city",
            resizable: true,
            //   cellEditor: 'agDateInput',
            suppressSizeToFit: true,
        },
        {
            headerName: "Phone",
            editable: true,
            field: "phone",
            resizable: true,
            //   cellEditor: 'agDateInput',
            suppressSizeToFit: true,
        },
        {
            headerName: "Police",
            editable: true,
            field: "police",
            resizable: true,
            //   cellEditor: 'agDateInput',
            suppressSizeToFit: true,
        },
    ];


    onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
        this.rowSelection = "multiple";
    }

    onAddRow() {
        const newItem = {};
        this.colDefs.forEach(colDef => {
            newItem[colDef.field] = "";
        });
        this.gridApi.applyTransaction({ add: [newItem] });
        this.rowCount = this.gridApi.getDisplayedRowCount();
    }

    onRemoveSelected() {
        const selectedNodes = this.gridApi.getSelectedNodes();
        this.gridApi.applyTransaction({ remove: selectedNodes.map(node => node.data) });
        this.rowCount = this.gridApi.getDisplayedRowCount();
    }

    addIconCellRendererFunc() {
        debugger;
        return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
    }


    cellClicked(params) {
        debugger;
        switch (params.column["colId"]) {
            case "addLicense":
                this.setParms = params;
                this.openSelectLicenseType();
                break;
            default:
                break;
        }
    }

    openSelectLicenseType() {
        debugger
        this.target = "LicenseType"
        const initialState: any = {
            target: this.target
        };
        this.suggestionModalRef = this.suggestionService.show(SuggestionLookupTableModalComponent, { initialState });

        this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
            debugger
            this.setParms.data.licenseTypeId = result.id
            this.setParms.data.licenseTypeName = result.name
            this.gridApi.refreshCells();
        });
    }

    onSave() {
        debugger
        var rowData = [];
        this.gridApi.forEachNode((node) => {
            rowData.push(node.data);
        });
        this.outputLicenseArray.emit(rowData);
    }
}
