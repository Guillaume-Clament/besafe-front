import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidationTrajetPageRoutingModule } from './validation-trajet-routing.module';

import { ValidationTrajetPage } from './validation-trajet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidationTrajetPageRoutingModule
  ],
  declarations: [ValidationTrajetPage]
})
export class ValidationTrajetPageModule {}
