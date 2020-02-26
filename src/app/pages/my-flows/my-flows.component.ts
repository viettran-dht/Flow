import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-flows',
  templateUrl: './my-flows.component.html',
  styleUrls: ['./my-flows.component.scss']
})
export class MyFlowsComponent implements OnInit {
  public listClient = [
    { Id: 1, Name: 'hiep' },
    { Id: 2, Name: 'nam' },
    { Id: 3, Name: 'dung' }
  ];
  public showSelectBox: any = {
    client: false,
    brand: false,
    campaign: false
  };
  constructor() { }

  ngOnInit() {
  }
  onClick(event: any) {
    // if (!this.zoneSelect.nativeElement.contains(event.target)) {
    // this.showSelectBox = false;
    // console.log(event);
    if (!event.target.id) {
      for (const key in this.showSelectBox) {
        if (this.showSelectBox.hasOwnProperty(key)) {
          this.showSelectBox[key] = false;
        }
      }
    } else {
      for (const key in this.showSelectBox) {
        if (this.showSelectBox.hasOwnProperty(key) && key !== event.target.id) {
          this.showSelectBox[key] = false;
        }
      }
    }
    // }
  }
}
