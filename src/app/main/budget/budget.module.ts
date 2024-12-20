import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CostCenterTabComponent } from "./cost-center/cost-center-tab/cost-center-tab.component";
import { BudgetRoutingModule } from "./budget-routing.module";
import { BudgetSetupsComponent } from "./budget-setups/budget-setups.component";
import { ProjectTabComponent } from "./project/project-tab/project-tab.component";
import { ProjectCategoryComponent } from "./project/project-category/project-category.component";
import { ProjectTypeComponent } from "./project/project-type/project-type.component";
import { CostCenterComponent } from "./cost-center/cost-center/cost-center.component";
import { CostCenterCategoryComponent } from "./cost-center/cost-center-category/cost-center-category.component";
import { BulkUploadComponent } from "./bulk-upload/bulk-upload.component";
import { TabViewModule } from "primeng/tabview";
import { ToastModule } from "primeng/toast";
import { CheckboxModule } from "primeng/checkbox";
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from "primeng/calendar";
import { InputTextModule } from "primeng/inputtext";
import { ToolbarModule } from "primeng/toolbar";
import { PaginatorModule } from "primeng/paginator";
import { InputNumberModule } from "primeng/inputnumber";
import { InputMaskModule } from "primeng/inputmask";
import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { SharedModule } from "@shared/shared.module";
import { MainModule } from "../main.module";
import { ProjectComponent } from "./project/project/project.component";
import { ChartOfAccountTabsComponent } from "./chart-of-account/chart-of-account-tabs/chart-of-account-tabs.component";
import { LevelOneComponent } from "./chart-of-account/level-one/level-one.component";
import { LevelTwoComponent } from "./chart-of-account/level-two/level-two.component";
import { LevelThreeComponent } from "./chart-of-account/level-three/level-three.component";
import { ChartOfAccountComponent } from "./chart-of-account/chart-of-account/chart-of-account.component";
import { LinkWithComponent } from "./chart-of-account/link-with/link-with.component";
import { AccountTypeComponent } from "./chart-of-account/account-type/account-type.component";
import { AnnualBudgetComponent } from "../budget/annual-budget/annual-budget.component";
import { MonthlyBudgetComponent } from "../budget/monthly-budget/monthly-budget.component";
import { AddOrReviseMonthlyBudgetComponent } from "../budget/monthly-budget/add-or-revise-monthly-budget.component";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { AgGridAngular } from "ag-grid-angular";
import { MultiSelectModule } from "primeng/multiselect";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SupplierDetailsComponent } from "./supplier/supplier-details/supplier-details.component";
import { SupplierTabsComponent } from "./supplier/supplier-tabs/supplier-tabs.component";
import { CityComponent } from "./supplier/city/city.component";
import { CountryComponent } from "./supplier/country/country.component";
import { ProvinceComponent } from "./supplier/province/province.component";
import { TaxSectionComponent } from "./supplier/tax-section/tax-section.component";
import { VendorTypeComponent } from "./supplier/vendor-type/vendor-type.component";
import { FileUploadModule } from "primeng/fileupload";
import { ReusableFileUploadComponent } from "@shared/components/reusable-file-upload/reusable-file-upload.component";
import { SubLedgerComponent } from "./sub-ledger/sub-ledger.component";
import { RegionComponent } from "./region/region.component";
import { VoucherRestrictionComponent } from "./voucher-restriction/voucher-restriction.component";
import { HierarchyLinkingComponent } from "./hierarchy-linking/hierarchy-linking.component";
@NgModule({
  declarations: [
    BudgetSetupsComponent,
    ProjectCategoryComponent,
    CostCenterComponent,
    CostCenterCategoryComponent,
    CostCenterTabComponent,
    BulkUploadComponent,
    ProjectTabComponent,
    HierarchyLinkingComponent,
    ProjectTypeComponent,
    ProjectComponent,
    ChartOfAccountTabsComponent,
    LevelOneComponent,
    LevelTwoComponent,
    LevelThreeComponent,
    ChartOfAccountComponent,
    LinkWithComponent,
    AccountTypeComponent,
    AnnualBudgetComponent,
    MonthlyBudgetComponent,
    AddOrReviseMonthlyBudgetComponent,
    SupplierTabsComponent,
    SupplierDetailsComponent,
    CityComponent,
    CountryComponent,
    ProvinceComponent,
    TaxSectionComponent,
    VendorTypeComponent,
    ReusableFileUploadComponent,
    SubLedgerComponent,
    RegionComponent,
    VoucherRestrictionComponent,
  ],
  imports: [
    CommonModule,
    FileUploadModule,
    BudgetRoutingModule,
    TabViewModule,
    ToastModule,
    CheckboxModule,
    CalendarModule,
    InputTextModule,
    ToolbarModule,
    PaginatorModule,
    ReactiveFormsModule,
    InputMaskModule,
    InputNumberModule,
    TableModule,
    DialogModule,
    SharedModule,
    FormsModule,
    MainModule,
    ConfirmDialogModule,
    AgGridAngular,
    MultiSelectModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    InputSwitchModule,
  ],
})
export class BudgetModule {}
