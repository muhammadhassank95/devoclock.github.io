import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Primeng
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { TableModule } from "primeng/table";
import { PaginatorModule } from "primeng/paginator";
import { ToolbarModule } from "primeng/toolbar";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { MenuModule } from "primeng/menu";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { InputSwitchModule } from "primeng/inputswitch";
import { IntegrationRoutingModule } from "./integration-routing.module";
import { DefaultsComponent } from "./defaults/defaults-component";
import { ReactiveFormsModule } from "@angular/forms";
import { PickerComponent } from "@shared/components/picker/picker.component";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [DefaultsComponent],
  imports: [
    CommonModule,
    IntegrationRoutingModule,
    ButtonModule,
    DialogModule,
    TableModule,
    PaginatorModule,
    ToolbarModule,
    InputTextModule,
    CheckboxModule,
    MenuModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    ToastModule,
    SharedModule,
    InputSwitchModule,
  ],
  providers: [
    DynamicDialogRef,
    ToolbarModule,
    MenuModule,
    MessageService,
    ConfirmationService,
  ],
})
export class IntegrationModule {}
