export class Address {
  id: number;
  isActive: boolean;
  addressType: string;
  description: string;
  postalCode: string;
  province: string;
  city: string;
  phone: string;
  police: string;
}

export class EducationDetail {
  id: number;
  isActive: boolean;
  institutionName: string;
  periodFrom: string;
  periodTo: string;
  qualification: string;
  cgpaGrade: string;
  majorSubject: string;
}

export class PreviousJobHistoryDetail {
  id: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
  title: string;
  startingSalary: number;
  endingSalary: number;
  contact: string;
  reasonForLeaving: string;
}

export class FamilyParticularDetail {
  id: number;
  isActive: boolean;
  relationship: string;
  dateOfBirth: string;
  cnic: string;
  maritalStatus: string;
  phone: string;
  mobile: string;
  isDependent: boolean;
}

export class AssetHoldingDetail {
  id: number;
  isActive: boolean;
  issueDate: string;
  comments: string;
  returnDate: string;
}

export class JobDescriptionDetail {
  id: number;
  isActive: boolean;
  description: string;
}

export class MedicalHistoryDetail {
  id: number;
  isActive: boolean;
  diseaseDescription: string;
  duration: string;
  treatmentBy: string;
  recoveryStatus: string;
}

export class EmployeeTraitsDetail {
  id: number;
  isActive: boolean;
  skills: string;
  hobbies: string;
  languagesPreferences: string;
  speakingProficiency: string;
  writtenProficiency: string;
  physicalDisability: string;
}

export class LicenseDetail {
  id: number;
  isActive: boolean;
  licenseNumber: number;
  issueDate: string;
  expiryDate: string;
  issuingLocation: string;
  licenseTypeId: number;
}

export class FinancialIntegrationDetail {
  id: number;
  isActive: boolean;
  expenseAccountId: number;
  controlAccountId: number;
  liabilityAccountId: number;
  otExpenseAccountId: number;
  otLiabilityAccountId: number;
  taxLiabilityAccountId: number;
}

export class EmployeeInputDto {
  id: number;
  isActive: boolean = true;
  name: string;
  erp: string;
  relatorName: string;
  dateOfBirth: string;
  emergencyContact: string;
  age: number;
  cnic: string;
  cniC_ExpiryDate: string;
  phoneNumber: string;
  proxCard: string;
  cniC_TokenNumber: string;
  tokenDate: string;
  familyCode: string;
  proxyName: string;
  proxyContact: string;
  proxyRelation: string;
  accountNumber: string;
  maritalStatus: string;
  marriageDate: string;
  divorcedDate: string;
  isHotListed: boolean;
  contractStartDate: string;
  contractEndDate: string;
  contractPeriod: string;
  salary: number;
  newGrossSalary: number;
  basicPay: number;
  tax: number;
  profileImagePath: string;
  signatureImagePath: string;
  joiningDate: string | Date | any;
  probationStartDate: string | Date;
  probationEndDate: string | Date | any;
  probationPeriod: number = 90;
  relationId: number;
  // regionId: number;
  // regionName: string;
  relationName: string;

  interviewId: number;
  interviewName: string;

  locationId: number;
  locationName: string;

  skillLevelId: number;
  skillLevelName: string;

  employeeTypeId: number;
  typeOfEmployeeName: string;

  genderId: number;
  genderName: string;

  currentPaymentModeId: number;
  currentPaymentModeName: string;

  currencyId: number;
  currencyName: string;

  religionId: number;
  religionName: string;

  projectId: number;
  projectName: string;

  designationId: number;
  designationName: string;

  departmentId: number;
  departmentName: string;

  bloodGroupId: number;
  bloodGroupName: string;

  gradeId: number;
  gradeName: string;

  teamId: number;
  teamName: string;

  shiftId: number;
  shiftName: string;

  companyBankId: number;
  companyBankName: string;

  costCenterId: number;
  costCenterName: string;

  fpmId: number;
  fpmName: string;

  isAllowedOverTime: boolean;
  isAllowedLeaveEncashment: boolean;
  salaryDetails: {
    id?: 0;
    isActive?: boolean;
    basicPay?: number;
    grossPay?: number;
    // grossSalary?: number;
    allowances?: allowance[];
  };

  isAllowedSocialSecurity: boolean;
  ssNumber: string;
  isAllowedEOBI: boolean;
  eobiNumber: string;
  eobiCardNumber: string;
  replacementOfId: number;
  replacementOfName: string;
  reportingToId: number;
  reportingToName: string;

  addresses: Address[];
  educationDetails: EducationDetail[];
  previousJobHistoryDetails: PreviousJobHistoryDetail[];
  familyParticularDetails: FamilyParticularDetail[];
  assetHoldingDetails: AssetHoldingDetail[];
  jobDescriptionDetails: JobDescriptionDetail[];
  medicalHistoryDetails: MedicalHistoryDetail[];
  employeeTraitsDetails: EmployeeTraitsDetail[];
  licenseDetails: LicenseDetail[];
  financialIntegrationDetails: FinancialIntegrationDetail[];

  allowanceDetails: AllowanceObjectDto[];
}

export class rejoinDto {
  rejoinId: number;
  rejoinName: string;
  JoiningDate: Date;
}

class allowance {
  allowanceId: number;
  allowanceName: string;
  amount: number;
}

export class MarkEmployeeAsResignedDto {
  id: 0;
  isActive: false;
  erp: string;
  resignationDate: string;
  noticeStartDate: string;
  releaseDate: string;
  isTerminated: true;
  resignationReason: string;
}

export class EmployeeReplacementDto {
  ResignedEmployeeERPId: string;
  ReplacementEmployeeERPId: string;
  ReplacementDate: string;
  name: string;
  erp: string;
}
export class AllowanceObjectDto {
  percentage: number;
  editAbleSalary: boolean;
  editAbleAllownce: boolean;
  name: string;
  value: number;
  id: number;
}

export class EmployeeOutput {
  id: number;
  isActive: boolean;
  name: string;
  erp: string;
  relatorName: string;
  dateOfBirth: string;
  age: number;
  cnic: string;
  cniC_ExpiryDate: string | Date;
  phoneNumber: string;
  proxCard: string;
  cniC_TokenNumber: string;
  tokenDate: string;
  familyCode: string;
  proxyName: string;
  proxyContact: string;
  emergencyContact: string;
  proxyRelation: string;
  maritalStatus: string;
  marriageDate: string;
  isHotListed: boolean;
  contractStartDate: string;
  contractEndDate: string;
  salary: number;
  profileImagePath: string;
  signatureImagePath: string;
  joiningDate: string;
  probationStartDate: string;
  probationEndDate: string;
  relationId: number;
  relationName: string;
  interviewId: number;
  interviewName: string;
  locationId: number;
  locationName: string;
  skillLevelId: number;
  skillLevelName: string;
  typeOfEmployeeId: number;
  typeOfEmployeeName: string;
  genderId: number;
  genderName: string;
  currentPaymentModeId: number;
  currentPaymentModeName: string;
  currencyId: number;
  currencyName: string;
  religionId: number;
  religionName: string;
  projectId: number;
  projectName: string;
  designationId: number;
  designationName: string;
  departmentId: number;
  departmentName: string;
  bloodGroupId: number;
  bloodGroupName: string;
  gradeId: number;
  gradeName: string;
  teamId: number;
  teamName: string;
  shiftId: number;
  shiftName: string;
  companyBankId: number;
  companyBankName: string;
  costCenterId: number;
  costCenterName: string;
  hasResigned: boolean;
  resignationDate: string;
}

export class EmployeeResponse {
  items: EmployeeOutput[];
  totalCount: number;
}
