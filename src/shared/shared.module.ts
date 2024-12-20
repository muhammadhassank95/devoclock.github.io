import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { PickerComponent } from "./components/picker/picker.component";
import { SuggestionLookupTableModalComponent } from "./components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { AppSessionService } from "./session/app-session.service";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DialogModule } from "primeng/dialog";
import { AppUrlService } from "./nav/app-url.service";
import { AppAuthService } from "./auth/app-auth.service";
import { AppRouteGuard } from "./auth/auth-route-guard";
import { LocalizePipe } from "@shared/pipes/localize.pipe";
import { CheckboxModule } from "primeng/checkbox";
import { AbpPaginationControlsComponent } from "./components/pagination/abp-pagination-controls.component";
import { AbpValidationSummaryComponent } from "./components/validation/abp-validation.summary.component";
import { AbpModalHeaderComponent } from "./components/modal/abp-modal-header.component";
import { InputTextModule } from "primeng/inputtext";
import { AbpModalFooterComponent } from "./components/modal/abp-modal-footer.component";
import { LayoutStoreService } from "./layout/layout-store.service";
import { DropdownSelectorComponent } from "./components/dropdown-selector/dropdown-selector.component";
import { BusyDirective } from "./directives/busy.directive";
import { EqualValidator } from "./directives/equal-validator.directive";
import { PaginatorModule } from "primeng/paginator";
import { ChartOfAccountPickerComponent } from "./components/chart-of-account-picker/chart-of-account-picker.component";
import { PositiveNumberOnlyDirective } from "./directives/positive-number-only.directive";
import { AllowOnlyAlphabetsDirective } from "./directives/allow-only-alphabets.directive";
import { FileUploadModule } from "primeng/fileupload";
// import { ChartOfAccountModalComponent } from './components/chart-of-account-picker/chart-of-account-modal.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    CheckboxModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
    PaginatorModule,
    FileUploadModule,
  ],
  declarations: [
    AbpPaginationControlsComponent,
    PickerComponent,
    SuggestionLookupTableModalComponent,
    AbpValidationSummaryComponent,
    ChartOfAccountPickerComponent,
    // ChartOfAccountModalComponent,
    AbpModalHeaderComponent,
    DropdownSelectorComponent,
    AllowOnlyAlphabetsDirective,
    AbpModalFooterComponent,
    LocalizePipe,
    BusyDirective,
    EqualValidator,
    PositiveNumberOnlyDirective,
  ],
  exports: [
    AbpPaginationControlsComponent,
    AbpValidationSummaryComponent,
    ChartOfAccountPickerComponent,
    // ChartOfAccountModalComponent,
    AbpModalHeaderComponent,
    SuggestionLookupTableModalComponent,
    PickerComponent,
    AllowOnlyAlphabetsDirective,
    AbpModalFooterComponent,
    DropdownSelectorComponent,
    LocalizePipe,
    BusyDirective,
    EqualValidator,
    PositiveNumberOnlyDirective,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        AppSessionService,
        AppUrlService,
        AppAuthService,
        AppRouteGuard,
        LayoutStoreService,
      ],
    };
  }
}
