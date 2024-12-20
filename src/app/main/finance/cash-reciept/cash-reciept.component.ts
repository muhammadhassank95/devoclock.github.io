import { Component, ViewChild } from "@angular/core";
import { BankPaymentDto } from "../Shared/Dtos/bank-payment-dto";
import { FinanceModuleService } from "../Shared/Services/finance-module.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, generate, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { Table } from "primeng/table";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";

@Component({
  selector: "app-cash-reciept",
  templateUrl: "./cash-reciept.component.html",
})
export class CashRecieptComponent {
  bankPaymentDto: BankPaymentDto = new BankPaymentDto();
  restrictionDto: RestrictionDto = new RestrictionDto();

  tableData: any;
  count: number;
  displayModal: boolean;
  officialReceiptData: any;
  editMode: boolean;
  isAdjustInvoicesModalVisible: boolean = false;
  saving: boolean;
  viewOnly: boolean;
  today: Date = new Date();
  MinDate: Date = new Date();
  selectedAdjustmentEntries: any[];
  isFetchingVouchers: boolean = false;
  isCreatingBulkVouchers: boolean = false;
  target = "GeneralPayment";
  currentPage = 1;
  loading: boolean;
  dto = {
    skipCount: 0,
    maxCount: 5,
    linkedDocument: 2,
    DocOrVocNumber: "",
  };
  dtoOf = {
    showUnreconciledReceipts: true,
  };
  protected gridApi: GridApi;
  protected setParms;
  protected adjustModalGridApi: GridApi;
  protected adjustModalSetParams;
  rowSelection: string;
  rowCount: number;
  rowData: any;
  displayOfficialReceipt: boolean;
  locationId: number;
  locationName: string;
  adjustModalGridData: [] = [];
  chequeStart: string = "";
  chequeEnd: string = "";
  remarks: string = "";
  chartOfAccountId: number = 0;
  chartOfAccountName: string;
  narration: string = "";
  userLocationId: number = 0;
  chartOfAccountBankName: string;
  referenceDate: string | Date;
  issueDate: string | Date;
  referenceNo: string;
  userLocationName: string;
  bankPaymentFG: FormGroup;
  isLineSeparateVoucher: boolean = false;
  generateVoucherFormGroup: FormGroup;
  adjustInvoicesForm: FormGroup;

  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;

  constructor(
    private _bankPayment: FinanceModuleService,
    private _financeModuleService: FinanceModuleService,
    private _restrictionService: RestrictionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService,
    private fb: FormBuilder
  ) {}

