import { Component, Injector, Input, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  Router,
  RouterEvent,
  NavigationEnd,
  PRIMARY_OUTLET,
} from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { MenuItem } from "@shared/layout/menu-item";

@Component({
  selector: "sidebar-menu",
  templateUrl: "./sidebar-menu.component.html",
})
export class SidebarMenuComponent extends AppComponentBase implements OnInit {
  menuItems: MenuItem[];
  menuItemsMap: { [key: number]: MenuItem } = {};
  activatedMenuItems: MenuItem[] = [];
  routerEvents: BehaviorSubject<RouterEvent> = new BehaviorSubject(undefined);
  // homeRoute = "/app/users";
  homeRoute = "/app/dashboard";
  @Input() sidebarExpanded: boolean = true;

  constructor(injector: Injector, private router: Router) {
    super(injector);
  }

  ngOnInit(): void {
    this.menuItems = this.getMenuItems();
    this.patchMenuItems(this.menuItems);

    this.router.events.subscribe((event: NavigationEnd) => {
      const currentUrl = event.url !== "/" ? event.url : this.homeRoute;
      const primaryUrlSegmentGroup =
        this.router.parseUrl(currentUrl).root.children[PRIMARY_OUTLET];
      if (primaryUrlSegmentGroup) {
        this.activateMenuItems("/" + primaryUrlSegmentGroup.toString());
      }
    });

    console.log("/ ********************************************* /");
    console.log(this.router.parseUrl);

    // this.menuItems.filter(i => i.children.forEach(i => {

    // }))
    this.deactivateMenuItems(this.menuItems);

    const activeRoute = localStorage.getItem('activeMenuRoute') || this.router.url;
    this.setActiveMenuItem(activeRoute);
    this.restoreMenuState();
    this.highlightActiveMenu();
  }

