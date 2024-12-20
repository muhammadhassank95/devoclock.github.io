import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from "@angular/core";
import { CategoryId } from "../../Shared/DTOs/category-id";
import { SetupsService } from "../../Shared/Services/inventory-setup.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { Table } from "@node_modules/primeng/table";

@Component({
  selector: "app-category-id",
  templateUrl: "./category-id.component.html",
})
export class CategoryIdComponent {
  categoryIdDto: CategoryId = new CategoryId();
  @ViewChild("searchInput") searchInput!: ElementRef;

  tableData: any;
  count: number;
  displayModal: boolean;
  editMode: boolean;
  saving: boolean;
  loading: boolean;
  currentPage: number = 1;
  target = "ItemCategory";
  filterDto = {
    skipCount: 0,
    maxCount: 5,
    itemType: "",
    name: "",
  };
  totalCount: number = 0;
  @Input() type;

  constructor(
    private _basicTypeService: SetupsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getAll();
  }
  @HostListener("window:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Shortcut: Ctrl + F
    if (event.ctrlKey && event.key === "f") {
      event.preventDefault(); // Prevent default browser search
      this.focusSearchInput();
    }
  }
  focusSearchInput() {
    this.searchInput.nativeElement.focus();
  }
  getAll() {
    this.filterDto.itemType = this.type;

    this._basicTypeService
      .getAll(this.target, this.filterDto)
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
          this.tableData = response.items;
          this.count = response.totalCount;
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
        this._basicTypeService
          .delete(id, this.target)
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

  show(id?: number) {
    if (id) {
      this.editMode = true;
      this._basicTypeService
        .getData(id, this.target)
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
            this.categoryIdDto = response;
            this.displayModal = true;
          },
        });
    } else {
      this.editMode = false;
      this.displayModal = true;
      this.categoryIdDto = new CategoryId();
      this.categoryIdDto.isActive = true;
    }
  }

  save() {
    this.saving = true;
    if (!this.categoryIdDto.name) {
      this.messageService.add({
        severity: "error",
        detail: "Name is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.categoryIdDto.cat_serialNumber) {
      this.messageService.add({
        severity: "error",
        detail: "Serial Number is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    this.categoryIdDto.itemType = this.type;
    this._basicTypeService
      .create(this.categoryIdDto, this.target)
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
            detail: "SavedSuccessfully",
            life: 2000,
          });
          this.getAll();
          this.saving = false;
          this.displayModal = false;
        },
      });
  }

  update() {
    this.saving = true;

    this._basicTypeService
      .update(this.categoryIdDto, this.target)
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
            detail: "UpdatedSuccessfully",
            life: 2000,
          });
          this.getAll();
          this.saving = false;
          this.displayModal = false;
        },
      });
  }
  onPageChange(event: any) {
    debugger;
    this.filterDto.itemType = this.type;
    this.filterDto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.filterDto.skipCount = (this.currentPage - 1) * 5;
    this._basicTypeService.getAll(this.target, this.filterDto).subscribe({
      next: (response) => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }
  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    this.filterDto.name = inputValue;
    this._basicTypeService.getAll(this.target, this.filterDto).subscribe({
      next: (response) => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }
}
