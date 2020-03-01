import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomatedResponseComponent } from './automated-response.component';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [AutomatedResponseComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    RouterModule.forChild([{ path: '', component: AutomatedResponseComponent }])
  ]
})
export class AutomatedResponseModule { }