  getMenuItems(): MenuItem[] {
    return [
      new MenuItem(
        this.l("Dashboard"),
        "/app/dashboard",
        "fas fa-dashboard",
        "Pages.Users"
      ),
      new MenuItem(this.l("Main Setups"), "", " fa-user fa-regular", "", [
        new MenuItem(
          this.l("Global Integration Settings"),
          "/app/main/integration/defaults",
          "fas fa-globe",
          ""
        ),
        new MenuItem(
          this.l("Project"),
          "/app/main/budget/project-tab",
          "fas fa-user",
          ""
        ),
        new MenuItem(
          this.l("Cost Center"),
          "/app/main/budget/cost-center-tab",
          "fas fa-user",
          ""
        ),
        new MenuItem(
          this.l("Chart Of Account"),
          "/app/main/budget/chart-of-account-tab",
          "fas fa-user",
          ""
        ),
        new MenuItem(
          this.l("Sub Ledger"),
          "/app/main/budget/supplier-tab",
          "fas fa-user",
          ""
        ),
        // new MenuItem(
        //   this.l("UOM"),
        //   "/app/main/inventory/uom",
        //   "fas fa-theater-masks",
        //   "Pages.Roles"
        // ),
        new MenuItem(
          this.l("Unit"),
          "/app/main/inventory/stock-unit",
          "fas fa-theater-masks",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Location"),
          "/app/main/hrm/location",
          "fas fa-theater-masks",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Financial Year"),
          "/app/main/hrm/financial-year",
          "fas fa-theater-masks",
          "Pages.Roles"
        ),

        // new MenuItem(
        //   this.l("Cities"),
        //   "/app/main/inventory/uom",
        //   "fas fa-theater-masks",
        //   "Pages.Roles"
        // ),
        new MenuItem(
          this.l("Currencies"),
          "/app/main/hrm/currency",
          "fas fa-solid fa-hands-holding",
          ""
        ),
        new MenuItem(
          this.l("Region"),
          "/app/main/budget/region",
          "fas fa-theater-masks",
          ""
        ),
        new MenuItem(
          this.l("Hierarchy Linking"),
          "/app/main/budget/hierarchy-linking",
          "fas fa-theater-masks",
          ""
        ),
        new MenuItem(
          this.l("Voucher Restriction"),
          "/app/main/budget/voucher-restriction",
          "fas fa-theater-masks",
          ""
        ),
        // new MenuItem(
        //   this.l("Tracing"),
        //   "/app/main/inventory/all-tracing",
        //   "fas fa-theater-masks",
        //   ""
        // ),
        new MenuItem(
          this.l("SQL Backup"),
          "/app/main/reports/SQL-backup",
          "fas fa-solid fa-hands-holding",
          ""
        ),
      ]),

      new MenuItem(this.l("Budget"), "", "fas fa-file-invoice-dollar", "", [
        new MenuItem(
          this.l("Annual Budget"),
          "/app/main/budget/annual-budget",
          "fas fa-file-invoice-dollar",
          "LookUps.YearlyBudget"
        ),
        new MenuItem(
          this.l("Monthly Budget"),
          "/app/main/budget/monthly-budget",
          "fas fa-file-invoice-dollar",
          "LookUps.YearlyBudget"
        ),
      ]),

      new MenuItem(this.l("HRM"), "", " fa-user fa-regular", "", [
        new MenuItem(
          this.l("HRM Setup"),
          "/app/main/hrm/setup-forms",
          "fas fa-theater-masks",
          ""
        ),
        new MenuItem(
          this.l("Employee"),
          "/app/main/hrm/employee",
          "fas fa-user",
          ""
        ),
        new MenuItem(
          this.l("Loan Forms"),
          "/app/main/hrm/hrm-loan-setup",
          "fas fa-landmark"
        ),
        new MenuItem(
          this.l("Leave Management"),
          "/app/main/hrm/leave-management",
          "fas fa-solid fa-cash-register",
          ""
        ),
        new MenuItem(
          this.l("HRM Transitions"),
          "/app/main/hrm/transition",
          "fas fa-solid fa-arrow-right-arrow-left",
          ""
        ),
        new MenuItem(
          this.l("Salaries"),
          "/app/main/hrm/salaries",
          "fas fa-solid fa-wallet",
          ""
        ),
        new MenuItem(
          this.l("Hold Salary"),
          "/app/main/hrm/hold-salary",
          "fas fa-solid fa-hands-holding",
          ""
        ),
        new MenuItem(
          this.l("Attendance"),
          "/app/main/hrm/attendance",
          "fas fa-solid fa-clipboard-user",
          ""
        ),
        new MenuItem(
          this.l("Appointment Letter"),
          "/app/main/hrm/appointment-letter",
          "fas fa-solid fa-clipboard-user",
          ""
        ),
        new MenuItem(
          this.l("Final Settlement"),
          "/app/main/hrm/finall-Settlement",
          "fas fa-handshake",
          ""
        ),
        new MenuItem(
          this.l("Provident Fund Profit"),
          "/app/main/hrm/pfp",
          "fas fa-person-circle-plus",
          ""
        ),
        new MenuItem(this.l("Policies"), "", "fas fa-folder-open", "", [
          new MenuItem(
            this.l("EOBI Policy"),
            "/app/main/hrm/eobi-policy",
            "fas fa-file-contract",
            ""
          ),
          new MenuItem(
            this.l("Social Security Policy"),
            "/app/main/hrm/ss-policy",
            "fas fa-shield-alt",
            ""
          ),
          new MenuItem(
            this.l("Leave Encashment Policy"),
            "/app/main/hrm/le-policy",
            "fas fa-money-check-alt",
            ""
          ),
          new MenuItem(
            this.l("Annual Leave Encashment"),
            "/app/main/hrm/annual-le-policy",
            "fas fa-file-contract",
            ""
          ),
          new MenuItem(
            this.l("Over Time Policy"),
            "/app/main/hrm/ov-policy",
            "fas fa-clock",
            ""
          ),
          new MenuItem(
            this.l("Incom Tax Policy"),
            "/app/main/hrm/tax-policy",
            "fas fa-coins",
            ""
          ),
          new MenuItem(
            this.l("Leave Policy"),
            "/app/main/hrm/leave-policy",
            "fas fa-calendar-alt",
            ""
          ),
          new MenuItem(
            this.l("Provident Fund Policy"),
            "/app/main/hrm/providentFund-policy",
            "fas fa-hand-holding-usd",
            ""
          ),
          new MenuItem(
            this.l("Manual OverTime"),
            "/app/main/hrm/manual-overtime",
            "fas fa-calendar-alt",
            ""
          ),
          new MenuItem(
            this.l("Salary Structure"),
            "/app/main/hrm/salary-structure-policy",
            "fas fa-money-bill",
            ""
          ),
        ]),
      ]),

      new MenuItem(this.l("IMS"), "", "fas fa-truck-moving fa-regular", "", [
        new MenuItem("IMS Setups", "", "fas fa-theater-masks", "", [
          new MenuItem(
            this.l("Stock Items"),
            "/app/main/inventory/stock-setups",
            "fas fa-theater-masks",
            "Pages.Roles"
          ),
          new MenuItem(
            this.l("Fixed Asset Items"),
            "/app/main/inventory/fixed-setups",
            "fas fa-theater-masks",
            "Pages.Roles"
          ),
          new MenuItem(
            this.l("Item Size"),
            "/app/main/inventory/item-size",
            "fas fa-theater-masks",
            "Pages.Roles"
          ),
          new MenuItem(
            this.l("Basic Type"),
            "/app/main/inventory/basic-type",
            "fas fa-theater-masks",
            "Pages.Roles"
          ),
          new MenuItem(
            this.l("Material Type"),
            "/app/main/inventory/material-type",
            "fas fa-theater-masks",
            "Pages.Roles"
          ),
          // new MenuItem(
          //   this.l("Stock Unit"),
          //   "/app/main/inventory/stock-unit",
          //   "fas fa-theater-masks",
          //   "Pages.Roles"
          // ),
          // new MenuItem(
          //     this.l("Category"),
          //     "/app/main/inventory/category-id",
          //     "fas fa-theater-masks",
          //     "Pages.Roles"
          // ),
          // new MenuItem(
          //     this.l("Sub-Category"),
          //     "/app/main/inventory/subcategory-id",
          //     "fas fa-theater-masks",
          //     "Pages.Roles"
          // ),
          // new MenuItem(
          //   this.l("Unit"),
          //   "/app/main/inventory/unit-id",
          //   "fas fa-theater-masks",
          //   "Pages.Roles"
          // ),

          // new MenuItem(
          //   this.l("UOM"),
          //   "/app/main/inventory/uom",
          //   "fas fa-theater-masks",
          //   "Pages.Roles"
          // ),
          // new MenuItem(
          //   this.l("OHJob"),
          //   "/app/main/inventory/ohjob",
          //   "fas fa-theater-masks",
          //   "Pages.Roles"
          // ),
        ]),

        new MenuItem(
          this.l("IMS Transactions"),
          "",
          "fas fa-file-invoice-dollar",
          "",
          [
            new MenuItem(
              this.l("Capitalization Policy"),
              "/app/main/inventory/capitalization-policy",
              "fas fa-theater-masks",
              "Pages.Roles"
            ),
            new MenuItem(
              this.l("Items Mapping"),
              "/app/main/inventory/item-linking",
              "fas fa-theater-masks",
              "Pages.Roles"
            ),
            new MenuItem(
              this.l("Stock Requisition"),
              "/app/main/inventory/stock-requisition",
              "fas fa-theater-masks",
              "Pages.Roles"
            ),
            new MenuItem(
              this.l("Stock Transfer Note"),
              "/app/main/inventory/stock-tranfer-request",
              "fas fa-theater-masks",
              "Pages.Roles"
            ),
            new MenuItem(
              this.l("Stock Receipt Note"),
              "/app/main/inventory/stock-receipt-request",
              "fas fa-theater-masks",
              "Pages.Roles"
            ),
            // new MenuItem(
            //   this.l("Fixed Requisition"),
            //   "/app/main/inventory/fixed-requisition",
            //   "fas fa-theater-masks",
            //   "Pages.Roles"
            // ),
            // new MenuItem(
            //   this.l("Fixed Transfer Note"),
            //   "/app/main/inventory/fixed-tranfer-request",
            //   "fas fa-theater-masks",
            //   "Pages.Roles"
            // ),
            new MenuItem(
              this.l("Internal Parts Request"),
              "/app/main/inventory/internal-part-requisition",
              "fas fa-theater-masks",
              "Pages.Roles"
            ),
            new MenuItem(
              this.l("Employee Issuance Note"),
              "/app/main/inventory/store-issuance-note",
              "fas fa-theater-masks",
              "Pages.Roles"
            ),
            new MenuItem(
              this.l("Stock Return Note"),
              "/app/main/inventory/store-return-note",
              "fas fa-theater-masks",
              "Pages.Roles"
            ),
            // new MenuItem(
            //   this.l("Stock Consumption Note"),
            //   // "/app/main/inventory/store-return-note",
            //   "fas fa-theater-masks",
            //   "Pages.Roles"
            // ),
            new MenuItem(
              this.l(" Gate Pass Inward"),
              "/app/main/inventory/gate-inward-pass",
              "fas fa-theater-masks",
              "Pages.Roles"
            ),
            new MenuItem(
              this.l(" Material Return Note"),
              "/app/main/inventory/material-return-note",
              "fas fa-undo-alt",
              "Pages.Roles"
            ),
            new MenuItem(
              this.l(" Stock Consumption Note"),
              "/app/main/inventory/material-consumption-note",
              "fas fa-undo-alt",
              "Pages.Roles"
            ),
            // new MenuItem(
            //   this.l("Stock Inspection Note"),
            //   // "/app/main/inventory/store-return-note",
            //   "fas fa-theater-masks",
            //   "Pages.Roles"
            // ),
            new MenuItem(
              this.l("Book Register"),
              "/app/main/finance/book-register",
              "fas fa-bank",
              "Pages.Roles"
            ),
            new MenuItem(
              this.l("Gate Pass Outward"),
              "/app/main/inventory/gate-outward-pass",
              "fas fa-theater-masks",
              "Pages.Roles"
            ),
            new MenuItem(
              this.l("Goods Inspection Note"),
              "/app/main/inventory/goods-inspection-note",
              "fas fa-theater-masks",
              "Pages.Roles"
            ),
          ]
        ),

        new MenuItem(this.l("Purchase"), "", "fas fa-file-invoice-dollar", "", [
          new MenuItem("Purchase Setups", "", "fas fa-theater-masks", "", [
            new MenuItem(
              this.l("Service Item Master"),
              "/app/main/inventory/service-item",
              "fas fa-theater-masks",
              "Pages.Roles"
            ),
            new MenuItem(
              this.l("Service Item Category"),
              "/app/main/inventory/service-item-category",
              "fas fa-theater-masks",
              "Pages.Roles"
            ),
          ]),
          new MenuItem(
            this.l("Purchase Transactions"),
            "",
            "fas fa-file-invoice-dollar",
            "",
            [
              new MenuItem(
                this.l("Purchase Rate Policy"),
                "/app/main/inventory/purchase-rate-policy",
                "fas fa-theater-masks",
                "Pages.Roles"
              ),
              new MenuItem(
                this.l("Purchase Requisition"),
                "/app/main/inventory/purchase-requisition",
                "fas fa-theater-masks",
                "Pages.Roles"
              ),
              new MenuItem(
                this.l("Service Requisition"),
                "/app/main/inventory/service-request",
                "fas fa-theater-masks",
                "Pages.Roles"
              ),
              new MenuItem(
                this.l("Purchase Order"),
                "/app/main/inventory/purchase-order",
                "fas fa-theater-masks",
                "Pages.Roles"
              ),
              new MenuItem(
                this.l("Service Order"),
                "/app/main/inventory/service-order",
                "fas fa-theater-masks",
                "Pages.Roles"
              ),
              new MenuItem(
                this.l("Purchase Invoice"),
                "/app/main/inventory/purchase-invoice",
                "fas fa-theater-masks",
                "Pages.Roles"
              ),
              new MenuItem(
                this.l("Service Invoice"),
                "/app/main/inventory/service-invoice",
                "fas fa-theater-masks",
                "Pages.Roles"
              ),
              new MenuItem(
                this.l("Petty Purchase Invoice"),
                "/app/main/finance/petty-purchase-invoice",
                "fas fa-file-invoice",
                "Pages.Roles"
              ),
            ]
          ),
        ]),
        new MenuItem("Cancellation", "", "pi pi-ban", "", [
          new MenuItem(
            this.l("Stock Requisition Cancellation"),
            "/app/main/inventory/stockRequisition-cancellation",
            "pi pi-minus-circle",
            "Pages.Roles"
          ),
          new MenuItem(
            this.l("Purchase Requisition Cancellation"),
            "/app/main/inventory/purchaseRequisition-cancellation",
            "pi pi-times-circle",
            "Pages.Roles"
          ),
          new MenuItem(
            this.l("Purchase Order Reversal"),
            "/app/main/inventory/purchaseOrder-reversal",
            "pi pi-refresh",
            "Pages.Roles"
          ),
        ]),
      ]),

      ///////////////finance///////////////////////
      // 15ytnoij8b    talha
      new MenuItem(this.l("Finance"), "", "fas fa-hand-holding-usd", "", [
        new MenuItem(
          this.l("Cheque Register"),
          "/app/main/finance/cheque-register",
          "fas fa-money-check",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Bank Payment"),
          "/app/main/finance/bank-payment",
          "fas fa-money-bill-wave",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Cash Payment"),
          "/app/main/finance/cash-payment",
          "fas fa-money-bill-wave",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Journal Voucher"),
          "/app/main/finance/journal-voucher",
          "fas fa-file-invoice",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Bank Reciept"),
          "/app/main/finance/bank-reciept",
          "fas fa-receipt",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Cash Reciept"),
          "/app/main/finance/cash-reciept",
          "fas fa-receipt",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("General Ledger"),
          "/app/main/finance/general-ledger",
          "fas fa-solid fa-list",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Credit Note"),
          "/app/main/finance/credit-note",
          "fas fa-credit-card",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Debit Note"),
          "/app/main/finance/debit-note",
          "fas fa-credit-card",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Bank Account Reconcilation"),
          "/app/main/finance/bank-reconcilation",
          "fas fa-university",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Bank Reconcilation Entries"),
          "/app/main/finance/bank-reconcilation-entries",
          "fas fa-university",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Bank Balance"),
          "/app/main/finance/bank-balance",
          "fas fa-balance-scale",
          "Pages.Roles"
        ),
        // new MenuItem(
        //   this.l("Bank Balance"),
        //   "/app/main/finance/bank-balance",
        //   "fas fa-balance-scale",
        //   "Pages.Roles"
        // ),
        // new MenuItem(
        //   this.l("Vehicle Fuel Requistion"),
        //   "/app/main/finance/vehicle-fuel-requisition",
        //   "fas fa-car",
        //   "Pages.Roles"
        // ),
        // new MenuItem(
        //   this.l("Petty Purchase Invoice"),
        //   "/app/main/finance/petty-purchase-invoice",
        //   "fas fa-file-invoice",
        //   "Pages.Roles"
        // ),
        // new MenuItem(
        //   this.l("Bank Payment"),
        //   "/app/main/finance/bank-payment",
        //   "fas fa-money-bill-wave",
        //   "Pages.Roles"
        // ),
        new MenuItem(
          this.l("Bank Receipt Reversal"),
          "/app/main/finance/bank-payment-reversible",
          "fas fa-money-bill-wave",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Bank Payment Reversal"),
          "/app/main/finance/cash-payment-reverse",
          "fas fa-money-bill-wave",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Depreciation Rate"),
          "/app/main/finance/depreciation-rate",
          "fas fa-coins",
          "Pages.Roles"
        ),
        // new MenuItem(
        //   this.l("General Ledger"),
        //   "/app/main/finance/general-ledger",
        //   "fas fa-solid fa-list",
        //   "Pages.Roles"
        // ),
        // new MenuItem(
        //   this.l("Bank Reciept"),
        //   "/app/main/finance/bank-reciept",
        //   "fas fa-receipt",
        //   "Pages.Roles"
        // ),
        // new MenuItem(
        //   this.l("Bank Account Reconcilation"),
        //   "/app/main/finance/bank-reconcilation",
        //   "fas fa-university",
        //   "Pages.Roles"
        // ),
        // new MenuItem(
        //   this.l("Bank Reconcilation Entries"),
        //   "/app/main/finance/bank-reconcilation-entries",
        //   "fas fa-university",
        //   "Pages.Roles"
        // ),
        // new MenuItem(
        //   this.l("Bank Balance"),
        //   "/app/main/finance/bank-balance",
        //   "fas fa-balance-scale",
        //   "Pages.Roles"
        // ),
        // new MenuItem(
        //   this.l("Cash Payment"),
        //   "/app/main/finance/cash-payment",
        //   "fas fa-money-bill-wave",
        //   "Pages.Roles"
        // ),
        // new MenuItem(
        //   this.l("Cash Reciept"),
        //   "/app/main/finance/cash-reciept",
        //   "fas fa-receipt",
        //   "Pages.Roles"
        // ),
        // new MenuItem(
        //   this.l("Cheque Register"),
        //   "/app/main/finance/cheque-register",
        //   "fas fa-money-check",
        //   "Pages.Roles"
        // ),
        // new MenuItem(
        //   this.l("Service Quotation"),
        //   "/app/main/finance/service-quatation",
        //   "fas fa-wrench",
        //   "Pages.Roles"
        // ),
        // new MenuItem(
        //   this.l("Book Register"),
        //   "/app/main/finance/book-register",
        //   "fas fa-bank",
        //   "Pages.Roles"
        // ),
        // new MenuItem(
        //   this.l("Credit Note"),
        //   "/app/main/finance/credit-note",
        //   "fas fa-credit-card",
        //   "Pages.Roles"
        // ),
        // new MenuItem(
        //   this.l("Debit Note"),
        //   "/app/main/finance/debit-note",
        //   "fas fa-credit-card",
        //   "Pages.Roles"
        // ),
        // new MenuItem(
        //   this.l("Journal Voucher"),
        //   "/app/main/finance/journal-voucher",
        //   "fas fa-file-invoice",
        //   "Pages.Roles"
        // ),
        new MenuItem(
          this.l("Temp Journal Voucher"),
          "/app/main/finance/temp-journal-voucher",
          "fas fa-file-invoice",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Official Receipt"),
          "/app/main/finance/official-receipt",
          "fas fa-receipt",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Filters"),
          "/app/main/finance/filters",
          "fas fa-receipt",
          "Pages.Roles"
        ),
        // new MenuItem(
        //   this.l("Sales Invoice"),
        //   "/app/main/finance/sale-invoice",
        //   "fas fa-receipt",
        //   "Pages.Roles"
        // ),
      ]),
      new MenuItem(
        this.l("Rental Management"),
        "",
        "fas fa-truck-moving fa-regular",
        "",
        [
          new MenuItem("Rental Setups", "", "fas fa-tag", "", [
            new MenuItem(
              this.l("Vehicle Color"),
              "/app/main/rental/vehicle-color",
              "fas fa-palette",
              "Pages.Roles"
            ),
            new MenuItem(
              this.l("Fuel Type"),
              "/app/main/rental/fuel-type",
              "fas fa-gas-pump",
              "Pages.Roles"
            ),
            new MenuItem(
              this.l("Vehicle Type"),
              "/app/main/rental/type",
              "fas fa-car",
              "Pages.Roles"
            ),
            new MenuItem(
              this.l("Vehicle OwnerShip"),
              "/app/main/rental/ownership",
              "fas fa-certificate",
              "Pages.Roles"
            ),
            // new MenuItem(
            //   this.l("Rental Contract Type"),
            //   "/app/main/rental/rental-contract-type",
            //   "fas fa-file-contract",
            //   "Pages.Roles"
            // ),
          ]),

          new MenuItem(
            this.l("Vehicle Management"),
            "",
            "fas fa-file-invoice-dollar",
            "",
            [
              new MenuItem(
                this.l("Vehicle"),
                "/app/main/rental/vehicle-management",
                "fas fa-car",
                "Pages.Roles"
              ),
              new MenuItem(
                this.l("Rental Contract"),
                "/app/main/rental/rental-contract",
                "fas fa-file-contract",
                "Pages.Roles"
              ),
              new MenuItem(
                this.l("Rental Vehicle Attendance"),
                "/app/main/rental/rental-vehicle-attendance",
                "fas fa-calendar-check",
                "Pages.Roles"
              ),
              new MenuItem(
                this.l("Rental Vehicle Invoice"),
                "/app/main/rental/rental-vehicle-invoice",
                "fas fa-file-invoice",
                "Pages.Roles"
              ),
              new MenuItem(
                this.l("Vehicle Fuel Requistion"),
                "/app/main/finance/vehicle-fuel-requisition",
                "fas fa-car",
                "Pages.Roles"
              ),
            ]
          ),
          new MenuItem(
            this.l("Rental House"),
            "",
            "fas fa-file-invoice-dollar",
            "",
            [
              new MenuItem(
                this.l("House"),
                "/app/main/rental/rental-house",
                "fas fa-house",
                "Pages.Roles"
              ),
              new MenuItem(
                this.l("HouseInvoice"),
                "/app/main/rental/rental-house-invoice",
                "fas fa-house",
                "Pages.Roles"
              ),
            ]
          ),
        ]
      ),
      new MenuItem(this.l("Reports"), "", "fas fa-file-invoice-dollar", "", [
        new MenuItem(
          this.l("General Ledger Details"),
          "/app/main/reports/general-ledger-report",
          "fas fa-file-alt",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Get Report"),
          "/app/main/reports/get-report",
          "fas fa-file-alt",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Rental Machine Invoice Details"),
          "/app/main/reports/rental-machine-invoice-details",
          "fas fa-file-alt",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Rental House Invoice"),
          "/app/main/reports/rental-house-invoice-report",
          "fas fa-file-alt",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Machine Vehical Listing"),
          "/app/main/reports/machine-vehical-listing",
          "fas fa-file-alt",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Employee Wise Ledgers"),
          "/app/main/reports/employee-wise-ledgers",
          "fas fa-file-alt",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Trial Balance"),
          "/app/main/reports/trial-balance",
          "fas fa-file-alt",
          "Pages.Roles"
        ),
        new MenuItem(
          this.l("Patty Purchase Invoice"),
          "/app/main/reports/petty-purchase-invoice",
          "fas fa-file-alt",
          "Pages.Roles"
        ),
      ]),

      new MenuItem(
        this.l("Commercial"),
        "",
        "fas fa-truck-moving fa-regular",
        "",
        [
          new MenuItem("Commercial Setups", "", "fas fa-tag", "", [
            new MenuItem(
              this.l("Voucher Status"),
              "/app/main/commercial/voucher-status",
              "fas fa-palette",
              "Pages.Roles"
            ),
            new MenuItem(
              this.l("Sales Tax Type"),
              "/app/main/commercial/sales-tax-type",
              "fas fa-palette",
              "Pages.Roles"
            ),
          ]),
          new MenuItem(
            this.l("Offer"),
            "/app/main/commercial/service-quatation",
            "fas fa-wrench",
            "Pages.Roles"
          ),
          new MenuItem(
            this.l("Sales Invoice"),
            "/app/main/commercial/sale-invoice",
            "fas fa-receipt",
            "Pages.Roles"
          ),
          new MenuItem(
            this.l("Service Quotation Invoice Filters"),
            "/app/main/commercial/service-quotation-invoice-filters",
            "fas fa-receipt",
            "Pages.Roles"
          ),
        ]
      ),
      new MenuItem(this.l("User Management"), "", "fas fa-user-check", "", [
        new MenuItem(
          this.l("Users"),
          "/app/users",
          "fas fa-users",
          "Pages.Users"
        ),
        new MenuItem(
          this.l("Tenants"),
          "/app/tenants",
          "fas fa-building",
          "Pages.Tenants"
        ),
        new MenuItem(
          this.l("Roles"),
          "/app/roles",
          "fas fa-theater-masks",
          "Pages.Roles"
        ),
      ]),
    ];
  }

