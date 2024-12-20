import { Component } from "@angular/core";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { catchError, finalize, map, Observable, throwError } from "rxjs";
import { MessageService } from "primeng/api";
import {
  TransitionInputsDto,
  colDef,
  formatDateToISO,
} from "../../../shared/DTOs/transmition-dto";
import { TransmitionService } from "../../../shared/services/transmition.service";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";

@Component({
  selector: "app-project-change",
  templateUrl: "./project-change.component.html",
})
export class ProjectChangeComponent {
  protected gridApi: GridApi;
  rowData: any[] = [];
  transitionInputsDto: TransitionInputsDto = new TransitionInputsDto();
  employeeDropdown: any[] = [];
  employeeSelectedItem: any;
  currentProjectDropdown: any[] = [];
  currentProjectSelectedItem: any;
  newProjectDropdown: any[] = [];
  newProjectSelectedItem: any;
  constructor(
    private _transmitionService: TransmitionService,
    private messageService: MessageService,
    private _suggestionLookUpService: SuggestionLookupTableModaLService
  ) { }
  colDefs: ColDef[] = colDef;

  ngOnInit(): void{
    this.fetchDropdownData('Employee').subscribe((items) => (this.employeeDropdown = items));
    this.fetchDropdownData('Project').subscribe((items) => (this.currentProjectDropdown = items));
    this.fetchDropdownData('Project').subscribe((items) => (this.newProjectDropdown = items));
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  fetchDropdownData(target: string, limit: number = 100, offset: number = 0): Observable<any[]> {
    return this._suggestionLookUpService.getAll(offset, limit, '', target, '').pipe(
      map((response: any) => {
        if (response && response.items) {
            return response.items.map((item: any) => ({
              id: item.id,
              name: item.name,
            }));
        } else {
          console.error(`Invalid response format for ${target}: `, response);
          return [];
        }
      })
    );
  }


  onDropdownChange(event: any, type: string){
    const value = event.value;
    switch (type) {
      case "Employee":
        this.transitionInputsDto.erpId = value.id;
        this.getUserHistoryDetails(value.id);
        this.getCurrentProject(value.additional);
        break;
      case "current":
        this.transitionInputsDto.currentId = +value.id;
        break;
      case "new":
        this.transitionInputsDto.newId = +value.id;
        break;

      default:
        alert(`${type} is not defined`);
    }
  }

  save() {
    debugger;
    if (!this.transitionInputsDto.erpId) {
      this.messageService.add({
        // severity: "success",
        summary: "Required",
        detail: "Please Select Employee Id",
        life: 2000,
      });
      return;
    }
    if (!this.transitionInputsDto.currentId) {
      this.messageService.add({
        // severity: "success",
        summary: "Required",
        detail: "Please Select Current Project",
        life: 2000,
      });
      return;
    }
    if (!this.transitionInputsDto.newId) {
      this.messageService.add({
        // severity: "success",
        summary: "Required",
        detail: "Please Select New Project",
        life: 2000,
      });
      return;
    }

    this.transitionInputsDto.applicableFrom = formatDateToISO(
      new Date(this.transitionInputsDto.applicableFrom)
    );
    this._transmitionService
      .create(this.transitionInputsDto, "UpdateProject")
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.message,
            life: 2000,
          });
          return throwError(error.message);
        })
      )
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: "success",
            summary: "Confirmed",
            detail: "SavedSuccessfully",
            life: 2000,
          });
          this.clear();
        },
      });
  }
  clear() {
    this.transitionInputsDto.id = null;
    this.transitionInputsDto.isActive = false;
    this.transitionInputsDto.erpId = "";
    this.transitionInputsDto.erpName = "";
    this.transitionInputsDto.currentId = null;
    this.transitionInputsDto.currentName = "";
    this.transitionInputsDto.newId = null;
    this.transitionInputsDto.newName = "";
    this.transitionInputsDto.applicableFrom = null;
    this.transitionInputsDto.masterName = null;
    this.transitionInputsDto.masterId = null;
    this.rowData = [];
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Employee":
        this.transitionInputsDto.erpId = value.id;
        this.transitionInputsDto.erpName = value.name;
        if (value.additional) {
          this.getUserHistoryDetails(value.id);
          this.getCurrentProject(value.additional);
        }
        break;
      case "current":
        this.transitionInputsDto.currentId = +value.id;
        break;
      case "new":
        this.transitionInputsDto.newId = +value.id;
        break;

      default:
        alert(`${title} is not defined`);
    }
  }

  getUserHistoryDetails(value: any) {
    debugger;
    var dto = {
      erpId: value,
      target: "Project",
    };
    this._transmitionService
      .GetAllHistory(dto)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.message,
            life: 2000,
          });
          return throwError(error.message);
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.rowData = response.changeLogs;
          this.transitionInputsDto.masterId = response.defaultTargetId;
          this.transitionInputsDto.masterName = response.defaultTargetName;
          debugger;
        },
      });
  }
  getCurrentProject(id: any) {
    this._transmitionService.getCurrentInfo(id, "GetProject").subscribe({
      next: (response) => {
        debugger;
        if (response) {
          this.transitionInputsDto.currentId = response.id;
          this.transitionInputsDto.currentName = response.name;
        } else {
          console.error("No result found in response");
        }
      },
      error: (err) => {
        console.error("Error fetching current designation", err);
      },
      complete: () => {
        console.log("Designation fetch complete");
      },
    });
  }
}
