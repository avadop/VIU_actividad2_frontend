import { Component, OnInit } from '@angular/core';
import { Paginador } from 'src/app/models/Paginador';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  providers: [ProductoService],
})
export class TiendaComponent implements OnInit {
  productos: Producto[] = [];
  pageSizeOptions: number[];

  paginador: Paginador;

  totalProducts: number;

  constructor(private productoService: ProductoService) {
    this.paginador = new Paginador(1, 0, 6, 0);
    this.pageSizeOptions = [6, 12, 24];
    this.totalProducts = 0;
  }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.productoService
      .getProductos(this.paginador)
      .subscribe((infoProducto: any) => {
        this.productos = infoProducto.data.data;
        this.paginador.pageSize = this.productos.length;
        this.paginador.totalItems = infoProducto.data.total;
        this.totalProducts = infoProducto.data.total;
        console.log(
          'getProductos->subscribe->this.totalProducts : ',
          this.totalProducts
        );
      });
  }

  onPageChange(pageNumber: number) {
    this.paginador.pageNumber = pageNumber;

    this.productoService.getProductos(this.paginador).subscribe((data: any) => {
      this.productos = data.data.data;
      this.totalProducts = this.productos.length;
    });
  }
}
