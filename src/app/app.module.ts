import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { HeaderComponent } from './components/header/header.component';
import { CitasDisponiblesComponent } from './components/citas-disponibles/citas-disponibles.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    RegistroUsuarioComponent,
    InicioSesionComponent,
    HeaderComponent,
    CitasDisponiblesComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
