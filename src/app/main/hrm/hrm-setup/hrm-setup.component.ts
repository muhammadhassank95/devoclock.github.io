import { Component, Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";

@Component({
  selector: "app-hrm-setup",
  templateUrl: "./hrm-setup.component.html",
})
export class HrmSetupComponent extends AppComponentBase implements OnInit {
  activeIndex: number;

  constructor(injector: Injector) {
    super(injector);
  }
  permissions: PermissionsDto;
  ngOnInit(): void {
    this.activeIndex = +localStorage.getItem("activeTabIndex") || 0;
  }
  isPermitted(service: string): boolean {
    return this.isGranted(service);
  }
  inputObject = {
    make: "",
    model: "",
    price: 0,
    electric: false,
    date: new Date(),
  };
  onOutputArray(output: any[]) {
    console.log("Output Array:", output);
  }
  onTabChange(event: any): void {
    this.activeIndex = event.index;
    localStorage.setItem("activeTabIndex", this.activeIndex.toString());
  }
}
