import { Component } from "@angular/core";
import { IntegrationModuleService } from "../integration-module.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { catchError, finalize, map, Observable, throwError } from "rxjs";
import { ConfirmationService, MessageService } from "primeng/api";
import { Table } from "primeng/table";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";
import { ChartOfAccount } from "@app/main/budget/shared/Dtos/chart-of-account";

@Component({
  selector: "app-general-ledger",
  templateUrl: "./defaults.component.html",
})
export class DefaultsComponent {
  target: string = "DefaultIntegrations";
  tableData: any[] = [];
  count: number;
  glFormGroup: FormGroup;
  loading: boolean = false;
  isGLModalVisible: boolean = false;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 10;
  chartOfAccountDropdown: any[] = [];
  chartOfAccountSelectedItem: any;

  constructor(
    private integrationService: IntegrationModuleService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _suggestionLookUpService: SuggestionLookupTableModaLService
  ) {
    this.glFormGroup = new FormGroup({
      chartOfAccount: new FormControl({}, Validators.required),
      id: new FormControl(0, Validators.required),
      name: new FormControl("", Validators.required),
      remarks: new FormControl(""),
    });
  }

  ngOnInit() {
    this.getAll(this.skipCount, this.maxCount);
    this.fetchDropdownData('ChartOfAccount').subscribe((items) => (this.chartOfAccountDropdown = items));
  }

  fetchDropdownData(target: string, limit: number = 100, offset: number = 0): Observable<any[]> {
    return this._suggestionLookUpService.getAll(offset, limit, '', target, '').pipe(
      map((response: any) => {
        if (response && response.items) {
          return response.items.map((item: any) => ({
            id: +item.id?.split("/")[0] || 0,
            name: item.name,
          }));
        } else {
          console.error(`Invalid response format for ${target}: `, response);
          return [];
        }
      })
    );
  }

  onDropdownChange(event: any){
    const selectedItem = event.value;
    if(selectedItem){
      console.log(selectedItem);
      this.glFormGroup.patchValue({
        chartOfAccountName: selectedItem.name,
        chartOfAccountId: selectedItem.id,
      });
    }
  }

  getAll(skipCount: number, maxCount: number) {
    this.integrationService
      .getAll(this.target, skipCount, maxCount)
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
        this.count = response.totalCount;
        this.loading = false;
      });
  }

  getForEdit(id: number, viewOnly?: boolean): void {
    this.glFormGroup.reset();
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
        let obj = {
          id: result.chartOfAccountId,
          name: result.chartOfAccountName,
        }
        this.glFormGroup.patchValue({
          ...result,
          chartOfAccount: obj
        });
      });
  }

  save() {
    this.loading = true;
    let obj = {
      ...this.glFormGroup.value,
      chartOfAccountId : this.glFormGroup.value.chartOfAccount.id,
      chartOfAccountName: this.glFormGroup.value.chartOfAccount.name,
    }
    if (this.glFormGroup.value.id > 0) {
      this.integrationService
        .update(obj, this.target)
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
          this.getAll(this.skipCount, this.maxCount);
        });
    } else {
      this.integrationService
        .create(obj, this.target)
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
          this.getAll(this.skipCount, this.maxCount);
        });
    }
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete this?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.loading = true;
        this.integrationService
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
                this.getAll(this.skipCount, this.maxCount);
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
    debugger;
    switch (title) {
      case "ChartOfAccount":
        console.log(title, value);
        this.glFormGroup.patchValue({
          chartOfAccountName: value.name,
          chartOfAccountId: value.id?.split("/")[0] || 0,
          chartOfAccountSerialNumber: value.id?.split("/")[1] || 0,
        });
        // this.MakeVoucher();
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  onPageChange(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.skipCount = (this.currentPage - 1) * 10;
    this.loading = true;
    this.getAll(this.skipCount, this.maxCount);
  }
}
