import { Component, OnInit,Injector } from '@angular/core';
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";


@Component({
  selector: 'app-cost-center-tab',
  templateUrl: './cost-center-tab.component.html',
})
export class CostCenterTabComponent extends AppComponentBase implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }
  permissions: PermissionsDto;
  ngOnInit() {}

  isPermitted(service: string): boolean {
    return this.isGranted(service);
  }
}
