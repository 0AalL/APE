import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { PublicacionesService } from '../../core/services/publicaciones.service'
import { ChangeDetectorRef } from '@angular/core'

@Component({
  selector: 'app-publicacion-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './publicacion-detalle.html',
  styleUrls: ['./publicacion-detalle.css']
})
export class PublicacionDetalleComponent implements OnInit {

  publicacion: any = null
  loading = true

  constructor(
    private route: ActivatedRoute,
    private publicacionService: PublicacionesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')

    console.log('🆔 ID publicación:', id)

    if (!id) {
      this.loading = false
      this.cdr.detectChanges()
      return
    }

    this.cargarDetalle(id)
  }

  cargarDetalle(id: string) {

    this.loading = true

    this.publicacionService.getByIdDetalle(Number(id)).subscribe({
      next: (res: any) => {

        console.log('📦 DETALLE PUBLICACIÓN:', res)

        this.publicacion = res
        this.loading = false

        this.cdr.detectChanges()
      },

      error: (err: any) => {

        console.error('❌ ERROR:', err)

        this.publicacion = null
        this.loading = false

        this.cdr.detectChanges()
      }
    })
  }
}