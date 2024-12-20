import { Component, Injector } from '@angular/core';
import { LookupComponent } from '@app/main/generics/components/lookup/lookup.component';
import { MessageService } from 'primeng/api';
import { BudgetService } from '../../shared/services/budget.service'
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { SuggestionLookupTableModaLService } from '@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service';
@Component({
  selector: "app-cost-center",
  templateUrl: "./cost-center.component.html",
})
export class CostCenterComponent extends LookupComponent {
  dto = {
    id: 0,
    name: null,
    isActive: true,
    serialNumber: null,
    description: null,
    startDate: null,
    endDate: null,
    costCenterCategoryId: null,
    costCenterCategoryName: null,
    chartOfAccountId: null,
    chartOfAccountName: null,
    CostCenterCategorySerialNumber: null,
  };
  validateFromParent = true;
  costCenterCategoryDropdown: any[] = [];
  costCenterCategorySelectedItem: any;
  chartOfAccountDropdown: any[] = [];
  chartOfAccountSelectedItem: any;

  constructor(
    injector: Injector,
    private msgService: MessageService,
    private _budgetService: BudgetService,
    private _suggestionLookUpService: SuggestionLookupTableModaLService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.fetchDropdownData('CostCenterCategory').subscribe((items) => (this.costCenterCategoryDropdown = items));
    this.fetchDropdownData('ChartOfAccount').subscribe((items) => (this.chartOfAccountDropdown = items));
  }

  fetchDropdownData(target: string, limit: number = 100, offset: number = 0): Observable<any[]> {
    return this._suggestionLookUpService.getAll(offset, limit, '', target, '').pipe(
      map((response: any) => {
        if (response && response.items) {
          return response.items.map((item: any) => ({
            id: +item.id?.split("/")[0] || 0,
            name: item.name,
          }));
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
      case "CostCenterCategory":
        this.dto.costCenterCategoryId = +value.id;
        // this.dto.projectCategoryName = ""
        this.dto.CostCenterCategorySerialNumber = value.id;
        this.getSerialNumber(value.id);
        break;
      case "ChartOfAccount":
        debugger;
        this.dto.chartOfAccountId = +value.id;
        this.dto.chartOfAccountName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  getEmittedValues(event: any){
    console.log("mainDTOObject", event)
    console.log("dropdown +++2", this.costCenterCategoryDropdown, this.chartOfAccountDropdown)
    const costCenterSelectedValue = this.costCenterCategoryDropdown.find(
      (item) => item.id === event.costCenterCategoryId
    );
    console.log(costCenterSelectedValue)
    this.costCenterCategorySelectedItem = costCenterSelectedValue;
    const chartOfAccountSelectedValue = this.chartOfAccountDropdown.find(
      (item) => item.id === event.chartOfAccountId
    );
    console.log(chartOfAccountSelectedValue)
    this.chartOfAccountSelectedItem = chartOfAccountSelectedValue;
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "CostCenterCategory":
        this.dto.costCenterCategoryId = +value.id.split("/")[0];
        // this.dto.projectCategoryName = ""
        this.dto.CostCenterCategorySerialNumber = value.id.split("/")[1];
        this.getSerialNumber(value.id.split("/")[1]);
        break;
      case "ChartOfAccount":
        debugger;
        this.dto.chartOfAccountId = +value.id.split("/")[0];
        this.dto.chartOfAccountName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  getSerialNumber(id: any) {
    this._budgetService
      .GetCostCenterCount(id)
      .pipe(
        finalize(() => {}),
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
          this.dto.serialNumber = `${this.dto.CostCenterCategorySerialNumber}${response}`;
          debugger;
        },
      });
  }
  validateCostCenter() {
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
    this.createOrEditAfterValidation(this.dto, "CostCenter");
  }
}
