import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
const routes: Routes = [
  {
    path: "hrm",
    loadChildren: () => import("./hrm/hrm.module").then((m) => m.HrmModule),
  },
  {
    path: "integration",
    loadChildren: () =>
      import("./integration/integration.module").then(
        (m) => m.IntegrationModule
      ),
  },
  {
    path: "budget",
    loadChildren: () =>
      import("./budget/budget.module").then((m) => m.BudgetModule),
  },
  {
    path: "inventory",
    loadChildren: () =>
      import("./inventory/inventory.module").then((m) => m.InventoryModule),
  },
  {
    path: "finance",
    loadChildren: () =>
      import("./finance/finance.module").then((m) => m.FinanceModule),
  },
  {
    path: "rental",
    loadChildren: () =>
      import("./rental/rental.module").then((m) => m.RentalModule),
  },
  {
    path: "reports",
    loadChildren: () =>
      import("./reports/reports.module").then((m) => m.ReportsModule),
  },
  {
    path: "commercial",
    loadChildren: () =>
      import("./commercial/commercial.module").then((m) => m.CommercialModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
