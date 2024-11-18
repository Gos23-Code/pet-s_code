import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetService } from 'src/app/shared/services/pet.service';

@Component({
  selector: 'app-addpet',
  templateUrl: './addpet.component.html',
  styleUrls: ['./addpet.component.scss'],
})
export class AddpetComponent implements OnInit {
  public pets: any[] = [];
  public petForm: FormGroup;
  public selectedPhoto: string | null = null;
  public isDatePickerOpen = false;

  @ViewChild('photoInput') photoInput!: ElementRef;

  constructor(private fb: FormBuilder, private petService: PetService) {
    this.petForm = this.fb.group({
      name: ['', Validators.required],
      breed: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      birthdate: ['', Validators.required],
      photo: [null],
    });
  }

  ngOnInit() {
    this.loadPets();
  }

  loadPets() {
    const userId = 'user-id';
    this.petService.getUserPets(userId).subscribe((pets) => {
      this.pets = pets;
    });
  }

  openDatePicker() {
    this.isDatePickerOpen = true;
  }

  closeDatePicker() {
    this.isDatePickerOpen = false;
  }

  selectDate(event: any) {
    const selectedDate = event.detail.value;
    this.petForm.patchValue({ birthdate: selectedDate });
    this.closeDatePicker();
  }

  PhotoUpload() {
    this.photoInput.nativeElement.click();
  }

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPhoto = reader.result as string;
        this.petForm.patchValue({ photo: this.selectedPhoto });
      };
      reader.readAsDataURL(file);
    }
  }

  async addPet() {
    if (this.petForm.invalid) {
      return;
    }

    const petData = {
      ...this.petForm.value,
      userId: 'user-id',
    };

    try {
      await this.petService.addPet(petData);
      this.pets.push(petData);
      this.petForm.reset();
      this.selectedPhoto = null;
    } catch (error) {
      console.error('Error al registrar la mascota:', error);
    }
  }

  async deletePet(petId: string) {
    try {
      await this.petService.deletePet(petId);
      this.pets = this.pets.filter((pet) => pet.id !== petId);
    } catch (error) {
      console.error('Error al eliminar la mascota:', error);
   }
  }
}
