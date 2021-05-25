import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyComptePageRoutingModule } from './modify-compte-routing.module';

import { ModifyComptePage } from './modify-compte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyComptePageRoutingModule
  ],
  declarations: [ModifyComptePage]
})
export class ModifyComptePageModule {}
