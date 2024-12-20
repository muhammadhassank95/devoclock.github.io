export class MonthlyBudgetRestrictionDto {
  isActive: boolean = true;
  name: string;
  voucherPrefix: string;
  isCreationAllowed: boolean = true;
  creationRestrictionDate: Date;
  isEditAllowed: boolean = true;
  editRestrictionDate: Date;
  isApprovalAllowed: boolean = true;
  approvalRestrictionDate: Date;
  isUnapprovalAllowed: boolean = true;
  unapprovalRestrictionDate: Date;
  isRevisionAllowed: boolean = true;
  revisionRestrictionDate: Date;
}
