import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NoAuthGuard } from './no-auth.guard';
import { LocalStorageService } from '../../services/storage-service/local-storage.service';

describe('NoAuthGuard', () => {
  let guard: NoAuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      providers: [
        NoAuthGuard,
        { provide: Router, useValue: routerSpy },
      ],
    });
    guard = TestBed.inject(NoAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to dashboard if user is logged in', () => {
    spyOn(LocalStorageService, 'isUserLoggedIn').and.returnValue(true);

    const result = guard.canActivate({} as any, {} as any);

    expect(result).toBeFalse();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/user/dashboard');
  });

  it('should allow navigation if user is not logged in', () => {
    spyOn(LocalStorageService, 'isUserLoggedIn').and.returnValue(false);

    const result = guard.canActivate({} as any, {} as any);

    expect(result).toBeTrue();
  });
});