import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
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

  // modal
  modalVisible = false
  isEdit = false
  proyecto: any = {}

  // filtros
  filtroTitulo = ''
  filtroEstado = ''

  // paginación
  pagina = 1
  porPagina = 5

  constructor(private service: ProyectoService) {}

  ngOnInit(): void {
    this.cargar()
  }

  cargar() {
    this.service.getAll().subscribe((data: any) => {
      this.proyectos = data
    })
  }

  // 🔍 FILTRO
  get filtrados() {
    return this.proyectos.filter(p => {

      const titulo = !this.filtroTitulo ||
        p.titulo?.toLowerCase().includes(this.filtroTitulo.toLowerCase())

      const estado = !this.filtroEstado ||
        (p.estado || 'activo')
          .toLowerCase()
          .includes(this.filtroEstado.toLowerCase())

      return titulo && estado
    })
  }

  // 📄 PAGINACIÓN
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

  // ➕ NUEVO
  abrirNuevo() {
    this.isEdit = false
    this.proyecto = {
      titulo: '',
      participantes: [],
      descripcion: '',
      objetivos: '',
      resultados: ''
    }
    this.modalVisible = true
  }

  // ✏️ EDITAR
  abrirEditar(p: any) {
    this.isEdit = true
    this.proyecto = {
      ...p,
      participantes: p.participantes || []
    }
    this.modalVisible = true
  }

  // 🗑 ELIMINAR
  eliminar(id: number) {
    this.service.delete(id).subscribe(() => this.cargar())
  }
}