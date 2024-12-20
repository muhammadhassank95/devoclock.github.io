import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GeneralLedgerReportComponent } from "./general-ledger-report/general-ledger-report.component";
import { ReportsRoutingModule } from "./reports-routing.module";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { TableModule } from "primeng/table";
import { PaginatorModule } from "primeng/paginator";
import { ToolbarModule } from "primeng/toolbar";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from "primeng/calendar";
import { AgGridAngular } from "ag-grid-angular";
import { CheckboxModule } from "primeng/checkbox";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { TabViewModule } from "primeng/tabview";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MainModule } from "../main.module";
import { FloatLabelModule } from "primeng/floatlabel";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputMaskModule } from "primeng/inputmask";
import { MultiSelectModule } from "primeng/multiselect";
import { MenuModule } from "primeng/menu";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { SharedModule } from "@shared/shared.module";
import { InputSwitchModule } from "primeng/inputswitch";
import { GetReportComponent } from "./get-report/get-report.component";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { RentalMachineInvoiceReportComponent } from "./rental-machine-invoice-report/rental-machine-invoice-report.component";
import { EmployeeWiseLedgersComponent } from "./employee-wise-ledgers/employee-wise-ledgers.component";
import { TrialBalanceComponent } from "./trial-balance/trial-balance.component";
import { MachineWorkingDetailsComponent } from "./machine-working-details/machine-working-details.component";
import { MachineVehicalListingComponent } from "./machine-vehical-listing/machine-vehical-listing.component";
import { PettyPurchaseInvoiceDetailsComponent } from "./petty-purchase-invoice-details/petty-purchase-invoice-details.component";
import { SqlBckupComponent } from "./sql-bckup/sql-bckup.component";
@NgModule({
  declarations: [
    GeneralLedgerReportComponent,
    GetReportComponent,
    RentalMachineInvoiceReportComponent,
    EmployeeWiseLedgersComponent,
    TrialBalanceComponent,
    MachineWorkingDetailsComponent,
    MachineVehicalListingComponent,
    PettyPurchaseInvoiceDetailsComponent,
    SqlBckupComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ButtonModule,
    DialogModule,
    TableModule,
    PaginatorModule,
    ToolbarModule,
    InputTextModule,
    CalendarModule,
    AgGridAngular,
    CheckboxModule,
    ConfirmDialogModule,
    ToastModule,
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    MainModule,
    FloatLabelModule,
    RadioButtonModule,
    InputMaskModule,
    MultiSelectModule,
    MenuModule,
    BsDropdownModule,
    SharedModule,
    InputSwitchModule,
  ],
})
export class ReportsModule {}
