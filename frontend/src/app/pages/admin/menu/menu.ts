import { Component, EventEmitter, Output, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuAdmin {

  @Input() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

  constructor(private authService: AuthService) {}

  // 🔥 CLAVE: aplica clase al HOST del componente
  @HostBinding('class.collapsed')
  get isCollapsed() {
    return this.collapsed;
  }

  toggleMenu() {
    this.collapsedChange.emit(!this.collapsed);
  }

  logout() {
    this.authService.logout();
    //redireccionar a login
    window.location.href = '/login';
  }
}