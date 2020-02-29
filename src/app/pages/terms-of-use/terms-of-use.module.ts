import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsOfUseComponent } from './terms-of-use.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TermsOfUseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: TermsOfUseComponent}])
  ]
})
export class TermsOfUseModule { }
