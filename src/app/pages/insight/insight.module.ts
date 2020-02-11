import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsightComponent } from './insight.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [InsightComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: InsightComponent }])
  ]
})
export class InsightModule { }
