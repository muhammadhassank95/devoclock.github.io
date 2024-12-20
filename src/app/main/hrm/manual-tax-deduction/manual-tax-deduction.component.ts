import { Component, OnInit, Injector } from "@angular/core";
import { ManualTaxDeduction } from "../shared/DTOs/manual-tax-deduction";
import { ManualTaxDeductionService } from "../shared/services/manual-tax-deduction.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
  selector: "app-manual-tax-deduction",
  templateUrl: "./manual-tax-deduction.component.html",
})
export class ManualTaxDeductionComponent
  extends AppComponentBase
  implements OnInit
{
  constructor(
    inject: Injector,
    private _manualTaxDeductionService: ManualTaxDeductionService,
    private messageService: MessageService,
    private confirmationService?: ConfirmationService
  ) {
    super(inject);
  }

  manualTaxDeductionDto: ManualTaxDeduction = new ManualTaxDeduction();
  data: any;
  count: number;
  saving: boolean;
  editMode: boolean;
  dialogVisibility: boolean;
  permissions: PermissionsDto;

  ngOnInit(): void {
    this.permissions = new PermissionsDto("TaxDeductionManual");
    this.getAll();
  }

  getAll() {
    debugger;
    this._manualTaxDeductionService
      .getAll()
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
          this.data = response.items;
          this.count = response.totalCount;
        },
      });
  }

  create() {
    this.saving = true;
    if (this.editMode) {
      this._manualTaxDeductionService
        .Edit(this.manualTaxDeductionDto, "TaxDeductionManual")
        .pipe(
          finalize(() => {
            this.saving = false;
          }),
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
              detail: "SavedSuccessfully",
              life: 2000,
            });
            this.getAll();
            this.saving = false;
            this.dialogVisibility = false;
          },
        });
    } else {
      this._manualTaxDeductionService
        .create(this.manualTaxDeductionDto)
        .pipe(
          finalize(() => {
            this.saving = false;
          }),
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
            if (response) {
              debugger;
              this.messageService.add({
                severity: "info",
                summary: "Confirmed",
                detail: "CreatedSuccessfully",
                life: 2000,
              });
              this.getAll();
              this.saving = false;
              this.dialogVisibility = false;
              this.manualTaxDeductionDto = new ManualTaxDeduction();
            }
          },
        });
    }
  }

  getDataForEdit(id: any) {
    this.editMode = true;
    debugger;
    if (!id) {
      return;
    }
    this._manualTaxDeductionService
      .getDataForEdit(id, "TaxDeductionManual")
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          // this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          debugger;
          this.manualTaxDeductionDto = response;
          this.manualTaxDeductionDto.employeeId = response.employeeId;
          this.manualTaxDeductionDto.employeeName = response.employeeName;
          this.dialogVisibility = true;
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
        this._manualTaxDeductionService
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

  openModal() {
    this.manualTaxDeductionDto = new ManualTaxDeduction();
    this.dialogVisibility = true;
    this.editMode = false;
  }

  setPickerValue(value: any, title: string) {
    switch (title) {
      case "Employee":
        this.manualTaxDeductionDto.employeeId = value.id;
        this.manualTaxDeductionDto.employeeName = value.name;
        this.manualTaxDeductionDto.employeeId = value.additional;

        break;
      default:
        alert(`${title} is not defined`);
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
}
