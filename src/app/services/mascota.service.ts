import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Mascota } from "../models/Mascota";

const apiUrl = "http://localhost/api/mascotas/";

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor(private http: HttpClient) { }

  public getMascotaById(numChip:number):Observable<any>{
    return this.http.get(`${apiUrl}${numChip}`);
  }

  public createMascota(mascota: Mascota):Observable<any>{
    return this.http.post(`${apiUrl}new`, mascota);
  }
}
