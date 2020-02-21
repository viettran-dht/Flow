import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/helper/helper.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { MESSAGE } from 'src/app/constant/message';
import { IUser } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;
  public loading: boolean ;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    private helperService: HelperService,
    private authService: AuthService,
    private firebaseSerivice: FirebaseService
  ) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.signUpForm = this.fb.group({
      fullName: ['', Validators.required],
      companyName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  signup() {
    this.helperService.markFormGroupTouched(this.signUpForm);
    if (this.signUpForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.signup(this.signUpForm.value).then(async (data: any) => {
      this.loading = false;
      const newUser: firebase.User = data.user;
      newUser.updateProfile({
        displayName: this.signUpForm.value.fullName
      });
      console.log(newUser);
      this.createUserInfo(newUser);
      newUser.sendEmailVerification();
      this.helperService.alert('success', MESSAGE.signUpSuccess);
      this.router.navigate(['/login']);
    }).catch(err => {
      this.loading = false;
      this.helperService.alert('error', err.message);
    });
  }
  createUserInfo(userInfo) {
    console.log(this.signUpForm);
    const user: IUser = {} as IUser;
    user.name = this.signUpForm.value.fullName;
    user.email = userInfo.email;
    user.emailVerified = false;
    user.clients = [];
    this.firebaseSerivice.createUser(userInfo.uid, user);
  }
  goto(page: string) {
    this.router.navigate([page]);
  }
}
