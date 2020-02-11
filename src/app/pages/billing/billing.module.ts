import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingComponent } from './billing.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [BillingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: BillingComponent }])
  ]
})
export class BillingModule { }
