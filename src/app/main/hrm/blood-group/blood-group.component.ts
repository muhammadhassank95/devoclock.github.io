import { Component, Injector } from '@angular/core';
import { HttpDynamicService } from '@app/main/generics/services/http/http-dynamic.service';

import { catchError, finalize, throwError } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LookupComponent } from '@app/main/generics/components/lookup/lookup.component';
@Component({
    selector: 'app-blood-group',
    templateUrl: './blood-group.component.html'
})

export class BloodGroupComponent extends LookupComponent {

    dto = {
        id: 0,
        name: null,
        isActive: true,
    }

    constructor(
        injector: Injector,
        private msgService: MessageService
    ) {
        super(injector);
    }


    validateFromParent = true;

    validateBloodGroup() {
        console.log("validateFunction");
        if (this.dto.name == null || '') {
            alert('please fill the name field')
        }
        this.validateFromParent = false;
        this.createOrEditAfterValidation(this.dto, "BloodGroup")

    }
}
