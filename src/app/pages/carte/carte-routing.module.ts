import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartePage } from './carte.page';

const routes: Routes = [
  {
    path: '',
    component: CartePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartePageRoutingModule {}
