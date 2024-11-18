import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';
import { PetService } from '../shared/services/pet.service';
import { NotificationService } from '../shared/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public userName: string = '';
  public userId: string = '';
  public pets: any[] = [];
  public notifications: any[] = [];

  constructor(
    private authService: AuthService,
    private petService: PetService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserData(); // Cargamos los datos del usuario al iniciar
  }
  
  loadUserData() {
    this.authService.getCurrentUID()
      .then((uid) => {
        if (!uid) {
          console.error('No se encontró UID del usuario');
          return;
        }
        this.userId = uid;
        this.loadUserName();  // Llama a la función para cargar el nombre del usuario
      })
      .catch((error) => console.error('Error al obtener UID:', error));
  }
  
  loadUserName() {
    this.authService.getUserName(this.userId)  // Obtener el nombre del usuario
      .then((name) => {
        this.userName = name || 'Usuario';  // Si no se encuentra un nombre, se asigna un valor por defecto
        console.log('Nombre de usuario cargado:', this.userName); // Verificar el valor
      })
      .catch((error) => {
        console.error('Error al cargar el nombre del usuario:', error);
        this.userName = 'Usuario';  // Valor predeterminado
      });
  }
  

  loadPets() {
    if (!this.userId) return;  // Asegurarnos de que el ID del usuario esté cargado
    this.petService.getUserPets(this.userId).subscribe((pets) => {
      this.pets = pets;
    }, (error) => {
      console.error('Error al cargar mascotas:', error);
    });
  }

  loadNotifications() {
    if (!this.userId) return;  // Asegurarnos de que el ID del usuario esté cargado
    this.notificationService.getNotifications(this.userId).subscribe((notifications) => {
      this.notifications = notifications;
    }, (error) => {
      console.error('Error al cargar notificaciones:', error);
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
    });
  }
}
