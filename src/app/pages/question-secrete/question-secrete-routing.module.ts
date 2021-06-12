import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionSecretePage } from './question-secrete.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionSecretePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionSecretePageRoutingModule {}
