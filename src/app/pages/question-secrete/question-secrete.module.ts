import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionSecretePageRoutingModule } from './question-secrete-routing.module';

import { QuestionSecretePage } from './question-secrete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionSecretePageRoutingModule
  ],
  declarations: [QuestionSecretePage]
})
export class QuestionSecretePageModule {}
