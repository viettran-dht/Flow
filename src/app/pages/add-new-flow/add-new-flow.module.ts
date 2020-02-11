import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewFlowComponent } from './add-new-flow.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AddNewFlowComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AddNewFlowComponent }])
  ]
})
export class AddNewFlowModule { }
