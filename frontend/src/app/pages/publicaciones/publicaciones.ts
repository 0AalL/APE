import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { PublicacionesService } from '../../core/services/publicaciones.service'

@Component({
  selector: 'app-publicaciones',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './publicaciones.html',
  styleUrl: './publicaciones.css'
})
export class PublicacionesComponent implements OnInit {

  publicaciones: any[] = []
  loading = true

  constructor(
    private publicacionService: PublicacionesService
  ) {}

  ngOnInit(): void {
    this.cargar()
  }

  cargar() {
    this.loading = true

    this.publicacionService.getPublicaciones()
      .subscribe({
        next: (data) => {
          this.publicaciones = data
          this.loading = false
        },
        error: () => {
          this.loading = false
        }
      })
  }

  eliminar(id: number) {
    this.publicacionService.deletePublicacion(id)
      .subscribe({
        next: () => this.cargar()
      })
  }
}