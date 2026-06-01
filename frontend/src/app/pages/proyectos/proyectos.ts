import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Router, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs'

import { ProyectoService } from '../../core/services/proyecto.service'
import { ProyectoModalComponent } from '../../features/proyectos/proyecto-modal/proyecto-modal'

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, FormsModule, ProyectoModalComponent],
  templateUrl: './proyectos.html',
  styleUrls: ['./proyectos.css']
})
export class ProyectosComponent implements OnInit {

  proyectos: any[] = []

  modalVisible = false
  isEdit = false
  proyecto: any = {}

  filtroTitulo = ''
  filtroEstado = ''
  filtroInvestigador = ''

  pagina = 1
  porPagina = 5

  toast: { message: string, type: string } | null = null

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
    this.service.getAll().subscribe({
      next: (data: any) => {
        this.proyectos = data ?? []

        // FORZAR DETECCIÓN DE CAMBIOS
        this.cdr.detectChanges()
      },
      error: (err) => {
        console.error(err)
        this.proyectos = []
        this.showToast('Error al cargar proyectos', 'error')

        this.cdr.detectChanges()
      }
    })
  }

  get filtrados() {
    return this.proyectos.filter(p => {

      const titulo = !this.filtroTitulo ||
        p.titulo?.toLowerCase().includes(this.filtroTitulo.toLowerCase())

      const estado = !this.filtroEstado ||
        (p.estado || 'activo')
          .toLowerCase()
          .includes(this.filtroEstado.toLowerCase())

      const investigador = !this.filtroInvestigador ||
        p.investigadores?.some((i: any) =>
          i.nombre?.toLowerCase().includes(this.filtroInvestigador.toLowerCase())
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
    this.isEdit = false
    this.proyecto = {
      titulo: '',
      descripcion: '',
      objetivos: '',
      resultados: '',
      investigadores: []
    }
    this.modalVisible = true
  }

  abrirEditar(p: any) {
    this.isEdit = true
    this.proyecto = {
      ...p,
      investigadores: p.investigadores?.map((i: any) => i.id) || []
    }
    this.modalVisible = true
  }

  eliminar(id: number) {

    const ok = confirm('¿Seguro que deseas eliminar este proyecto?')
    if (!ok) return

    this.service.delete(id).subscribe({
      next: () => {
        this.cargar()
        this.showToast('Proyecto eliminado correctamente', 'success')
      },
      error: () => {
        this.showToast('Error al eliminar proyecto', 'error')
      }
    })
  }

  showToast(message: string, type: string) {
    this.toast = { message, type }

    setTimeout(() => {
      this.toast = null
      this.cdr.detectChanges()
    }, 3000)
  }
}