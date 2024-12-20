import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { SuggestionLookupTableModaLService } from "../../servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";

@Component({
  selector: "app-dropdown-selector",
  templateUrl: "./dropdown-selector.component.html",
})
export class DropdownSelectorComponent implements OnInit {
  @Input() title: string;
  @Input() target: string;
  @Input() placeholder: string;
  @Input() default: any;
  @Output() valueSelected: EventEmitter<any> = new EventEmitter<any>();

  dropdownList: any[] = [];
  selectedId: number | null = null;

  constructor(private suggestionService: SuggestionLookupTableModaLService) {}

  ngOnInit() {
    this.getDropdownList(this.target);
    if (this.default.id != null) {
      debugger;
      this.selectedId = this.default.id;
    }
  }

  getDropdownList(target: string) {
    this.suggestionService
      .getAll(0, 500, this.title, target)
      .subscribe((result: any) => {
        this.dropdownList = Array.isArray(result?.items) ? result?.items : [];
      });
  }

  onSelect(event: any) {
    const selectedItem = this.dropdownList.find(
      (item) => item.id === event.target.value
    );
    this.valueSelected.emit(selectedItem);
  }
}
