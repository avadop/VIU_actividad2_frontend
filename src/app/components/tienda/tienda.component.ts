import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  providers: [ProductoService]
})
export class TiendaComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.productoService.getProductos().subscribe(
      (infoProducto: any) => {
        // Simulamos un retraso de 1 segundo antes de asignar los productos
        setTimeout(() => {
          this.productos = infoProducto.data;
          console.log('Productos obtenidos:', this.productos);
        }, 1000);
      },
    );
  }
}

