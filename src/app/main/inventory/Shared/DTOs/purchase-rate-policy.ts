export class PurchaseRatePolicy {
  issueDate: Date;
  userLocationId: number;
  userLocationName: string;
  voucherNumber: string;
  categoryType: string;
  supplierId: number;
  supplierName: string;
  paymentModeId: number;
  paymentModeName: string;
  purchaseRatePolicyDetails: Item[];
}
export class Item {
  id: number;
  itemId: number;
  itemName: string;
  rate: number;
  discountAmount: number;
  finalRate: number;
  discountPercentage: number;
}
