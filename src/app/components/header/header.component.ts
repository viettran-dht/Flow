import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentPage: any = 'my-flows';
  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    const path = window.location.pathname;
    this.currentPage = path.replace('/', '')
  }

  goto(page) {
    this.router.navigate([page]);
    this.currentPage = page;
  }
}
