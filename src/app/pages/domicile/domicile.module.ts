import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomicilePageRoutingModule } from './domicile-routing.module';

import { DomicilePage } from './domicile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DomicilePageRoutingModule
  ],
  declarations: [DomicilePage]
})
export class DomicilePageModule {}
