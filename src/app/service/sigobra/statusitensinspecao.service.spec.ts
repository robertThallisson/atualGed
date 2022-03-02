import { TestBed } from '@angular/core/testing';

import { StatusitensinspecaoService } from './statusitensinspecao.service';

describe('StatusitensinspecaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusitensinspecaoService = TestBed.get(StatusitensinspecaoService);
    expect(service).toBeTruthy();
  });
});
