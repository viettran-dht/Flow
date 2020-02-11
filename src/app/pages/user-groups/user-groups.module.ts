import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGroupsComponent } from './user-groups.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [UserGroupsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: UserGroupsComponent }])
  ]
})
export class UserGroupsModule { }
