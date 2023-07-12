import { Component, Input } from '@angular/core';
import { LoggedUserService } from 'src/app/services/loggedUser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() userId: string = '';

  @Input() userName: string = '';

  constructor(private loggedUserService: LoggedUserService) {}

  logOut() :void {
    this.loggedUserService.removeUserId();
  }
}
