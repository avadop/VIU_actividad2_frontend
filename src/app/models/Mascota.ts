export class Mascota {
  constructor(
    public num_chip: number = 0,
    public edad: number = 0,
    public dni: string = '',
    public informes_de_mascota: string[] = [],
    public vacunas: string = '',
    public nombre_mascota: string = '',
    public sexo: string = '',
    public especie: string = '',
    public historial_clinico: string = '',
    public imagen: string = ''
  ) {}
}
