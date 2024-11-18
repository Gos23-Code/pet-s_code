import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VaccuneService {
  private supabase: SupabaseClient;
  private bucketName = 'pdf-storage'; // Nombre del bucket en Supabase
  private firestore: AngularFirestore = inject(AngularFirestore);

  constructor() {
    this.supabase = createClient(
      'https://xhpkahiihznmsmradgca.supabase.co', // URL de Supabase
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhocGthaGlpaHpubXNtcmFkZ2NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NDMyNTQsImV4cCI6MjA0NzAxOTI1NH0.-xojWLTKGur0paiSWaJg3erRHZCrCwjNeWJVwL8q_Ho' // Clave de Supabase
    );
  }

  // Subir archivo PDF a Supabase
  async uploadFile(file: File): Promise<string> {
    const filePath = `pdfV/${file.name}`;
    try {
      // Intentar eliminar el archivo si existe
      const { data: existingData, error: checkError } = await this.supabase.storage
        .from(this.bucketName)
        .list('pdfV', { search: file.name });  // List files to check if the file exists

      if (checkError) {
        console.warn('Error al verificar archivo existente:', checkError.message);
      } else if (existingData.length > 0) {
        // El archivo ya existe, intentar eliminarlo
        const { error: deleteError } = await this.supabase.storage
          .from(this.bucketName)
          .remove([filePath]);

        if (deleteError) {
          console.warn('No se pudo eliminar el archivo existente:', deleteError.message);
        }
      }

      // Ahora subimos el nuevo archivo
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .upload(filePath, file);

      if (error) {
        throw new Error(`Error al subir el archivo: ${error.message}`);
      }

      console.log('Archivo subido con éxito:', data);
      return filePath;
    } catch (err) {
      console.error('Error al subir el archivo:', err);
      throw err;
    }
  }

  // Guardar información de la vacuna en Firebase Firestore
  async saveVaccune(vaccuneData: any, filePath: string): Promise<void> {
    try {
      const vaccineRef = await this.firestore.collection('vaccines').add({
        ...vaccuneData,
        pdfFilePath: filePath, // Guarda el path del PDF en Firestore
        createdAt: new Date(),
      });
      console.log('Vacuna guardada con éxito', vaccineRef.id);
    } catch (err) {
      console.error('Error al guardar la vacuna:', err);
      throw err;
    }
  }

  // Obtener la URL pública del PDF
  async getPdfUrl(filePath: string): Promise<string | null> {
    try {
      const { data } = await this.supabase.storage
        .from(this.bucketName)
        .getPublicUrl(filePath);

      if (data?.publicUrl) {
        return data.publicUrl;
      }

      throw new Error('No se pudo obtener la URL pública del archivo.');
    } catch (err) {
      console.error('Error al obtener la URL del archivo:', err);
      return null;
    }
  }

  // Listar las vacunas desde Firebase
  async listVaccines(): Promise<any[]> {
    try {
      // Intentamos obtener los datos
      const vaccinesSnapshot = await this.firestore.collection('vaccines').get().toPromise();
      
      // Verificamos que vaccinesSnapshot no sea undefined o null
      if (!vaccinesSnapshot) {
        throw new Error('No se pudo obtener las vacunas.');
      }

      // Si hay datos, los mapeamos
      const vaccinesList = vaccinesSnapshot.docs.map((doc) => doc.data());
      return vaccinesList;
    } catch (err) {
      console.error('Error al listar las vacunas:', err);
      throw err;
    }
  }
}
