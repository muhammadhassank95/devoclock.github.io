import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BankBalancesComponent } from "./bank-balances/bank-balances.component";
import { GeneralLedgerComponent } from "./general-ledger/general-ledger.component";
import { BankPaymentComponent } from "./bank-payment/bank-payment.component";
import { BankRecieptComponent } from "./bank-reciept/bank-reciept.component";
import { BankReconcilationComponent } from "./bank-reconcilation/bank-reconcilation.component";
import { BankReconcilationEntriesComponent } from "./bank-reconcilation-entries/bank-reconcilation-entries.component";
import { CashPaymentComponent } from "./cash-payment/cash-payment.component";
import { CashRecieptComponent } from "./cash-reciept/cash-reciept.component";
import { ChequeRegisterComponent } from "./cheque-register/cheque-register.component";
// import { ServiceQuotationComponent } from "./service-quotation/service-quotation.component";
import { BookRegisterComponent } from "./book-register/book-register.component";
import { CreditNoteComponent } from "./credit-note/credit-note.component";
import { DebitNoteComponent } from "./debit-note/debit-note.component";
import { JournalVoucherComponent } from "./journal-voucher/journal-voucher.component";
import { TempJournalVoucherComponent } from "./temp-journal-voucher/temp-journal-voucher.component";
import { OfficialReceiptComponent } from "./official-receipt/official-receipt.component";
import { VehicleFuelRequisitionComponent } from "./vehicle-fuel-requisition/vehicle-fuel-requisition.component";
import { BankPaymentReversibleComponent } from "./bank-payment-reversible/bank-payment-reversible.component";
import { CashpaymentreverseComponent } from "./cashpaymentreverse/cashpaymentreverse.component";
import { DepreciationRateComponent } from "./depreciation-rate/depreciation-rate.component";
import { PettyPurchaseInvoiceComponent } from "./petty-purchase-invoice/petty-purchase-invoice.component";
// import { SalesInvoiceComponent } from "./sales-invoice/sales-invoice.component";
import { FiltersComponent } from "./filters/filters.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "bank-balance",
        component: BankBalancesComponent,
      },
      {
        path: "vehicle-fuel-requisition",
        component: VehicleFuelRequisitionComponent,
      },
      {
        path: "petty-purchase-invoice",
        component: PettyPurchaseInvoiceComponent,
      },
      {
        path: "general-ledger",
        component: GeneralLedgerComponent,
      },
      {
        path: "bank-payment",
        component: BankPaymentComponent,
      },
      {
        path: "bank-payment-reversible",
        component: BankPaymentReversibleComponent,
      },
      {
        path: "cash-payment-reverse",
        component: CashpaymentreverseComponent,
      },
      {
        path: "bank-reciept",
        component: BankRecieptComponent,
      },
      {
        path: "bank-reconcilation",
        component: BankReconcilationComponent,
      },
      {
        path: "bank-reconcilation-entries",
        component: BankReconcilationEntriesComponent,
      },
      {
        path: "cash-payment",
        component: CashPaymentComponent,
      },
      {
        path: "cash-reciept",
        component: CashRecieptComponent,
      },
      {
        path: "cheque-register",
        component: ChequeRegisterComponent,
      },
      {
        path: "book-register",
        component: BookRegisterComponent,
      },
      // {
      //   path: "service-quatation",
      //   component: ServiceQuotationComponent,
      // },
      {
        path: "credit-note",
        component: CreditNoteComponent,
      },
      {
        path: "debit-note",
        component: DebitNoteComponent,
      },
      {
        path: "journal-voucher",
        component: JournalVoucherComponent,
      },
      {
        path: "temp-journal-voucher",
        component: TempJournalVoucherComponent,
      },
      {
        path: "official-receipt",
        component: OfficialReceiptComponent,
      },
      {
        path: "depreciation-rate",
        component: DepreciationRateComponent,
      },
      {
        path: "filters",
        component: FiltersComponent,
      },
      // {
      //   path: "sale-invoice",
      //   component: SalesInvoiceComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceRoutingModule {}
