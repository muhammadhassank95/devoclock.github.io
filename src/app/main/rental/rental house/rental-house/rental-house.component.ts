import { Component } from "@angular/core";
import { MessageService, ConfirmationService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RentalService } from "../../shared/services/rental.service";
import * as Papa from "papaparse";
import { Table } from "primeng/table";
@Component({
  selector: "app-rental-house",
  templateUrl: "./rental-house.component.html",
})
export class RentalHouseComponent {
  editMode: boolean;
  displayModal: boolean;
  target: string = "House";
  tableData: any;
  count: number;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 5;
  saving: boolean;
  loading: boolean;
  showSupplierDetails = false;
  dataForEdit: any;
  employeeErpId: number;
  dto = {
    name: "",
  };
  rentalhouseform: FormGroup;

  coveredAreaOptions = [
    { label: "1 Marla", value: "1 Marla" },
    { label: "2 Marla", value: "2 Marla" },
    { label: "2.5 Marla", value: "2.5 Marla" },
    { label: "3 Marla", value: "3 Marla" },
    { label: "5 Marla", value: "5 Marla" },
    { label: "1 Kanal", value: "1 Kanal" },
    { label: "2 Kanal", value: "2 Kanal" },
  ];

  houseTypeOptions = [
    { label: "Single Story", value: "Single Story" },
    { label: "Double Story", value: "Double Story" },
    { label: "Triple Story", value: "Triple Story" },
    { label: "Flat", value: "Flat" },
    { label: "Portion", value: "Portion" },
    { label: "Hall", value: "Hall" },
  ];

  constructor(
    private fb: FormBuilder,
    private _rentalService: RentalService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.rentalhouseform = this.fb.group({
      isActive: [""],
      name: ["", [Validators.required]],
      fullAddress: ["", Validators.required],
      occupiedStatus: ["", Validators.required],
      totalCoveredArea: ["", Validators.required],
      houseType: ["", Validators.required],
      description: ["", [Validators.required]],
      locationId: ["", [Validators.required]],
      locationName: [""],
      // regionId: ["", [Validators.required]],
      // regionName: [""],
      isElectricityIncluded: [""],
      isGasIncluded: [""],
      isMaintenanceIncluded: [""],
      isWaterIncluded: [""],
      isAdminOnly: [false],
    });
  }
  ngOnInit(): void {
    this.getAll();
  }

  getAll(skipCount: number = this.skipCount, maxCount: number = this.maxCount) {
    this._rentalService
      .getAll(this.target)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          debugger;
          this.msgService.add({
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

  show(id?: number) {
    if (id) {
      this.editMode = true;
      this._rentalService
        .getDataForEdit(id, this.target)
        .pipe(
          finalize(() => {}),
          catchError((error) => {
            debugger;
            this.msgService.add({
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
            this.dataForEdit = response;
            this.rentalhouseform.get("name").setValue(this.dataForEdit.name);
            this.rentalhouseform
              .get("locationId")
              .setValue(this.dataForEdit.locationId);
            this.rentalhouseform
              .get("locationName")
              .setValue(this.dataForEdit.locationName);
            // this.rentalhouseform
            //   .get("regionId")
            //   .setValue(this.dataForEdit.regionId);
            // this.rentalhouseform
            //   .get("regionName")
            //   .setValue(this.dataForEdit.regionName);
            this.rentalhouseform
              .get("fullAddress")
              .setValue(this.dataForEdit.fullAddress);
            this.rentalhouseform
              .get("occupiedStatus")
              .setValue(this.dataForEdit.occupiedStatus);
            this.rentalhouseform
              .get("totalCoveredArea")
              .setValue(this.dataForEdit.totalCoveredArea);
            this.rentalhouseform
              .get("houseType")
              .setValue(this.dataForEdit.houseType);
            this.rentalhouseform
              .get("isElectricityIncluded")
              .setValue(this.dataForEdit.isElectricityIncluded);
            this.rentalhouseform
              .get("isGasIncluded")
              .setValue(this.dataForEdit.isGasIncluded);
            this.rentalhouseform
              .get("isMaintenanceIncluded")
              .setValue(this.dataForEdit.isMaintenanceIncluded);
            this.rentalhouseform
              .get("description")
              .setValue(this.dataForEdit.description);
            this.rentalhouseform
              .get("isWaterIncluded")
              .setValue(this.dataForEdit.isWaterIncluded);
            this.rentalhouseform
              .get("isAdminOnly")
              .setValue(this.dataForEdit.isAdminOnly);
            this.rentalhouseform
              .get("isActive")
              .setValue(this.dataForEdit.isActive);
            this.displayModal = true;
          },
        });
    } else {
      this.editMode = false;
      this.displayModal = true;
      this.rentalhouseform.reset();
      this.rentalhouseform.get("isWaterIncluded").setValue(false);
      this.rentalhouseform.get("isMaintenanceIncluded").setValue(false);
      this.rentalhouseform.get("isGasIncluded").setValue(false);
      this.rentalhouseform.get("isElectricityIncluded").setValue(false);
      this.rentalhouseform.get("isActive").setValue(true);
      // this.rentalhouseform.value.isElectricityIncluded
    }
  }

  save() {
    debugger;
    this.saving = true;
    if (!this.rentalhouseform.valid) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all Required fields",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    this._rentalService
      .create(this.rentalhouseform.value, this.target)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
        catchError((error) => {
          debugger;
          this.msgService.add({
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
          this.msgService.add({
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
    const updateData = {
      ...this.rentalhouseform.value,
      id: this.dataForEdit.id,
    };
    this._rentalService
      .update(updateData, this.target)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
        catchError((error) => {
          debugger;
          this.msgService.add({
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
          this.msgService.add({
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

  delete(id: number) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._rentalService
          .delete(id, this.target)
          .pipe(
            finalize(() => {}),
            catchError((error) => {
              debugger;
              this.msgService.add({
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
                this.msgService.add({
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

  isFieldInvalid(field: string): boolean {
    const control = this.rentalhouseform.get(field);
    return control ? control.invalid && control.touched : false;
  }

  downloadCSVFile() {
    // Assuming this.tableData is an array of objects
    const data = this.tableData;

    if (!data || data.length === 0) {
      return; // No data to export
    }

    // Convert data to CSV using PapaParse
    const csv = Papa.unparse(data);

    // Create a Blob from the CSV string
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // Create a link element and trigger download
    const link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  setPickerValue(value: any, title: string, title2: string = "") {
    switch (title) {
      case "Location":
        debugger;
        this.rentalhouseform.patchValue({
          locationId: value?.id,
          loacationName: value.name,
        });
        break;
      case "Region":
        debugger;
        this.rentalhouseform.patchValue({
          regionId: value?.id,
          regionName: value.name,
        });
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  onPageChange(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * 5;
    this._rentalService
      .getAll(this.target, this.skipCount, this.maxCount)
      .subscribe({
        next: (response) => {
          debugger;

          this.tableData = response.items;
          this.count = response.totalCount;

          this.loading = false;
        },
      });
  }
  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    debugger;
    this.dto.name = inputValue;
    debugger;

    this._rentalService.getAllRecord(this.target, this.dto).subscribe({
      next: (response) => {
        debugger;

        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }
}
