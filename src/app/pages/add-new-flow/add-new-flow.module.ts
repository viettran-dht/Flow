import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewFlowComponent } from './add-new-flow.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { DateTimePickerModule } from 'ngx-datetime-picker';
import { DirectivesModule } from 'src/app/directives/directives.module';



@NgModule({
  declarations: [AddNewFlowComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    DateTimePickerModule,
    DirectivesModule,
    RouterModule.forChild([{ path: '', component: AddNewFlowComponent }])
  ]
})
export class AddNewFlowModule { }
