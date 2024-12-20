export class MonthlyBudgetDto {
  financialYearId: number;
  financialYearName: string;
  documentDate: Date;
  documentNumber: string;
  budgetId: number;
  yearlyBudgetId: number;
  costCenterId: number;
  costCenterName: string;
  projectId: number;
  projectName: string;
  locationId: number;
  locationName: string;
  narration: string;
  revisionCount: number;
  months: any[];
  month: any;
  budgetDetails: detailObject[];
  // regionName: string;
  // regionId: number;
  id: number;
}

class detailObject {
  monthlyExpense: number;
  monthlyIncome: number;
  yearlyBudgetDetailId: number;
  id: number;
}

export class MonthlyReviseBudgetDto {
  reviseObject: reviseObject[];
  id: number;
}
class reviseObject {
  revisedExpenseAmount: number;
  revisedIncomeAmount: number;
  monthlyBudgetDetailId: number;
}
