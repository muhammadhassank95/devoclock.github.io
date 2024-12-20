import { Component,OnInit,Injector} from '@angular/core';
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html'
})
export class LeaveManagementComponent extends AppComponentBase implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }
  activeIndex: number;
  permissions: PermissionsDto;
  ngOnInit(): void {
    this.activeIndex = +localStorage.getItem('activeTabIndex') || 0;
  }
  onTabChange(event: any): void {
    this.activeIndex = event.index;
    localStorage.setItem('activeTabIndex', this.activeIndex.toString());
  }
  isPermitted(service: string): boolean {
    return this.isGranted(service);
  }
}
