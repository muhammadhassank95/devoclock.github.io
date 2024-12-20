import { Component } from '@angular/core';
import { GauzatedHolidayDto } from '../shared/DTOs/gauzated-holiday-dto'
import { GauzatedHolidayService } from '../shared/services/gauzated-holiday.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, finalize, throwError } from 'rxjs';

@Component({
  selector: 'app-gauzated-holiday',
  templateUrl: './gauzated-holiday.component.html',
})
export class GauzatedHolidayComponent {


  constructor(
    private _gauzatedHolidayService: GauzatedHolidayService,
    private messageService: MessageService,
    private confirmationService?: ConfirmationService,
  ) {
  }

  gauzatedHolidayDto: GauzatedHolidayDto = new GauzatedHolidayDto();
  data: any
  count: number
  saving: boolean
  editMode: boolean
  dialogVisibility: boolean

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    debugger
    this._gauzatedHolidayService.getAll()
      .pipe(
        finalize(() => { }),
        catchError(error => {
          debugger
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message, life: 2000 });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger
          this.data = response.items;
          this.count = response.totalCount;
        }
      });
  }

  create() {
    this.confirmationService.confirm({
      message: 'Are you sure?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.saving = true
        this._gauzatedHolidayService.create(this.gauzatedHolidayDto)
          .pipe(
            finalize(() => { this.saving = false }),
            catchError(error => {
              debugger
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message, life: 2000 });
              return throwError(error.error.error.message);
            })
          )
          .subscribe({
            next: (response) => {
              if (response) {
                debugger
                this.getAll();
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'CreatedSuccessfully', life: 2000 });
                this.saving = false
                this.dialogVisibility = false
                this.gauzatedHolidayDto = new GauzatedHolidayDto()
              }
            }
          });
      },
    });
  }


  delete(id: number) {
    debugger
    this.confirmationService.confirm({
      message: 'Are you sure?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._gauzatedHolidayService.delete(id)
          .pipe(
            finalize(() => { }),
            catchError(error => {
              debugger
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message, life: 2000 });
              return throwError(error.error.error.message);
            })
          )
          .subscribe({
            next: (response) => {
              debugger
              if (response) {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Deleted Successfully', life: 2000 });
                this.getAll();
              }
            }
          });


      }
    });
  }

  openModal() {
    this.gauzatedHolidayDto = new GauzatedHolidayDto()
    this.dialogVisibility = true
  }


  setPickerValue(value: any, title: string) {
    switch (title) {
      case "Religion":
        this.gauzatedHolidayDto.religionId = value.id;
        this.gauzatedHolidayDto.religionName = value.name;
        break;
      default:
        alert(`${title} is not defined`)
    }
  }
  onDialogClose() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to close without saving?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.dialogVisibility = false;
        },
        reject: () => {
            this.dialogVisibility = true;
        }
    });
}
}
