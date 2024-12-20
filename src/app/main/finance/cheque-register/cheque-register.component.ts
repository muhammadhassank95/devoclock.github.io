import { Component, ViewChild } from "@angular/core";
import { ChequeRegister } from "../Shared/Dtos/cheque-register";
import { FinanceModuleService } from "@app/main/finance/Shared/Services/finance-module.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { ChartOfAccountPickerComponent } from "@shared/components/chart-of-account-picker/chart-of-account-picker.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";

@Component({
  selector: "app-cheque-register",
  templateUrl: "./cheque-register.component.html",
})
export class ChequeRegisterComponent {
  restrictionDto: RestrictionDto = new RestrictionDto();

  constructor(
    private _financeModuleService: FinanceModuleService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private suggestionService: BsModalService,
    private fb: FormBuilder,
    private confirmationService?: ConfirmationService
  ) {}

  target = "ChequeBookRegister";
  data: any;
  count: number;
  suggestionModalRef: BsModalRef;
  saving: boolean;
  editMode: boolean = false;
  dialogVisibility: boolean;
  today: Date = new Date();
  MinDate: Date = new Date();
  totalCount = 0;
  loading: boolean = false;
  viewOnly: boolean = false;
  currentPage = 1;
  dto = {
    skipCount: 0,
    maxCount: 5,
  };
  chequeRegisterFG: FormGroup;
  documentStatus: string = "";
  maxCount: number = 5;
  @ViewChild("chartOfAccountPicker")
  chartOfAccountPicker: ChartOfAccountPickerComponent;
  chequeRegisterDto: ChequeRegister = new ChequeRegister();

  rowData: any;
  gridApi: any;
  locationId: number;
  locationName: string;
  ngOnInit(): void {
    this.chequeRegisterFG = this.fb.group({
      id: [0],
      issueDate: ["", Validators.required],
      userLocationId: ["", [Validators.required]],
      userLocationName: ["", [Validators.required]],
      chartOfAccountId: ["", [Validators.required]],
      chartOfAccountName: ["", [Validators.required]],
      chartOfAccountSerialNumber: [""],
      numberOfCheques: ["", [Validators.required]],
      remarks: ["Cheque Register"],
      chequeBookRegisterDetails: [[], Validators.required],
      chequeNumberStart: ["", Validators.required],
      voucherNumber: ["", [Validators.required]],
      serialNumberStart: ["", Validators.required],
    });
    this.getAll();
    this.VoucherRestriction("CR");
  }

  isCancelledDropdownOptions = [
    {
      label: "Yes",
      value: true,
    },
    {
      label: "No",
      value: false,
    },
  ];

