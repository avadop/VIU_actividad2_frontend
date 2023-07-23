import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recordatorio } from '../models/Recordatorio';

const apiUrl = 'http://localhost/api/recordatorios/';

@Injectable({
  providedIn: 'root',
})
export class RecordatoroService {
  constructor(private http: HttpClient) {}

  public getAllRecordatorios(): Observable<any> {
    return this.http.get(`${apiUrl}`);
  }

  public getRecordatorioById(idRecordatorio: number): Observable<any> {
    return this.http.get(`${apiUrl}${idRecordatorio}`);
  }

  public createRecordatorio(recordatorio: Recordatorio): Observable<any> {
    return this.http.post(`${apiUrl}new`, recordatorio);
  }

  public updateRecordatorio(
    idRecordatorio: number,
    cita: Recordatorio
  ): Observable<any> {
    return this.http.put(`${apiUrl}${idRecordatorio}`, cita);
  }

  public deleteCita(idRecordatorio: number): Observable<any> {
    return this.http.delete(`${apiUrl}${idRecordatorio}`);
  }

  public getRecordatoriosMascota(idMascota: number): Observable<any> {
    return this.http.get(`${apiUrl}mascota/${idMascota}`);
  }

  public getRecordatoriosClinica(idClinica: number): Observable<any> {
    return this.http.get(`${apiUrl}clinica/${idClinica}`);
  }
}
