import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SuggestionLookupTableModalComponent } from '../suggestion-lookup-table-modal/SuggestionLookupTableModalComponent';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SuggestionLookupTableModaLService } from '@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service';
import { LazyLoadEvent } from 'primeng/api';
// import { ChartOfAccountModalComponent } from './chart-of-account-modal.component';

@Component({
  selector: 'app-chart-of-account-picker',
  templateUrl: './chart-of-account-picker.component.html',
  styleUrl: './chart-of-account-picker.component.css'
})
export class ChartOfAccountPickerComponent {

  @Input() showId: boolean = true;
  @Input() forGrid: boolean = true;
  @Input() editable: boolean = true;

  @Input() title: string;
  @Input() title2?: string;
  @Input() id: string | "";
  @Input() name: string | "";
  @Input() serialNumber: string;
  @Input() accountTypeName: string;
  @Input() accountTypeShortName: string;
  @Input() formControlName: string;
  @Input() disable?: boolean;
  @ViewChild('SuggestionLookupTableModalComponent') SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  @Output() getEmitter: EventEmitter<any> = new EventEmitter<any>();

  suggestionModalRef: BsModalRef;
  openModal: Boolean;
  active: any;
  filtername: string;
  target: string;
  chartOfAccountData: [] = [];
  loading: boolean = false;
  data = [];
  totalCount = 0;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 5;
  constructor(private suggestionService: BsModalService, private _suggestionLookupTableModaLService: SuggestionLookupTableModaLService,) { }



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.openPicker()
  }
  openPicker() {
    debugger
    this.target = this.title
    this.name = ""
    this.serialNumber = ""
    // this.suggestionModalRef = this.suggestionService.show(ChartOfAccountModalComponent, { initialState });
    this.openModal = true;
    this.loadData()
  }

  SetName(value) {
    debugger
    // this.onValuechange.emit(value)
  }

  setToNull() {
    this.id = null;
    this.name = null;
    this.serialNumber = null;
    this.accountTypeName = null;
    this.accountTypeShortName = null;
  }



  closePicker() {
    this.suggestionModalRef.hide();
  }
  OpenServiceRequisition() {
    debugger
    this.openModal = true;
    this.getAll();
  }
  getAll(event?: LazyLoadEvent) {
    if (!this.active) {
      return;
    }
    this.loadData();
  }
  loadData() {
    debugger
    this.loading = true
    this._suggestionLookupTableModaLService.getBudgetCOA(this.skipCount, this.maxCount, this.name, this.target, this.serialNumber).subscribe((result) => {
      debugger
      console.log('Modal closed with result:', result);
      this.chartOfAccountData = result.items;
      this.totalCount = result.totalCount;
      this.loading = false
    });

  }
  SelectChartOfAccount(item: {}) {
    this.getEmitter.emit(item)

    this.openModal = false;
  }
  Search() {
    debugger;
    this.loadData();
  }

  async onPageChange(event: any) {
    this.maxCount = event.rows;
    this.skipCount = event.page + 1;
    debugger;
    this.loadData();
  }


}
