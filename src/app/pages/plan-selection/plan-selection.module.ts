import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanSelectionComponent } from './plan-selection.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PlanSelectionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: PlanSelectionComponent}])
  ]
})
export class PlanSelectionModule { }
