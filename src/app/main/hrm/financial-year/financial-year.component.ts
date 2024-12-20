import {
  Component,
  Injector,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { LookupComponent } from "@app/main/generics/components/lookup/lookup.component";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-financial-year",
  templateUrl: "./financial-year.component.html",
})
export class FinancialYearComponent extends LookupComponent {
  @ViewChild("nameInput", { static: false }) nameInput: ElementRef;

  year1: number;
  year2: number;

  dto = {
    id: 0,
    isActive: true,
    name: "",
    startDate: null,
    endDate: null,
  };

  validateFromParent = true;
  constructor(injector: Injector, private msgService: MessageService) {
    super(injector);
  }
  ngAfterViewInit() {
    // Set focus to the input field
    debugger;
    setTimeout(() => this.nameInput.nativeElement.focus(), 0);
  }

  validate() {
    if (this.dto.name == "" || this.dto.name == null) {
      this.msgService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill the Name field",
      });
      return;
    }
    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "FinancialYear");
  }

  handleYearChange(value: Date) {
    debugger;
    this.year1 = value.getFullYear();
    this.year2 = value.getFullYear() + 1;
    const endDate = new Date(value);
    endDate.setFullYear(this.year2);
    // Subtract one day to get the last day of the financial year
    endDate.setDate(endDate.getDate() - 1);
    this.dto.endDate = endDate;
    this.dto.name = this.year1 + "-" + this.year2;
  }
}
