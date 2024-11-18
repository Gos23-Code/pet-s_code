import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { VaccuneRoutingModule } from './vaccune-routing.module';
import { VaccunePage } from './vaccune.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    FormsModule,
    VaccuneRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    IonicModule
  ],
  declarations: [VaccunePage]  // No es necesario declarar AddComponent ni ListComponent aquí
})
export class VaccuneModule {}
