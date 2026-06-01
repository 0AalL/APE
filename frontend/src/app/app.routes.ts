import { Routes } from '@angular/router'

import { HomeComponent } from './pages/home/home'
import { LoginComponent } from './pages/login/login'
import { InvestigadoresComponent } from './pages/investigadores/investigadores'
import { ProyectosComponent } from './pages/proyectos/proyectos'
import { PublicacionesComponent } from './pages/publicaciones/publicaciones'
import { ContactoComponent } from './pages/contacto/contacto'
import { NosotrosComponent } from './pages/nosotros/nosotros'
import { InvestigadorDetalleComponent } from './pages/investigadores-detalle/investigadores-detalle'
import { ListaProyectosComponent } from './pages/lista-proyectos/lista-proyectos'
import { ProyectosDetalleComponent } from './pages/proyectos-detalle/proyectos-detalle'

export const routes: Routes = [

  // =========================
  // PUBLICO
  // =========================
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'nosotros',
    component: NosotrosComponent
  },
  {
    path: 'listaProyectos',
    component: ListaProyectosComponent
  },
  {
    path: 'proyecto-detalle/:id',
    component: ProyectosDetalleComponent
  },
  {
    path: 'investigador-detalle/:id',
    component: InvestigadorDetalleComponent
  },
  {
    path: 'publicaciones',
    component: PublicacionesComponent
  },
  {
    path: 'contacto',
    component: ContactoComponent
  },

  // =========================
  // ADMIN PANEL
  // =========================
  {
    path: 'admin/proyectos',
    component: ProyectosComponent
  },
  {
    path: 'admin/investigadores',
    component: InvestigadoresComponent
  },
  {
    path: 'admin/publicaciones',
    component: PublicacionesComponent
  }
]