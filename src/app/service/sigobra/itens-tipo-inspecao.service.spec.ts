import { TestBed } from '@angular/core/testing';

import { ItensTipoInspecaoService } from './itens-tipo-inspecao.service';

describe('ItensTipoInspecaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItensTipoInspecaoService = TestBed.get(ItensTipoInspecaoService);
    expect(service).toBeTruthy();
  });
});
