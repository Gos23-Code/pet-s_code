// auth.service.ts

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Para acceder a Firestore
import { UserData } from '../auth/model/user-model';  // Importa la interfaz de Usuario
import { Observable } from 'rxjs';  // Importa Observable desde RxJS


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly authfire: AngularFireAuth,
    private readonly firestore: AngularFirestore  // Para interactuar con Firestore
  ) {}

  // Método para registrar un nuevo usuario
  public register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authfire
        .createUserWithEmailAndPassword(email, password)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  

  // Método para iniciar sesión con email y password
  public login(email: string, password: string) {
    return this.authfire.signInWithEmailAndPassword(email, password);
  }

  // Método para cerrar sesión
  public logout() {
    return this.authfire.signOut();
  }

  // Obtener UID del usuario actual
  public getCurrentUID(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.authfire.currentUser.then((user) => {
        console.log('Usuario actual:', user);  // Verifica si el usuario está autenticado
        resolve(user?.uid || '');
      }).catch((err) => {
        console.error('Error obteniendo el UID:', err);
        reject(err);
      });
    });
  }

  // Obtener nombre del usuario desde Firestore
  public getUserName(uid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('users')
        .doc(uid)
        .get()
        .toPromise()
        .then((doc) => {
          if (doc && doc.exists) {
            const userData = doc.data() as UserData;  // Usamos la interfaz UserData
            resolve(userData?.Name || 'Usuario');  // Accedemos con el nombre del usuario
          } else {
            reject('Usuario no encontrado');
          }
        })
        .catch((error) => reject(error));
    });
  }
    // Método para obtener el usuario autenticado
    public getAuthenticatedUser(): Observable<any> {
      return this.authfire.authState;  // Devuelve el estado de autenticación del usuario
    }
}
