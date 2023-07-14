import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cita, ModalidadCita, TipoCita } from 'src/app/models/Cita';
import { Mascota } from 'src/app/models/Mascota';
import { CitaService } from 'src/app/services/cita.service';
import { ClienteService } from 'src/app/services/cliente.service copy';
import { LoggedUserService } from 'src/app/services/loggedUser.service';
import { clinicaId } from 'src/app/utils/constants';

@Component({
  selector: 'app-pedir-cita',
  templateUrl: './pedir-cita.component.html',
  styleUrls: ['./pedir-cita.component.css'],
  providers: [ClienteService, CitaService]
})
export class PedirCitaComponent {
  public cita: {hora:Date, fecha:Date, tipo: TipoCita, modalidad: ModalidadCita, mascota: number};

  public finalCita: Date;

  public cliente: {nombre: string, dni: string};

  public mascotasCliente: Array<{nombre: string, numChip: number}>;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private clientService: ClienteService,
    private citaService: CitaService,
    private loggedUserService: LoggedUserService
    ) {
    this.cita = {
      hora: new Date(), 
      fecha: new Date(), 
      modalidad: ModalidadCita.PRESENCIAL, 
      tipo: TipoCita.CONSULTA_GENERAL,
      mascota: 0
    };

    this.finalCita = new Date();

    this.cliente = {
      nombre: '',
      dni: ''
    };

    this.mascotasCliente = []
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.cita.hora = new Date(params['hora']);
      this.cita.fecha = new Date(params['dia']);
      this.finalCita.setHours(this.cita.hora.getHours(), 30, 0);
    });

    const userId = this.loggedUserService.getUserId();
    this.initialiceUserData(userId);
    this.initialiceUserPets(userId)
  }

  initialiceUserData(userId:string | null):void {
    this.clientService.getClientById(userId).subscribe((infoCliente: any) => {
      this.cliente.nombre = `${infoCliente.data.nombre} ${infoCliente.data.apellidos}`;
      this.cliente.dni = infoCliente.data.dni;
    })
  }

  initialiceUserPets(userId:string | null) : void {
    this.clientService.getMascotasCliente(userId).subscribe((mascotasCliente: any)=> {
      this.mascotasCliente = mascotasCliente.data.map(
        (mascota:Mascota) => ({nombre: mascota.nombre_mascota, numChip: mascota.num_chip}));
    });
  }

  onSubmit():void {
    const hora = this.cita.hora?.toLocaleTimeString();
    const fecha = this.formatDateForSumit(this.cita.fecha);
  
    const cita = new Cita(hora, fecha, this.cita.modalidad, this.cita.tipo,clinicaId, Number(this.cita.mascota));

    this.citaService.createCita(cita).subscribe((info) => {
      if(info.statusCode === 200)
        this.router.navigate(['main-page'])
    });
  }

  formatDateForSumit(date: Date) : string {
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });

    return `${year}/${month}/${day}`
  }

  cancel() :void {
    this.router.navigate(['/citas-disponibles']);
  }
}
