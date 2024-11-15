import { Injectable } from '@angular/core';
import { SupabaseService } from 'src/app/core/supabasecore/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private  supabase = this.supabS.getClient();
  
  constructor(private supabS: SupabaseService) { }

  public async uploadImage(file: File): Promise<any> {
      const fileName = `${Date.now()}_${file.name}`;
      

      const { data, error } = await this.supabase.storage
        .from('Images') // Nombre del bucket
        .upload(`Photos/${fileName}`, file, {
          cacheControl: '3600',
          upsert: false,
        });
        
      if (error) {
        console.error('Error al subir la imagen:', error.message);
        return null;
      }else{
        console.log('The photo upload successful: ', data);
        return data;
      }

      
  }

  public async getFotoUrl(filePath: string): Promise<string | null> {
    const { data } = await this.supabase.storage
    .from('Images')
    .getPublicUrl(filePath);

    if (!data) {
      console.error('Error al obtener la URL de la foto: ');
      return null;
    } else {
      return data.publicUrl;
    }
  }
}

  
