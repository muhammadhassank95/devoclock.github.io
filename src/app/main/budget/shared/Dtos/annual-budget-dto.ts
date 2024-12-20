export class AnnualBudgetDto {
  financialYearId: number;
  financialYearName: string;
  documentDate: Date;
  documentNumber: string;
  months: string[];
  budgetId: number;
  costCenterId: number;
  costCenterName: string;
  projectId: number;
  projectName: string;
  // regionId: number;
  // regionName: string;
  locationId: number;
  locationName: string;
  title: string;
  revisedCount: number;
  budgetDetails: any[];
}
