import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service copy';
import { LoggedUserService } from 'src/app/services/loggedUser.service';
import { Cliente } from 'src/app/models/Cliente';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
  providers: [ClienteService]
})
export class PerfilUsuarioComponent implements OnInit {
  usuario: Cliente | null = null;

  constructor(
    private clienteService: ClienteService,
    private loggedUserService: LoggedUserService
  ) {}

  ngOnInit(): void {
    const userId = this.loggedUserService.getUserId();
    if (userId) {
      this.clienteService.getClientById(userId).subscribe(
        (response: any) => {
          // Verificar si se obtuvieron datos válidos del cliente
          const clienteData = response.data;
          if (clienteData && clienteData.dni && clienteData.nombre && clienteData.apellidos && clienteData.direccion && clienteData.telefono && clienteData.contrasenya) {
            // Crear una instancia de Cliente con los datos recibidos
            this.usuario = new Cliente(
              clienteData.dni,
              clienteData.contrasenya,
              clienteData.direccion,
              clienteData.nombre,
              clienteData.apellidos,
              clienteData.telefono
            );
          } else {
            // Mostrar mensaje de error si no se recibieron datos válidos del cliente
            console.error('Los datos del cliente recibidos no son válidos:', clienteData);
          }
        },
        (error) => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
    }
  }
}





