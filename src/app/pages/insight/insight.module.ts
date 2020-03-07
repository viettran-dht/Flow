import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsightComponent } from './insight.component';
import { RouterModule } from '@angular/router';
import { KeyInsightComponent } from './key-insight/key-insight.component';
import { EngagementInsightComponent } from './engagement-insight/engagement-insight.component';
import { ChartsModule } from 'ng2-charts';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';


@NgModule({
  declarations: [InsightComponent, KeyInsightComponent, EngagementInsightComponent],
  imports: [
    CommonModule,
    ChartsModule,
    ComponentsModule,
    FormsModule,
    SwiperModule,
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
