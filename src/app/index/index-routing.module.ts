import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexPage } from './index.page';

const routes: Routes = [
  {
    path: '',
    component: IndexPage,
    children: [
      {
        path: 'welcome',
        loadChildren: () =>
          import('../pages/welcome/welcome.module').then(
            (m) => m.WelcomePageModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('../pages/login/login.module').then((m) => m.LoginPageModule),
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('../pages/signup/signup.module').then(
            (m) => m.SignupPageModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('../pages/splash/splash.module').then(
            (m) => m.SplashPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/index/splash',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/index/splash',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexPageRoutingModule {}
