import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFlowsComponent } from './my-flows.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MyFlowsComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: MyFlowsComponent}])
  ]
})
export class MyFlowsModule { }
