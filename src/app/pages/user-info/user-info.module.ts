import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Ya tienes ReactiveFormsModule para formularios reactivos
import { IonicModule } from '@ionic/angular';
import { UserInfoPage } from './user-info.page'; // Ruta al componente
import { UserInfoPageRoutingModule } from './user-info-routing.module'; // Routing
import { SharedModule } from 'src/app/shared/shared.module';

// Importa tus componentes personalizados

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // Para formularios reactivos
    IonicModule,
    UserInfoPageRoutingModule, // Importa el módulo de rutas
    SharedModule
  ],
  declarations: [
    UserInfoPage,         // Declara el componente UserInfoPage
   
  ],
})
export class UserInfoPageModule {}
