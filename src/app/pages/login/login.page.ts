import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      await this.toastService.mentoast(
        'Por favor, completa todos los campos correctamente.',
        'warning'
      );
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    try {
      await this.authService.login(email, password);
      await this.toastService.mentoast('Inicio de sesión exitoso', 'success');
      this.router.navigate(['/home']);
    } catch (error: any) {
      await this.toastService.mentoast(
        error.message || 'Ocurrió un error al iniciar sesión',
        'danger'
      );
    } finally {
      this.isLoading = false;
    }
  }
}
