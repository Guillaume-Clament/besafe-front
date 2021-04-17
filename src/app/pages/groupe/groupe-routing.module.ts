import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupePage } from './groupe.page';

const routes: Routes = [
  {
    path: '',
    component: GroupePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupePageRoutingModule {}
