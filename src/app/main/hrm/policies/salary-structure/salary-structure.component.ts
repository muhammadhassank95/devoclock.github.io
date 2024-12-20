import { Component, OnInit, Injector } from "@angular/core";
import { SalaryStructureDto } from "../../shared/DTOs/policies-dto";
import { PoliciesService } from "../../shared/services/policies.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
  selector: "app-salary-structure",
  templateUrl: "./salary-structure.component.html",
})
export class SalaryStructureComponent
  extends AppComponentBase
  implements OnInit
{
  displayModal: boolean = false;
  data!: any;
  count: number = 0;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 10;
  isEditMode: boolean;
  isViewMode: boolean;
  saving: boolean = false;
  salaryStructureDto: SalaryStructureDto = new SalaryStructureDto();
  permissions: PermissionsDto;

  selectedOption: string = "";
  displayOption: string = "";

  onCalendarDateChange(option: string): void {
    if (option === "calendar") {
      this.selectedOption = "1";
    } else if (option === "dateRange") {
      this.selectedOption = "2";
    }
    this.salaryStructureDto.salaryGeneratingType = parseInt(
      this.selectedOption
    );
  }

  constructor(
    injector: Injector,
    private _policiesService: PoliciesService,
    private messageService: MessageService,
    private confirmationService?: ConfirmationService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.permissions = new PermissionsDto("SalaryStructurePolicy");
    this.getAll();
    this.onClose();
  }

  openCreateModal() {
    this.salaryStructureDto = new SalaryStructureDto();
    this.displayModal = true;
    this.salaryStructureDto.isActive = true;
  }

  onClose() {
    debugger;
    this.displayModal = false;
  }

  getAll() {
    debugger;
    this._policiesService
      .getAll("SalaryStructurePolicy")
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
          this.salaryStructureDto = new SalaryStructureDto();
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
        this._policiesService
          .delete(id, "SalaryStructurePolicy")
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

  getDataForEdit(id: any) {
    this.isEditMode = true;

    debugger;
    if (!id) {
      return;
    }
    this._policiesService
      .get(id, "SalaryStructurePolicy")
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
          this.salaryStructureDto = response;
          this.salaryStructureDto.days = response.days;
          this.salaryStructureDto.salaryGeneratingType =
            response.salaryGeneratingType;
          this.displayOption = response.salaryGeneratingType === 1 ? "1" : "2";
          this.displayModal = true;
        },
      });
  }

  create() {
    debugger;
    this.saving = true;
    if (this.isEditMode) {
      this._policiesService
        .Edit(this.salaryStructureDto, "SalaryStructurePolicy")
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
        .create(this.salaryStructureDto, "SalaryStructurePolicy")
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
}
