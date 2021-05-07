import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartePageRoutingModule } from './carte-routing.module';

import { CartePage } from './carte.page';
import { ItineraireModalPageModule } from 'src/app/itineraire-modal/itineraire-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartePageRoutingModule,
    ItineraireModalPageModule
  ],
  declarations: [CartePage]
})
export class CartePageModule {}
