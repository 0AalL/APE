import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { InvestigadorService } from '../../core/services/investigador.service'
import { Investigador } from '../../core/models/investigador.model'

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './nosotros.html',
  styleUrls: ['./nosotros.css']
})
export class NosotrosComponent implements OnInit {

  equipo: Investigador[] = []
  loading = true

  constructor(
    private investigadorService: InvestigadorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarEquipo()
  }

  cargarEquipo(): void {
    this.investigadorService.getAll().subscribe({
      next: (data) => {
        console.log('📦 EQUIPO:', data)

        this.equipo = data
        this.loading = false

        this.cdr.detectChanges()
      },
      error: (err) => {
        console.error('❌ ERROR:', err)
        this.loading = false

        this.cdr.detectChanges()
      }
    })
  }
}