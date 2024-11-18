import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccunePage } from './vaccune.page';

const routes: Routes = [
  { path: '', component: VaccunePage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaccuneRoutingModule {}
