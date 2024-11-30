import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AdminGuard } from './admin.guard';
import {LocalStorageService} from "../../services/storage-service/local-storage.service";

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: Router, useValue: routerSpy },
      ],
    });
    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false and redirect if user is logged in', () => {
    spyOn(LocalStorageService, 'isUserLoggedIn').and.returnValue(true);

    const result = guard.canActivate({} as any, {} as any);

    expect(result).toBeFalse();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/user/dashboard');
  });

  it('should return false and redirect to login if no token', () => {
    spyOn(LocalStorageService, 'isUserLoggedIn').and.returnValue(false);
    spyOn(LocalStorageService, 'hasToken').and.returnValue(false);
    spyOn(LocalStorageService, 'signOut');

    const result = guard.canActivate({} as any, {} as any);

    expect(result).toBeFalse();
    expect(LocalStorageService.signOut).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should return true if user is admin', () => {
    spyOn(LocalStorageService, 'isUserLoggedIn').and.returnValue(false);
    spyOn(LocalStorageService, 'hasToken').and.returnValue(true);

    const result = guard.canActivate({} as any, {} as any);

    expect(result).toBeTrue();
  });
});