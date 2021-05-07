import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItineraireModalPage } from './itineraire-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ItineraireModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItineraireModalPageRoutingModule {}
