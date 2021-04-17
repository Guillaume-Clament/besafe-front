import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlertePageRoutingModule } from './alerte-routing.module';

import { AlertePage } from './alerte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlertePageRoutingModule
  ],
  declarations: [AlertePage]
})
export class AlertePageModule {}
