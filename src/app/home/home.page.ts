import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../shared/services/toast/toast.service';
import { User } from '../shared/model/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
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
