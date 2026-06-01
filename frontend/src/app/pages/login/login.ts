import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    const data = {
      email: this.email,
      password: this.password
    };

    this.authService.login(data)
      .subscribe({
        next: (resp: any) => {

          this.authService.guardarToken(
            resp.token
          );

          alert('Login correcto');

          this.router.navigate(['/']);
        },

        error: () => {
          alert('Credenciales incorrectas');
        }
      });

  }

}