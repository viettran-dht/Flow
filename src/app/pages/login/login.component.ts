import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/helper/helper.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MESSAGE } from 'src/app/constant/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loading: boolean;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    private helperService: HelperService,
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  gotoPage(page: string) {
    this.router.navigate([page]);
  }

  login() {
    this.helperService.markFormGroupTouched(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.login(this.loginForm.value).then((res: any) => {
      const user: firebase.User = res.user;
      this.loading = false;
      if (user.emailVerified) {
        this.firebaseService.updateRef('users', user.uid, { emailVerified: true });
        this.router.navigate(['/account-settings']);

      } else {
        this.helperService.alert('error', MESSAGE.verifyEmailErr);
      }
    }).catch(err => {
      this.loading = false;
      switch (err.code) {
        case 'auth/user-not-found':
          this.helperService.alert('error', MESSAGE.loginError);
          break;
        default:
          this.helperService.alert('error', err.message);
          break;
      }
    });
  }
}
