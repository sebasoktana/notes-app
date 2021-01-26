import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, Router } from '@angular/router';

//Okta
import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';

const config = {
  issuer: 'https://dev-55154279.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/home',
  clientId: '0oa46y0k8jNGMCFZs5d6',
  pkce: true
}

// Rutas
import { APP_ROUTING } from './app.routes';

// Servicios
import { NotesService } from './services/notes.service';

// Componentes
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotifierModule } from "angular-notifier";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { BuscadorComponent } from './components/buscador/buscador.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NotaComponent } from './components/nota/nota.component';
import { NotaTarjetaComponent } from './components/nota-tarjeta/nota-tarjeta.component';
import { NotasComponent } from './components/notas/notas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { LoginOktaComponent } from './components/login-okta/login-okta.component';
import { AuthGuard } from './services/auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    BuscadorComponent,
    NotaComponent,
    NotaTarjetaComponent,
    NotasComponent,
    LoginComponent,
    LoginOktaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    APP_ROUTING,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    NotifierModule,
    ReactiveFormsModule,
    BrowserModule,
    OktaAuthModule
  ],
  providers: [
    NotesService,
    AuthGuard,
    { provide: OKTA_CONFIG, useValue: config }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
