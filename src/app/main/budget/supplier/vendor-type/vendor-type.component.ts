import { Component, Injector } from "@angular/core";
import { LookupComponent } from "@app/main/generics/components/lookup/lookup.component";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-vendor-type",
  templateUrl: "./vendor-type.component.html",
})
export class VendorTypeComponent extends LookupComponent {
  dto = {
    id: 0,
    name: null,
    isActive: true,
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
    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "VendorType");
  }
}