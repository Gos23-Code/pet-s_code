import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly authfire: AngularFireAuth) { }

  public register(Email: string, Password: string) {
    
    return new Promise((resolve, reject) => {
      this.authfire.createUserWithEmailAndPassword(Email, Password)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  } 
}