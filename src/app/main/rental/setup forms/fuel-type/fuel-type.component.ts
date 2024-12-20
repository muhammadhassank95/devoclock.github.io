import { Component, Injector } from "@angular/core";
import { LookupComponent } from "@app/main/generics/components/lookup/lookup.component";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-fuel-type",
  templateUrl: "./fuel-type.component.html",
})
export class FuelTypeComponent extends LookupComponent {
  dto = {
    id: 0,
    name: null,
    isActive: true,
    serviceItemId: null,
    serviceItemName: null,
  };
  validateFromParent = true;
  constructor(injector: Injector, private msgService: MessageService) {
    super(injector);
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
    if (this.dto.serviceItemId == "" || this.dto.serviceItemId == null) {
      this.msgService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill the Service Item field",
      });
      return;
    }
    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "FuelType");
  }
  setPickerValue(value: any, title: string) {
    switch (title) {
      case "ServiceItem":
        this.dto.serviceItemId = value.id;
        this.dto.serviceItemName = value.name;
        debugger;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
}
