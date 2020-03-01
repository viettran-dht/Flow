import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleBroadcastComponent } from './schedule-broadcast.component';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [ScheduleBroadcastComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    RouterModule.forChild([{path: '', component: ScheduleBroadcastComponent}])
  ]
})
export class ScheduleBroadcastModule { }
