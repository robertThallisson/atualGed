import { TestBed } from '@angular/core/testing';

import { LocalObraService } from './local-obra.service';

describe('LocalObraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalObraService = TestBed.get(LocalObraService);
    expect(service).toBeTruthy();
  });
});
