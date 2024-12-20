import { map } from "rxjs";
import { Component, Injector } from "@angular/core";
import { AbpSessionService } from "abp-ng2-module";
import { AppComponentBase } from "@shared/app-component-base";
import { accountModuleAnimation } from "@shared/animations/routerTransition";
import { AppAuthService } from "@shared/auth/app-auth.service";
import { AccountServiceProxy } from "@shared/service-proxies/service-proxies";

@Component({
  templateUrl: "./login.component.html",
  animations: [accountModuleAnimation()],
})
export class LoginComponent extends AppComponentBase {
  submitting = false;
  showPassword = false;
  constructor(
    injector: Injector,
    public authService: AppAuthService,
    private _sessionService: AbpSessionService,
    private _accountServiceProxy: AccountServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getItem();
  }
  FinancialYears: any[];
  selectedFinancialYear: any;
  getItem() {
    console.log(this._sessionService.userId);

    if (this._sessionService.tenantId) {
      console.log(this._sessionService.tenantId);
      this._accountServiceProxy
        .getFinancialYears(this._sessionService.tenantId)
        .subscribe((result) => {
          console.log(result.body.result);
          this.FinancialYears = result.body.result;
        });
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onSelectionChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.handleSelectionChange(selectedValue);
  }
  handleSelectionChange(value: string) {
    console.log("Handling selection change:", value);

    let fy = this.FinancialYears.find((item) => item.id == value);
    if (fy) {
      localStorage.setItem("FinancialYearObject", JSON.stringify(fy));
    } else {
      localStorage.removeItem("FinancialYearObject");
    }
  }

  get multiTenancySideIsTeanant(): boolean {
    debugger;
    return this._sessionService.tenantId > 0;
  }

  get isSelfRegistrationAllowed(): boolean {
    if (!this._sessionService.tenantId) {
      return false;
    }

    return true;
  }

  login(): void {
    this.submitting = true;
    this.authService.authenticate(() => (this.submitting = false));
  }
}
