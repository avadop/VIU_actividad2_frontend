import { Component } from '@angular/core';
import { UserRegisterService } from 'src/app/services/userRegister.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
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

  constructor(private userRegisterService: UserRegisterService) {}

  onSubmit(form: any): void {
    if (form.valid) {
      // Verificar si las contraseñas coinciden
      if (this.userData.contrasenya !== this.userData.contrasenya) {
        form.controls['confirmPassword'].setErrors({ mustMatch: true });
        return;
      }

      // Enviar los datos al servicio para registrar al usuario
      this.userRegisterService.registrarUsuario(this.userData).subscribe(
        (response) => {
          // El usuario fue registrado correctamente
          console.log('Usuario registrado:', response);
        }
      );
    }
  }
}
