import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeSecretPage } from './code-secret.page';

const routes: Routes = [
  {
    path: '',
    component: CodeSecretPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodeSecretPageRoutingModule {}
