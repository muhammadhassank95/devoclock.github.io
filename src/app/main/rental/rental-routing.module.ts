import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VehicleManagementComponent } from "./vehicle management/vehicle-management/vehicle-management.component";
import { VehicleColorComponent } from "./setup forms/vehicle-color/vehicle-color.component";
import { FuelTypeComponent } from "./setup forms/fuel-type/fuel-type.component";
import { TypeComponent } from "./setup forms/type/type.component";
import { OwnershipComponent } from "./setup forms/ownership/ownership.component";
import { RentalContractTypeComponent } from "./setup forms/rental-contract-type/rental-contract-type.component";
import { RentalContractComponent } from "./vehicle management/rental-contract/rental-contract.component";
import { RentalVehicleAttendanceComponent } from "./vehicle management/rental-vehicle-attendance/rental-vehicle-attendance.component";
import { RentalHouseComponent } from "./rental house/rental-house/rental-house.component";
import { RentalVehicleInvoiceComponent } from "./vehicle management/rental-vehicle-invoice/rental-vehicle-invoice.component";
import { HouseRentInvoiceComponent } from "./house-rent-invoice/house-rent-invoice.component";
const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "vehicle-color",
        component: VehicleColorComponent,
      },
      {
        path: "fuel-type",
        component: FuelTypeComponent,
      },
      {
        path: "type",
        component: TypeComponent,
      },
      {
        path: "ownership",
        component: OwnershipComponent,
      },
      {
        path: "rental-contract-type",
        component: RentalContractTypeComponent,
      },
      {
        path: "vehicle-management",
        component: VehicleManagementComponent,
      },
      {
        path: "rental-contract",
        component: RentalContractComponent,
      },
      {
        path: "rental-vehicle-attendance",
        component: RentalVehicleAttendanceComponent,
      },
      {
        path: "rental-vehicle-invoice",
        component: RentalVehicleInvoiceComponent,
      },
      {
        path: "rental-house",
        component: RentalHouseComponent,
      },
      {
        path: "rental-house-invoice",
        component: HouseRentInvoiceComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentalRoutingModule { }
