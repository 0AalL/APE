import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'

import { AuthService } from '../../core/services/auth.service'
import { LoginRequest, AuthResponse } from '../../core/models/auth.model'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = ''
  password = ''

  showPassword = false

  message = ''
  messageType: 'success' | 'error' = 'success'

  loading = false

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    this.loading = true
    this.message = ''

    const data: LoginRequest = {
      email: this.email,
      password: this.password
    }

    this.authService.login(data)
      .subscribe({
        next: (resp: AuthResponse) => {

          this.loading = false

          if (resp.token) {
            this.authService.setToken(resp.token)
          }

          this.messageType = 'success'
          this.message = 'Autenticación exitosa'

          setTimeout(() => {
            this.router.navigate(['admin/dashboard'])
          }, 900)
        },

        error: () => {
          this.loading = false
          this.messageType = 'error'
          this.message = 'Credenciales inválidas'
        }
      })
  }

  goHome() {
    this.router.navigate(['/'])
  }

  togglePassword() {
    this.showPassword = !this.showPassword
  }
}