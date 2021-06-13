import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaccourcisPage } from './raccourcis.page';

const routes: Routes = [
  {
    path: '',
    component: RaccourcisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RaccourcisPageRoutingModule {}
