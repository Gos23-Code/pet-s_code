import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private collectionName = 'pets'; // Nombre de la colección en Firestore

  constructor(private firestore: AngularFirestore) { }

  getUserPets(userId: string) {
    return this.firestore
      .collection('pets', (ref) => ref.where('userId', '==', userId))
      .valueChanges();
  }
  

  addPet(pet: any): Promise<void> {
    const id = this.firestore.createId(); // Genera un ID único para la mascota
    return this.firestore.collection(this.collectionName).doc(id).set({ ...pet, id });
  }

 
  updatePet(petId: string, updatedData: any): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(petId).update(updatedData);
  }

 
  deletePet(petId: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(petId).delete();
  }
}
