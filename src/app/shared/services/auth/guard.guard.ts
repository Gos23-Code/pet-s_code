import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';  // Para manejar el Observable

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.authState.pipe(
      take(1), // Asegura que solo tomes un valor de la suscripción
      map((user) => {
        if (user) {
          return true;  // Si el usuario está autenticado, puede acceder
        } else {
          this.router.navigate(['/login']);  // Si no está autenticado, redirige
          return false;
        }
      })
    );
  }
}
