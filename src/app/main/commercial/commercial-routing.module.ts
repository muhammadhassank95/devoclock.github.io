import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VoucherStatusComponent } from "./setup forms/voucher-status/voucher-status.component";
import { ServiceQuotationComponent } from "./service-quotation/service-quotation.component";
import { SalesTaxTypeComponent } from "./setup forms/sales-tax-type/sales-tax-type.component";
import { SalesInvoiceComponent } from "./sales-invoice/sales-invoice.component";
import { ServiceQuotationFiltersComponent } from "./service-quotation-filters/service-quotation-filters.component";
const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "voucher-status",
        component: VoucherStatusComponent,
      },
      {
        path: "sales-tax-type",
        component: SalesTaxTypeComponent,
      },
      {
        path: "service-quatation",
        component: ServiceQuotationComponent,
      },
      {
        path: "sale-invoice",
        component: SalesInvoiceComponent,
      },
      {
        path: "service-quotation-invoice-filters",
        component: ServiceQuotationFiltersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommercialRoutingModule {}
