import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HrmRoutingModule } from "./hrm-routing.module";
import { HrmSetupComponent } from "./hrm-setup/hrm-setup.component";
import { HrmLoanSetupComponent } from "./hrm-loan-setup/hrm-loan-setup.component";
import { ManualTaxDeductionComponent } from "./manual-tax-deduction/manual-tax-deduction.component";
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
import { TypeOfEmployeeComponent } from "./type-of-employee/type-of-employee.component";
import { BloodGroupComponent } from "./blood-group/blood-group.component";
import { AllowanceComponent } from "./allowance/allowance.component";
import { CurrencyComponent } from "./currency/currency.component";
import { LoanTypeComponent } from "./loanType/loanType.component";
import { PaymentModeComponent } from "./payment-mode/payment-mode.component";
import { CurrentStatusComponent } from "./current-status/current-status.component";
import { GenderComponent } from "./gender/gender.component";
import { DesignationComponent } from "./designation/designation.component";
import { DepartmentComponent } from "./department/department.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "@shared/shared.module";
import { CompanyBankComponent } from "./company-bank/company-bank.component";
import { GridComponent } from "./grid/grid.component";
import { MainModule } from "../main.module";
import { TeamComponent } from "./team/team.component";
import { SkillLevelComponent } from "./skill-level/skill-level.component";
import { ShiftComponent } from "./shift/shift.component";
import { ReligionComponent } from "./religion/religion.component";
import { LocationComponent } from "./location/location.component";
import { LicenseTypeComponent } from "./license-type/license-type.component";
import { InterviewComponent } from "./interview/interview.component";
import { PickerTestComponent } from "./picker-test/picker-test.component";
import { EmployeeComponent } from "./employee/employee.component";
import { CreateOrEditEmployeeComponent } from "./employee/create-or-edit-employee.component";
import { LeavePolicyComponent } from "./leave-policy/leave-policy.component";
import { LeaveManagementComponent } from "./leave-management/leave-management.component";
import { LeaveTypeComponent } from "./leave-type/leave-type.component";
import { FloatLabelModule } from "primeng/floatlabel";
import { RadioButtonModule } from "primeng/radiobutton";
import { GradeComponent } from "./grade/grade.component";
import { LoanManagementComponent } from "./loan-management/loan-management/loan-management.component";
import { TransmissionComponent } from "./transmission/transmission.component";
import { DepartmentChangeComponent } from "./transmission/changelogs/department-change/department-change.component";
import { TeamChangeComponent } from "./transmission/changelogs/team-change/team-change.component";
import { GradeChangeComponent } from "./transmission/changelogs/grade-change/grade-change.component";
import { ProjectChangeComponent } from "./transmission/changelogs/project-change/project-change.component";
import { ShiftChangeComponent } from "./transmission/changelogs/shift-change/shift-change.component";
import { LocationChangeComponent } from "./transmission/changelogs/location-change/location-change.component";
import { CostCenterChangeComponent } from "./transmission/changelogs/cost-center-change/cost-center-change.component";
import { AddLeaveComponent } from "./add-leave/add-leave.component";
import { ViewSalariesComponent } from "./Salaries/view-salaries/view-salaries.component";
import { AttendanceComponent } from "./Attendance/attendance.component";
import { PresentEmployeeComponent } from "./Attendance/present-employee/present-employee.component";
import { AbsentEmployeeComponent } from "./Attendance/absent-employee/absent-employee.component";
import { MarkAttendanceComponent } from "./Attendance/mark-attendance/mark-attendance.component";
import { FileUploadModule } from "primeng/fileupload";
import { ReasonOfDeduction } from "./loan-management/reasonOfDeduction/reasonOfDeduction.component";
import { LicenseGridComponent } from "./employee/LicenseDetails/license-grid/license-grid.component";
import { AddressGridComponent } from "./employee/AddressDetails/address-grid/address-grid.component";
import { PreviousJobGridComponent } from "./employee/PreviousJobDetails/previous-job-grid/previous-job-grid.component";
import { InputMaskModule } from "primeng/inputmask";
import { SalaryIncrementsComponent } from "../hrm/transmission/salary-increments/salary-increments.component";
import { TexSectionComponent } from "../hrm/tex-section/tex-section.component";
import { AttendanceRegisterComponent } from "../hrm/attendance-register/attendance-register.component";
import { MachineIntegrationComponent } from "./Attendance/machine-integration/machine-integration.component";
import { EmployeeReplacementComponent } from "./employee/employee-replacement/employee-replacement.component";
import { EmployeeResignComponent } from "./employee/employee-resign/employee-resign.component";
import { FreezeLoanComponent } from "./loan-management/freeze-loan/freeze-loan.component";
import { FinallSettlementComponent } from "../hrm/finall-settlement/finall-settlement.component";
import { GauzatedHolidayComponent } from "../hrm/gauzated-holiday/gauzated-holiday.component";
import { EOBIComponent } from "../hrm/policies/eobi/eobi.component";
import { ManualOvertimeComponent } from "./policies/manual-overtime/manual-overtime.component";
import { LeaveEncashmentComponent } from "../hrm/policies/leave-encashment/leave-encashment.component";
import { SocialSecurityComponent } from "../hrm/policies/social-security/social-security.component";
import { AnnualLEComponent } from "../hrm/policies/annual-le/annual-le.component";
import { FinancialYearComponent } from "../hrm/financial-year/financial-year.component";
import { MultiSelectModule } from "primeng/multiselect";
import { OvertimepolicyComponent } from "../hrm/policies/overtimepolicy/overtimepolicy.component";
import { MenuModule } from "primeng/menu";
import { ProvidentpolicyComponent } from "../hrm/policies/providentpolicy/providentpolicy.component";
import { SalaryStructureComponent } from "../hrm/policies/salary-structure/salary-structure.component";
import { HoldSalaryComponent } from "../hrm/hold-salary/hold-salary.component";
import { ProvidentFundProfitComponent } from "../hrm/provident-fund-profit/provident-fund-profit.component";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { AppointmentLetterComponent } from "../hrm/appointment-letter/appointment-letter.component";
import { MBUComponent } from "./mbu/mbu.component";
import { ClusterComponent } from "./cluster/cluster.component";
import { SubRegionComponent } from "./sub-region/sub-region.component";

