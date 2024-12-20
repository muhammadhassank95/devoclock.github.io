import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrl: './dynamic-modal.component.css'
})
export class DynamicModalComponent {

  constructor(public ref: DynamicDialogRef,
    public messageService: MessageService,
    public confirmationService?: ConfirmationService,
  ) { }

  @ContentChild('view') view: any;

  @Input() visibility!: boolean;
  @Input() title!: string;

  @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  Confirm() {
    this.onConfirm.emit();
    this.ref.close();
  }

  Cancel() {
    this.onCancel.emit();
    this.ref.close();
  }
  onDialogClose() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to close without saving?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.visibility = false;
      },
      reject: () => {
        this.visibility = true;
      }
    });
  }
}
