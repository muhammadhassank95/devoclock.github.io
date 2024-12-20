import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { ConfirmationService, SelectItem } from "primeng/api";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import {
  EmployeeInputDto,
  PreviousJobHistoryDetail,
  rejoinDto,
} from "../shared/DTOs/employee-dto";

import { catchError, finalize, map, Observable, throwError } from "rxjs";
import { MessageService } from "primeng/api";
import { EmployeeService } from "../shared/services/employee.service";
import * as moment from "moment";
import { EmpSalaryIncService } from "../shared/services/emp-salary-inc.service";
import { debug } from "console";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";
@Component({
  selector: "app-create-or-edit-employee",
  templateUrl: "./create-or-edit-employee.component.html",
})
export class CreateOrEditEmployeeComponent implements OnInit {
  activeTabIndex: number = 0;
  pickerID1: number;
  pickerName1: string;
  bsModalRef: any;
  suggestionBsModalService: any;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  @Input() erpIdForEdit: string = "";

  @Input() erpIdForEditForEdit: string = "";
  maxDate: Date;
  today: Date = new Date();
  viewMode: boolean = false;
  rejoinMode: boolean = true;
  editMode: boolean;
  data: any;
  selectedOption: string = "CNIC";
  cnicPattern: string = "\\d{5}-\\d{7}-\\d{1}";
  relationOptions: any[] = [
    { label: "Father of", value: "Father of" },
    { label: "Mother of", value: "Mother of" },
    { label: "Brother of", value: "Brother of" },
    { label: "Sister of", value: "Sister of" },
    { label: "Son of", value: "Son of" },
    { label: "Daughter of", value: "Daughter of" },
  ];

  employeeInputDto: EmployeeInputDto = new EmployeeInputDto();
  rejoindto: rejoinDto = new rejoinDto();

  AddressObject: any;
  tempDate: Date | string;
  TaxPolicyData: any;

  displayTax: boolean;
  fullSalary: number;
  monthlyTax: number;
  postTaxSalary: number;
  annualSalary: number;
  annualTax: number;
  postTaxAnnualSalary: number;
  minDate: Date = new Date();
  rejoinEmpDropdown: any[] = [];
  rejoinEmpSelectedItem: any;
  interviewDropdown: any[] = [];
  interviewSelectedItem: any;
  costCenterDropdown: any[] = [];
  costCenterSelectedItem: any;
  projectDropdown: any[] = [];
  projectSelectedItem: any;
  locationDropdown: any[] = [];
  locationSelectedItem: any;
  religionDropdown: any[] = [];
  religionSelectedItem: any;
  skillLevelDropdown: any[] = [];
  skillLevelSelectedItem: any;
  bloodGroupDropdown: any[] = [];
  bloodGroupSelectedItem: any;
  genderDropdown: any[] = [];
  genderSelectedItem: any;
  relationDropdown: any[] = [];
  relationSelectedItem: any;
  typeOfEmployeeDropdown: any[] = [];
  typeOfEmployeeSelectedItem: any;
  shiftDropdown: any[] = [];
  shiftSelectedItem: any;
  currentPayDropdown: any[] = [];
  currentPaySelectedItem: any;
  currencyDropdown: any[] = [];
  currencySelectedItem: any;
  teamDropdown: any[] = [];
  teamSelectedItem: any;
  designationDropdown: any[] = [];
  designationSelectedItem: any;
  departmentDropdown: any[] = [];
  departmentSelectedItem: any;
  gradeDropdown: any[] = [];
  gradeSelectedItem: any;
  replacementOfEmpDropdown: any[] = [];
  replacementOfEmpSelectedItem: any;
  employeeDropdown: any[] = [];
  employeeSelectedItem: any;

  constructor(
    public bsModalRefs: BsModalRef,
    private employeeService: EmployeeService,
    private msgService: MessageService,
    public suggestionModalRef: BsModalRef,
    private _suggestionLookUpService: SuggestionLookupTableModaLService,
    private confirmationService?: ConfirmationService,
    private _empSalaryIncService?: EmpSalaryIncService
  ) {
    // this.employeeInputDto.FinancialIntegrationDetail = [];
    // this.employeeInputDto.probationPeriod = this.employeeInputDto.probationPeriod;
    // this.tempDate = this.getNextDate(this.today, this.employeeInputDto.probationPeriod).toLocaleDateString();
  }

