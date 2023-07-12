import { Component } from '@angular/core';
import { Cita } from 'src/app/models/Cita';
import { CitaService } from 'src/app/services/cita.service';

@Component({
  selector: 'app-citas-disponibles',
  templateUrl: './citas-disponibles.component.html',
  styleUrls: ['./citas-disponibles.component.css'],
  providers: [CitaService]
})
export class CitasDisponiblesComponent {
  public citas: Array<Cita>;

  constructor(private citaService: CitaService) {
    this.citas = [];
    this.citaService.getAllCitas().subscribe({
      next: (infoCitas:any) => {
        this.citas = infoCitas.data;
      },
      error: error => console.log("Ha habido un error: ", error)
    });
  }
}
