import { Component, Injector, OnInit } from "@angular/core";
import { HoldSalaryService } from "../shared/services/hold-salary.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { HoldSalaryDto } from "../shared/DTOs/hold-salary-dto";
import { catchError, finalize, map, Observable, throwError } from "rxjs";
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";

@Component({
  selector: "app-hold-salary",
  templateUrl: "./hold-salary.component.html",
})
export class HoldSalaryComponent extends AppComponentBase implements OnInit {

  employeeDropdown: any[] = [];
  employeeSelectedItem: any;
  constructor(
    injector: Injector,
    private _holdSalaryService: HoldSalaryService,
    private messageService: MessageService,
    private _suggestionLookUpService: SuggestionLookupTableModaLService,
    private confirmationService?: ConfirmationService
  ) {
    super(injector);
  }
  permissions: PermissionsDto;
  holdSalaryDto: HoldSalaryDto = new HoldSalaryDto();
  data: any;
  count: number;
  saving: boolean;
  viewMode: boolean = false;
  editMode: boolean;
  dialogVisibility: boolean;

  ngOnInit(): void {
    this.permissions = new PermissionsDto("HoldSalary");
    this.getAll();
    this.fetchDropdownData('Employee').subscribe((items) => (this.employeeDropdown = items));
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
        this.holdSalaryDto.erpId = value.id;
        this.holdSalaryDto.employeeName = value.name;
        break;
      default:
        alert(`${type} is not defined`);
    }
  }

  getAll() {
    debugger;
    this._holdSalaryService
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

  // create() {
  //   this.confirmationService.confirm({
  //     message: "Are you sure?",
  //     header: "Confirmation",
  //     icon: "pi pi-exclamation-triangle",
  //     rejectButtonStyleClass: "p-button-text",
  //     accept: () => {
  //       this.saving = true;
  //       this._holdSalaryService
  //         .create(this.holdSalaryDto)
  //         .pipe(
  //           finalize(() => {
  //             this.saving = false;
  //           }),
  //           catchError((error) => {
  //             debugger;
  //             this.messageService.add({
  //               severity: "error",
  //               summary: "Error",
  //               detail: error.error.error.message,
  //               life: 2000,
  //             });
  //             return throwError(error.error.error.message);
  //           })
  //         )
  //         .subscribe({
  //           next: (response) => {
  //             if (response) {
  //               debugger;
  //               this.getAll();
  //               this.messageService.add({
  //                 severity: "info",
  //                 summary: "Confirmed",
  //                 detail: "CreatedSuccessfully",
  //                 life: 2000,
  //               });
  //               this.saving = false;
  //               this.dialogVisibility = false;
  //               this.holdSalaryDto = new HoldSalaryDto();
  //             }
  //           },
  //         });
  //     },
  //   });
  // }

  create() {
    this.saving = true;
    if (this.holdSalaryDto.id) {
      this._holdSalaryService
        .Update(this.holdSalaryDto)
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
              detail: "Updated Successfully",
              life: 2000,
            });
            this.getAll();
            this.saving = false;
            this.dialogVisibility = false;
          },
        });
    } else {
      this._holdSalaryService
        .create(this.holdSalaryDto)
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
                detail: "Created Successfully",
                life: 2000,
              });
              this.getAll();
              this.saving = false;
              this.dialogVisibility = false;
              this.holdSalaryDto = new HoldSalaryDto();
            }
          },
        });
    }
  }

  getDataForEdit(id: any) {
    this.editMode = true;
    this.viewMode = false;
    debugger;
    if (!id) {
      return;
    }
    this._holdSalaryService
      .getDataForEdit(id)
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
          this.holdSalaryDto = response;
          this.holdSalaryDto.employeeName = response.employeeName;
          this.holdSalaryDto.erpId = response.employeeErpId;
          this.holdSalaryDto.documentDate = new Date(response.documentDate);
          this.holdSalaryDto.salaryMonth = new Date(response.salaryMonth);

          this.dialogVisibility = true;
        },
      });
  }

  ViewOnly(id: any) {
    this.viewMode = true;
    this.editMode = false;
    debugger;
    if (!id) {
      return;
    }
    this._holdSalaryService
      .getDataForEdit(id)
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
          this.holdSalaryDto = response;
          this.holdSalaryDto.employeeName = response.employeeName;
          this.holdSalaryDto.erpId = response.employeeId;
          this.holdSalaryDto.documentDate = new Date(response.documentDate);
          this.holdSalaryDto.salaryMonth = new Date(response.salaryMonth);

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
        this._holdSalaryService
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
    this.holdSalaryDto = new HoldSalaryDto();
    this.dialogVisibility = true;
    this.editMode = false;
    this.viewMode = false;
  }

  setPickerValue(value: any, title: string) {
    switch (title) {
      case "Employee":
        this.holdSalaryDto.erpId = value.id;
        this.holdSalaryDto.employeeName = value.name;
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
