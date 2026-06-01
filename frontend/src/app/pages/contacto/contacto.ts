import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class ContactoComponent {

  nombre = '';
  correo = '';
  mensaje = '';

  enviar() {

    alert(
      'Formulario preparado para conectar con backend'
    );

  }

}