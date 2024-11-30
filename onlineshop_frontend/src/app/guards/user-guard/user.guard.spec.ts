import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { UserGuard } from './user.guard';
import { LocalStorageService } from '../../services/storage-service/local-storage.service';

describe('UserGuard', () => {
  let guard: UserGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      providers: [
        UserGuard,
        { provide: Router, useValue: routerSpy },
      ],
    });
    guard = TestBed.inject(UserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation if user is logged in', () => {
    spyOn(LocalStorageService, 'isUserLoggedIn').and.returnValue(true);

    const result = guard.canActivate({} as any, {} as any);

    expect(result).toBeTrue();
  });

  it('should redirect to login if user is not logged in', () => {
    spyOn(LocalStorageService, 'isUserLoggedIn').and.returnValue(false);

    const result = guard.canActivate({} as any, {} as any);

    expect(result).toBeFalse();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});