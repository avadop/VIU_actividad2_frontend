import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoggedUserService } from 'src/app/services/loggedUser.service';


const infoTextLoggedOut:string = "Para ello es necesario que te registres o, si ya estás registrado, inicies sesión.";
const infoTextLoggedIn:string = "¡Ya estás listo para comenzar!";
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  public infoText: String;


  public userId : string | null;


  constructor(private router: Router, private loggedUserService: LoggedUserService) {
    this.userId = this.loggedUserService.getUserId();
    this.infoText = this.userId ? infoTextLoggedIn : infoTextLoggedOut;
  }

  redirectOnClick(route: string): void {
    this.router.navigate([route]);
  }
}
