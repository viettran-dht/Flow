import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LoadingInsideBtnComponent } from './loading-inside-btn/loading-inside-btn.component';
import { SelectCustomComponent } from './select-custom/select-custom.component';
import { TagInputComponent } from './tag-input/tag-input.component';
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';


@NgModule({
  declarations: [
    HeaderComponent,
    LoadingInsideBtnComponent,
    SelectCustomComponent,
    TagInputComponent,
  ],
  imports: [
    CommonModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    LoadingInsideBtnComponent,
    SelectCustomComponent,
    TagInputComponent
  ]
})
export class ComponentsModule { }
