import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyComptePage } from './modify-compte.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyComptePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyComptePageRoutingModule {}
