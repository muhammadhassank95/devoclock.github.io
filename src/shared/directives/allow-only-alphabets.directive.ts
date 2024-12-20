import { Directive, HostListener, ElementRef } from "@angular/core";

@Directive({
  selector: "[appAllowOnlyAlphabets]",
})
export class AllowOnlyAlphabetsDirective {
  constructor(private el: ElementRef) {}

  @HostListener("input", ["$event"]) onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value;
    // Replace all non-alphabet characters
    this.el.nativeElement.value = initialValue.replace(/[^a-zA-Z]/g, "");

    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

  @HostListener("keydown", ["$event"]) onKeyDown(event: KeyboardEvent) {
    // Prevent numbers or special characters from being typed
    if (
      !/[a-zA-Z]/.test(event.key) &&
      event.key !== "Backspace" &&
      event.key !== "Tab"
    ) {
      event.preventDefault();
    }
  }
}