  colDefs: ColDef[] = [
    {
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true,
    },
    {
      headerName: "Account ID",
      editable: false,
      field: "chartOfAccountSerialNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "",
    //   field: "addAccount",
    //   width: 20,
    //   editable: false,
    //   cellRenderer: this.addIconCellRendererFunc,
    //   resizable: false,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Account Title",
      editable: false,
      field: "chartOfAccountName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Client ID",
      editable: false,
      field: "supplierSerialNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Client Title",
      editable: false,
      field: "supplierName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Location ID",
      editable: false,
      field: "locationId",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "",
    //   field: "addLocation",
    //   width: 20,
    //   editable: false,
    //   cellRenderer: this.addIconCellRendererFunc,
    //   resizable: false,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Location Title",
      editable: false,
      field: "locationName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Employee ID",
      editable: false,
      field: "employeeErpId",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "",
    //   field: "addEmployee",
    //   width: 20,
    //   editable: false,
    //   cellRenderer: this.addIconCellRendererFunc,
    //   resizable: false,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Employee Title",
      editable: false,
      field: "employeeName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Cost Center ID",
      editable: false,
      field: "costCenterId",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "",
    //   field: "addCostCenter",
    //   width: 20,
    //   editable: false,
    //   cellRenderer: this.addIconCellRendererFunc,
    //   resizable: false,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Cost Center Title",
      editable: false,
      field: "costCenterName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Project ID",
      editable: false,
      field: "projectId",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "",
    //   field: "addProject",
    //   width: 20,
    //   editable: false,
    //   cellRenderer: this.addIconCellRendererFunc,
    //   resizable: false,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Project Title",
      editable: false,
      field: "projectName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Narration",
      editable: true,
      field: "comments",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Budget Month",
      editable: true,
      field: "consumptionMonth",
      resizable: true,
      suppressSizeToFit: true,
      cellEditor: "agDateCellEditor", // Date input
      valueFormatter: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          // return date.toISOString().split('T')[0];
          return moment(date).format("YYYY-MMM"); // Format date as yyyy-mm-dd
        }
        return "";
      },
      valueParser: (params) => {
        return new Date(params.newValue); // Parse string to Date object
      },
    },
    {
      headerName: "",
      field: "addPurchaseOrder",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "P.O.No.",
      editable: false,
      field: "purchaseOrderNumberId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addAdjestmentVNoId",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "ad J V No.",
      editable: false,
      field: "adjestmentVoucherNumberid",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Total Amount",
      editable: true,
      field: "totalAmount",
      cellEditor: "agNumberCellEditor",
      resizable: true,
      // onCellValueChanged: params => this.calculateTaxAmount(params),
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addTaxId",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Tax Acc Title",
      editable: false,
      field: "taxChartOfAccountName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Tax Acc ID",
      editable: false,
      field: "taxChartOfAccountSerialNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Tax %",
      editable: true,
      field: "taxPercentage",
      cellEditorParams: {
        min: 0, // Minimum value
        max: 100, // Maximum value
      },
      cellEditor: "agNumberCellEditor",
      resizable: true,
      suppressSizeToFit: true,
      onCellValueChanged: (params) => this.calculateTaxAmount(params),
    },
    {
      headerName: "Tax Amt",
      editable: false,
      field: "taxAmount",
      cellEditor: "agNumberCellEditor",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addOTaxId",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "O. Tax Title",
      editable: false,
      field: "otherTaxChartOfAccountName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Tax Acc ID",
      editable: false,
      field: "otherTaxChartOfAccountSerialNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "O. Tax Amt",
      editable: true,
      field: "otherTaxAmount",
      resizable: true,
      onCellValueChanged: (params) => this.calculateFinalAmount(params),
      cellEditor: "agNumberCellEditor",
      suppressSizeToFit: true,
    },
    {
      headerName: "Amount",
      editable: false,
      field: "finalAmount",
      resizable: true,
      cellEditor: "agNumberCellEditor",
      suppressSizeToFit: true,
      // onCellValueChanged: params => this.calculateTotalChequeAmount(params),
    },
    // {
    //   headerName: "Fine",
    //   editable: true,
    //   field: "fine",
    //   resizable: true,
    //   cellEditor: "agNumberCellEditor",
    //   suppressSizeToFit: true,
    // },
  ];

  employeePaymentModeOptions: any[] = [
    { label: "Payment", value: "payment" },
    { label: "Cheque", value: "cheque" },
  ];

  ngOnInit() {
    this.bankPaymentFG = this.fb.group({
      id: [0],
      issueDate: [null, Validators.required],
      userLocationId: [null, [Validators.required]],
      userLocationName: ["", [Validators.required]],
      isCrossedCheque: [false],
      taxPayment: [false],
      chartOfAccountId: [null, [Validators.required]],
      chartOfAccountName: ["", [Validators.required]],
      taxAcId: [null],
      taxAcName: [""],
      linkedDocument: [2],
      OtherTaxAcId: [null],
      OtherTaxAcName: [""],
      chartOfAccountSerialNumber: "",
      showSerialNumberTax: "",
      showSerialNumberOTax: "",
      referenceId: 0,
      referenceVoucherNumber: "",
      generalPaymentDetails: [[]],
      forLocationId: [null, [Validators.required]],
      bankName: ["", [Validators.required]],
      showSerialNumberBank: "",
      referenceTitle: ["", [Validators.required]],
      utilizedChequeDetailId: ["", [Validators.required]],
      totalTaxAmonut: 0,
      totalAmount: 0,
      referenceNumber: ["", [Validators.required]],
      referenceDate: ["", [Validators.required]],
      totalTaxAmount: [0, [Validators.required]],
      totalChecqueAmount: [0, [Validators.required]],
      isCheque: [false, [Validators.required]],
      remarks: ["", Validators.required],
      voucherNumber: ["", [Validators.required]],
    });
    this.adjustInvoicesForm = this.fb.group({
      daysFrom: ["", [Validators.required]],
      daysTo: ["", [Validators.required]],
      employeePaymentMode: ["", [Validators.required]],
      narration: ["", [Validators.required]],
      employeePaymentBankId: [null, [Validators.required]],
      employeePaymentBankName: ["", [Validators.required]],
      FromChartOfAccountId: [null, Validators.required],
      fromChartOfAccountName: [null, Validators.required],
      ToChartOfAccountId: [null, [Validators.required]],
      toChartOfAccountName: [null, [Validators.required]],
      costCenterFrom: [null, [Validators.required]],
      fromCostCenterName: [null, [Validators.required]],
      costCenterTo: [null, [Validators.required]],
      toCostCenterName: [null, [Validators.required]],
      projectFrom: [null, [Validators.required]],
      fromProjectName: [null, [Validators.required]],
      projectTo: [null, [Validators.required]],
      toProjectName: [null, [Validators.required]],
      empIdTo: [null, [Validators.required]],
      toEmployeeName: [null, [Validators.required]],
      empIdFrom: [null, [Validators.required]],
      fromEmployeeName: [null, [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      accountTypeId: ["", [Validators.required]],
      locationId: ["", [Validators.required]],
      debit: ["", [Validators.required]],
      credit: ["", [Validators.required]],
      both: ["", [Validators.required]],
      cashFlowId: ["", [Validators.required]],
      cashFlowName: ["", [Validators.required]],
      remarks: ["", [Validators.required]],
      bankId: [null, [Validators.required]],
      bankName: [null, [Validators.required]],
      chequeNo: [null, [Validators.required]],
      // chequeNoN: [null, [Validators.required]],
      eachLineAsSeparateVoucher: [false],
    });
    this.generateVoucherFormGroup = this.fb.group({
      FromChartOfAccountId: "",
      coaFromName: null,
      ToChartOfAccountId: "",
      coaToName: "",
      costCenterFrom: "",
      costCenterFromName: "",
      costCenterTo: "",
      costCenterToName: "",
      projectFrom: "",
      projectFromName: "",
      projectTo: "",
      projectToName: "",
      empIdFrom: "",
      empIdFromName: "",
      empIdTo: "",
      empIdToName: "",
      suppIdFrom: "",
      suppIdFromName: "",
      suppIdTo: "",
      suppIdToName: "",
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      locationId: "",
      locationIdName: "",
      debit: false,
      credit: false,
      voucherNumber: "",
      both: false,
      bankId: "",
      bankIdName: "",
      chequeNo: "",
      chequeNoName: "",
      MinDaysAgo: null,
      MaxDaysAgo: null,
      remarks: "",
    });
    this.getAll();
    this.VoucherRestriction("CR");
  }

  handleOpenAdjustVoucherModal() {
    this.isAdjustInvoicesModalVisible = true;
  }

  // handleGridRowSelectionChange(value) {
  //   const selectedNodes = this.adjustModalGridApi.getSelectedNodes();
  //   const selectedData = selectedNodes.map((node) => {
  //     let obj = { ...node.data, generalLedgerId: 0 };
  //     delete obj.id;
  //     return obj;
  //   });
  //   console.log({ selectedData });
  //   this.selectedAdjustmentEntries = selectedData;
  // }
  handleGridRowSelectionChange(value) {
    debugger;
    const selectedNodes = this.adjustModalGridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => {
      const {
        chartOfAccountId = node.data.chartOfAccountId,
        locationId = node.data.locationId,
        projectId = node.data.projectId,
        costCenterId = node.data.costCenterId,
        remarks = node.data.remarks,
        consumptionMonth = node.data.consumptionMonth,
        adjustmentVoucherNumber = node.data.adjustmentVoucherNumber,
        generalLedgerId = node.data.generalLedgerId,
        totalAmount = node.data.credit,
        taxChartOfAccountId = node.data.taxChartOfAccountId,
        taxPercentage = node.data.taxPercentage,
        taxAmount = node.data.taxAmount,
        otherTaxAmount = node.data.otherTaxAmount,
        finalAmount = node.data.credit,
        employeeId = node.data.employeeId,
        voucherNumber = node.data.voucherNumber,
      } = node.data;

      return {
        chartOfAccountId,
        locationId,
        projectId,
        costCenterId,
        remarks,
        consumptionMonth,
        adjustmentVoucherNumber,
        generalLedgerId,
        totalAmount,
        taxChartOfAccountId,
        taxPercentage,
        taxAmount,
        otherTaxAmount,
        finalAmount,
        employeeId,
        voucherNumber,
      };
    });

    console.log({ selectedData });
    this.selectedAdjustmentEntries = selectedData;
  }

  handleApplyAdjustedVouchersData() {
    let filteredNodes = [];
    const selectedNodes = this.adjustModalGridApi.getSelectedNodes();
    // const selectedData = selectedNodes.map((node) => ({ ...node.data, generalLedgerId: 0, id: null, isAdjustmentEntry: true }));
    const selectedData = selectedNodes.map((node) => {
      let obj = {
        ...node.data,
        generalLedgerId: 0,
        isAdjustmentEntry: true,
        totalAmount: node.data.credit,
        finalAmount: node.data.credit,
      };
      delete obj.id;
      return obj;
    });
    const rowData = this.rowData.map((node) => (node.data ? node.data : node));
    console.log(this.rowData);
    selectedData.forEach((el) => {
      if (rowData.some((row) => row.id === el.id)) {
        console.error(`This row data is already selected:`, el);
        this.messageService.add({
          severity: "Warning",
          detail: "This row data is already selected",
        });
      } else {
        filteredNodes.push(el);
      }
    });
    // let filteredNodes = selectedData.filter((el) => !rowData.includes(el));
    this.rowData = [...rowData, ...filteredNodes];
    this.isAdjustInvoicesModalVisible = false;
  }

  getAll() {
    this._bankPayment
      .getAll(this.target, this.dto)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger;
          this.tableData = response.items;
          this.count = response.totalCount;
        },
      });
  }

  handleMakeVouchers() {
    debugger;
    this.isCreatingBulkVouchers = true;

    let data = {
      issueDate: moment(this.issueDate).format("YYYY-MM-DD"),
      userLocationId: this.userLocationId,
      chartOfAccountId: this.chartOfAccountId,
      chequeStart: this.chequeStart,
      chequeEnd: this.chequeEnd,
      remarks: this.narration,
      referenceDate: moment(this.referenceDate).format("YYYY-MM-DD"),
      referenceNo: this.referenceNo,
      linkedDocument: 2,
      generalPaymentDetails: this.selectedAdjustmentEntries,
      isCheque: false,
      isTaxPayment: false,
      isCrossedCheque: false,
      id: 0,
    };

    this._financeModuleService
      .createBulkVouchers(
        this.target,
        this.chequeStart,
        this.chequeEnd,
        this.isLineSeparateVoucher,
        data
      )
      .pipe(
        finalize(() => (this.isCreatingBulkVouchers = false)),
        catchError((error) => {
          const errorMessage =
            error?.error?.error?.message ||
            "An error occurred while creating vouchers.";
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: errorMessage,
          });
          return throwError(error);
        })
      )
      .subscribe((res) => {
        this.isAdjustInvoicesModalVisible = false;
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Vouchers created successfully",
        });
        this.displayModal = false;
        console.log({ res });
      });
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._bankPayment
          .delete(id, this.target)
          .pipe(
            finalize(() => {}),
            catchError((error) => {
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: error.error.error.message,
              });
              return throwError(error.error.error.message);
            })
          )
          .subscribe({
            next: (response) => {
              if (response) {
                this.messageService.add({
                  severity: "info",
                  summary: "Confirmed",
                  detail: "Deleted Successfully",
                });
                this.getAll();
              }
            },
          });
      },
    });
  }

  approve(id: number) {
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._bankPayment
          .approve(id, this.target)
          .pipe(
            finalize(() => {}),
            catchError((error) => {
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: error.error.error.message,
              });
              return throwError(error.error.error.message);
            })
          )
          .subscribe({
            next: (response) => {
              if (response) {
                this.messageService.add({
                  severity: "success",
                  summary: "Confirmed",
                  detail: "Approved Successfully",
                });
                this.getAll();
              }
            },
          });
      },
    });
  }

  show(id?: number, viewOnly?: boolean) {
    if (id) {
      if (!viewOnly && !this.restrictionDto.isEditAllowed) {
        this.messageService.add({
          severity: "info",
          summary: "Info",
          detail: "Edit Restricted",
        });
        return;
      }
      this.editMode = true;
      if (viewOnly) {
        this.viewOnly = viewOnly;
        this.bankPaymentFG.disable();
        this.MinDate = null;
      } else {
        this.viewOnly = false;
        this.MinDate = this.restrictionDto.editRestrictionDate;
      }
      this._bankPayment
        .getDataForEdit(id, this.target)
        .pipe(
          finalize(() => {}),
          catchError((error) => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: error.error.error.message,
            });
            return throwError(error.error.error.message);
          })
        )
        .subscribe({
          next: (response) => {
            this.bankPaymentDto = response;
            this.bankPaymentFG.patchValue({
              ...response,
              issueDate: new Date(response.issueDate),
              referenceDate: new Date(response.referenceDate),
            });
            this.rowData = response.generalPaymentDetails;
            // this.bankPaymentDto.issueDate = new Date(response.issueDate);
            this.displayModal = true;
          },
        });
    } else {
      if (!this.restrictionDto.isCreationAllowed) {
        this.messageService.add({
          severity: "info",
          summary: "Info",
          detail: "Creation Restricted",
        });
        return;
      }
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.bankPaymentFG.enable();
      this.editMode = false;
      this.viewOnly = false;
      this.displayModal = true;
      this.bankPaymentDto = new BankPaymentDto();
      this.bankPaymentFG.reset();
      this.rowData = [];
      this.getDefaultLocation("Location", "locationName", "locationId", "");
      this.bankPaymentFG.get("issueDate").setValue(this.today);
    }
  }

  handleGenerateVouchers() {
    debugger;
    console.log(this.adjustInvoicesForm.value);
    this.generateVoucherFormGroup.value.startDate = moment(
      this.generateVoucherFormGroup.value.startDate
    ).format("YYYY-MM-DD");
    this.generateVoucherFormGroup.value.endDate = moment(
      this.generateVoucherFormGroup.value.endDate
    ).format("YYYY-MM-DD");
    this.isFetchingVouchers = true;
    this._financeModuleService
      .getAll("GeneralLedger", this.generateVoucherFormGroup.value)
      .pipe(
        finalize(() => {
          this.isFetchingVouchers = false;
        })
      )
      .subscribe((data) => {
        debugger;
        console.log(data);
        this.adjustModalGridData = this.transformData(data.items);
        this.adjustModalGridApi.refreshCells();
      });
  }

  transformData = (data) => {
    return data.map(({ id, ...rest }) => ({
      generalLedgerId: id,
      ...rest,
    }));
  };

  save() {
    debugger;
    // if (this.bankPaymentFG.invalid) return;
    this.saving = true;
    if (this.gridApi.getDisplayedRowCount() <= 0) {
      this.messageService.add({
        severity: "error",
        detail: "Details are Required",
      });
      this.saving = false;
      return;
    }

    let bankPaymentInfoDetails = [];
    this.gridApi.forEachNode((node, index) => {
      let bankPaymentInfoDetailObj = {};
      Object.keys(node.data).forEach((key) => {
        bankPaymentInfoDetailObj[key] = node.data[key];
        bankPaymentInfoDetailObj["id"] = 0;
        // bankPaymentInfoDetailObj["locationId"] = 10;
      });
      bankPaymentInfoDetails.push(bankPaymentInfoDetailObj);
    });
    this.bankPaymentFG.patchValue({
      generalPaymentDetails: bankPaymentInfoDetails,
    });
    this.bankPaymentFG.patchValue({
      id: 0,
    });
    this.bankPaymentFG.patchValue({
      isCrossedCheque: false,
    });
    this.bankPaymentFG.patchValue({
      utilizedChequeDetailId: 0,
    });
    this.bankPaymentFG.patchValue({
      isCheque: false,
    });
    this.bankPaymentFG.patchValue({
      linkedDocument: 2,
    });
    this._bankPayment
      .create(this.bankPaymentFG.value, this.target)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
          });
          return throwError(error.message);
        })
      )
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: "success",
            summary: "Confirmed",
            detail: "SavedSuccessfully",
          });
          this.getAll();
          this.saving = false;
          this.displayModal = false;
        },
      });
  }

  update() {
    this.saving = true;
    this.editMode = true;
    let bankPaymentInfoDetails = [];
    this.gridApi.forEachNode((node, index) => {
      let bankPaymentInfoDetailObj = {};
      Object.keys(node.data).forEach((key) => {
        bankPaymentInfoDetailObj[key] = node.data[key];
      });
      bankPaymentInfoDetails.push(bankPaymentInfoDetailObj);
    });
    this.bankPaymentFG.patchValue({
      generalPaymentDetails: bankPaymentInfoDetails,
    });
    this._bankPayment
      .update(this.bankPaymentFG.value, this.target)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
          });
          return throwError(error.message);
        })
      )
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: "success",
            summary: "Confirmed",
            detail: "UpdatedSuccessfully",
          });
          this.getAll();
          this.saving = false;
          this.displayModal = false;
        },
      });
  }

  setBulkVoucherPickerValue(value: any, title: string, title2: string = "") {
    switch (title) {
      case "Location":
        this.userLocationId = +value.id;
        this.userLocationName = value.name;
        break;
      case "Bank":
        this.chartOfAccountName = value.name;
        this.chartOfAccountId = +value.id;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  setPickerValue(value: any, title: string, title2: string = "") {
    switch (title) {
      case "Location":
        this.locationId = +value.id;
        this.locationName = value.name;
        this.bankPaymentFG.patchValue({
          userLocationName: value.name,
          userLocationId: +value.id,
        });
        if (this.bankPaymentFG.value.issueDate) {
          this.MakeVoucher();
        }
        // this.MakeVoucher();
        break;
      case "Bank":
        this.bankPaymentFG.patchValue({
          chartOfAccountName: value.name,
          chartOfAccountId: +value.id,
          chartOfAccountSerialNumber: value.serialNumber,
        });
        break;
      case "ChequeBook":
        this.bankPaymentFG.patchValue({
          referenceNo: value.name,
          utilizedChequeDetailId: value.id,
        });
        break;
      case "TaxAcId":
        this.bankPaymentFG.patchValue({
          taxAcName: value.name,
          taxAcId: value.id,
        });
        this.updateGridRowsTaxAcGlobally();
        break;
      case "OTaxAcId":
        this.bankPaymentFG.patchValue({
          otherTaxAcName: value.name,
          otherTaxAcId: value.id,
        });
        this.updateGridRowsTaxAcGlobally();
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  setAdjustmentModalPickerValue(
    value: any,
    title: string,
    title2: string = ""
  ) {
    switch (title) {
      case "Location":
        this.generateVoucherFormGroup.patchValue({
          coaFrom: value.id?.split("/")[0] || "",
          coaFromName: value.name,
        });
        console.log(value, title);
        break;
      case "From A/c":
        console.log(value, title);
        this.generateVoucherFormGroup.patchValue({
          FromChartOfAccountId: value.id?.split("/")[0] || "",
          coaFromName: value.name,
        });
        break;
      case "To A/c":
        console.log(value, title);
        this.generateVoucherFormGroup.patchValue({
          ToChartOfAccountId: value.id?.split("/")[0] || "",
          coaToName: value.name,
        });
        break;
      case "Project From":
        console.log(value, title);
        this.generateVoucherFormGroup.patchValue({
          projectFrom: +value.id || "",
          projectFromName: value.name,
        });
        break;
      case "Project To":
        console.log(value, title);
        this.generateVoucherFormGroup.patchValue({
          projectTo: +value.id || "",
          projectToName: value.name,
        });
        break;
      case "C.C. From":
        console.log(value, title);
        this.generateVoucherFormGroup.patchValue({
          costCenterFrom: +value.id || "",
          costCenterFromName: value.name,
        });
        break;
      case "C.C. To":
        this.generateVoucherFormGroup.patchValue({
          costCenterTo: +value.id || "",
          costCenterToName: value.name,
        });
        console.log(value, title);
        break;
      case "Employee From":
        console.log(value, title);
        this.generateVoucherFormGroup.patchValue({
          empIdFrom: +value.additional || "",
          empIdFromName: value.name,
        });
        break;
      case "Employee To":
        console.log(value, title);
        this.generateVoucherFormGroup.patchValue({
          empIdTo: +value.additional || "",
          empIdToName: value.name,
        });

        break;
      case "Supplier From":
        console.log(value, title);
        this.generateVoucherFormGroup.patchValue({
          suppIdFrom: +value.id || "",
          suppIdFromName: value.name,
        });
        break;
      case "Supplier To":
        this.generateVoucherFormGroup.patchValue({
          suppIdTo: +value.id || "",
          suppIdToName: value.name,
        });
        console.log(value, title);
        break;
      case "Bank":
        console.log(value, title);
        this.generateVoucherFormGroup.patchValue({
          bankId: value.id || "",
          bankName: value.name,
        });
        break;
      case "ChequeBook":
        console.log(value, title);
        this.generateVoucherFormGroup.patchValue({
          chequeNo: +value.id || "",
          chequeNoName: value.name,
        });
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  updateGridRowsTaxAcGlobally() {
    this.gridApi.forEachNode((node, index) => {
      node.data.taxId = this.bankPaymentFG.value.taxAcId;
      node.data.taxAccTitle = this.bankPaymentFG.value.taxAcName;
    });
    this.gridApi.refreshCells();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData = [];
  }

  onAdjustModalGridReady(params: GridReadyEvent) {
    this.adjustModalGridApi = params.api;
    this.adjustModalGridData = [];
  }

  // onAddRow() {
  //   const newItem: Record<string, any> = {};
  //   this.colDefs.forEach((colDef) => {
  //     if (colDef.field) {
  //       newItem[colDef.field] = null;
  //     }
  //   });
  //   this.gridApi.applyTransaction({ add: [newItem] });
  //   this.rowCount = this.gridApi.getDisplayedRowCount();
  // }

  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.gridApi.applyTransaction({
      remove: selectedNodes.map((node) => node.data),
    });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  addIconCellRendererFunc() {
    return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
  }

  cellClicked(params) {
    switch (params.column["colId"]) {
      case "addAccount":
        this.setParms = params;
        this.openSelectItem("ChartOfAccount");
        break;
      case "addLocation":
        this.setParms = params;
        this.openSelectItem("Location");
        break;
      case "addEmployee":
        this.setParms = params;
        this.openSelectItem("Employee");
        break;
      case "addCostCenter":
        this.setParms = params;
        this.openSelectItem("CostCenter");
        break;
      case "addProject":
        this.setParms = params;
        this.openSelectItem("Project");
        break;
      case "addTaxId":
        this.setParms = params;
        this.openSelectItem("Tax", "Tax");
        break;
      case "addOTaxId":
        this.setParms = params;
        this.openSelectItem("OTax", "OTax");
        break;
      default:
        break;
    }
  }

  openSelectItem(
    target:
      | "ChartOfAccount"
      | "Location"
      | "Employee"
      | "CostCenter"
      | "Project"
      | "Tax"
      | "OTax",
    filterWiseChartOfAccTarget?: string
  ) {
    const initialState: any = {
      target: target,
    };
    if (filterWiseChartOfAccTarget) {
      initialState.filterWiseChartOfAccTarget = filterWiseChartOfAccTarget;
    }
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );

    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      if (target == "ChartOfAccount") {
        this.setParms.data.chartOfAccountId = +result.id.split("/")[0] || 0;
        this.setParms.data.chartOfAccountName = result.name;
      } else if (target == "Location") {
        this.setParms.data.locationId = +result.id.split("/")[0] || 0;
        this.setParms.data.locationName = result.name;
      } else if (target == "Employee") {
        this.setParms.data.employeeId = +result.additional || 0;
        this.setParms.data.employeeName = result.name;
      } else if (target == "CostCenter") {
        this.setParms.data.costCenterId = +result.id.split("/")[0] || 0;
        this.setParms.data.costCenterName = result.name;
      } else if (target == "Project") {
        this.setParms.data.projectId = +result.id.split("/")[0] || 0;
        this.setParms.data.projectName = result.name;
      } else if (target == "Tax") {
        debugger;
        this.setParms.data.taxChartOfAccountId = result.id || 0;
        this.setParms.data.taxChartOfAccountSerialNumber =
          result.serialNumber || 0;
        this.setParms.data.taxChartOfAccountName = result.name;
      } else if (target == "OTax") {
        debugger;
        this.setParms.data.otherTaxChartOfAccountId = result.id || 0;
        this.setParms.data.otherTaxChartOfAccountSerialNumber =
          result.serialNumber || 0;
        this.setParms.data.otherTaxChartOfAccountName = result.name;
      }

      this.gridApi.refreshCells();
    });
  }

  calculateTaxAmount(params) {
    let { taxPercentage, amount } = params.data;
    if (amount && taxPercentage) {
      params.data.taxAmount = (taxPercentage / 100) * amount;
    }
    if (params.data.taxAmount) {
      params.data.amount = (params.data.amount || 0) + params.data.taxAmount;
    }
    // this.calculateTaxAmount(params),
    params.api.refreshCells();
  }

  calculateFinalAmount(params) {
    let {
      totalAmount,
      taxPercentage,
      amount = 0,
      otherTaxAmount,
      taxAmount,
    } = params.data;
    if (taxAmount && amount > 0) {
      params.data.amount = amount + taxAmount;
    }
    if (otherTaxAmount && amount > 0) {
      params.data.amount = amount + otherTaxAmount;
    }
    params.api.refreshCells();
  }

  // cellValueChanged(params) {
  //   debugger;
  //   let field = params.colDef.field;
  //   let { taxPercentage, totalAmount, otherTaxAmount, taxAmount, finalAmount } =
  //     params.data;
  //   if (field == "totalAmount") {
  //     if (taxPercentage) {
  //       params.data.taxAmount = (taxPercentage / 100) * totalAmount;
  //       params.data.finalAmount =
  //         totalAmount - (taxAmount + (otherTaxAmount || 0));
  //       // this.calculateTotalChequeAmount()
  //     }
  //     this.calculateTotalChequeAmount();
  //   }
  //   if (field == "taxPercentage") {
  //     if (totalAmount) {
  //       params.data.taxAmount = (taxPercentage / 100) * totalAmount;
  //       params.data.finalAmount =
  //         totalAmount - (taxAmount + (otherTaxAmount || 0));
  //     }
  //     this.calculateTotalChequeAmount();
  //   }
  //   if (field == "otherTaxAmount") {
  //     if (totalAmount) {
  //       params.data.finalAmount =
  //         totalAmount - (otherTaxAmount + (taxAmount || 0));
  //     }
  //     this.calculateTotalChequeAmount();
  //   }
  //   if (field == "qtyRequired" || field == "costRate") {
  //     if (params.data.qtyRequired && params.data.costRate) {
  //       params.data.totalAmount =
  //         params.data.qtyRequired * params.data.costRate;
  //       this.gridApi.refreshCells();
  //     }
  //   }
  // }

  cellValueChanged(params) {
    let field = params.colDef.field;
    let { taxPercentage, totalAmount, otherTaxAmount, taxAmount, finalAmount } =
      params.data;
    debugger;
    if (field === "totalAmount") {
      params.data.totalAmount = totalAmount;
      if (taxPercentage) {
        params.data.taxAmount = (taxPercentage / 100) * totalAmount;
        params.data.amount =
          totalAmount - (params.data.taxAmount + (otherTaxAmount || 0));
      }

      this.calculateTotalChequeAmount();
    }
    if (field === "taxPercentage") {
      if (totalAmount) {
        params.data.taxAmount = (taxPercentage / 100) * totalAmount;
        params.data.finalAmount =
          params.data.totalAmount -
          ((params.data.taxAmount || 0) + (otherTaxAmount || 0));
      }
      this.calculateTotalChequeAmount();
    }
    debugger;
    if (field === "otherTaxAmount") {
      if (finalAmount) {
        params.data.finalAmount =
          totalAmount - ((otherTaxAmount || 0) + (taxAmount || 0));
      }
      this.calculateTotalChequeAmount();
    }
    if (field === "qtyRequired" || field === "costRate") {
      if (params.data.qtyRequired && params.data.costRate) {
        params.data.amount = params.data.qtyRequired * params.data.costRate;
        this.gridApi.refreshCells();
      }
    }
  }

  // calculateTotalChequeAmount() {
  //   let totalChequeAmount = 0;
  //   let totalTaxAmount = 0;

  //   this.gridApi.forEachNode((node) => {
  //     let finalAmount = node.data.amount || 0;
  //     let taxAmount = node.data.taxAmount || 0;
  //     let otherTaxAmount = node.data.otherTaxAmount || 0;
  //     totalChequeAmount += finalAmount;
  //     totalTaxAmount += taxAmount + otherTaxAmount;
  //   });
  //   this.bankPaymentFG.patchValue({
  //     totalAmount: totalChequeAmount,
  //     totalTaxAmount,
  //   });
  //   this.gridApi.refreshCells();
  // }

  calculateTotalChequeAmount() {
    let totalChequeAmount = 0;
    let totalTaxAmount = 0;

    this.gridApi.forEachNode((node) => {
      let finalAmount = node.data.finalAmount || 0;
      let taxAmount = node.data.taxAmount || 0;
      let otherTaxAmount = node.data.otherTaxAmount || 0;
      totalChequeAmount += finalAmount;
      totalTaxAmount += taxAmount + otherTaxAmount;
    });
    this.bankPaymentFG.patchValue({
      totalAmount: totalChequeAmount,
      totalTaxAmount,
    });
    this.gridApi.refreshCells();
  }

  MakeVoucher(value?: Date) {
    if (value) {
      this.bankPaymentFG.value.issueDate = value;
    }
    let { issueDate, userLocationId } = this.bankPaymentFG.value;
    if (userLocationId && this.bankPaymentFG.value.issueDate) {
      this._bankPayment
        .getVoucherNumber(this.target, "CR", issueDate, userLocationId)
        .subscribe((voucherNumber) => {
          console.log(voucherNumber);
          this.bankPaymentFG.patchValue({ voucherNumber });
        });
    }
  }
  openOfficialReceipt() {
    debugger;
    this.displayOfficialReceipt = true;
    this.getOfficialReceipt();
  }
  getOfficialReceipt() {
    debugger;
    this._bankPayment
      .getAll("OfficialReceipt", this.dtoOf)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          debugger;
          this.messageService.add({
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
          debugger;
          this.officialReceiptData = response.items.filter(
            (item) => item.status == "APPROVED"
          );
        },
      });
  }
  selectOfficialReceipt(id?: number) {
    this._bankPayment
      .getDataForEdit(id, "OfficialReceipt")
      .pipe(
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe((response) => {
        const {
          employeeId,
          referenceDocumentNumber,
          officialReceiptDetails,
          costCenterName,
          projectName,
          referenceDate,
        } = response;
        debugger;
        this.bankPaymentFG.patchValue({
          referenceDate: new Date(referenceDate),
          referenceNumber: referenceDocumentNumber,
          referenceId: response.id,
          referenceVoucherNumber: response.voucherNumber,
        });

        // this.vehicleFuelRequisitionFG.patchValue({
        //   employeeId,
        //   employeeName,
        //   grossAmount: 0,
        // });
        debugger;
        this.rowData = officialReceiptDetails.map((item) => ({
          ...item,
          id: 0,
          supplierId: response.supplierId,
          supplierName: response.supplierName,
          supplierSerialNumber: response.supplierSerialNumber,
          chartOfAccountId: response.supplierChartOfAccountId,
          chartOfAccountName: response.supplierChartOfAccountName,
          chartOfAccountSerialNumber:
            response.supplierChartOfAccountSerialNumber,
          employeeId: response.employeeId,
          employeeName: response.employeeName,
          employeeErpId: response.employeeErpId,
          totalAmount: item.amount,
          finalAmount: item.amount,
        }));
        setTimeout(() => {
          this.gridApi.setRowData(this.rowData);
          this.calculateTotalChequeAmount();
        }, 0);

        // this.vehicleFuelRequisitionFG.value.grossAmount = this.rowData.reduce(
        //   (total, item) => total + (item.totalAmount || 0),
        //   0
        // );
        this.officialReceiptData = this.officialReceiptData.filter(
          (item) => item.id !== response.id
        );
        this.displayOfficialReceipt = false;
      });
  }

  onGlobalFilter(table: Table, event: Event) {
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "contains");
  }
  onPageChange(event: any) {
    debugger;
    this.dto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.dto.skipCount = (this.currentPage - 1) * 5;
    this._bankPayment.getAll(this.target, this.dto).subscribe({
      next: (response) => {
        debugger;

        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }
  downloadBPReport(id: number) {
    debugger;
    this._bankPayment.downloadBPReport(id, "PdfReport").subscribe(
      (response: any) => {
        const pdfLink = response;
        const fullPdfLink = `${newBaseUrl}${pdfLink}`;
        window.open(fullPdfLink, "_blank");
      },
      (error) => {
        console.error("Error generating report:", error);
      }
    );
  }
  VoucherRestriction(prefix: string) {
    this._restrictionService
      .getVoucherRestriction(prefix)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          debugger;
          this.restrictionDto = mapRestrictionDto(response.items[0]);
          console.log(this.restrictionDto);
        },
      });
  }
  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    debugger;
    this._financeModuleService
      .getDefaultLocation(target, filterId)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
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
          debugger;
          this.bankPaymentFG
            .get("userLocationName")
            .setValue(response.items[0].shortName);
          this.bankPaymentFG
            .get("userLocationId")
            .setValue(response.items[0].id);
          this.MakeVoucher();
        },
      });
  }
  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    debugger;
    this.dto.DocOrVocNumber = inputValue;
    debugger;

    this._bankPayment.getAll(this.target, this.dto).subscribe({
      next: (response) => {
        debugger;

        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }
}
