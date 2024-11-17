<<<<<<< HEAD
import { Component, OnInit} from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';
=======
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../shared/services/toast/toast.service';
import { User } from '../shared/model/user.interface';
>>>>>>> 32ae936c8a82ca9d39a941d587be0b17b0a12394

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
<<<<<<< HEAD
export class HomePage implements OnInit {public id: string = "";

  constructor(private authService: AuthService) {}

  async ngOnInit() {

    this.id = await this.authService.getCurrentUID();

  }
=======
export class HomePage implements OnInit {
  userForm: FormGroup;
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    // Inicializar el formulario
    this.userForm = this.fb.group({
      Name: ['', [Validators.required]],
      Lastname: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      Age: ['', [Validators.required, Validators.min(18)]],
      Image: [''], // Avatar
    });
  }
>>>>>>> 32ae936c8a82ca9d39a941d587be0b17b0a12394

  ngOnInit() {}

  addUser() {
    if (this.userForm.invalid) {
      this.toastService.mentoast('Por favor, completa todos los campos correctamente.', 'danger');
      return;
    }

    const newUser: User = this.userForm.value;
    this.users.push(newUser);

    // Limpia el formulario después de agregar un usuario
    this.userForm.reset();
    this.toastService.mentoast('Usuario registrado con éxito.', 'success');
  }
}
