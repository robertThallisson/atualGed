import { TestBed } from '@angular/core/testing';

import { StatusItemInspecionadoService } from './status-item-inspecionado.service';

describe('StatusItemInspecionadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusItemInspecionadoService = TestBed.get(StatusItemInspecionadoService);
    expect(service).toBeTruthy();
  });
});
