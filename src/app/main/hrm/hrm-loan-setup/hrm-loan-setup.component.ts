import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";

@Component({
    selector: 'app-hrm-loan-setup',
    templateUrl: './hrm-loan-setup.component.html',
})
export class HrmLoanSetupComponent extends AppComponentBase implements OnInit {

    constructor(
        injector: Injector,

    ) {
        super(injector);
    }
    permissions: PermissionsDto;
    ngOnInit() {}

    isPermitted(service: string): boolean {
      return this.isGranted(service);
    }


}
