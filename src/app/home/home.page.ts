import { Component, OnInit} from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {public id: string = "";

  constructor(private authService: AuthService) {}

  async ngOnInit() {

    this.id = await this.authService.getCurrentUID();

  }

}