  patchMenuItems(items: MenuItem[], parentId?: number): void {
    items.forEach((item: MenuItem, index: number) => {
      item.id = parentId ? Number(parentId + "" + (index + 1)) : index + 1;
      if (parentId) {
        item.parentId = parentId;
      }
      if (parentId || item.children) {
        this.menuItemsMap[item.id] = item;
      }
      if (item.children) {
        this.patchMenuItems(item.children, item.id);
      }
    });
  }

  activateMenuItems(url: string): void {
    this.deactivateMenuItems(this.menuItems);
    this.activatedMenuItems = [];
    const foundedItems = this.findMenuItemsByUrl(url, this.menuItems);
    foundedItems.forEach((item) => {
      this.activateMenuItem(item);
    });
  }

  deactivateMenuItems(items: MenuItem[]): void {
    items.forEach((item: MenuItem) => {
      item.isActive = false;
      item.isCollapsed = true;
      if (item.children) {
        this.deactivateMenuItems(item.children);
      }
    });
  }

  findMenuItemsByUrl(
    url: string,
    items: MenuItem[],
    foundedItems: MenuItem[] = []
  ): MenuItem[] {
    items.forEach((item: MenuItem) => {
      if (item.route === url) {
        foundedItems.push(item);
      } else if (item.children) {
        this.findMenuItemsByUrl(url, item.children, foundedItems);
      }
    });
    return foundedItems;
  }

