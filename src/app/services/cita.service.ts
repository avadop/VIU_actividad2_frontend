import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/Cita';

const apiUrl = 'http://localhost/api/citas/';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  constructor(private http: HttpClient) {}

  public getAllCitas(): Observable<any> {
    return this.http.get(`${apiUrl}`);
  }

  public getCitaById(idCita: number): Observable<any> {
    return this.http.get(`${apiUrl}${idCita}`);
  }

  public createCita(cita: Cita): Observable<any> {
    return this.http.post(`${apiUrl}new`, cita);
  }

  public updateCita(idCita: number, cita: Cita): Observable<any> {
    return this.http.put(`${apiUrl}${idCita}`, cita);
  }

  public deleteCita(idCita: number): Observable<any> {
    return this.http.delete(`${apiUrl}${idCita}`);
  }

  public getCitasMascota(idMascota: number): Observable<any> {
    return this.http.get(`${apiUrl}mascota/${idMascota}`);
  }
}
