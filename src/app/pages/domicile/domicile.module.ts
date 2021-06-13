import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomicilePageRoutingModule } from './domicile-routing.module';

import { DomicilePage } from './domicile.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DomicilePageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [DomicilePage]
})
export class DomicilePageModule {}
