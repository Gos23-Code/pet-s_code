import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoadingController } from '@ionic/angular';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'register/:id',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule),
  },
  {
    path:'pet',
    loadChildren: () => import('./pages/pet/pet.module').then(m=> m.PetPageModule),
  },
  
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'pet',
    loadChildren: () => import('./pages/pet/pet.module').then( m => m.PetPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
