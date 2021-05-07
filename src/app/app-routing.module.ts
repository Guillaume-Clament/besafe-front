import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    path: 'carte',
    loadChildren: () =>
      import('./pages/carte/carte.module').then(
        (m) => m.CartePageModule
      ),
  },  {
    path: 'itineraire-modal',
    loadChildren: () => import('./itineraire-modal/itineraire-modal.module').then( m => m.ItineraireModalPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
