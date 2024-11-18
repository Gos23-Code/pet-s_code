import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

type buttontype = "text" | "number" | "tel" | "email" | "password";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() label: string = "";
  @Input() control = new FormControl();
  @Input() type: buttontype = "text";
  @Input() disable: boolean = false;  // Definir el @Input() para 'disable'


  constructor() {}

  ngOnInit() {
    if (this.disable) {
      this.control.disable();  // This will disable the form control
    }
  }

  public setValue(event: any) {
    this.control.setValue(event.target.value);
  }
}
