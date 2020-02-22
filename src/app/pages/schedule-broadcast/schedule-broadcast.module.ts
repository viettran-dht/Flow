import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleBroadcastComponent } from './schedule-broadcast.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ScheduleBroadcastComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ScheduleBroadcastComponent}])
  ]
})
export class ScheduleBroadcastModule { }
