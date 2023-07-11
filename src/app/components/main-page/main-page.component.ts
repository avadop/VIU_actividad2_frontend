import { Component } from '@angular/core';

const infoTextLoggedOut:string = "Para ello es necesario que te registres o, si ya estás registrado, inicies sesión.";
const infoTextLoggedIn:string = "¡Ya estás listo para comenzar!";
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  public infoText: String;

  public userLogged: Boolean;


  constructor() {
    this.userLogged = true;
    this.infoText = this.userLogged ? infoTextLoggedIn : infoTextLoggedOut;
  }
}
