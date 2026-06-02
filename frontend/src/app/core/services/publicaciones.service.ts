import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  private api = 'http://localhost:3000/api/publicaciones'

  constructor(private http: HttpClient) { }

  // 🔐 Obtener token
  private getToken(): string | null {
    return localStorage.getItem('token')
  }
  deletePublicacion(id: number) {
    return this.http.delete(`${this.api}/${id}`, {
      headers: this.getAuthHeaders()
    })
  }
  // 🔐 Headers con token
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken()

    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    })
  }

  // 📚 LISTAR PUBLICACIONES (SIN TOKEN)
  getPublicaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.api).pipe(
      catchError(error => {
        console.error('❌ Error al obtener publicaciones:', error)

        let msg = 'Error al cargar publicaciones'

        if (error.status === 0) {
          msg = 'No hay conexión con el servidor'
        } else if (error.status === 404) {
          msg = 'No se encontraron publicaciones'
        } else if (error.status >= 500) {
          msg = 'Error interno del servidor'
        }

        return throwError(() => new Error(msg))
      })
    )
  }

  // 📄 OBTENER UNA PUBLICACIÓN (SIN TOKEN)
  getPublicacion(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`).pipe(
      catchError(error => {
        console.error(`❌ Error al obtener publicación ${id}:`, error)

        let msg = 'Error al cargar la publicación'

        if (error.status === 404) {
          msg = 'Publicación no encontrada'
        } else if (error.status === 0) {
          msg = 'Sin conexión con el servidor'
        }

        return throwError(() => new Error(msg))
      })
    )
  }

  // ➕ CREAR PUBLICACIÓN (CON TOKEN)
  crearPublicacion(data: any): Observable<any> {
    return this.http.post(this.api, data, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => {
        console.error('❌ Error al crear publicación:', error)

        let msg = 'Error al crear publicación'

        if (error.status === 401) {
          msg = 'No autorizado'
        } else if (error.status === 400) {
          msg = 'Datos inválidos'
        }

        return throwError(() => new Error(msg))
      })
    )
  }

  // ✏️ EDITAR PUBLICACIÓN (CON TOKEN)
  actualizarPublicacion(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, data, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => {
        console.error(`❌ Error al actualizar publicación ${id}:`, error)

        let msg = 'Error al actualizar publicación'

        if (error.status === 404) {
          msg = 'Publicación no encontrada'
        } else if (error.status === 401) {
          msg = 'No autorizado'
        }

        return throwError(() => new Error(msg))
      })
    )
  }
}