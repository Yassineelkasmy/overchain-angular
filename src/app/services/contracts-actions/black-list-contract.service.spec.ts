import { TestBed } from '@angular/core/testing';

import { BlackListContractService } from './black-list-contract.service';

describe('BlackListContractService', () => {
  let service: BlackListContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlackListContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
