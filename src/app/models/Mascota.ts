export class Mascota {
  constructor(
    public num_chip: number,
    public edad: number,
    public dni: string,
    public informes_de_mascota: Array<string>,
    public vacunas: string,
    public nombre_mascota: string,
    public sexo: string,
    public especie: string,
    public historial_clinico: string,
    public imagen: string
  ) {}
}
