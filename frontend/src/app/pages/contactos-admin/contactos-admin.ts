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
export class ContactosAdminComponent implements OnInit {

  contactos: any[] = [];

  contactosFiltradosCache: any[] = [];
  contactosPaginadosCache: any[] = [];

  loading = false;

  filtroNombre = '';
  filtroCorreo = '';
  filtroAsunto = '';

  pagina = 1;
  porPagina = 10;
  totalPaginas = 0;

  seleccionado: any = null;

  confirmVisible = false;
  idAEliminar: number | null = null;

  constructor(
    private service: ContactoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  // =========================
  // CARGA
  // =========================
  cargar() {

    this.loading = true;

    this.service.getAll().subscribe({
      next: (data: any) => {

        this.contactos = data ?? [];

        this.aplicarFiltros();

        this.loading = false;

        this.cdr.detectChanges();
      },
      error: (err) => {

        console.error(err);

        this.contactos = [];
        this.loading = false;

        this.cdr.detectChanges();
      }
    });
  }

  // =========================
  // FILTROS (OPTIMIZADO)
  // =========================
  aplicarFiltros() {

    const nombre = this.filtroNombre.toLowerCase();
    const correo = this.filtroCorreo.toLowerCase();
    const asunto = this.filtroAsunto.toLowerCase();

    this.contactosFiltradosCache = this.contactos.filter(c =>
      (!nombre || c.nombre?.toLowerCase().includes(nombre)) &&
      (!correo || c.correo?.toLowerCase().includes(correo)) &&
      (!asunto || c.asunto?.toLowerCase().includes(asunto))
    );

    this.totalPaginas = Math.ceil(
      this.contactosFiltradosCache.length / this.porPagina
    );

    this.pagina = 1;

    this.actualizarPagina();
  }

  // =========================
  // PAGINACIÓN
  // =========================
  actualizarPagina() {

    const inicio = (this.pagina - 1) * this.porPagina;

    this.contactosPaginadosCache =
      this.contactosFiltradosCache.slice(inicio, inicio + this.porPagina);
  }

  cambiarPagina(n: number) {

    if (n < 1 || n > this.totalPaginas) return;

    this.pagina = n;

    this.actualizarPagina();
  }

  // =========================
  // FILTROS INPUT
  // =========================
  resetPaginaYFiltrar() {
    this.aplicarFiltros();
  }

  // =========================
  // VER
  // =========================
  ver(c: any) {
    this.seleccionado = c;
  }

  cerrar() {
    this.seleccionado = null;
  }

  // =========================
  // ELIMINAR
  // =========================
  eliminar(id: number) {
    this.idAEliminar = id;
    this.confirmVisible = true;
  }

  confirmarEliminar() {

    if (!this.idAEliminar) return;

    this.service.delete(this.idAEliminar).subscribe({
      next: () => {
        this.confirmVisible = false;
        this.idAEliminar = null;
        this.cargar();
      },
      error: () => {
        this.confirmVisible = false;
      }
    });
  }

  cancelarEliminar() {
    this.confirmVisible = false;
    this.idAEliminar = null;
  }
}