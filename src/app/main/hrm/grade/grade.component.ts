import { Component, Injector } from '@angular/core';
import { LookupComponent } from '../../generics/components/lookup/lookup.component';
import { MessageService } from 'primeng/api';
@Component({
    selector: 'app-grade',
    templateUrl: './grade.component.html',
})
export class GradeComponent extends LookupComponent {
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

    validateGrade() {
        if (this.dto.name == '' || this.dto.name == null) {
            this.msgService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill the Name field' });
            return;
        }
        this.validateFromParent = false;
        this.createOrEditAfterValidation(this.dto, "Grade")
    }
}
