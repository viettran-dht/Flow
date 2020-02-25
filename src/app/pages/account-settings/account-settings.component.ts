import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HelperService } from 'src/app/services/helper/helper.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { IUser } from 'src/app/interfaces/user.interface';
import { ISelect } from 'src/app/interfaces/select.interface';

import { ApiService } from 'src/app/services/api/api.service';
import { MESSAGE } from 'src/app/constant/message';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  @ViewChild('image', { static: false }) image: ElementRef;

  public accountForm: FormGroup;
  private currentUser: IUser;
  public submitted = false;
  public userInfo: IUser;
  public imageUrl: any;
  public fileData: File = null;
  public loading = false;
  public listCountries: ISelect[];
  public showSelectBox = false;
  constructor(
    private fb: FormBuilder,
    private helperService: HelperService,
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private apiService: ApiService
  ) {
    this.getListCountries();
    this.initForm();

  }
  async ngOnInit() {
    await this.getData();
  }
  async getData() {

    this.currentUser = await this.authService.getCurrentUser();
    const res: any = await this.firebaseService.getRefById('users', this.currentUser.uid);
    this.userInfo = res;
    this.imageUrl = this.userInfo.logo;
    this.accountForm.patchValue({
      phoneNumber: this.userInfo.phoneNumber || '',
      companyName: this.userInfo.companyName || '',
      email: this.userInfo.email,
      country: this.userInfo.country || '',
      fullName: this.userInfo.displayName || '',
      password: '',
      newPassword: '',
      confirmPassword: '',
      jobTitle: '',
    });
  }

  async updateUserInfo() {
    this.submitted = true;
    this.loading = true;
    console.log(this.accountForm.value);
    this.helperService.markFormGroupTouched(this.accountForm);
    if (this.accountForm.invalid) {
      this.loading = false;
      return;
    }
    try {
      await this.authService.reauthenticate(this.accountForm.value.password);
      const user: IUser = { ...this.userInfo, ...this.currentUser, ...this.accountForm.value };
      if (this.fileData) {
        const avtUrl = await this.firebaseService.uploadLogo(this.imageUrl, 'userAvt/');
        this.firebaseService.updateLogo('users', this.currentUser.uid, avtUrl);
      }
      await this.firebaseService.updateUserInfo(user);
      if (this.accountForm.value.newPassword) {
        await this.authService.updatePassword(this.accountForm.value.confirmPassword);
      }
      this.helperService.alert('success', MESSAGE.updateUserSuccess);
      this.loading = false;
      this.userInfo.lastupdate = new Date().toDateString();
    } catch (e) {
      this.loading = false;
      console.log(e);
      if (e.message) {
        this.helperService.alert('error', e.message);
        return;
      }
      this.helperService.alert('error', 'error');
    }

  }

  initForm() {
    this.accountForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', Validators.email],
      country: [''],
      fullName: ['', Validators.required],
      password: ['', Validators.required],
      newPassword: [''],
      confirmPassword: [''],
      jobTitle: ['']
    },
      {
        validator: MustMatch('newPassword', 'confirmPassword')
      });
  }
  handleFileInput(fileInput: any) {
    this.fileData = fileInput.target.files[0] as File;
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.imageUrl = reader.result;
    };
  }
  getListCountries() {
    this.apiService.getListCountries().subscribe((res: any) => {
      this.listCountries = res.countries.map((c: any) => {
        const country: ISelect = {
          Id: c.code,
          Name: c.name
        };
        return country;
      });
      // console.log(this.listCountries);
    });
  }
  clickOutside(event) {
    // console.log(111111111)
    this.showSelectBox = false;
  }

  onSelectCountry(event) {
    this.showSelectBox = false;
    this.accountForm.get('country').setValue(event.Name);
  }
  removeImage() {
    this.image.nativeElement.value = '';
    this.imageUrl = '../../../assets/img/blank-profile.png'
  }
}
