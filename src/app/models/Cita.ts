export class Cita{
  constructor( 
    public id_cita: number, 
    public hora: Date, 
    public fecha: Date, 
    public modalidad_cita: ModalidadCita, 
    public tipo_cita: TipoCita,
    public id_clinica: string,
    public num_chip: number
    ) {
  }
}

export enum ModalidadCita {
  PRESENCIAL = 'presencial',
  ONLINE = 'online',
  A_DOMICILIO = 'a_domicilio'
}

export enum TipoCita {
  CONSULTA_GENERAL = 'consulta_general',
  VACUNACION = 'vacunacion',
  CIRUGIA = 'cirugia',
  ANALITICA = 'analitica',
  PELUQUERIA = 'peluqueria'
}