import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ProyectoService } from '../../../core/services/proyecto.service'
import { InvestigadorService } from '../../../core/services/investigador.service'

@Component({
  selector: 'app-proyecto-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proyecto-modal.html',
  styleUrls: ['./proyecto-modal.css']
})
export class ProyectoModalComponent {

  @Input() visible = false
  @Input() isEdit = false
  @Input() proyecto: any = this.getEmpty()

  @Output() cerrarModal = new EventEmitter<boolean>()
  @Output() refrescar = new EventEmitter<void>()

  // 🔎 buscador
  buscadorVisible = false
  investigadores: any[] = []
  filtrados: any[] = []

  filtroNombre = ''
  filtroCedula = ''
  filtroCargo = ''

  // paginación
  pagina = 1
  porPagina = 5

  constructor(
    private service: ProyectoService,
    private investigadorService: InvestigadorService
  ) {}

  getEmpty() {
    return {
      titulo: '',
      investigadores: [],
      descripcion: '',
      objetivos: '',
      resultados: ''
    }
  }

  // 🔥 abrir buscador
  abrirBuscador() {
    this.buscadorVisible = true
    this.pagina = 1

    this.investigadorService.getAll().subscribe(res => {
      this.investigadores = res
      this.filtrados = res
    })
  }

  // 🔍 filtrar
  filtrar() {

    this.filtrados = this.investigadores.filter(i => {

      const nombre = !this.filtroNombre ||
        i.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())

      const cedula = !this.filtroCedula ||
        i.cedula.toLowerCase().includes(this.filtroCedula.toLowerCase())

      const cargo = !this.filtroCargo ||
        i.cargo.toLowerCase().includes(this.filtroCargo.toLowerCase())

      return nombre && cedula && cargo
    })
  }

  // 📄 paginación
  get totalPaginas() {
    return Math.ceil(this.filtrados.length / this.porPagina)
  }

  get paginados() {
    const ini = (this.pagina - 1) * this.porPagina
    return this.filtrados.slice(ini, ini + this.porPagina)
  }

  seleccionarInvestigador(i: any) {

    const existe = this.proyecto.investigadores.find((x: any) => x.id === i.id)

    if (!existe) {
      this.proyecto.investigadores.push(i)
    }

    this.buscadorVisible = false
  }

  eliminarInvestigador(idx: number) {
    this.proyecto.investigadores.splice(idx, 1)
  }

  cerrar() {
    this.cerrarModal.emit(false)
  }

  guardar() {

    const data = {
      ...this.proyecto,
      investigadores: this.proyecto.investigadores.map((i: any) => i.id)
    }

    if (this.isEdit && this.proyecto.id) {

      this.service.update(this.proyecto.id, data)
        .subscribe(() => {
          this.refrescar.emit()
          this.cerrar()
        })

    } else {

      this.service.create(data)
        .subscribe(() => {
          this.refrescar.emit()
          this.cerrar()
        })
    }
  }
}