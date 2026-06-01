import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { InvestigadorService } from '../../../core/services/investigador.service'
import { Investigador } from '../../../core/models/investigador.model'

@Component({
  selector: 'app-investigador-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './investigador-modal.html',
  styleUrls: ['./investigador-modal.css']
})
export class InvestigadorModalComponent {

  @Input() visible = false
  @Input() isEdit = false
  @Input() investigador: Investigador = this.getEmptyInvestigador()

  @Output() cerrarModal = new EventEmitter<boolean>()
  @Output() refrescar = new EventEmitter<void>()

  file: File | null = null
  preview: string | null = null

  constructor(private service: InvestigadorService) { }

  // INVESTIGADOR VACÍO TIPADO
  private getEmptyInvestigador(): Investigador {
    return {
      nombre: '',
      cargo: '',
      correo: '',
      orcid: '',
      facebook: '',
      linkedin: '',
      instagram: '',
      telegram: '',
      biografia: ''
    }
  }

  // 📸 IMAGEN
  onFileSelected(event: any) {

    const file = event.target.files[0]

    if (!file) return

    this.file = file

    const reader = new FileReader()

    reader.onload = () => {
      this.preview = reader.result as string
    }

    reader.readAsDataURL(file)
  }

  // ❌ CERRAR
  cerrar() {
    this.cerrarModal.emit(false)
  }

  //  GUARDAR
  guardar() {

    if (!this.investigador.nombre || !this.investigador.cargo || !this.investigador.correo) {
      console.error('FALTAN CAMPOS OBLIGATORIOS')
      return
    }

    const formData = new FormData()

    // 📌 CAMPOS TEXTO
    formData.append('nombre', this.investigador.nombre)
    formData.append('cargo', this.investigador.cargo)
    formData.append('correo', this.investigador.correo)

    formData.append('orcid', this.investigador.orcid || '')
    formData.append('facebook', this.investigador.facebook || '')
    formData.append('linkedin', this.investigador.linkedin || '')
    formData.append('instagram', this.investigador.instagram || '')
    formData.append('telegram', this.investigador.telegram || '')
    formData.append('biografia', this.investigador.biografia || '')

    // 📸 ARCHIVO (IMPORTANTE)
    if (this.file) {
      formData.append('foto', this.file)
    }

    // ✏️ EDITAR
    if (this.isEdit && this.investigador.id) {

      this.service.update(this.investigador.id, formData)
        .subscribe({
          next: () => {
            this.refrescar.emit()
            this.cerrar()
          },
          error: (err) => console.error('ERROR UPDATE:', err)
        })

    } else {

      // ➕ CREAR
      this.service.create(formData)
        .subscribe({
          next: () => {
            this.refrescar.emit()
            this.cerrar()
          },
          error: (err) => console.error('ERROR CREATE:', err)
        })
    }
  }
}