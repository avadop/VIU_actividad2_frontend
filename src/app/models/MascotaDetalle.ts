import { Cita } from './Cita';
import { Mascota } from './Mascota';
import { Recordatorio } from './Recordatorio';

export class MascotaDetalle {
  public mascota!: Mascota;
  public citas!: Cita[];
  public recordatorios!: Recordatorio[];
}
