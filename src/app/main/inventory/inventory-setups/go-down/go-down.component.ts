import { Component } from '@angular/core';
import { GoDown } from '../../Shared/DTOs/go-down'
import { SetupsService } from '../../Shared/Services/inventory-setup.service'
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, finalize, throwError } from 'rxjs';

@Component({
  selector: 'app-go-down',
  templateUrl: './go-down.component.html',
})
export class GoDownComponent {

  goDownDto: GoDown = new GoDown()

  tableData: any;
  count: number;
  displayModal: boolean;
  editMode: boolean;
  saving: boolean;
  target = "GoDown";

  constructor(
    private _basicTypeService: SetupsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
  }

  ngOnInit() {
    this.getAll()
  }

  getAll() {
    this._basicTypeService.getAll(this.target)
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
        this._basicTypeService.delete(id, this.target)
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
      this._basicTypeService.getData(id, this.target)
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
            this.goDownDto = response;
            this.displayModal = true;
          }
        });
    } else {
      this.editMode = false
      this.displayModal = true;
      this.goDownDto = new GoDown();
      this.goDownDto.isActive = true;
    }

  }

  save() {
    this.saving = true

    this._basicTypeService.create(this.goDownDto, this.target)
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

    this._basicTypeService.update(this.goDownDto, this.target)
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