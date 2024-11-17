import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly authfire: AngularFireAuth) {}

  public register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authfire
        .createUserWithEmailAndPassword(email, password)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  public login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authfire
        .signInWithEmailAndPassword(email, password)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  public logout() {
    return this.authfire.signOut();
  }
}
