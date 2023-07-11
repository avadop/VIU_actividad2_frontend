import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    RegistroUsuarioComponent,
    InicioSesionComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
