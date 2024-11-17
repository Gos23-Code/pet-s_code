import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public id: string | null = null; // Permite que `id` sea de tipo string o null

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    // Asigna el UID del usuario actual o null si no está logueado
    this.id = await this.authService.getCurrentUID();
  }

  // Método para redirigir al usuario a la página de pets
  goToPets() {
    if (this.id) {
      this.router.navigate([`/pet/${this.id}`]);
    } else {
      // Si no hay ID, redirige al login o muestra un mensaje de error
      this.router.navigate(['/login']);
    }
  }
}
