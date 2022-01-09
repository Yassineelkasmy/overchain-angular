import { TestBed } from '@angular/core/testing';

import { RegistredUserGuard } from './registred-user.guard';

describe('RegistredUserGuard', () => {
  let guard: RegistredUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RegistredUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