@NgModule({
  declarations: [
    HrmSetupComponent,
    HrmLoanSetupComponent,
    ManualOvertimeComponent,
    BloodGroupComponent,
    AllowanceComponent,
    CurrencyComponent,
    MBUComponent,
    ClusterComponent,
    LoanTypeComponent,
    AddressGridComponent,
    PreviousJobGridComponent,
    PaymentModeComponent,
    CurrentStatusComponent,
    SubRegionComponent,
    EmployeeReplacementComponent,
    ManualTaxDeductionComponent,
    FreezeLoanComponent,
    EmployeeResignComponent,
    GenderComponent,
    DepartmentComponent,
    DesignationComponent,
    MachineIntegrationComponent,
    CompanyBankComponent,
    TypeOfEmployeeComponent,
    PickerTestComponent,
    TeamComponent,
    SkillLevelComponent,
    ShiftComponent,
    ReligionComponent,
    LocationComponent,
    LicenseTypeComponent,
    InterviewComponent,
    EmployeeComponent,
    CreateOrEditEmployeeComponent,
    GridComponent,
    LeavePolicyComponent,
    LeaveManagementComponent,
    LeaveTypeComponent,
    GradeComponent,
    AddLeaveComponent,
    LoanManagementComponent,
    TransmissionComponent,
    DepartmentChangeComponent,
    TeamChangeComponent,
    GradeChangeComponent,
    ProjectChangeComponent,
    ShiftChangeComponent,
    LocationChangeComponent,
    CostCenterChangeComponent,
    ViewSalariesComponent,
    AttendanceComponent,
    PresentEmployeeComponent,
    AbsentEmployeeComponent,
    MarkAttendanceComponent,
    ReasonOfDeduction,
    LicenseGridComponent,
    SalaryIncrementsComponent,
    TexSectionComponent,
    AttendanceRegisterComponent,
    FinallSettlementComponent,
    GauzatedHolidayComponent,
    EOBIComponent,
    LeaveEncashmentComponent,
    SocialSecurityComponent,
    AnnualLEComponent,
    OvertimepolicyComponent,
    FinancialYearComponent,
    ProvidentpolicyComponent,
    SalaryStructureComponent,
    HoldSalaryComponent,
    ProvidentFundProfitComponent,
    AppointmentLetterComponent,
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
    PaginatorModule,
    ToolbarModule,
    InputTextModule,
    CheckboxModule,
    ConfirmDialogModule,
    ToastModule,
    HrmRoutingModule,
    TabViewModule,
    AgGridAngular,
    FloatLabelModule,
    FileUploadModule,
    RadioButtonModule,
    InputMaskModule,
    MultiSelectModule,
    MenuModule,
    BsDropdownModule.forRoot(),
  ],
})
export class HrmModule {}
