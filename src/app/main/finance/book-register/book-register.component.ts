import { Component, ViewChild } from "@angular/core";
import { BankRegister } from "../Shared/Dtos/book-register-dto";
import { FinanceModuleService } from "@app/main/finance/Shared/Services/finance-module.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { ChartOfAccountPickerComponent } from "@shared/components/chart-of-account-picker/chart-of-account-picker.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";

@Component({
  selector: "app-book-register",
  templateUrl: "./book-register.component.html",
})
export class BookRegisterComponent {
  restrictionDto: RestrictionDto = new RestrictionDto();

  constructor(
    private _financeModuleService: FinanceModuleService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private suggestionService: BsModalService,
    private fb: FormBuilder,
    private confirmationService?: ConfirmationService
  ) {}

  target = "VisitBookRegister";
  data: any;
  updatemodel: boolean;
  count: number;
  suggestionModalRef: BsModalRef;
  saving: boolean;
  editMode: boolean = false;
  dialogVisibility: boolean;
  totalCount = 0;
  loading: boolean = false;
  viewOnly: boolean = false;
  currentPage: number = 1;
  skipCount: number = 0;
  bookRegisterFG: FormGroup;
  documentStatus: string = "";
  maxCount: number = 5;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  // @ViewChild("chartOfAccountPicker")
  // chartOfAccountPicker: ChartOfAccountPickerComponent;
  bookRegisterDto: BankRegister = new BankRegister();

  rowData: any;
  today: Date = new Date();
  MinDate: Date = new Date();
  gridApi: any;
  locationId: number;
  locationName: string;
  ngOnInit(): void {
    this.bookRegisterFG = this.fb.group({
      id: [0],
      issueDate: ["", Validators.required],
      userLocationId: ["", [Validators.required]],
      userLocationName: ["", [Validators.required]],
      costCenterId: ["", [Validators.required]],
      costCenterName: ["", [Validators.required]],
      projectId: ["", [Validators.required]],
      projectName: ["", [Validators.required]],
      serviceEquipmentId: ["", [Validators.required]],
      serviceEquipmentName: ["", [Validators.required]],
      numberOfBooks: ["", [Validators.required]],
      remarks: [""],
      visitBookRegisterDetails: [[], Validators.required],
      bookNumberStart: ["", Validators.required],
      voucherNumber: ["", [Validators.required]],
      serialNumberStart: ["", Validators.required],
    });
    this.getAll();
    this.VoucherRestriction("VBR");
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
    this.bookRegisterFG.disable();
    this.viewOnly = true;
  }

  handleEditCheque(id?: number, viewOnly?: boolean) {
    debugger;
    if (!viewOnly) {
      if (!this.restrictionDto.isEditAllowed) {
        this.messageService.add({
          severity: "info",
          summary: "Info",
          detail: "Edit Restricted",
        });
        return;
      }
      this.bookRegisterFG.enable();
      this.MinDate = this.restrictionDto.editRestrictionDate;
    } else {
      this.bookRegisterFG.disable();
      this.MinDate = null;
    }
    this.dialogVisibility = true;
    this.viewOnly = false;
    this.editMode = true;
    debugger;
    this._financeModuleService
      .getDataForEdit(id, this.target)
      .subscribe((res) => {
        console.log(res);
        debugger;
        this.documentStatus = res.status;
        this.bookRegisterFG.patchValue({
          ...res,
          issueDate: new Date(res.issueDate),
        });
      });
  }

