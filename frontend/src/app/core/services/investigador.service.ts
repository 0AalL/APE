import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, tap, catchError, throwError } from 'rxjs'
import { Investigador } from '../models/investigador.model'

@Injectable({
  providedIn: 'root'
})
export class InvestigadorService {

  private api = '/api/investigadores'

  constructor(private http: HttpClient) { }

  // 🔐 HEADERS
  private getHeaders() {

    const token = localStorage.getItem('token')

    if (!token) {
      return {}
    }

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    }
  }

  // 📥 GET ALL
  getAll(): Observable<Investigador[]> {

    return this.http.get<Investigador[]>(this.api, this.getHeaders()).pipe(

      tap(res => console.log('✅ GET ALL:', res)),

      catchError(err => {
        console.error('❌ GET ALL ERROR:', err)
        return throwError(() => err)
      })

    )
  }

  // 📥 GET BY ID
  getById(id: number): Observable<Investigador> {

    return this.http.get<Investigador>(`${this.api}/${id}`, this.getHeaders()).pipe(

      tap(res => console.log('✅ GET BY ID:', res)),

      catchError(err => {
        console.error('❌ GET BY ID ERROR:', err)
        return throwError(() => err)
      })

    )
  }

  create(data: FormData): Observable<Investigador> {

    return this.http.post<Investigador>(this.api, data).pipe(

      tap(res => console.log(' CREATED:', res)),

      catchError(err => {
        console.error('❌ CREATE ERROR:', err)
        return throwError(() => err)
      })

    )
  }

  // UPDATE
  update(id: number, data: FormData): Observable<Investigador> {

    return this.http.put<Investigador>(`${this.api}/${id}`, data).pipe(

      tap(res => console.log('✅ UPDATED:', res)),

      catchError(err => {
        console.error('❌ UPDATE ERROR:', err)
        return throwError(() => err)
      })

    )
  }
  // 🗑 DELETE
  delete(id: number): Observable<any> {

    return this.http.delete(`${this.api}/${id}`, this.getHeaders()).pipe(

      tap(res => console.log('✅ DELETED:', res)),

      catchError(err => {
        console.error('❌ DELETE ERROR:', err)
        return throwError(() => err)
      })

    )
  }
  getByIdDetalle(id: number): Observable<Investigador> {

    return this.http.get<Investigador>(`/api/investigadores/${id}/detalles`, this.getHeaders()).pipe(

      tap(res => console.log('✅ GET DETALLE:', res)),

      catchError(err => {
        console.error('❌ GET DETALLE ERROR:', err)
        return throwError(() => err)
      })

    )
  }
}