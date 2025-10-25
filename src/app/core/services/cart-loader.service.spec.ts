import { TestBed } from '@angular/core/testing';

import { CartLoaderService } from './cart-loader.service';

describe('CartLoaderService', () => {
  let service: CartLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
