import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentPage: any = 'my-flows';
  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

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
      console.log('logout', res);
      this.router.navigate(['/login']);
    });
  }
}
