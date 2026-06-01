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
    path: 'investigadores/:id',
    component: InvestigadorDetalleComponent
  },
  {
    path: 'proyectos',
    component: ProyectosComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'proyecto-detalle/:id',
    component: ProyectosDetalleComponent
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
    path: 'nosotros',
    component: NosotrosComponent
  },
  {
    path: 'listaProyectos',
    component: ListaProyectosComponent
  }
]