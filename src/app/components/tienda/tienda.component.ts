import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
  totalItems: number;
  pageSizeOptions: number[];

  paginador: Paginador;

  @ViewChild('paginator') paginator: MatPaginator | undefined;

  constructor(private productoService: ProductoService) {
    this.totalItems = 0;
    this.paginador = new Paginador(1, 0, 9, 0);
    this.pageSizeOptions = [6, 12, 24];
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
      });

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  onPageChange(event: PageEvent) {
    this.paginador.pageIndex = event.pageIndex;
    this.paginador.pageNumber = event.pageIndex + 1;
    this.paginador.pageSize = event.pageSize;

    this.productoService.getProductos(this.paginador).subscribe((data: any) => {
      this.productos = data.data.data;
    });
  }
}
