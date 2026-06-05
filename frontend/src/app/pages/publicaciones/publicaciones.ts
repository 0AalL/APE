import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { PublicacionesService } from '../../core/services/publicaciones.service'

@Component({
  selector: 'app-publicaciones',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './publicaciones.html',
  styleUrls: ['./publicaciones.css']
})
export class PublicacionesComponent implements OnInit {

  publicaciones: any[] = []

  publicacionesFiltradasCache: any[] = []
  publicacionesPaginadasCache: any[] = []

  loading = false

  filtroTitulo = ''
  filtroRevista = ''
  filtroDOI = ''

  pagina = 1
  itemsPorPagina = 8
  totalPaginas = 0

  constructor(
    private service: PublicacionesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar()
  }

  // =========================
  // CARGA ULTRA RÁPIDA
  // =========================
  cargar() {
    this.loading = true

    this.service.getPublicaciones().subscribe({
      next: (data: any) => {

        this.publicaciones = data ?? []

        this.aplicarFiltros()

        this.loading = false
        this.cdr.detectChanges()
      },
      error: () => {

        this.publicaciones = []
        this.aplicarFiltros()

        this.loading = false
        this.cdr.detectChanges()
      }
    })
  }

  // =========================
  // FILTROS (1 SOLO PROCESO)
  // =========================
  aplicarFiltros() {

    const t = this.filtroTitulo.toLowerCase()
    const r = this.filtroRevista.toLowerCase()
    const d = this.filtroDOI.toLowerCase()

    this.publicacionesFiltradasCache = this.publicaciones.filter(p =>
      (!t || p.titulo?.toLowerCase().includes(t)) &&
      (!r || p.revista?.toLowerCase().includes(r)) &&
      (!d || p.doi?.toLowerCase().includes(d))
    )

    this.totalPaginas = Math.max(
      1,
      Math.ceil(this.publicacionesFiltradasCache.length / this.itemsPorPagina)
    )

    this.pagina = 1
    this.actualizarPagina()
  }

  // =========================
  // PAGINACIÓN SIN GETTERS
  // =========================
  actualizarPagina() {

    const ini = (this.pagina - 1) * this.itemsPorPagina

    this.publicacionesPaginadasCache =
      this.publicacionesFiltradasCache.slice(ini, ini + this.itemsPorPagina)
  }

  cambiarPagina(n: number) {
    if (n < 1 || n > this.totalPaginas) return
    this.pagina = n
    this.actualizarPagina()
  }

  resetPaginaYFiltrar() {
    this.aplicarFiltros()
  }

  // =========================
  // DELETE
  // =========================
  eliminar(id: number) {

    if (!confirm('¿Eliminar publicación?')) return

    this.service.deletePublicacion(id).subscribe({
      next: () => this.cargar()
    })
  }
}