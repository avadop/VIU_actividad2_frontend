import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'monthNamePipe'
})
export class MonthNamePipe implements PipeTransform {
    transform(date: Date) :string {
        let newDate = new Date(date);
        return `${newDate.toLocaleDateString('es-ES', {month: 'long'})} ${newDate.getFullYear()}`;
    }
}
