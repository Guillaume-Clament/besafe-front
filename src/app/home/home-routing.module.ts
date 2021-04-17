import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'compte',
        loadChildren: () =>
          import('../pages/compte/compte.module').then(
            (m) => m.ComptePageModule
          ),
      },
      {
        path: 'carte',
        loadChildren: () =>
          import('../pages/carte/carte.module').then((m) => m.CartePageModule),
      },
      {
        path: 'groupe',
        loadChildren: () =>
          import('../pages/groupe/groupe.module').then(
            (m) => m.GroupePageModule
          ),
      },
      {
        path: 'alerte',
        loadChildren: () =>
          import('../pages/alerte/alerte.module').then(
            (m) => m.AlertePageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
