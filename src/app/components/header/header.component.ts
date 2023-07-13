import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedUserService } from 'src/app/services/loggedUser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public userId: string | null;

  public userName: string;

  constructor(private loggedUserService: LoggedUserService, private router:Router) {
    this.userId = this.loggedUserService.getUserId();
    this.userName = 'Fulanito gonzalez';
  }

  ngOnInit() {
    if(this.userId) {

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
