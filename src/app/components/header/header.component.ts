import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentPage: any = 'my-flows';
  constructor(
    public router: Router,
    public authService: AuthService,
    public activatedRoute: ActivatedRoute,
    public location: Location
  ) {
    this.router.events.subscribe(val => {
      const url = this.router.url.split('/');
      this.currentPage = url[1];
    });
  }

  ngOnInit() {
    const path = window.location.pathname;
    this.currentPage = path.replace('/', '');
  }

  goto(page) {
    this.router.navigate([page]);
    this.currentPage = page;
  }
  logout() {
    this.authService.logout().then(res => {
      this.router.navigate(['/login']);
    });
  }
}
