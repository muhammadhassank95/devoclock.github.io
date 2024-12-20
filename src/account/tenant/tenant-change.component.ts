import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import { AccountServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppTenantAvailabilityState } from '@shared/AppEnums';
import {
  IsTenantAvailableInput,
  IsTenantAvailableOutput
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'tenant-change',
  templateUrl: './tenant-change.component.html'
})
export class TenantChangeComponent extends AppComponentBase implements OnInit, OnDestroy {
  tenancyName = '';
  name = '';
  saving = false;
  inputTenancyName = '';

  private inputChanged: Subject<string> = new Subject<string>();
  private destroy$: Subject<void> = new Subject<void>();

  constructor(injector: Injector, private _accountService: AccountServiceProxy) {
    super(injector);
  }

  get isMultiTenancyEnabled(): boolean {
    return abp.multiTenancy.isEnabled;
  }

  ngOnInit() {
    // Initialize the tenant details
    if (this.appSession.tenant) {
      this.tenancyName = this.appSession.tenant.tenancyName;
      this.name = this.appSession.tenant.name;
    }
    this.inputTenancyName = this.tenancyName;

    // Handle input changes with debounce
    this.inputChanged
      .pipe(debounceTime(2000), takeUntil(this.destroy$))
      .subscribe((tenantName) => {
        this.changeTenantWithDebounce(tenantName);
      });
  }

  onInputChange(value: string): void {
    this.inputChanged.next(value);
  }

  private changeTenantWithDebounce(tenantName: string): void {
    if (!tenantName) {
      abp.multiTenancy.setTenantIdCookie(undefined);
      location.reload();
      return;
    }

    const input = new IsTenantAvailableInput();
    input.tenancyName = tenantName;

    this.saving = true;
    this._accountService.isTenantAvailable(input).subscribe(
      (result: IsTenantAvailableOutput) => {
        this.saving = false;
        switch (result.state) {
          case AppTenantAvailabilityState.Available:
            abp.multiTenancy.setTenantIdCookie(result.tenantId);
            this.tenancyName = tenantName;
            location.reload();
            return;
          case AppTenantAvailabilityState.InActive:
            this.message.warn(this.l('TenantIsNotActive', tenantName));
            break;
          case AppTenantAvailabilityState.NotFound:
            this.message.warn(this.l('ThereIsNoTenantDefinedWithName{0}', tenantName));
            break;
        }
      },
      () => {
        this.saving = false;
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
