import { Component, Injector } from '@angular/core';
import { LookupComponent } from '@app/main/generics/components/lookup/lookup.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-allowance',
  templateUrl: './allowance.component.html'
})
export class AllowanceComponent extends LookupComponent {

  constructor(
    injector: Injector,
    private msgService: MessageService
  ) {
    super(injector);
  }

  dto = {
    id: 0,
    isActive: true,
    name: '',
    percentage: 0,
    isSalaryEditable: true,
    isAllowanceEditable: true
  }

  validateFromParent = true;
  validateAllowance() {

    if (this.dto.name == '' || this.dto.name == null) {
      this.msgService.add({ severity: 'error', summary: 'Validation Error', detail: 'Name cannot be empty.' });
      return
    }

    if (this.dto.percentage < 0) {
      this.dto.percentage = null
      this.msgService.add({ severity: 'error', summary: 'Validation Error', detail: 'Percentage cannot be negative.' });
      return
    }

    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "Allowance")
  }
}