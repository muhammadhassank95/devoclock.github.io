import { ServiceItemCategoryComponent } from "./service-item-category/service-item-category.component";
import { ServiceItemComponent } from "./service-item/service-item.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { InventorySetupsComponent } from "./inventory-setups/inventory-setups.component";
import { BasicTypeComponent } from "./inventory-setups/basic-type/basic-type.component";
import { InventoryRoutingModule } from "./inventory-routing.module";
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
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ToastModule } from "primeng/toast";
import { TabViewModule } from "primeng/tabview";
import { MaterialTypeComponent } from "./inventory-setups/material-type/material-type.component";
import { StockUnitComponent } from "./inventory-setups/stock-unit/stock-unit.component";
import { CategoryIdComponent } from "./inventory-setups/category-id/category-id.component";
import { SubCategoryIdComponent } from "./inventory-setups/sub-category-id/sub-category-id.component";
import { UnitIdComponent } from "./inventory-setups/unit-id/unit-id.component";
import { ItemSizeComponent } from "./inventory-setups/item-size/item-size.component";
import { SharedModule } from "@shared/shared.module";
import { StockItemComponent } from "./stock-item/stock-item.component";
import { ItemLinkingComponent } from "./item-linking/item-linking.component";
import { ItemLinkingGridComponent } from "./item-linking/item-linking-grid.component";
import { StockTransferRequestComponent } from "./stock-transfer-request/stock-transfer-request.component";
import { PurchaseRatePolicyComponent } from "./purchase-rate-policy/purchase-rate-policy.component";
import { ServiceOrderComponent } from "./service-order/service-order.component";
import { ServiceInvoiceComponent } from "./service-invoice/service-invoice.component";
import { ServiceRequestComponent } from "./service-request/service-request.component";
import { CapitalizationPolicyComponent } from "./capitalization-policy/capitalization-policy.component";
import { UOMComponent } from "./inventory-setups/uom/uom.component";
import { PurchaseOrderComponent } from "./purchase-order/purchase-order.component";
import { OHJobComponent } from "./inventory-setups/ohjob/ohjob.component";
import { GovtAssetComponent } from "./inventory-setups/govt-asset/govt-asset.component";
import { GoDownComponent } from "./inventory-setups/go-down/go-down.component";
import { ItemBrandComponent } from "./inventory-setups/item-brand/item-brand.component";
import { StockRequisitionComponent } from "./stock-requisition/stock-requisition.component";
import { FixedRequisitionComponent } from "./fixed-requisition/fixed-requisition.component";
import { StockSetupComponent } from "./inventory-setups/stock-setup/stock-setup.component";
import { FixedSetupComponent } from "./inventory-setups/fixed-setup/fixed-setup.component";
import { FixedTransferRequestComponent } from "./fixed-transfer-request/fixed-transfer-request.component";
import { InternalInventoryComponent } from "./internal-inventory/internal-inventory.component";
import { InternalPartrequisitionComponent } from "./internal-partrequisition/internal-partrequisition.component";
import { StoreIssuanceNoteComponent } from "./store-issuance-note/store-issuance-note.component";
import { StoreReturnNoteComponent } from "./store-return-note/store-return-note.component";
// import { MatTabsModule } from '@angular/material/tabs';
import { GateInwardPassComponent } from "./gate-inward-pass/gate-inward-pass.component";
import { GateOutwardPassComponent } from "./gate-outward-pass/gate-outward-pass.component";
import { StockReceiptNoteComponent } from "./stock-receipt-note/stock-receipt-note.component";
import { PurchaseRequisitionComponent } from "./purchase-requisition/purchase-requisition.component";
import { PurchaseInvoiceComponent } from "./purchase-invoice/purchase-invoice.component";
import { MenuModule } from "primeng/menu";
import { MaterialReturnNoteComponent } from "./material-return-note/material-return-note.component";
import { GoodsInspectionNoteComponent } from "./goods-inspection-note/goods-inspection-note.component";
import { MaterialConsumtionNoteComponent } from "./material-consumtion-note/material-consumtion-note.component";
import { TracingComponent } from "./tracing/tracing.component";
import { StockRequisitionCancellationComponent } from "./stock-requisition-cancellation/stock-requisition-cancellation.component";
import { PurchaseRequisitionCancellationComponent } from "./purchase-requisition-cancellation/purchase-requisition-cancellation.component";
import { PurchaseOrderReversalComponent } from "./purchase-order-reversal/purchase-order-reversal.component";
import { DialogService, DynamicDialogModule } from "primeng/dynamicdialog";
import { AllTracingComponent } from "./all-tracing/all-tracing.component";

@NgModule({
  declarations: [
    InventorySetupsComponent,
    BasicTypeComponent,
    MaterialTypeComponent,
    StockUnitComponent,
    GoDownComponent,
    PurchaseOrderComponent,
    StockItemComponent,
    ItemLinkingComponent,
    PurchaseRequisitionComponent,
    GovtAssetComponent,
    AllTracingComponent,
    ItemBrandComponent,
    StockTransferRequestComponent,
    CategoryIdComponent,
    SubCategoryIdComponent,
    ItemLinkingGridComponent,
    UnitIdComponent,
    ServiceItemComponent,
    ServiceItemCategoryComponent,
    ItemSizeComponent,
    PurchaseRatePolicyComponent,
    ServiceOrderComponent,
    ServiceInvoiceComponent,
    ServiceRequestComponent,
    CapitalizationPolicyComponent,
    UOMComponent,
    OHJobComponent,
    StockRequisitionComponent,
    FixedRequisitionComponent,
    StockSetupComponent,
    FixedSetupComponent,
    FixedTransferRequestComponent,
    InternalInventoryComponent,
    InternalPartrequisitionComponent,
    StoreIssuanceNoteComponent,
    StoreReturnNoteComponent,
    GateInwardPassComponent,
    GateOutwardPassComponent,
    StockReceiptNoteComponent,
    PurchaseInvoiceComponent,
    MaterialReturnNoteComponent,
    GoodsInspectionNoteComponent,
    MaterialConsumtionNoteComponent,
    TracingComponent,
    StockRequisitionCancellationComponent,
    PurchaseRequisitionCancellationComponent,
    PurchaseOrderReversalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InventoryRoutingModule,
    ButtonModule,
    SharedModule,
    DialogModule,
    TableModule,
    PaginatorModule,
    DropdownModule,
    ToolbarModule,
    ProgressSpinnerModule,
    InputTextModule,
    CalendarModule,
    MenuModule,
    AgGridAngular,
    CheckboxModule,
    ConfirmDialogModule,
    ToastModule,
    TabViewModule,
    DynamicDialogModule,
    // MatTabsModule
  ],
  exports: [TracingComponent],
  providers: [DialogService],
})
export class InventoryModule {}
