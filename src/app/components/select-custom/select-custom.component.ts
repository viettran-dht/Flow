import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ISelect } from 'src/app/interfaces/select.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { MESSAGE } from 'src/app/constant/message';
import {isEmpty} from 'lodash';
@Component({
  selector: 'app-select-custom',
  templateUrl: './select-custom.component.html',
  styleUrls: ['./select-custom.component.scss']
})
export class SelectCustomComponent implements OnInit, OnChanges {
  @Input() list: ISelect[] = [];
  @Input() type = '';
  @Input() showAddButton = true;
  @Input() disabledInput = true;
  @Input() showSelectBox = false;
  @Input() dataId: any;
  @Output() onselect = new EventEmitter<any>();
  @Output() add = new EventEmitter<any>();

  public selectedData: ISelect = {
    Id: '',
    Name: ''
  };
  public loading = false;
  public newData: ISelect = {
    Id: '',
    Name: ''
  };
  constructor(
    private authService: AuthService,
    private helperService: HelperService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.newData = {
      Id: '',
      Name: ''
    };
    if (this.dataId) {
      this.selectedData = this.list.find(x => x.Id === this.dataId);
      if (this.selectedData) {
        this.newData.Name = this.selectedData.Name;
        this.newData.Id = this.selectedData.Id;
      }
    }
  }
  onSelect(data?: any) {
    if (data) {
      this.selectedData = data;
    } else {
      this.selectedData = {
        Id: '',
        Name: ''
      };
    }
    this.newData = Object.assign({}, this.selectedData);
    this.onselect.emit(this.selectedData);
    this.showSelectBox = false;
  }
  async onAdd() {
    if (this.newData.Name === '') {
      return;
    }
    this.add.emit(this.newData);
  }
  clickOutside(event) {
    this.showSelectBox = false;
    if (!isEmpty(this.selectedData) && !this.selectedData.Id) {
      this.selectedData = {
        Id: '',
        Name: ''
      };
      this.newData = Object.assign({}, this.selectedData);
      this.onselect.emit(this.selectedData);
    }
  }

}