  onPageChange(event: any) {
    debugger;
    this.dto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.dto.skipCount = (this.currentPage - 1) * 5;
    this._financeModuleService.getAll(this.target, this.dto).subscribe({
      next: (response) => {
        debugger;

        this.data = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }

  getAll() {
    this.loading = true;
    this._financeModuleService
      .getAll(this.target)
      .pipe(
        finalize(() => {
          this.loading = false;
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
      .subscribe({
        next: (response) => {
          this.data = response.items;
          this.count = response.totalCount;
        },
      });
  }

  openChequeRegisterInViewOnlyMode() {
    this.chequeRegisterFG.disable();
    this.viewOnly = true;
  }

  handleEditCheque(id?: number, viewOnly?: boolean) {
    if (!viewOnly && !this.restrictionDto.isEditAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Edit Restricted",
      });
      return;
    }
    if (!viewOnly) {
      this.chequeRegisterFG.enable();
      this.MinDate = this.restrictionDto.editRestrictionDate;
    } else {
      this.chequeRegisterFG.disable();
      this.MinDate = null;
    }
    this.dialogVisibility = true;
    this.viewOnly = false;
    this.editMode = true;
    this._financeModuleService
      .getDataForEdit(id, this.target)
      .subscribe((res) => {
        debugger;
        this.documentStatus = res.status;
        this.chequeRegisterFG.patchValue({
          ...res,
          issueDate: new Date(res.issueDate),
        });
      });
  }
  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.chequeRegisterFG.value.issueDate = value;
    }
    if (
      this.chequeRegisterFG.value.userLocationId &&
      this.chequeRegisterFG.value.issueDate
    ) {
      this.getVoucherNumber();
    }
  }
  getVoucherNumber() {
    debugger;
    this._financeModuleService
      .getVoucherNumber(
        this.target,
        "CR",
        this.chequeRegisterFG.value.issueDate,
        this.chequeRegisterFG.value.userLocationId
      )
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
          this.chequeRegisterFG.get("voucherNumber").setValue(response);
        },
        error: (err) => {
          console.log("An error occurred", err);
        },
      });
  }
  deleteGeneratedCheque(index: number): void {
    let chequeBookRegisterDetails = this.chequeRegisterFG.get(
      "chequeBookRegisterDetails"
    ).value;
    chequeBookRegisterDetails.splice(index, 1);
    this.chequeRegisterFG.patchValue({
      chequeBookRegisterDetails,
      numberOfCheques: chequeBookRegisterDetails?.length,
    });
  }

  handleSaveCheckRegister() {
    debugger;
    this.chequeRegisterFG.patchValue({ id: 0 });
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.saving = true;
        debugger;
        this._financeModuleService
          .create(
            {
              ...this.chequeRegisterFG.value,
              chequeNumberStart:
                this.chequeRegisterFG.value.chequeNumberStart.toString(),
              serialNumberStart:
                this.chequeRegisterFG.value.serialNumberStart.toString(),
            },
            "ChequeBookRegister"
          )
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
          .subscribe({
            next: (response) => {
              if (response) {
                this.getAll();
                this.messageService.add({
                  severity: "success",
                  summary: "Confirmed",
                  detail: "CreatedSuccessfully",
                  life: 2000,
                });
                this.saving = false;
                this.dialogVisibility = false;
                this.chequeRegisterDto = new ChequeRegister();
              }
            },
          });
      },
    });
  }

  verifyAllChequesUtilized(): boolean {
    let chequeBookRegisterDetails =
      this.chequeRegisterFG.get("chequeBookRegisterDetails").value || [];
    let chequeUtilized = chequeBookRegisterDetails.some(
      (chq) => chq.isUtilized
    );
    return chequeUtilized;
  }

  update() {
    this.chequeRegisterFG.value.chequeNumberStart =
      this.chequeRegisterFG.value.chequeNumberStart.toString();
    this.chequeRegisterFG.value.serialNumberStart =
      this.chequeRegisterFG.value.serialNumberStart.toString();
    this._financeModuleService
      .update(this.chequeRegisterFG.value, "ChequeBookRegister")
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
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
          if (response) {
            this.getAll();
            this.messageService.add({
              severity: "success",
              summary: "Confirmed",
              detail: "CreatedSuccessfully",
            });
            this.saving = false;
            this.dialogVisibility = false;
            this.chequeRegisterDto = new ChequeRegister();
          }
        },
      });
  }

  handleIsCheckCancelled(value, index, cheque) {
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.loading = true;
        this._financeModuleService
          .markChequeAsCancelled(cheque.id, this.target)
          .pipe(
            finalize(() => {
              this.loading = false;
            }),
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
              if (response) {
                this.dialogVisibility = false;
                this.messageService.add({
                  severity: "success",
                  summary: "Confirmed",
                  detail: "Check Marked as Cancelled Successfully",
                });
                this.getAll();
              }
            },
          });
      },
    });
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.loading = true;
        this._financeModuleService
          .delete(id, this.target)
          .pipe(
            finalize(() => {
              this.loading = false;
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
          .subscribe({
            next: (response) => {
              if (response) {
                this.messageService.add({
                  severity: "success",
                  summary: "Confirmed",
                  detail: "Deleted Successfully",
                });
                this.getAll();
              }
            },
          });
      },
    });
  }

  approve(id: number) {
    if (!this.restrictionDto.isApprovalAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Approve Restricted",
      });
      return;
    }
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.loading = true;
        this._financeModuleService
          .approve(id, this.target)
          .pipe(
            finalize(() => {
              this.loading = false;
            }),
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
              if (response) {
                this.messageService.add({
                  severity: "success",
                  summary: "Confirmed",
                  detail: "Approved Successfully",
                });
                this.getAll();
              }
            },
          });
      },
    });
  }

  openModal() {
    if (!this.restrictionDto.isCreationAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Creation Restricted",
      });
      return;
    }
    this.chequeRegisterFG.enable();
    this.chequeRegisterDto = new ChequeRegister();
    this.editMode = false;
    this.documentStatus = "PENDING";
    this.chequeRegisterFG.patchValue({ id: 0 });
    this.getDefaultLocation(
      "Location",
      "locationName",
      "locationId",
      "this.dataForEdit.locationName"
    );
    this.chequeRegisterFG.reset();
    this.MinDate = this.restrictionDto.creationRestrictionDate;
    this.chequeRegisterFG.get("issueDate").setValue(this.today);
    this.dialogVisibility = true;
  }
  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._financeModuleService
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
          this.documentStatus = "PENDING";
          this.editMode = false;
          this.chequeRegisterFG
            .get("userLocationName")
            .setValue(response.items[0].shortName);
          this.chequeRegisterFG
            .get("userLocationId")
            .setValue(response.items[0].id);
          this.getVoucherNumber();
        },
      });
  }
  MakeVoucher(value?: Date) {
    if (value) {
      this.chequeRegisterFG.value.documentDate = value;
      this.chequeRegisterFG.value.issueDate = value;
    }
    if (
      this.chequeRegisterFG.value.userLocationId &&
      this.chequeRegisterFG.value.documentDate
    ) {
      let voucherNumber =
        "CR" +
        "/" +
        (this.chequeRegisterFG.value.documentDate.getMonth() + 1) +
        "/" +
        this.chequeRegisterFG.value.documentDate.getFullYear() +
        "/" +
        this.chequeRegisterFG.value.userLocationId;
      this.chequeRegisterFG.patchValue({ voucherNumber });
    }
  }

  handleGenerateCheques() {
    let { chequeNumberStart, serialNumberStart, numberOfCheques } =
      this.chequeRegisterFG.value;
    if (!chequeNumberStart || !serialNumberStart || numberOfCheques <= 0) {
      return;
    }
    let chequeBookRegisterDetails = [];
    for (let i = 0; i < this.chequeRegisterFG.value.numberOfCheques; i++) {
      let chequeNumber =
        this.chequeRegisterFG.value.chequeNumberStart?.toString() +
        (this.chequeRegisterFG.value.serialNumberStart + i);
      chequeBookRegisterDetails.push({
        id: 0,
        chequeNumber,
        isCancelled: false,
        chequeBookRegisterInfoId: 0,
      });
    }
    this.chequeRegisterFG.patchValue({ chequeBookRegisterDetails });
    // this.chequeRegisterDto.chequeNoStart = chequeNumbers.join(", ");
  }

  handleVisibleChange(visible: boolean) {
    if (visible == false) {
      this.chequeRegisterFG.patchValue({ id: 0 });
      this.chequeRegisterFG.reset();
      this.chequeRegisterFG.enable();
    }
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        // this.locationId = +value.id;
        this.chequeRegisterFG.patchValue({
          userLocationId: +value.id,
          userLocationName: value.name,
        });
        this.locationName = value.name;
        this.getVoucherNumber();
        break;
      case "ChartOfAccount":
        this.chequeRegisterFG.patchValue({
          chartOfAccountId: +value.id,
          chartOfAccountName: value.name,
        });
        // this.chequeRegisterDto.bankId = +value.id;
        this.chequeRegisterDto.bankName = value.name;
        break;
      case "Bank":
        this.chequeRegisterFG.patchValue({
          chartOfAccountId: +value.id || "",
          chartOfAccountName: value.name,
          chartOfAccountSerialNumber: value.serialNumber,
        });
        // this.fetchBankCOAs();
        // this.chequeRegisterDto.bankId = +value.id;
        // this.chequeRegisterDto.bankName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  onGlobalFilter(table: Table, event: Event) {
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "contains");
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
