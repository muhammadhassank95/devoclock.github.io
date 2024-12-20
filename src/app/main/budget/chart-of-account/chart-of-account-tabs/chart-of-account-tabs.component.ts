import { Component,Injector,OnInit } from '@angular/core';
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
  selector: 'app-chart-of-account-tabs',
  templateUrl: './chart-of-account-tabs.component.html',
})
export class ChartOfAccountTabsComponent extends AppComponentBase implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }
  permissions: PermissionsDto;
  ngOnInit() {}

  isPermitted(service: string): boolean {
    return this.isGranted(service);
  }
  activeIndex: number = 0
  handleChangeTab(index) {
  this.activeIndex = index
  }
}
