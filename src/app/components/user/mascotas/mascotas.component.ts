import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/models/Mascota';
import { ClienteService } from 'src/app/services/cliente.service copy';
import { LoggedUserService } from 'src/app/services/loggedUser.service';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent {

  mascotas: Mascota[] = [];

  constructor(private clienteService: ClienteService, 
    private mascotasService: MascotaService, 
    private loggedUserService: LoggedUserService,
    private router: Router){

  }

  ngOnInit() {
    this.getMascotas();
  }

  getMascotas(){
    this.clienteService.getMascotasCliente(this.loggedUserService.getUserId()).subscribe(
      (mascotas: any) => {
        this.mascotas = mascotas.data;
      }
    );
  }

  altaMascota(){
    this.router.navigate(['user/mascotas-alta']);
  }

  editarMascota(numChip: number){}
  eliminarMascota(numChip: number){}

  detalleMascota(numChip: number){
    this.router.navigate(['user/mascotas-detalle', numChip]);
  }
}
