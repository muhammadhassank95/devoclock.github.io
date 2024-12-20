import { Component, Injector, OnInit } from "@angular/core";
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
  selector: "app-project-tab",
  templateUrl: "./project-tab.component.html",
})
export class ProjectTabComponent extends AppComponentBase implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }
  permissions: PermissionsDto;
  ngOnInit() {}

  isPermitted(service: string): boolean {
    return this.isGranted(service);
  }
}
