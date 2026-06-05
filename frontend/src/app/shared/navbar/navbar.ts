import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  // Variable para controlar el cambio de estado del Navbar
  isScrolled = false;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  // Escucha el evento de scroll en la ventana global
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Si baja más de 50px de la parte superior, activa el estado claro
    this.isScrolled = window.scrollY > 50;
  }

  logout(): void {
    this.auth.logout();      
    this.router.navigate(['/login']);
  }
}