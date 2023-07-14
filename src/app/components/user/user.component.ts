import { Component } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service copy';
import { LoggedUserService } from 'src/app/services/loggedUser.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [ClienteService]
})
export class UserComponent {
  public user: Cliente;

  constructor(private loggedUserService: LoggedUserService, private clientService:ClienteService) {
    this.user = {dni:'', contrasenya:'', nombre: '', apellidos: '',telefono: '', direccion: '' };
  }

  ngOnInit() {
    this.clientService.getClientById(this.loggedUserService.getUserId()).subscribe((infoCliente:any) => this.user = infoCliente.data);
  }
}
