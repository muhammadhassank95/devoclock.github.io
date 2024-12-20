import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RentalRoutingModule } from "./rental-routing.module";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { TableModule } from "primeng/table";
import { PaginatorModule } from "primeng/paginator";
import { DropdownModule } from "primeng/dropdown";
import { ToolbarModule } from "primeng/toolbar";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from "primeng/calendar";
import { AgGridAngular } from "ag-grid-angular";
import { CheckboxModule } from "primeng/checkbox";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { TabViewModule } from "primeng/tabview";
import { MenuModule } from "primeng/menu";
import { SharedModule } from "@shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MainModule } from "../main.module";
import { VehicleManagementComponent } from "./vehicle management/vehicle-management/vehicle-management.component";
import { FuelTypeComponent } from "./setup forms/fuel-type/fuel-type.component";
import { VehicleColorComponent } from "./setup forms/vehicle-color/vehicle-color.component";
import { TypeComponent } from "./setup forms/type/type.component";
import { OwnershipComponent } from "./setup forms/ownership/ownership.component";
import { RentalContractTypeComponent } from "./setup forms/rental-contract-type/rental-contract-type.component";
import { RentalContractComponent } from "./vehicle management/rental-contract/rental-contract.component";
import { RentalVehicleAttendanceComponent } from "./vehicle management/rental-vehicle-attendance/rental-vehicle-attendance.component";
import { RentalHouseComponent } from "./rental house/rental-house/rental-house.component";
import { RentalVehicleInvoiceComponent } from "./vehicle management/rental-vehicle-invoice/rental-vehicle-invoice.component";
import { HouseRentInvoiceComponent } from "./house-rent-invoice/house-rent-invoice.component";

@NgModule({
  declarations: [
    VehicleManagementComponent,
    FuelTypeComponent,
    VehicleColorComponent,
    TypeComponent,
    OwnershipComponent,
    RentalContractTypeComponent,
    RentalContractComponent,
    RentalVehicleAttendanceComponent,
    RentalHouseComponent,
    HouseRentInvoiceComponent,
    RentalVehicleInvoiceComponent,
  ],
  imports: [
    CommonModule,
    RentalRoutingModule,
    ButtonModule,
    DialogModule,
    TableModule,
    PaginatorModule,
    DropdownModule,
    ToolbarModule,
    InputTextModule,
    CalendarModule,
    AgGridAngular,
    CheckboxModule,
    ConfirmDialogModule,
    ToastModule,
    TabViewModule,
    MenuModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MainModule,
  ],
})
export class RentalModule { }
