import { Component, Injector } from '@angular/core';
import { LookupComponent } from '@app/main/generics/components/lookup/lookup.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-project-type',
  templateUrl: './project-type.component.html',
})
export class ProjectTypeComponent extends LookupComponent {
  dto = {
    id: 0,
    name: null,
    isActive: true,
    serialNumber: null
  }
  validateFromParent = true;
  constructor(
    injector: Injector,
    private msgService: MessageService
  ) {
    super(injector);
  }

  validateProjectType() {
    if (this.dto.name == '' || this.dto.name == null) {
      this.msgService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill the Name field' });
      return;
    }
    if (this.dto.serialNumber == '' || this.dto.serialNumber == null) {
      this.msgService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill the serialNumber field' });
      return;
    }
    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "ProjectType")
  }
}
