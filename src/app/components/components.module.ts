import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LoadingInsideBtnComponent } from './loading-inside-btn/loading-inside-btn.component';



@NgModule({
  declarations: [
    HeaderComponent,
    LoadingInsideBtnComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    LoadingInsideBtnComponent,
  ]
})
export class ComponentsModule { }
