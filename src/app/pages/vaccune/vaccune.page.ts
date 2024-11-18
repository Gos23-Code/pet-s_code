import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VaccuneService } from '../../shared/vaccune.service';

@Component({
  selector: 'app-vaccune',
  templateUrl: './vaccune.page.html',
  styleUrls: ['./vaccune.page.scss'],
})
export class VaccunePage implements OnInit {
  public vaccuneForm: FormGroup;
  public selectedFile: File | null = null;
  public isEditing: boolean = false;
  public files: any[] = [];
  public vaccines: any[] = [];

  constructor(private fb: FormBuilder, private vaccuneService: VaccuneService) {
    this.vaccuneForm = this.fb.group({
      name: ['', Validators.required],
      vaccinationDate: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadVaccines();
  }

  // Cargar lista de vacunas
  async loadVaccines() {
    try {
      this.vaccines = await this.vaccuneService.listVaccines();
    } catch (error) {
      console.error('Error al cargar las vacunas:', error);
    }
  }

  // Manejar la selección del archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      alert('Por favor, selecciona un archivo PDF.');
    }
  }

  // Guardar vacuna
  async saveVaccune() {
    if (this.vaccuneForm.invalid) {
      return;
    }

    const vaccuneData = {
      ...this.vaccuneForm.value,
      userId: 'user-id', // Ajusta este valor según tu lógica
    };

    if (this.selectedFile) {
      try {
        // Subir el archivo PDF a Supabase
        const filePath = await this.vaccuneService.uploadFile(this.selectedFile);
        
        // Guardar la vacuna con la URL del archivo en Firebase
        await this.vaccuneService.saveVaccune(vaccuneData, filePath);

        // Limpiar el formulario y los campos
        this.vaccuneForm.reset();
        this.selectedFile = null;
        console.log('Vacuna guardada con éxito.');
        this.loadVaccines(); // Recargar las vacunas después de guardar
      } catch (error) {
        console.error('Error al guardar la vacuna:', error);
      }
    } else {
      console.error('No se ha seleccionado un archivo PDF');
    }
  }

  // Alternar entre editar y no editar
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
