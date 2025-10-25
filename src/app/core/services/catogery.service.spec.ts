import { TestBed } from '@angular/core/testing';

import { CatogeryService } from './catogery.service';

describe('CatogeryService', () => {
  let service: CatogeryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatogeryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
