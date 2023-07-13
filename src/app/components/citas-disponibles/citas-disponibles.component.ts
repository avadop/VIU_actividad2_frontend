import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cita, EstadoCita } from 'src/app/models/Cita';
import { CitaService } from 'src/app/services/cita.service';

@Component({
  selector: 'app-citas-disponibles',
  templateUrl: './citas-disponibles.component.html',
  styleUrls: ['./citas-disponibles.component.css'],
  providers: [CitaService]
})
export class CitasDisponiblesComponent {
  public citas: Array<Cita>;

  public days: Array<{enabled: boolean, date: Date}>;

  public hours: Array<{start: Date, end:Date}>;

  public tableContent: Array<Array<EstadoCita>>;

  public selectedCell: {hour: number , day: number};

  public shownWeek: number;

  constructor(private citaService: CitaService, private router:Router) {
    this.citas = [];
    this.days = this.getCurrentWeek();
    this.hours = this.getDefinedHours();
    this.shownWeek = 0;
    this.selectedCell = {hour: -1, day: -1};
  
    this.tableContent = new Array<Array<EstadoCita>>();
    this.citaService.getAllCitas().subscribe((infoCitas:any) => {
        this.citas = infoCitas.data;
        this.tableContent = this.fillTableContent(infoCitas.data);
      });
  }

  confirmCita() :void {
    const dia = this.days[this.selectedCell.day].date;
    const hora = this.hours[this.selectedCell.hour].start;

    this.router.navigate([`/pedir-cita/${dia}/${hora}`]);
  }

  getCurrentWeek() : Array<{enabled: boolean, date: Date}>{
    let currentDate = new Date();
    let weekStart = new Date();
    let week = new Array<{enabled: boolean, date: Date}>();

    if(currentDate.getDay() > 1) {
      weekStart.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    }
    else {
      weekStart.setDate(currentDate.getDate());
    }

    for(let i = 0; i < 5; i++) {
      let day = new Date();
      day.setDate(weekStart.getDate() + i);
      week.push({date: day, enabled: day.getDate() > currentDate.getDate()});
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

        prevWeek.setMonth(this.days[0].date.getMonth());
        prevWeek.setDate(this.days[0].date.getDate() - 7);

        this.days = this.loadTableWeek(prevWeek);

      }
    }
    else {
      this.shownWeek = this.shownWeek + 1;
      let nextWeek = new Date();

      nextWeek.setMonth(this.days[0].date.getMonth());
      nextWeek.setDate(this.days[0].date.getDate() + 7);

      this.days = this.loadTableWeek(nextWeek);
    }

    this.tableContent = this.fillTableContent(this.citas);
  }

  loadTableWeek(weekStart: Date) : Array<{enabled: boolean, date: Date}> {
    let week = new Array<{enabled: boolean, date: Date}>();

    for(let i = 0; i < 5; i++) {
      let day = new Date();
      day.setDate(weekStart.getDate() + i);
      day.setMonth(weekStart.getMonth());
      week.push({date: day, enabled: true});
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

  fillTableContent(citas: Array<Cita>): Array<Array<EstadoCita>> {
    let initialArray = new Array<Array<EstadoCita>>();
    for(let i = 0; i < this.hours.length; i++) {
      initialArray.push(new Array<EstadoCita>(this.days.length).fill(EstadoCita.LIBRE));
    }

    let arrayCitasSemana = new Array<{hora: string, day: Date}>();
  
    citas.forEach((cita: Cita) => {
      if(this.isDateInWeek(cita.fecha)) {
        arrayCitasSemana.push({day: new Date(cita.fecha), hora: cita.hora.toString()});
      }
    });

    this.hours.forEach((hour, hourIdx) => {
      this.days.forEach((day, dayIdx) => {
        arrayCitasSemana.forEach(cita => {
          if(cita.day.getDate() === day.date.getDate() && cita.hora===hour.start.toLocaleTimeString()) {
            initialArray[hourIdx][dayIdx] = EstadoCita.OCUPADA;
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

  changeCellState(hourIdx:number, dayIdx:number): void {
    const cell = this.tableContent[hourIdx][dayIdx];
    if(cell === EstadoCita.LIBRE && this.days[dayIdx].enabled) {
      const {hour, day} = this.selectedCell;
      if(hour >= 0 &&  day >= 0) this.tableContent[hour][day] = EstadoCita.LIBRE;
      this.tableContent[hourIdx][dayIdx] = EstadoCita.SELECCIONADA;
      this.selectedCell = {hour: hourIdx, day: dayIdx};
    }
    else if(cell === EstadoCita.SELECCIONADA) {
      this.tableContent[hourIdx][dayIdx] = EstadoCita.LIBRE;
      this.selectedCell = {hour: -1, day: -1};
    }
  }
}
