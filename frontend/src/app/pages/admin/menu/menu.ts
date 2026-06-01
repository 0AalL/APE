import { Component, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Router } from '@angular/router'
import { AuthService } from '../../../core/services/auth.service'

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuAdmin {

  collapsed = false

  @Output() collapsedChange = new EventEmitter<boolean>()

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMenu(): void {
    this.collapsed = !this.collapsed
    this.collapsedChange.emit(this.collapsed)
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}