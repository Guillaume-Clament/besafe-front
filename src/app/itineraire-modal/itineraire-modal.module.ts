import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItineraireModalPageRoutingModule } from './itineraire-modal-routing.module';

import { ItineraireModalPage } from './itineraire-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItineraireModalPageRoutingModule
  ],
  declarations: [ItineraireModalPage]
})
export class ItineraireModalPageModule {}
