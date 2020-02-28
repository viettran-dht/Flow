import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-plan-selection',
  templateUrl: './plan-selection.component.html',
  styleUrls: ['./plan-selection.component.scss']
})
export class PlanSelectionComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }
  backClicked() {
    this.location.back();
  }
}
