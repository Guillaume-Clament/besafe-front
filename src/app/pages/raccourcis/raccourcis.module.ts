import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RaccourcisPageRoutingModule } from './raccourcis-routing.module';

import { RaccourcisPage } from './raccourcis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RaccourcisPageRoutingModule
  ],
  declarations: [RaccourcisPage]
})
export class RaccourcisPageModule {}
