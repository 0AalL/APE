import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigadoresDetalle } from './investigadores-detalle';

describe('InvestigadoresDetalle', () => {
  let component: InvestigadoresDetalle;
  let fixture: ComponentFixture<InvestigadoresDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestigadoresDetalle],
    }).compileComponents();

    fixture = TestBed.createComponent(InvestigadoresDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
