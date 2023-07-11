import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


const infoTextLoggedOut:string = "Para ello es necesario que te registres o, si ya estás registrado, inicies sesión.";
const infoTextLoggedIn:string = "¡Ya estás listo para comenzar!";
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  public infoText: String;

  public userLogged : boolean;

  public userId : string;


  constructor(private route: ActivatedRoute, private router: Router) {
    this.userId = '';
    this.userLogged = false;
    this.infoText = infoTextLoggedOut;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userId = params["id"];
      this.userLogged = !!this.userId;
      this.infoText = this.userLogged ? infoTextLoggedIn : infoTextLoggedOut;
    });
  }

  redirectOnClick(route: string): void {
    this.router.navigate([route]);
  }
}
