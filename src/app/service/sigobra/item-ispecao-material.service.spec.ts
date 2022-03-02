import { TestBed } from '@angular/core/testing';

import { ItemInspecaoMaterialService } from './item-inspecao-material.service';

describe('ItemIspecaoMaterialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemInspecaoMaterialService = TestBed.get(ItemInspecaoMaterialService);
    expect(service).toBeTruthy();
  });
});
