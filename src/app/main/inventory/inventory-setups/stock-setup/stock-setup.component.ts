import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-stock-setup",
  templateUrl: "./stock-setup.component.html",
})
export class StockSetupComponent implements OnInit {
  activeIndex: number;
  ngOnInit(): void {
    this.activeIndex = +localStorage.getItem("activeTabIndex") || 0;
  }
  onTabChange(event: any): void {
    this.activeIndex = event.index;
    localStorage.setItem("activeTabIndex", this.activeIndex.toString());
  }
}
