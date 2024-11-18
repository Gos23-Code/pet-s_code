import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LoadingService } from 'src/app/shared/controllers/loading.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {
  public email!: FormControl;
  public resetForm!: FormGroup;

  constructor(
    private readonly authSrv: AuthService,
    private readonly loadingSrv: LoadingService
  ) {
     this.initForm();

  }

  ngOnInit() {}
  private initForm() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.resetForm = new FormGroup({
      email: this.email,
    });
  }

}
