import { NgModule } from '@angular/core';

import { UppetPageRoutingModule } from './uppet-routing.module';

import { UppetPage } from './uppet.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    UppetPageRoutingModule
  ],
  declarations: [UppetPage]
})
export class UppetPageModule {}
