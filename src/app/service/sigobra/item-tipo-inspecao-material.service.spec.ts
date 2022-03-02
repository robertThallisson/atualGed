import { TestBed } from '@angular/core/testing';

import { ItemTipoInspecaoMaterialService } from './item-tipo-inspecao-material.service';

describe('ItemTipoInspecaoMaterialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemTipoInspecaoMaterialService = TestBed.get(ItemTipoInspecaoMaterialService);
    expect(service).toBeTruthy();
  });
});
