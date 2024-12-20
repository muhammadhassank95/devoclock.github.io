export class InventoryItem {
    id: number;
    isActive: boolean;
    serialNumber: string;
    title: string;
    specs: string;
    minLevel: number;
    maxLevel: number;
    isPettyItem: boolean;
    itemcategoryId: number;
    itemcategoryName: string;
    itemsubCategoryId: number;
    itemsubCategoryName: string;
    itemBrand: string;
    partNumber: string;
    appUnitId: number;
    appUnitName: string;
    purchaseUnitId: number;
    purchaseUnitName: string;
    supplierId: number;
    supplierName: string;
    materialTypeId: number;
    materialTypeName: string;
    basicTypeId: number;
    basicTypeName: string;
    itemSize: string;
    depreciationRate: number = 0;
    locationId: number;
    locationName: number;
    projectId: number;
    projectName: number;
    itemType: string;
    inventoryId: number;
    name: string;
    itemFinancialIntegrations: any
}
