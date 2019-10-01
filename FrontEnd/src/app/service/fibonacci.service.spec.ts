import { TestBed } from '@angular/core/testing';

import { FibonacciService } from './fibonacci.service';

describe('FibonacciService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FibonacciService = TestBed.get(FibonacciService);
    expect(service).toBeTruthy();
  });
});
