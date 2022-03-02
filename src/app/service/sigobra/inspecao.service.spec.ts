import { TestBed } from '@angular/core/testing';

import { InspecaoService } from './inspecao.service';

describe('InspecaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InspecaoService = TestBed.get(InspecaoService);
    expect(service).toBeTruthy();
  });
});
