import { TestBed } from '@angular/core/testing';

import { AuthorizaionInterceptor } from './authorization.interceptor';

describe('AuthorizaionInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AuthorizaionInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: AuthorizaionInterceptor = TestBed.inject(
      AuthorizaionInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
