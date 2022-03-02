import { TestBed } from '@angular/core/testing';

import { FotoItemInspecaoService } from './foto-item-inspecao.service';

describe('FotoItemInspecaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FotoItemInspecaoService = TestBed.get(FotoItemInspecaoService);
    expect(service).toBeTruthy();
  });
});
