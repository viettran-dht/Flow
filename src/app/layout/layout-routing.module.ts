import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'feature',
        loadChildren: () => import('../pages/feature/feature.module').then(m => m.FeatureModule)
      },
      {
        path: 'example',
        loadChildren: () => import('../pages/example/example.module').then(m => m.ExampleModule)
      },
      {
        path: 'add-new-flow',
        loadChildren: () => import('../pages/add-new-flow/add-new-flow.module').then(m => m.AddNewFlowModule)
      },
      {
        path: 'billing',
        loadChildren: () => import('../pages/billing/billing.module').then(m => m.BillingModule)
      },
      {
        path: 'broadcast',
        loadChildren: () => import('../pages/broadcast/broadcast.module').then(m => m.BroadcastModule)
      },
      {
        path: 'insight',
        loadChildren: () => import('../pages/insight/insight.module').then(m => m.InsightModule)
      },
      {
        path: 'my-flows',
        loadChildren: () => import('../pages/my-flows/my-flows.module').then(m => m.MyFlowsModule)
      },
      {
        path: 'tutorial',
        loadChildren: () => import('../pages/tutorial/tutorial.module').then(m => m.TutorialModule)
      },
      {
        path: 'user-groups',
        loadChildren: () => import('../pages/user-groups/user-groups.module').then(m => m.UserGroupsModule)
      },
      {
        path: 'account-settings',
        loadChildren: () => import('../pages/account-settings/account-settings.module').then(m => m.AccountSettingsModule)
      },
      { path: '', redirectTo: 'example', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
