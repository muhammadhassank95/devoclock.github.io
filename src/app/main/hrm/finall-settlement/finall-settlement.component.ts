import { Component,Injector,OnInit } from '@angular/core';
import { FinalSettlementDto } from '../shared/DTOs/final-settlement-dto';
import { FinalSettlementService } from '../shared/services/final-settlement.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, finalize, throwError } from 'rxjs';
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
    selector: 'app-finall-settlement',
    templateUrl: './finall-settlement.component.html',

})
export class FinallSettlementComponent extends AppComponentBase implements OnInit {

    saving: boolean = false;
    displayModal: boolean = false;
    finalSettlementDto: FinalSettlementDto = new FinalSettlementDto();
    tableData: any;
    generating: boolean;
    editMode: boolean;
    viewMode: boolean;
    currentPage: number = 1;
    skipCount: number = 0;
    maxCount: number = 10;
    count: number;
    constructor(
        injector:Injector,
        private _finalSettlementService: FinalSettlementService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) {
        super(injector)
     }
     permissions: PermissionsDto;

    ngOnInit() {
        this.permissions = new PermissionsDto("FinalSettlement");
        this.getAll()
    }

    getAll(
        skipCount: number = this.skipCount,
        maxCount: number = this.maxCount) {
        debugger
        this._finalSettlementService.getAll(skipCount, maxCount)
            .pipe(
                finalize(() => { }),
                catchError(error => {
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



    Generate() {
        debugger
        this.generating = true;
        if (!this.finalSettlementDto.employeeId || !this.finalSettlementDto.documentDate) {
            this.generating = false;
            return
        }
        this._finalSettlementService.generate(this.finalSettlementDto.employeeId, this.finalSettlementDto.documentDate)
            .pipe(
                finalize(() => { this.generating = false }),
                catchError(error => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message, life: 2000 });
                    return throwError(error.error.error.message);
                })
            )
            .subscribe({
                next: (responce: any) => {
                    debugger
                    this.generating = false;
                    this.finalSettlementDto = responce.result;
                    // this.finalSettlementDto.resignationDate = new Date(responce.resignationDate)
                    // this.finalSettlementDto.releaseDate = new Date(responce.releaseDate)
                }
            });
    }

    openCreateModal() {
        this.displayModal = true;
        this.finalSettlementDto = new FinalSettlementDto()
    }

    create() {
        this.saving = true;

        if (!this.finalSettlementDto.employeeId) {
            this.messageService.add({
                severity: "error",
                detail: 'Employee Id is Required',
                life: 2000,
            });
            this.saving = false;
            return;
        }

        if (!this.finalSettlementDto.drawnOn) {
            this.messageService.add({
                severity: "error",
                detail: 'Narration is Required',
                life: 2000,
            });
            this.saving = false;
            return;
        }

        if (!this.finalSettlementDto.chequeNumber) {
            this.messageService.add({
                severity: "error",
                detail: 'Cheque Number is Required',
                life: 2000,
            });
            this.saving = false;
            return;
        }

        if (!this.finalSettlementDto.chequeDate) {
            this.messageService.add({
                severity: "error",
                detail: 'Cheque Date is Required',
                life: 2000,
            });
            this.saving = false;
            return;
        }


        this.confirmationService.confirm({
            message: 'Are you sure?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonStyleClass: "p-button-text",
            accept: () => {
                this.saving = true
                this._finalSettlementService.save(this.finalSettlementDto)
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
                                this.displayModal = false
                                this.finalSettlementDto = new FinalSettlementDto()
                            }
                        }
                    });
            },
        });
    }

    onClose() {
        this.displayModal = false;
    }

    show(id: number) {
        debugger;
        if (id) {
            this.editMode = true
            this._finalSettlementService.getDataForEdit(id)
                .pipe(
                    finalize(() => { }),
                    catchError(error => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 });
                        return throwError(error.message);
                    })
                )
                .subscribe({
                    next: (response) => {
                        console.log(response)
                        debugger
                        this.finalSettlementDto = response;
                        this.displayModal = true
                    }
                });
        }
        else {
            this.displayModal = true
            this.editMode = false
            this.finalSettlementDto = new FinalSettlementDto();
            // // this.finalSettlementDto.employeeId = null;
            // // this.finalSettlementDto.employeeName = null;
        }
    }

    showForView(id: number) {
        debugger;
        if (id) {
            this.viewMode = true
            this._finalSettlementService.getDataForEdit(id)
                .pipe(
                    finalize(() => { }),
                    catchError(error => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 });
                        return throwError(error.message);
                    })
                )
                .subscribe({
                    next: (response) => {
                        console.log(response)
                        debugger
                        this.finalSettlementDto = response;
                        this.displayModal = true
                    }
                });
        }
        else {
            this.displayModal = true
            this.viewMode = false
            this.finalSettlementDto = new FinalSettlementDto();
            // // this.finalSettlementDto.employeeId = null;
            // // this.finalSettlementDto.employeeName = null;
        }
    }


    setPickerValue(value: any, title: string) {
        debugger;
        switch (title) {
            case "ResignedEmployees":
                this.finalSettlementDto.employeeId = value.additional;
                this.finalSettlementDto.employeeName = value.name;
                break;
            default:
                alert(`${title} is not defined`);
        }
    }
    onDialogClose() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to close without saving?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.displayModal = false;
            },
            reject: () => {
                this.displayModal = true;
            }
        });
    }
}
