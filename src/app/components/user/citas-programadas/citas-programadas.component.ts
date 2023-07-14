import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cita, TipoCita } from 'src/app/models/Cita';
import { Mascota } from 'src/app/models/Mascota';
import { CitaService } from 'src/app/services/cita.service';
import { ClienteService } from 'src/app/services/cliente.service copy';
import { LoggedUserService } from 'src/app/services/loggedUser.service';

@Component({
  selector: 'app-citas-programadas',
  templateUrl: './citas-programadas.component.html',
  styleUrls: ['./citas-programadas.component.css'],
  providers: [CitaService, ClienteService]
})
export class CitasProgramadasComponent {
  public mascotasCliente: Array<Mascota>;

  public citas: Array<Cita>;

  public days: Array<Date>;

  public hours: Array<{start: Date, end:Date}>;

  public tableContent: Array<Array<{nombreMascota: any, numChip: number, tipoCita: string}>>;

  public selectedCell: {hour: number , day: number};

  public shownWeek: number;

  constructor(
    private citaService: CitaService,
    private clientService: ClienteService, 
    private loggedUserService: LoggedUserService, 
    private router:Router
    ) {
    this.citas = [];
    this.days = this.getCurrentWeek();
    this.hours = this.getDefinedHours();
    this.shownWeek = 0;
    this.selectedCell = {hour: -1, day: -1};
    this.mascotasCliente = new Array();
    this.tableContent = new Array();
  }

  ngOnInit() {
    this.clientService.getMascotasCliente(this.loggedUserService.getUserId()).subscribe(
      (infoCliente:any) => this.mascotasCliente = infoCliente.data
    );
  
    this.tableContent = new Array<Array<{nombreMascota: any, numChip: number, tipoCita: string}>>();
    this.citaService.getAllCitas().subscribe((infoCitas:any) => {
        this.citas = infoCitas.data;
        this.tableContent = this.fillTableContent(infoCitas.data);
      });
  }

  confirmCita() :void {
    const dia = this.days[this.selectedCell.day];
    const hora = this.hours[this.selectedCell.hour].start;

    this.router.navigate([`/pedir-cita/${dia}/${hora}`]);
  }

  getCurrentWeek() : Array<Date>{
    let currentDate = new Date();
    let weekStart = new Date();
    let week = new Array<Date>();

    if(currentDate.getDay() > 1) {
      weekStart.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    }
    else {
      weekStart.setDate(currentDate.getDate());
    }

    for(let i = 0; i < 5; i++) {
      let day = new Date();
      day.setDate(weekStart.getDate() + i);
      week.push(day);
    }

    return week;
  }

  changeWeek(type: 'previous' | 'next'):void {
    if(type === 'previous') {
      this.shownWeek = this.shownWeek - 1;
  
      if(this.shownWeek === 0) {
        this.days = this.getCurrentWeek();
      }
      else {
        let prevWeek = new Date();

        prevWeek.setMonth(this.days[0].getMonth());
        prevWeek.setDate(this.days[0].getDate() - 7);

        this.days = this.loadTableWeek(prevWeek);

      }
    }
    else {
      this.shownWeek = this.shownWeek + 1;
      let nextWeek = new Date();

      nextWeek.setMonth(this.days[0].getMonth());
      nextWeek.setDate(this.days[0].getDate() + 7);

      this.days = this.loadTableWeek(nextWeek);
    }

    this.tableContent = this.fillTableContent(this.citas);
  }

  loadTableWeek(weekStart: Date) : Array<Date> {
    let week = new Array<Date>();

    for(let i = 0; i < 5; i++) {
      let day = new Date();
      day.setDate(weekStart.getDate() + i);
      day.setMonth(weekStart.getMonth());
      week.push(day);
    }
  
    return week;
  }

  getDefinedHours() : Array<{start: Date, end:Date}> {
    let hours = new Array<{start:Date, end: Date}>();

    this.getTramosHoras(hours, 10, 0, 7);
    this.getTramosHoras(hours, 17, 0, 6);

    return hours;
  }

  getTramosHoras(hoursArray: Array<{start: Date, end:Date}>,hour:number, minutes: number, size: number): void{
    let currentHour = hour;
    let currentMinutes = minutes;
  
    for(let i  = 0; i < size; i++){
      let firstDate = new Date();
      firstDate.setHours(currentHour, currentMinutes,0);
      if(i%2===0) currentMinutes = 30;
      else {
        currentMinutes = 0;
        currentHour = currentHour +1;
      }
      let newDate = new Date();
      newDate.setHours(currentHour, currentMinutes,0);
      hoursArray.push({start:firstDate, end: newDate});
    }
  }

  fillTableContent(citas: Array<Cita>): Array<Array<{nombreMascota: any, numChip: number, tipoCita: string}>> {
    let initialArray = new Array<Array<{nombreMascota: any, numChip: number, tipoCita: string}>>();
    for(let i = 0; i < this.hours.length; i++) {
      initialArray.push(new Array<{nombreMascota: any, numChip: number, tipoCita: string}>(this.days.length).fill(
        {nombreMascota: '', numChip: 0, tipoCita: ''}
      ));
    }

     let arrayCitasSemana = new Array<{hora: string, day: Date, tipoCita: string, numChip: number}>();
  
     citas.forEach((cita: Cita) => {
       if(this.isDateInWeek(new Date(cita.fecha))) {
         arrayCitasSemana.push({day: new Date(cita.fecha), hora: cita.hora.toString(), tipoCita: this.tipoCitaString(cita.tipo_cita), numChip: cita.num_chip});
       }
     });

     this.hours.forEach((hour, hourIdx) => {
       this.days.forEach((day, dayIdx) => {
         arrayCitasSemana.forEach(cita => {
          const userMascota = this.mascotasCliente.find((mascota: Mascota) => mascota.num_chip === cita.numChip);
           if(cita.day.getDate() === day.getDate() && cita.hora===hour.start.toLocaleTimeString() && userMascota) {
             initialArray[hourIdx][dayIdx] = {
              nombreMascota: userMascota?.nombre_mascota,
              numChip: cita.numChip,
              tipoCita: cita.tipoCita
             };
           }
         })
       })
     });

    return initialArray;
  }

  isDateInWeek(date: Date): boolean {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + (7*this.shownWeek));

    const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 4);

    const formatDate = new Date(date);
    return formatDate >= firstDayOfWeek && formatDate <= lastDayOfWeek;
  }

  tipoCitaString(tipo : TipoCita) : string{
    switch (tipo){
      case TipoCita.ANALITICA:
        return 'Analítica';
      case TipoCita.CIRUGIA:
        return 'Cirugía';
      case TipoCita.CONSULTA_GENERAL:
        return 'Consulta general';
      case TipoCita.VACUNACION:
        return 'Vacunación';
      case TipoCita.PELUQUERIA:
        return 'Peluquería';
      default:
        return '';
    }
    
  }

}
