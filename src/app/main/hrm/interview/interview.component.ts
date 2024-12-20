import { Component, Injector } from '@angular/core';
import { LookupComponent } from '@app/main/generics/components/lookup/lookup.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
})
export class InterviewComponent extends LookupComponent {
  dto = {
    id: 0,
    name: null,
    isActive: true,
    initialDate: null,
    conductedDate: null,
    status: null,
    skills: null,
    remarks: null,
  }
  validateFromParent = true;
  constructor(
    injector: Injector,
    private msgService: MessageService
  ) {
    super(injector);
  }
  validateInterview() {
    if (this.dto.name == '' || this.dto.name == null) {
      this.msgService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill the Name field' });
      return;
    }
    if (this.dto.initialDate == '' || this.dto.initialDate == null) {
      this.msgService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill the initialDate field' });
      return;
    }
    if (this.dto.conductedDate == '' || this.dto.conductedDate == null) {
      this.msgService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill the conductedDate field' });
      return;
    }
    if (this.dto.status == '' || this.dto.status == null) {
      this.msgService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill the status field' });
      return;
    }
    if (this.dto.skills == '' || this.dto.skills == null) {
      this.msgService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill the skills field' });
      return;
    }
    if (this.dto.remarks == '' || this.dto.remarks == null) {
      this.msgService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill the remarks field' });
      return;
    }
    this.validateFromParent = false;
    this.createOrEditAfterValidation(this.dto, "Interview")
  }
}