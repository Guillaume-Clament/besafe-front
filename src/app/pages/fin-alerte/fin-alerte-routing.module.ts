import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinAlertePage } from './fin-alerte.page';

const routes: Routes = [
  {
    path: '',
    component: FinAlertePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinAlertePageRoutingModule {}
