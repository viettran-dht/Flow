import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BroadcastComponent } from './broadcast.component';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [BroadcastComponent],
  imports: [
    CommonModule,
    FullCalendarModule,
    RouterModule.forChild([{ path: '', component: BroadcastComponent }])
  ]
})
export class BroadcastModule { }
