import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InventorySetupsComponent } from "./inventory-setups/inventory-setups.component";
import { BasicTypeComponent } from "./inventory-setups/basic-type/basic-type.component";
import { MaterialTypeComponent } from "./inventory-setups/material-type/material-type.component";
import { StockUnitComponent } from "./inventory-setups/stock-unit/stock-unit.component";
import { CategoryIdComponent } from "./inventory-setups/category-id/category-id.component";
import { SubCategoryIdComponent } from "./inventory-setups/sub-category-id/sub-category-id.component";
import { UnitIdComponent } from "./inventory-setups/unit-id/unit-id.component";
import { ItemSizeComponent } from "./inventory-setups/item-size/item-size.component";
import { StockItemComponent } from "./stock-item/stock-item.component";
import { PurchaseOrderComponent } from "./purchase-order/purchase-order.component";
import { GoDownComponent } from "./inventory-setups/go-down/go-down.component";
import { GovtAssetComponent } from "./inventory-setups/govt-asset/govt-asset.component";
import { ItemLinkingComponent } from "./item-linking/item-linking.component";
import { StockTransferRequestComponent } from "./stock-transfer-request/stock-transfer-request.component";
import { PurchaseRatePolicyComponent } from "./purchase-rate-policy/purchase-rate-policy.component";
import { ServiceOrderComponent } from "./service-order/service-order.component";
import { ServiceInvoiceComponent } from "./service-invoice/service-invoice.component";
import { ServiceRequestComponent } from "./service-request/service-request.component";
import { CapitalizationPolicyComponent } from "./capitalization-policy/capitalization-policy.component";
import { ServiceItemComponent } from "./service-item/service-item.component";
import { ServiceItemCategoryComponent } from "./service-item-category/service-item-category.component";
import { UOMComponent } from "./inventory-setups/uom/uom.component";
import { OHJobComponent } from "./inventory-setups/ohjob/ohjob.component";
import { ItemBrandComponent } from "./inventory-setups/item-brand/item-brand.component";
import { StockRequisitionComponent } from "./stock-requisition/stock-requisition.component";
import { FixedRequisitionComponent } from "./fixed-requisition/fixed-requisition.component";
import { StockSetupComponent } from "./inventory-setups/stock-setup/stock-setup.component";
import { FixedSetupComponent } from "./inventory-setups/fixed-setup/fixed-setup.component";
import { FixedTransferRequestComponent } from "./fixed-transfer-request/fixed-transfer-request.component";
import { InternalInventoryComponent } from "./internal-inventory/internal-inventory.component";
import { InternalPartrequisitionComponent } from "./internal-partrequisition/internal-partrequisition.component";
import { StoreIssuanceNoteComponent } from "./store-issuance-note/store-issuance-note.component";
import { GateInwardPassComponent } from "./gate-inward-pass/gate-inward-pass.component";
import { GateOutwardPassComponent } from "./gate-outward-pass/gate-outward-pass.component";
import { StockReceiptNoteComponent } from "./stock-receipt-note/stock-receipt-note.component";
import { PurchaseRequisitionComponent } from "./purchase-requisition/purchase-requisition.component";
import { StoreReturnNoteComponent } from "./store-return-note/store-return-note.component";
import { PurchaseInvoiceComponent } from "./purchase-invoice/purchase-invoice.component";
import { MaterialReturnNoteComponent } from "./material-return-note/material-return-note.component";
import { GoodsInspectionNoteComponent } from "./goods-inspection-note/goods-inspection-note.component";
import { MaterialConsumtionNoteComponent } from "./material-consumtion-note/material-consumtion-note.component";
import { TracingComponent } from "./tracing/tracing.component";
import { StockRequisitionCancellationComponent } from "./stock-requisition-cancellation/stock-requisition-cancellation.component";
import { PurchaseRequisitionCancellationComponent } from "./purchase-requisition-cancellation/purchase-requisition-cancellation.component";
import { PurchaseOrderReversalComponent } from "./purchase-order-reversal/purchase-order-reversal.component";
import { AllTracingComponent } from "./all-tracing/all-tracing.component";
const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "inventory-setups",
        component: InventorySetupsComponent,
      },
      {
        path: "basic-type",
        component: BasicTypeComponent,
      },
      {
        path: "material-type",
        component: MaterialTypeComponent,
      },
      {
        path: "stock-unit",
        component: StockUnitComponent,
      },
      {
        path: "category-id",
        component: CategoryIdComponent,
      },
      {
        path: "subcategory-id",
        component: SubCategoryIdComponent,
      },
      {
        path: "unit-id",
        component: UnitIdComponent,
      },
      {
        path: "item-size",
        component: ItemSizeComponent,
      },
      {
        path: "item-brand",
        component: ItemBrandComponent,
      },
      {
        path: "service-item-category",
        component: ServiceItemCategoryComponent,
      },
      {
        path: "tracing",
        component: TracingComponent,
      },
      {
        path: "service-item",
        component: ServiceItemComponent,
      },
      {
        path: "govt-asset",
        component: GovtAssetComponent,
      },
      {
        path: "all-tracing",
        component: AllTracingComponent,
      },
      {
        path: "go-down",
        component: GoDownComponent,
      },
      {
        path: "stock-item",
        component: StockItemComponent,
      },
      {
        path: "item-linking",
        component: ItemLinkingComponent,
      },
      {
        path: "stock-tranfer-request",
        component: StockTransferRequestComponent,
      },
      {
        path: "fixed-tranfer-request",
        component: FixedTransferRequestComponent,
      },
      {
        path: "purchase-rate-policy",
        component: PurchaseRatePolicyComponent,
      },
      {
        path: "purchase-requisition",
        component: PurchaseRequisitionComponent,
      },
      {
        path: "purchase-order",
        component: PurchaseOrderComponent,
      },
      {
        path: "service-order",
        component: ServiceOrderComponent,
      },
      {
        path: "service-invoice",
        component: ServiceInvoiceComponent,
      },
      {
        path: "service-request",
        component: ServiceRequestComponent,
      },
      {
        path: "capitalization-policy",
        component: CapitalizationPolicyComponent,
      },
      {
        path: "uom",
        component: UOMComponent,
      },
      {
        path: "ohjob",
        component: OHJobComponent,
      },
      {
        path: "stock-requisition",
        component: StockRequisitionComponent,
      },
      {
        path: "fixed-requisition",
        component: FixedRequisitionComponent,
      },
      {
        path: "stock-setups",
        component: StockSetupComponent,
      },
      {
        path: "fixed-setups",
        component: FixedSetupComponent,
      },
      {
        path: "internal-inventory",
        component: InternalInventoryComponent,
      },
      {
        path: "internal-part-requisition",
        component: InternalPartrequisitionComponent,
      },
      {
        path: "store-issuance-note",
        component: StoreIssuanceNoteComponent,
      },
      {
        path: "store-return-note",
        component: StoreReturnNoteComponent,
      },
      {
        path: "gate-inward-pass",
        component: GateInwardPassComponent,
      },
      {
        path: "gate-outward-pass",
        component: GateOutwardPassComponent,
      },
      {
        path: "stock-receipt-request",
        component: StockReceiptNoteComponent,
      },
      {
        path: "purchase-invoice",
        component: PurchaseInvoiceComponent,
      },
      {
        path: "material-return-note",
        component: MaterialReturnNoteComponent,
      },
      {
        path: "goods-inspection-note",
        component: GoodsInspectionNoteComponent,
      },
      {
        path: "material-consumption-note",
        component: MaterialConsumtionNoteComponent,
      },
      {
        path: "stockRequisition-cancellation",
        component: StockRequisitionCancellationComponent,
      },
      {
        path: "purchaseRequisition-cancellation",
        component: PurchaseRequisitionCancellationComponent,
      },
      {
        path: "purchaseOrder-reversal",
        component: PurchaseOrderReversalComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
