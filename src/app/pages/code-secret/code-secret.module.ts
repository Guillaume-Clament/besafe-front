import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodeSecretPageRoutingModule } from './code-secret-routing.module';

import { CodeSecretPage } from './code-secret.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodeSecretPageRoutingModule
  ],
  declarations: [CodeSecretPage]
})
export class CodeSecretPageModule {}
