// app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth/guard.guard'; // Asegúrate de importar el guard
import { HomePageModule } from './home/home.module'; // Asegúrate de que tu módulo HomePage esté importado

const routes: Routes = [
  {
    path: 'home/:id',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'pet',
    loadChildren: () => import('./pages/pet/pet.module').then(m => m.PetPageModule),
    canActivate: [AuthGuard], // Protege esta ruta con el guard si es necesario
  },

  {
    path: 'vaccune',
    loadChildren: () =>
      import('./pages/vaccune/vaccune.module').then((m) => m.VaccuneModule),
    canActivate: [AuthGuard], // Asegúrate de que el guard funciona si es necesario

  },

  
  
  {
    path: 'user-info',
    loadChildren: () => import('./pages/user-info/user-info.module').then(m => m.UserInfoPageModule),
    canActivate: [AuthGuard], // Si es necesario proteger la ruta
  },
  {
    path: 'resetpassword',
    loadChildren: () => import('./pages/resetpassword/resetpassword.module').then( m => m.ResetpasswordPageModule)
  },
  {
    path: '**', // Ruta por defecto si no se encuentra una coincidencia
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
