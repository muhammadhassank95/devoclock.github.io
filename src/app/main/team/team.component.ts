import { identifierName } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})

export class TeamComponent {
  dto = {
    id: 0,
    name: "",
    isActive: false,
    employeeId: 0
  }
}