export function formatDateToISO(date: Date): string {
  const pad = (number: number) => (number < 10 ? "0" : "") + number;

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  return `${year}-${month}-${day}`;
}

export function mapDateOrDefault(
  RestrictDate: string | null | undefined,
  defaultDate: string
): Date {
  // var defDate = new Date(defaultDate) >= new Date(RestrictDate);
  // var resDate = new Date(RestrictDate) >= new Date(RestrictDate);

  if (RestrictDate) {
    if (new Date(RestrictDate) >= new Date(defaultDate)) {
      var dateAndTime = new Date(RestrictDate).toISOString();
      return new Date(dateAndTime);
    } else {
      return new Date(defaultDate);
    }
  } else {
    return new Date(defaultDate);
  }
}
export function isrestrictionAllowed(
  dateString: string | null | undefined,
  bool?: boolean
): boolean {
  debugger;
  if (dateString) {
    return new Date() >= new Date(dateString) ? true : false;
  } else {
    return false;
  }
}
export function mapRestrictionDto(apiResponse) {
  var fY = JSON.parse(localStorage.getItem("FinancialYearObject"));
  debugger;
  var DEFAULT_DATE = "";
  if (fY) {
    fY.startDate;
    DEFAULT_DATE = new Date(fY.startDate).toISOString();
  } else {
    DEFAULT_DATE = new Date("1970-01-01T00:00:00Z").toISOString();
  }
  debugger;
  var restrictionDto = {
    isActive: apiResponse.isActive,
    name: apiResponse.name,
    voucherPrefix: apiResponse.voucherPrefix,
    isCreationAllowed: isrestrictionAllowed(
      apiResponse.creationRestrictionDate
    ),
    creationRestrictionDate: mapDateOrDefault(
      apiResponse.creationRestrictionDate,
      DEFAULT_DATE
    ),
    isEditAllowed: isrestrictionAllowed(apiResponse.editRestrictionDate),
    editRestrictionDate: mapDateOrDefault(
      apiResponse.editRestrictionDate,
      DEFAULT_DATE
    ),
    isApprovalAllowed: isrestrictionAllowed(
      apiResponse.approvalRestrictionDate
    ),
    approvalRestrictionDate: mapDateOrDefault(
      apiResponse.approvalRestrictionDate,
      DEFAULT_DATE
    ),
    isUnapprovalAllowed: isrestrictionAllowed(
      apiResponse.unapprovalRestrictionDate
    ),
    unapprovalRestrictionDate: mapDateOrDefault(
      apiResponse.unapprovalRestrictionDate,
      DEFAULT_DATE
    ),
    isRevisionAllowed: isrestrictionAllowed(
      apiResponse.revisionRestrictionDate
    ),
    revisionRestrictionDate: mapDateOrDefault(
      apiResponse.revisionRestrictionDate,
      DEFAULT_DATE
    ),
  };
  return restrictionDto;
}
