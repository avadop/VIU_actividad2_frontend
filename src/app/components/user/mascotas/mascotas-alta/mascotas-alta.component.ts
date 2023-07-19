import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/models/Mascota';
import { LoggedUserService } from 'src/app/services/loggedUser.service';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-mascotas-alta',
  templateUrl: './mascotas-alta.component.html',
  styleUrls: ['./mascotas-alta.component.css']
})
export class MascotasAltaComponent {

  public formAddMascota: {nombre: string, edad: number | null, sexo: string, numChip: number | null, especie: string, vacunas: string, enfermedades: string[], historialClinico: string};

  public errorMessage:string;
  public errorType:number;

  constructor(private loggedUserService: LoggedUserService, private mascotaService: MascotaService, private router: Router){ 
    this.errorMessage = '';
    this.errorType = 0;
    this.formAddMascota = {
      nombre: '',
      edad: null,
      sexo: '',
      numChip: null,
      especie: '',
      vacunas: '',
      enfermedades: [],
      historialClinico: ''
    };
  }

  onSubmit() :void {
    const numChip = this.formAddMascota.numChip !== null ? this.formAddMascota.numChip : 0;
    const edad = this.formAddMascota.edad !== null ? this.formAddMascota.edad : 0;
    const userId = this.loggedUserService.getUserId();
    const dni = typeof userId === 'string' ? userId : '';

    const mascota = new Mascota(numChip, edad, dni, this.formAddMascota.enfermedades, this.formAddMascota.vacunas, this.formAddMascota.nombre, this.formAddMascota.sexo, this.formAddMascota.especie, this.formAddMascota.historialClinico);
    this.mascotaService.createMascota(mascota).subscribe(
      (response: any) =>{
        if(response.statusCode === 200){

        } else {
          this.errorType = response.statusCode;
          this.errorMessage = response.message;
        }
      });
  }
}
