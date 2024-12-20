import { GridReadyEvent, GridApi, ColDef } from "ag-grid-community";
import { LoanManagementService } from "./../../shared/services/loan-management.service";
import { EmployeeService } from "./../../shared/services/employee.service";
import { Component, OnInit, Injector } from "@angular/core";
import { catchError, finalize, map, Observable, throwError } from "rxjs";
import { ConfirmationService, MessageService } from "primeng/api";
import { formatDateToISO } from "@shared/Utials/utils";
import { MenuItem } from "primeng/api";
import { RestrictionDto } from "../../../budget/shared/Dtos/restriction-dto";
import { mapRestrictionDto } from "@shared/Utials/utils";
import { RestrictionService } from "../../../budget/shared/services/restriction.service";

import {
  InputLoanManagementDto,
  LoanArrayDto,
} from "../../shared/DTOs/loan-management-dto";
import { Table } from "primeng/table";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";

@Component({
  selector: "app-loan-management",
  templateUrl: "./loan-management.component.html",
})
export class LoanManagementComponent {
  restrictionDto: RestrictionDto = new RestrictionDto();
  data: LoanArrayDto;
  count!: number;
  departmentId: string;
  departmentName: string;
  currentPage: number = 1;
  skipCount: number = 0;
  costCenterId: number;
  costCenterName: string;
  regionName: string;
  projectId: number;
  projectName: string;
  locationId: number;
  locationName: string;
  joiningDate: Date;
  employeePFBalance: number;
  employerPFBalance: number;
  grossSalary: number;
  lastLoan: number;
  lastArrear: number;
  lastDeduction: number;
  maxCount: number = 10;
  isEditMode: boolean;
  documentNumber: number;
  dialogVisibility: boolean = false;
  model: boolean = false;
  saving = false;
  installmentAmount: number;
  totAmount: number;
  isViewMode: boolean = false;
  openFreezeLoanDialog: boolean = false;
  LoanIdForFreezeLoan: string = "";
  today: Date = new Date();
  MinDate: Date = new Date();
  locationDropdown: any[] = [];
  locationSelectedItem: any;
  reasonDropdown: any[] = [];
  reasonSelectedItem: any;
  loanTypeDropdown: any[] = [];
  loanTypeSelectedItem: any;
  employeeDropdown: any[] = [];
  employeeSelectedItem: any;
  recommendedByDropdown: any[] = [];
  recommendedBySelectedItem: any;
  inputLoanManagementDto: InputLoanManagementDto = new InputLoanManagementDto();
  constructor(
    private _loanManagementService: LoanManagementService,
    private _employeeService: EmployeeService,
    private _restrictionService: RestrictionService,
    private messageService: MessageService,
    private _suggestionLookUpService: SuggestionLookupTableModaLService,
    private confirmationService?: ConfirmationService,
  ) {}
  ngOnInit(): void {
    this.getAll();
    this.VoucherRestriction("LM");
    this.fetchDropdownData('Employee').subscribe((items) => (this.employeeDropdown = items));
    this.fetchDropdownData('Location').subscribe((items) => (this.locationDropdown = items));
    this.fetchDropdownData('ReasonOfDeduction').subscribe((items) => (this.reasonDropdown = items));
    this.fetchDropdownData('LoanType').subscribe((items) => (this.loanTypeDropdown = items));
    this.fetchDropdownData('Employee').subscribe((items) => (this.recommendedByDropdown = items));
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
        this.inputLoanManagementDto.employeeERPId = value.id;
        this.inputLoanManagementDto.erpName = value.name;
        this.getEmployeeDetails();
        break;
      case "Location":
        this.inputLoanManagementDto.userLocationId = +value.id;
        this.inputLoanManagementDto.userLocationName = value.name;
        this.GetDocMaxCount("Loan");
        break;
      case "RecommendedByEmployee":
        this.inputLoanManagementDto.recommendedByERPId = value.id;
        this.inputLoanManagementDto.recommendedByERPName = value.name;

        break;
      case "LoanType":
        this.inputLoanManagementDto.loanTypeId = value.id;
        this.inputLoanManagementDto.loanTypeName = value.name;
        break;
      case "ReasonOfDeduction":
        this.inputLoanManagementDto.reasonOfDeductionId = value.id;
        this.inputLoanManagementDto.reasonOfDeductionName = value.name;
        break;
      // You can have multiple cases
      default:
        // Statements to execute if none of the cases match expression
        alert(`${type} is not Valid`);
    }
  }

  items: MenuItem[] | undefined = [
    {
      label: "Options",
      items: [
        {
          label: "Refresh",
          icon: "pi pi-refresh",
        },
        {
          label: "Export",
          icon: "pi pi-upload",
        },
      ],
    },
  ];

  onPageChange(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this._loanManagementService
      .getAll()
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            debugger;
            this.data = response.result.items;
            this.count = response.result.totalCount;
          } else {
            console.log(response.error);
          }
        },
      });
  }

  getAll() {
    debugger;
    this._loanManagementService
      .getAll()
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger;
          this.data = response.items;
          this.count = response.totalCount;
        },
      });
  }

  displayFreezeLoanDialog(LoanId: string) {
    this.LoanIdForFreezeLoan = LoanId;
    this.openFreezeLoanDialog = true;
  }
  // onGlobalFilter(table: Table, event: Event) {
  //     debugger;
  //     table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  // }

  onGlobalFilter(table: Table, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    table.filterGlobal(value, "contains");
  }

  handleSelection(value: any, title) {
    debugger;

    switch (title) {
      case "Employee":
        this.inputLoanManagementDto.employeeERPId = value.id;
        this.inputLoanManagementDto.erpName = value.name;
        this.getEmployeeDetails();
        break;
      case "Location":
        this.inputLoanManagementDto.userLocationId = +value.id;
        this.inputLoanManagementDto.userLocationName = value.name;
        this.GetDocMaxCount("Loan");
        break;
      case "RecommendedByEmployee":
        this.inputLoanManagementDto.recommendedByERPId = value.id;
        this.inputLoanManagementDto.recommendedByERPName = value.name;

        break;
      case "LoanType":
        this.inputLoanManagementDto.loanTypeId = value.id;
        this.inputLoanManagementDto.loanTypeName = value.name;
        break;
      case "ReasonOfDeduction":
        this.inputLoanManagementDto.reasonOfDeductionId = value.id;
        this.inputLoanManagementDto.reasonOfDeductionName = value.name;
        break;
      // You can have multiple cases
      default:
        // Statements to execute if none of the cases match expression
        alert(`${title} is not Valid`);
    }
  }
  onClose() {
    this.openFreezeLoanDialog = false;
    this.LoanIdForFreezeLoan = "";
  }
  protected gridApi: GridApi;
  rowData: any[] = [];

  colDefs: ColDef[] = [
    {
      headerName: "Installment No.",
      editable: false,
      field: "installmentNo",
      sortable: true,
      valueGetter: "node.rowIndex + 1",
      suppressSizeToFit: true,
    },
    {
      headerName: "Month",
      editable: false,
      field: "month",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Year",
      field: "year",
      editable: false,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Amount",
      editable: false,
      field: "amount",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  save() {
    debugger;
    if (!this.inputLoanManagementDto.documentDate) {
      this.messageService.add({
        severity: "warn",
        summary: "Required",
        detail: "Please Select Document Date",
        life: 2000,
      });
      return;
    }
    if (!this.inputLoanManagementDto.employeeERPId) {
      this.messageService.add({
        severity: "warn",
        summary: "Required",
        detail: "Please Select Employee",
        life: 2000,
      });
      return;
    }
    if (!this.inputLoanManagementDto.loanTypeId) {
      this.messageService.add({
        severity: "warn",
        summary: "Required",
        detail: "Please Select Loan Type",
        life: 2000,
      });
      return;
    }
    if (!this.inputLoanManagementDto.reasonOfDeductionId) {
      this.messageService.add({
        severity: "warn",
        summary: "Required",
        detail: "Please Select Reason of Deduction",
        life: 2000,
      });
      return;
    }
    if (!this.inputLoanManagementDto.recommendedByERPId) {
      this.messageService.add({
        severity: "warn",
        summary: "Required",
        detail: "Please Select Recommended Employee",
        life: 2000,
      });
      return;
    }
    if (!this.inputLoanManagementDto.amount) {
      this.messageService.add({
        severity: "warn",
        summary: "Required",
        detail: "Please Add Amount",
        life: 2000,
      });
      return;
    }
    if (
      !this.inputLoanManagementDto.numberOfInstallments &&
      this.inputLoanManagementDto.loanTypeName != "P.F.Loan"
    ) {
      this.messageService.add({
        severity: "warn",
        summary: "Required",
        detail: "Please Add Number Of Installment",
        life: 2000,
      });
      return;
    }
    if (!this.inputLoanManagementDto.repaymentStartDate) {
      this.messageService.add({
        severity: "warn",
        summary: "Required",
        detail: "Please Select  Month",
        life: 2000,
      });
      return;
    }

    this.isViewMode = false;
    this.dialogVisibility = false;
    const Docdate = new Date(this.inputLoanManagementDto.documentDate);
    const Repdate = new Date(this.inputLoanManagementDto.repaymentStartDate);
    this.inputLoanManagementDto.isActive = true;
    // this.inputLoanManagementDto.voucherNumber = "123";
    this.inputLoanManagementDto.documentDate = formatDateToISO(Docdate);
    this.inputLoanManagementDto.repaymentStartDate = formatDateToISO(Repdate);
    this._loanManagementService
      .create(this.inputLoanManagementDto)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          debugger;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.message,
            life: 2000,
          });
          return throwError(error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger;
          this.messageService.add({
            severity: "success",
            summary: "Confirmed",
            detail: "SavedSuccessfully",
            life: 2000,
          });
          this.clear();
          this.getAll();
        },
      });
  }
  // openModal(id?: any) {
  //   debugger;
  //   this.dialogVisibility = true;
  //   if (id) {
  //     this.isViewMode = true;
  //     this._loanManagementService
  //       .getDataForEdit(id)
  //       .pipe(
  //         finalize(() => {}),
  //         catchError((error) => {
  //           debugger
  //           this.messageService.add({
  //             severity: "error",
  //             summary: "Error",
  //             detail: error.error.error.message,
  //             life: 2000,
  //           });
  //           return throwError(error.error.error.message);
  //         })
  //       )
  //       .subscribe({
  //         next: (response) => {
  //           debugger;
  //           this.inputLoanManagementDto = response;
  //           this.inputLoanManagementDto.documentDate = new Date(
  //             response.documentDate
  //           ).toString();
  //           this.inputLoanManagementDto.erpId = response.erpId;
  //           this.inputLoanManagementDto.erpName = response.erpName;
  //           this.inputLoanManagementDto.loanTypeId = response.loanTypeId;
  //           this.inputLoanManagementDto.loanTypeName = response.loanTypeName;
  //           this.inputLoanManagementDto.reasonOfDeductionId =
  //             response.reasonOfDeductionId;
  //           this.inputLoanManagementDto.reasonOfDeductionName =
  //             response.reasonOfDeductionName;
  //           this.inputLoanManagementDto.recommendedByERPId =
  //             response.recommendedByERPId;
  //           this.inputLoanManagementDto.recommendedByERPName =
  //             response.recommendedByERPName;
  //           this.inputLoanManagementDto.amount = response.amount;
  //           this.inputLoanManagementDto.numberOfInstallments =
  //             response.numberOfInstallments;
  //           this.inputLoanManagementDto.comments = response.comments;
  //         },
  //       });
  //   } else {
  //     this.isViewMode = false;
  //     this.inputLoanManagementDto = new InputLoanManagementDto();
  //   }
  // }
  create() {
    if (!this.restrictionDto.isCreationAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Creation Restricted",
      });
      return;
    }
    debugger;
    this.MinDate = this.restrictionDto.creationRestrictionDate;
    this.isEditMode = false;
    this.isViewMode = false;
    this.dialogVisibility = true;
    this.inputLoanManagementDto = new InputLoanManagementDto();

    this.inputLoanManagementDto.documentDate = this.today;
    this.inputLoanManagementDto.employeeERPId = null;
    this.inputLoanManagementDto.erpName = "";
    this.inputLoanManagementDto.loanTypeId = null;
    this.inputLoanManagementDto.loanTypeName = "";
    this.inputLoanManagementDto.recommendedByERPId = null;
    this.inputLoanManagementDto.recommendedByERPName = null;
    this.inputLoanManagementDto.addresses = null;
    this.inputLoanManagementDto.contactNo = null;
    this.inputLoanManagementDto.reasonOfDeductionId = null;
    this.inputLoanManagementDto.reasonOfDeductionName = "";
    this.rowData = [];
    this.inputLoanManagementDto.installmentAmount = null;
    this.totAmount = null;
    this.costCenterId = null;
    this.costCenterName = null;
    this.projectId = null;
    this.projectName = null;
    this.locationId = null;
    this.locationName = null;
    this.joiningDate = null;
    this.departmentName = null;
    this.grossSalary = null;
    this.lastArrear = null;
    this.lastDeduction = null;
    this.lastLoan = null;
    this.inputLoanManagementDto.jobDuration = null;
    this.inputLoanManagementDto.currentSalary = null;
    this.inputLoanManagementDto.attendanceScore = null;
    this.getDefaultLocation("Location", "locationId", "locationName", "");
  }

  clear() {
    this.dialogVisibility = false;
    this.inputLoanManagementDto = new InputLoanManagementDto();
    this.inputLoanManagementDto.documentDate = null;
    this.inputLoanManagementDto.employeeERPId = null;
    this.inputLoanManagementDto.erpName = null;
    this.inputLoanManagementDto.loanTypeId = null;
    this.inputLoanManagementDto.loanTypeName = "";
    this.inputLoanManagementDto.recommendedByERPId = null;
    this.inputLoanManagementDto.recommendedByERPName = null;
    this.inputLoanManagementDto.reasonOfDeductionId = null;
    this.inputLoanManagementDto.reasonOfDeductionName = null;
    this.rowData = [];
    this.inputLoanManagementDto.installmentAmount = null;
    this.totAmount = null;
  }

  edit(dto: any) {
    debugger;
    this.isEditMode = true;
    this.dialogVisibility = true;
  }

  delete(id: number) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._loanManagementService
          .delete(id)
          .pipe(
            finalize(() => {}),
            catchError((error) => {
              debugger;
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: error.error.error.message,
                life: 2000,
              });
              return throwError(error.error.error.message);
            })
          )
          .subscribe({
            next: (response) => {
              debugger;
              if (response) {
                this.messageService.add({
                  severity: "info",
                  summary: "Confirmed",
                  detail: "Deleted Successfully",
                  life: 2000,
                });
                this.getAll();
              }
            },
          });
      },
    });
  }

  generateInstallments() {
    debugger;
    this.saving = true;

    if (!this.inputLoanManagementDto.loanTypeId) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please Select Transaction Type",
        life: 2000,
      });
      return;
    }

    const amount = this.inputLoanManagementDto.amount;
    const installment = this.inputLoanManagementDto.installmentAmount;
    const repaymentStartDate = new Date(
      this.inputLoanManagementDto.repaymentStartDate
    );

    if (!amount) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please enter the total amount",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!installment) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please enter Installment Amount",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!repaymentStartDate) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please select the repayment start date",
        life: 2000,
      });
      this.saving = false;
      return;
    }

    const totalAmount = this.inputLoanManagementDto.amount;
    if (
      !isNaN(totalAmount) &&
      !isNaN(this.inputLoanManagementDto.installmentAmount) &&
      this.inputLoanManagementDto.installmentAmount !== 0
    ) {
      const numberOfInstallments = Math.ceil(
        totalAmount / this.inputLoanManagementDto.installmentAmount
      );
      this.inputLoanManagementDto.numberOfInstallments = numberOfInstallments;
    }

    this.rowData = this.getInstallmentsData(
      this.inputLoanManagementDto.amount,
      this.inputLoanManagementDto.installmentAmount,
      this.inputLoanManagementDto.numberOfInstallments,
      new Date(this.inputLoanManagementDto.repaymentStartDate)
    );

    this.totAmount = totalAmount;
    this.saving = false;
  }

  genratePF() {
    debugger;
    if (!this.inputLoanManagementDto.loanTypeId) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please Select Transaction Type",
        life: 2000,
      });
      return;
    }
    const amount = this.inputLoanManagementDto.amount;
    const repaymentStartDate = new Date(
      this.inputLoanManagementDto.repaymentStartDate
    );

    if (!amount) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please enter the total amount",
        life: 2000,
      });
      return;
    }
    if (!repaymentStartDate) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please select the repayment start date",
        life: 2000,
      });
      return;
    }

    let myObj = {
      month: repaymentStartDate.getMonth(),
      year: repaymentStartDate.getFullYear(),
      amount: amount,
    };
    this.rowData = [];
    this.rowData.push(myObj);
    this.gridApi.refreshCells();
    this.totAmount = amount;
  }

  getInstallmentsData(
    totAmount: number,
    installmentAmount: number,
    noOfInstall: number,
    startDate: Date
  ) {
    debugger;
    let startMonth = startDate.getMonth() + 1;
    let startYear = startDate.getFullYear();
    let myArr = [];

    let remainingAmount = totAmount;

    for (let index = 0; index < noOfInstall; index++) {
      let month = startMonth + index;
      let year = startYear + Math.floor((month - 1) / 12);
      month = ((month - 1) % 12) + 1;

      let amount =
        index === noOfInstall - 1 ? remainingAmount : installmentAmount;
      remainingAmount -= amount;

      let myObj = {
        month: month,
        year: year,
        amount: amount,
      };

      myArr.push(myObj);
    }
    return myArr;
  }

  getEmployeeDetails() {
    debugger;
    this._employeeService
      .getEmpDetais(this.inputLoanManagementDto.employeeERPId)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
        catchError((error) => {
          this.messageService.add({
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
        this.inputLoanManagementDto.jobDuration = result["jobDuration"];
        this.inputLoanManagementDto.currentSalary = result["grossPay"];
        this.inputLoanManagementDto.currentLoan = result["currentLoan"];
        this.inputLoanManagementDto.attendanceScore = result["attendanceScore"];
        this.inputLoanManagementDto.addresses = result["addresses"][0];
        this.inputLoanManagementDto.contactNo = result["phoneNumber"];
        this.costCenterName = result["costCenterName"];
        this.projectName = result["projectName"];
        this.locationName = result["locationName"];
        this.regionName = result["regionName"];
        this.joiningDate = new Date(result["joiningDate"]);
        this.departmentName = result["departmentName"];
        this.grossSalary = result["grossPay"];
        this.lastArrear = result["lastArrear"];
        this.lastDeduction = result["lastDeduction"];
        this.lastLoan = result["currentLoan"];
      });
  }

  Edit(id: number) {
    if (!this.restrictionDto.isEditAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Edit Restricted",
      });
      return;
    }
    this.isEditMode = true;
    this.isViewMode = false;
    this.MinDate = this.restrictionDto.editRestrictionDate;

    debugger;
    if (!id) {
      return;
    }
    this._loanManagementService
      .getForEdit(id)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.message,
            life: 2000,
          });
          return throwError(error.message);
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          debugger;
          this.inputLoanManagementDto = response;
          // this.getDefaultLocation(
          //   "Location",
          //   "locationId",
          //   "locationName",
          //   response.costCenterId
          // );
          this.generateInstallments();
          this.inputLoanManagementDto.documentDate = new Date(
            response.documentDate
          );
          this.inputLoanManagementDto.repaymentStartDate = new Date(
            response.repaymentStartDate
          );
          this.inputLoanManagementDto.employeeERPId = response.erpId;
          this.inputLoanManagementDto.erpName = response.employeeName;
          this.inputLoanManagementDto.recommendedByERPId =
            response.recommendedByERPId;
          this.inputLoanManagementDto.recommendedByERPName =
            response.recommendedByName;
          // this.inputLoanManagementDto.installmentAmount = this.inputLoanManagementDto.amount / this.inputLoanManagementDto.numberOfInstallments
          this.inputLoanManagementDto.installmentAmount =
            response.installmentAmount;
          this.totAmount = this.inputLoanManagementDto.amount;
          this.getEmployeeDetails();
          this.dialogVisibility = true;
        },
      });
  }

  View(id: number) {
    this.isViewMode = true;
    this.isEditMode = false;
    this.MinDate = null;

    debugger;
    if (!id) {
      return;
    }
    this._loanManagementService
      .getForEdit(id)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          debugger;
          this.inputLoanManagementDto = response;
          this.generateInstallments();
          this.inputLoanManagementDto.documentDate = new Date(
            response.documentDate
          );
          this.inputLoanManagementDto.repaymentStartDate = new Date(
            response.repaymentStartDate
          );
          this.inputLoanManagementDto.employeeERPId = response.erpId;
          this.inputLoanManagementDto.erpName = response.employeeName;
          this.inputLoanManagementDto.recommendedByERPId =
            response.recommendedByERPId;
          this.inputLoanManagementDto.recommendedByERPName =
            response.recommendedByName;
          // this.inputLoanManagementDto.installmentAmount = this.inputLoanManagementDto.amount / this.inputLoanManagementDto.numberOfInstallments
          this.inputLoanManagementDto.installmentAmount =
            response.installmentAmount;
          this.totAmount = this.inputLoanManagementDto.amount;
          this.getEmployeeDetails();
          this.dialogVisibility = true;
        },
      });
  }

  Approve(id: number) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._loanManagementService
          .approve(id)
          .pipe(
            finalize(() => {}),
            catchError((error) => {
              debugger;
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: error.error.error.message,
                life: 2000,
              });
              return throwError(error.error.error.message);
            })
          )
          .subscribe({
            next: (response) => {
              debugger;
              if (response) {
                this.messageService.add({
                  severity: "info",
                  summary: "Confirmed",
                  detail: "Approved Successfully",
                  life: 2000,
                });
                this.getAll();
              }
            },
          });
      },
    });
  }

  update() {
    debugger;
    this._loanManagementService
      .update(this.inputLoanManagementDto)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          debugger;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger;
          this.messageService.add({
            severity: "success",
            summary: "Confirmed",
            detail: "UpdatedSuccessfully",
            life: 2000,
          });
          this.clear();
          this.getAll();
          this.dialogVisibility = false;
        },
      });
  }

  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.inputLoanManagementDto.documentDate = value;
    }
    if (
      this.inputLoanManagementDto.userLocationId &&
      this.inputLoanManagementDto.documentDate
    ) {
      this.GetDocMaxCount("Loan");
    }
  }
  MakeVoucher() {
    debugger;

    if (this.inputLoanManagementDto.userLocationId && this.documentNumber) {
      this.inputLoanManagementDto.voucherNumber =
        "LM-HNL" +
        "-" +
        this.inputLoanManagementDto.userLocationId +
        "-" +
        this.inputLoanManagementDto.documentDate.getFullYear() +
        "-" +
        (this.inputLoanManagementDto.documentDate.getMonth() + 1) +
        "-" +
        this.documentNumber;
    } else {
      this.GetDocMaxCount("Loan");
    }
  }
  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._loanManagementService
      .getDefaultLocation(target, filterId)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger;
          this.inputLoanManagementDto.userLocationName = response.items[0].name;
          this.inputLoanManagementDto.userLocationId = response.items[0].id;
          this.GetDocMaxCount("Loan");
        },
      });
  }

  GetDocMaxCount(target: string) {
    debugger;
    if (
      this.inputLoanManagementDto.userLocationId &&
      this.inputLoanManagementDto.documentDate
    ) {
      this._loanManagementService
        .GetDocMaxCount(
          target,
          this.inputLoanManagementDto.userLocationId,
          this.inputLoanManagementDto.documentDate
        )
        .pipe(
          finalize(() => {}),
          catchError((error) => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: error.error.error.message,
              life: 2000,
            });
            return throwError(error.error.error.message);
          })
        )
        .subscribe({
          next: (response) => {
            debugger;
            this.documentNumber = response;
            this.MakeVoucher();
          },
        });
    }
  }
  onDialogClose() {
    this.confirmationService.confirm({
      message: "Are you sure you want to close without saving?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.dialogVisibility = false;
      },
      reject: () => {
        this.dialogVisibility = true;
      },
    });
  }
  VoucherRestriction(prefix: string) {
    this._restrictionService
      .getVoucherRestriction(prefix)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          debugger;
          this.restrictionDto = mapRestrictionDto(response.items[0]);
          console.log(this.restrictionDto);
        },
      });
  }
}
