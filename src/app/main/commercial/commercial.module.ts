import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommercialRoutingModule } from "./commercial-routing.module";
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
import { VoucherStatusComponent } from "./setup forms/voucher-status/voucher-status.component";
import { ServiceQuotationComponent } from "./service-quotation/service-quotation.component";
import { SalesTaxTypeComponent } from "./setup forms/sales-tax-type/sales-tax-type.component";
import { SalesInvoiceComponent } from "./sales-invoice/sales-invoice.component";
import { ServiceQuotationFiltersComponent } from "./service-quotation-filters/service-quotation-filters.component";
@NgModule({
  declarations: [
    VoucherStatusComponent,
    ServiceQuotationComponent,
    SalesTaxTypeComponent,
    SalesInvoiceComponent,
    ServiceQuotationFiltersComponent,
  ],
  imports: [
    CommonModule,
    CommercialRoutingModule,
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
export class CommercialModule {}
