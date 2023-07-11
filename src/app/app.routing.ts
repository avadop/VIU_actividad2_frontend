import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainPageComponent } from "./components/main-page/main-page.component";
import { InicioSesionComponent } from "./components/inicio-sesion/inicio-sesion.component";
import { RegistroUsuarioComponent } from "./components/registro-usuario/registro-usuario.component";

const appRoutes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'main-page/:id', component: MainPageComponent},
  {path: 'inicio-sesion', component: InicioSesionComponent},
  {path: 'registro-usuario', component: RegistroUsuarioComponent},
];

export const routing: ModuleWithProviders<Object> = RouterModule.forRoot(appRoutes);
