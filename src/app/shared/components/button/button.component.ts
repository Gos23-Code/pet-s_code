import { Component, Input, OnInit } from '@angular/core';

type colorbuttontype = "success" | "danger" | "warning" | "secondary" | "primary" | "tertiary";
type buttontype = "button" | "submit" | "reset";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() value = "";
  @Input() type: buttontype = "button";
  @Input() color: colorbuttontype = "success";
  @Input() disable = false;

  constructor() {}

  ngOnInit() {}
}
