import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private citaService: CitaService, private router:Router) {
    this.citas = [];
    this.citaService.getAllCitas().subscribe({
      next: (infoCitas:any) => {
        this.citas = infoCitas.data;
      },
      error: error => console.log("Ha habido un error: ", error)
    });
  }

  redirectOnClick(route:string) {
    this.router.navigate([route]);
  }
}
