import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddGroupePageRoutingModule } from './add-groupe-routing.module';

import { AddGroupePage } from './add-groupe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddGroupePageRoutingModule
  ],
  declarations: [AddGroupePage]
})
export class AddGroupePageModule {}
