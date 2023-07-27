import { Component } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service copy';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
  providers: [ClienteService]
})
export class RegistroUsuarioComponent {
  public userData: any = {
    dni: '',
    nombre: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    correo_electronico: '',
    contrasenya: '',
  };

  constructor(private clientService: ClienteService) {}

  onSubmit(form: any): void {
    if (form.valid) {
      // Verificar si las contraseñas coinciden
      if (this.userData.contrasenya !== this.userData.contrasenya) {
        form.controls['confirmPassword'].setErrors({ mustMatch: true });
        return;
      }

      // Enviar los datos al servicio para registrar al usuario
      this.clientService.registrarUsuario(this.userData).subscribe(
        (response) => {
          // El usuario fue registrado correctamente
          console.log('Usuario registrado:', response);
        }
      );
    }
  }
}
