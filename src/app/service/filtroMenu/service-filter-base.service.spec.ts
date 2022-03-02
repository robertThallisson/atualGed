import { TestBed } from '@angular/core/testing';

import { ServiceFilterBaseService } from './service-filter-base.service';

describe('ServiceFilterBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceFilterBaseService = TestBed.get(ServiceFilterBaseService);
    expect(service).toBeTruthy();
  });
});
