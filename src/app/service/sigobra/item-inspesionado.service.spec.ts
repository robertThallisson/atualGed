import { TestBed } from '@angular/core/testing';

import { ItemInspesionadoService } from './item-inspesionado.service';

describe('ItemInspesionadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemInspesionadoService = TestBed.get(ItemInspesionadoService);
    expect(service).toBeTruthy();
  });
});
