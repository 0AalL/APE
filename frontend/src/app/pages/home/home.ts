import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';

// Declaración global para evitar errores de compilación con la librería de Bootstrap
declare var bootstrap: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  
  isColorPanelOpen: boolean = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Escucha clics globales para cerrar el panel si se presiona fuera
    this.renderer.listen('window', 'click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (this.isColorPanelOpen && !target.closest('#colorPanel') && !target.closest('#btnColorPicker')) {
        this.isColorPanelOpen = false;
      }
    });
  }

  /**
   * Forzar el auto-play del carrusel una vez el DOM esté renderizado completamente
   */
  ngAfterViewInit(): void {
    const carouselEl = document.getElementById('heroCarousel');
    if (carouselEl) {
      try {
        // Crea o reinicializa la instancia del carrusel con intervalo activo de 6 segundos
        const carouselInstance = new bootstrap.Carousel(carouselEl, {
          interval: 6000,
          ride: 'carousel',
          wrap: true
        });
        carouselInstance.cycle(); // Fuerza el inicio del movimiento automático
      } catch (error) {
        console.error('Bootstrap JS no está cargado correctamente en el entorno global.', error);
      }
    }
  }

  // Permite pasar tanto un HTMLElement directo como un ID string por seguridad
  scroll(el: HTMLElement | string) {
    if (typeof el === 'string') {
      const element = document.getElementById(el);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleColorPanel(event: Event) {
    event.stopPropagation();
    this.isColorPanelOpen = !this.isColorPanelOpen;
  }

  applyDynamicTheme(themeName: string) {
    const root = document.documentElement;

    if (themeName === 'verde') {
      this.renderer.setStyle(root, '--acento-actual', 'var(--acento-verde)');
      this.renderer.setStyle(root, '--acento-glow-actual', 'var(--acento-verde-glow)');
    } else if (themeName === 'azul') {
      this.renderer.setStyle(root, '--acento-actual', 'var(--acento-azul)');
      this.renderer.setStyle(root, '--acento-glow-actual', 'var(--acento-azul-glow)');
    } else if (themeName === 'oro') {
      this.renderer.setStyle(root, '--acento-actual', 'var(--acento-oro)');
      this.renderer.setStyle(root, '--acento-glow-actual', 'var(--acento-oro-glow)');
    }

    this.isColorPanelOpen = false;
  }
}