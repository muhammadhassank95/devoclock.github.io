import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// import { TestService } from '../shared/services/test-service.service';
// import { TestDto } from '../shared/dto/test-dto';
import { SuggestionLookupTableModalComponent } from '@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent';

@Component({
  selector: 'app-picker-test',
  templateUrl: './picker-test.component.html'
})
export class PickerTestComponent implements OnInit {
  // @Input() data: TestDto;
  @Output() modalSave = new EventEmitter<void>();
  @ViewChild("SuggestionLookupTableModalComponent") SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;

  form: FormGroup;
  saving = false;
  pickerID1: number
  pickerName1: string
  pickerID2: number
  pickerName2: string
  data: any;

  constructor(
    private fb: FormBuilder,
    // private testService: TestService,
    public bsModalRef: BsModalRef,
    public suggestionModalRef: BsModalRef,
    private suggestionBsModalService: BsModalService
  ) { }

  ngOnInit(): void {
    debugger
    this.form = this.fb.group({
      // name: [this.data?.name || '', Validators.required],
      // isActive: [this.data?.isActive || false],
      pickerID1: "",
      pickerName1: "",
      pickerID2: "",
      pickerName2: ""
    });
  }

  // save(): void {
  //   if (this.form.invalid) {
  //     return;
  //   }
  //   this.saving = true;
  //   debugger
  //   const dto = { ...this.form.value, id: this.data?.id }; // Ensure the ID is included

  //   const saveOperation = this.data?.id ? this.testService.edit(dto) : this.testService.create(dto);
  //   debugger
  //   saveOperation.subscribe(() => {
  //     this.saving = false;
  //     this.modalSave.emit(null);
  //     this.bsModalRef.hide();
  //   });
  // }

  cancel(): void {
    this.bsModalRef.hide();
  }

  getSuggestion() {
    debugger
  }
  saveSuggestion(data: any) {
    debugger
  }
  handleDepartmentSelection(value: any, controlID1: string, controlName1: string) {
    debugger
    this.form.get(controlID1).setValue(value.id);
    this.form.get(controlName1).setValue(value.name);
  }

  openSuggestionModal(target) {
    debugger

    const initialState = {
      target: target
    };
    this.bsModalRef = this.suggestionBsModalService.show(SuggestionLookupTableModalComponent, { initialState });
    this.bsModalRef.content.saveSuggestion.subscribe((result) => {
      console.log('Modal closed with result:', result);
      // this.getPickerData(target, result)
    });
  }

  // getPickerData(target: string, result: any) {

  //   switch (target) {
  //     case "Department":
  //       this.data.id = result[0].id
  //       this.data.name = result[0].name
  //       break;
  //   }
  // }
}



