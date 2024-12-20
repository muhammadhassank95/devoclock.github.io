import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Injector,
  ViewChild,
} from "@angular/core";
import { EmployeeService } from "./../shared/services/employee.service";
import { EmployeeOutput } from "./../shared/DTOs/employee-dto";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { MenuItem } from "primeng/api";
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import * as XLSX from "xlsx";
import * as Papa from "papaparse";
import { Table } from "primeng/table";
@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
})
export class EmployeeComponent extends AppComponentBase implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchQuery: string = "";
  displayModal: boolean = false;
  employeeBulkModel: boolean = false;
  displayEditModal: boolean = false;
  displayReplacementModal: boolean = false;
  displayResignModal: boolean = false;
  erpId1: number;
  count: number;
  erpId2: number;
  empName1: number;
  empName2: number;
  loadingBulk: boolean;

  title = "csv-download-demo";
  @ViewChild("fileInput") fileInput: any;
  erpIdForEdit: string = "";
  erpIdForEditForEdit: string = "";
  erpIdForReplacement: string = "";
  erpIdForResignation: string = "";
  actionOptions: any[] = [
    { label: "View", value: "edit" },
    { label: "Delete", value: "delete" },
    { label: "Edit", value: "forEdit" },
    { label: "Resignation", value: "resignation" },
  ];

  // actions: MenuItem[] = [
  //     {
  //         label: 'Actions',
  //         items: [
  //             {
  //                 label: 'Refresh',
  //                 icon: 'pi pi-refresh'
  //             },
  //             {
  //                 label: 'Export',
  //                 icon: 'pi pi-upload'
  //             }
  //         ]
  //     }
  // ];

  selectedAction: string = "";
  permissions: PermissionsDto;
  employeeOutput: EmployeeOutput = new EmployeeOutput();

  loading: boolean = false;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 10;
  constructor(
    injector: Injector,
    private employeeService: EmployeeService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAll();
    this.permissions = new PermissionsDto("EmployeeManagement");

    this.actionOptions = this.actionOptions.filter((option) => {
      if (
        option.value === "forEdit" &&
        !this.isGranted(this.permissions.EDIT)
      ) {
        return true;
      } else if (
        option.value === "delete" &&
        !this.isGranted(this.permissions.DELETE)
      ) {
        return true;
      } else if (
        option.value === "edit" &&
        !this.isGranted(this.permissions.EDIT)
      ) {
        return true;
      } else if (
        option.value === "resignation" &&
        !this.isGranted(this.permissions.EDIT)
      ) {
        return true;
      }
      return false;
    });
  }

  getAll() {
    debugger;
    this.employeeService.getAll(this.skipCount, this.maxCount).subscribe(
      (data) => {
        this.employees = data.items;
        this.count = data.totalCount;
      },
      (error) => {
        console.error("Error fetching employee data", error);
      }
    );
  }

  onPageChange(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * 10;
    this.employeeService.getAll(this.skipCount, this.maxCount).subscribe({
      next: (response) => {
        debugger;

        this.employees = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }

  openCreateModal() {
    this.displayModal = true;
    this.erpIdForEdit = null;
  }
  openBulkModal() {
    this.employeeBulkModel = true;
  }

  openEditModal(erp: string) {
    debugger;
    this.erpIdForEdit = erp;
    this.displayModal = true;
    debugger;
  }

  openEditModalForEdit(erp: string) {
    debugger;
    this.erpIdForEditForEdit = erp;
    this.displayEditModal = true;
    debugger;
  }

  openReplacementModal(erp: string) {
    debugger;
    this.erpIdForReplacement = erp;
    this.displayReplacementModal = true;
  }
  openResignModal(erp: string) {
    debugger;
    this.erpIdForResignation = erp;
    this.displayResignModal = true;
  }

  onSave(employee) {
    this.employees.push(employee);
    this.displayModal = false;
    this.displayEditModal = false;
    this.getAll();
  }

  onClose(modalType: string) {
    this.erpIdForResignation = "";
    this.selectedAction = "";

    let message = "";
    let header = "";

    switch (modalType) {
      case "displayModal":
        message = "Are you sure you want to close without saving?";
        header = "Confirmation for First Modal";
        break;
      case "displayEditModal":
        message =
          "Are you sure you want to close the edit modal without saving?";
        header = "Confirmation for Edit Modal";
        break;
      case "displayResignModal":
        message =
          "Are you sure you want to close the resignation modal without saving?";
        header = "Confirmation for Resignation Modal";
        break;
      default:
        return;
    }

    this.confirmationService.confirm({
      message: message,
      header: header,
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this[modalType] = false;
      },
      reject: () => {
        this[modalType] = true;
      },
    });
  }

  handleAction(event: any, employee: any) {
    debugger;
    const action = event.value;
    switch (action) {
      case "edit":
        this.openEditModal(employee.id);
        break;
      case "delete":
        this.delete(employee.id);
        break;
      case "forEdit":
        this.openEditModalForEdit(employee.id);
        break;
      case "resignation":
        this.openResignModal(employee.erpId);
        break;
    }
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.employeeService
          .delete(id)
          .pipe(
            finalize(() => {}),
            catchError((error) => {
              this.msgService.add({
                severity: "error",
                summary: "Error",
                detail: error.error.error.message,
                life: 2000,
              });
              return throwError(error.error.error.message);
            })
          )
          .subscribe({
            next: (response) => {
              if (response) {
                this.msgService.add({
                  severity: "info",
                  summary: "Confirmed",
                  detail: "Deleted Successfully",
                  life: 2000,
                });
                this.getAll();
              }
            },
          });
      },
    });
  }
  filterEmployees() {
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      this.filteredEmployees = this.employees.filter((employee) =>
        Object.values(employee).some((value) =>
          String(value).toLowerCase().includes(query)
        )
      );
    } else {
      this.filteredEmployees = this.employees;
    }
  }
  onDialogClose() {
    this.confirmationService.confirm({
      message: "Are you sure you want to close without saving?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.displayModal = false;
        this.displayResignModal = false;
      },
      reject: () => {
        this.displayModal = true;
        this.displayResignModal = true;
      },
    });
  }

  //// Bulk Upload employee

  uploadFile(input: any): void {
    debugger;
    const file = input.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (fileExtension === "csv") {
      this.handleCSV(file);
    } else if (fileExtension === "xlsx") {
      this.handleXLSX(file);
    } else {
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: "Supported file formats: xlsx,csv",
        life: 2000,
      });
      console.error("Unsupported file type");
      this.fileInput.nativeElement.value = "";
    }
  }

  handleCSV(file: File): void {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log("Parsed CSV Data:", results.data);
        this.sendToApi(results.data);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  }

  downloadCSVTemplate() {
    const headers = [
      "isActive",
      "name",
      "erp",
      "relatorName",
      "dateOfBirth",
      "age",
      "cnic",
      "phoneNumber",
      "maritalStatus",
      "isHotListed",
      "joiningDate",
      "probationStartDate",
      "probationEndDate",
      "locationName",
      "typeOfEmployeeName",
      "genderName",
      "currentPaymentModeName",
      "currencyName",
      "religionName",
      "projectName",
      "designationName",
      "departmentName",
      "gradeName",
      "shiftName",
      "companyBankName",
      "costCenterName",
    ];
    const rows = [headers.join(",")]; // Join headers with comma to form the first row of the CSV

    const csvContent = rows.join("\n"); // Join rows with newline to form the complete CSV content
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "EmployeeBulk.csv");
    a.click();
    window.URL.revokeObjectURL(url);
  }

  handleXLSX(file: File): void {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(
        (event.target as FileReader).result as ArrayBuffer
      );
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const headers = json[0] as string[];
      const rows = json.slice(1);

      const result = rows.map((row) => {
        const obj: any = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });

      console.log("Parsed XLSX Data:", result);
      this.sendToApi(result);
    };
    reader.onerror = (error) => {
      console.error("Error reading XLSX file:", error);
    };
    reader.readAsArrayBuffer(file);
  }

  sendToApi(data: any): void {
    this.loadingBulk = true;
    debugger;

    var finalArray = [];
    data.map((item) => {
      if (item.erpId !== undefined) {
        finalArray.push({
          // "id": item.id,
          isActive: item.isActive,
          name: item.name,
          erpId: item.erpId.toString(),
          relatorName: item.relatorName,
          dateOfBirth: item.dateOfBirth,
          age: item.age,
          cnic: item.CNIC,
          phoneNumber: item.phoneNumber,
          maritalStatus: item.maritalStatus,
          isHotListed: item.isHotListed,
          salary: item.salary,
          joiningDate: item.joiningDate,
          probationStartDate: item.probationStartDate,
          probationEndDate: item.probationComplitionDate,
          locationName: item.locationName,
          typeOfEmployeeName: item.typeOfEmployeeName,
          genderName: item.genderName,
          currentPaymentModeName: item.currentPaymentModeName,
          currencyName: item.currencyName,
          religionName: item.religionName,
          projectName: item.projectName,
          designationName: item.designationName,
          departmentName: item.departmentName,
          gradeName: item.gradeName,
          shiftName: item.shiftName,
          companyBankName: item.companyBankName,
          costCenterName: item.costCenterName,
        });
      }
    });

    console.log("FILE DATA", finalArray);

    let Currentdata = {
      bulkDtos: finalArray,
    };
    this.employeeService
      .CreateBulk(Currentdata)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          debugger;
          const errorUrl = newBaseUrl + error.error.error.message;
          if (errorUrl) {
            window.open(errorUrl, "_blank");
          }

          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000,
          });
          this.erpId1 = null;
          this.empName1 = null;
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger;
          this.msgService.add({
            severity: "info",
            summary: "Confirmed",
            detail: "Uploaded Successfully",
            life: 2000,
          });
          this.erpId1 = null;
          this.empName1 = null;
        },
      });
    this.loadingBulk = false;
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  downloadEmployeeData() {
    debugger;
    const data = this.employees;
    if (!data || data.length === 0) {
      return;
    }
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
