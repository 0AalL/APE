import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { InvestigadorService } from '../../core/services/investigador.service'
import { InvestigadorModalComponent } from '../../features/investigadores/investigador-modal/investigador-modal'
import { ChangeDetectorRef } from '@angular/core'
@Component({
  selector: 'app-investigadores',
  standalone: true,
  imports: [CommonModule, FormsModule, InvestigadorModalComponent],
  templateUrl: './investigadores.html',
  styleUrls: ['./investigadores.css']
})
export class InvestigadoresComponent implements OnInit {

  investigadores: any[] = []

  modalVisible = false
  isEdit = false

  investigador: any = {}
  confirmVisible = false
  mensajeVisible = false
  mensajeTexto = ''

  idAEliminar: number | null = null
  nombreAEliminar = ''
  constructor(
    private investigadorService: InvestigadorService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargar()
  }

  cargar() {
    this.investigadorService.getAll()
      .subscribe({
        next: (data: any) => {

          console.log('DATA:', data)

          this.investigadores = [...data]

          this.cdr.detectChanges() // 🔥 CLAVE

        },
        error: (err) => {
          console.error(err)
        }
      })
  }

  // 📌 NUEVO
  abrirNuevo() {
    this.isEdit = false
    this.investigador = {
      nombre: '',
      cargo: '',
      correo: '',
      orcid: '',
      facebook: '',
      linkedin: '',
      instagram: '',
      telegram: '',
      foto: '',
      biografia: ''
    }
    this.modalVisible = true
  }

  // 📌 EDITAR
  abrirEditar(i: any) {
    this.isEdit = true
    this.investigador = { ...i }
    this.modalVisible = true
  }

  eliminar(i: any) {
    this.idAEliminar = i.id
    this.nombreAEliminar = i.nombre
    this.confirmVisible = true
  }
  confirmarEliminar() {
    if (!this.idAEliminar) return

    this.investigadorService.delete(this.idAEliminar)
      .subscribe({
        next: () => {
          this.confirmVisible = false
          this.mensajeTexto = '✅ Investigador eliminado correctamente'
          this.mensajeVisible = true

          this.cargar()

          setTimeout(() => {
            this.mensajeVisible = false
          }, 2500)
        },
        error: (err) => {
          console.error(err)
          this.confirmVisible = false

          this.mensajeTexto = '❌ Error al eliminar investigador'
          this.mensajeVisible = true

          setTimeout(() => {
            this.mensajeVisible = false
          }, 2500)
        }
      })
  }
  cancelarEliminar() {
    this.confirmVisible = false
    this.idAEliminar = null
  }
}