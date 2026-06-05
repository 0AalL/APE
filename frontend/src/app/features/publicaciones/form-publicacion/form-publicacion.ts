import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { PublicacionesService } from '../../../core/services/publicaciones.service'

@Component({
  selector: 'app-form-publicacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-publicacion.html',
  styleUrl: './form-publicacion.css'
})
export class FormPublicacionComponent implements OnInit {

  form!: any

  editMode = false
  idPublicacion: number | null = null
  loading = false

  constructor(
    private fb: FormBuilder,
    private publicacionesService: PublicacionesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // ✅ ahora fb ya existe aquí
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      resumen: ['', [Validators.required, Validators.minLength(20)]],
      revista: ['', [Validators.required, Validators.minLength(3)]],
      doi: ['', [Validators.required, Validators.minLength(5)]],
      fechaPublicacion: ['', [Validators.required]],
      autores: ['', [Validators.required, Validators.minLength(5)]],
      proyectoId: [0, [Validators.required]]
    })

    const id = this.route.snapshot.paramMap.get('id')

    if (id) {
      this.editMode = true
      this.idPublicacion = Number(id)
      this.cargarPublicacion(this.idPublicacion)
    }
  }

  cargarPublicacion(id: number) {
    this.publicacionesService.getPublicacion(id).subscribe({
      next: (data) => {
        this.form.patchValue(data)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  guardar() {
    if (this.form.invalid) return

    this.loading = true

    const data = this.form.value

    // 🔄 Convertir proyectoId a número si existe
    if (data.proyectoId) {
      data.proyectoId = Number(data.proyectoId)
    }

    // 📅 Validar fecha
    if (!data.fechaPublicacion) {
      console.error('❌ Fecha de publicación requerida')
      this.loading = false
      return
    }

    console.log('📤 PAYLOAD:', data)

    if (this.editMode && this.idPublicacion) {
      this.publicacionesService.actualizarPublicacion(this.idPublicacion, data)
        .subscribe({
          next: () => {
            this.loading = false
            this.router.navigate(['/admin/publicaciones'])
          },
          error: (err) => {
            console.error('❌ Error al actualizar:', err)
            this.loading = false
          }
        })

    } else {
      this.publicacionesService.crearPublicacion(data)
        .subscribe({
          next: () => {
            this.loading = false
            this.router.navigate(['/admin/publicaciones'])
          },
          error: (err) => {
            console.error('❌ Error al crear:', err)
            this.loading = false
          }
        })
    }
  }

  cancelar() {
    this.router.navigate(['/admin/publicaciones'])
  }
}