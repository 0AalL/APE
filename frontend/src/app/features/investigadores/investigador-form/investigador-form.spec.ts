import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigadorModal } from './investigador-modal';

describe('InvestigadorModal', () => {
  let component: InvestigadorModal;
  let fixture: ComponentFixture<InvestigadorModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestigadorModal],
    }).compileComponents();

    fixture = TestBed.createComponent(InvestigadorModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
