import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactoService } from '../../core/services/contacto.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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
  errorMessages: string[] = [];
  successMsg = '';

  touched: { [key: string]: boolean } = {};

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
    if (this.contacto.nombre.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres';

    if (!this.contacto.correo.trim()) return 'El correo es obligatorio';
    if (!this.isValidEmail(this.contacto.correo)) return 'El correo no es válido';

    if (!this.contacto.areaInteres) return 'Selecciona un área de interés';

    if (!this.contacto.asunto.trim()) return 'El asunto es obligatorio';
    if (this.contacto.asunto.trim().length < 5) return 'El asunto debe tener al menos 5 caracteres';

    if (!this.contacto.mensaje.trim()) return 'El mensaje es obligatorio';
    if (this.contacto.mensaje.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres';

    if (!this.contacto.aceptaPrivacidad) return 'Debes aceptar la política de privacidad';

    return null;
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  markAsTouched(field: string) {
    this.touched[field] = true;
  }

  hasError(field: string): boolean {
    if (!this.touched[field]) return false;

    switch (field) {
      case 'nombre':
        return !this.contacto.nombre.trim() || this.contacto.nombre.trim().length < 3;

      case 'correo':
        return !this.isValidEmail(this.contacto.correo);

      case 'areaInteres':
        return !this.contacto.areaInteres;

      case 'asunto':
        return this.contacto.asunto.trim().length < 5;

      case 'mensaje':
        return this.contacto.mensaje.trim().length < 10;

      case 'aceptaPrivacidad':
        return !this.contacto.aceptaPrivacidad;

      default:
        return false;
    }
  }

  enviar() {

    if (this.enviando) return;

    this.errorMsg = '';
    this.errorMessages = [];
    this.successMsg = '';
    this.enviando = true;

    const error = this.validar();

    if (error) {
      this.errorMsg = error;
      this.enviando = false;
      return;
    }

    // ✅ AQUÍ VA LO CORRECTO (Observable)
    this.contactoService.create(this.contacto).subscribe({
      next: (res: any) => {

        console.log('✅ Mensaje enviado:', res);

        this.successMsg =
          res?.message || 'Mensaje enviado correctamente';

        this.resetForm();

        this.enviado = true;

        setTimeout(() => {
          this.successMsg = '';
          this.enviado = false;
        }, 5000);
      },

      error: (err: any) => {

        console.error('❌ Error:', err);

        this.errorMsg =
          err?.error?.message ||
          'Error al enviar el mensaje';

        if (err?.error?.errors) {
          this.errorMessages = err.error.errors;
        }

        this.enviado = false;
      },

      complete: () => {
        this.enviando = false;
      }
    });
  }

  private resetForm() {
    this.contacto = {
      nombre: '',
      empresa: '',
      correo: '',
      areaInteres: '',
      asunto: '',
      mensaje: '',
      aceptaPrivacidad: false
    };

    this.touched = {};
  }
}