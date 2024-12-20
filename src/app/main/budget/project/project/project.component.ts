import { Component, Injector } from "@angular/core";
import { LookupComponent } from "@app/main/generics/components/lookup/lookup.component";
import { MessageService } from "primeng/api";
import { BudgetService } from "./../../shared/services/budget.service";
import { catchError, finalize, map, Observable, throwError } from "rxjs";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
})
export class ProjectComponent extends LookupComponent {
  dto = {
    id: 0,
    name: null,
    isActive: true,
    serialNumber: null,
    startDate: null,
    endDate: null,
    description: null,
    paymentTermsId: null,
    paymentTermsName: null,
    projectCategoryId: null,
    projectCategoryName: null,
    projectTypeName: null,
    projectTypeId: null,
    projectCategorySerialNumber: null,
  };

  projectTypeDropdown: any[] = [];
  selectedItemProjectType: any;
  projectCategoryDropdown: any[] = [];
  selectedItemProjectCategory: any;
  paymentTermsDropdown: any[] = [];
  selectedItemPaymentTerms: any;

  validateFromParent = true;
  constructor(
    injector: Injector,
    private _budgetService: BudgetService,
    private msgService: MessageService,
    private _suggestionLookUpService: SuggestionLookupTableModaLService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.fetchDropdownData('ProjectType').subscribe((items) => (this.projectTypeDropdown = items));
    this.fetchDropdownData('ProjectCategory').subscribe((items) => (this.projectCategoryDropdown = items));
    this.fetchDropdownData('PaymentTerms').subscribe((items) => (this.paymentTermsDropdown = items));
  }

  fetchDropdownData(target: string, limit: number = 100, offset: number = 0): Observable<any[]> {
    return this._suggestionLookUpService.getAll(offset, limit, '', target, '').pipe(
      map((response: any) => {
        if (response && response.items) {
          if(target == 'ProjectType'){
            return response.items.map((item: any) => ({
              id: +item.id.split("/")[0],
              name: item.name,
            }));
          } else if(target == 'ProjectCategory'){
            return response.items.map((item: any) => ({
              id: +item.id.split("/")[0],
              name: item.name,
            }));
          } else {
            return response.items.map((item: any) => ({
              id: item.id,
              name: item.name,
            }));
          }
        } else {
          console.error(`Invalid response format for ${target}: `, response);
          return [];
        }
      })
    );
  }

  onDropdownChange(event: any, title: any){
    const value = event.value;
    switch (title) {
      case "ProjectCategory":
        this.dto.projectCategoryId = +value.id.split("/")[0];
        // this.dto.projectCategoryName = ""
        this.dto.projectCategorySerialNumber = value.id.split("/")[1];
        this.getSerialNumber(value.id.split("/")[0]);
        break;
      case "ProjectType":
        this.dto.projectTypeId = +value.id.split("/")[0];
        // this.dto.projectTypeName = ""
        this.dto.projectCategorySerialNumber = value.id.split("/")[1];
        // this.getSerialNumber(value.id.split("/")[1]);
        break;
      case "PaymentTerms":
        this.dto.paymentTermsId = +value.id;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  getEmittedValues(event: any){
    console.log("mainDTOObject", event)
    console.log("dropdown", this.projectTypeDropdown)
    const projectTypeSelectedValue = this.projectTypeDropdown.find(
      (item) => item.id === event.projectTypeId
    );
    console.log(projectTypeSelectedValue)
    this.selectedItemProjectType = projectTypeSelectedValue;
    const projectCategorySelectedValue = this.projectCategoryDropdown.find(
      (item) => item.id === event.projectCategoryId
    );
    console.log(projectCategorySelectedValue)
    this.selectedItemProjectCategory = projectCategorySelectedValue;
    const paymentTermsSelectedValue = this.paymentTermsDropdown.find(
      (item) => item.id === event.paymentTermsId
    );
    console.log(paymentTermsSelectedValue)
    this.selectedItemPaymentTerms = paymentTermsSelectedValue;
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "ProjectCategory":
        this.dto.projectCategoryId = +value.id.split("/")[0];
        // this.dto.projectCategoryName = ""
        this.dto.projectCategorySerialNumber = value.id.split("/")[1];
        this.getSerialNumber(value.id.split("/")[0]);
        break;
      case "ProjectType":
        this.dto.projectTypeId = +value.id.split("/")[0];
        // this.dto.projectTypeName = ""
        this.dto.projectCategorySerialNumber = value.id.split("/")[1];
        // this.getSerialNumber(value.id.split("/")[1]);
        break;
      case "PaymentTerms":
        this.dto.paymentTermsId = +value.id;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  getSerialNumber(id: any) {
    this._budgetService
      .GetProjectCount(id)
      .pipe(
        finalize(() => { }),
        catchError((error) => {
          this.msgService.add({
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
          this.dto.serialNumber = `${this.dto.projectCategorySerialNumber}${response}`;
          debugger;
        },
      });
  }

  validateProject() {
    if (this.dto.name == "" || this.dto.name == null) {
      this.msgService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill the Name field",
      });
      return;
    }
    if (this.dto.serialNumber == "" || this.dto.serialNumber == null) {
      this.msgService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill the serialNumber field",
      });
      return;
    }
    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "Project");
  }
}
