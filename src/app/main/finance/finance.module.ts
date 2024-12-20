import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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
import { FinanceRoutingModule } from "./finance-routing.module";
import { SharedModule } from "@shared/shared.module";
import { BankBalancesComponent } from "./bank-balances/bank-balances.component";
import { BankPaymentComponent } from "./bank-payment/bank-payment.component";
import { BankRecieptComponent } from "./bank-reciept/bank-reciept.component";
import { BankReconcilationComponent } from "./bank-reconcilation/bank-reconcilation.component";
import { BankReconcilationEntriesComponent } from "./bank-reconcilation-entries/bank-reconcilation-entries.component";
import { CashPaymentComponent } from "./cash-payment/cash-payment.component";
import { CashRecieptComponent } from "./cash-reciept/cash-reciept.component";
import { ChequeRegisterComponent } from "./cheque-register/cheque-register.component";
import { BookRegisterComponent } from "./book-register/book-register.component";
import { CreditNoteComponent } from "./credit-note/credit-note.component";
import { DebitNoteComponent } from "./debit-note/debit-note.component";
// import { ServiceQuotationComponent } from "./service-quotation/service-quotation.component";

import { JournalVoucherComponent } from "./journal-voucher/journal-voucher.component";
import { InputSwitchModule } from "primeng/inputswitch";
import { OfficialReceiptComponent } from "./official-receipt/official-receipt.component";
import { GeneralLedgerComponent } from "./general-ledger/general-ledger.component";
import { VehicleFuelRequisitionComponent } from "./vehicle-fuel-requisition/vehicle-fuel-requisition.component";
import { BankPaymentReversibleComponent } from "./bank-payment-reversible/bank-payment-reversible.component";
import { CashpaymentreverseComponent } from "./cashpaymentreverse/cashpaymentreverse.component";
import { DepreciationRateComponent } from "./depreciation-rate/depreciation-rate.component";
import { TempJournalVoucherComponent } from "./temp-journal-voucher/temp-journal-voucher.component";
import { PettyPurchaseInvoiceComponent } from "./petty-purchase-invoice/petty-purchase-invoice.component";
// import { SalesInvoiceComponent } from "./sales-invoice/sales-invoice.component";
import { FiltersComponent } from "./filters/filters.component";
import { ProgressSpinnerModule } from "primeng/progressspinner";

@NgModule({
  declarations: [
    BankBalancesComponent,
    BankPaymentComponent,
    BankRecieptComponent,
    BankReconcilationComponent,
    OfficialReceiptComponent,
    BankReconcilationEntriesComponent,
    CashPaymentComponent,
    BookRegisterComponent,
    CashRecieptComponent,
    VehicleFuelRequisitionComponent,
    ChequeRegisterComponent,
    CreditNoteComponent,
    DebitNoteComponent,
    JournalVoucherComponent,
    TempJournalVoucherComponent,
    // ServiceQuotationComponent,
    GeneralLedgerComponent,
    BankPaymentReversibleComponent,
    CashpaymentreverseComponent,
    DepreciationRateComponent,
    PettyPurchaseInvoiceComponent,
    // SalesInvoiceComponent,
    FiltersComponent,
  ],
  imports: [
    MainModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    CalendarModule,
    SharedModule,
    DialogModule,
    TableModule,
    InputSwitchModule,
    PaginatorModule,
    ToolbarModule,
    InputTextModule,
    CheckboxModule,
    ConfirmDialogModule,
    ToastModule,
    FinanceRoutingModule,
    TabViewModule,
    AgGridAngular,
    FloatLabelModule,
    RadioButtonModule,
    InputMaskModule,
    ProgressSpinnerModule,
    MultiSelectModule,
    MenuModule,
    BsDropdownModule.forRoot(),
  ],
})
export class FinanceModule {}
