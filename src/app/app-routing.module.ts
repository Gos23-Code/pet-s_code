import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoadingController } from '@ionic/angular';

const routes: Routes = [
  {
<<<<<<< HEAD
    path: 'home/:id',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
=======
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
>>>>>>> 32ae936c8a82ca9d39a941d587be0b17b0a12394
  },
  {
<<<<<<< HEAD
    path: 'register/:id',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: '**',
    redirectTo: 'login',
=======
    path: '**',
    redirectTo: 'home',
>>>>>>> 32ae936c8a82ca9d39a941d587be0b17b0a12394
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
