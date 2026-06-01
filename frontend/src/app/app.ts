import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

import { NavbarComponent } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';
import { AuthService } from './core/services/auth.service';
import { MenuAdmin } from './pages/admin/menu/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    Footer,
    MenuAdmin
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  mostrarLayout = true;
  mostrarAdmin = false;

  adminCollapsed = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {

        const url = event.urlAfterRedirects;

        this.mostrarLayout = url !== '/login';

        this.mostrarAdmin =
          url.startsWith('/admin') && this.authService.isLoggedIn();
      });
  }
}