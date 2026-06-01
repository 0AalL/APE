import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'

import { AuthService } from '../../core/services/auth.service'
import { LoginRequest, AuthResponse } from '../../core/models/auth.model'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = ''
  password = ''

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    const data: LoginRequest = {
      email: this.email,
      password: this.password
    }

    this.authService.login(data)
      .subscribe({
        next: (resp: AuthResponse) => {

          if (resp.token) {
            this.authService.setToken(resp.token)
          }

          alert('Login correcto')

          this.router.navigate(['admin/proyectos'])
        },

        error: () => {
          alert('Credenciales incorrectas')
        }
      })
  }
}