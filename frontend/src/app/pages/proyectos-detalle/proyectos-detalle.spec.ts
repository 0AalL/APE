import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosDetalle } from './proyectos-detalle';

describe('ProyectosDetalle', () => {
  let component: ProyectosDetalle;
  let fixture: ComponentFixture<ProyectosDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectosDetalle],
    }).compileComponents();

    fixture = TestBed.createComponent(ProyectosDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
