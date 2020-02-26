import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './clickOutside/click-outside.directive';



@NgModule({
  declarations: [ClickOutsideDirective],
  imports: [
    CommonModule
  ],
  exports: [ClickOutsideDirective]
})
export class DirectivesModule { }
