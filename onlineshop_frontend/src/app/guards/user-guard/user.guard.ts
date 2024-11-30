import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {LocalStorageService} from "../../services/storage-service/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): boolean {
    if(LocalStorageService.isAdminLoggedIn()) {
      this.router.navigateByUrl("/admin/dashboard")
      console.log("You dont have access of this page");
      return false
    } else if(!LocalStorageService.hasToken()) {
      LocalStorageService.signOut();
      this.router.navigateByUrl("/login");
      console.log("You are not logged in");
      return false;
    }
    return true;
  }
}