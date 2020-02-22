import { Component, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
export interface AutoCompleteModel {
  value: any;
  display: string;
}

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnInit, OnChanges {
  @Output() onchange = new EventEmitter<any>();
  public items = [
    { display: 'Pizza', value: 1 },
    { display: 'Pasta', value: 2 },
    { display: 'Parmesan', value: 3 },
  ];
  public data = [];
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
  }
  onChanges() {
    // console.log(this.data);
    this.onchange.emit(this.data);
  }
}
