export class LocalizationDto {
    public UNIVERSAL: string;
    public CREATE: string;
    public EDIT: string;
    public DELETE: string;

    constructor(action: string) {
        this.UNIVERSAL = action;
        this.CREATE = "AddNew" + action;
        this.EDIT = "Edit" + action;
        this.DELETE = "Delete" + action;
    }
} 