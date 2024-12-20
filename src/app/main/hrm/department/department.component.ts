import { Component, Injector } from "@angular/core";
import { LookupComponent } from "@app/main/generics/components/lookup/lookup.component";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
})
export class DepartmentComponent extends LookupComponent {
  dto = {
    id: 0,
    isActive: true,
    name: "",
    minStrength: 0,
    maxStrength: 0,
    allowsOverTime: true,
  };

  constructor(injector: Injector, private msgService: MessageService) {
    super(injector);
  }

  validateFromParent = true;

  validateDepartment() {
    if (this.dto.name == "" || this.dto.name == null) {
      this.msgService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill the Name field",
      });
      return;
    }
    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "Department");
  }

  OnChangeNumberMin(event: any) {
    if (event.target.value >= 0 && event.target.value < 1000) {
      this.dto.minStrength = event.target.value;
    } else {
      this.dto.minStrength = 0;
    }
  }

  OnChangeNumberMax(event: any) {
    if (event.target.value >= 0 && event.target.value < 1000) {
      this.dto.maxStrength = event.target.value;
    } else {
      this.dto.maxStrength = 0;
    }
  }
}
