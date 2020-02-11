import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialComponent } from './tutorial.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TutorialComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: TutorialComponent }])
  ]
})
export class TutorialModule { }
