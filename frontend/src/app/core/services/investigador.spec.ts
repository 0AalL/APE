import { TestBed } from '@angular/core/testing';

import { Investigador } from './investigador';

describe('Investigador', () => {
  let service: Investigador;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Investigador);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
