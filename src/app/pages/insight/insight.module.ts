import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsightComponent } from './insight.component';
import { RouterModule } from '@angular/router';
import { KeyInsightComponent } from './key-insight/key-insight.component';
import { EngagementInsightComponent } from './engagement-insight/engagement-insight.component';



@NgModule({
  declarations: [InsightComponent, KeyInsightComponent, EngagementInsightComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: InsightComponent, children: [
          { path: 'key-insight', component: KeyInsightComponent },
          { path: 'engagement-insight', component: EngagementInsightComponent }
        ]
      }
    ])
  ]
})
export class InsightModule { }
