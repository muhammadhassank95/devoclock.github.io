import { Component, ViewChild } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { FinanceModuleService } from "@app/main/finance/Shared/Services/finance-module.service";
import { catchError, finalize, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import * as moment from "moment";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";

@Component({
  selector: "app-sales-invoice",
  templateUrl: "./sales-invoice.component.html",
})
export class SalesInvoiceComponent {
  restrictionDto: RestrictionDto = new RestrictionDto();
  salesInoviceForm: FormGroup;
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  dataForEdit: any;
  rowCount: number;
  rowData: any;
  ServiceQuotationData: any;
  today: Date = new Date();
  MinDate: Date = new Date();
  viewMode: boolean;
  displaySaleInvoice: boolean;
  currentPage = 1;
  loading: boolean;
  dto = {
    skipCount: 0,
    maxCount: 5,
    DocOrVocNumber: "",
  };

  constructor(
    private fb: FormBuilder,
    private _financeModuleService: FinanceModuleService,
    private _restrictionService: RestrictionService,
    private messageService: MessageService,
    private suggestionService: BsModalService,
    private confirmationService?: ConfirmationService
  ) {
    this.salesInoviceForm = this.fb.group({
      issueDate: ["", Validators.required],
      voucherNumber: [null, Validators.required],
      supplierId: [null, Validators.required],
      supplierName: [""],
      supplierSerialNumber: "",
      employeeId: [null],
      employeeName: [""],
      employeeErpId: "",
      salesmanName: [""],
      referenceNumber: [""],
      attentionPerson: [""],
      userLocationId: [null, [Validators.required]],
      userLocationName: ["", [Validators.required]],
      remarks: [""],
      grossAmount: [{ value: "", disabled: true }],
      totalAmount: [{ value: "", disabled: true }],
      gstPercentage: [{ value: "" }],
      gstAmount: [{ value: "" }],
      pstPercentage: [{ value: "" }],
      pstAmount: [{ value: "" }],
      designation: [""],
      invoiceSubmissionDate: [""],
      businessMonth: [""],
      costCenterId: "",
      costCenterName: "",
      projectId: "",
      projectName: "",
      // regionId: "",
      // regionName: "",
      // subject: "",
      // terms: "",
      // origin: "",
      // validity: "",
      // startingComments: "",
      // paragraph: "",
      // endingComments: "",
      voucherStatusId: "",
      voucherStatusName: "",
      pstChartOfAccountId: [""],
      pstChartOfAccountName: [""],
      pstChartOfAccountSerialNumber: "",
      serviceQuotationInvoiceDetails: [[]],
    });

    this.salesInoviceForm
      .get("gstPercentage")
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.salesInoviceForm.get("pstPercentage")?.disable();
        } else {
          this.salesInoviceForm.get("pstPercentage")?.enable();
        }
      });

    this.salesInoviceForm
      .get("pstPercentage")
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.salesInoviceForm.get("gstPercentage")?.disable();
        } else {
          this.salesInoviceForm.get("gstPercentage")?.enable();
        }
      });
  }

  target = "ServiceQuotationInvoice";
  data: any;
  count: number;
  saving: boolean;
  editMode: boolean;
  displayServiceQuotation: boolean;
  dialogVisibility: boolean;

  ngOnInit(): void {
    this.getAll();
    this.VoucherRestriction("SI");
  }

  colDefs: ColDef[] = [
    {
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      width: 90,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true,
    },
    {
      headerName: "Job ID",
      editable: false,
      field: "serviceItemId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Job Title",
      editable: false,
      field: "serviceItemName",
      width: 300,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Item ID",
      editable: false,
      field: "inventoryItemId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Item Title",
      editable: false,
      field: "inventoryItemName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "For Location ID",
      editable: false,
      field: "locationId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "For Location Title",
      editable: false,
      field: "locationName",
      resizable: true,
      width: 300,
      suppressSizeToFit: true,
    },
    {
      headerName: "Client Item Code",
      editable: false,
      field: "clientItemCode",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Client Item Title",
      editable: false,
      field: "clientItemTitle",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Remarks ",
      editable: false,
      field: "remarks",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Ref Voucher No ",
      editable: false,
      field: "referenceVoucherNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Offer Qty",
      editable: false,
      field: "offerQty",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Ack Client Qty",
      editable: false,
      field: "acknowledgedClientQty",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Final Qty",
      editable: false,
      field: "finalQty",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Gross Rate",
      editable: false,
      field: "grossRate",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Total Amount",
      editable: false,
      field: "totalAmount",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "GST %",
      editable: false,
      field: "gstPercentage",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "GST Amount",
      editable: false,
      field: "gstAmount",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "PST %",
      editable: false,
      field: "pstPercentage",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "PST Amount",
      editable: false,
      field: "pstAmount",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      field: "businessMonth",
      headerName: "Buy Date",
      editable: false,
      cellEditor: "agDateCellEditor",
      valueFormatter: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          return date.toISOString().split("T")[0]; // Format date as yyyy-mm-dd
        }
        return "";
      },
      valueParser: (params) => {
        return new Date(params.newValue); // Parse string to Date object
      },
    },
    {
      headerName: "Reference Number",
      editable: false,
      field: "referenceNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  show(id?: number) {
    if (id) {
      this._financeModuleService
        .getDataForEdit(id, this.target)
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
            this.dataForEdit = response;
            this.salesInoviceForm.patchValue({
              ...response,
              employeeErpId: this.dataForEdit.employeeErpId,
              issueDate: new Date(response.issueDate),
              invoiceSubmissionDate: new Date(response.invoiceSubmissionDate),
              businessMonth: new Date(response.businessMonth),
            });
            this.rowData = response.serviceQuotationInvoiceDetails;
            this.displaySaleInvoice = true;
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
      this.getDefaultLocation("Location", "locationName", "locationId", "");
      this.editMode = false;
      this.viewMode = false;
      this.rowData = [];
      this.displaySaleInvoice = true;
      this.salesInoviceForm.reset();
      this.salesInoviceForm.enable();
      this.salesInoviceForm.get("issueDate").setValue(this.today);
    }
  }

  getAll() {
    this._financeModuleService
      .getAll(this.target)
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
          this.data = response.items;
          this.count = response.totalCount;
        },
      });
  }

  create() {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.saving = true;
        var tempArr = [];
        this.gridApi.forEachNode((node, index) => {
          const { id, ...rest } = node.data;
          var tempObj = {
            ...rest,
            serviceQuotationDetailId: id,
          };
          tempArr.push(tempObj);
        });

        this.salesInoviceForm.patchValue({
          serviceQuotationInvoiceDetails: tempArr,
        });

        if (this.rowData.length < 1) {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Please add details",
            life: 2000,
          });
          this.saving = false;
          return;
        }
        this._financeModuleService
          .create(this.salesInoviceForm.value, this.target)
          .pipe(
            finalize(() => {
              this.saving = false;
            }),
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
              if (response) {
                debugger;
                this.messageService.add({
                  severity: "info",
                  summary: "Confirmed",
                  detail: "CreatedSuccessfully",
                  life: 2000,
                });
                this.saving = false;
                this.displaySaleInvoice = false;
                this.getAll();
              }
            },
          });
      },
    });
  }

  update() {
    debugger;
    this.saving = true;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      const { id, ...rest } = node.data;
      var tempObj = {
        ...rest,
        serviceQuotationDetailId: node.data.serviceQuotationDetailId,
      };
      tempArr.push(tempObj);
    });

    this.salesInoviceForm.patchValue({
      serviceQuotationInvoiceDetails: tempArr,
    });
    if (this.rowData.length < 1) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please add details",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    const updateData = {
      ...this.salesInoviceForm.value,
      id: this.dataForEdit.id,
    };
    this._financeModuleService
      .update(updateData, this.target)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
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
          this.messageService.add({
            severity: "success",
            summary: "Confirmed",
            detail: "UpdatedSuccessfully",
            life: 2000,
          });
          this.displaySaleInvoice = false;
          this.getAll();
          this.saving = false;
        },
      });
  }

  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.salesInoviceForm.value.issueDate = value;
    }
    if (
      this.salesInoviceForm.value.userLocationId &&
      this.salesInoviceForm.value.issueDate
    ) {
      this.getVoucherNumber();
    }
  }

  getVoucherNumber() {
    debugger;
    this._financeModuleService
      .getVoucherNumber(
        this.target,
        "SI",
        this.salesInoviceForm.value.issueDate,
        this.salesInoviceForm.value.userLocationId
      )
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
          this.salesInoviceForm.get("voucherNumber").setValue(response);
        },
        error: (err) => {
          console.log("An error occurred", err);
        },
      });
  }

  async getDefaultLocation(target: string, name: string, id: string, filterId) {
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
          this.salesInoviceForm
            .get("userLocationName")
            .setValue(response.items[0].shortName);
          this.salesInoviceForm
            .get("userLocationId")
            .setValue(response.items[0].id);
          this.getVoucherNumber();
        },
      });
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        debugger;
        this.salesInoviceForm.patchValue({
          userLocationId: value?.id,
          userLocationName: value.name,
        });
        this.getVoucherNumber();
        break;
      case "Supplier":
        this.salesInoviceForm.patchValue({
          supplierId: value.id,
          supplierName: value.title,
          supplierSerialNumber: value.serialNumber,
        });
        break;
      // case "Region":
      //   this.salesInoviceForm.patchValue({
      //     regionId: value.id,
      //     regionName: value.title,
      //   });
      //   break;
      case "Employee":
        this.salesInoviceForm.patchValue({
          employeeId: value.additional,
          employeeName: value.name,
          employeeErpId: value.id,
        });
        break;
      case "ChartOfAccount":
        this.salesInoviceForm.patchValue({
          pstChartOfAccountId: value.id,
          pstChartOfAccountName: value.name,
          pstChartOfAccountSerialNumber: value.serialNumber,
        });
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  onRemoveSelected() {
    debugger;
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const dataToRemove = selectedNodes.map((node) => node.data);
      this.rowData = this.rowData.filter(
        (row) =>
          !dataToRemove.some(
            (removeItem) => removeItem.generalLedgerId === row.generalLedgerId
          )
      );
      this.gridApi.setRowData(this.rowData);
      this.rowCount = this.gridApi.getDisplayedRowCount();
      this.gridApi.refreshCells();
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData = [];
    this.rowSelection = "multiple";
  }

  CloseModel() {
    this.viewMode = true;
    this.displaySaleInvoice = false;
  }

  viewOnly(id: any) {
    this.viewMode = true;
    this.editMode = false;
    this.show(id);
    // this.salesInoviceForm.disable();
    this.MinDate = null;
  }

  edit(id: any) {
    if (!this.restrictionDto.isEditAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Edit Restricted",
      });
      return;
    }
    this.editMode = true;
    this.viewMode = false;
    this.show(id);
    this.salesInoviceForm.enable();
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }

  OpenServiceInvoice() {
    debugger;
    this.displayServiceQuotation = true;
    this.GetServiceQuotation();
  }

  GetServiceQuotation() {
    this._financeModuleService
      .getAll("ServiceQuotation")
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
          this.ServiceQuotationData = response.items.filter(
            (item) =>
              item.linkedStatus == "PENDING" && item.status == "APPROVED"
          );
        },
      });
  }

  SelectServiceQuotation(id: number) {
    this._financeModuleService
      .getDataForEdit(id, "ServiceQuotation")
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
          this.salesInoviceForm.patchValue({
            attentionPerson: response.attentionPerson,
            // businessMonth: new Date(response.businessMonth),
            designation: response.designation,
            invoiceSubmissionDate: new Date(response.invoiceSubmissionDate),
            supplierId: response.supplierId,
            supplierName: response.supplierName,
            supplierSerialNumber: response.supplierSerialNumber,
            costCenterId: response.costCenterId,
            costCenterName: response.costCenterName,
            projectId: response.projectId,
            projectName: response.projectName,
            subject: response.subject,
            terms: response.terms,
            origin: response.origin,
            validity: response.validity,
            startingComments: response.startingComments,
            endingComments: response.endingComments,
            paragraph: response.paragraph,
            voucherStatusId: response.voucherStatusId,
            voucherStatusName: response.voucherStatusName,
            remarks: response.remarks,
            referenceNumber: response.referenceNumber,
          });

          // this.rowData = response.serviceQuotationDetails;
          this.rowData = [
            ...this.rowData,
            ...response.serviceQuotationDetails.map((item) => ({
              ...item,
              businessMonth: moment(response.businessMonth).format(
                "DD-MM-YYYY"
              ),
              referenceNumber: response.voucherNumber,
            })),
          ];
          this.gridApi.refreshCells();
          this.displayServiceQuotation = false;
          this.calculateTotalAmount();
          console.log(this.rowData);
        },
      });
  }

  approve(id) {
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
        this._financeModuleService
          .approve(id, this.target)
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
              if (response) {
                this.messageService.add({
                  severity: "info",
                  summary: "Confirmed",
                  detail: "Approved Successfully",
                  life: 2000,
                });
                this.getAll();
              }
            },
          });
      },
    });
  }

  delete(id: number) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._financeModuleService
          .delete(id, this.target)
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
              if (response) {
                this.messageService.add({
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

  OnCellValueChanged(params) {
    // debugger
    // this.calculateTotalAmount();
  }

  // calculateTotalAmount() {
  //   let total = 0;
  //   let gst = 0;
  //   let pst = 0;
  //   this.rowData.forEach((node) => {
  //     debugger;

  //     if (node.totalAmount) {
  //       total += +node.totalAmount;
  //     }

  //     if (node.gstAmount) {
  //       gst += +node.gstAmount;
  //     }

  //     if (node.pstAmount) {
  //       pst += +node.pstAmount;
  //     }
  //   });
  //   this.salesInoviceForm.get("grossAmount").setValue(total);
  //   this.salesInoviceForm.get("gstAmount").setValue(gst);
  //   this.salesInoviceForm.get("pstAmount").setValue(pst);
  //   debugger;
  //   const netAmount = total + gst + pst;
  //   this.salesInoviceForm.get("totalAmount").setValue(netAmount);
  // }
  calculateTotalAmount() {
    let total = 0;
    let gst = 0;
    let pst = 0;
    this.rowData.forEach((node) => {
      debugger;
      if (node.totalAmount) {
        total += +node.totalAmount;
      }
    });
    const gstPercent = this.salesInoviceForm.get("gstPercentage")?.value || 0;
    const pstPercent = this.salesInoviceForm.get("pstPercentage")?.value || 0;
    gst = (total * gstPercent) / 100;
    pst = (total * pstPercent) / 100;
    debugger;
    this.salesInoviceForm.get("grossAmount").setValue(total);
    this.salesInoviceForm.get("gstAmount").setValue(gst);
    this.salesInoviceForm.get("pstAmount").setValue(pst);
    const netAmount = total + gst + pst;
    this.salesInoviceForm.get("totalAmount").setValue(netAmount);
  }
  onGstPercentChange(): void {
    this.calculateTotalAmount();
  }

  onPstPercentChange(): void {
    this.calculateTotalAmount();
  }

  onPageChange(event: any) {
    debugger;
    this.dto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.dto.skipCount = (this.currentPage - 1) * 5;
    this._financeModuleService.getAll(this.target, this.dto).subscribe({
      next: (response) => {
        debugger;

        this.data = response.items;
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

    this._financeModuleService.getAll(this.target, this.dto).subscribe({
      next: (response) => {
        debugger;

        this.data = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
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
}
