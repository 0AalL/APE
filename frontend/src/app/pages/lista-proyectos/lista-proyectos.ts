import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ProyectoService } from '../../core/services/proyecto.service'
import { ChangeDetectorRef } from '@angular/core'
@Component({
  selector: 'app-lista-proyectos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-proyectos.html',
  styleUrls: ['./lista-proyectos.css']
})
export class ListaProyectosComponent implements OnInit {

  proyectos: any[] = []
 loading: boolean = false;

  constructor(
    private proyectoService: ProyectoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar()
  }

  cargar() {
    this.proyectoService.getAll().subscribe({
      next: (res) => {
        this.proyectos = res
        this.loading = false
        this.cdr.detectChanges()
      },
      error: (err) => {
        console.error(err)
        this.loading = false
        this.cdr.detectChanges()
      }
    })
  }
}