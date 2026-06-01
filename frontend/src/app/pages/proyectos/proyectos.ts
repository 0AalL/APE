import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProyectoService }
from '../../core/services/proyecto.service';

@Component({
  selector: 'app-proyectos',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.css'
})
export class ProyectosComponent
implements OnInit {

  proyectos:any[] = [];

  titulo = '';
  descripcion = '';
  presupuesto = 0;

  constructor(
    private proyectoService:
    ProyectoService
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {

    this.proyectoService
      .getAll()
      .subscribe((data:any)=>{

        this.proyectos = data;

      });

  }

  crear() {

    const proyecto = {

      titulo: this.titulo,
      descripcion: this.descripcion,
      presupuesto: this.presupuesto,

      fechaInicio:'2026-01-01',
      fechaFin:'2026-12-31',

      estado:'activo',
      investigadorId:1

    };

    this.proyectoService
      .create(proyecto)
      .subscribe(()=>{

        this.cargar();

      });

  }

  eliminar(id:number){

    this.proyectoService
      .delete(id)
      .subscribe(()=>{

        this.cargar();

      });

  }

}