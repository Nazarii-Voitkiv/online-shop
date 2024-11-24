import {ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../services/storage-service/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): boolean {
    if(LocalStorageService.hasToken() && LocalStorageService.isUserLoggedIn()) {
      this.router.navigateByUrl("/user/dashboard")
      return false;
    } else if(LocalStorageService.hasToken() && LocalStorageService.isAdminLoggedIn()) {
      this.router.navigateByUrl("/admin/dashboard")
      return false;
    }
    return true;
  }

}
