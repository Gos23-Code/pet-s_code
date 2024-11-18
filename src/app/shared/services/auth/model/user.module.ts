// user.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';  // Asegúrate de importar AuthService

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [AuthService],  // Incluye el AuthService como un proveedor
})
export class UserModule { }
