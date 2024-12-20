import { Directive, HostListener, ElementRef } from "@angular/core";

@Directive({
  selector: "[positiveNumberOnly]",
})
export class PositiveNumberOnlyDirective {
  constructor(private el: ElementRef) {}

  @HostListener("input", ["$event"]) onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value;
    // Replace all non-numeric characters, including negative signs
    this.el.nativeElement.value = initialValue.replace(/[^0-9]/g, "");

    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

  @HostListener("keydown", ["$event"]) onKeyDown(event: KeyboardEvent) {
    // Prevent the '-' key from being typed
    if (event.key === "-") {
      event.preventDefault();
    }
  }
}
