import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cita, ModalidadCita, TipoCita } from 'src/app/models/Cita';

@Component({
  selector: 'app-pedir-cita',
  templateUrl: './pedir-cita.component.html',
  styleUrls: ['./pedir-cita.component.css']
})
export class PedirCitaComponent {
  public cita: {hora:Date | null, fecha:Date | null, tipo: TipoCita, modalidad: ModalidadCita, mascota: number};

  public finalCita: Date;

  public cliente: {nombre: string, dni: string, apellidos: string};

  public mascotasCliente: Array<{nombre: string, numChip: number}>;

  constructor(private route: ActivatedRoute) {
    this.cita = {
      hora: null, 
      fecha: null, 
      modalidad: ModalidadCita.PRESENCIAL, 
      tipo: TipoCita.CONSULTA_GENERAL,
      mascota: 0
    };

    this.finalCita = new Date();

    this.cliente = {
      nombre: 'Fulanito',
      dni: '45611232C',
      apellidos: 'García'
    };

    this.mascotasCliente = [
      {nombre: 'Darwin', numChip: 13143},
      {nombre: 'Coco', numChip: 12312111}
    ]
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.cita.hora = new Date(params['hora']);
      this.cita.fecha = new Date(params['dia']);
      this.finalCita.setHours(this.cita.hora.getHours(), 30, 0);
    });
  }

  onSubmit():void {
    console.log("Aqui es donde se crea");
    //Comporbar id a null que hace
    console.log("Cita", this.cita);
    
  }
}
