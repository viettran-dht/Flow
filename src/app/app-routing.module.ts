import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule)
  },
  {
    path: 'account-settings',
    loadChildren: () => import('./pages/account-settings/account-settings.module').then(m => m.AccountSettingsModule)
  },
  {
    path: 'add-new-flow',
    loadChildren: () => import('./pages/add-new-flow/add-new-flow.module').then(m => m.AddNewFlowModule)
  },
  {
    path: 'billing',
    loadChildren: () => import('./pages/billing/billing.module').then(m => m.BillingModule)
  },
  {
    path: 'broadcast',
    loadChildren: () => import('./pages/broadcast/broadcast.module').then(m => m.BroadcastModule)
  },
  {
    path: 'insight',
    loadChildren: () => import('./pages/insight/insight.module').then(m => m.InsightModule)
  },
  {
    path: 'my-flows',
    loadChildren: () => import('./pages/my-flows/my-flows.module').then(m => m.MyFlowsModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule)
  },
  {
    path: 'user-groups',
    loadChildren: () => import('./pages/user-groups/user-groups.module').then(m => m.UserGroupsModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: 'feature',
    loadChildren: () => import('./pages/feature/feature.module').then(m => m.FeatureModule)
  },
  {
    path: 'example',
    loadChildren: () => import('./pages/example/example.module').then(m => m.ExampleModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
