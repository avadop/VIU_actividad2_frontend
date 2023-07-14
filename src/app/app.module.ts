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
import { LoggedUserService } from './services/loggedUser.service';
import { PedirCitaComponent } from './components/pedir-cita/pedir-cita.component';
import { CitasProgramadasComponent } from './components/user/citas-programadas/citas-programadas.component';
import { DayNumberPipe } from './pipes/dayNumberPipe';
import { MonthNamePipe } from './pipes/monthNamePipe';
import { UserComponent } from './components/user/user.component';
import { MascotasComponent } from './components/user/mascotas/mascotas.component';
import { PerfilUsuarioComponent } from './components/user/perfil-usuario/perfil-usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    RegistroUsuarioComponent,
    InicioSesionComponent,
    HeaderComponent,
    CitasDisponiblesComponent,
    ErrorComponent,
    PedirCitaComponent,
    CitasProgramadasComponent,
    DayNumberPipe,
    MonthNamePipe,
    UserComponent,
    MascotasComponent,
    PerfilUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule
  ],
  providers: [LoggedUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
