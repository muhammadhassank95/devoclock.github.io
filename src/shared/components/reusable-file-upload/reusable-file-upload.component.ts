import { Component, EventEmitter, Input, Output } from "@angular/core";
@Component({
  selector: "app-reusable-file-upload",

  templateUrl: "./reusable-file-upload.component.html",
  styleUrl: "./reusable-file-upload.component.css",
})
export class ReusableFileUploadComponent {
  @Input() headerText: string = "File Upload";
  @Input() visible: boolean = false;
  @Input() loading: boolean = false;
  @Input() multiple: boolean = true;
  @Input() loadingText: string = "Uploading...";

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() upload: EventEmitter<any> = new EventEmitter<any>();
  @Output() downloadTemplate: EventEmitter<void> = new EventEmitter<void>(); // New event for template download

  uploadFile(event: any) {
    this.upload.emit(event);
  }

  emitDownloadTemplate() {
    // Emit event for downloading the template
    this.downloadTemplate.emit();
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible); // Emit to parent that dialog is closed
  }
}
