import { Component } from "@angular/core";
import { IntegrationModuleService } from "../integration-module.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { catchError, finalize, throwError } from "rxjs";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-general-ledger",
  templateUrl: "./defaults.component.html",
})
export class DefaultsComponent {
  target: string = "Default";
  tableData: any[] = [];
  glFormGroup: FormGroup;
  loading: boolean = false;
  isGLModalVisible: boolean = false;

  constructor(
    private integrationService: IntegrationModuleService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.glFormGroup = new FormGroup({
      chartOfAccountId: new FormControl(null),
      chartOfAccountName: new FormControl(""),
      id: new FormControl(0, Validators.required),
      name: new FormControl("", Validators.required),
      remarks: new FormControl(""),
    });
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.integrationService
      .getAll(this.target)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
          });
          return throwError(
            () =>
              new Error(
                error.error.error.message || "An unknown error occurred"
              )
          );
        })
      )
      .subscribe((response) => {
        this.tableData = response.items;
      });
  }

  getForEdit(id: number, viewOnly?: boolean): void {
    if (viewOnly) {
      this.glFormGroup.disable();
    } else {
      this.glFormGroup.enable();
    }
    this.isGLModalVisible = true;
    this.integrationService
      .getDataForEdit(id, this.target)
      .pipe(
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
          });
          return throwError(
            () =>
              new Error(
                error.error.error.message || "An unknown error occurred"
              )
          );
        })
      )
      .subscribe((result) => {
        console.log({ result });
        this.glFormGroup.patchValue(result);
      });
  }

  save() {
    this.loading = true;
    if (this.glFormGroup.value.id > 0) {
      this.integrationService
        .update(this.glFormGroup.value, this.target)
        .pipe(
          catchError((error) => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: error.error.error.message,
            });
            return throwError(
              () =>
                new Error(
                  error.error.error.message || "An unknown error occurred"
                )
            );
          }),
          finalize(() => (this.loading = false))
        )
        .subscribe((_) => {
          this.isGLModalVisible = false;
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Updated Successfully",
          });
          this.getAll();
        });
    } else {
      this.integrationService
        .create(this.glFormGroup.value, this.target)
        .pipe(
          catchError((error) => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: error.error.error.message,
            });
            return throwError(
              () =>
                new Error(
                  error.error.error.message || "An unknown error occurred"
                )
            );
          }),
          finalize(() => (this.loading = false))
        )
        .subscribe((_) => {
          this.isGLModalVisible = false;
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Created Successfully",
          });
          this.getAll();
        });
    }
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.loading = true
        this.integrationService
          .delete(id, this.target)
          .pipe(
            finalize(() => {this.loading = false}),
            catchError((error) => {
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: error.error.error.message,
              });
              return throwError(
                () =>
                  new Error(
                    error.error.error.message || "An unknown error occurred"
                  )
              );
            })
          )
          .subscribe({
            next: (response) => {
              if (response) {
                this.messageService.add({
                  severity: "info",
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

  handleCreateDefault() {
    let glFormPatchValues = {
      chartOfAccountId: null,
      chartOfAccountName: "",
      id: 0,
      name: "",
      remarks: "",
    };
    this.glFormGroup.reset();
    this.glFormGroup.patchValue(glFormPatchValues);
    this.isGLModalVisible = true;
  }

  setPickerValue(value: any, title: string, title2: string = "") {
    switch (title) {
      case "ChartOfAccount":
        console.log(title, value);
        this.glFormGroup.patchValue({
          chartOfAccountName: value.name,
          chartOfAccountId: +value.id?.split("/")[0] || 0,
        });
        // this.MakeVoucher();
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
}
