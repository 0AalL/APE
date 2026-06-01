import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PublicacionService }
from '../../core/services/publicacion.service';

@Component({
  selector: 'app-publicaciones',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './publicaciones.html',
  styleUrl: './publicaciones.css'
})
export class PublicacionesComponent
implements OnInit {

  publicaciones:any[] = [];

  titulo = '';
  resumen = '';
  revista = '';
  doi = '';

  constructor(
    private publicacionService:
    PublicacionService
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {

    this.publicacionService
      .getAll()
      .subscribe((data:any)=>{

        this.publicaciones = data;

      });

  }

  crear() {

    const publicacion = {

      titulo: this.titulo,
      resumen: this.resumen,
      revista: this.revista,
      doi: this.doi,

      fechaPublicacion: '2026-05-20',
      autores: 'Autor Principal',
      proyectoId: 1

    };

    this.publicacionService
      .create(publicacion)
      .subscribe(()=>{

        this.titulo = '';
        this.resumen = '';
        this.revista = '';
        this.doi = '';

        this.cargar();

      });

  }

  eliminar(id:number){

    this.publicacionService
      .delete(id)
      .subscribe(()=>{

        this.cargar();

      });

  }

}