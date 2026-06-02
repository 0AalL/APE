import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class ContactoComponent {

  contacto = {
    nombre: '',
    empresa: '',
    correo: '',
    areaInteres: '',
    asunto: '',
    mensaje: '',
    aceptaPrivacidad: false
  };

  enviando = false;
  enviado = false;

  areas = [
    'Información General',
    'Cartera de Actividades',
    'Proyectos I+D+I',
    'Grupos de Investigación',
    'Oferta Tecnológica',
    'Ayudas y Subvenciones',
    'Formación',
    'Otros'
  ];

  constructor(
    private http: HttpClient
  ) {}

  enviar() {

    if (!this.contacto.aceptaPrivacidad) {
      alert('Debe aceptar la Política de Privacidad');
      return;
    }

    this.enviando = true;

    this.http.post(
      'http://localhost:3000/api/contactos',
      this.contacto
    ).subscribe({
      next: () => {

        this.enviado = true;
        this.enviando = false;

        this.contacto = {
          nombre: '',
          empresa: '',
          correo: '',
          areaInteres: '',
          asunto: '',
          mensaje: '',
          aceptaPrivacidad: false
        };

      },
      error: (err) => {

        console.error(err);

        this.enviando = false;

        alert(
          'Error al enviar el mensaje'
        );
      }
    });
  }
}