import { Component, Injector } from "@angular/core";
import { LookupComponent } from "@app/main/generics/components/lookup/lookup.component";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-tax-section",
  templateUrl: "./tax-section.component.html",
})
export class TaxSectionComponent extends LookupComponent {
  dto = {
    id: 0,
    name: null,
    percentage: null,
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
    if (this.dto.percentage == "" || this.dto.percentage == null) {
      this.msgService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill the Percentage field",
      });
      return;
    }
    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "TaxSection");
  }
}
