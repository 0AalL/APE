import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import { forkJoin } from 'rxjs'

import { AuthService } from '../../../core/services/auth.service'
import { InvestigadorService } from '../../../core/services/investigador.service'
import { ProyectoService } from '../../../core/services/proyecto.service'
import { PublicacionesService } from '../../../core/services/publicaciones.service'
import { ContactoService } from '../../../core/services/contacto.service'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  userEmail: string | null = null

  totalInvestigadores = 0
  totalProyectos = 0
  totalPublicaciones = 0
  totalMensajes = 0

  actividades: string[] = []

  cargando = false

  constructor(
    private authService: AuthService,
    private investigadorService: InvestigadorService,
    private proyectoService: ProyectoService,
    private publicacionesService: PublicacionesService,
    private contactoService: ContactoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'])
      return
    }

    this.loadUser()
    this.loadDashboard()
  }

  // ⚡ DASHBOARD OPTIMIZADO
  loadDashboard() {

    this.cargando = true

    forkJoin({
      investigadores: this.investigadorService.getAll(),
      proyectos: this.proyectoService.getAll(),
      publicaciones: this.publicacionesService.getPublicaciones(),
      contactos: this.contactoService.getAll()
    }).subscribe({
      next: (data: any) => {

        this.totalInvestigadores = data.investigadores?.length ?? 0
        this.totalProyectos = data.proyectos?.length ?? 0
        this.totalPublicaciones = data.publicaciones?.length ?? 0
        this.totalMensajes = data.contactos?.length ?? 0

        this.generarActividades(data)

        this.cargando = false
        this.cdr.detectChanges()
      },

      error: () => {
        this.actividades = ['Error al cargar datos']
        this.cargando = false
        this.cdr.detectChanges()
      }
    })
  }

  generarActividades(data: any) {

    this.actividades = [
      `👥 ${data.investigadores?.length ?? 0} investigadores`,
      `📋 ${data.proyectos?.length ?? 0} proyectos`,
      `📚 ${data.publicaciones?.length ?? 0} publicaciones`,
      `📧 ${data.contactos?.length ?? 0} mensajes`
    ]
  }

  recargar() {
    this.loadDashboard()
  }

  loadUser() {
    const token = this.authService.getToken()

    if (!token) {
      this.userEmail = 'Usuario'
      return
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      this.userEmail = payload.email || 'Usuario'
    } catch {
      this.userEmail = 'Usuario'
    }
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}