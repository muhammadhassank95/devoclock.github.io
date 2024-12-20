import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GeneralLedgerReportComponent } from "./general-ledger-report/general-ledger-report.component";
import { GetReportComponent } from "./get-report/get-report.component";
import { RentalMachineInvoiceReportComponent } from "./rental-machine-invoice-report/rental-machine-invoice-report.component";
import { EmployeeWiseLedgersComponent } from "./employee-wise-ledgers/employee-wise-ledgers.component";
import { TrialBalanceComponent } from "./trial-balance/trial-balance.component";
import { MachineWorkingDetailsComponent } from "./machine-working-details/machine-working-details.component";
import { MachineVehicalListingComponent } from "./machine-vehical-listing/machine-vehical-listing.component";
import { PettyPurchaseInvoiceDetailsComponent } from "./petty-purchase-invoice-details/petty-purchase-invoice-details.component";
import { SqlBckupComponent } from "./sql-bckup/sql-bckup.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "general-ledger-report",
        component: GeneralLedgerReportComponent,
      },
      {
        path: "get-report",
        component: GetReportComponent,
      },
      {
        path: "rental-machine-invoice-details",
        component: RentalMachineInvoiceReportComponent,
      },
      {
        path: "employee-wise-ledgers",
        component: EmployeeWiseLedgersComponent,
      },
      {
        path: "trial-balance",
        component: TrialBalanceComponent,
      },
      {
        path: "rental-house-invoice-report",
        component: MachineWorkingDetailsComponent,
      },
      {
        path: "machine-vehical-listing",
        component: MachineVehicalListingComponent,
      },
      {
        path: "petty-purchase-invoice",
        component: PettyPurchaseInvoiceDetailsComponent,
      },
      {
        path: "SQL-backup",
        component: SqlBckupComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
