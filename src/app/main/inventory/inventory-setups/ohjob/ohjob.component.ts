import { Component } from '@angular/core';
import { BasicTypeDto } from '../../Shared/DTOs/basic-type';
import { SetupsService } from '../../Shared/Services/inventory-setup.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, finalize, throwError } from 'rxjs';

@Component({
  selector: 'app-ohjob',
  templateUrl: './ohjob.component.html',
})
export class OHJobComponent {

  ohjobDto: BasicTypeDto = new BasicTypeDto()

  tableData: any;
  count: number;
  displayModal: boolean;
  editMode: boolean;
  saving: boolean;
  target = "OHJob";

  constructor(
    private _ohjobService: SetupsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.getAll()
  }

  getAll() {
    this._ohjobService.getAll(this.target)
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
          this.tableData = response.items;
          this.count = response.totalCount;
        }
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
        this._ohjobService.delete(id, this.target)
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

  show(id?: number) {
    if (id) {
      this.editMode = true
      this._ohjobService.getData(id, this.target)
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
            this.ohjobDto = response;
            this.displayModal = true;
          }
        });
    } else {
      this.editMode = false
      this.displayModal = true;
      this.ohjobDto = new BasicTypeDto();
      this.ohjobDto.isActive = true;
    }

  }

  save() {
    this.saving = true

    this._ohjobService.create(this.ohjobDto, this.target)
      .pipe(
        finalize(() => { this.saving = false; }),
        catchError(error => {
          debugger
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 });
          return throwError(error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'SavedSuccessfully', life: 2000 });
          this.getAll()
          this.saving = false;
          this.displayModal = false
        }
      });
  }


  update() {
    this.saving = true

    this._ohjobService.update(this.ohjobDto, this.target)
      .pipe(
        finalize(() => { this.saving = false; }),
        catchError(error => {
          debugger
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 });
          return throwError(error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'UpdatedSuccessfully', life: 2000 });
          this.getAll()
          this.saving = false;
          this.displayModal = false
        }
      });
  }

}