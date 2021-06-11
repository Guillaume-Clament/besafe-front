import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGroupePage } from './add-groupe.page';

const routes: Routes = [
  {
    path: '',
    component: AddGroupePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddGroupePageRoutingModule {}
