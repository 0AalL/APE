import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  ContactoService
} from '../../core/services/contacto.service';

@Component({
  selector: 'app-contactos-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './contactos-admin.html',
  styleUrls: ['./contactos-admin.css']
})
export class ContactosAdminComponent
implements OnInit {

  contactos: any[] = [];

  filtroNombre = '';
  filtroCorreo = '';
  filtroAsunto = '';

  pagina = 1;
  porPagina = 10;

  seleccionado: any = null;

  toast: {
    message: string;
    type: string;
  } | null = null;

  confirmVisible = false;
  idAEliminar: number | null = null;

  constructor(
    private service: ContactoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {

    this.service.getAll()
      .subscribe({
        next: (data: any) => {

          this.contactos = data ?? [];

          this.cdr.detectChanges();

        },
        error: (err) => {

          console.error(err);

          this.contactos = [];

          this.showToast(
            'Error al cargar contactos',
            'error'
          );

          this.cdr.detectChanges();

        }
      });

  }

  // FILTROS

  get filtrados() {

    return this.contactos.filter(c => {

      const nombre =
        !this.filtroNombre ||
        c.nombre?.toLowerCase()
          .includes(
            this.filtroNombre.toLowerCase()
          );

      const correo =
        !this.filtroCorreo ||
        c.correo?.toLowerCase()
          .includes(
            this.filtroCorreo.toLowerCase()
          );

      const asunto =
        !this.filtroAsunto ||
        c.asunto?.toLowerCase()
          .includes(
            this.filtroAsunto.toLowerCase()
          );

      return (
        nombre &&
        correo &&
        asunto
      );

    });

  }

  // PAGINACIÓN

  get totalPaginas() {

    return Math.ceil(
      this.filtrados.length /
      this.porPagina
    );

  }

  get paginados() {

    const inicio =
      (this.pagina - 1) *
      this.porPagina;

    return this.filtrados.slice(
      inicio,
      inicio + this.porPagina
    );

  }

  cambiarPagina(n: number) {

    if (
      n < 1 ||
      n > this.totalPaginas
    ) {
      return;
    }

    this.pagina = n;

  }

  // VER MENSAJE

  ver(contacto: any) {

    this.seleccionado = contacto;

  }

  cerrar() {

    this.seleccionado = null;

  }

  // ELIMINAR

  eliminar(id: number) {

    this.idAEliminar = id;

    this.confirmVisible = true;

  }

  confirmarEliminar() {

    if (!this.idAEliminar) {
      return;
    }

    this.service.delete(this.idAEliminar)
      .subscribe({

        next: () => {

          this.confirmVisible = false;

          this.showToast(
            'Mensaje eliminado correctamente',
            'success'
          );

          this.cargar();

          this.idAEliminar = null;

        },

        error: (err) => {

          console.error(err);

          this.confirmVisible = false;

          this.showToast(
            'Error al eliminar mensaje',
            'error'
          );

        }

      });

  }

  cancelarEliminar() {

    this.confirmVisible = false;

    this.idAEliminar = null;

  }

  // TOAST

  showToast(
    message: string,
    type: string
  ) {

    this.toast = {
      message,
      type
    };

    setTimeout(() => {

      this.toast = null;

      this.cdr.detectChanges();

    }, 3000);

  }

}