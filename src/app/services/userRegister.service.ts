import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from "../models/Cliente";

const apiUrl = 'http://localhost/api/clientes'; 

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {
  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: any): Observable<any> {
    const url = `${apiUrl}/new`;
    return this.http.post<any>(url, usuario);
  }
}
