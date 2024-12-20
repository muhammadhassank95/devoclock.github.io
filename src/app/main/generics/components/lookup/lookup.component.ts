import {
  Component,
  ContentChild,
  Injector,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { Table } from "primeng/table";
import { HttpDynamicService } from "../../../generics/services/http/http-dynamic.service";
import { CacheService } from "../../../generics/services/cache/cache.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { AppComponentBase } from "@shared/app-component-base";
import { PermissionsDto } from "../../models/permissionsDto.model";
import { LocalizationDto } from "../../models/localizationDto.model";
import { catchError, finalize, throwError } from "rxjs";
import humanizeString from "humanize-string";
import * as moment from "moment";
import Swal from "sweetalert2";
import { AppAuthService } from "@shared/auth/app-auth.service";
@Component({
  selector: "app-lookup",
  templateUrl: "./lookup.component.html",
})
export class LookupComponent extends AppComponentBase implements OnInit {
  @ContentChild("dialogView") dialogView: any;
  @Input() action!: string;
  @Input() mainDto!: any;
  @Input() excludedColumns!: any;
  @Input() validateFromParent: boolean = false;
  @Input() hideTable: boolean = false;
  @Output() validateFunction: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitMainDTO: EventEmitter<any> = new EventEmitter<any>();

  dialogVisibility: boolean = false;
  isEditMode: boolean = false;
  permissions: PermissionsDto;
  localizations: LocalizationDto;

  loading: boolean = false;
  data!: any;
  count!: number;
  headers!: any;
  name: string = "";

  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 10;

  globalFilters!: any;
  filters!: any;
  query: string = "";

  life_cycle: number = 2000;
  cache_data: any;
  all_records = new Map<any, any>();

  constructor(
    injector?: Injector,
    private http_dynamic?: HttpDynamicService<any, any>,
    private cache?: CacheService,
    private confirmationService?: ConfirmationService,
    public messageService?: MessageService,
    private _authService?: AppAuthService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.Init();
    this.getAll(null);
  }

  Init() {
    this.permissions = new PermissionsDto(this.action);
    this.localizations = new LocalizationDto(this.action);
  }

  createOrEdit() {
    if (this.validateFromParent) {
      this.validateFunction.emit(this.mainDto);
    } else {
      if (
        this.mainDto.id == 0 ||
        this.mainDto.id == null ||
        this.mainDto.id == undefined
      ) {
        this.create();
      } else {
        this.edit();
      }
    }
  }

  createOrEditAfterValidation(dto: any, action: string) {
    this.mainDto = dto;
    this.action = action;

    if (
      this.mainDto.id == 0 ||
      this.mainDto.id == null ||
      this.mainDto.id == undefined
    ) {
      this.create();
    } else {
      this.edit();
    }
  }

  create() {
    console.log(this.mainDto);
    this.http_dynamic
      ?.create(this.mainDto, this.action)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error?.message,
            life: this.life_cycle,
          });
          this.cheakError(error);
          return throwError(error.error.error?.message);
        })
      )
      .subscribe({
        next: (response) => {
          if (response.result) {
            this.messageService.add({
              severity: "success",
              summary: "Confirmed",
              detail: this.l("SavedSuccessfully"),
              life: this.life_cycle,
            });

            this.dialogVisibility = false;
            this.getAll(true);
          } else if (response.success == false || response.error != null) {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: this.l("error"),
              life: this.life_cycle,
            });
          }
        },
      });
  }

  handleGlobalFilter(value) {
    console.log(value);
    // if (value?.filters?.global?.value) {
    //   let filterValue: string = value?.filters?.global?.value;

    //   // Filter cached results by name which is the filterValue
    //   let {items} = this.all_records.get(this.action);
    //   this.data = items?.filter((item) =>
    //     item.name.toLowerCase()?.includes(filterValue?.toLowerCase())
    //   );
    //   // this.data = this.cache_data.items;
    //   this.count = this.data.length;
    //   this.headers = Object.keys(items[0]);
    //   // this.count = this.cache_data.result.totalCount;
    //   this.filters = this.headers;
    // } else {
    //   this.cache_data = this.cache.get(this.action);
    //   this.data = this.cache_data.result.items;
    //   this.headers = Object.keys(this.cache_data.result.items[0]);
    //   this.count = this.cache_data.result.totalCount;
    //   this.filters = this.headers;
    // }
  }

  edit() {
    console.log(this.mainDto);
    this.http_dynamic
      .edit(this.mainDto, this.action)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: this.life_cycle,
          });
          this.cheakError(error);
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          if (response.result) {
            this.messageService.add({
              severity: "info",
              summary: "Confirmed",
              detail: this.l("UpdatedSuccessfully"),
              life: this.life_cycle,
            });

            this.getAll(true);
            this.dialogVisibility = false;
          } else if (response.error != null) {
          }
        },
      });
  }

  getAllWithFullCount(action: string) {
    try {
      this.http_dynamic?.getAllData(action).subscribe(({ result }) => {
        console.log({ result }, result.items.length, result.totalCount);
        this.all_records.set(action, { ...result });
      });
    } catch (error) {
      this.cheakError(error);
      console.error(error);
    }
  }

  getAll(
    getDataFromDb: boolean,
    skipCount: number = this.skipCount,
    maxCount: number = this.maxCount
  ) {
    debugger;
    if (this.cache?.has(this.action) && getDataFromDb != true) {
      this.cache_data = this.cache.get(this.action);
      this.data = this.cache_data.result.items;
      this.headers = Object.keys(this.cache_data.result.items[0]);
      if (this.headers.includes("name") || this.headers.includes("id")) {
        this.headers = [
          "name",
          "id",
          ...this.headers.filter((item) => item !== "name" && item !== "id"),
        ];
      }
      this.count = this.cache_data.result.totalCount;
      this.filters = this.headers;
      console.log(this.cache_data);
      console.log("Cache-Data");
    } else {
      this.loading = true;
      this.http_dynamic
        ?.getAll(skipCount, maxCount, this.name, this.action)
        .pipe(
          finalize(() => {}),
          catchError((error) => {
            console.log("error", error);
            debugger;
            this.loading = false;
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: error?.error?.error?.message,
              life: this.life_cycle,
            });
            this.cheakError(error);
            return throwError(error.error.error?.message);
          })
        )
        .subscribe({
          next: (response) => {
            if (response.success) {
              debugger;
              this.getAllWithFullCount(this.action);
              this.cache.set(this.action, response);
              let currentData = response.result.items?.map((item) => {
                Object.keys(item).map((key) => {
                  debugger;
                  if (isNaN(item[key])) {
                    console.log(typeof item[key]);
                    if (typeof item[key] === "object") {
                      debugger;
                    } else {
                      item[key] = item[key]?.toUpperCase();
                    }
                  }
                });
                return item;
              });
              // currentData.map((newItem, index) => newItem);
              debugger;
              this.data = currentData;
              if (response.result.items.length) {
                this.headers = Object?.keys(response.result?.items[0]);
              }
              this.count = response.result.totalCount;
              if (
                this.headers.includes("name") ||
                this.headers.includes("id")
              ) {
                this.headers = [
                  "name",
                  "id",
                  ...this.headers.filter(
                    (item) => item !== "name" && item !== "id"
                  ),
                ];
              }
              this.filters = this.headers;
              console.log("Data-Db");
            } else {
              console.log(response.error);
            }
            this.loading = false;
          },
        });
    }
  }

  delete(id: number): void {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete this?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.http_dynamic
          .delete(id, this.action)
          .pipe(
            catchError((error) => {
              console.log(error);
  
              const errorMessage =
                error?.error?.error?.message || "An error occurred";
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
              });
              this.cheakError(error);
              return throwError(errorMessage);
            })
          )
          .subscribe({
            next: (response) => {
              if (response?.result) {
                console.log(response.result);
                this.getAll(true);
                this.messageService.add({
                  severity: "info",
                  summary: "Deleted",
                  detail: "Your file has been deleted.",
                });
              }
            },
            error: (error) => {
              console.error("Delete failed", error);
            },
          });
      },
    });
  }
  

  onEdit() {
    this.isEditMode = false;
    this.dialogVisibility = true;
    this.mainDto.isActive = true;
    this.clearDtoProperties();
  }

  changeRequest(entity: any) {
    const dateProperties = [
      "startDate",
      "conductedDate",
      "initialDate",
      "endDate",
      "stopEntryBefore",
      "creationRestrictionDate",
      "editRestrictionDate",
      "approvalRestrictionDate",
      "unapprovalRestrictionDate",
      "revisionRestrictionDate",
    ];

    for (const prop in entity) {
      if (entity.hasOwnProperty(prop) && this.mainDto.hasOwnProperty(prop)) {
        // Check if the property should be treated as a date
        if (
          dateProperties.includes(prop) &&
          typeof entity[prop] === "string" &&
          !isNaN(Date.parse(entity[prop]))
        ) {
          this.mainDto[prop] = new Date(entity[prop]);
        } else {
          this.mainDto[prop] = entity[prop];
        }
      }
    }

    this.isEditMode = true;
    // this.validateFromParent = true
    this.dialogVisibility = true;
    console.log(this.mainDto);
    this.emitMainDTO.emit(this.mainDto);
  }

  onGlobalFilter(table: Table, event: Event) {
    // const query = (event.target as HTMLInputElement).value;
    // let date = new Date(query);
    // debugger;
    // console.log(table);
    // if (!isNaN(date.getTime())) {
    //   if (query.length == 2) {
    //     console.log(moment(date).format("DD"));
    //     table.filterGlobal(moment(date).format("DD"), "contains");
    //   } else if (query.length < 6) {
    //     console.log(moment(date).format("MM-DD"));
    //     table.filterGlobal(moment(date).format("MM-DD"), "contains");
    //   } else if (query.length >= 6) {
    //     console.log(moment(date).format("YYYY-MM-DD"));
    //     table.filterGlobal(moment(date).format("YYYY-MM-DD"), "contains");
    //   } else {
    //     table.filterGlobal(
    //       (event.target as HTMLInputElement).value,
    //       "contains"
    //     );
    //   }
    // } else {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
    // }
  }

  clearDtoProperties() {
    if (this.mainDto) {
      for (const prop in this.mainDto) {
        if (this.mainDto.hasOwnProperty(prop)) {
          this.mainDto[prop] = this.getDefaultValueForType(this.mainDto[prop]);
          this.mainDto.isActive = true;
        }
      }
    }
  }

  capitalizeFirstLetter(word: string): string {
    if (!word) return "";
    const humanizedString = humanizeString(word);
    return humanizedString
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  isDateColumn(columnName: string): boolean {
    const dateColumns = [
      "dateOfBirth",
      "createdAt",
      "updatedAt",
      "startDate",
      "endDate",
      "expiryDate",
      "joinDate",
      "joiningDate",
      "initialDate",
      "conductedDate",
      "leaveDate",
      "lastLogin",
      "lastUpdate",
      "orderDate",
      "shippingDate",
      "deliveryDate",
      "paymentDate",
      "invoiceDate",
      "dueDate",
      "completionDate",
      "cancellationDate",
      "registrationDate",
      "approvalDate",
      "submissionDate",
      "releaseDate",
      "activationDate",
      "deactivationDate",
      "hireDate",
      "stopEntryBefore",
      "creationRestrictionDate",
      "editRestrictionDate",
      "approvalRestrictionDate",
      "unapprovalRestrictionDate",
      "revisionRestrictionDate",
    ];

    return dateColumns.includes(columnName);
  }
  formatDate(date: string | Date): string {
    //return moment(date).format("DD MMM, yyyy"); // or your preferred format
    return moment(date).format("yyyy-MM-DD"); // or your preferred format
  }

  getDefaultValueForType(value: any): any {
    if (value === null || value === undefined) {
      return null;
    } else if (typeof value === "string") {
      return "";
    } else if (typeof value === "number") {
      return 0;
    } else if (typeof value === "boolean") {
      return false;
    } else if (Array.isArray(value)) {
      return [];
    } else if (typeof value === "object") {
      return {};
    } else if (typeof value === "function") {
      return () => {};
    } else if (typeof value === "symbol") {
      return Symbol();
    } else if (typeof value === "bigint") {
      return BigInt(0);
    } else if (value instanceof Date) {
      return new Date(0);
    } else if (value instanceof RegExp) {
      return new RegExp("");
    } else if (typeof value === "undefined") {
      return undefined;
    } else {
      return value;
    }
  }

  async onPageChange(event: any) {
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    (
      await this.http_dynamic.getAll(
        (this.currentPage - 1) * 10,
        this.maxCount,
        this.name,
        this.action
      )
    )
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: this.life_cycle,
          });
          this.loading = false;
          this.cheakError(error);
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.data = response.result.items;
            this.count = response.result.totalCount;
          } else {
            console.log(response.error);
          }
          this.loading = false;
        },
      });
  }

  cheakError(error: any) {
    debugger;
    if (error.status === 401) {
      this._authService.logout();
    }
  }
  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    debugger;
    this.name = "&name=" + inputValue;
    // debugger;

    this.http_dynamic
      ?.getAll(this.skipCount, this.maxCount, this.name, this.action)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          console.log("error", error);
          debugger;
          this.loading = false;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error?.error?.error?.message,
            life: this.life_cycle,
          });
          this.cheakError(error);
          return throwError(error.error.error?.message);
        })
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            debugger;
            this.getAllWithFullCount(this.action);
            this.cache.set(this.action, response);
            let currentData = response.result.items?.map((item) => {
              Object.keys(item).map((key) => {
                if (isNaN(item[key])) {
                  item[key] = item[key].toUpperCase();
                }
              });
              return item;
            });
            // currentData.map((newItem, index) => newItem);
            this.data = currentData;
            if (response.result.items.length) {
              this.headers = Object?.keys(response.result?.items[0]);
            }
            this.count = response.result.totalCount;
            if (this.headers.includes("name") || this.headers.includes("id")) {
              this.headers = [
                "name",
                "id",
                ...this.headers.filter(
                  (item) => item !== "name" && item !== "id"
                ),
              ];
            }
            this.filters = this.headers;
            console.log("Data-Db");
          } else {
            console.log(response.error);
          }
          this.loading = false;
        },
      });
  }
}
