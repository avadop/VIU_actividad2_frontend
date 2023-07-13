import { Component, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service copy';
import { LoggedUserService } from 'src/app/services/loggedUser.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
  providers: [ClienteService]
})
export class InicioSesionComponent {

  public formInicioSesion: {dni:string, password:string};

  public errorMessage:string;

  public errorType:number;

  constructor(private router: Router,
    private clientService: ClienteService, 
    private loggedUserService: LoggedUserService
    ) {
    this.formInicioSesion = {
      dni: '',
      password: ''
    };
    this.errorMessage = '';
    this.errorType = 0;
  }

  ngOnInit() {
    if(this.loggedUserService.getUserId()) {
      this.router.navigate(['/main-page']);
    }
  }

  onSubmit() :void {
    if(this.formInicioSesion.dni && this.formInicioSesion.password) {
      this.clientService.clienteLogIn(this.formInicioSesion.dni, this.formInicioSesion.password).subscribe({
        next: (infoLogIn:any) => {
          if(infoLogIn.statusCode === 200) {
            this.loggedUserService.setUserId(infoLogIn.data);
            window.location.reload();
          }
          else {
            this.errorType = infoLogIn.statusCode;
            this.errorMessage = infoLogIn.message;
          }
        }
      });
    }
  }
}
