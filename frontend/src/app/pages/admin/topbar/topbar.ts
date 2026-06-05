import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Router, NavigationEnd } from '@angular/router'
import { AuthService } from '../../../core/services/auth.service'
import { filter } from 'rxjs'

@Component({
  selector: 'app-admin-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.css']
})
export class AdminTopbar implements OnInit {
  @Input() collapsed = false
  @Output() toggleSidebar = new EventEmitter<void>()

  pageTitle = 'Dashboard'

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects
        if (url.includes('proyectos')) this.pageTitle = 'Proyectos'
        else if (url.includes('investigadores')) this.pageTitle = 'Investigadores'
        else if (url.includes('publicaciones')) this.pageTitle = 'Publicaciones'
        else if (url.includes('contactos')) this.pageTitle = 'Contactos'
        else this.pageTitle = 'Dashboard'
      })
  }

  onToggle() {
    this.toggleSidebar.emit()
  }

  logout() {
    this.authService.logout()
    window.location.href = '/login'
  }
}
