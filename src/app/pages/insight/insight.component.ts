import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insight',
  templateUrl: './insight.component.html',
  styleUrls: ['./insight.component.scss']
})
export class InsightComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  changeTab(tab) {
    this.router.navigate(['insight', tab]);
  }
}
