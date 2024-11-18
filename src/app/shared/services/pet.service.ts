import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private collectionName = 'pets'; // Nombre de la colección en Firestore

  constructor(private firestore: AngularFirestore) {}

  /**
   * Obtiene las mascotas del usuario autenticado.
   * @param userId ID del usuario autenticado.
   * @returns Observable con la lista de mascotas.
   */
  getUserPets(userId: string) {
    return this.firestore
      .collection('pets', (ref) => ref.where('userId', '==', userId))
      .valueChanges();
  }
  

  /**
   * Agrega una nueva mascota al usuario autenticado.
   * @param pet Objeto con los datos de la mascota.
   * @returns Promesa de la operación.
   */
  addPet(pet: any): Promise<void> {
    const id = this.firestore.createId(); // Genera un ID único para la mascota
    return this.firestore.collection(this.collectionName).doc(id).set({ ...pet, id });
  }

  /**
   * Actualiza la información de una mascota.
   * @param petId ID de la mascota.
   * @param updatedData Datos actualizados de la mascota.
   * @returns Promesa de la operación.
   */
  updatePet(petId: string, updatedData: any): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(petId).update(updatedData);
  }

  /**
   * Elimina una mascota.
   * @param petId ID de la mascota a eliminar.
   * @returns Promesa de la operación.
   */
  deletePet(petId: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(petId).delete();
  }
}
