import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-custom',
  templateUrl: './select-custom.component.html',
  styleUrls: ['./select-custom.component.scss']
})
export class SelectCustomComponent implements OnInit {
  @Input() list: any = [];
  @Input() data: any;
  @Output() onselect = new EventEmitter<any>();
  @Output() add = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  onSelect(data: any) {
    this.onselect.emit(data);
  }
  onAdd() {
    const data = {
      id: '123',
      name: this.data
    };
    this.add.emit(data);
  }
}
