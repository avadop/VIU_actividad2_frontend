import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit {
  @Input() numProductos: number; // Total de elementos a paginar
  @Input() pageSizeOptions: number[]; // Opciones de tamaños de página
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>(); // Evento para notificar cambios de página

  currentPage: number;
  totalPages: number;

  constructor() {
    this.numProductos = 0;
    this.pageSizeOptions = [];
    this.currentPage = 1;
    this.totalPages = 0;
  }
  ngOnInit(): void {
    if (this.numProductos > 0 && this.pageSizeOptions.length > 0) {
      this.totalPages = Math.ceil(this.numProductos / this.pageSizeOptions[0]);
    } else {
      this.totalPages = 0;
    }
  }

  onPageChange(pageNumber: number) {
    console.log('currentPage: ', pageNumber);
    this.currentPage = pageNumber;
    this.pageChange.emit(pageNumber);
  }
}
