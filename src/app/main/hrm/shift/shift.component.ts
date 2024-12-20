import { Component, Injector } from "@angular/core";
import { LookupComponent } from "@app/main/generics/components/lookup/lookup.component";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-shift",
  templateUrl: "./shift.component.html",
})
export class ShiftComponent extends LookupComponent {
  dto = {
    id: 0,
    isActive: true,
    name: null,
    inTime: null,
    outTime: null,
    breakTime: null,
    breakOut: null,
    graceTime: null,
    totalWorkingHours: null,
    totalDutyHours: null,
    allowedLateMinutes: null,
    overTimeRate: null,
    calculateOTAfterMinutes: null,
    dailyWageRate: null,
    hoursRequiredForOT: null,
    isOverTimeBasedOnBasicPay: true,
    isExemptFromAttendance: true,
    restDays: null,
  };

  days: any[] = [
    { name: "Monday", code: 1 },
    { name: "Tuesday", code: 2 },
    { name: "Wednesday", code: 3 },
    { name: "Thursday", code: 4 },
    { name: "Friday", code: 5 },
    { name: "Saturday", code: 6 },
    { name: "Sunday", code: 0 },
  ];
  selectedDays: any[];

  validateFromParent = true;
  constructor(injector: Injector, private msgService: MessageService) {
    super(injector);
  }
  daysSelectionChange(selectedDays: any[]) {
    console.log("Selected days:", selectedDays);
    debugger;
    var rdays = [];
    selectedDays.map((item) => rdays.push(item.code));
    // Perform any additional logic needed when the selection changes
    debugger;
    this.dto.restDays = rdays;
  }

  validateShift() {
    if (this.dto.name == "" || this.dto.name == null) {
      this.msgService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill the Name field",
      });
      return;
    }
    if (this.dto.inTime == "" || this.dto.inTime == null) {
      this.msgService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill the inTime field",
      });
      return;
    }
    if (this.dto.outTime == "" || this.dto.outTime == null) {
      this.msgService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill the outTime field",
      });
      return;
    }
    if (this.dto.breakTime == "" || this.dto.breakTime == null) {
      this.msgService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill the breakTime field",
      });
      return;
    }
    if (this.dto.breakOut == "" || this.dto.breakOut == null) {
      this.msgService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill the breakOut field",
      });
      return;
    }
    if (this.dto.graceTime == "" || this.dto.graceTime == null) {
      this.msgService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill the graceTime field",
      });
      return;
    }
    if (this.dto.restDays == "" || this.dto.restDays == null) {
      this.msgService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill the restDays field",
      });
      return;
    }
    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "Shift");
  }
}
