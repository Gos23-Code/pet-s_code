import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VaccunePageRoutingModule } from './vaccune-routing.module';

import { VaccunePage } from './vaccune.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VaccunePageRoutingModule
  ],
  declarations: [VaccunePage]
})
export class VaccunePageModule {}
