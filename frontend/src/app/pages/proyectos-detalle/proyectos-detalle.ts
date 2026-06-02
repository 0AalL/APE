import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ChangeDetectorRef } from '@angular/core'
import { ProyectoService } from '../../core/services/proyecto.service'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-proyectos-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './proyectos-detalle.html',
  styleUrls: ['./proyectos-detalle.css']
})
export class ProyectosDetalleComponent implements OnInit {

  proyecto: any = null
  loading = true

  constructor(
    private route: ActivatedRoute,
    private proyectoService: ProyectoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')

    if (!id) {
      this.loading = false
      return
    }

    this.cargar(Number(id))
  }

  // 🔥 NORMALIZADOR SEGURO
  private normalizarObjetivos(data: any): string[] {
    if (!data) return []

    if (Array.isArray(data)) return data

    if (typeof data === 'string') {
      try {
        return JSON.parse(data)
      } catch {
        return []
      }
    }

    return []
  }

  cargar(id: number) {
    this.loading = true

    this.proyectoService.getByIdDetalle(id).subscribe({
      next: (res) => {

        this.proyecto = res

        // 🔥 FIX OBJETIVOS SIEMPRE ARRAY
        this.proyecto.objetivos = this.normalizarObjetivos(this.proyecto.objetivos)

        this.loading = false
        this.cdr.detectChanges()
      },

      error: (err) => {
        console.error('❌ ERROR:', err)
        this.proyecto = null
        this.loading = false
        this.cdr.detectChanges()
      }
    })
  }
}