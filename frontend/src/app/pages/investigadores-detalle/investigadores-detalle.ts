import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CommonModule } from '@angular/common'
import { InvestigadorService } from '../../core/services/investigador.service'
import { ChangeDetectorRef } from '@angular/core'
import { RouterModule } from '@angular/router'
@Component({
  selector: 'app-investigador-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './investigadores-detalle.html',
  styleUrls: ['./investigadores-detalle.css']
})
export class InvestigadorDetalleComponent implements OnInit {

  investigador: any = null
  loading = true

  constructor(
    private route: ActivatedRoute,
    private investigadorService: InvestigadorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')

    console.log('🆔 ID recibido:', id)

    if (!id) {
      this.loading = false
      this.cdr.detectChanges()
      return
    }

    this.cargarDetalle(id)
  }

  cargarDetalle(id: string) {

    this.loading = true

    this.investigadorService.getByIdDetalle(Number(id)).subscribe({
      next: (res) => {

        console.log('📦 DETALLE INVESTIGADOR:', res)

        this.investigador = res
        this.loading = false

        this.cdr.detectChanges()
      },

      error: (err) => {

        console.error('❌ ERROR DETALLE:', err)

        this.investigador = null
        this.loading = false

        this.cdr.detectChanges()
      }
    })
  }
}