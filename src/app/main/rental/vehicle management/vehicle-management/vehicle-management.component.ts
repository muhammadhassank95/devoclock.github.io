import { Component } from "@angular/core";
import { MessageService, ConfirmationService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RentalService } from "../../shared/services/rental.service";
import { Table } from "primeng/table";
@Component({
  selector: "app-vehicle-management",
  templateUrl: "./vehicle-management.component.html",
})
export class VehicleManagementComponent {
  editMode: boolean;
  displayModal: boolean;
  target: string = "Vehicle";
  tableData: any;
  count: number;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 10;
  saving: boolean;
  showSupplierDetails = false;
  dto = {
    name: "",
  };
  dataForEdit: any;
  employeeErpId: number;
  vehicleForm: FormGroup;
  loading: boolean;
  constructor(
    private fb: FormBuilder,
    private _rentalService: RentalService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.vehicleForm = this.fb.group({
      registrationDate: [new Date(), Validators.required],
      registrationNumber: [null, Validators.required],
      makeYear: ["", Validators.required],
      vehicleBrand: ["", Validators.required],
      engineNumber: [null, [Validators.required]],
      chassisNumber: [null, [Validators.required]],
      colourId: [null, [Validators.required]],
      colourName: ["", [Validators.required]],
      vehicleTypeId: [null, [Validators.required]],
      vehicleTypeName: ["", [Validators.required]],
      vehicleOwnershipId: [null, [Validators.required]],
      vehicleOwnershipName: ["", [Validators.required]],
      // regionId: ["", [Validators.required]],
      // regionName: [""],
      fuelTypeId: [null, [Validators.required]],
      fuelTypeName: ["", [Validators.required]],
      vehiclePower: [null, [Validators.required]],
      locationId: [null, [Validators.required]],
      locationName: ["", [Validators.required]],
      name: ["", [Validators.required]],
      isActive: [""],
      isAdminOnly: [false],
    });
  }
  ngOnInit(): void {
    this.getAll();
  }

  setPickerValue(value: any, title: string) {
    switch (title) {
      case "Colour":
        debugger;
        this.vehicleForm.patchValue({
          colourId: value?.id,
          colourName: value.name,
        });
        this.employeeErpId = value.id;
        break;
      case "VehicleType":
        this.vehicleForm.patchValue({
          vehicleTypeId: +value.id,
          vehicleTypeName: value.name,
        });
        break;
      case "VehicleOwnership":
        this.vehicleForm.patchValue({
          vehicleOwnershipId: +value.id,
          vehicleOwnershipName: value.name,
        });
        break;
      case "FuelType":
        this.vehicleForm.patchValue({
          fuelTypeId: +value.id,
          fuelTypeName: value.name,
        });
        break;
      case "Location":
        this.vehicleForm.patchValue({
          locationId: +value.id,
          locationName: value.name,
        });
        break;
      // case "Region":
      //   this.vehicleForm.patchValue({
      //     regionId: value.id,
      //     regionName: value.name,
      //   });
      //   break;
      default:
        alert(`${title} is not defined`);
    }
  }
  getAll() {
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
            this.vehicleForm.get("name").setValue(this.dataForEdit.name);
            this.vehicleForm
              .get("registrationDate")
              .setValue(new Date(this.dataForEdit.registrationDate));
            this.vehicleForm
              .get("registrationNumber")
              .setValue(this.dataForEdit.registrationNumber);
            this.vehicleForm
              .get("makeYear")
              .setValue(this.dataForEdit.makeYear);
            this.vehicleForm
              .get("vehicleBrand")
              .setValue(this.dataForEdit.vehicleBrand);
            this.vehicleForm
              .get("colourId")
              .setValue(this.dataForEdit.colourId);
            this.vehicleForm
              .get("colourName")
              .setValue(this.dataForEdit.colourName);
            this.vehicleForm
              .get("vehicleTypeId")
              .setValue(this.dataForEdit.vehicleTypeId);
            this.vehicleForm
              .get("vehicleTypeName")
              .setValue(this.dataForEdit.vehicleTypeName);
            this.vehicleForm
              .get("engineNumber")
              .setValue(this.dataForEdit.engineNumber);
            this.vehicleForm
              .get("chassisNumber")
              .setValue(this.dataForEdit.chassisNumber);
            this.vehicleForm
              .get("vehicleOwnershipId")
              .setValue(this.dataForEdit.vehicleOwnershipId);
            this.vehicleForm
              .get("vehicleOwnershipName")
              .setValue(this.dataForEdit.vehicleOwnershipName);
            this.vehicleForm
              .get("fuelTypeId")
              .setValue(this.dataForEdit.fuelTypeId);
            this.vehicleForm
              .get("fuelTypeName")
              .setValue(this.dataForEdit.fuelTypeName);
            this.vehicleForm
              .get("locationId")
              .setValue(this.dataForEdit.locationId);
            this.vehicleForm
              .get("locationName")
              .setValue(this.dataForEdit.locationName);
            // this.vehicleForm
            //   .get("regionId")
            //   .setValue(this.dataForEdit.regionId);
            // this.vehicleForm
            //   .get("regionName")
            //   .setValue(this.dataForEdit.regionName);
            this.vehicleForm
              .get("vehiclePower")
              .setValue(this.dataForEdit.vehiclePower);
            this.vehicleForm
              .get("isActive")
              .setValue(this.dataForEdit.isActive);
            this.displayModal = true;
          },
        });
    } else {
      this.editMode = false;
      this.displayModal = true;
      this.vehicleForm.reset();
      this.vehicleForm.get("registrationDate").setValue(new Date());
      this.vehicleForm.get("isActive").setValue(true);
      this.vehicleForm.get("isAdminOnly").setValue(false);
    }
  }

  save() {
    this.saving = true;

    if (!this.vehicleForm.valid) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all Required fields",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    this._rentalService
      .create(this.vehicleForm.value, this.target)
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
      ...this.vehicleForm.value,
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
    const control = this.vehicleForm.get(field);
    return control ? control.invalid && control.touched : false;
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }
  onPageChange(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * 10;
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
