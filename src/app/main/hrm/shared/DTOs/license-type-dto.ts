export class LicenseDetailsDto {
    licensNumber: number;
    licenseDate: string | Date;
    placeOfIssue: string;
    licenseTypeId: number;
    licenseTypeName: string;
    isActive: boolean;
    createdBy: string;
    id: number;
}
export class GetLicenseDetailsDtoOutput {
    licenseDetailsDto: LicenseDetailsDto;
}

export class PagedResultDtocader {
    totalCount: number;
    items: GetLicenseDetailsDtoOutput[];
}


export class ObjectType {
    name: string;
    id: number;
}