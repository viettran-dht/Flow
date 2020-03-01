import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent implements OnInit {

  @Input() numbers: any;
  skeletonList: Array<any> = [];
  constructor() { }

  ngOnInit() {
    this.skeletonList = Array(this.numbers).fill('item');
  }
}