  ngOnInit(): void {
    debugger;
    console.log(this.erpIdForEdit);
    this.getUserRelations();
    this.maxDate = new Date();
    if (!this.erpIdForEdit && !this.erpIdForEditForEdit) {
      this.getErpId();
    }
    this.getDefaultBank();
    this.getAllAllowance();
    // this.probationPeriodChange();
    this.getTaxPolicy();
    if (this.erpIdForEdit) {
      this.getDataForEdit(this.erpIdForEdit);
    }
    if (this.erpIdForEditForEdit) {
      this.getDataForEditForEdit(this.erpIdForEditForEdit);
    }
    this.probationPeriodChange();
    this.fetchDropdownData('ResignedEmployees').subscribe((items) => (this.rejoinEmpDropdown = items));
    this.fetchDropdownData('Interview').subscribe((items) => (this.interviewDropdown = items));
    this.fetchDropdownData('CostCenter').subscribe((items) => (this.costCenterDropdown = items));
    this.fetchDropdownData('Project').subscribe((items) => (this.projectDropdown = items));
    this.fetchDropdownData('Location').subscribe((items) => (this.locationDropdown = items));
    this.fetchDropdownData('Religion').subscribe((items) => (this.religionDropdown = items));
    this.fetchDropdownData('SkillLevel').subscribe((items) => (this.skillLevelDropdown = items));
    this.fetchDropdownData('BloodGroup').subscribe((items) => (this.bloodGroupDropdown = items));
    this.fetchDropdownData('Gender').subscribe((items) => (this.genderDropdown = items));
    this.fetchDropdownData('Relation').subscribe((items) => (this.relationDropdown = items));
    this.fetchDropdownData('TypeOfEmployee').subscribe((items) => (this.typeOfEmployeeDropdown = items));
    this.fetchDropdownData('Shift').subscribe((items) => (this.shiftDropdown = items));
    this.fetchDropdownData('CurrentPaymentMode').subscribe((items) => (this.currentPayDropdown = items));
    this.fetchDropdownData('Currency').subscribe((items) => (this.currencyDropdown = items));
    this.fetchDropdownData('Team').subscribe((items) => (this.teamDropdown = items));
    this.fetchDropdownData('Designation').subscribe((items) => (this.designationDropdown = items));
    this.fetchDropdownData('Department').subscribe((items) => (this.departmentDropdown = items));
    this.fetchDropdownData('Grade').subscribe((items) => (this.gradeDropdown = items));
    this.fetchDropdownData('ResignedEmployees').subscribe((items) => (this.replacementOfEmpDropdown = items));
    this.fetchDropdownData('Employee').subscribe((items) => (this.employeeDropdown = items));
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    debugger;
    if (!this.erpIdForEdit) {
      this.getDataForEdit(this.erpIdForEdit);
    }
    if (!this.erpIdForEditForEdit) {
      this.getDataForEditForEdit(this.erpIdForEditForEdit);
    }
  }

  fetchDropdownData(target: string, limit: number = 100, offset: number = 0): Observable<any[]> {
    return this._suggestionLookUpService.getAll(offset, limit, '', target, '').pipe(
      map((response: any) => {
        if (response && response.items) {
            return response.items.map((item: any) => ({
              id: item.id,
              name: item.name,
            }));
        } else {
          console.error(`Invalid response format for ${target}: `, response);
          return [];
        }
      })
    );
  }

  onDropdownChange(event: any, type: string){
    const value = event.value;
    switch (type) {
      case "Employee":
        this.employeeInputDto.erp = value.id;
        this.employeeInputDto.name = value.name;
        break;
      case "Relation":
        this.employeeInputDto.relationId = +value.id;
        this.employeeInputDto.relationName = value.name;
        break;
      case "Interview":
        this.employeeInputDto.interviewId = +value.id;
        this.employeeInputDto.interviewName = value.name;
        break;
      case "Department":
        this.employeeInputDto.departmentId = +value.id;
        this.employeeInputDto.departmentName = value.name;
        break;
      case "Designation":
        this.employeeInputDto.designationId = +value.id;
        this.employeeInputDto.designationName = value.name;
        break;
      case "Team":
        this.employeeInputDto.teamId = +value.id;
        this.employeeInputDto.teamName = value.name;
        break;
      case "CostCenter":
        this.employeeInputDto.costCenterId = +value.id;
        this.employeeInputDto.costCenterName = value.name;
        break;
      case "Project":
        this.employeeInputDto.projectId = +value.id;
        this.employeeInputDto.projectName = value.name;
        break;
      case "Location":
        this.employeeInputDto.locationId = +value.id;
        this.employeeInputDto.locationName = value.name;
        break;
      case "SkillLevel":
        this.employeeInputDto.skillLevelId = +value.id;
        this.employeeInputDto.skillLevelName = value.name;
        break;
      case "BloodGroup":
        this.employeeInputDto.bloodGroupId = +value.id;
        this.employeeInputDto.bloodGroupName = value.name;
        break;
      case "Gender":
        this.employeeInputDto.genderId = +value.id;
        this.employeeInputDto.genderName = value.name;
        break;
      case "Religion":
        this.employeeInputDto.religionId = +value.id;
        this.employeeInputDto.religionName = value.name;
        break;
      case "TypeOfEmployee":
        this.employeeInputDto.employeeTypeId = +value.id;
        this.employeeInputDto.typeOfEmployeeName = value.name;
        break;
      case "Shift":
        this.employeeInputDto.shiftId = +value.id;
        this.employeeInputDto.shiftName = value.name;
        break;
      case "CurrentPaymentMode":
        this.employeeInputDto.currentPaymentModeId = +value.id;
        this.employeeInputDto.currentPaymentModeName = value.name;
        break;
      case "Currency":
        this.employeeInputDto.currencyId = +value.id;
        this.employeeInputDto.currencyName = value.name;
        break;
      case "Grade":
        this.employeeInputDto.gradeId = +value.id;
        this.employeeInputDto.gradeName = value.name;
        break;
      case "replacementOf":
        this.employeeInputDto.replacementOfId = +value.id;
        this.employeeInputDto.replacementOfName = value.name;
        break;
      case "reportingTo":
        this.employeeInputDto.reportingToId = +value.id;
        this.employeeInputDto.reportingToName = value.name;
        break;
      case "rejoinEmp":
        this.rejoindto.rejoinId = +value.id;
        this.rejoindto.rejoinName = value.name;
        this.getDataForEditForRejoin(value.id, true);
        break;
      default:
        alert(`${type} is not defined`);
    }
  }

