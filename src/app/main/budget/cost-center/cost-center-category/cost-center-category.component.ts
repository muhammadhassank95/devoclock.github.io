import { Component, Injector } from '@angular/core';
import { LookupComponent } from '@app/main/generics/components/lookup/lookup.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cost-center-category',
  templateUrl: './cost-center-category.component.html',
})
export class CostCenterCategoryComponent extends LookupComponent {
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

  validateCostCenterCategory() {
    if (this.dto.name == '' || this.dto.name == null) {
      this.msgService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill the Name field' });
      return;
    }
    if (this.dto.serialNumber == '' || this.dto.serialNumber == null) {
      this.msgService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill the serisl number field' });
      return;
    }
    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "CostCenterCategory")
  }
}
