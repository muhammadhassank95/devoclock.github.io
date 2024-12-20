import { Component, Injector } from "@angular/core";
import { LookupComponent } from "@app/main/generics/components/lookup/lookup.component";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-skill-level",
  templateUrl: "./skill-level.component.html",
})
export class SkillLevelComponent extends LookupComponent {
  dto = {
    id: 0,
    name: null,
    isActive: true,
  };
  validateFromParent = true;
  constructor(injector: Injector, private msgService: MessageService) {
    super(injector);
  }

  validateSkillLevel() {
    if (this.dto.name == "" || this.dto.name == null) {
      this.msgService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill the Name field",
      });
      return;
    }
    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "SkillLevel");
  }
}
