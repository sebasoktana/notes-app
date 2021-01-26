import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NotasComponent } from './components/notas/notas.component'
import { NotaComponent } from './components/nota/nota.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { LoginComponent } from './components/login/login.component';
import { LoginOktaComponent } from './components/login-okta/login-okta.component';
import { AuthGuard } from './services/auth/auth.guard';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: {guards: [OktaAuthGuard]}  },
  { path: 'about', component: AboutComponent },
  { path: 'notas', component: NotasComponent },
  { path: 'nota/:id', component: NotaComponent },
  { path: 'buscar/:termino', component: BuscadorComponent },
  /* { path: '**', pathMatch: 'full', redirectTo: 'login' }, */
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'login-okta', component: LoginOktaComponent },
  { path: 'login/callback', component: OktaCallbackComponent },
];

export function onAuthRequired(oktaAuth: any, injector: any) {
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);