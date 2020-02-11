import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BroadcastComponent } from './broadcast.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [BroadcastComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: BroadcastComponent }])
  ]
})
export class BroadcastModule { }
