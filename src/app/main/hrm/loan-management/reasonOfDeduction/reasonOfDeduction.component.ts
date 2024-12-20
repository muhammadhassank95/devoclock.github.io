import { LookupComponent } from '@app/main/generics/components/lookup/lookup.component';
import { Component, Injector } from '@angular/core';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reasonOfDeduction',
  templateUrl: './reasonOfDeduction.component.html'
})
export class ReasonOfDeduction extends LookupComponent {
  dto = {
    id: 0,
    isActive: true,
    name: ''
  }
  validateFromParent = true;
  constructor(
    injector: Injector,
    private msgService: MessageService
  ) {
    super(injector);
  }

  validateReasonOfDeduction() {
    if (this.dto.name == '' || this.dto.name == null) {
      this.msgService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill the Name field' });
      return;
    }
    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "ReasonofDeduction")
  }
}
