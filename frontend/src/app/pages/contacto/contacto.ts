import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactoService } from '../../core/services/contacto.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  errorMsg = '';
  successMsg = '';

  areas: string[] = [
    'Información General',
    'Cartera de Actividades',
    'Proyectos I+D+I',
    'Grupos de Investigación',
    'Oferta Tecnológica',
    'Ayudas y Subvenciones',
    'Formación',
    'Otros'
  ];

  constructor(private contactoService: ContactoService) {}

  private validar(): string | null {

    if (!this.contacto.nombre.trim()) return 'El nombre es obligatorio';
    if (!this.contacto.correo.trim()) return 'El correo es obligatorio';
    if (!this.contacto.areaInteres) return 'Selecciona un área de interés';
    if (!this.contacto.asunto.trim()) return 'El asunto es obligatorio';
    if (!this.contacto.mensaje.trim()) return 'El mensaje es obligatorio';
    if (!this.contacto.aceptaPrivacidad) return 'Debes aceptar la política de privacidad';

    return null;
  }

  async enviar() {

    if (this.enviando) return;

    this.errorMsg = '';
    this.successMsg = '';
    this.enviando = true;

    const error = this.validar();
    if (error) {
      this.errorMsg = error;
      this.enviando = false;
      return;
    }

    try {

      const res: any = await this.contactoService.create(this.contacto)
      

      console.log('OK', res);

      this.successMsg = 'Mensaje enviado correctamente';

      this.contacto = {
        nombre: '',
        empresa: '',
        correo: '',
        areaInteres: '',
        asunto: '',
        mensaje: '',
        aceptaPrivacidad: false
      };

      this.enviado = true;

     

    } catch (err: any) {

      console.log('ERROR', err);

      this.errorMsg = err?.error?.message || 'Error al enviar el mensaje';

      this.enviado = false;

    } finally {
      this.enviando = false;
    }
  }
}