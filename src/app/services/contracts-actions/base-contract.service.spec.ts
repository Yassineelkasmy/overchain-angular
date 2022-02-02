import { TestBed } from '@angular/core/testing';

import { BaseContractService } from './base-contract.service';

describe('BaseContractService', () => {
  let service: BaseContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
