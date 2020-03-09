import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  goto(page) {
    this.router.navigate([page]);
  }
  scrollTo(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }
}
