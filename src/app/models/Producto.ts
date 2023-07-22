export class Producto {
    constructor(
      public id: number,
      public nombre_producto: string,
      public marca: string,
      public imagen: string,
      public descripcion: string,
      public ficha_tecnica: string,
      public precio: number,
      public cantidad_disponible: number,
      public tipo_producto: string,
      public historial_clinico: string
    ) {}
  }