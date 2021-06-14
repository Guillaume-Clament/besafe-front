import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AngesPageRoutingModule } from './anges-routing.module';

import { AngesPage } from './anges.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngesPageRoutingModule
  ],
  declarations: [AngesPage]
})
export class AngesPageModule {}
