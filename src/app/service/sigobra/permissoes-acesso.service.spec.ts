import { TestBed } from '@angular/core/testing';

import { PermissoesAcessoService } from './permissoes-acesso.service';

describe('PermissoesAcessoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermissoesAcessoService = TestBed.get(PermissoesAcessoService);
    expect(service).toBeTruthy();
  });
});
