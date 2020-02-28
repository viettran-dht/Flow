import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ISelect } from 'src/app/interfaces/select.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { MESSAGE } from 'src/app/constant/message';

@Component({
  selector: 'app-select-custom',
  templateUrl: './select-custom.component.html',
  styleUrls: ['./select-custom.component.scss']
})
export class SelectCustomComponent implements OnInit, OnChanges {
  @Input() list: ISelect[] = [];
  @Input() type = '';
  @Input() showAddButton = true;
  @Output() onselect = new EventEmitter<any>();
  @Output() add = new EventEmitter<any>();

  public selectedData: ISelect = {
    Id: '',
    Name: ''
  };
  public showSelectBox = false;
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
  }
  onSelect(data: any) {
    this.selectedData = data;
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
    // console.log(111111111)
    this.showSelectBox = false;
  }

}
