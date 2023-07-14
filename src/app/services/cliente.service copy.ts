import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Cliente } from "../models/Cliente";

const apiUrl = "http://localhost/api/clientes/";

@Injectable()
export class ClienteService {
  constructor(private http: HttpClient) {}

  public getClientById(id: string | null) {
    return this.http.get(`${apiUrl}${id}`);
  }

  public clienteLogIn(dni: string, password: string):Observable<any>{
    return this.http.get(`${apiUrl}log-in/${dni}/${password}`);
  }

  public getMascotasCliente(id: string | null) {
    return this.http.get(`${apiUrl}${id}/mascotas`)
  }

}