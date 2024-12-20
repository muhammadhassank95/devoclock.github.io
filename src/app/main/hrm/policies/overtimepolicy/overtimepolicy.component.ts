import { Component, OnInit, Injector } from "@angular/core";
import { OvertimepolicyDto } from "../../shared/DTOs/policies-dto";
import { PoliciesService } from "../../shared/services/policies.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";
import { Table } from "primeng/table";

@Component({
  selector: "app-overtimepolicy",
  templateUrl: "./overtimepolicy.component.html",
})
export class OvertimepolicyComponent
  extends AppComponentBase
  implements OnInit
{
  displayModal: boolean = false;
  data!: any;
  count: number;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 10;
  isEditMode: boolean;
  createMode: boolean;
  view: boolean;
  loading: boolean;
  saving: boolean = false;
  overtimepolicyDto: OvertimepolicyDto = new OvertimepolicyDto();
  today: Date = new Date();
  permissions: PermissionsDto;

  constructor(
    injector: Injector,
    private _policiesService: PoliciesService,
    private messageService: MessageService,
    private confirmationService?: ConfirmationService
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.permissions = new PermissionsDto("AutoOvertimePolicy");
    this.getAll();
  }

  openCreateModal() {
    this.overtimepolicyDto = new OvertimepolicyDto();
    this.overtimepolicyDto.issueDate = this.today;
    this.displayModal = true;
    this.getDefaultLocation("Location", "locationName", "locationId", "");
    this.createMode = true;
    this.isEditMode = true;
    this.view = false;
  }

  onClose() {
    debugger;
    this.displayModal = false;
  }

  getAll() {
    debugger;
    this._policiesService
      .getAll("AutoOvertimePolicy", this.skipCount, this.maxCount)
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
          this.overtimepolicyDto = new OvertimepolicyDto();
        },
      });
  }

  create() {
    debugger;
    this.saving = true;
    if (!this.createMode) {
      this._policiesService
        .Edit(this.overtimepolicyDto, "AutoOvertimePolicy")
        .pipe(
          finalize(() => {
            this.saving = false;
          }),
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
            this.getAll();
            this.saving = false;
            this.displayModal = false;
          },
        });
    } else {
      this._policiesService
        .create(this.overtimepolicyDto, "AutoOvertimePolicy")
        .pipe(
          finalize(() => {
            this.saving = false;
          }),
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
            this.getAll();
            this.saving = false;
            this.displayModal = false;
          },
        });
    }
  }

  delete(id: number) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._policiesService
          .delete(id, "AutoOvertimePolicy")
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
  approve(id) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._policiesService
          .approveDocument(id, "AutoOvertimePolicy")
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
  getDataForEdit(id: any) {
    debugger;
    if (id) {
      this._policiesService
        .getDataForEdit(id, "AutoOvertimePolicy")
        .pipe(
          finalize(() => {}),
          catchError((error) => {
            // this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 });
            return throwError(error.message);
          })
        )
        .subscribe({
          next: (response) => {
            console.log(response);
            debugger;
            this.overtimepolicyDto = response;
            this.overtimepolicyDto.issueDate = new Date(response.issueDate);
            this.overtimepolicyDto.willEffectFromDate = new Date(
              response.willEffectFromDate
            );
            this.displayModal = true;
          },
        });
    }
  }
  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        this.overtimepolicyDto.userLocationId = value.id;
        this.overtimepolicyDto.userLocationName = value.name;
        this.getVoucherNumber();
        break;
    }
  }
  onDialogClose() {
    this.confirmationService.confirm({
      message: "Are you sure you want to close without saving?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.displayModal = false;
      },
      reject: () => {
        this.displayModal = true;
      },
    });
  }
  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.overtimepolicyDto.issueDate = value;
    }
    if (
      this.overtimepolicyDto.userLocationId &&
      this.overtimepolicyDto.issueDate
    ) {
      this.getVoucherNumber();
    }
  }
  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._policiesService
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
          this.overtimepolicyDto.userLocationName = response.items[0].name;
          this.overtimepolicyDto.userLocationId = response.items[0].id;
          this.getVoucherNumber();
        },
      });
  }
  getVoucherNumber() {
    debugger;
    this._policiesService
      .getVoucherNumber(
        "AutoOvertimePolicy",
        "EOP",
        this.overtimepolicyDto.issueDate,
        this.overtimepolicyDto.userLocationId
      )
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          debugger;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Please Select Location Id to make correct voucher number",
            life: 2000,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger;
          this.overtimepolicyDto.voucherNumber = response;
        },
        error: (err) => {
          console.log("An error occurred", err);
        },
      });
  }
  edit(id: number) {
    this.isEditMode = true;
    this.createMode = false;
    this.view = false;
    this.getDataForEdit(id);
  }
  viewOnly(id?: number) {
    this.view = true;
    this.isEditMode = false;
    this.getDataForEdit(id);
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }
  onPageChange(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * this.maxCount;
    this._policiesService
      .getAll("AutoOvertimePolicy", this.skipCount, this.maxCount)
      .subscribe({
        next: (response) => {
          debugger;

          this.data = response.items;
          this.count = response.totalCount;

          this.loading = false;
        },
      });
  }
  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    this._policiesService
      .getAll("AutoOvertimePolicy", this.skipCount, this.maxCount, inputValue)
      .subscribe({
        next: (response) => {
          debugger;

          this.data = response.items;
          this.count = response.totalCount;

          this.loading = false;
        },
      });
  }
}
