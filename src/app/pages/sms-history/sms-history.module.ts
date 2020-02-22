import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsHistoryComponent } from './sms-history.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SmsHistoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: SmsHistoryComponent}])
  ]
})
export class SmsHistoryModule { }
