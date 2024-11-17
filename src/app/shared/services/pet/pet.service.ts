import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private firestore: AngularFirestore) {}

  getPetsByUserId(userId: string): Observable<any[]> {
    return this.firestore.collection('pets', ref => ref.where('userId', '==', userId)).valueChanges();
  }
}