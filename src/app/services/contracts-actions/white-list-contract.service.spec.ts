import { TestBed } from '@angular/core/testing';

import { WhiteListContractService } from './white-list-contract.service';

describe('WhiteListContractService', () => {
  let service: WhiteListContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhiteListContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
