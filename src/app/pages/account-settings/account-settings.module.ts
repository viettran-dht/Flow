import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AccountSettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AccountSettingsComponent }])
  ]
})
export class AccountSettingsModule { }
