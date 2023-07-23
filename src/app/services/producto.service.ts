import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto';

const apiUrl = 'http://localhost/api/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private http: HttpClient) {}

  public getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(apiUrl);
  }
}