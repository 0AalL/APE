import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactosAdmin } from './contactos-admin';

describe('ContactosAdmin', () => {
  let component: ContactosAdmin;
  let fixture: ComponentFixture<ContactosAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactosAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactosAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
