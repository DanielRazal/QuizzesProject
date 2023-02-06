import { TestBed } from '@angular/core/testing';

import { AuthGuardAdmin } from './auth-guard-admin.service';

describe('AuthGuardAdminService', () => {
  let service: AuthGuardAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardAdmin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
