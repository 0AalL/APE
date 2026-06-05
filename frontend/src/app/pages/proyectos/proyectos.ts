import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Router, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs'

import { ProyectoService } from '../../core/services/proyecto.service'

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proyectos.html',
  styleUrls: ['./proyectos.css']
})
export class ProyectosComponent implements OnInit {

  proyectos: any[] = []
  loading: boolean = false
  modalVisible = false
  isEdit = false
  proyecto: any = {}

  filtroTitulo = ''
  filtroEstado = ''
  filtroInvestigador = ''

  pagina = 1
  porPagina = 5

  toast: { message: string, type: string } | null = null

  // NUEVO
  modalEliminarVisible = false
  proyectoIdEliminar: number | null = null

  constructor(
    private service: ProyectoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.cargar()

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {

        if (event.urlAfterRedirects === '/proyectos') {
          this.cargar()
        }
      })
  }

cargar() {
  this.loading = true

  this.service.getAll().subscribe({
    next: (data: any) => {
      this.proyectos = data ?? []
      this.loading = false   // 🔥 IMPORTANTE
      this.cdr.detectChanges()
    },
    error: (err) => {
      console.error(err)
      this.proyectos = []
      this.loading = false   // 🔥 IMPORTANTE
      this.showToast('Error al cargar proyectos', 'error')
      this.cdr.detectChanges()
    }
  })
}
  get filtrados() {
    return this.proyectos.filter(p => {

      const titulo =
        !this.filtroTitulo ||
        p.titulo?.toLowerCase().includes(
          this.filtroTitulo.toLowerCase()
        )

      const estado =
        !this.filtroEstado ||
        (p.estado || 'activo')
          .toLowerCase()
          .includes(this.filtroEstado.toLowerCase())

      const investigador =
        !this.filtroInvestigador ||
        p.investigadores?.some((i: any) =>
          i.nombre?.toLowerCase().includes(
            this.filtroInvestigador.toLowerCase()
          )
        )

      return titulo && estado && investigador
    })
  }

  get totalPaginas() {
    return Math.ceil(this.filtrados.length / this.porPagina)
  }

  get paginados() {
    const ini = (this.pagina - 1) * this.porPagina
    return this.filtrados.slice(ini, ini + this.porPagina)
  }

  cambiarPagina(n: number) {
    if (n < 1 || n > this.totalPaginas) return
    this.pagina = n
  }

  abrirNuevo() {
    this.router.navigate(['admin/proyectos/nuevo'])
  }

  abrirEditar(p: any) {
    this.router.navigate(['admin/proyectos/editar', p.id])
  }

  // ==========================
  // MODAL ELIMINAR
  // ==========================

  abrirModalEliminar(id: number) {
    this.proyectoIdEliminar = id
    this.modalEliminarVisible = true
  }

  cerrarModalEliminar() {
    this.modalEliminarVisible = false
    this.proyectoIdEliminar = null
  }

  confirmarEliminar() {

    if (!this.proyectoIdEliminar) return

    this.service.delete(this.proyectoIdEliminar).subscribe({
      next: () => {

        this.cerrarModalEliminar()

        this.cargar()

        this.showToast(
          'Proyecto eliminado correctamente',
          'success'
        )
      },
      error: () => {

        this.cerrarModalEliminar()

        this.showToast(
          'Error al eliminar proyecto',
          'error'
        )
      }
    })
  }

  showToast(message: string, type: string) {

    this.toast = {
      message,
      type
    }

    setTimeout(() => {
      this.toast = null
      this.cdr.detectChanges()
    }, 3000)
  }
}