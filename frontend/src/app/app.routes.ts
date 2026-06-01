import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { InvestigadoresComponent } from './pages/investigadores/investigadores';
import { ProyectosComponent } from './pages/proyectos/proyectos';
import { PublicacionesComponent } from './pages/publicaciones/publicaciones';
import { ContactoComponent } from './pages/contacto/contacto';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'investigadores',
    component: InvestigadoresComponent
  },
  {
    path: 'proyectos',
    component: ProyectosComponent,
    runGuardsAndResolvers: 'always' // 🔥 FIX CLAVE
  },
  {
    path: 'publicaciones',
    component: PublicacionesComponent
  },
  {
    path: 'contacto',
    component: ContactoComponent
  }
];