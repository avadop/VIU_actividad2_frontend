import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dayNumberPipe',
})
export class DayNumberPipe implements PipeTransform {
  transform(date: Date): string {
    let newDate = new Date(date);
    return `${newDate.toLocaleDateString('es-ES', {
      weekday: 'long',
    })} ${newDate.getDate()}`;
  }
}
