import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BudgetSetupsComponent } from "./budget-setups/budget-setups.component";
import { CostCenterTabComponent } from "./cost-center/cost-center-tab/cost-center-tab.component";
import { ProjectTabComponent } from "./project/project-tab/project-tab.component";
import { ChartOfAccountTabsComponent } from "./chart-of-account/chart-of-account-tabs/chart-of-account-tabs.component";
import { AnnualBudgetComponent } from "./annual-budget/annual-budget.component";
import { MonthlyBudgetComponent } from "./monthly-budget/monthly-budget.component";
import { SubLedgerComponent } from "./sub-ledger/sub-ledger.component";
import { SupplierTabsComponent } from "./supplier/supplier-tabs/supplier-tabs.component";
import { RegionComponent } from "./region/region.component";
import { VoucherRestrictionComponent } from "./voucher-restriction/voucher-restriction.component";
import { HierarchyLinkingComponent } from "./hierarchy-linking/hierarchy-linking.component";
const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "budget-setups",
        component: BudgetSetupsComponent,
      },
      {
        path: "project-tab",
        component: ProjectTabComponent,
      },
      {
        path: "cost-center-tab",
        component: CostCenterTabComponent,
      },
      {
        path: "hierarchy-linking",
        component: HierarchyLinkingComponent,
      },
      {
        path: "chart-of-account-tab",
        component: ChartOfAccountTabsComponent,
      },
      {
        path: "supplier-tab",
        component: SupplierTabsComponent,
      },
      {
        path: "subLedger-tab",
        component: SubLedgerComponent,
      },

      {
        path: "annual-budget",
        component: AnnualBudgetComponent,
      },
      {
        path: "monthly-budget",
        component: MonthlyBudgetComponent,
      },
      {
        path: "region",
        component: RegionComponent,
      },
      {
        path: "voucher-restriction",
        component: VoucherRestrictionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetRoutingModule {}