  activateMenuItem(item: MenuItem): void {
    item.isActive = true;
    if (item.children) {
      item.isCollapsed = false;
    }
    this.activatedMenuItems.push(item);
    if (item.parentId) {
      this.activateMenuItem(this.menuItemsMap[item.parentId]);
    }
  }

  isMenuItemVisible(item: MenuItem): boolean {
    if (!item.permissionName) {
      return true;
    }
    return this.permission.isGranted(item.permissionName);
  }

  setActiveMenuItem(route: string): void {
    const setActive = (items: any[]) => {
      items.forEach((item) => {
        item.isActive = item.route === route;
        if (item.children) {
          setActive(item.children);
        }
      });
    };
    setActive(this.menuItems);
  }

  onMenuItemClick(route: string): void {
    localStorage.setItem('activeMenuRoute', route);
    this.activateMenuItems(route);
  }

  toggleCollapse(item: any): void {
    item.isCollapsed = !item.isCollapsed;
    this.persistMenuState();
  }

  persistMenuState(): void {
    const menuState = this.menuItems.map(item => ({
      label: item.label,
      isCollapsed: item.isCollapsed
    }));
    localStorage.setItem('menuState', JSON.stringify(menuState));
  }

  restoreMenuState(): void {
    const savedState = localStorage.getItem('menuState');
    if (savedState) {
      const menuState = JSON.parse(savedState);
      this.menuItems.forEach(item => {
        const savedItem = menuState.find((state: any) => state.label === item.label);
        if (savedItem) {
          item.isCollapsed = savedItem.isCollapsed;
        }
      });
    }
  }

  highlightActiveMenu(): void {
    const currentRoute = this.router.url;

    this.menuItems.forEach(item => {
      // Check if the current route matches this item or its children
      item.isActive = this.isRouteActive(item, currentRoute);
    });
  }

  isRouteActive(item: any, currentRoute: string): boolean {
    if (item.route === currentRoute) {
      return true;
    }
    if (item.children) {
      return item.children.some((child: any) => this.isRouteActive(child, currentRoute));
    }
    return false;
  }

}
