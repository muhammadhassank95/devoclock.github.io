import { Component, Injector } from "@angular/core";
import { LookupComponent } from "@app/main/generics/components/lookup/lookup.component";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-region",
  templateUrl: "./region.component.html",
  styleUrls: ["./region.component.css"],
})
export class RegionComponent extends LookupComponent {
  dto = {
    id: 0,
    name: null,
    shortName: null,
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
    this.createOrEditAfterValidation(this.dto, "Region");
  }
}
