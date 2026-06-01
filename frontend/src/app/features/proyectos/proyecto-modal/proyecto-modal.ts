import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ProyectoService } from '../../../core/services/proyecto.service'

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

  nuevoParticipante = ''

  constructor(private service: ProyectoService) {}

  getEmpty() {
    return {
      titulo: '',
      participantes: [],
      descripcion: '',
      objetivos: '',
      resultados: ''
    }
  }

  // 👥 agregar participante
  agregarParticipante() {

    if (!this.nuevoParticipante.trim()) return

    this.proyecto.participantes.push(this.nuevoParticipante.trim())

    this.nuevoParticipante = ''
  }

  // ❌ eliminar participante
  eliminarParticipante(i: number) {
    this.proyecto.participantes.splice(i, 1)
  }

  // ❌ cerrar
  cerrar() {
    this.cerrarModal.emit(false)
  }

  // 💾 guardar
  guardar() {

    if (!this.proyecto.titulo) {
      console.error('Título obligatorio')
      return
    }

    const data = {
      ...this.proyecto
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