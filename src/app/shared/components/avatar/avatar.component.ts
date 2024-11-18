import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoadingService } from '../../controllers/loading.service';
import { SupabaseService } from 'src/app/core/supabasecore/supabase.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  protected image = "https://ionicframework.com/docs/img/demos/avatar.svg";
  selectedImage: File | null = null;
  imageUrl: string | null = null;

  @Input() control = new FormControl();
  @Input() onlyview = false;
  @Input() disable = false;  


  @ViewChild('fileInput', { static: false }) fileInput: ElementRef<HTMLInputElement> | undefined;

  protected mimetype = "image/jpeg";

  constructor(
    private readonly loadsrv: LoadingService, 
    private supabase: SupabaseService, 
    private stora: StorageService
  ) { }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  ngOnInit() {
    if (this.control.value) {
      this.image = this.control.value;
    }

    this.control.valueChanges.subscribe(value => {
      if (value && typeof value === 'string') {
        this.image = value;
      }
    });
  }

  public async uploadImage(event: any) {
    if (this.onlyview) return;

    const file = event.target.files[0];
    if (!file) return;

    try {
      await this.loadsrv.show();
      this.previewImage(file);

      const uploadData = await this.stora.uploadImage(file);
      if (uploadData) {
        const url = await this.stora.getFotoUrl(uploadData.path);
        console.log('URL de imagen subida:', url);
        this.control.setValue(url);
      }
      
      await this.loadsrv.dismiss();
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      await this.loadsrv.dismiss();
    }
  }

  onImageError() {
    console.error('Error loading image:', this.image);
    this.image = "https://ionicframework.com/docs/img/demos/avatar.svg";
  }

  private previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  triggerFileInputClick() {
    if (!this.onlyview && this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }
}
