import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoPage } from './user-info.page'; // Ruta al componente

const routes: Routes = [
  {
    path: '',
    component: UserInfoPage, // El componente que se mostrará cuando se acceda a esta ruta
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Usa forChild para rutas hijas dentro de un módulo
  exports: [RouterModule],
})
export class UserInfoPageRoutingModule {}
