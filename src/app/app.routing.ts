import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainPageComponent } from "./components/main-page/main-page.component";
import { InicioSesionComponent } from "./components/inicio-sesion/inicio-sesion.component";
import { CitasDisponiblesComponent } from "./components/citas-disponibles/citas-disponibles.component";
import { RegistroUsuarioComponent } from "./components/registro-usuario/registro-usuario.component";
import { ErrorComponent } from "./components/error/error.component";
import { PedirCitaComponent } from "./components/pedir-cita/pedir-cita.component";
import { CitasProgramadasComponent } from "./components/user/citas-programadas/citas-programadas.component";
import { UserComponent } from "./components/user/user.component";
import { MascotasComponent } from "./components/user/mascotas/mascotas.component";
import { PerfilUsuarioComponent } from "./components/user/perfil-usuario/perfil-usuario.component";
import { MascotasAltaComponent } from "./components/user/mascotas/mascotas-alta/mascotas-alta.component";
import { MascotasDetalleComponent } from "./components/user/mascotas/mascotas-detalle/mascotas-detalle.component";
import { TiendaComponent } from "./components/tienda/tienda.component";

const appRoutes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'main-page', component: MainPageComponent},
  {path: 'inicio-sesion', component: InicioSesionComponent},
  {path: 'registro-usuario', component: RegistroUsuarioComponent},
  {path: 'citas-disponibles', component: CitasDisponiblesComponent},
  {path: 'tienda', component: TiendaComponent},
  {path: 'pedir-cita/:dia/:hora', component: PedirCitaComponent},
  {path: 'user', component: UserComponent, children: [
    {path: '', component: PerfilUsuarioComponent},
    {path: 'mascotas', component: MascotasComponent},
    {path: 'mascotas/alta', component: MascotasAltaComponent},
    {path: 'mascotas/detalle/:numChip', component: MascotasDetalleComponent},
    {path: 'citas-programadas', component: CitasProgramadasComponent}
  ]},
  {path: '**', component: ErrorComponent}
];

export const routing: ModuleWithProviders<Object> = RouterModule.forRoot(appRoutes);