  deleteGeneratedCheque(index: number): void {
    let visitBookRegisterDetails = this.bookRegisterFG.get(
      "visitBookRegisterDetails"
    ).value;
    visitBookRegisterDetails.splice(index, 1);
    this.bookRegisterFG.patchValue({
      visitBookRegisterDetails,
      numberOfBooks: visitBookRegisterDetails?.length,
    });
  }
  isFieldInvalid(field: string): boolean {
    const control = this.bookRegisterFG.get(field);
    return control ? control.invalid && control.touched : false;
  }
  handleSaveCheckRegister() {
    debugger;
    this.bookRegisterFG.patchValue({ id: 0 });
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.saving = true;
        this._financeModuleService
          .create(
            {
              ...this.bookRegisterFG.value,
              bookNumberStart:
                this.bookRegisterFG.value.bookNumberStart.toString(),
              serialNumberStart:
                this.bookRegisterFG.value.serialNumberStart.toString(),
            },
            "VisitBookRegister"
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
                this.documentStatus = "";
                this.dialogVisibility = false;
                this.bookRegisterDto = new BankRegister();
              }
            },
          });
      },
    });
  }

  verifyAllChequesUtilized(): boolean {
    let visitBookRegisterDetails =
      this.bookRegisterFG.get("visitBookRegisterDetails").value || [];
    let chequeUtilized = visitBookRegisterDetails.some((chq) => chq.isUtilized);
    return chequeUtilized;
  }

  update() {
    this.bookRegisterFG.value.bookNumberStart =
      this.bookRegisterFG.value.bookNumberStart.toString();
    this.bookRegisterFG.value.serialNumberStart =
      this.bookRegisterFG.value.serialNumberStart.toString();
    this._financeModuleService
      .update(this.bookRegisterFG.value, "VisitBookRegister")
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
            this.updatemodel = true;
            this.dialogVisibility = false;
            this.bookRegisterDto = new BankRegister();
          }
        },
      });
  }

  handleIsCheckCancelled(value, index, cheque) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.loading = true;
        this._financeModuleService
          .markBookAsCancelled(cheque.id, this.target)
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
    this.bookRegisterFG.enable();
    this.bookRegisterDto = new BankRegister();
    this.editMode = false;
    this.viewOnly = false;
    this.bookRegisterFG.patchValue({ id: 0 });
    this.getDefaultLocation(
      "Location",
      "locationName",
      "locationId",
      "this.dataForEdit.locationName"
    );
    this.bookRegisterFG.reset();
    this.dialogVisibility = true;
    this.bookRegisterFG.get("issueDate").setValue(this.today);
    this.MinDate = this.restrictionDto.creationRestrictionDate;
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
          this.bookRegisterFG
            .get("userLocationName")
            .setValue(response.items[0].shortName);
          this.bookRegisterFG
            .get("userLocationId")
            .setValue(response.items[0].id);
          this.getVoucherNumber(
            "VBR",
            this.bookRegisterFG.value.issueDate,
            this.bookRegisterFG.value.userLocationId
          );
        },
      });
  }

  MakeVoucher(value?: Date) {
    if (value) {
      this.bookRegisterFG.value.documentDate = value;
      this.bookRegisterFG.value.issueDate = value;
    }
    if (
      this.bookRegisterFG.value.userLocationId &&
      this.bookRegisterFG.value.documentDate
    ) {
      let voucherNumber =
        "BR" +
        "/" +
        (this.bookRegisterFG.value.documentDate.getMonth() + 1) +
        "/" +
        this.bookRegisterFG.value.documentDate.getFullYear() +
        "/" +
        this.bookRegisterFG.value.userLocationId;
      this.bookRegisterFG.patchValue({ voucherNumber });
    }
  }

  handleGenerateCheques() {
    debugger;
    let { bookNumberStart, serialNumberStart, numberOfBooks } =
      this.bookRegisterFG.value;
    if (!bookNumberStart || !serialNumberStart || numberOfBooks <= 0) {
      return;
    }
    let visitBookRegisterDetails = [];
    for (let i = 0; i < this.bookRegisterFG.value.numberOfBooks; i++) {
      let bookNumber =
        this.bookRegisterFG.value.bookNumberStart?.toString() +
        (this.bookRegisterFG.value.serialNumberStart + i);
      visitBookRegisterDetails.push({
        id: 0,
        bookNumber,
        isCancelled: false,
        chequeBookRegisterInfoId: 0,
      });
    }
    this.bookRegisterFG.patchValue({ visitBookRegisterDetails });
    // this.bookRegisterDto.chequeNoStart = chequeNumbers.join(", ");
  }
  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.bookRegisterFG.value.issueDate = value;
    }
    if (
      this.bookRegisterFG.value.userLocationId &&
      this.bookRegisterFG.value.issueDate
    ) {
      this.getVoucherNumber(
        "VBR",
        this.bookRegisterFG.value.issueDate,
        this.bookRegisterFG.value.userLocationId
      );
    }
  }
  handleVisibleChange(visible: boolean) {
    if (visible == false) {
      this.bookRegisterFG.patchValue({ id: 0 });
      this.bookRegisterFG.reset();
      this.bookRegisterFG.enable();
    }
  }
  getVoucherNumber(prefix: string, issueDate: string, userLocationId: number) {
    debugger;
    this._financeModuleService
      .getVoucherNumber(this.target, prefix, issueDate, userLocationId)
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
          this.bookRegisterFG.get("voucherNumber").setValue(response);
        },
        error: (err) => {
          console.log("An error occurred", err);
        },
      });
  }
  setPickerValue(value: any, title: string) {
    switch (title) {
      case "Location":
        // this.locationId = +value.id;
        this.bookRegisterFG.patchValue({
          userLocationId: +value.id,
          userLocationName: value.name,
        });
        this.locationName = value.name;
        this.getVoucherNumber(
          "VBR",
          this.bookRegisterFG.value.issueDate,
          value?.id
        );
        break;
      case "ChartOfAccount":
        this.bookRegisterFG.patchValue({
          chartOfAccountId: +value.id,
          chartOfAccountName: value.name,
        });
        break;
      case "CostCenter":
        debugger;
        this.bookRegisterFG.patchValue({
          costCenterId: +value.id || "",
          costCenterName: value.name,
        });
        // this.bookRegisterDto.costCenterId = +value.id;
        // this.bookRegisterDto.costCenterName = value.name;
        break;
      case "Project":
        this.bookRegisterFG.patchValue({
          projectId: +value.id || "",
          projectName: value.name,
        });
        // this.bookRegisterDto.projectId = +value.id;
        // this.bookRegisterDto.projectName = value.name;
        break;
      case "ServiceEquipment":
        debugger;
        this.bookRegisterFG.patchValue({
          serviceEquipmentId: +value.id || "",
          serviceEquipmentName: value.name,
        });
        // this.bookRegisterDto.serviceEquipmentId = +value.id;
        // this.bookRegisterDto.serviceEquipmentName = value.name;
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
