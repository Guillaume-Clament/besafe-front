import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AngesPage } from './anges.page';

const routes: Routes = [
  {
    path: '',
    component: AngesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngesPageRoutingModule {}
