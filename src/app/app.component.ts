import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'viupets-frontend';

  public userName:string;
  public userId: string;

  constructor() {
    this.userName = 'Fulanito Fernández';
    this.userId = '123412341C'; //null o vacio si no hay nadie loggeado
    // this.userId = '';
  }

}
