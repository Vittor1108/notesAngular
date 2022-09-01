import { TestBed } from '@angular/core/testing';

import { SignGuardGuard } from './sign-guard.guard';

describe('SignGuardGuard', () => {
  let guard: SignGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SignGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