  getErpId() {
    debugger;
    this.employeeService
      .getErpId()
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe((result) => {
        debugger;
        this.employeeInputDto.erp = result;
      });
  }

  getDefaultBank() {
    debugger;
    this.employeeService
      .getDefaultBank()
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe((result) => {
        debugger;
        this.employeeInputDto.companyBankId = result.id;
        this.employeeInputDto.companyBankName = result.name;
      });
  }
  getTaxPolicy() {
    debugger;
    this.employeeService
      .getTaxPolicy()
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe((result) => {
        debugger;
        this.TaxPolicyData = result.policyDetails;
        console.log("TaxPolicyData", this.TaxPolicyData);
      });
  }

  getAllAllowance() {
    this._empSalaryIncService
      .getAllAllowance()
      .pipe(
        finalize(() => {}),

        catchError((error) => {
          this.msgService.add({
            severity: "error",
            detail: error.error.error.message,
            life: 2000,
          });

          return throwError(error.error.error.message);
        })
      )
      .subscribe((result) => {
        debugger;
        this.employeeInputDto.allowanceDetails = this.sortAllowancesDescending(
          result.items
        );
      });
  }
  sortAllowancesDescending(allowanceDetails: any[]): any[] {
    return allowanceDetails.slice().sort((a, b) => b.percentage - a.percentage);
  }
  expiryDateValidation() {
    const currentDate = new Date();
    const expiryDate = new Date(this.employeeInputDto.cniC_ExpiryDate);

    currentDate.setHours(0, 0, 0, 0);
    expiryDate.setHours(0, 0, 0, 0);

    if (expiryDate.getTime() === currentDate.getTime()) {
      this.msgService.add({
        severity: "error",
        detail: "Already expired",
        life: 2000,
      });
    }
  }

