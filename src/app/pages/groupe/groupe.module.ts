import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupePageRoutingModule } from './groupe-routing.module';

import { GroupePage } from './groupe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupePageRoutingModule
  ],
  declarations: [GroupePage]
})
export class GroupePageModule {}
