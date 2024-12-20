import { Component, Injector } from "@angular/core";
import { LookupComponent } from "@app/main/generics/components/lookup/lookup.component";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-account-type",
  templateUrl: "./account-type.component.html",
})
export class AccountTypeComponent extends LookupComponent {
  dto = {
    id: 0,
    name: null,
    shortName: null,
    isActive: true,
  };
  validateFromParent = true;
  nameOptions = [
    { label: "Supplier", value: "Supplier" },
    { label: "Vendor", value: "Vendor" },
  ];
  constructor(injector: Injector, private msgService: MessageService) {
    super(injector);
  }

  validateAccountType() {
    if (this.dto.name == "" || this.dto.name == null) {
      this.msgService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill the Name field",
      });
      return;
    }
    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "AccountType");
  }
}
