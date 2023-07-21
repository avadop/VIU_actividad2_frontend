import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/models/Mascota';
import { LoggedUserService } from 'src/app/services/loggedUser.service';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-mascotas-alta',
  templateUrl: './mascotas-alta.component.html',
  styleUrls: ['./mascotas-alta.component.css'],
})
export class MascotasAltaComponent {
  public formAddMascota: {
    nombre: string;
    edad: number | null;
    sexo: string;
    numChip: number | null;
    especie: string;
    vacunas: string;
    enfermedades: string;
    historialClinico: string;
  };

  public message: string;
  public error: boolean;
  public informes: string[];

  constructor(
    private loggedUserService: LoggedUserService,
    private mascotaService: MascotaService,
    private router: Router
  ) {
    this.message = '';
    this.formAddMascota = {
      nombre: '',
      edad: null,
      sexo: '',
      numChip: null,
      especie: '',
      vacunas: '',
      enfermedades: '',
      historialClinico: '',
    };
    this.error = false;
    this.informes = [];
  }

  onSubmit(): void {
    const numChip =
      this.formAddMascota.numChip !== null ? this.formAddMascota.numChip : 0;
    const edad =
      this.formAddMascota.edad !== null ? this.formAddMascota.edad : 0;
    const userId = this.loggedUserService.getUserId();
    const dni = typeof userId === 'string' ? userId : '';
    this.informes.push(this.formAddMascota.enfermedades);

    const mascota = new Mascota(
      numChip,
      edad,
      dni,
      this.informes,
      this.formAddMascota.vacunas,
      this.formAddMascota.nombre,
      this.formAddMascota.sexo,
      this.formAddMascota.especie,
      this.formAddMascota.historialClinico,
      ''
    );

    this.mascotaService.createMascota(mascota).subscribe((response) => {
      if (response.statusCode === 200) {
        this.message = 'La mascota se ha dado de alta correctamente';
        this.clearForm();
        this.informes = [];
      } else {
        this.error = true;
        this.message = `${response.statusCode} - ${response.data}`;
      }
    });
  }

  // Función para limpiar el formulario
  clearForm(): void {
    this.formAddMascota = {
      nombre: '',
      edad: null,
      sexo: '',
      numChip: null,
      especie: '',
      vacunas: '',
      enfermedades: '',
      historialClinico: '',
    };
  }
}
