import { Component , Injector } from "@angular/core";
import { LookupComponent } from "@app/main/generics/components/lookup/lookup.component";
import { map, Observable } from "rxjs";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-city",
  templateUrl: "./city.component.html",
})
export class CityComponent extends LookupComponent {
  provinceOneDropdown: any[] = [];
  provinceSelectedItem: any;

  dto = {
    id: 0,
    name: null,
    provinceId: null,
    provinceName: null,
    isActive: true,
  };
  validateFromParent = true;
  constructor(
    injector: Injector,
    private msgService: MessageService,
    private _suggestionLookUpService: SuggestionLookupTableModaLService
  ) {
    super(injector);
  }

  ngOnInit(){
    this.fetchDropdownData('Province').subscribe((items) => (this.provinceOneDropdown = items));
  }

  getEmittedValues(event: any){
    console.log("mainDTOObject", event)
    console.log("dropdown", this.provinceOneDropdown)
    const provinceSelectedValue = this.provinceOneDropdown.find(
      (item) => item.id === String(event.provinceId)
    );
    console.log(provinceSelectedValue)
    this.provinceSelectedItem = provinceSelectedValue;
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

  onDropdownChange(event: any){
    const value = event.value;
    if(value){
      this.dto.provinceId = +value.id;
        this.dto.provinceName = value.name;
    }
  }

  setPickerValue(value: any, title: string) {
    switch (title) {
      case "Province":
        this.dto.provinceId = +value.id;
        this.dto.provinceName = value.name;
        debugger;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  validateLocation() {
    if (this.dto.name == "" || this.dto.name == null) {
      this.msgService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill the Name field",
      });
      return;
    }
    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "City");
  }
}
