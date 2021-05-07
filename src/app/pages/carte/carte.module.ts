import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartePageRoutingModule } from './carte-routing.module';

import { CartePage } from './carte.page';
import { ItineraireModalPageModule } from 'src/app/itineraire-modal/itineraire-modal.module';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartePageRoutingModule,
    ItineraireModalPageModule,
    SharedComponentsModule
  ],
  declarations: [CartePage]
})
export class CartePageModule {}
