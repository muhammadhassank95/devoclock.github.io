import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HrmSetupComponent } from "./hrm-setup/hrm-setup.component";
import { EmployeeComponent } from "./employee/employee.component";
import { HrmLoanSetupComponent } from "./hrm-loan-setup/hrm-loan-setup.component";
import { LeavePolicyComponent } from "./leave-policy/leave-policy.component";
import { LeaveManagementComponent } from "./leave-management/leave-management.component";
import { TransmissionComponent } from "./transmission/transmission.component";
import { ViewSalariesComponent } from "./Salaries/view-salaries/view-salaries.component";
import { AttendanceComponent } from "./Attendance/attendance.component";
import { FinallSettlementComponent } from "./finall-settlement/finall-settlement.component";
import { EOBIComponent } from "./policies/eobi/eobi.component";
import { SocialSecurityComponent } from "./policies/social-security/social-security.component";
import { LeaveEncashmentComponent } from "./policies/leave-encashment/leave-encashment.component";
import { AnnualLEComponent } from "./policies/annual-le/annual-le.component";
import { OvertimepolicyComponent } from "./policies/overtimepolicy/overtimepolicy.component";
import { TexSectionComponent } from "./tex-section/tex-section.component";
import { ProvidentpolicyComponent } from "./policies/providentpolicy/providentpolicy.component";
import { ManualOvertimeComponent } from "./policies/manual-overtime/manual-overtime.component";
import { SalaryStructureComponent } from "./policies/salary-structure/salary-structure.component";
import { HoldSalaryComponent } from "./hold-salary/hold-salary.component";
import { ProvidentFundProfitComponent } from "./provident-fund-profit/provident-fund-profit.component";
import { CurrencyComponent } from "./currency/currency.component";
import { LocationComponent } from "./location/location.component";
import { AppointmentLetterComponent } from "./appointment-letter/appointment-letter.component";
import { FinancialYearComponent } from "./financial-year/financial-year.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "setup-forms",
        component: HrmSetupComponent,
      },
      {
        path: "currency",
        component: CurrencyComponent,
      },
      {
        path: "employee",
        component: EmployeeComponent,
      },
      {
        path: "hrm-loan-setup",
        component: HrmLoanSetupComponent,
      },
      {
        path: "leave-policy",
        component: LeavePolicyComponent,
      },
      {
        path: "leave-management",
        component: LeaveManagementComponent,
      },
      {
        path: "transition",
        component: TransmissionComponent,
      },
      {
        path: "appointment-letter",
        component: AppointmentLetterComponent,
      },
      {
        path: "salaries",
        component: ViewSalariesComponent,
      },
      {
        path: "attendance",
        component: AttendanceComponent,
      },
      {
        path: "finall-Settlement",
        component: FinallSettlementComponent,
      },
      {
        path: "location",
        component: LocationComponent,
      },
      {
        path: "eobi-policy",
        component: EOBIComponent,
      },
      {
        path: "ss-policy",
        component: SocialSecurityComponent,
      },
      {
        path: "le-policy",
        component: LeaveEncashmentComponent,
      },
      {
        path: "annual-le-policy",
        component: AnnualLEComponent,
      },
      {
        path: "ov-policy",
        component: OvertimepolicyComponent,
      },
      {
        path: "tax-policy",
        component: TexSectionComponent,
      },
      {
        path: "providentFund-policy",
        component: ProvidentpolicyComponent,
      },
      {
        path: "manual-overtime",
        component: ManualOvertimeComponent,
      },
      {
        path: "salary-structure-policy",
        component: SalaryStructureComponent,
      },
      {
        path: "financial-year",
        component: FinancialYearComponent,
      },
      {
        path: "hold-salary",
        component: HoldSalaryComponent,
      },
      {
        path: "pfp",
        component: ProvidentFundProfitComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HrmRoutingModule {}
