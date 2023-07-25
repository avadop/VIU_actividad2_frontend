import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../models/Mascota';

const apiUrl = 'http://localhost/api/mascotas/';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  constructor(private http: HttpClient) {}

  public getMascotaById(numChip: number): Observable<any> {
    return this.http.get(`${apiUrl}${numChip}`);
  }

  public createMascota(mascota: Mascota): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // Antes de enviar la solicitud HTTP
    return this.http.post(`${apiUrl}new`, mascota, { headers: headers });
  }

  public deleteMascota(numChip: number): Observable<any> {
    return this.http.delete(`${apiUrl}${numChip}`);
  }

  public getRandomNumber(): number {
    const random = Math.random() * 3;
    return Math.ceil(random);
  }
}
