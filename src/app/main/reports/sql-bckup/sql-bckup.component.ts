import { Component, OnInit } from "@angular/core";
import { ReportService } from "../shared/services/report.service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-sql-bckup",
  templateUrl: "./sql-bckup.component.html",
  styleUrls: ["./sql-bckup.component.css"],
  providers: [MessageService],
})
export class SqlBckupComponent implements OnInit {
  database: string;
  fullBackup: boolean;
  selectedPath: string | null = null;
  loading: boolean;
  chooseContractOptions = [
    {
      label:
        "C:\\Program Files\\Microsoft SQL Server\\MSSQL16.MSSQLSERVER\\MSSQL\\Backup\\AutoBackups",
      value:
        "C:\\Program Files\\Microsoft SQL Server\\MSSQL16.MSSQLSERVER\\MSSQL\\Backup\\AutoBackups",
    },
  ];

  constructor(
    private sqlBackup: ReportService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getDefaultDatabase();
  }

  getDefaultDatabase() {
    this.sqlBackup.getDatabaseName("SQLBackup").subscribe({
      next: (response: any) => {
        this.database = response;
      },
      error: (error) => {
        console.error("Error fetching database name:", error);
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to load database name.",
        });
      },
    });
  }

  getSqlBackup() {
    debugger;
    if (!this.selectedPath) {
      this.messageService.add({
        severity: "error",
        summary: "No Path Selected",
        detail: "Please select a backup path before proceeding.",
      });
      return;
    }
    this.loading = true;
    this.sqlBackup
      .sendBackupLocation("SQLBackup", this.selectedPath)
      .subscribe({
        next: (response: any) => {
          this.messageService.add({
            severity: "success",
            summary: "Backup Successful",
            detail: "The backup process was initiated successfully.",
          });
          console.log("Backup successfully initiated:", response);
        },
        error: (error) => {
          console.error("Error initiating backup:", error);
          this.messageService.add({
            severity: "error",
            summary: "Backup Failed",
            detail: "Failed to initiate the backup process.",
          });
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
