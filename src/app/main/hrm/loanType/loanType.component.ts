import { Component, Injector } from "@angular/core";
import { LookupComponent } from "@app/main/generics/components/lookup/lookup.component";
import { map } from "rxjs";
import { Observable } from "@node_modules/rxjs/dist/types/internal/Observable";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-loanType",
  templateUrl: "./loanType.component.html",
})
export class LoanTypeComponent extends LookupComponent {
  chartOfAccountDropdown: any[] = [];
  chartOfAccountSelectedItem: any;
  dto = {
    id: 0,
    isActive: true,
    name: "",
    chartOfAccountId: null,
    chartOfAccountName: "",
  };

  constructor(injector: Injector, private msgService: MessageService, private _suggestionLookUpService: SuggestionLookupTableModaLService) {
    super(injector);
  }


  ngOnInit(): void {
    this.fetchDropdownData('ChartOfAccount').subscribe((items) => (this.chartOfAccountDropdown = items));
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
      case "ChartOfAccount":
        this.dto.chartOfAccountId = value.id.split("/")[0];
        this.dto.chartOfAccountName = value.name;
        break;
      default:
        alert(`${type} is not defined`);
    }
  }

  validateFromParent = true;

  validateLoanType() {
    debugger;
    if (this.dto.name == "" || this.dto.name == null) {
      this.msgService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Name cannot be empty.",
      });
      return;
    }

    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "LoanType");
  }

  setPickerValue(value: any, title: string, title2: string = "") {
    switch (title) {
      case "ChartOfAccount":
        this.dto.chartOfAccountId = value.id.split("/")[0];
        this.dto.chartOfAccountName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
}
