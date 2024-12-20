import { Component, Injector } from '@angular/core';
import { LookupComponent } from '@app/main/generics/components/lookup/lookup.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-payment-mode',
  templateUrl: './payment-mode.component.html'
})
export class PaymentModeComponent extends LookupComponent {
  dto = {
    id: 0,
    isActive: true,
    name: ''
  }

  constructor(
    injector: Injector,
    private msgService: MessageService
  ) {
    super(injector);
  }


  validateFromParent = true;

  validateCurrentPaymentMode() {
    debugger
    if (this.dto.name == '' || this.dto.name == null) {
      this.msgService.add({ severity: 'error', summary: 'Validation Error', detail: 'Name cannot be empty.' });
      return
    }

    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "CurrentPaymentMode(")

  }
}
