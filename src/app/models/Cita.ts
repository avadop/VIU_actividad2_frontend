export class Cita{
  constructor( 
    public hora: string, 
    public fecha: string, 
    public modalidad_cita: ModalidadCita, 
    public tipo_cita: TipoCita,
    public id_clinica: number,
    public num_chip: number,
    public id_cita?: number
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

export enum EstadoCita {
  OCUPADA,
  LIBRE,
  SELECCIONADA
}