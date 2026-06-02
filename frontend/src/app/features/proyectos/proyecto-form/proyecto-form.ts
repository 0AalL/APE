import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProyectoService } from '../../../core/services/proyecto.service';
import { InvestigadorService } from '../../../core/services/investigador.service';

@Component({
  selector: 'app-proyecto-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proyecto-form.html',
  styleUrls: ['./proyecto-form.css']
})
export class ProyectoFormComponent implements OnInit {

  isEdit = false;

  proyecto: any = {
    id: null,
    titulo: '',
    descripcion: '',
    objetivos: '',
    resultados: '',
    investigadores: []
  };

  buscadorVisible = false;

  investigadores: any[] = [];
  filtrados: any[] = [];

  filtroNombre = '';
  filtroCedula = '';
  filtroCargo = '';

  pagina = 1;
  porPagina = 5;

  constructor(
    private service: ProyectoService,
    private investigadorService: InvestigadorService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const id = params.get('id');

      console.log('ID RECIBIDO:', id);

      if (!id) {
        return;
      }

      this.isEdit = true;

      this.service.getById(+id)
        .subscribe({
          next: (data: any) => {

            console.log('PROYECTO RECIBIDO:', data);

            setTimeout(() => {

              this.proyecto = {
                id: data.id,
                titulo: data.titulo ?? '',
                descripcion: data.descripcion ?? '',
                objetivos: data.objetivos ?? '',
                resultados: data.resultados ?? '',
                investigadores: data.investigadores ?? []
              };

              console.log('PROYECTO ASIGNADO:', this.proyecto);

              this.cdr.detectChanges();

            }, 0);
          },

          error: (err) => {
            console.error('ERROR GETBYID', err);
          }
        });
    });
  }

  abrirBuscador() {

    this.buscadorVisible = true;
    this.pagina = 1;

    this.investigadorService.getAll()
      .subscribe({
        next: (res: any) => {

          this.investigadores = res || [];
          this.filtrados = [...this.investigadores];

        },
        error: console.error
      });
  }

  filtrar() {

    this.filtrados = this.investigadores.filter(i => {

      const nombre =
        !this.filtroNombre ||
        i.nombre?.toLowerCase()
          .includes(this.filtroNombre.toLowerCase());

      const cedula =
        !this.filtroCedula ||
        i.cedula?.toLowerCase()
          .includes(this.filtroCedula.toLowerCase());

      const cargo =
        !this.filtroCargo ||
        i.cargo?.toLowerCase()
          .includes(this.filtroCargo.toLowerCase());

      return nombre && cedula && cargo;
    });

    this.pagina = 1;
  }

  get totalPaginas() {
    return Math.ceil(this.filtrados.length / this.porPagina);
  }

  get paginados() {

    const inicio =
      (this.pagina - 1) * this.porPagina;

    return this.filtrados.slice(
      inicio,
      inicio + this.porPagina
    );
  }

  seleccionarInvestigador(i: any) {

    const existe =
      this.proyecto.investigadores.find(
        (x: any) => x.id === i.id
      );

    if (!existe) {
      this.proyecto.investigadores.push(i);
    }

    this.buscadorVisible = false;
  }

  eliminarInvestigador(index: number) {
    this.proyecto.investigadores.splice(index, 1);
  }

  cancelar() {
    this.router.navigate(['/admin/proyectos']);
  }

  guardar() {

    const payload = {

      titulo: this.proyecto.titulo,
      descripcion: this.proyecto.descripcion,
      objetivos: this.proyecto.objetivos,
      resultados: this.proyecto.resultados,

      investigadores:
        this.proyecto.investigadores.map(
          (i: any) => i.id
        )
    };

    console.log('PAYLOAD:', payload);

    if (this.isEdit && this.proyecto.id) {

      this.service.update(
        this.proyecto.id,
        payload
      )
      .subscribe({
        next: () => {
          this.router.navigate([
            '/admin/proyectos'
          ]);
        },
        error: console.error
      });

    } else {

      this.service.create(payload)
      .subscribe({
        next: () => {
          this.router.navigate([
            '/admin/proyectos'
          ]);
        },
        error: console.error
      });
    }
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
}