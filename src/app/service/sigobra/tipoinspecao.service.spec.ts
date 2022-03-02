import { TestBed } from '@angular/core/testing';

import { TipoinspecaoService } from './tipoinspecao.service';

describe('TipoinspecaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoinspecaoService = TestBed.get(TipoinspecaoService);
    expect(service).toBeTruthy();
  });
});
