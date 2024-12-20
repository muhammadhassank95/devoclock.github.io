import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainRoutingModule } from "./main-routing.module";

// import { TeamComponent } from './team/team.component'

// Generics
import { DynamicModalComponent } from "./generics/components/dynamic-modal/dynamic-modal.component";
import { LookupComponent } from "./generics/components/lookup/lookup.component";

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

@NgModule({
  declarations: [
    // TeamComponent,
    DynamicModalComponent,
    LookupComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ButtonModule,
    DialogModule,
    TableModule,
    PaginatorModule,
    ToolbarModule,
    InputTextModule,
    CheckboxModule,
    MenuModule,
    ConfirmDialogModule,
    ToastModule,
    InputSwitchModule,
  ],
  exports: [DynamicModalComponent, LookupComponent],
  providers: [
    DynamicDialogRef,
    MenuModule,
    MessageService,
    ConfirmationService,
  ],
})
export class MainModule {}
