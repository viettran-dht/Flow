import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    private helperService: HelperService
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
    console.log(this.loginForm.value)
  }
}
