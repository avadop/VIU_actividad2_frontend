import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainPageComponent } from "./components/main-page/main-page.component";
import { InicioSesionComponent } from "./components/inicio-sesion/inicio-sesion.component";
import { CitasDisponiblesComponent } from "./components/citas-disponibles/citas-disponibles.component";
import { RegistroUsuarioComponent } from "./components/registro-usuario/registro-usuario.component";
import { ErrorComponent } from "./components/error/error.component";
import { PedirCitaComponent } from "./components/pedir-cita/pedir-cita.component";
import { CitasProgramadasComponent } from "./components/citas-programadas/citas-programadas.component";

const appRoutes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'main-page', component: MainPageComponent},
  {path: 'inicio-sesion', component: InicioSesionComponent},
  {path: 'registro-usuario', component: RegistroUsuarioComponent},
  {path: 'citas-disponibles', component: CitasDisponiblesComponent},
  {path: 'citas-programadas', component: CitasProgramadasComponent},
  {path: 'pedir-cita', component: PedirCitaComponent},
  {path: '**', component: ErrorComponent}
];

export const routing: ModuleWithProviders<Object> = RouterModule.forRoot(appRoutes);
