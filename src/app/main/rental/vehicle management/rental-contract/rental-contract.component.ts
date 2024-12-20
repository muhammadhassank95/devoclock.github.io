import { Component } from "@angular/core";
import { MessageService, ConfirmationService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RentalService } from "../../shared/services/rental.service";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../../budget/shared/Dtos/restriction-dto";
import { mapRestrictionDto } from "@shared/Utials/utils";
import { RestrictionService } from "../../../budget/shared/services/restriction.service";

@Component({
  selector: "app-rental-contract",
  templateUrl: "./rental-contract.component.html",
})
export class RentalContractComponent {
  restrictionDto: RestrictionDto = new RestrictionDto();
  editMode: boolean;
  displayModal: boolean;
  target: string = "RentalContract";
  tableData: any;
  count: number;
  today: Date = new Date();
  MinDate: Date = new Date();
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 5;
  saving: boolean;
  loading: boolean;
  dto = {
    DocOrVocNumber: "",
  };
  showSupplierDetails = false;
  maxDate: Date = new Date();
  dataForEdit: any;
  viewMode: boolean;
  employeeErpId: number;
  rentalcontractform: FormGroup;
  documentNumber: number;
  minDate: Date = new Date();
  showSerialNumber: string;
  subLedgerType: string;
  rentalContractOptions = [
    { label: "Monthly", value: 1 },
    { label: "Two Months", value: 2 },
    { label: "Quarterly", value: 3 },
    { label: "Four Months", value: 4 },
    { label: "Five Months", value: 5 },
    { label: "Six Months", value: 6 },
    { label: "Seven Months", value: 7 },
    { label: "Eight Months", value: 8 },
    { label: "Nine Months", value: 9 },
    { label: "Ten Months", value: 10 },
    { label: "Eleven Months", value: 11 },
    { label: "Annual", value: 12 },
    { label: "Biennial", value: 24 },
    { label: "Triennial", value: 36 },
    { label: "Five Years", value: 60 },
    { label: "Ten Years", value: 120 },
  ];
  chooseContractOptions = [
    { label: "Vehicle Contract", value: true },
    { label: "House Contract", value: false },
  ];
  constructor(
    private fb: FormBuilder,
    private _rentalService: RentalService,
    private _restrictionService: RestrictionService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.rentalcontractform = this.fb.group({
      issueDate: [new Date(), Validators.required],
      voucherNumber: [null, Validators.required],
      contractReferenceId: [null, Validators.required],
      contractReferenceName: [""],
      supplierId: [null, Validators.required],
      supplierName: [""],
      costCenterId: [null, Validators.required],
      costCenterName: [""],
      // regionId: [null, Validators.required],
      // regionName: [""],
      projectId: [null, [Validators.required]],
      projectName: [""],
      rentalContractType: [null, [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      rate: [null, [Validators.required]],
      // maximumTravelling: [null, [Validators.required]],
      employeeId: [null, [Validators.required]],
      employeeName: [""],
      employeeErpId: "",
      employeeCode: ["", [Validators.required]],
      userLocationId: [null, [Validators.required]],
      userLocationName: ["", [Validators.required]],
      isVehicleContract: [""],
      isActive: [""],
      status: [""],
      remarks: ["", [Validators.required]],
      refundableSecurityDeposit: ["", [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getAll();
    const isVehicleContract =
      this.rentalcontractform.get("isVehicleContract")?.value ?? true;
    const prefix = isVehicleContract ? "RVC" : "RHC";
    this.VoucherRestriction(prefix);
  }

  setPickerValue(value: any, title: string) {
    switch (title) {
      case "Location":
        debugger;
        this.rentalcontractform.patchValue({
          userLocationId: value?.id,
          userLocationName: value.name,
        });
        this.GetDocMaxCount("RentalContract");
        break;
      case "CostCenter":
        this.rentalcontractform.patchValue({
          costCenterId: value.id,
          costCenterName: value.name,
        });
        break;
      case "Project":
        this.rentalcontractform.patchValue({
          projectId: value.id,
          projectName: value.name,
        });
        break;
      case "Region":
        this.rentalcontractform.patchValue({
          regionId: value.id,
          regionName: value.name,
        });
        break;
      case "Supplier":
        this.rentalcontractform.patchValue({
          supplierId: value.id,
          supplierName: value.title,
        });
        this.showSerialNumber = value.serialNumber;
        break;
      case "Employee":
        this.rentalcontractform.patchValue({
          employeeId: value.additional,
          employeeName: value.name,
          employeeErpId: value.id,
        });
        break;
      case "Vehicle":
        this.rentalcontractform.patchValue({
          contractReferenceId: value.id,
          contractReferenceName: value.name,
        });
        break;
      case "RentalHouse":
        this.rentalcontractform.patchValue({
          contractReferenceId: value.id,
          contractReferenceName: value.name,
        });
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  getAll(skipCount: number = this.skipCount, maxCount: number = this.maxCount) {
    this._rentalService
      .getAll(this.target)
      .pipe(
        finalize(() => {}),
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
      .subscribe({
        next: (response) => {
          debugger;
          this.tableData = response.items;
          this.count = response.totalCount;
        },
      });
  }

  show(id?: number) {
    if (id) {
      this._rentalService
        .getDataForEdit(id, this.target)
        .pipe(
          finalize(() => {
            // Any cleanup or loading off code if needed
          }),
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
        .subscribe({
          next: (response) => {
            debugger;
            this.dataForEdit = response;
            this.rentalcontractform.patchValue({
              voucherNumber: this.dataForEdit.voucherNumber,
              issueDate: new Date(this.dataForEdit.issueDate),
              startDate: new Date(this.dataForEdit.startDate),
              endDate: new Date(this.dataForEdit.endDate),
              remarks: this.dataForEdit.remarks,
              refundableSecurityDeposit:
                this.dataForEdit.refundableSecurityDeposit,
              costCenterId: this.dataForEdit.costCenterId,
              costCenterName: this.dataForEdit.costCenterName,
              projectId: this.dataForEdit.projectId,
              projectName: this.dataForEdit.projectName,
              userLocationId: this.dataForEdit.userLocationId,
              userLocationName: this.dataForEdit.userLocationName,
              rate: this.dataForEdit.rate,
              employeeId: this.dataForEdit.employeeId,
              employeeName: this.dataForEdit.employeeName,
              employeeErpId: this.dataForEdit.employeeErpId,
              employeeCode: this.dataForEdit.employeeCode,
              contractReferenceId: this.dataForEdit.contractReferenceId,
              contractReferenceName: this.dataForEdit.contractReferenceName,
              supplierId: this.dataForEdit.supplierId,
              supplierName: this.dataForEdit.supplierName,
              // regionId: this.dataForEdit.regionId,
              // regionName: this.dataForEdit.regionName,
              supplierSerialNumber: this.dataForEdit.supplierSerialNumber,
              rentalContractType: this.dataForEdit.rentalContractType,
              isVehicleContract: this.dataForEdit.isVehicleContract
                ? true
                : false,
              // Uncomment if needed
              // maximumTravelling: this.dataForEdit.maximumTravelling,
              isActive: this.dataForEdit.isActive,
            });
            (this.showSerialNumber = this.dataForEdit.supplierSerialNumber),
              (this.displayModal = true);
          },
        });
    } else {
      if (!this.restrictionDto.isCreationAllowed) {
        this.msgService.add({
          severity: "info",
          summary: "Info",
          detail: "Creation Restricted",
        });
        return;
      }
      this.getDefaultLocation("Location", "locationName", "locationId", "");
      this.editMode = false;
      this.viewMode = false;
      this.rentalcontractform.enable();
      this.displayModal = true;
      this.rentalcontractform.reset();
      this.showSerialNumber = null;
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.rentalcontractform.get("issueDate")?.setValue(this.today);
      this.rentalcontractform.get("isActive").setValue(true);
      this.rentalcontractform.get("isVehicleContract").setValue(true);
      this.onContractTypeChange();
    }
  }

  save() {
    this.saving = true;
    if (!this.rentalcontractform.valid) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all Required fields",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    this._rentalService
      .create(this.rentalcontractform.value, this.target)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
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
      .subscribe({
        next: (response) => {
          debugger;
          this.msgService.add({
            severity: "success",
            summary: "Confirmed",
            detail: "SavedSuccessfully",
            life: 2000,
          });
          this.getAll();
          this.saving = false;
          this.displayModal = false;
        },
      });
  }

  update() {
    this.saving = true;
    const updateData = {
      ...this.rentalcontractform.value,
      id: this.dataForEdit.id,
    };
    this._rentalService
      .update(updateData, this.target)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
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
      .subscribe({
        next: (response) => {
          debugger;
          this.msgService.add({
            severity: "success",
            summary: "Confirmed",
            detail: "UpdatedSuccessfully",
            life: 2000,
          });
          this.getAll();
          this.saving = false;
          this.displayModal = false;
        },
      });
  }

  closeDocument(id: number) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._rentalService
          .CloseDocument(id, this.target)
          .pipe(
            finalize(() => {}),
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
          .subscribe({
            next: (response) => {
              debugger;
              if (response) {
                this.msgService.add({
                  severity: "info",
                  summary: "Confirmed",
                  detail: "Closed Successfully",
                  life: 2000,
                });
                this.getAll();
              }
            },
          });
      },
    });
  }
  isFieldInvalid(field: string): boolean {
    const control = this.rentalcontractform.get(field);
    return control ? control.invalid && control.touched : false;
  }
  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.rentalcontractform.value.issueDate = value;
    }
    if (
      this.rentalcontractform.value.userLocationId &&
      this.rentalcontractform.value.issueDate
    ) {
      this.GetDocMaxCount("RentalContract");
    }
  }
  MakeVoucher() {
    debugger;
    const isVehicleContract = this.rentalcontractform.value.isVehicleContract;
    const prefix = isVehicleContract ? "RVC-HNL" : "RHC-HNL";

    if (this.rentalcontractform.value.userLocationId && this.documentNumber) {
      const voucherNumber =
        prefix +
        "-" +
        this.rentalcontractform.value.userLocationId +
        "-" +
        this.rentalcontractform.value.issueDate.getFullYear() +
        "-" +
        (this.rentalcontractform.value.issueDate.getMonth() + 1) +
        "-" +
        this.documentNumber;

      this.rentalcontractform.get("voucherNumber").setValue(voucherNumber);
    } else {
      this.GetDocMaxCount("RentalContract");
    }
  }

  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._rentalService
      .getDefaultLocation(target, filterId)
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
      .subscribe({
        next: (response) => {
          debugger;
          this.rentalcontractform
            .get("userLocationName")
            .setValue(response.items[0].shortName);
          this.rentalcontractform
            .get("userLocationId")
            .setValue(response.items[0].id);
          this.GetDocMaxCount("RentalContract");
        },
      });
  }

  GetDocMaxCount(target: string) {
    debugger;
    if (
      this.rentalcontractform.value.userLocationId &&
      this.rentalcontractform.value.issueDate
    ) {
      this._rentalService
        .GetDocMaxCount(
          target,
          this.rentalcontractform.value.userLocationId,
          this.rentalcontractform.value.issueDate
        )
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
        .subscribe({
          next: (response) => {
            debugger;
            this.documentNumber = response;
            this.MakeVoucher();
          },
        });
    }
  }
  approve(id) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._rentalService
          .Approve(id, this.target)
          .pipe(
            finalize(() => {}),
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
          .subscribe({
            next: (response) => {
              debugger;
              if (response) {
                this.msgService.add({
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
  edit(id: number) {
    if (!this.restrictionDto.isEditAllowed) {
      this.msgService.add({
        severity: "info",
        summary: "Info",
        detail: "Edit Restricted",
      });
      return;
    }
    this.editMode = true;
    this.viewMode = false;
    this.show(id);
    this.rentalcontractform.enable();
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }
  viewOnly(id: number) {
    this.viewMode = true;
    this.editMode = false;
    this.show(id);
    this.rentalcontractform.disable();
    this.MinDate = null;
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }
  onContractTypeChange(): void {
    if (this.rentalcontractform.get("isVehicleContract")?.value) {
      this.subLedgerType = "16";
    } else {
      this.subLedgerType = "18";
    }
    if (this.rentalcontractform.get("isVehicleContract")?.value === false) {
      this.rentalcontractform.get("issueDate").reset();
      this.rentalcontractform.get("userLocationId").reset();
      this.rentalcontractform.get("userLocationName").reset();
      this.rentalcontractform.get("voucherNumber").reset();
    }
    this.MakeVoucher();
  }
  onPageChange(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * 5;
    this._rentalService
      .getAll(this.target, this.skipCount, this.maxCount)
      .subscribe({
        next: (response) => {
          debugger;

          this.tableData = response.items;
          this.count = response.totalCount;

          this.loading = false;
        },
      });
  }
  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    debugger;
    this.dto.DocOrVocNumber = inputValue;
    debugger;

    this._rentalService.getAllRecord(this.target, this.dto).subscribe({
      next: (response) => {
        debugger;

        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }
  VoucherRestriction(prefix: string) {
    this._restrictionService
      .getVoucherRestriction(prefix)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.msgService.add({
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
  onChange() {
    debugger;
    const periodFrom = this.rentalcontractform.get("startDate")?.value;
    const periodTo = this.rentalcontractform.get("endDate")?.value;
    if (periodFrom && periodTo) {
      const fromDate = new Date(periodFrom);
      const toDate = new Date(periodTo);
      if (fromDate > toDate) {
        this.msgService.add({
          severity: "error",
          summary: "Validation Error",
          detail: "Start Date cannot be later than End Date.",
        });
        this.rentalcontractform.get("endDate")?.setValue(periodFrom);
      }
    }
  }
}
