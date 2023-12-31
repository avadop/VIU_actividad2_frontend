import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaDetalle } from 'src/app/models/MascotaDetalle';
import { CitaService } from 'src/app/services/cita.service';
import { MascotaService } from 'src/app/services/mascota.service';
import { RecordatoroService } from 'src/app/services/recordatorio.service';

@Component({
  selector: 'app-mascotas-detalle',
  templateUrl: './mascotas-detalle.component.html',
  styleUrls: ['./mascotas-detalle.component.css'],
  providers: [CitaService, MascotaService, RecordatoroService],
})
export class MascotasDetalleComponent implements OnInit {
  public mascotaDetalle: MascotaDetalle;
  public message: string;
  public error: boolean;
  public hayCitas: boolean;

  constructor(
    private mascotasService: MascotaService,
    private citasService: CitaService,
    private recordatorioService: RecordatoroService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.message = '';
    this.error = false;
    this.hayCitas = false;
    this.mascotaDetalle = new MascotaDetalle();

    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['mascota']) {
      this.mascotaDetalle.mascota = state['mascota'];
    }
  }

  ngOnInit(): void {
    this.citasMascota();
    this.recordatoriosMascota();
  }

  public citasMascota(): void {
    this.citasService
      .getCitasMascota(this.mascotaDetalle.mascota.num_chip)
      .subscribe((response) => {
        if (response.statusCode === 200) {
          this.mascotaDetalle.citas = response.data;
          this.hayCitas = this.mascotaDetalle.citas.length !== 0;
        } else {
          this.error = true;
          this.message = `${response.statusCode} - ${response.data}`;
        }
      });
  }

  public recordatoriosMascota(): void {
    this.recordatorioService
      .getRecordatoriosMascota(this.mascotaDetalle.mascota.num_chip)
      .subscribe((response) => {
        if (response.statusCode === 200) {
          this.mascotaDetalle.recordatorios = response.data;
        } else {
          this.error = true;
          this.message = `${response.statusCode} - ${response.data}`;
        }
      });
  }
}
