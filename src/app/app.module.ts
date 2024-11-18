import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { ReactiveFormsModule } from '@angular/forms';
import { VaccuneModule } from './pages/vaccune/vaccune.module';
import { VaccuneRoutingModule } from './pages/vaccune/vaccune-routing.module';


@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, VaccuneModule, VaccuneRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor() {
    initializeApp(environment.FIREBASE_CONFIG ); // Inicializa Firebase usando environment
  }

}
