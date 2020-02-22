import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomatedResponseComponent } from './automated-response.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AutomatedResponseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AutomatedResponseComponent }])
  ]
})
export class AutomatedResponseModule { }
