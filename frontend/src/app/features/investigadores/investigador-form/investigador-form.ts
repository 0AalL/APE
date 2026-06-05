import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { InvestigadorService } from '../../../core/services/investigador.service';
import { Investigador } from '../../../core/models/investigador.model';

@Component({
  selector: 'app-investigador-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './investigador-form.html',
  styleUrls: ['./investigador-form.css']
})
export class InvestigadorFormComponent implements OnInit {

  isEdit = false;

  investigador: Investigador = {
    nombre: '',
    cargo: '',
    correo: '',
    orcid: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    telegram: '',
    biografia: ''
  };

  file: File | null = null;
  preview: string | null = null;

  errorMsg: string = '';
  successMsg: string = '';

  constructor(
    private service: InvestigadorService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEdit = true;

      this.service.getById(+id).subscribe({
        next: (data: any) => {
          this.investigador = data;
          this.cd.detectChanges();
        },
        error: (err) => console.error(err)
      });

    }
  }

  getCurrentImage(): string {
    if (this.preview) return this.preview;
    return `/uploads/${this.investigador.foto}`;
  }

  onFileSelected(event: any): void {

    const file = event.target.files?.[0];
    if (!file) return;

    this.file = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
      this.cd.detectChanges();
    };

    reader.readAsDataURL(file);
  }

  cancelar(): void {
    this.router.navigate(['admin/investigadores']);
  }

  guardar(): void {

    this.errorMsg = '';
    this.successMsg = '';

    // 🔥 VALIDACIÓN FRONT BÁSICA
    if (
      !this.investigador.nombre ||
      this.investigador.nombre.length < 3 ||
      !this.investigador.cargo ||
      this.investigador.cargo.length < 2 ||
      !this.investigador.correo
    ) {
      this.errorMsg = 'Complete correctamente los campos obligatorios';
      return;
    }

    const formData = new FormData();

    formData.append('nombre', this.investigador.nombre);
    formData.append('cargo', this.investigador.cargo);
    formData.append('correo', this.investigador.correo);

    formData.append('orcid', this.investigador.orcid || '');
    formData.append('facebook', this.investigador.facebook || '');
    formData.append('linkedin', this.investigador.linkedin || '');
    formData.append('instagram', this.investigador.instagram || '');
    formData.append('telegram', this.investigador.telegram || '');
    formData.append('biografia', this.investigador.biografia || '');

    if (this.file) {
      formData.append('foto', this.file);
    }

    const request = this.isEdit && this.investigador.id
      ? this.service.update(this.investigador.id, formData)
      : this.service.create(formData);

    request.subscribe({
      next: () => {

        this.successMsg = 'Investigador guardado correctamente';

        setTimeout(() => {
          this.router.navigate(['/admin/investigadores']);
        }, 1200);

      },

      error: (err) => {

        this.errorMsg =
          err?.error?.message ||
          'Error al guardar el investigador';

      }
    });
  }
}