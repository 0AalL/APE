import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvestigadorService }
  from '../../core/services/investigador.service';

@Component({
  selector: 'app-investigadores',
  imports: [CommonModule, FormsModule
  ],
  templateUrl: './investigadores.html',
  styleUrl: './investigadores.css'
})
export class InvestigadoresComponent
  implements OnInit {
  nombre = '';
  especialidad = '';
  email = '';
  investigadores: any[] = [];

  constructor(
    private investigadorService:
      InvestigadorService
  ) { }
  crear() {

    const data = {
      nombre: this.nombre,
      especialidad: this.especialidad,
      email: this.email
    };

    this.investigadorService
      .create(data)
      .subscribe(() => {

        this.nombre = '';
        this.especialidad = '';
        this.email = '';

        this.cargar();

      });

  }
  ngOnInit(): void {
    this.cargar();
  }

  cargar() {

    this.investigadorService
      .getAll()
      .subscribe((data: any) => {

        this.investigadores = data;

      });

  }

}