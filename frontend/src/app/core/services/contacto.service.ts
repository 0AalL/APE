import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private api = 'http://localhost:3000/api/contactos';

  constructor(private http: HttpClient) {}

  // GET all
  getAll() {
    return this.http.get<any[]>(this.api);
  }

  // POST create contacto
  create(contacto: any) {
    return this.http.post(this.api, contacto);
  }

  // DELETE
  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}