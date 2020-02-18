import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    private helperService: HelperService
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
    console.log(this.signUpForm.value);
  }

  goto(page: string) {
    this.router.navigate([page]);
  }
}
