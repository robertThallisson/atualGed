import { TestBed } from '@angular/core/testing';

import { NotificaoService } from './notificao.service';

describe('NotificaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificaoService = TestBed.get(NotificaoService);
    expect(service).toBeTruthy();
  });
});
