import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { LoadingService } from './controllers/loading.service';
import { AuthService } from './services/auth/auth.service';


const COMPONENTS = [InputComponent, ButtonComponent, AvatarComponent]

const MODULE = [ CommonModule, ReactiveFormsModule, IonicModule, FormsModule]

const CONTROLLERS = [LoadingService]

const PROVIDERS = [AuthService]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...MODULE
  ],
  providers: [...CONTROLLERS, ...PROVIDERS],
  exports: [...COMPONENTS, ...MODULE]
})
export class SharedModule { }
