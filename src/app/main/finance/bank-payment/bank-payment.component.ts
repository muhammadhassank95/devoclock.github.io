import { Component, ViewChild } from "@angular/core";
import { BankPaymentDto } from "../Shared/Dtos/bank-payment-dto";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { FinanceModuleService } from "../Shared/Services/finance-module.service";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, generate, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { mapRestrictionDto } from "@shared/Utials/utils";
import * as moment from "moment";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { Table } from "primeng/table";

@Component({
  selector: "app-bank-payment",
  templateUrl: "./bank-payment.component.html",
})
export class BankPaymentComponent {
  bankPaymentDto: BankPaymentDto = new BankPaymentDto();
  restrictionDto: RestrictionDto = new RestrictionDto();
  // voucherNumberFilter: any;
  tableData: any;
  count: number;
  displayModal: boolean;
  editMode: boolean;
  viewOnly: boolean;
  showGoto: boolean;
  // fiterDialog: boolean = false;
  isAdjustInvoicesModalVisible: boolean = false;
  saving: boolean;
  selectedAdjustmentEntries: any[];
  isFetchingVouchers: boolean = false;
  isCreatingBulkVouchers: boolean = false;
  target = "GeneralPayment";
  showSerialNumber: string;
  showErp: string;
  protected gridApi: GridApi;
  protected setParms;
  protected adjustModalGridApi: GridApi;
  protected adjustModalSetParams;
  rowSelection: string;
  rowCount: number;
  rowData: any;
  COAserialNumber: string;
  locationId: number;
  locationName: string;
  adjustModalGridData: [] = [];
  subledgersArray: string[] = [];
  chequeStart: string = "";
  chequeEnd: string = "";
  remarks: string = "";
  chartOfAccountId: number = 0;
  chartOfAccountName: string;
  narration: string = "";
  referenceTitle: string = "";
  userLocationId: number = 0;
  chartOfAccountBankName: string;
  referenceDate: string | Date;
  issueDate: string | Date;
  today: Date = new Date();
  MinDate: Date = new Date();
  referenceNo: string;
  userLocationName: string;
  bankAccountId: string;
  // bankPaymnetFilterFormGroup: FormGroup;
  bankPaymentFG: FormGroup;
  isLineSeparateVoucher: boolean = false;
  generateVoucherFormGroup: FormGroup;
  adjustInvoicesForm: FormGroup;
  coaIdForSubledger: string;
  currentPage = 1;
  loading: boolean;
  dto = {
    skipCount: 0,
    maxCount: 5,
    linkedDocument: 1,
    DocOrVocNumber: "",
  };
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
      filter: "agTextColumnFilter",
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
    {
      headerName: "",
      field: "addAccount",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Account Title",
      editable: false,
      field: "chartOfAccountName",
      filter: "agTextColumnFilter",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Supplier ID",
      editable: false,
      field: "supplierSerialNumber",
      filter: "agTextColumnFilter",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addSupplier",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Supplier Title",
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
    {
      headerName: "",
      field: "addLocation",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Location Title",
      editable: false,
      field: "locationName",
      filter: "agTextColumnFilter",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Region ID",
    //   editable: false,
    //   field: "regionId",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "",
    //   field: "addRegion",
    //   width: 20,
    //   editable: false,
    //   cellRenderer: this.addIconCellRendererFunc,
    //   resizable: false,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Region Title",
    //   editable: false,
    //   field: "regionName",
    //   filter: "agTextColumnFilter",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Employee ID",
      editable: false,
      field: "employeeErpId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addEmployee",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
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
    {
      headerName: "",
      field: "addCostCenter",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
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
    {
      headerName: "",
      field: "addProject",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
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
      field: "remarks",
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
      headerName: "Total Amt",
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
      field: "taxSerialNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Tax Acc ID",
    //   editable: false,
    //   field: "taxChartOfAccountId",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },

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
      headerName: "OTax Acc Title",
      editable: false,
      field: "otherTaxChartOfAccountName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "OTax Acc ID",
      editable: false,
      field: "OtaxSerialNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "OTax Acc ID",
    //   editable: false,
    //   field: "OtaxChartOfAccountId",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },

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
    {
      headerName: "generalLedgerId",
      editable: true,
      field: "generalLedgerId",
      resizable: false,
      cellEditor: "generalLedgerId",
      suppressSizeToFit: true,
    },
  ];

  adjustModalGridCols: ColDef[] = [
    {
      headerName: "Select",
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    // {
    //   headerName: "SrNo",
    //   editable: false,
    //   field: "srNo",
    //   sortable: true,
    //   valueGetter: "node.rowIndex+1",
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Document Number",
      editable: false,
      field: "voucherNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Account ID",
      editable: false,
      field: "chartOfAccountSerialNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Account Title",
      editable: false,
      field: "chartOfAccountName",
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
    {
      headerName: "Location Title",
      editable: false,
      field: "locationName",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Region ID",
    //   editable: false,
    //   field: "regionId",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Region Title",
    //   editable: false,
    //   field: "regionName",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Employee ID",
      editable: false,
      field: "employeeERPId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Employee Title",
      editable: false,
      field: "employeeName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Supplier ID",
      editable: false,
      field: "supplierSerialNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Supplier Title",
      editable: false,
      field: "supplierName",
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
    {
      headerName: "Project Title",
      editable: false,
      field: "projectName",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Narration",
    //   editable: true,
    //   field: "comments",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
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
    // {
    //   headerName: "Total Amt",
    //   editable: true,
    //   field: "totalAmount",
    //   cellEditor: "agNumberCellEditor",
    //   resizable: true,
    //   // onCellValueChanged: params => this.calculateTaxAmount(params),
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "",
    //   field: "addTaxId",
    //   width: 20,
    //   editable: false,
    //   cellRenderer: this.addIconCellRendererFunc,
    //   resizable: false,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Tax Acc Title",
    //   editable: false,
    //   field: "taxAccTitle",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Tax Acc ID",
    //   editable: false,
    //   field: "taxId",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Tax %",
    //   editable: true,
    //   field: "taxPercentage",
    //   cellEditorParams: {
    //     // min: 18,  // Minimum value
    //     max: 100, // Maximum value
    //   },
    //   cellEditor: "agNumberCellEditor",
    //   resizable: true,
    //   suppressSizeToFit: true,
    //   onCellValueChanged: (params) => this.calculateTaxAmount(params),
    // },
    // {
    //   headerName: "Tax Amt",
    //   editable: false,
    //   field: "taxAmount",
    //   cellEditor: "agNumberCellEditor",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "O. Tax Amt",
    //   editable: true,
    //   field: "otherTaxAmount",
    //   resizable: true,
    //   onCellValueChanged: (params) => this.calculateFinalAmount(params),
    //   cellEditor: "agNumberCellEditor",
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Balance",
      editable: false,
      field: "balance",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Debit",
      editable: false,
      field: "debit",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Credit",
      editable: false,
      field: "credit",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "generalLedgerId",
      editable: false,
      field: "generalLedgerId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "COA ID",
      editable: false,
      field: "chartOfAccountId",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  employeePaymentModeOptions: any[] = [
    { label: "Payment", value: "payment" },
    { label: "Cheque", value: "cheque" },
  ];

  ngOnInit() {
    this.VoucherRestriction("BP");

    this.bankPaymentFG = this.fb.group({
      id: [0],
      issueDate: [null, Validators.required],
      userLocationId: [null, [Validators.required]],
      userLocationName: [""],
      isCrossedCheque: [false],
      taxPayment: [false],
      chartOfAccountId: [null, [Validators.required]],
      chartOfAccountName: [""],
      taxAcId: [null],
      taxAcName: [""],
      OtherTaxAcId: [null],
      OtherTaxAcName: [""],
      chartOfAccountSerialNumber: "",
      showSerialNumberTax: "",
      showSerialNumberOTax: "",
      generalPaymentDetails: [[]],
      //forLocationId: [null, [Validators.required]],
      bankName: [""],
      showSerialNumberBank: "",
      referenceTitle: [""],
      utilizedChequeDetailId: [""],
      totalTaxAmonut: 0,
      totalAmount: 0,
      referenceNumber: [""],
      referenceDate: ["", [Validators.required]],
      totalTaxAmount: [0],
      totalChecqueAmount: [0],
      isCheque: [false],
      remarks: [""],
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
      remarks: [""],
      bankId: [null, [Validators.required]],
      bankName: [null, [Validators.required]],
      chequeNo: [null, [Validators.required]],
      // chequeNoN: [null, [Validators.required]],
      eachLineAsSeparateVoucher: [false],
    });
    this.generateVoucherFormGroup = this.fb.group({
      isDropdown: true,
      fromChartOfAccountId: "",
      coaFromName: null,
      toChartOfAccountId: "",
      coaToName: "",
      fromCostCenterId: "",
      costCenterFromName: "",
      toCostCenterId: "",
      costCenterToName: "",
      fromProjectId: "",
      projectFromName: "",
      toProjectId: "",
      projectToName: "",
      fromEmployeeId: "",
      toEmployeeId: "",
      empIdFromName: "",
      showSerialNumber: "",
      showSerialNumber2: "",
      showSerialNumber3: "",
      showSerialNumber4: "",
      showSerialNumber5: "",
      showSerialNumber6: "",
      showSerialNumber7: "",
      showSerialNumber8: "",
      status: "PENDING",
      empIdTo: "",
      empIdToName: "",
      fromSupplierId: "",
      fromSupplierName: "",
      toSupplierId: "",
      toSupplierName: "",
      fromClientId: "",
      fromClientName: "",
      toClientId: "",
      toClientName: "",
      fromPattyId: "",
      fromPattyName: "",
      toPattyId: "",
      toPattyName: "",
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

    // this.bankPaymnetFilterFormGroup = this.fb.group({
    //   voucherNumber: "",
    // });
    this.getAll();
  }
  // mapDateOrDefault(
  //   dateString: string | null | undefined,
  //   defaultDate: string
  // ): string {
  //   return dateString ? new Date(dateString).toISOString() : defaultDate;
  // }
  // isrestrictionAllowed(dateString: string | null | undefined): boolean {
  //   debugger;
  //   if (dateString) {
  //     return this.today > new Date(dateString) ? true : false;
  //   } else {
  //     return false;
  //   }
  // }
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
  handleOpenAdjustVoucherModal() {
    this.isAdjustInvoicesModalVisible = true;
    const financialYear = JSON.parse(
      localStorage.getItem("FinancialYearObject")
    );
    const startDate = financialYear?.startDate
      ? new Date(financialYear.startDate)
      : new Date();
    this.generateVoucherFormGroup.get("startDate").setValue(startDate);
    this.generateVoucherFormGroup.get("endDate").setValue(new Date());
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
        supplierId = node.data.supplierId,
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
        supplierId,
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

  // handleApplyAdjustedVouchersData() {
  //   let filteredNodes = [];
  //   debugger;
  //   const selectedNodes = this.adjustModalGridApi.getSelectedNodes();
  //   // const selectedData = selectedNodes.map((node) => ({ ...node.data, generalLedgerId: 0, id: null, isAdjustmentEntry: true }));
  //   var new_totalAmount = 0;
  //   const selectedData = selectedNodes.map((node) => {
  //     let totalAmount = 0;

  //     // If debit is 0, assign credit to totalAmount
  //     if (node.data.debit === 0) {
  //       totalAmount = node.data.credit;
  //     }
  //     // If credit is 0, assign debit to totalAmount
  //     else if (node.data.credit === 0) {
  //       totalAmount = node.data.debit;
  //     }
  //     let obj = {
  //       ...node.data,
  //       generalLedgerId: node.data.generalLedgerId,
  //       isAdjustmentEntry: true,
  //       totalAmount: node.data.credit,
  //       finalAmount: node.data.credit,
  //     };
  //     delete obj.id;
  //     new_totalAmount += node.data.credit;
  //     return obj;
  //   });
  //   debugger;
  //   this.bankPaymentFG.get("totalChequeAmount").setValue(new_totalAmount);
  //   const rowData = this.rowData.map((node) => (node.data ? node.data : node));
  //   console.log(this.rowData);
  //   selectedData.forEach((el) => {
  //     debugger;
  //     if (rowData.some((row) => row.generalLedgerId === el.generalLedgerId)) {
  //       debugger;

  //       console.error(`This row data is already selected:`, el);
  //       this.messageService.add({
  //         severity: "Warning",
  //         detail: "This row data is already selected",
  //       });
  //     } else {
  //       filteredNodes.push(el);
  //     }
  //   });
  //   // let filteredNodes = selectedData.filter((el) => !rowData.includes(el));
  //   this.rowData = [...rowData, ...filteredNodes];
  //   this.isAdjustInvoicesModalVisible = false;
  // }

  handleApplyAdjustedVouchersData() {
    let filteredNodes = [];
    debugger;
    const selectedNodes = this.adjustModalGridApi.getSelectedNodes();
    var new_totalAmount = 0;

    const selectedData = selectedNodes.map((node) => {
      let totalAmount = 0;
      if (node.data.debit === 0) {
        totalAmount = node.data.credit;
      } else if (node.data.credit === 0) {
        totalAmount = node.data.debit;
      } else {
        totalAmount = node.data.credit;
      }

      let obj = {
        ...node.data,
        generalLedgerId: node.data.generalLedgerId,
        isAdjustmentEntry: true,
        totalAmount: totalAmount,
        finalAmount: totalAmount,
      };

      delete obj.id;
      new_totalAmount += totalAmount;
      return obj;
    });

    debugger;
    this.bankPaymentFG.get("totalAmount").setValue(new_totalAmount);

    const rowData = this.rowData.map((node) => (node.data ? node.data : node));

    console.log(this.rowData);

    selectedData.forEach((el) => {
      debugger;
      if (rowData.some((row) => row.generalLedgerId === el.generalLedgerId)) {
        debugger;
        console.error(`This row data is already selected:`, el);
        this.messageService.add({
          severity: "Warning",
          detail: "This row data is already selected",
        });
      } else {
        filteredNodes.push(el);
        this.subledgersArray.push(String(el["supplierId"] ?? ""));
      }
    });

    this.rowData = [...rowData, ...filteredNodes];
    this.isAdjustInvoicesModalVisible = false;
    console.log(this.subledgersArray);

    if (this.allElementsSame(this.subledgersArray)) {
      if (this.subledgersArray[0] !== "0") {
        this._bankPayment
          .getSubledgerTitle(this.subledgersArray[0])
          .subscribe((result) => {
            console.log(result);
            debugger;
            this.bankPaymentFG
              .get("referenceTitle")
              .setValue(result.items[0].chequeTitle);
          });
      }

      console.log("All elements in subledgersArray have the same value.");
    } else {
      console.log("subledgersArray contains different values.");
    }
  }
  allElementsSame(array: any[]): boolean {
    return array.every((value) => value === array[0]);
  }

  // Usage

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
          this.tableData = response.items.filter(
            (item) => item.linkedDocument === 1
          );
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
      referenceTitle: this.referenceTitle,
      referenceDate: moment(this.referenceDate).format("YYYY-MM-DD"),
      referenceNo: this.referenceNo,
      linkedDocument: 1,
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
    debugger;
    if (!this.restrictionDto.isApprovalAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Approve Restricted",
      });
      return;
    }
    debugger;
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
  show(id?: number, view?: boolean) {
    debugger;
    if (id) {
      if (!view && !this.restrictionDto.isEditAllowed) {
        this.messageService.add({
          severity: "info",
          summary: "Info",
          detail: "Edit Restricted",
        });
        return;
      }

      this.editMode = true;
      if (view) {
        this.viewOnly = view;
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
            this.bankPaymentFG
              .get("isCheque")
              ?.valueChanges.subscribe((isChequeValue) => {
                if (isChequeValue) {
                  this.bankPaymentFG.patchValue({
                    referenceNumber: null,
                  });
                }
              });
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
      debugger;
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.bankPaymentFG.enable();
      this.editMode = false;
      this.viewOnly = false;
      this.displayModal = true;
      this.bankPaymentDto = new BankPaymentDto();
      this.bankPaymentFG.reset();
      this.rowData = [];
      this.bankPaymentFG.get("issueDate").setValue(this.today);
      this.getDefaultLocation("Location", "locationName", "locationId", "");
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
    this.generateVoucherFormGroup.value.isDropdown = true;

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
    // if (this.bankPaymentFG.invalid) {
    //   this.bankPaymentFG.markAllAsTouched();
    //   return;
    // }
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
    let messageShown = false; // Flag to check if message has been shown
    this.gridApi.forEachNode((node, index) => {
      let bankPaymentInfoDetailObj = {};

      Object.keys(node.data).forEach((key) => {
        if (
          key === "locationId" ||
          key === "projectId" ||
          key === "costCenterId" ||
          key === "consumptionMonth" ||
          key === "chartOfAccountId"
        ) {
          if (!node.data[key] && !messageShown) {
            this.messageService.add({
              severity: "error",
              detail:
                "COA, Project, CostCenter, Location and Budget Month are Required",
            });
            messageShown = true; // Set flag to true to prevent further messages
          }
        }

        if (messageShown) return; // Break out of the loop if message shown

        if (
          key === "taxPercentage" ||
          key === "othertaxAmount" ||
          key === "generalLedgerId" ||
          key === "taxAmount" ||
          key === "supplierId" ||
          key === "otherTaxChartOfAccountId" ||
          key === "employeeId" ||
          key === "taxAmount" ||
          key === "otherTaxAmount"
        ) {
          // Set default to 0 if the value is null or undefined
          bankPaymentInfoDetailObj[key] = node.data[key] ?? 0;
        } else if (key !== "OtaxSerialNumber" && key !== "taxSerialNumber") {
          // Copy other properties as they are (excluding specific keys)
          bankPaymentInfoDetailObj[key] = node.data[key];
        }
      });
      bankPaymentInfoDetailObj["id"] = 0;
      bankPaymentInfoDetails.push(bankPaymentInfoDetailObj);
    });
    this.bankPaymentFG.patchValue({
      generalPaymentDetails: bankPaymentInfoDetails,
    });

    this.bankPaymentFG.value.id = 0;

    if (this.bankPaymentFG.value.isCrossedCheque == null) {
      this.bankPaymentFG.value.isCrossedCheque = false;
    }
    this.bankPaymentFG.value.isCheque =
      this.bankPaymentFG.value.isCheque ?? false;

    if (this.bankPaymentFG.value.OtherTaxAcId == null) {
      this.bankPaymentFG.value.OtherTaxAcId = 0;
    }
    if (this.bankPaymentFG.value.forLocationId == null) {
      this.bankPaymentFG.value.forLocationId = 0;
    }
    if (this.bankPaymentFG.value.taxAcId == null) {
      this.bankPaymentFG.value.taxAcId = 0;
    }
    if (this.bankPaymentFG.value.utilizedChequeDetailId == null) {
      this.bankPaymentFG.value.utilizedChequeDetailId = 0;
    }
    if (this.bankPaymentFG.value.totalTaxAmount == null) {
      this.bankPaymentFG.value.totalTaxAmount = 0;
    }
    // this.bankPaymentFG.value.isCheque = !this.bankPaymentFG.value.isCheque;
    this.bankPaymentFG.value.linkedDocument = 1;
    this.bankPaymentFG.value.totalAmount = this.bankPaymentFG.value.totalAmount;
    if (messageShown) return;
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
        if (key !== "OtaxSerialNumber" && key !== "taxSerialNumber") {
          bankPaymentInfoDetailObj[key] = node.data[key];
        }
      });
      bankPaymentInfoDetails.push(bankPaymentInfoDetailObj);
    });
    this.bankPaymentFG.patchValue({
      generalPaymentDetails: bankPaymentInfoDetails,
    });
    this.bankPaymentFG.value.linkedDocument = 1;

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
    debugger;
    switch (title) {
      case "Location":
        this.userLocationId = +value.id;
        this.userLocationName = value.name;
        break;
      case "Bank":
        this.chartOfAccountName = value.name;
        this.chartOfAccountId = +value.id;
        this.showSerialNumber = value.serialNumber;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  setPickerValue(value: any, title: string, title2: string = "") {
    debugger;
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

        this.bankAccountId = value.id;
        break;
      case "ChequeBook":
        this.bankPaymentFG.patchValue({
          referenceNumber: value.name,
          utilizedChequeDetailId: value.id,
        });
        break;
      case "TaxAcId":
        this.bankPaymentFG.patchValue({
          taxAcName: value.name,
          taxAcId: value.id,
          showSerialNumberTax: value.serialNumber,
        });
        this.updateGridRowsTaxAcGlobally();
        break;
      case "OTaxAcId":
        this.bankPaymentFG.patchValue({
          otherTaxAcName: value.name,
          otherTaxAcId: value.id,
          showSerialNumberOTax: value.serialNumber,
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
    debugger;
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
          fromChartOfAccountId: value.id?.split("/")[0] || "",
          showSerialNumber: value.id?.split("/")[1] || "",
          coaFromName: value.name,
        });
        break;
      case "To A/c":
        console.log(value, title);
        this.generateVoucherFormGroup.patchValue({
          toChartOfAccountId: value.id?.split("/")[0] || "",
          showSerialNumber2: value.id?.split("/")[1] || "",
          coaToName: value.name,
        });
        break;
      case "Project From":
        debugger;
        console.log(value, title);
        this.generateVoucherFormGroup.patchValue({
          fromProjectId: +value.id || "",
          projectFromName: value.name,
        });
        break;
      case "Project To":
        console.log(value, title);
        this.generateVoucherFormGroup.patchValue({
          toProjectId: +value.id || "",
          projectToName: value.name,
        });
        break;
      case "C.C. From":
        console.log(value, title);
        this.generateVoucherFormGroup.patchValue({
          fromCostCenterId: +value.id || "",
          costCenterFromName: value.name,
        });
        break;
      case "C.C. To":
        this.generateVoucherFormGroup.patchValue({
          toCostCenterId: +value.id || "",
          costCenterToName: value.name,
        });
        console.log(value, title);
        break;
      case "Employee From":
        console.log(value, title);
        this.generateVoucherFormGroup.patchValue({
          fromEmployeeId: +value.additional || "",
          showErp: value.id,
          empIdFromName: value.name,
        });
        break;
      case "Employee To":
        console.log(value, title);
        this.generateVoucherFormGroup.patchValue({
          toEmployeeId: +value.additional || "",
          showErp: value.id,
          empIdToName: value.name,
        });

        break;
      case "Supplier From":
        console.log(value, title);
        this.generateVoucherFormGroup.patchValue({
          fromSupplierId: value.id,
          showSerialNumber3: value.serialNumber,
          fromSupplierName: value.title,
        });
        break;
      case "Supplier To":
        this.generateVoucherFormGroup.patchValue({
          toSupplierId: value.id,
          showSerialNumber4: value.serialNumber,
          toSupplierName: value.title,
        });
        console.log(value, title);
        break;
      case "Client From":
        console.log(value, title);
        this.generateVoucherFormGroup.patchValue({
          fromClientId: value.id,
          showSerialNumber5: value.serialNumber,
          fromClientName: value.title,
        });
        break;
      case "Client To":
        this.generateVoucherFormGroup.patchValue({
          toClientId: value.id,
          showSerialNumber6: value.serialNumber,
          toClientName: value.title,
        });
        console.log(value, title);
        break;
      case "Patty From":
        console.log(value, title);
        this.generateVoucherFormGroup.patchValue({
          fromPattyId: value.id,
          showSerialNumber7: value.serialNumber,
          fromPattyName: value.title,
        });
        break;
      case "Patty To":
        this.generateVoucherFormGroup.patchValue({
          toPattyId: value.id,
          showSerialNumber8: value.serialNumber,
          toPattyName: value.title,
        });
        console.log(value, title);
        break;
      case "Bank":
        console.log(value, title);
        this.generateVoucherFormGroup.patchValue({
          bankId: value.id || "",
          bankName: value.name,
          showSerialNumber: value.serialNumber,
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
      node.data.taxChartOfAccountId =
        this.bankPaymentFG.value.taxChartOfAccountId;
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

  onAddRow() {
    const newItem: Record<string, any> = {};
    this.colDefs.forEach((colDef) => {
      if (colDef.field) {
        newItem[colDef.field] = null;
      }
    });
    this.gridApi.applyTransaction({ add: [newItem] });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

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
      case "addSupplier":
        this.setParms = params;
        debugger;
        this.openSelectItem("Subledger", "Subledger");
        break;
      case "addLocation":
        this.setParms = params;
        this.openSelectItem("Location");
        break;
      case "addRegion":
        this.setParms = params;
        this.openSelectItem("Region");
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
      | "Subledger"
      | "Location"
      | "Region"
      | "Employee"
      | "CostCenter"
      | "Project"
      | "Tax"
      | "OTax",
    filterWiseChartOfAccTarget?: string
  ) {
    const initialState: any = {
      target: target,
      coaIdForSubledger: this.coaIdForSubledger,
    };
    if (filterWiseChartOfAccTarget === "Subledger") {
      initialState.chartOfAccountSubLedgerType =
        "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18";
    } else if (filterWiseChartOfAccTarget) {
      initialState.filterWiseChartOfAccTarget = filterWiseChartOfAccTarget;
    }
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );

    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      debugger;
      if (target == "ChartOfAccount") {
        this.setParms.data.chartOfAccountSerialNumber =
          result.id.split("/")[1] || 0;
        this.setParms.data.chartOfAccountId = +result.id.split("/")[0] || 0;
        this.setParms.data.chartOfAccountName = result.name;
        this.coaIdForSubledger = result.id.split("/")[0];
      } else if (target == "Subledger") {
        this.setParms.data.supplierId = +result.id;
        this.setParms.data.supplierSerialNumber = result.serialNumber;
        this.setParms.data.supplierName = result.title;
        this.setParms.data.chartOfAccountSerialNumber =
          result.chartOfAccountSerialNumber;
        this.setParms.data.chartOfAccountId = result.chartOfAccountId;
        this.setParms.data.chartOfAccountName = result.chartOfAccountName;
        this.bankPaymentFG.get("referenceTitle").setValue(result.chequeTitle);
      } else if (target == "Location") {
        this.setParms.data.locationId = +result.id.split("/")[0];
        this.setParms.data.locationName = result.name;
        // } else if (target == "Region") {
        //   this.setParms.data.regionId = +result.id;
        //   this.setParms.data.regionName = result.name;
      } else if (target == "Employee") {
        this.setParms.data.employeeId = +result.additional || 0;
        this.setParms.data.employeeName = result.name;
        this.setParms.data.employeeErpId = result.id;
      } else if (target == "CostCenter") {
        this.setParms.data.costCenterId = +result.id.split("/")[0];
        this.setParms.data.costCenterName = result.name;
      } else if (target == "Project") {
        this.setParms.data.projectId = +result.id.split("/")[0];
        this.setParms.data.projectName = result.name;
      } else if (target == "Tax") {
        debugger;
        this.setParms.data.taxChartOfAccountId = result.id || 0;
        this.setParms.data.taxChartOfAccountName = result.name;
        this.setParms.data.taxSerialNumber = result.serialNumber;
      } else if (target == "OTax") {
        debugger;
        this.setParms.data.otherTaxChartOfAccountId = result.id || 0;
        this.setParms.data.otherTaxChartOfAccountName = result.name;
        this.setParms.data.OtaxSerialNumber = result.serialNumber;
      }
      debugger;
      this.gridApi.refreshCells();
    });
  }

  calculateTaxAmount(params) {
    let { totalAmount, taxPercentage, amount } = params.data;
    if (totalAmount && taxPercentage) {
      params.data.taxAmount = (taxPercentage / 100) * totalAmount;
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

  cellValueChanged(params) {
    let field = params.colDef.field;
    let { taxPercentage, totalAmount, otherTaxAmount, taxAmount, finalAmount } =
      params.data;

    if (field === "totalAmount") {
      params.data.finalAmount = totalAmount;
      if (taxPercentage) {
        params.data.taxAmount = (taxPercentage / 100) * totalAmount;
        params.data.finalAmount =
          totalAmount - (params.data.taxAmount + (otherTaxAmount || 0));
      }

      this.calculateTotalChequeAmount();
    }
    if (field === "taxPercentage") {
      if (totalAmount) {
        params.data.taxAmount = (taxPercentage / 100) * totalAmount;
        params.data.finalAmount =
          totalAmount - (params.data.taxAmount + (otherTaxAmount || 0));
      }
      this.calculateTotalChequeAmount();
    }
    if (field === "otherTaxAmount") {
      if (totalAmount) {
        params.data.finalAmount =
          totalAmount - (otherTaxAmount + (taxAmount || 0));
      }
      this.calculateTotalChequeAmount();
    }
    if (field === "qtyRequired" || field === "costRate") {
      if (params.data.qtyRequired && params.data.costRate) {
        params.data.totalAmount =
          params.data.qtyRequired * params.data.costRate;
        this.gridApi.refreshCells();
      }
    }
  }

  // calculateTotalChequeAmount() {
  //   let totalChequeAmount = 0;
  //   let totalTaxAmount = 0;
  //   this.gridApi.forEachNode((node, index) => {
  //     totalChequeAmount += node.data.credit;
  //     totalTaxAmount +=
  //       (node.data.taxAmount || 0) + (node.data.otherTaxAmount || 0);
  //   });
  //   this.bankPaymentFG.patchValue({ totalChequeAmount, totalTaxAmount });
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
        .getVoucherNumber(this.target, "BP", issueDate, userLocationId)
        .subscribe((voucherNumber) => {
          console.log(voucherNumber);
          this.bankPaymentFG.patchValue({ voucherNumber });
        });
    }
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }
  toggleCheque() {
    const isChequeControl = this.bankPaymentFG.get("isCheque").value;
    if (isChequeControl) {
      isChequeControl.setValue(!isChequeControl.value);
    }
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
}
