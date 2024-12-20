import { Component } from "@angular/core";
import { MessageService, ConfirmationService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BudgetService } from "../shared/services/budget.service";
import * as Papa from "papaparse";
import { Table } from "primeng/table";
@Component({
  selector: "app-voucher-restriction",
  templateUrl: "./voucher-restriction.component.html",
})
export class VoucherRestrictionComponent {
  editMode: boolean;
  displayModal: boolean;
  target: string = "VoucherRestriction";
  tableData: any;
  count: number;
  currentPage: number = 1;
  saving: boolean;
  loading: boolean;
  showSupplierDetails = false;
  dataForEdit: any;
  employeeErpId: number;
  dto = {
    name: "",
    maxCount: 10,
    skipCount: 0,
  };
  rentalhouseform: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _voucherRestriction: BudgetService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.rentalhouseform = this.fb.group({
      // isActive: [""],
      name: ["", [Validators.required]],
      voucherPrefix: ["", [Validators.required]],
      creationRestrictionDate: ["", Validators.required],
      editRestrictionDate: ["", Validators.required],
      approvalRestrictionDate: ["", Validators.required],
      unapprovalRestrictionDate: ["", Validators.required],
      revisionRestrictionDate: ["", [Validators.required]],
      isCreationAllowed: ["", [Validators.required]],
      isEditAllowed: [""],
      isApprovalAllowed: ["", [Validators.required]],
      isUnapprovalAllowed: [""],
      isRevisionAllowed: [""],
    });
  }
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    debugger;
    this._voucherRestriction
      .getAllRecord(this.target, this.dto)
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
      this.editMode = true;
      this._voucherRestriction
        .getData(id, this.target)
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
            this.dataForEdit = response;
            this.rentalhouseform.get("name")?.setValue(this.dataForEdit.name);
            this.rentalhouseform
              .get("voucherPrefix")
              ?.setValue(this.dataForEdit.voucherPrefix);
            this.rentalhouseform
              .get("creationRestrictionDate")
              ?.setValue(new Date(this.dataForEdit.creationRestrictionDate));
            this.rentalhouseform
              .get("editRestrictionDate")
              ?.setValue(new Date(this.dataForEdit.editRestrictionDate));
            this.rentalhouseform
              .get("approvalRestrictionDate")
              ?.setValue(new Date(this.dataForEdit.approvalRestrictionDate));
            this.rentalhouseform
              .get("unapprovalRestrictionDate")
              ?.setValue(new Date(this.dataForEdit.unapprovalRestrictionDate));
            this.rentalhouseform
              .get("revisionRestrictionDate")
              ?.setValue(new Date(this.dataForEdit.revisionRestrictionDate));
            this.rentalhouseform
              .get("isCreationAllowed")
              ?.setValue(this.dataForEdit.isCreationAllowed);
            this.rentalhouseform
              .get("isEditAllowed")
              ?.setValue(this.dataForEdit.isEditAllowed);
            this.rentalhouseform
              .get("isApprovalAllowed")
              ?.setValue(this.dataForEdit.isApprovalAllowed);
            this.rentalhouseform
              .get("isUnapprovalAllowed")
              ?.setValue(this.dataForEdit.isUnapprovalAllowed);
            this.rentalhouseform
              .get("isRevisionAllowed")
              ?.setValue(this.dataForEdit.isRevisionAllowed);
            // this.rentalhouseform
            //   .get("isActive")
            //   ?.setValue(this.dataForEdit.isActive);
            this.displayModal = true;
          },
        });
    } else {
      this.editMode = false;
      this.displayModal = true;
      this.rentalhouseform.reset();
      this.rentalhouseform.get("isCreationAllowed").setValue(true);
      this.rentalhouseform.get("isEditAllowed").setValue(true);
      this.rentalhouseform.get("isApprovalAllowed").setValue(true);
      this.rentalhouseform.get("isUnapprovalAllowed").setValue(true);
      this.rentalhouseform.get("isRevisionAllowed").setValue(true);
      this.rentalhouseform
        .get("isCreationAllowed")
        ?.valueChanges.subscribe((isCreationAllowed) => {
          if (isCreationAllowed) {
            this.rentalhouseform.get("creationRestrictionDate")?.enable();
          } else {
            this.rentalhouseform.get("creationRestrictionDate")?.disable();
            this.rentalhouseform.get("creationRestrictionDate")?.setValue(null);
          }
        });
      this.rentalhouseform
        .get("isEditAllowed")
        ?.valueChanges.subscribe((isEditAllowed) => {
          if (isEditAllowed) {
            this.rentalhouseform.get("editRestrictionDate")?.enable();
          } else {
            this.rentalhouseform.get("editRestrictionDate")?.disable();
            this.rentalhouseform.get("editRestrictionDate")?.setValue(null);
          }
        });

      this.rentalhouseform
        .get("isApprovalAllowed")
        ?.valueChanges.subscribe((isApprovalAllowed) => {
          if (isApprovalAllowed) {
            this.rentalhouseform.get("approvalRestrictionDate")?.enable();
          } else {
            this.rentalhouseform.get("approvalRestrictionDate")?.disable();
            this.rentalhouseform.get("approvalRestrictionDate")?.setValue(null);
          }
        });

      this.rentalhouseform
        .get("isUnapprovalAllowed")
        ?.valueChanges.subscribe((isUnapprovalAllowed) => {
          if (isUnapprovalAllowed) {
            this.rentalhouseform.get("unapprovalRestrictionDate")?.enable();
          } else {
            this.rentalhouseform.get("unapprovalRestrictionDate")?.disable();
            this.rentalhouseform
              .get("unapprovalRestrictionDate")
              ?.setValue(null);
          }
        });

      this.rentalhouseform
        .get("isRevisionAllowed")
        ?.valueChanges.subscribe((isRevisionAllowed) => {
          if (isRevisionAllowed) {
            this.rentalhouseform.get("revisionRestrictionDate")?.enable();
          } else {
            this.rentalhouseform.get("revisionRestrictionDate")?.disable();
            this.rentalhouseform.get("revisionRestrictionDate")?.setValue(null);
          }
        });
    }
  }

  save() {
    debugger;
    this.saving = true;
    if (!this.rentalhouseform.valid) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all Required fields",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    this._voucherRestriction
      .create(this.rentalhouseform.value, this.target)
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
      ...this.rentalhouseform.value,
      id: this.dataForEdit.id,
    };
    this._voucherRestriction
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

  delete(id: number) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._voucherRestriction
          .delete(id, this.target)
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

  isFieldInvalid(field: string): boolean {
    const control = this.rentalhouseform.get(field);
    return control ? control.invalid && control.touched : false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  setPickerValue(value: any, title: string, title2: string = "") {
    switch (title) {
      case "Location":
        debugger;
        this.rentalhouseform.patchValue({
          locationId: value?.id,
          loacationName: value.name,
        });
        break;
      case "Region":
        debugger;
        this.rentalhouseform.patchValue({
          regionId: value?.id,
          regionName: value.name,
        });
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  onPageChange(event: any) {
    debugger;
    this.dto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.dto.skipCount = (this.currentPage - 1) * this.dto.maxCount;
    this._voucherRestriction.getAllRecord(this.target, this.dto).subscribe({
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
    this.dto.name = inputValue;
    debugger;

    this._voucherRestriction.getAllRecord(this.target, this.dto).subscribe({
      next: (response) => {
        debugger;

        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }
}
