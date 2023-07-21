import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/models/Mascota';
import { ClienteService } from 'src/app/services/cliente.service copy';
import { LoggedUserService } from 'src/app/services/loggedUser.service';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css'],
})
export class MascotasComponent {
  public mascotas: Mascota[] = [];
  public message: string;
  public error: boolean;

  constructor(
    private clienteService: ClienteService,
    private mascotasService: MascotaService,
    private loggedUserService: LoggedUserService,
    private router: Router
  ) {
    this.message = '';
    this.error = false;
  }

  ngOnInit() {
    this.getMascotas();
  }

  getMascotas() {
    this.clienteService
      .getMascotasCliente(this.loggedUserService.getUserId())
      .subscribe((mascotas: any) => {
        this.mascotas = mascotas.data;

        this.mascotas.forEach((mascota: Mascota) => {
          const randomNumber = this.mascotasService.getRandomNumber();
          mascota.imagen = `gato_${randomNumber}.png`;
        });
      });
  }

  altaMascota() {
    this.router.navigate(['user/mascotas-alta']);
  }

  editarMascota(numChip: number) {}
  eliminarMascota(numChip: number) {
    this.mascotasService.deleteMascota(numChip).subscribe((response) => {
      if (response.statusCode === 200) {
        this.message = 'La mascota se ha borrado correctamente';
        this.getMascotas();
      } else {
        this.error = true;
        this.message = `${response.statusCode} - ${response.data}`;
      }
    });
  }

  detalleMascota(numChip: number) {
    this.router.navigate(['user/mascotas-detalle', numChip]);
  }
}
