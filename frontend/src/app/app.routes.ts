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
import { InvestigadorFormComponent } from './features/investigadores/investigador-form/investigador-form'
import { ProyectoFormComponent } from './features/proyectos/proyecto-form/proyecto-form'
import { ContactosAdminComponent } from './pages/contactos-admin/contactos-admin'
import { ListaPublicacionesComponent } from './features/publicaciones/lista-publicaciones/lista-publicaciones'
import { FormPublicacionComponent } from './features/publicaciones/form-publicacion/form-publicacion'
import { PublicacionDetalleComponent } from './pages/publicacion-detalle/publicacion-detalle'
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
  {
    path: 'listaPublicaciones',
    component: ListaPublicacionesComponent
  },
  {
    path: 'publicacion-detalle/:id',
    component: PublicacionDetalleComponent
  },

  // =========================
  // ADMIN PANEL
  // =========================
  {
    path: 'admin/proyectos',
    component: ProyectosComponent
  },
  {
    path: 'admin/proyectos/nuevo',
    component: ProyectoFormComponent
  },
  {
    path: 'admin/proyectos/editar/:id',
    component: ProyectoFormComponent
  },
  {
    path: 'admin/investigadores',
    component: InvestigadoresComponent
  },
  {
    path: 'admin/publicaciones',
    component: PublicacionesComponent
  },
  {
    path: 'admin/investigadores/nuevo',
    component: InvestigadorFormComponent
  },
  {
    path: 'admin/investigadores/editar/:id',
    component: InvestigadorFormComponent
  },
  {
    path: 'admin/contactos',
    component: ContactosAdminComponent
  },
  {
    path: 'admin/publicaciones/nueva',
    component: FormPublicacionComponent
  },
  {
    path: 'admin/publicaciones/editar/:id',
    component: FormPublicacionComponent
  }
]