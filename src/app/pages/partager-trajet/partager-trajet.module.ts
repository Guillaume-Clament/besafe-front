import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartagerTrajetPageRoutingModule } from './partager-trajet-routing.module';

import { PartagerTrajetPage } from './partager-trajet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartagerTrajetPageRoutingModule
  ],
  declarations: [PartagerTrajetPage]
})
export class PartagerTrajetPageModule {}
