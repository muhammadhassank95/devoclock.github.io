import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'sidebar-logo',
  templateUrl: './sidebar-logo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarLogoComponent {

  @Input() sidebarExpanded: boolean = true;

}
