import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service copy';
import { LoggedUserService } from 'src/app/services/loggedUser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ClienteService]
})
export class HeaderComponent {
  public userId: string | null;

  public userName: string;

  constructor(private loggedUserService: LoggedUserService, private router:Router, private clientService: ClienteService) {
    this.userId = this.loggedUserService.getUserId();
    this.userName = 'Fulanito gonzalez';
  }

  ngOnInit() {
    if(this.userId) {
      this.clientService.getClientById(this.userId).subscribe((infoClient: any) => {
        this.userName = `${infoClient.data.nombre} ${infoClient.data.apellidos}`;
      })
    }
    else {
      this.router.navigate(['/main-page']);
    }
  }

  logOut() :void {
    this.loggedUserService.removeUserId();
    window.location.reload();
  }

  redirectOnClick(route:string) {
    this.router.navigate([route]);
  }
}
