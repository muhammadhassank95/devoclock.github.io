export class PermissionsDto {
  public UNIVERSAL: string;
  public CREATE: string;
  public EDIT: string;
  public DELETE: string;

  constructor(action: string) {
    this.UNIVERSAL = "LookUps." + action;
    this.CREATE = this.UNIVERSAL + ".Create";
    this.EDIT = this.UNIVERSAL + ".Edit";
    this.DELETE = this.UNIVERSAL + ".Delete";
  }
}
