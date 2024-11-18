import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/shared/controllers/loading.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router'; // Asegúrate de importar Router aquí


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  public onlyview = true;  // Set to true to disable editing
  public Image!: FormControl;
  public Name!: FormControl;
  public Lastname!: FormControl;
  public Age!: FormControl;
  public Email!: FormControl;
  public Phone!: FormControl;
  public Password!: FormControl;
  public registerForm!: FormGroup;
  public id: string = "";

  constructor(
    private readonly authsrv: AuthService,
    private readonly loadsrv: LoadingService,
    private readonly navctr: NavController,
    private readonly firest: AngularFirestore,
    private readonly storaService: StorageService,
    private readonly toaMsj: ToastService,
    private readonly R: ActivatedRoute,
    private router: Router
  ) {
    this.initFrom();
  }

  ngOnInit() {
    this.authsrv.getAuthenticatedUser().subscribe(user => {
      if (user) {
        this.id = user.uid; // Obtener el uid del usuario autenticado
        this.fillUserData();
      }
    });
  
    // Deshabilitar todos los controles del formulario
    this.registerForm.disable();
  }
  

  public async fillUserData() {
    try {
      await this.loadsrv.show();

      const userD = await lastValueFrom(this.firest.collection('users').doc(this.id).get());

      if (userD.exists) {
        const uData = userD.data() as User;
        this.registerForm.patchValue({
          Name: uData?.Name || '',
          Lastname: uData?.Lastname || '',
          Age: uData?.Age || '',
          Phone: uData?.Phone || '',
          Email: uData?.Email || ''
        });
        this.Image.setValue(uData?.Image || ''); // Set image value without allowing edit
      } else {
        console.error('No user data found');
      }

      await this.loadsrv.dismiss();
    } catch (error) {
      await this.loadsrv.dismiss();
      console.error('Error loading user data:', error);
    }
  }

  private initFrom() {
    this.Image = new FormControl('');
    this.Name = new FormControl('', [Validators.required]);
    this.Lastname = new FormControl('', [Validators.required]);
    this.Age = new FormControl('', [Validators.required]);
    this.Email = new FormControl('', [Validators.required, Validators.email]);
    this.Phone = new FormControl('', [Validators.required]);
    this.Password = new FormControl('', [Validators.required]);
    this.registerForm = new FormGroup({
      Image: this.Image,
      Name: this.Name,
      Lastname: this.Lastname,
      Age: this.Age,
      Email: this.Email,
      Phone: this.Phone,
      Password: this.Password,
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
