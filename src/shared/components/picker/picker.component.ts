import {
  Component,
  Input,
  ViewChild,
  EventEmitter,
  Output,
} from "@angular/core";
import { SuggestionLookupTableModalComponent } from "../suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";

@Component({
  selector: "app-picker",
  templateUrl: "./picker.component.html",
})
export class PickerComponent {
  @Input() showId: boolean = true;
  @Input() editable: boolean = true;

  @Input() title: string;
  @Input() title2?: string;
  @Input() url?: string;
  @Input() inputWidth?: string;
  @Input() filterTarget?: string;
  @Input() id: number | null;
  @Input() name: string | "";
  @Input() filterWiseChartOfAccTarget: string | "";
  @Input() chartOfAccountSubLedgerType: string | "";
  @Input() locationId: string | "";
  @Input() isPetty: string | "";
  @Input() bankAccountId: string | "";
  @Input() filterOfCOALevelId: string | "";
  @Input() formControlName: string;
  @Input() disable?: boolean;
  @Input() enable?: boolean;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  @Output() valueSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() onValuechange: EventEmitter<any> = new EventEmitter<any>();

  suggestionModalRef: BsModalRef;

  constructor(
    private suggestionService: BsModalService,
    private _suggestionLookupTableModaLService: SuggestionLookupTableModaLService
  ) {}

  openPicker() {
    debugger;
    if (this.title2) {
      var initialState: any = {
        class: "custom-modal",
        target: this.title2,
        url: this.url,
      };
    } else {
      var initialState: any = {
        target: this.title,
      };
    }
    debugger;
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      {
        initialState: {
          target: this.title2 || this.title,
          pickName: this.title,
          filterWiseChartOfAccTarget: this.filterWiseChartOfAccTarget,
          chartOfAccountSubLedgerType: this.chartOfAccountSubLedgerType,
          locationId: this.locationId,
          isPetty: this.isPetty,
          bankAccountId: this.bankAccountId,
          filterOfCOALevelId: this.filterOfCOALevelId,
          filtername: this.name,
          idShow: this.showId,
          url: this.url,
        },
      }
    );

    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      console.log("Modal closed with result:", result);
      debugger;
      this.name = result?.name;
      if (result.additional) {
        this.id = result.additional;
      } else {
        this.id = result?.id;
      }
      debugger;
      this.valueSelected.emit(result);
    });
  }

  SetName(value) {
    this.onValuechange.emit(value);
  }

  setToNull() {
    this.id = null;
    this.name = "";
    this.valueSelected.emit({ id: null, name: "", additional: "" });
  }

  setToDto() {
    this.id = this.SuggestionLookupTableModalComponent.id;
    this.name = this.SuggestionLookupTableModalComponent.name;
  }

  closePicker() {
    this.suggestionModalRef.hide();
  }
}
