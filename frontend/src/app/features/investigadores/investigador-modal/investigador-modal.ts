import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core'
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
  @Input() investigador: Investigador = this.getEmpty()

  @Output() cerrarModal = new EventEmitter<boolean>()
  @Output() refrescar = new EventEmitter<void>()

  file: File | null = null
  preview: string | null = null

  constructor(
    private service: InvestigadorService,
    private cd: ChangeDetectorRef
  ) {}

  // OBJETO VACÍO
  private getEmpty(): Investigador {
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

  // 🔥 IMAGEN ACTUAL (PREVIEW O BACKEND)
  getCurrentImage(): string {

    if (this.preview) return this.preview

    if (this.investigador?.foto) {
      return `http://localhost:3000/uploads/${this.investigador.foto}`
    }

    return 'https://via.placeholder.com/120'
  }

  // ✏️ EDITAR
  abrirEditar(i: Investigador) {
    this.isEdit = true
    this.visible = true

    this.investigador = JSON.parse(JSON.stringify(i))

    this.file = null
    this.preview = null

    this.cd.detectChanges()
  }

  // 📸 SELECCIONAR IMAGEN (FIX DEFINITIVO)
  onFileSelected(event: any) {

    console.log('🔥 INPUT FILE EJECUTADO')

    const file = event.target.files?.[0]
    if (!file) {
      console.log('❌ NO FILE')
      return
    }

    console.log('📸 FILE:', file.name)

    this.file = file

    const reader = new FileReader()

    reader.onload = () => {

      console.log('✅ FILE LEIDO')

      this.preview = reader.result as string

      console.log('PREVIEW LISTO')

      // 🔥 FORZAR UPDATE ANGULAR
      this.cd.detectChanges()
    }

    reader.onerror = (e) => {
      console.log('❌ ERROR FILE READER', e)
    }

    reader.readAsDataURL(file)
  }

  // ❌ CERRAR
  cerrar() {
    this.cerrarModal.emit(false)
  }

  // 💾 GUARDAR
  guardar() {

    if (!this.investigador.nombre || !this.investigador.cargo || !this.investigador.correo) {
      console.error('FALTAN CAMPOS OBLIGATORIOS')
      return
    }

    const formData = new FormData()

    formData.append('nombre', this.investigador.nombre)
    formData.append('cargo', this.investigador.cargo)
    formData.append('correo', this.investigador.correo)

    formData.append('orcid', this.investigador.orcid || '')
    formData.append('facebook', this.investigador.facebook || '')
    formData.append('linkedin', this.investigador.linkedin || '')
    formData.append('instagram', this.investigador.instagram || '')
    formData.append('telegram', this.investigador.telegram || '')
    formData.append('biografia', this.investigador.biografia || '')

    if (this.file) {
      formData.append('foto', this.file)
    }

    if (this.isEdit && this.investigador.id) {

      this.service.update(this.investigador.id, formData)
        .subscribe({
          next: () => {
            this.refrescar.emit()
            this.cerrar()
          },
          error: (err) => console.error(err)
        })

    } else {

      this.service.create(formData)
        .subscribe({
          next: () => {
            this.refrescar.emit()
            this.cerrar()
          },
          error: (err) => console.error(err)
        })
    }
  }
}