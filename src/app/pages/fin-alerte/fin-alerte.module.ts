import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinAlertePageRoutingModule } from './fin-alerte-routing.module';

import { FinAlertePage } from './fin-alerte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinAlertePageRoutingModule
  ],
  declarations: [FinAlertePage]
})
export class FinAlertePageModule {}
