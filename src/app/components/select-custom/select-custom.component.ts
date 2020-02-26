import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ISelect } from 'src/app/interfaces/select.interface';

@Component({
  selector: 'app-select-custom',
  templateUrl: './select-custom.component.html',
  styleUrls: ['./select-custom.component.scss']
})
export class SelectCustomComponent implements OnInit, OnChanges {
  @Input() list: ISelect[] = [];
  @Input() data: any;
  @Input() showAddButton = true;
  @Output() onselect = new EventEmitter<any>();
  @Output() add = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    // this.list = this.list.filter(x => x.Name.includes(this.data));
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
