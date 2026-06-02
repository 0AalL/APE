import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private api = 'http://localhost:3000/api/proyectos';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any[]>(this.api).pipe(
      tap(res => console.log('GET proyectos OK:', res)),
      catchError(err => {
        console.error('GET proyectos ERROR:', err);
        return of([]); // 🔥 evita tabla vacía por error silencioso
      })
    );
  }

  create(data: any) {
    return this.http.post(this.api, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
  getByIdDetalle(id: number) {
    return this.http.get<any>(`http://localhost:3000/api/proyectos/${id}/detalles`)
  }
  getById(id: number) {
    //imprimir antes de retornar
    console.log(`GET proyecto por ID: ${id}`);
    return this.http.get<any>(`http://localhost:3000/api/proyectos/${id}`);
  }
}