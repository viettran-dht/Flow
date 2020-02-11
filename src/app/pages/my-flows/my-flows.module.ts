import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFlowsComponent } from './my-flows.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [MyFlowsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: MyFlowsComponent}])
  ]
})
export class MyFlowsModule { }
