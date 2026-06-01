import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { RegisterRequest, LoginRequest, AuthResponse } from '../models/auth.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly api = 'http://localhost:3000/api/auth'
  private readonly TOKEN_KEY = 'token'

  constructor(private http: HttpClient) {}

  // 🔐 LOGIN
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/login`, data)
  }

  // 📝 REGISTER
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/register`, data)
  }

  // 💾 GUARDAR TOKEN
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  // 🔍 OBTENER TOKEN
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  // ❌ LOGOUT
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY)
  }

  // 🔒 ESTADO LOGIN
  isLoggedIn(): boolean {
    return !!this.getToken()
  }
}