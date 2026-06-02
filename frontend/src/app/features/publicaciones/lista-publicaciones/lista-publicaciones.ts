import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { PublicacionesService } from '../../../core/services/publicaciones.service'

@Component({
  selector: 'app-lista-publicaciones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-publicaciones.html',
  styleUrl: './lista-publicaciones.css'
})
export class ListaPublicacionesComponent implements OnInit {

  publicaciones: any[] = []
  loading = true

  constructor(
    private publicacionesService: PublicacionesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarPublicaciones()
  }

  cargarPublicaciones(): void {
    this.publicacionesService.getPublicaciones()
      .subscribe({
        next: (data) => {
          this.publicaciones = data
          this.loading = false

          // Forzar detección de cambios
          this.cdr.detectChanges()
        },
        error: () => {
          this.loading = false

          // También actualizar vista en error
          this.cdr.detectChanges()
        }
      })
  }
}