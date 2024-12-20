import { filter } from "rxjs/operators";
import {
  Component,
  EventEmitter,
  Injector,
  Output,
  ViewChild,
} from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Paginator } from "primeng/paginator";
import { Table } from "primeng/table";
import { SuggestionLookupTableModaLService } from "../../servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";
import { LazyLoadEvent, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";

@Component({
  selector: "app-suggestion-lookup-table-modal",
  templateUrl: "./suggestion-lookup-table-modal.component.html",
  styleUrls: ["./suggestion-lookup-table-modal.component.css"],
})
export class SuggestionLookupTableModalComponent {
  @ViewChild("dataTable", { static: true }) dataTable: Table;
  @ViewChild("paginator", { static: true }) paginator: Paginator;
  @Output() saveSuggestion: EventEmitter<any> = new EventEmitter<any>();

  name: string = "";
  title2: string = "";
  filtername: string;
  showId: boolean;
  serialNumber: string = "";
  locationId: string = "";
  isPetty: string = "";
  filterWiseChartOfAccTarget: string = "";
  chartOfAccountSubLedgerType: string = "";
  filterOfCOALevelId: string = "";
  bankAccountId: string = "";
  filterWiseId: string;
  coaIdForSubledger: string;
  AccountTypeName: string;
  AccountTypeShortName: string;
  target: string;
  url: string;
  id: number | null;
  additionalID: number | null;
  idShow: boolean = true;
  displayNameShow: boolean;
  active: boolean;
  pickName: string;
  findViaId: number | null;

  data = null;
  temp_data = null;
  totalCount = 0;
  loading: boolean = false;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 5;

  constructor(
    injector: Injector,
    private _suggestionLookupTableModaLService: SuggestionLookupTableModaLService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.show(this.target, this.filterWiseId);
  }

  show(
    target: string,
    parmValue?: string,
    parm2Value?: string,
    title?: string,
    url?: string,
    filtername?: string,
    parm3Value?: number
  ): void {
    this.target = target;
    this.active = true;
    this.pickName = title || target;
    this.name = filtername;
    this.getAll();
  }

  getAll(event?: LazyLoadEvent) {
    if (!this.active) {
      return;
    }
    this.loadData();
  }
  loadData() {
    debugger;
    this.loading = true;
    if (this.filterWiseChartOfAccTarget) {
      this._suggestionLookupTableModaLService
        .getAllCOA(
          (this.currentPage - 1) * this.maxCount,
          this.maxCount,
          this.filtername,
          this.filterWiseChartOfAccTarget,
          this.serialNumber
        )
        .subscribe((response) => {
          console.log("Modal closed with result:", response);
          if (this.filterWiseChartOfAccTarget) {
            var tem_data = [];
            response.items.map((item) => {
              var obj = {
                id: item.serialNumber,
                name: item.name,
              };
              tem_data.push(obj);
            });

            this.data = tem_data;
            this.temp_data = response.items;
            this.totalCount = response.totalCount;
            this.loading = false;
          } else {
            this.data = response.items;
            this.totalCount = response.totalCount;
            this.loading = false;
          }
        });
    } else if (this.filterOfCOALevelId) {
      debugger;
      this._suggestionLookupTableModaLService
        .getAllCOAData(
          (this.currentPage - 1) * 5,
          this.maxCount,
          this.filtername,
          this.url,
          this.serialNumber,
          this.filterOfCOALevelId,
          this.filterOfCOALevelId
        )
        .pipe(
          finalize(() => (this.loading = false)),
          catchError((error) => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: error.error.message,
              life: 2000,
            });
            return throwError(error.error.message);
          })
        )
        .subscribe((response) => {
          if (this.target === "COALvl2" || "COALvl3") {
            var tem_data = [];
            response.items.map((item) => {
              var obj = {
                id: item.serialNumber,
                name: item.name,
              };
              tem_data.push(obj);
            });

            this.data = tem_data;
            this.temp_data = response.items;
            this.totalCount = response.totalCount;
            this.loading = false;
          } else {
            this.data = response.items;
            this.totalCount = response.totalCount;
            this.loading = false;
          }
          // this.data = response["items"];
          // this.totalCount = response["totalCount"];
        });
    } else if (this.chartOfAccountSubLedgerType) {
      debugger;
      this._suggestionLookupTableModaLService
        .getAllSubLedgers(
          (this.currentPage - 1) * 5,
          this.maxCount,
          this.filtername,
          this.url,
          this.chartOfAccountSubLedgerType,
          this.coaIdForSubledger,
          this.locationId,
          this.serialNumber
        )
        .pipe(
          finalize(() => (this.loading = false)),
          catchError((error) => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: error.error.message,
              life: 2000,
            });
            return throwError(error.error.message);
          })
        )
        .subscribe((response) => {
          if (this.target === "COALvl2" || "COALvl3" || "Subledger") {
            var tem_data = [];
            response.items.map((item) => {
              var obj = {
                id: item.serialNumber,
                name: item.name ? item.name : item.title,
              };
              tem_data.push(obj);
            });

            this.data = tem_data;
            this.temp_data = response.items;
            this.totalCount = response.totalCount;
            this.loading = false;
          } else {
            this.data = response.items;
            this.totalCount = response.totalCount;
            this.loading = false;
          }
          // this.data = response["items"];
          // this.totalCount = response["totalCount"];
        });
    } else if (this.bankAccountId) {
      this._suggestionLookupTableModaLService
        .getChecksByBankId(
          (this.currentPage - 1) * 5,
          this.maxCount,
          this.filtername,
          this.url,
          this.bankAccountId,
          this.serialNumber
        )
        .pipe(
          finalize(() => (this.loading = false)),
          catchError((error) => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: error.error.message,
              life: 2000,
            });
            return throwError(error.error.message);
          })
        )
        .subscribe((response) => {
          this.data = response;
          this.totalCount = response.length;
          this.loading = false;
        });
    } else if (this.target === "Vehicle" || this.target === "House") {
      this._suggestionLookupTableModaLService
        .getAllHouseOrVehicle(
          (this.currentPage - 1) * 5,
          this.maxCount,
          this.filtername,
          this.target,
          this.locationId,
          this.serialNumber
        )
        .subscribe((response) => {
          console.log("Modal closed with result:", response);
          if (this.target === "Vehicle" || this.target === "House") {
            var tem_data = [];
            response.items.map((item) => {
              var obj = {
                id: item.id,
                name: item.name,
              };
              tem_data.push(obj);
            });
            debugger;
            this.data = tem_data;
            this.temp_data = response.items;
            this.totalCount = response.totalCount;
            this.loading = false;
          } else {
            this.data = response.items;
            this.totalCount = response.totalCount;
            this.loading = false;
          }
        });
    } else if (
      this.target === "ServiceItem" ||
      this.target === "InventoryItem"
    ) {
      this._suggestionLookupTableModaLService
        .getAllItems(
          (this.currentPage - 1) * 5,
          this.maxCount,
          this.filtername,
          this.target,
          this.locationId,
          this.isPetty,
          this.serialNumber
        )
        .subscribe((response) => {
          console.log("Modal closed with result:", response);
          if (
            this.target === "ServiceItem" ||
            this.target === "InventoryItem"
          ) {
            var tem_data = [];
            response.items.map((item) => {
              var obj = {
                id: item.serialNumber,
                name: item.name,
              };
              tem_data.push(obj);
            });
            debugger;
            this.data = tem_data;
            this.temp_data = response.items;
            this.totalCount = response.totalCount;
            this.loading = false;
          } else {
            this.data = response.items;
            this.totalCount = response.totalCount;
            this.loading = false;
          }
        });
    } else if (
      this.target === "ActiveHouse" ||
      this.target === "ActiveVehicle"
    ) {
      this._suggestionLookupTableModaLService
        .getAllActiveVehicleOrHouse(
          (this.currentPage - 1) * 5,
          this.maxCount,
          this.filtername,
          this.target,
          this.locationId,
          this.serialNumber
        )
        .subscribe((response) => {
          console.log("Modal closed with result:", response);
          if (
            this.target === "ActiveHouse" ||
            this.target === "ActiveVehicle"
          ) {
            var tem_data = [];
            response.items.map((item) => {
              var obj = {
                id: item.contractReferenceId,
                name: item.contractReferenceName,
              };
              tem_data.push(obj);
            });
            debugger;
            this.data = tem_data;
            this.temp_data = response.items;
            this.totalCount = response.totalCount;
            this.loading = false;
          } else {
            this.data = response.items;
            this.totalCount = response.totalCount;
            this.loading = false;
          }
        });
    }

    {
      debugger;
      this._suggestionLookupTableModaLService
        .getAll(
          (this.currentPage - 1) * 5,
          this.maxCount,
          this.filtername,
          this.target,
          this.serialNumber
        )
        .pipe(
          finalize(() => (this.loading = false)),
          catchError((error) => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: error.error.message,
              life: 2000,
            });
            return throwError(error.error.message);
          })
        )
        .subscribe((response) => {
          debugger;

          this.data = response["items"];
          this.totalCount = response["totalCount"];
        });
    }
  }

  setAndSave(obj: any) {
    this.id = obj.id;
    this.additionalID = obj.additional;
    this.name = obj.name;
    debugger;
    if (this.target === "Location") {
      obj.name = obj.additional;
      this.saveSuggestion.emit(obj);
      this.bsModalRef.hide();
    } else if (
      this.target === "COALvl2" ||
      this.target === "COALvl3" ||
      this.target === "Subledger" ||
      this.target === "ServiceItem" ||
      this.target === "InventoryItem" ||
      this.filterWiseChartOfAccTarget
    ) {
      debugger;
      var new_obj = this.temp_data.filter(
        (item) => item.serialNumber === obj.id
      );
      debugger;
      this.saveSuggestion.emit(new_obj[0]);
      this.bsModalRef.hide();
    } else {
      this.saveSuggestion.emit(obj);
      this.bsModalRef.hide();
    }
  }

  close(): void {
    this.active = false;
    this.saveSuggestion.emit(null);
    this.bsModalRef.hide();
  }

  Search() {
    this.loadData();
  }
  removeIdandBackSlash(word: string) {
    if (typeof word == "number") {
      return word;
    } else if (typeof word == "string") {
      if (word.includes("/")) {
        return word.split("/")[1];
      } else {
        return word;
      }
    }
  }

  async onPageChange(event: any) {
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loadData();
  }
}
