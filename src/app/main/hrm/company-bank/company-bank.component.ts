import { Component, Injector } from '@angular/core';
import { LookupComponent } from '@app/main/generics/components/lookup/lookup.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-company-bank',
  templateUrl: './company-bank.component.html'
})
export class CompanyBankComponent extends LookupComponent {
  dto = {
    id: 0,
    isActive: true,
    name: '',
    branchName: '',
    accountNumber: '',
    isPrimary: true
  }


  constructor(
    injector: Injector,
    private msgService: MessageService
  ) {
    super(injector);
  }


  validateFromParent = true;

  validateCompanyBank() {
    debugger
    if (this.dto.name == '' || this.dto.name == null) {
      this.msgService.add({ severity: 'error', summary: 'Validation Error', detail: 'Name cannot be empty.' });
      return
    }

    if (this.dto.branchName === '' || this.dto.branchName === null) {
      this.msgService.add({ severity: 'error', summary: 'Validation Error', detail: 'Branch Name cannot be empty.' });
      return;
    }

    if (this.dto.accountNumber === '' || this.dto.accountNumber === null) {
      this.msgService.add({ severity: 'error', summary: 'Validation Error', detail: 'Account Number cannot be empty.' });
      return;
    }

    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "CompanyBank")

  }
}
