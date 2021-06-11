import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageModule } from './home/home.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./index/index.module').then((m) => m.IndexPageModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'onboarding',
    loadChildren: () =>
      import('./pages/onboarding/onboarding.module').then(
        (m) => m.OnboardingPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'carte',
    loadChildren: () =>
      import('./pages/carte/carte.module').then((m) => m.CartePageModule),
  },
  {
    path: 'itineraire-modal',
    loadChildren: () =>
      import('./itineraire-modal/itineraire-modal.module').then(
        (m) => m.ItineraireModalPageModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'password-reset',
    loadChildren: () =>
      import('./pages/password-reset/password-reset.module').then(
        (m) => m.PasswordResetPageModule
      ),
  },
  {
    path: 'modify-compte',
    loadChildren: () =>
      import('./pages/modify-compte/modify-compte.module').then(
        (m) => m.ModifyComptePageModule
      ),
  },
  {
    path: 'discussion',
    loadChildren: () => import('./pages/discussion/discussion.module').then( m => m.DiscussionPageModule)
  },
  {
    path: 'fin-alerte',
    loadChildren: () => import('./pages/fin-alerte/fin-alerte.module').then( m => m.FinAlertePageModule)
  },  {
    path: 'validation-trajet',
    loadChildren: () => import('./pages/validation-trajet/validation-trajet.module').then( m => m.ValidationTrajetPageModule)
  },
  {
    path: 'code-secret',
    loadChildren: () => import('./pages/code-secret/code-secret.module').then( m => m.CodeSecretPageModule)
  },
  {
    path: 'question-secrete',
    loadChildren: () => import('./pages/question-secrete/question-secrete.module').then( m => m.QuestionSecretePageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
