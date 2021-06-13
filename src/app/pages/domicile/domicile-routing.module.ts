import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DomicilePage } from './domicile.page';

const routes: Routes = [
  {
    path: '',
    component: DomicilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomicilePageRoutingModule {}