  onSubmit() {
    if (
      //   !this.employeeInputDto ||
      !this.employeeInputDto.name ||
      !this.employeeInputDto.joiningDate ||
      !this.employeeInputDto.dateOfBirth ||
      !this.employeeInputDto.cniC_ExpiryDate ||
      !this.employeeInputDto.costCenterId ||
      !this.employeeInputDto.projectId ||
      !this.employeeInputDto.locationId ||
      !this.employeeInputDto.phoneNumber ||
      //   !this.employeeInputDto.proxyContact ||
      // !this.employeeInputDto.proxyName ||
      //   !this.employeeInputDto.proxyRelation ||
      //   !this.employeeInputDto.familyCode ||
      !this.employeeInputDto.relationId ||
      !this.employeeInputDto.religionId ||
      //   !this.employeeInputDto.bloodGroupId ||
      !this.employeeInputDto.skillLevelId ||
      !this.employeeInputDto.genderId ||
      !this.employeeInputDto.employeeTypeId ||
      !this.employeeInputDto.currentPaymentModeId ||
      //   !this.employeeInputDto.shiftId ||
      //   !this.employeeInputDto.currencyId ||
      //   !this.employeeInputDto.teamId ||
      !this.employeeInputDto.departmentId ||
      !this.employeeInputDto.designationId ||
      !this.employeeInputDto.newGrossSalary
      //   !this.employeeInputDto.gradeId
    ) {
      debugger;
      this.msgService.add({
        severity: "error",
        detail: "Please fill all required fields",
        life: 2000,
      });
      return;
    }
    // if (!this.employeeInputDto.educationDetails) {
    //   this.msgService.add({
    //     severity: "error",
    //     detail: "Please fill Education Details ",
    //     life: 2000,
    //   });
    //   return;
    // }

    // if (!this.employeeInputDto.familyParticularDetails) {
    //   this.msgService.add({
    //     severity: "error",
    //     detail: "Please fill familyParticularDetails ",
    //     life: 2000,
    //   });
    //   return;
    // }
    // if (!this.employeeInputDto.medicalHistoryDetails) {
    //   this.msgService.add({
    //     severity: "error",
    //     detail: "Please fill medicalHistoryDetails ",
    //     life: 2000,
    //   });
    //   return;
    // }
    // if (!this.employeeInputDto.addresses) {
    //   this.msgService.add({
    //     severity: "error",
    //     detail: "Please fill required address details like City name ",
    //     life: 2000,
    //   });
    //   return;
    // }
    // if (!this.employeeInputDto.previousJobHistoryDetails) {
    //   this.msgService.add({
    //     severity: "error",
    //     detail: "Please fill required previousJobHistoryDetails ",
    //     life: 2000,
    //   });
    //   return;
    // }
    // if (!this.employeeInputDto.assetHoldingDetails) {
    //   this.msgService.add({
    //     severity: "error",
    //     detail: "Please fill assetHoldingDetails ",
    //     life: 2000,
    //   });
    //   return;
    // }
    // if (!this.employeeInputDto.licenseDetails) {
    //   this.msgService.add({
    //     severity: "error",
    //     detail: "Please fill licenseDetails ",
    //     life: 2000,
    //   });
    //   return;
    // }
    // if (!this.employeeInputDto.employeeTraitsDetails) {
    //   this.msgService.add({
    //     severity: "error",
    //     detail: "Please fill employeeTraitsDetails ",
    //     life: 2000,
    //   });
    //   return;
    // }
    // if (!this.employeeInputDto.jobDescriptionDetails) {
    //   this.msgService.add({
    //     severity: "error",
    //     detail: "Please fill jobDescriptionDetails ",
    //     life: 2000,
    //   });
    //   return;
    // }

    debugger;
    var tempArr = [];
    this.employeeInputDto.salaryDetails = {};
    this.employeeInputDto.allowanceDetails.map((item, index) => {
      var obj = {
        allowanceId: item.id,
        amount: item.value,
      };
      tempArr.push(obj);
    });
    this.employeeInputDto.salaryDetails.allowances = tempArr;
    this.employeeInputDto.salaryDetails.grossPay = this.employeeInputDto.salary;
    this.employeeInputDto.salaryDetails.basicPay =
      this.employeeInputDto.basicPay;
    debugger;
    if (this.employeeInputDto.id) {
      // Update existing employee
      this.employeeService
        .edit(this.employeeInputDto)
        .pipe(
          catchError((error) => {
            debugger;
            this.msgService.add({
              severity: "error",
              summary: "Error",
              detail: error.error.error.message,
              life: 2000,
            });
            return throwError(error.error.error.message);
          })
        )
        .subscribe((response) => {
          this.msgService.add({
            severity: "success",
            summary: "Success",
            detail: "Employee updated successfully",
            life: 2000,
          });
          this.save.emit(this.employeeInputDto);
          this.employeeInputDto = new EmployeeInputDto();
        });
    } else {
      this.employeeService
        .create(this.employeeInputDto)
        .pipe(
          catchError((error) => {
            debugger;
            this.msgService.add({
              severity: "error",
              summary: "Error",
              detail: error.error.error.message,
              life: 2000,
            });
            return throwError(error.error.error.message);
          })
        )
        .subscribe((response) => {
          debugger;
          this.msgService.add({
            severity: "success",
            summary: "Success",
            detail: "Employee created successfully",
            life: 2000,
          });
          this.save.emit(this.employeeInputDto);
          this.employeeInputDto = new EmployeeInputDto();
        });
    }
  }

  EmpValidation() {}

  onClose() {
    debugger;

    var temp1 = this.employeeInputDto.companyBankId;
    var temp2 = this.employeeInputDto.companyBankName;
    var temp3 = this.employeeInputDto.erp;
    var temp4 = this.employeeInputDto.isActive;

    this.employeeInputDto = new EmployeeInputDto();
    this.close.emit();

    this.employeeInputDto.companyBankId = temp1;
    this.employeeInputDto.companyBankName = temp2;
    this.employeeInputDto.erp = temp3;
    this.employeeInputDto.isActive = temp4;
  }
  probationPeriodChange(event?: any) {
    debugger;
    if (event) {
      this.employeeInputDto.joiningDate = event;
    }
    if (
      this.employeeInputDto.joiningDate &&
      this.employeeInputDto.probationPeriod
    ) {
      const nextDate = this.getNextDate(
        this.employeeInputDto.joiningDate,
        this.employeeInputDto.probationPeriod
      );
      this.employeeInputDto.probationEndDate = nextDate;
      this.tempDate = nextDate.toLocaleDateString();
    }
  }

  getNextDate(startDate: Date, days: number): Date {
    debugger;
    const resultDate = new Date(startDate);
    resultDate.setDate(resultDate.getDate() + days);
    return resultDate;
  }

  preventInvalidInput(event: KeyboardEvent) {
    const charCode = event.charCode;
    const value = (event.target as HTMLInputElement).value;
    const newValue = value + String.fromCharCode(charCode);
    if (
      charCode < 48 ||
      charCode > 57 ||
      parseInt(newValue, 10) > 90 ||
      value.length >= 2
    ) {
      event.preventDefault();
    }
  }

  validateInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (parseInt(input.value, 10) > 90) {
      input.value = "90";
      this.employeeInputDto.probationPeriod = 90;
    }
  }

  onCniCTokenChange(option: string): void {
    this.selectedOption = option;
    this.employeeInputDto.cniC_TokenNumber = "";
    this.employeeInputDto.cniC_ExpiryDate = "";
  }
  preventNonAlphabetic(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122) ||
      charCode === 32
    ) {
      return true;
    }
    event.preventDefault();
    return false;
  }
  openSuggestionModal(target) {
    debugger;

    const initialState = {
      target: target,
    };
    this.bsModalRef = this.suggestionBsModalService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );
    this.bsModalRef.content.saveSuggestion.subscribe((result) => {
      console.log("Modal closed with result:", result);
    });
  }
  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Employee":
        this.employeeInputDto.erp = value.id;
        this.employeeInputDto.name = value.name;
        break;
      case "Relation":
        this.employeeInputDto.relationId = +value.id;
        this.employeeInputDto.relationName = value.name;
        break;
      case "Interview":
        this.employeeInputDto.interviewId = +value.id;
        this.employeeInputDto.interviewName = value.name;
        break;
      case "Department":
        this.employeeInputDto.departmentId = +value.id;
        this.employeeInputDto.departmentName = value.name;
        break;
      case "Designation":
        this.employeeInputDto.designationId = +value.id;
        this.employeeInputDto.designationName = value.name;
        break;
      case "Team":
        this.employeeInputDto.teamId = +value.id;
        this.employeeInputDto.teamName = value.name;
        break;
      case "CostCenter":
        this.employeeInputDto.costCenterId = +value.id;
        this.employeeInputDto.costCenterName = value.name;
        break;
      case "Project":
        this.employeeInputDto.projectId = +value.id;
        this.employeeInputDto.projectName = value.name;
        break;
      case "Location":
        this.employeeInputDto.locationId = +value.id;
        this.employeeInputDto.locationName = value.name;
        break;
      // case "Region":
      //   this.employeeInputDto.regionId = +value.id;
      //   this.employeeInputDto.regionName = value.name;
      //   break;
      case "SkillLevel":
        this.employeeInputDto.skillLevelId = +value.id;
        this.employeeInputDto.skillLevelName = value.name;
        break;
      case "BloodGroup":
        this.employeeInputDto.bloodGroupId = +value.id;
        this.employeeInputDto.bloodGroupName = value.name;
        break;
      case "Gender":
        this.employeeInputDto.genderId = +value.id;
        this.employeeInputDto.genderName = value.name;
        break;
      case "Religion":
        this.employeeInputDto.religionId = +value.id;
        this.employeeInputDto.religionName = value.name;
        break;
      case "TypeOfEmployee":
        this.employeeInputDto.employeeTypeId = +value.id;
        this.employeeInputDto.typeOfEmployeeName = value.name;
        break;
      case "Shift":
        this.employeeInputDto.shiftId = +value.id;
        this.employeeInputDto.shiftName = value.name;
        break;
      case "CurrentPaymentMode":
        this.employeeInputDto.currentPaymentModeId = +value.id;
        this.employeeInputDto.currentPaymentModeName = value.name;
        break;
      case "Currency":
        this.employeeInputDto.currencyId = +value.id;
        this.employeeInputDto.currencyName = value.name;
        break;
      case "Grade":
        this.employeeInputDto.gradeId = +value.id;
        this.employeeInputDto.gradeName = value.name;
        break;
      case "replacementOf":
        this.employeeInputDto.replacementOfId = +value.id;
        this.employeeInputDto.replacementOfName = value.name;
        break;
      case "reportingTo":
        this.employeeInputDto.reportingToId = +value.id;
        this.employeeInputDto.reportingToName = value.name;
        break;
      case "rejoinEmp":
        this.rejoindto.rejoinId = +value.id;
        this.rejoindto.rejoinName = value.name;
        this.getDataForEditForRejoin(value.id, true);
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  onTabChange(event: any) {
    this.activeTabIndex = event.index;
  }

  // Grids
  educationObject = {
    cgpaGrade: "",
    majorSubject: "",
    qualification: "",
    periodFrom: new Date(),
    periodTo: new Date(),
    institutionName: "",
  };

  addressObject = {
    addressType: "",
    description: "",
    postalCode: "",
    province: "",
    city: "",
    phone: "",
    police: "",
  };
  previousJobHistoryObject = {
    startDate: new Date(),
    endDate: new Date(),
    title: "",
    startingSalary: "",
    endingSalary: "",
    contact: "",
    reasonForLeaving: "",
  };
  familyParticularDetailsObject = {
    name: "",
    relationship: "",
    dateOfBirth: new Date(),
    cnic: "",
    maritalStatus: "",
    phone: "",
    mobile: "",
    isDependent: true,
  };
  assetHoldingDetailsObject = {
    issueDate: new Date(),
    comments: "",
    returnDate: new Date(),
  };
  jobDescriptionDetailsObject = {
    description: "",
  };
  medicalHistoryDetailsObject = {
    diseaseDescription: "",
    duration: "",
    treatmentBy: "",
    recoveryStatus: "",
  };

  employeeTraitsDetailsObject = {
    skills: "",
    hobbies: "",
    languagesPreferences: "",
    speakingProficiency: "",
    writtenProficiency: "",
    physicalDisability: "",
  };

  handleEducation(values) {
    debugger;
    this.employeeInputDto.educationDetails = values;
    let allFieldsFilled = true;

    values.forEach((value) => {
      if (value.cgpaGrade > 4) {
        this.msgService.add({
          severity: "error",
          detail: "CGPA cannot be greater than 4",
          life: 2000,
        });
        return;
      }
      if (value.periodFrom > value.periodTo) {
        this.msgService.add({
          severity: "error",
          detail: "Period from will be less than period to",
          life: 2000,
        });
        return;
      }
      if (
        !value.cgpaGrade ||
        !value.institutionName ||
        !value.majorSubject ||
        !value.qualification ||
        !value.periodTo ||
        !value.periodFrom
      ) {
        allFieldsFilled = false;
      }
    });

    if (!allFieldsFilled) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all Education Details",
        life: 2000,
      });
      return;
    }

    console.log(values);
  }
  handleAddress(values) {
    this.employeeInputDto.addresses = values;
    let allFieldsFilled = true;
    values.forEach((value) => {
      if (
        // !value.addressType ||
        // !value.description ||
        // !value.postalCode ||
        // !value.province ||
        !value.city
        // !value.phone ||
        // !value.police
      ) {
        allFieldsFilled = false;
      }
    });

    if (!allFieldsFilled) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill required Address Details like city name",
        life: 2000,
      });
      return;
    }

    console.log(values);
  }

  handlePreviousJobHistory(values) {
    var data = values;
    this.employeeInputDto.previousJobHistoryDetails = values;
    let allFieldsFilled = true;
    values.forEach((value) => {
      if (value.startDate > value.endDate) {
        this.msgService.add({
          severity: "error",
          detail: "Start date will be less than end date",
          life: 2000,
        });
        return;
      }
      if (value.startingSalary === undefined || value.startingSalary === "") {
        value.startingSalary = 0;
      }
      if (value.endingSalary === undefined || value.endingSalary === "") {
        value.endingSalary = 0;
      }
      if (
        // !value.startDate ||
        // !value.endDate ||
        !value.title ||
        // !value.startingSalary ||
        // !value.endingSalary ||
        // !value.contact ||
        !value.reasonForLeaving
      ) {
        allFieldsFilled = false;
      }
    });
    if (!allFieldsFilled) {
      this.msgService.add({
        severity: "error",
        detail:
          "Please fill required Previous Job Details Title and Reason of leaving",
        life: 2000,
      });
      return;
    }

    console.log(values);
  }
  handleFamilyDetail(values) {
    this.employeeInputDto.familyParticularDetails = values;
    let allFieldsFilled = true;
    values.forEach((value) => {
      if (
        !value.relationship ||
        !value.dateOfBirth ||
        !value.cnic ||
        !value.maritalStatus ||
        !value.phone ||
        !value.mobile ||
        !value.isDependent
      ) {
        allFieldsFilled = false;
      }
    });
    if (!allFieldsFilled) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all Family Details",
        life: 2000,
      });
      return;
    }

    console.log(values);
  }
  handleMedicalHistory(values) {
    this.employeeInputDto.medicalHistoryDetails = values;
    let allFieldsFilled = true;
    values.forEach((value) => {
      if (
        !value.diseaseDescription ||
        !value.duration ||
        !value.treatmentBy ||
        !value.recoveryStatus
      ) {
        allFieldsFilled = false;
      }
    });
    if (!allFieldsFilled) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all Medical Details",
        life: 2000,
      });
      return;
    }

    console.log(values);
  }
  handleAssetsHolding(values) {
    this.employeeInputDto.assetHoldingDetails = values;
    let allFieldsFilled = true;
    values.forEach((value) => {
      if (!value.issueDate || !value.comments || !value.returnDate) {
        allFieldsFilled = false;
      }
    });
    if (!allFieldsFilled) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all Asset Holding Details",
        life: 2000,
      });
      return;
    }

    console.log(values);
  }
  handleCurrentJD(values) {
    this.employeeInputDto.jobDescriptionDetails = values;
    let allFieldsFilled = true;
    values.forEach((value) => {
      if (!value.description) {
        allFieldsFilled = false;
      }
    });
    if (!allFieldsFilled) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all Current JD Details",
        life: 2000,
      });
      return;
    }

    console.log(values);
  }

  handleEmployeeBio(values) {
    this.employeeInputDto.employeeTraitsDetails = values;
    let allFieldsFilled = true;
    values.forEach((value) => {
      if (
        !value.skills ||
        !value.hobbies ||
        !value.languagesPreferences ||
        !value.speakingProficiency ||
        !value.writtenProficiency ||
        !value.physicalDisability
      ) {
        allFieldsFilled = false;
      }
    });
    if (!allFieldsFilled) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all Employee bio Details",
        life: 2000,
      });
      return;
    }

    console.log(values);
  }

  onRelationSelect(e) {
    debugger;

    console.log(e);
    this.employeeInputDto.relationId = e.value;
  }

  // Grid Data
  educationData = [
    {
      cgpaGrade: "1",
      majorSubject: "2",
      qualification: "3",
      periodFrom: new Date(),
      periodTo: new Date(),
      institutionName: "4",
    },
  ];

  getUserRelations() {
    debugger;

    this.employeeService
      .GetRelations()
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          // this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          let array = [];
          console.log(response);
          response.items.map((item) =>
            array.push({
              label: item.name,
              value: item.id,
            })
          );
          this.relationOptions = array;
          debugger;
          // this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'SavedSuccessfully', life: 2000 });
        },
      });
  }

  // License Grid

  handleLicenseArray(values) {
    debugger;
    this.employeeInputDto.licenseDetails = values;
    let allFieldsFilled = true;
    values.forEach((value) => {
      if (value.licenseDate > value.expiryDate) {
        this.msgService.add({
          severity: "error",
          detail: "Issue date will be less than expiry date",
          life: 2000,
        });
        return;
      }

      if (
        !value.licenseTypeId ||
        !value.licenseTypeName ||
        !value.licenseNumber ||
        !value.placeOfIssue ||
        !value.licenseDate ||
        !value.expiryDate ||
        !value.isActive
      ) {
        allFieldsFilled = false;
      }
    });
    if (!allFieldsFilled) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all License Details",
        life: 2000,
      });
      return;
    }

    console.log(values);
  }

  getDataForEdit(id: any, erp?: boolean) {
    debugger;
    if (!id) {
      return;
    }
    this.employeeService
      .getDataForEdit(id, erp)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          // this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          console.log("GETFOREDIT", response);
          debugger;
          this.employeeInputDto = response;
          this.viewMode = true;
          this.employeeInputDto.erp = response.erpId;
          this.employeeInputDto.salary = response.salaryDetails.grossPay;
          this.employeeInputDto.allowanceDetails =
            response.salaryDetails.allowances;
          this.tempDate = new Date(
            response.probationEndDate
          ).toLocaleDateString();
          this.employeeInputDto.probationStartDate = new Date(
            response.probationStartDate
          );
          this.employeeInputDto.cniC_ExpiryDate = new Date(
            response.cniC_ExpiryDate
          ).toLocaleDateString();
          this.employeeInputDto.dateOfBirth = new Date(
            response.dateOfBirth
          ).toLocaleDateString();
        },
      });
  }
  getDataForEditForRejoin(id: any, erp?: boolean) {
    debugger;
    if (!id) {
      return;
    }
    this.employeeService
      .getDataForEdit(id, erp)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          // this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          console.log("GETFOREDIT", response);
          debugger;
          this.employeeInputDto = response;
          this.rejoinMode = true;
          this.employeeInputDto.erp = response.erpId;
          this.employeeInputDto.salary = response.salaryDetails.grossPay;
          this.employeeInputDto.allowanceDetails =
            response.salaryDetails.allowances;
          this.tempDate = new Date(
            response.probationEndDate
          ).toLocaleDateString();
          this.employeeInputDto.probationStartDate = new Date(
            response.probationStartDate
          );
          this.employeeInputDto.cniC_ExpiryDate = new Date(
            response.cniC_ExpiryDate
          ).toLocaleDateString();
          this.employeeInputDto.dateOfBirth = new Date(
            response.dateOfBirth
          ).toLocaleDateString();
        },
      });
  }

  getDataForEditForEdit(id: any, erp?: boolean) {
    debugger;
    if (!id) {
      return;
    }
    this.employeeService
      .getDataForEdit(id, erp)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          // this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          console.log("GETFOREDIT", response);
          debugger;
          this.employeeInputDto = response;
          const startDate = new Date(response.probationStartDate);
          const endDate = new Date(response.probationEndDate);
          const timeDifference = endDate.getTime() - startDate.getTime();
          const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
          this.employeeInputDto.probationPeriod = dayDifference;
          this.editMode = true;
          this.employeeInputDto.erp = response.erpId;
          this.employeeInputDto.salary = response.salaryDetails.grossPay;
          this.employeeInputDto.allowanceDetails =
            response.salaryDetails.allowances;
          this.tempDate = new Date(
            response.probationEndDate
          ).toLocaleDateString();
          this.employeeInputDto.probationStartDate = new Date(
            response.probationStartDate
          );
          this.employeeInputDto.cniC_ExpiryDate = new Date(
            response.cniC_ExpiryDate
          ).toLocaleDateString();
          this.employeeInputDto.dateOfBirth = new Date(
            response.dateOfBirth
          ).toLocaleDateString();
        },
      });
  }

  calculateSalary() {
    debugger;
    var sumOfAllownce = 0;

    this.employeeInputDto.allowanceDetails.map((item) => {
      if (item.name.toLowerCase() === "basic pay") {
        this.employeeInputDto.basicPay = +(
          (this.employeeInputDto.newGrossSalary * item.percentage) /
          100
        ).toFixed(2);
        debugger;
        item.value = this.employeeInputDto.basicPay;
      }
    });
    this.employeeInputDto.allowanceDetails.map((item) => {
      if (item.name.toLowerCase() !== "basic pay") {
        if (item.percentage) {
          item.value = +(
            (this.employeeInputDto.basicPay * item.percentage) /
            100
          ).toFixed(2);
        }
      }
    });

    this.employeeInputDto.allowanceDetails.forEach((item) => {
      debugger;
      if (item.percentage === 0) {
        sumOfAllownce +=
          item.value !== undefined && item.value !== null ? item.value : 0;
      }
    });

    this.employeeInputDto.salary =
      this.employeeInputDto.newGrossSalary + sumOfAllownce;
    this.calculateTax(this.employeeInputDto.salary);
  }

  calculateTax(salary: number) {
    this.fullSalary = salary;
    this.annualSalary = salary * 12;

    // Determine the tax bracket and calculate the tax
    for (let policy of this.TaxPolicyData) {
      if (salary >= policy.fromAmount && salary <= policy.toAmount) {
        this.monthlyTax = salary * (policy.percentage / 100);
        this.annualTax = this.monthlyTax * 12;

        this.postTaxSalary = salary - this.monthlyTax;
        this.postTaxAnnualSalary = this.postTaxSalary * 12;

        break;
      }
    }
  }

  OnDobChange(value: string): void {
    debugger;
    const dob = new Date(value);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    this.employeeInputDto.age = age;
    if (age < 18) {
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: "Age must be above 18",
        life: 2000,
      });

      this.employeeInputDto.age = null;
      this.employeeInputDto.dateOfBirth = null;
    }
    if (age > 70) {
      this.msgService.add({
        severity: "warn",
        summary: "Error",
        detail: "Age is above 70",
        life: 2000,
      });
    }
  }

  OnJoinDateChange(value: Date) {
    debugger;
    this.employeeInputDto.joiningDate = value;
    this.employeeInputDto.probationPeriod = 90;
    this.probationPeriodChange();
  }

  OnProbationChange(value: Date, start: boolean) {
    debugger;
    if (start) {
      this.employeeInputDto.probationStartDate = value;
    } else {
      this.employeeInputDto.probationEndDate = value;
    }

    if (
      this.employeeInputDto.probationEndDate &&
      this.employeeInputDto.probationStartDate
    ) {
      const startDate = new Date(this.employeeInputDto.probationStartDate);
      const endDate = new Date(this.employeeInputDto.probationEndDate);

      // Ensure endDate is not before startDate
      if (endDate < startDate) {
        this.employeeInputDto.contractPeriod = "0";
        return;
      }

      // Calculate the difference in years and months
      const yearDiff = endDate.getFullYear() - startDate.getFullYear();
      const monthDiff = endDate.getMonth() - startDate.getMonth();

      // Calculate total months
      const totalMonths = yearDiff * 12 + monthDiff;

      // Set the contract period
      this.employeeInputDto.contractPeriod = totalMonths.toString() + 1;
    }
  }

  RejoinEmployee() {
    if (!this.rejoindto.rejoinId || !this.rejoindto.JoiningDate) {
      return;
    }
    this.employeeService
      .Rejoin(this.rejoindto)
      .pipe(
        catchError((error) => {
          debugger;
          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe((response) => {
        debugger;
        this.msgService.add({
          severity: "success",
          summary: "Success",
          detail: "Employee rejoined successfully",
          life: 2000,
        });
        this.save.emit(this.employeeInputDto);
        this.employeeInputDto = new EmployeeInputDto();
      });
  }
}
