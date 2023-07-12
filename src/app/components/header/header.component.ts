import { Component, Input } from '@angular/core';
import { LoggedUserService } from 'src/app/services/loggedUser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public userId: string | null;

  public userName: string;

  constructor(private loggedUserService: LoggedUserService) {
    this.userId = this.loggedUserService.getUserId();
    this.userName = 'Fulanito gonzalez';
  }

  logOut() :void {
    this.loggedUserService.removeUserId();
  }
}
