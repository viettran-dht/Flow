import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFlowsComponent } from './my-flows.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [MyFlowsComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild([{path: '', component: MyFlowsComponent}])
  ]
})
export class MyFlowsModule { }
